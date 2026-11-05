// ==UserScript==
// @name         Auto Learnvia
// @namespace    http://tampermonkey.net/
// @version      2026-09-30
// @description  automatically takes formatted output and artificially types it into the textbox
// @author       You
// @match        https://courseware.learnvia.org/content/course/7e080d63-6ac3-4eb5-9f6d-f54b9e8a8fa1/module/*
// @match        https://courseware.learnvia.org/content/course/7e080d63-6ac3-4eb5-9f6d-f54b9e8a8fa1/table-of-contents*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    console.log('AUTO LEARNVIA ACTIVATED');


    // ================================================================
    // VERBOSE LOGGING (testing build only)
    // ================================================================
    //
    // Every decision point reports itself, so a wrong answer or a swallowed
    // click can be followed from the event to the branch that handled it.
    //
    //   __learnviaDebug.off()   silence it
    //   __learnviaDebug.on()    resume it
    //   __learnviaDebug.last()  newest entries as a table
    //   __learnviaDebug.text()  the whole session as text
    //   __learnviaDebug.copy()  the same text to the clipboard
    //
    // Tags: init, find:field, find:textbox, submit, text:long, text:short,
    // type:bullet, math, math:op, clipboard:read, clipboard:write,
    // long-answer, short-answer, focus, mcq:text, mcq:click, choice:read,
    // choice:cache, choice:click, choice:dispatch, choice:resolve,
    // tab-return, next.

    const VERBOSE = true;

    const VERBOSE_PREFIX = '[Auto Learnvia][verbose]';

    // Characters of extracted text kept before it is elided.
    const VERBOSE_PREVIEW_CHARS = 160;

    // Bounded, so a long lesson cannot grow the history without limit.
    const VERBOSE_HISTORY_LIMIT = 2000;

    // A long answer is hundreds of operations; printing every one buries
    // everything else.
    const VERBOSE_OPERATION_LIMIT = 60;

    let verboseEnabled = VERBOSE;

    const verboseCounts = Object.create(null);

    const verboseHistory = [];


    function describeNode(element) {
        if (!element) return 'null';

        if (typeof element.tagName !== 'string') {
            return String(element);
        }

        const id = element.id ? `#${element.id}` : '';

        const classNames =
              typeof element.className === 'string'
        ? element.className
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .map((name) => `.${name}`)
            .join('')
        : '';

        return `${element.tagName.toLowerCase()}${id}${classNames}`;
    }


    function preview(value, limit = VERBOSE_PREVIEW_CHARS) {
        const text = String(value ?? '').replace(/\s+/g, ' ').trim();

        return text.length > limit
            ? `"${text.slice(0, limit)}…" (${text.length} chars)`
        : `"${text}" (${text.length} chars)`;
    }


    function formatArg(value) {
        if (typeof value === 'string') return value;

        if (
            typeof Element !== 'undefined' &&
            value instanceof Element
        ) {
            return describeNode(value);
        }

        if (value === null || value === undefined) return String(value);

        if (
            typeof value === 'number' ||
            typeof value === 'boolean'
        ) {
            return String(value);
        }

        // DOM nodes and other cyclic objects throw here.
        try {
            return JSON.stringify(value);
        } catch {
            return String(value);
        }
    }


    function vlog(tag, ...args) {
        if (!verboseEnabled) return;

        verboseCounts[tag] = (verboseCounts[tag] ?? 0) + 1;

        verboseHistory.push({
            at: Math.round(performance.now()),
            tag,
            message: args.map(formatArg).join(' '),
        });

        if (verboseHistory.length > VERBOSE_HISTORY_LIMIT) {
            verboseHistory.shift();
        }

        console.log(`${VERBOSE_PREFIX}[${tag}]`, ...args);
    }


    function elapsed(startedAt) {
        return `${Math.round(performance.now() - startedAt)} ms`;
    }


    // Read the session back without scrolling the console.
    window.__learnviaDebug = {
        get enabled() {
            return verboseEnabled;
        },
        on() {
            verboseEnabled = true;

            return 'verbose logging on';
        },
        off() {
            verboseEnabled = false;

            return 'verbose logging off';
        },
        counts: verboseCounts,
        history: verboseHistory,
        last(count = 25) {
            const rows = verboseHistory.slice(-count);

            console.table(rows);

            return rows.length;
        },
        table() {
            console.table(verboseHistory);
        },
        text() {
            return verboseHistory
                .map((entry) =>
                     `${entry.at}\t${entry.tag}\t${entry.message}`)
                .join('\n');
        },
        async copy() {
            await navigator.clipboard.writeText(this.text());

            return `${verboseHistory.length} lines copied`;
        },
        clear() {
            verboseHistory.length = 0;

            for (const tag of Object.keys(verboseCounts)) {
                delete verboseCounts[tag];
            }

            return 'verbose history cleared';
        },
    };


    let cleanup = null;

    function initialize() {
        const initializedAt = performance.now();

        vlog('init', 'initialize()', location.href);
        // Remove the previous page's listener/state.
        if (cleanup) {
            vlog('init', 'tearing down the previous page');

            cleanup();
            cleanup = null;
        }

        const fieldSelector = 'math-field[aria-multiline="false"]';
        const longAnswerTextboxSelector =
              '[role="textbox"].test-question-long-answer-input:not(math-field)';

        const readingIds = new Set();
        const selectedTextboxes = new Set();
        const processingTextboxes = new Set();
        const selectedFields = new Set();

        let handlingFocus = false;

        const NEW_LINE_TOKEN = '\\new line\\';

        const arrowCommands = {
            up: 'moveUp',
            down: 'moveDown',
            left: 'moveToPreviousChar',
            right: 'moveToNextChar',
        };

        const KEYWORD_NAMES = [
            'arcsin', 'arccos', 'arctan',
            'sinh', 'cosh', 'tanh',
            'sin', 'cos', 'tan', 'sec', 'csc', 'cot',
            'log', 'ln', 'exp', 'lim', 'det', 'mod', 'max', 'min',
            'pi',
        ];

        const SORTED_KEYWORD_NAMES =
              [...KEYWORD_NAMES].sort((a, b) => b.length - a.length);


        // ============================================================
        // ELEMENT FINDERS
        // ============================================================

        function findMathField(event) {
            for (const node of event.composedPath()) {
                if (
                    node instanceof HTMLElement &&
                    node.matches(fieldSelector)
                ) {
                    vlog(
                        'find:field',
                        'matched in composedPath',
                        describeNode(node)
                    );

                    return node;
                }
            }

            const target = event.target;

            const closest =
                  target instanceof Element
            ? target.closest(fieldSelector)
            : null;

            vlog(
                'find:field',
                closest ? 'matched the event target' : 'no math-field',
                describeNode(target)
            );

            return closest;
        }

        function findLongAnswerTextbox(event) {
            for (const node of event.composedPath()) {
                if (
                    node instanceof HTMLElement &&
                    node.matches(longAnswerTextboxSelector)
                ) {
                    vlog(
                        'find:textbox',
                        'matched in composedPath',
                        describeNode(node)
                    );

                    return node;
                }
            }

            const target = event.target;

            const closest =
                  target instanceof Element
            ? target.closest(longAnswerTextboxSelector)
            : null;

            vlog(
                'find:textbox',
                closest
                    ? 'matched the event target'
                : 'no long-answer textbox',
                describeNode(target)
            );

            return closest;
        }


        // ============================================================
        // SUBMISSION
        // ============================================================

        const SHORT_ANSWER_SUBMIT_SELECTOR =
              '.test-question-short-answer-submit';

        const LONG_ANSWER_SUBMIT_SELECTOR =
              '.test-question-long-answer-submit';

        // Time given to the app to settle after the paste (input handlers,
        // re-render, enabling the submit button) before clicking it.
        const SUBMIT_TOLERANCE_MS = 10;

        // A click on a disabled button is swallowed, so wait for the app to
        // enable it rather than clicking into the void.
        const SUBMIT_ENABLED_POLL_MS = 10;

        const SUBMIT_ENABLED_TIMEOUT_MS = 1000;


        async function clickSubmitButton(
        selector,
         {
             toleranceMs = SUBMIT_TOLERANCE_MS,
             pollMs = SUBMIT_ENABLED_POLL_MS,
             timeoutMs = SUBMIT_ENABLED_TIMEOUT_MS,
             passes = [],
         } = {}
        ) {
            vlog(
                'submit',
                `looking for ${selector} after ${toleranceMs} ms`
            );

            // Callers await their typing helper first, so the paste itself is
            // already finished; this only lets the app react to it.
            await new Promise(
                (resolve) => setTimeout(resolve, toleranceMs)
            );

            const activeElement = document.activeElement;

            // Caller-supplied lookups run first; the vague `.rt-Box` search
            // goes last so it cannot shadow a more precise match.
            const lookups = [
                ...passes,
                () => activeElement
                ?.closest('.rt-Box')
                ?.querySelector(selector),
            ];

            const resolveButton = () => {
                for (const find of lookups) {
                    const found = find();

                    if (found) return found;
                }

                return null;
            };

            let button = resolveButton();

            if (!(button instanceof HTMLElement)) {
                // No button (or not clickable): ignore silently.
                vlog('submit', `no ${selector} found; nothing clicked`);

                return;
            }

            vlog(
                'submit',
                'found',
                describeNode(button),
                `disabled=${button.disabled === true}`
            );

            // The app enables submit shortly after the paste; clicking while
            // disabled does nothing, so wait for it (bounded).
            if (button.disabled === true) {
                vlog(
                    'submit',
                    `button disabled; polling every ${pollMs} ms`
                );

                const startedAt = Date.now();

                while (
                    button.disabled === true &&
                    Date.now() - startedAt < timeoutMs
                ) {
                    await new Promise(
                        (resolve) => setTimeout(resolve, pollMs)
                    );
                }

                vlog(
                    'submit',
                    `poll finished after ${Date.now() - startedAt} ms`,
                    `disabled=${button.disabled === true}`
                );

                // The app may swap the node while re-rendering.
                if (button.disabled === true) {
                    const resolved = resolveButton();

                    if (
                        resolved instanceof HTMLElement &&
                        resolved.disabled !== true
                    ) {
                        button = resolved;
                    }
                }

                if (button.disabled === true) {
                    vlog(
                        'submit',
                        'gave up waiting for the button to enable'
                    );

                    return;
                }
            }

            vlog('submit', 'clicking', describeNode(button));

            button.click();
        }


        // The submit button lives in the field's outer `.rt-Box`, not in the
        // editor wrapper's, so this specific lookup is tried first.
        function findLongAnswerSubmitButton() {
            return document.activeElement
            ?.closest(".rt-Box[class*='_long-answer-field_']")
            ?.querySelector(LONG_ANSWER_SUBMIT_SELECTOR);
        }


        // ============================================================
        // QUESTION TEXT
        // ============================================================

        // Elements whose text lives in an attribute rather than in children.
        const DESCRIPTION_TAGS = ['IMG', 'AREA', 'INPUT', 'OBJECT', 'EMBED'];


        // The only text an image has is its description, which is written into
        // alt/title or into an element referenced by aria-labelledby. Those
        // referenced labels are rendered off-screen on purpose, so they are
        // read directly instead of going through the visibility checks.
        function getElementDescriptions(element, consumed) {
            const descriptions = [];

            const push = (value) => {
                const clean = (value ?? '').replace(/\s+/g, ' ').trim();

                if (clean && !descriptions.includes(clean)) {
                    descriptions.push(clean);
                }
            };

            push(element.getAttribute('alt'));
            push(element.getAttribute('aria-label'));
            push(element.getAttribute('title'));

            const labelledBy =
                  element.getAttribute('aria-labelledby') ?? '';

            for (const id of labelledBy.split(/\s+/)) {
                if (!id) continue;

                const label =
                      element.ownerDocument?.getElementById(id);

                // Already collected by this walk, so it is not emitted twice.
                if (!label || consumed.has(label)) continue;

                consumed.add(label);

                push(label.textContent);
            }

            return descriptions;
        }


        // `consumed` carries the labelledby targets already collected, so a
        // description can neither repeat nor be skipped when its label element
        // is also part of the normal walk.
        const getCleanRecursiveText = (element, consumed = new WeakSet()) => {
            if (!element) return '';

            if (element.nodeType === Node.ELEMENT_NODE) {
                if (consumed.has(element)) {
                    return '';
                }

                const tagName = element.tagName.toUpperCase();
                const style = window.getComputedStyle(element);

                if (['STYLE', 'SCRIPT', 'NOSCRIPT', 'SVG'].includes(tagName)) {
                    return '';
                }

                if (
                    style.display === 'none' ||
                    style.visibility === 'hidden'
                ) {
                    return '';
                }

                if (
                    element.classList.contains('sr-only') ||
                    element.classList.contains('mjx-assistive-mml') ||
                    element.getAttribute('aria-hidden') === 'true'
                ) {
                    return '';
                }

                if (DESCRIPTION_TAGS.includes(tagName)) {
                    return getElementDescriptions(
                        element,
                        consumed
                    ).join(' ');
                }

                // A label on an element with no text of its own (an icon
                // button, a bare spinner) is all that element contributes.
                if (
                    !element.textContent?.trim() &&
                    element.getAttribute('aria-label')
                ) {
                    return getElementDescriptions(
                        element,
                        consumed
                    ).join(' ');
                }
            }

            return Array.from(element.childNodes)
                .map((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    return node.textContent
                        .replace(/\s+/g, ' ')
                        .trim();
                }

                if (node.nodeType === Node.ELEMENT_NODE) {
                    return getCleanRecursiveText(node, consumed);
                }

                return '';
            })
                .filter((text) => text.length > 0)
                .join(' ');
        };


        function getQuestionBox(paragraph) {
            return paragraph
                .closest('.test-question-long-answer-wrapper')
                ?.parentElement;
        }




        function getQuestionText(textbox) {
            // Preserve the existing question + rubric extraction.
            const questionBox = getQuestionBox(textbox);

            const questionText = getCleanRecursiveText(questionBox);

            vlog(
                'text:long',
                'question box',
                describeNode(questionBox),
                preview(questionText)
            );

            // Start at the answer editor's nearest scroll area.
            let scrollArea = textbox.closest('.rt-ScrollAreaRoot');

            if (!scrollArea) {
                vlog(
                    'text:long',
                    'no scroll area; using the question box only'
                );

                return questionText;
            }

            // Keep climbing until we find the outer resource box.
            let resourceBox = scrollArea.parentElement;

            while (
                resourceBox &&
                !(
                    resourceBox.classList.contains('rt-Box') &&
                    Array.from(resourceBox.classList).some(
                        className => className.startsWith('_text-resource_')
                    )
                )
            ) {
                resourceBox = resourceBox.parentElement;
            }

            // Find the resource's own scroll area, not the editor's.
            const resourceScrollArea = resourceBox
            ? Array.from(resourceBox.children).find(
                child => child.matches('.rt-ScrollAreaRoot')
            )
            : null;

            const resourceText = getCleanRecursiveText(resourceScrollArea);

            vlog(
                'text:long',
                'resource box',
                describeNode(resourceBox),
                '→ scroll area',
                describeNode(resourceScrollArea),
                preview(resourceText)
            );

            // Include the resource text first, followed by the existing
            // question and rubric text.
            return [resourceText, questionText]
                .filter(Boolean)
                .join(' ');
        }


        // ============================================================
        // SHORT ANSWER QUESTION TEXT
        // ============================================================

        function getShortAnswerQuestionTextComplete() {
            function findQuestionContainer(element) {
                let parent = element.parentElement;

                while (parent) {
                    for (const sibling of parent.parentElement?.children ?? []) {
                        if (
                            sibling !== parent &&
                            sibling.classList.contains("rt-Box") &&
                            [...sibling.classList].some(c =>
                                c.startsWith("_question-container_")
                            )
                        ) {
                            return sibling;
                        }
                    }

                    parent = parent.parentElement;
                }

                return null;
            }

            function findScrollArea(element) {
                let parent = element.parentElement;

                while (parent) {
                    const scrollArea = parent.querySelector(
                        ":scope > .rt-ScrollAreaRoot"
                    );

                    if (
                        scrollArea &&
                        !scrollArea.querySelector('[class*="_hints-container_"]')
                    ) {
                        return scrollArea;
                    }

                    parent = parent.parentElement;
                }

                return null;
            }

            const scrollArea = findScrollArea(document.activeElement);

            const questionContainer =
                  findQuestionContainer(document.activeElement);

            const context = getCleanRecursiveText(scrollArea);

            const problem = getCleanRecursiveText(questionContainer);

            vlog(
                'text:short',
                'scroll area',
                describeNode(scrollArea),
                preview(context)
            );

            vlog(
                'text:short',
                'question container',
                describeNode(questionContainer),
                preview(problem)
            );

            return `=====context=====
${context}
=====problem=====
${problem}
`;
        }



        function isTextboxFocused(textbox) {
            return textbox.isConnected && (
                document.activeElement === textbox ||
                textbox.contains(document.activeElement)
            );
        }


        // ============================================================
        // LONG ANSWER TYPING
        // ============================================================

        function insertLineBreak(target) {
            const inputEventInit = {
                inputType: 'insertParagraph',
                bubbles: true,
                cancelable: true,
            };

            try {
                target.dispatchEvent(
                    new InputEvent(
                        'beforeinput',
                        inputEventInit
                    )
                );
            } catch {
                // No fallback.
            }
        }


        async function typeIntoBulletField(
        field,
         text,
         { delayMs = 0 } = {}
        ) {
            if (
                !field ||
                !(field instanceof HTMLElement)
            ) {
                throw new TypeError(
                    'Expected an HTMLElement to type into.'
                );
            }

            if (typeof text !== 'string') {
                throw new TypeError(
                    'Text to type must be a string.'
                );
            }

            if (
                !Number.isFinite(delayMs) ||
                delayMs < 0
            ) {
                throw new RangeError(
                    'delayMs must be a non-negative number.'
                );
            }

            field.focus();

            if (document.activeElement !== field) {
                vlog(
                    'type:bullet',
                    'focus did not land; aborting; activeElement is',
                    describeNode(document.activeElement)
                );

                throw new Error(
                    'Could not focus the target field; text was not typed.'
                );
            }

            const segments = text.split(NEW_LINE_TOKEN);

            vlog(
                'type:bullet',
                `typing ${text.length} chars into`,
                describeNode(field),
                `${segments.length} segment(s), delay ${delayMs} ms`
            );

            for (let s = 0; s < segments.length; s++) {
                if (segments[s].length > 0) {
                    document.execCommand(
                        'insertText',
                        false,
                        segments[s]
                    );

                    vlog(
                        'type:bullet',
                        `segment ${s + 1}/${segments.length}`,
                        `${segments[s].length} chars`
                    );

                    if (delayMs > 0) {
                        await new Promise(
                            (resolve) => setTimeout(resolve, delayMs)
                        );
                    }
                }

                if (s < segments.length - 1) {
                    insertLineBreak(field);

                    if (delayMs > 0) {
                        await new Promise(
                            (resolve) => setTimeout(resolve, delayMs)
                        );
                    }
                }
            }
        }


        async function handleLongAnswerTextbox(textbox) {
            if (processingTextboxes.has(textbox)) {
                vlog('long-answer', 'already processing this textbox; skipping');

                return;
            }

            processingTextboxes.add(textbox);

            try {
                if (!selectedTextboxes.has(textbox)) {
                    const expandButtons = document.querySelectorAll(
                        'button[data-state="closed"][aria-expanded="false"]:has(> div)'
                    );

                    vlog(
                        'long-answer',
                        'first pass; expanding',
                        `${expandButtons.length} collapsed resource(s)`
                    );

                    expandButtons.forEach((button) => button.click());

                    const questionText =
                          getQuestionText(textbox);

                    if (!questionText) {
                        console.warn(
                            'Could not find question text for the focused long-answer textbox.'
                        );
                        return;
                    }

                    await navigator.clipboard.writeText(
                        questionText
                    );

                    selectedTextboxes.add(textbox);

                    vlog(
                        'clipboard:write',
                        'long-answer question text',
                        preview(questionText)
                    );

                    console.log(
                        'Copied question text for the focused long-answer textbox.'
                    );

                    return;
                }

                const text =
                      await navigator.clipboard.readText();

                vlog(
                    'clipboard:read',
                    'long-answer paste',
                    preview(text)
                );

                if (
                    !text ||
                    !isTextboxFocused(textbox)
                ) {
                    vlog(
                        'long-answer',
                        text
                            ? 'focus moved away; not typing'
                        : 'clipboard empty; not typing'
                    );

                    return;
                }

                await typeIntoBulletField(
                    textbox,
                    text,
                    { delayMs: 1 }
                );

                vlog('long-answer', 'typed; waiting for submit');

                await clickSubmitButton(
                    LONG_ANSWER_SUBMIT_SELECTOR,
                    {
                        passes: [findLongAnswerSubmitButton],
                    }
                );

            } catch (error) {
                console.error(
                    'Could not process the focused long-answer textbox:',
                    error
                );
            } finally {
                processingTextboxes.delete(textbox);
            }
        }


        // ============================================================
        // MATHLIVE
        // ============================================================

        function debugInlineShortcut(
        field,
         shortcut = 'sec'
        ) {
            const registeredShortcut =
                  field?.inlineShortcuts?.[shortcut];


            return registeredShortcut;
        }


        function findMatchingParen(text, openIndex) {
            let depth = 0;

            for (
                let j = openIndex;
                j < text.length;
                j++
            ) {
                if (text[j] === '(') {
                    depth++;
                } else if (text[j] === ')') {
                    depth--;

                    if (depth === 0) {
                        return j;
                    }
                }
            }

            return -1;
        }


        function matchKeywordAt(text, i) {
            for (const name of SORTED_KEYWORD_NAMES) {
                if (text.startsWith(name, i)) {
                    const before =
                          i > 0 ? text[i - 1] : '';

                    const after =
                          text[i + name.length] || '';

                    if (
                        !/[A-Za-z]/.test(before) &&
                        !/[A-Za-z]/.test(after)
                    ) {
                        return name;
                    }
                }
            }

            return null;
        }


        function resolveToLatex(text) {
            let result = '';
            let i = 0;

            while (i < text.length) {
                const arrowMatch =
                      /^\\(up|down|left|right) arrow\\/
                .exec(text.slice(i));

                if (arrowMatch) {
                    i += arrowMatch[0].length;
                    continue;
                }


                if (text.startsWith('sqrt(', i)) {
                    const openParen = i + 4;

                    const closeParen =
                          findMatchingParen(
                              text,
                              openParen
                          );

                    if (closeParen !== -1) {
                        result +=
                            `\\sqrt{${resolveToLatex(
                            text.slice(
                                openParen + 1,
                                closeParen
                            )
                        )}}`;

                        i = closeParen + 1;
                        continue;
                    }
                }


                if (text.startsWith('cbrt(', i)) {
                    const openParen = i + 4;

                    const closeParen =
                          findMatchingParen(
                              text,
                              openParen
                          );

                    if (closeParen !== -1) {
                        result +=
                            `\\sqrt[3]{${resolveToLatex(
                            text.slice(
                                openParen + 1,
                                closeParen
                            )
                        )}}`;

                        i = closeParen + 1;
                        continue;
                    }
                }


                const keyword =
                      matchKeywordAt(text, i);

                if (keyword) {
                    result += `\\${keyword}`;
                    i += keyword.length;
                    continue;
                }


                result += text[i];
                i += 1;
            }

            return result;
        }


        function buildOperations(text) {
            const operations = [];

            let i = 0;

            while (i < text.length) {
                const arrowMatch =
                      /^\\(up|down|left|right) arrow\\/
                .exec(text.slice(i));

                if (arrowMatch) {
                    operations.push({
                        type: 'arrow',
                        command:
                        arrowCommands[arrowMatch[1]],
                    });

                    i += arrowMatch[0].length;
                    continue;
                }


                if (text.startsWith('sqrt(', i)) {
                    const openParen = i + 4;

                    const closeParen =
                          findMatchingParen(
                              text,
                              openParen
                          );

                    if (closeParen !== -1) {
                        operations.push({
                            type: 'sqrt',
                            content:
                            text.slice(
                                openParen + 1,
                                closeParen
                            ),
                        });

                        i = closeParen + 1;
                        continue;
                    }
                }


                if (text.startsWith('cbrt(', i)) {
                    const openParen = i + 4;

                    const closeParen =
                          findMatchingParen(
                              text,
                              openParen
                          );

                    if (closeParen !== -1) {
                        operations.push({
                            type: 'cbrt',
                            content:
                            text.slice(
                                openParen + 1,
                                closeParen
                            ),
                        });

                        i = closeParen + 1;
                        continue;
                    }
                }


                const keyword =
                      matchKeywordAt(text, i);

                if (keyword) {
                    operations.push({
                        type: 'keyword',
                        name: keyword,
                    });

                    i += keyword.length;
                    continue;
                }


                if (text[i] === ')') {
                    operations.push({
                        type: 'closeParen',
                    });

                    i += 1;
                    continue;
                }


                if (text[i] === ' ') {
                    i += 1;
                    continue;
                }


                operations.push({
                    type: 'text',
                    value: text[i],
                });

                i += 1;
            }

            return operations;
        }


        async function typeIntoMathField(
        field,
         text,
         { delayMs = 0 } = {}
        ) {
            if (
                !field ||
                typeof field.executeCommand !== 'function'
            ) {
                throw new TypeError(
                    'Expected a MathLive <math-field> element.'
                );
            }

            if (typeof text !== 'string') {
                throw new TypeError(
                    'Text to type must be a string.'
                );
            }

            if (
                !Number.isFinite(delayMs) ||
                delayMs < 0
            ) {
                throw new RangeError(
                    'delayMs must be a non-negative number.'
                );
            }


            field.focus();

            if (
                typeof field.hasFocus !== 'function' ||
                !field.hasFocus()
            ) {
                vlog('math', 'focus did not land; aborting');

                throw new Error(
                    'Could not focus the math-field; text was not typed.'
                );
            }


            const shortcutTimeout =
                  Number(field.inlineShortcutTimeout);

            if (
                shortcutTimeout > 0 &&
                delayMs > shortcutTimeout
            ) {
                vlog(
                    'math',
                    `delay ${delayMs} ms > inlineShortcutTimeout ${shortcutTimeout} ms`
                );

                console.warn(
                    `Typing delay (${delayMs} ms) exceeds this math-field's inlineShortcutTimeout (${shortcutTimeout} ms); multi-character shortcuts may not be recognized.`
                );
            }


                const operations =
                      buildOperations(text);

                vlog(
                    'math',
                    `typing ${text.length} chars into`,
                    describeNode(field),
                    `${operations.length} operation(s), delay ${delayMs} ms`,
                    `inlineShortcutTimeout=${shortcutTimeout}`
                );

                if (operations.length > VERBOSE_OPERATION_LIMIT) {
                    vlog(
                        'math',
                        `logging only the first ${VERBOSE_OPERATION_LIMIT} of ${operations.length} operations`
                    );
                }

                let index = 0;

                for (const operation of operations) {
                    const detail =
                          operation.command ??
                          operation.name ??
                          operation.value ??
                          (operation.content !== undefined
                           ? preview(operation.content)
                           : '');

                    if (index < VERBOSE_OPERATION_LIMIT) {
                        vlog(
                            'math:op',
                            `${index + 1}/${operations.length}`,
                            operation.type,
                            detail
                        );
                    }
                    if (operation.type === 'arrow') {
                        field.executeCommand(
                            operation.command
                        );

                    } else if (operation.type === 'keyword') {
                        field.executeCommand([
                            'insert',
                            `\\${operation.name}`,
                            { format: 'latex' },
                        ]);

                    } else if (operation.type === 'sqrt') {
                        field.executeCommand([
                            'insert',
                            `\\sqrt{${resolveToLatex(
                                operation.content
                            )}}`,
                            { format: 'latex' },
                        ]);

                    } else if (operation.type === 'cbrt') {
                        field.executeCommand([
                            'insert',
                            `\\sqrt[3]{${resolveToLatex(
                                operation.content
                            )}}`,
                            { format: 'latex' },
                        ]);

                    } else if (
                        operation.type === 'closeParen'
                    ) {
                        field.executeCommand(
                            'moveToNextChar'
                        );

                    } else {
                        field.executeCommand([
                            'typedText',
                            operation.value,
                            {
                                simulateKeystroke: true,
                            },
                        ]);
                    }


                    index += 1;

                    if (
                        delayMs > 0 &&
                        index < operations.length
                    ) {
                        await new Promise(
                            (resolve) =>
                            setTimeout(resolve, delayMs)
                        );
                    }
                }
            }


        // Keep these globally accessible like your original script.
        window.typeIntoMathField =
            typeIntoMathField;

        window.debugMathFieldInlineShortcut =
            debugInlineShortcut;


        async function copyShortAnswerQuestionText(field) {
            const questionText =
                  getShortAnswerQuestionTextComplete();

            // The template always carries its section markers, so strip them
            // to tell whether anything was actually extracted.
            const extracted = questionText
            .replace(/=====context=====|=====problem=====/g, '')
            .trim();

            vlog(
                'text:short',
                'extracted for',
                describeNode(field),
                preview(extracted)
            );

            if (!extracted) {
                console.warn(
                    'Could not find question text for the focused short-answer field.'
                );

                return;
            }

            await navigator.clipboard.writeText(
                questionText
            );

            selectedFields.add(field);

            vlog(
                'clipboard:write',
                'short-answer question text',
                preview(questionText)
            );

            console.log(
                'Copied question text for the focused short-answer field.'
            );
        }


        async function typeClipboardInto(field) {
            const id = field.id;

            if (!id || readingIds.has(id)) {
                vlog(
                    'short-answer',
                    id
                        ? 'already reading this field; skipping'
                    : 'field has no id; skipping'
                );

                return;
            }

            if (
                field.value &&
                field.value.trim() !== ''
            ) {
                vlog('short-answer', 'field already answered; skipping', id);

                return;
            }

            readingIds.add(id);

            vlog('short-answer', 'reading the clipboard for', id);

            try {
                let text;

                try {
                    text =
                        await navigator.clipboard.readText();
                } catch (error) {
                    console.warn(
                        'Could not read clipboard text. Clipboard access may be unavailable.',
                        error
                    );

                    return;
                }

                vlog(
                    'clipboard:read',
                    'short-answer paste',
                    preview(text)
                );

                if (
                    !text || !field.isConnected ||
                    !field.hasFocus()
                ) {
                    vlog(
                        'short-answer',
                        text
                            ? 'focus moved away; not typing'
                        : 'clipboard empty; not typing'
                    );

                    return;
                }

                if (
                    field.value && field.value.trim() !== ''
                ) {
                    vlog(
                        'short-answer',
                        'answered meanwhile; not typing'
                    );

                    return;
                }

                field.executeCommand('selectAll');
                field.executeCommand('deleteBackward');

                await typeIntoMathField(
                    field,
                    text,
                    { delayMs: 4 }
                );

                vlog('short-answer', 'typed; waiting for submit');

                await clickSubmitButton(
                    SHORT_ANSWER_SUBMIT_SELECTOR
                );

            } catch (error) {
                console.error(
                    'Could not type clipboard text into the math-field:',
                    error
                );
            } finally {
                readingIds.delete(id);
            }
        }


        // ============================================================
        // FOCUS HANDLER
        // ============================================================

        async function handleFocus(event) {
            if (handlingFocus) {
                vlog('focus', 'another focus is being handled; ignoring');

                return;
            }

            const textbox =
                  findLongAnswerTextbox(event);

            const field =
                  findMathField(event);

            if (!textbox && !field) {
                return;
            }

            vlog(
                'focus',
                'focusin on',
                describeNode(event.target),
                `textbox=${describeNode(textbox)}`,
                `field=${describeNode(field)}`
            );


            // First focus on a long-answer textbox:
            // copy the question.
            if (
                textbox &&
                !selectedTextboxes.has(textbox)
            ) {
                vlog(
                    'focus',
                    'first focus on this long-answer textbox; copying the question'
                );

                handlingFocus = true;

                try {
                    await handleLongAnswerTextbox(
                        textbox
                    );
                } finally {
                    handlingFocus = false;
                }

                return;
            }


            // First focus on a short-answer math field:
            // copy the question.
            if (field && !selectedFields.has(field)) {
                vlog(
                    'focus',
                    'first focus on this math-field; copying the question'
                );

                handlingFocus = true;

                try {
                    await copyShortAnswerQuestionText(
                        field
                    );
                } finally {
                    handlingFocus = false;
                }

                return;
            }


            let intentional_paste = false;

            try {
                const clipboardText =
                      await navigator.clipboard.readText();

                vlog(
                    'focus',
                    'paste check; clipboard',
                    preview(clipboardText)
                );

                if (
                    clipboardText.startsWith(
                        '##########'
                    )
                ) {
                    await navigator.clipboard.writeText(
                        clipboardText.slice(10)
                    );

                    intentional_paste = true;
                }

            } catch (error) {
                console.warn(
                    'Could not inspect clipboard:',
                    error
                );
            }


            if (!intentional_paste) {
                vlog(
                    'focus',
                    'no ########## marker; cancelling the paste'
                );

                const msg =
                      document.createElement('div');

                msg.textContent =
                    'Accidental paste detected';

                const r =
                      event.target.getBoundingClientRect();

                Object.assign(msg.style, {
                    position: 'fixed',
                    left: `${r.left + 20}px`,
                    top: `${r.top - 20}px`,
                    color: 'red',
                    font: '11px sans-serif',
                    pointerEvents: 'none',
                    zIndex: '2147483647',
                    whiteSpace: 'nowrap',
                });

                document.body.appendChild(msg);

                setTimeout(
                    () => msg.remove(),
                    1200
                );

                return;
            }


            vlog(
                'focus',
                '########## found; typing the clipboard into the target'
            );

            handlingFocus = true;

            try {
                if (textbox) {
                    await handleLongAnswerTextbox(
                        textbox
                    );

                    return;
                }

                if (field) {
                    await typeClipboardInto(field);
                }

            } finally {
                handlingFocus = false;
            }
        }


        document.addEventListener(
            'focusin',
            handleFocus
        );


        // ============================================================
        // MULTIPLE CHOICE
        // ============================================================

        const mcqOptionListClass =
              'test-question-mcq-option-list';

        const mcqChoicePattern =
              /^\(Choice #([1-9]\d*)\)$/;

        const mcqChoiceInputSelector =
              'input[type="radio"], input[type="checkbox"]';

        const MCQ_LOG_PREFIX = '[Auto Learnvia][mcq]';

        let processingChoice = false;

        // Filled before the click so the handler can cancel it synchronously;
        // preventDefault() after an await is too late to undo the click.
        let cachedChoiceIndex = null;

        // Lists whose question text has already been copied. The first click
        // copies and is cancelled; later clicks perform the choice selection.
        const selectedChoiceLists = new Set();

        // The option list whose question was copied most recently. Returning
        // to the tab answers it from the clipboard without another click.
        let pendingChoiceList = null;

        // Separate from `processingChoice`: a tab return waits on the OS to
        // answer a clipboard read, and that wait must never block real clicks.
        let handlingTabReturn = false;

        // A click can arrive before the clipboard read it kicked off has
        // landed. That click waits for a fresh read instead of giving up;
        // this keeps two such waits from answering the same list twice.
        let resolvingChoice = false;


        function describeNode(element) {
            if (!element) return 'null';

            if (typeof element.tagName !== 'string') {
                return String(element);
            }

            const id = element.id ? `#${element.id}` : '';

            const classNames =
                  typeof element.className === 'string'
            ? element.className
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .map((name) => `.${name}`)
                .join('')
            : '';

            return `${element.tagName.toLowerCase()}${id}${classNames}`;
        }


        function mcqLog(...args) {
            console.log(MCQ_LOG_PREFIX, ...args);
        }


        // ------------------------------------------------------------
        // MCQ QUESTION TEXT
        // ------------------------------------------------------------

        const mcqTextResourcePrefix = '_text-resource_';
        const mcqHasQuestionsPrefix = '_has-questions_';

        const mcqTextResourceSelector =
              `[class*="${mcqTextResourcePrefix}"]`;


        function classNamesOf(element) {
            return element?.classList ? [...element.classList] : [];
        }


        function classStartsWith(element, prefix) {
            return classNamesOf(element)
                .some((name) => name.startsWith(prefix));
        }


        function findAncestor(element, predicate) {
            let parent = element?.parentElement ?? null;

            while (parent) {
                if (parent.classList && predicate(parent)) {
                    return parent;
                }

                parent = parent.parentElement;
            }

            return null;
        }


        function describeAncestors(element, limit = 8) {
            const chain = [];

            let parent = element?.parentElement ?? null;

            while (parent && chain.length < limit) {
                chain.push(describeNode(parent));

                parent = parent.parentElement;
            }

            return chain.join(' < ');
        }


        // Finds the single match inside the nearest ancestor that holds
        // exactly one, so a neighbouring question's prompt cannot be picked up
        // by mistake.
        function findOneInsideAncestors(element, selector) {
            let parent = element?.parentElement ?? null;

            while (parent) {
                const matches = parent.querySelectorAll?.(selector);

                if (matches?.length === 1) {
                    return matches[0];
                }

                if (matches && matches.length > 1) {
                    return null;
                }

                parent = parent.parentElement;
            }

            return null;
        }


        // The question text lives in an "rt-Box" ancestor, but which marker
        // classes that box carries differs between question layouts, so try
        // the exact rule first and then progressively relax it.
        const mcqTextResourceFinders = [
            {
                name: 'rt-Box with text-resource + has-questions',
                find: (element) => findAncestor(
                    element,
                    (node) => node.classList.contains('rt-Box') &&
                        classStartsWith(node, mcqTextResourcePrefix) &&
                        classStartsWith(node, mcqHasQuestionsPrefix)
                ),
            },
            {
                // Immediately after the exact rule: the test hook is a precise
                // marker, unlike the looser text-resource heuristics below,
                // and some layouts carry no text-resource classes at all. It
                // sits in a sibling branch of the option list, not above it.
                name: 'test-question-prompt',
                find: (element) => findOneInsideAncestors(
                    element,
                    '.test-question-prompt'
                ),
            },
            {
                name: 'question text inside the MCQ container',
                find: (element) => findOneInsideAncestors(
                    element,
                    '.test-question-mcq [class*="_question-text_"]'
                ),
            },
            {
                name: 'text-resource ancestor',
                find: (element) => findAncestor(
                    element,
                    (node) => classStartsWith(node, mcqTextResourcePrefix)
                ),
            },
            {
                name: 'has-questions ancestor holding a text resource',
                find: (element) => findAncestor(
                    element,
                    (node) => classStartsWith(node, mcqHasQuestionsPrefix) &&
                        node.querySelector?.(mcqTextResourceSelector)
                )?.querySelector?.(mcqTextResourceSelector),
            },
            {
                // The text resource can sit in a sibling branch rather than
                // on the option list's own ancestor chain. Only accept it when
                // exactly one exists in the ancestor, so another question's
                // text cannot be picked up by mistake.
                name: 'single text resource inside an ancestor',
                find: (element) => {
                    let parent = element?.parentElement ?? null;

                    while (parent) {
                        const resources =
                              parent.querySelectorAll?.(mcqTextResourceSelector);

                        if (resources?.length === 1) {
                            return resources[0];
                        }

                        if (resources && resources.length > 1) {
                            return null;
                        }

                        parent = parent.parentElement;
                    }

                    return null;
                },
            },
        ];


        function getMcqText(element) {
            for (const finder of mcqTextResourceFinders) {
                const resource = finder.find(element);

                if (!resource) {
                    vlog('mcq:text', `miss  ${finder.name}`);

                    continue;
                }

                const text = getCleanRecursiveText(resource);

                if (!text.trim()) {
                    vlog(
                        'mcq:text',
                        `empty ${finder.name}:`,
                        describeNode(resource),
                        'had no readable text'
                    );

                    continue;
                }

                vlog(
                    'mcq:text',
                    `match ${finder.name}:`,
                    describeNode(resource),
                    preview(text)
                );

                return text;
            }

            vlog('mcq:text', 'every finder missed; no question text');

            return '';
        }


        // Clipboard promises are not guaranteed to settle — a read issued
        // while the document loses focus can stay pending — and the callers
        // hold a guard across the await, so every clipboard call is bounded.
        const CLIPBOARD_TIMEOUT_MS = 1500;

        let clipboardReadId = 0;

        // The newest read's promise. A read that gets superseded waits for
        // this instead of reporting a stale answer.
        let latestChoiceRead = Promise.resolve(null);


        function withTimeout(promise, ms, label) {
            let timer = null;

            const timeout = new Promise((resolve, reject) => {
                timer = setTimeout(
                    () => reject(
                        new Error(`${label} timed out after ${ms} ms`)
                    ),
                    ms
                );
            });

            return Promise.race([promise, timeout])
                .finally(() => clearTimeout(timer));
        }


        // Resolves to the choice the clipboard holds (null when it holds no
        // `(Choice #N)`), or `undefined` when the clipboard could not be read
        // at all — Chrome refuses reads while the document is not focused.
        async function refreshCachedChoice(source) {
            const readId = ++clipboardReadId;

            vlog('choice:read', `#${readId} started by ${source}`);

            const read = (async () => {
                try {
                    const clipboard = await withTimeout(
                        navigator.clipboard.readText(),
                        CLIPBOARD_TIMEOUT_MS,
                        'clipboard read'
                    );

                    const match = clipboard.match(mcqChoicePattern);

                    const value = match ? Number(match[1]) : null;


                    vlog(
                        'choice:read',
                        `#${readId} clipboard`,
                        preview(clipboard)
                    );

                    return value;
                } catch (error) {
                    vlog(
                        'choice:read',
                        `#${readId} failed:`,
                        error?.message ?? error
                    );

                    return undefined;
                }
            })();

            const settled = (async () => {
                let value = await read;

                // A newer read started while this one was in flight, so this
                // one's answer may already be stale. Report whatever that
                // newer read settles on: returning early with nothing here
                // handed callers a null choice while the real answer was
                // still arriving, which suppressed the click.
                if (readId !== clipboardReadId) {
                    vlog(
                        'choice:read',
                        `#${readId} superseded by #${clipboardReadId}; awaiting the newer read`
                    );

                    value = await latestChoiceRead;

                    return value;
                }

                // Only the newest read owns the cache, and a failed read is
                // not evidence that the clipboard changed.
                if (value !== undefined) {
                    vlog(
                        'choice:cache',
                        `cachedChoiceIndex ${cachedChoiceIndex} → ${value}`
                    );

                    cachedChoiceIndex = value;
                }

                return value;
            })();

            latestChoiceRead = settled;

            return settled;
        }


        function handleChoicePointerDown() {
            refreshCachedChoice('pointerdown');
        }


        function handleChoiceFocusIn() {
            refreshCachedChoice('focusin');
        }


        function findOptionList(target) {
            let element = target;

            while (
                element &&
                !element.classList?.contains(mcqOptionListClass)
            ) {
                element = element.parentElement;
            }

            return element;
        }


        // Clicks option `choice` of a list. Returns whether a click was
        // dispatched; false means the choice was missing or out of range.
        function clickCachedChoice(element, choice = cachedChoiceIndex) {
            const N = element.children.length;

            const X = choice ?? null;

            vlog(
                'choice:click',
                `choice #${X} of ${N} in`,
                describeNode(element)
            );

            if (X === null) {
                vlog('choice:click', 'no cached choice; nothing clicked');

                return false;
            }

            console.assert(
                0 < X && X <= N,
                `Choice #${X} is out of range (1–${N})`
            );

            if (!(0 < X && X <= N)) {
                vlog(
                    'choice:click',
                    `#${X} is outside 1–${N}; nothing clicked`
                );

                return false;
            }

            const option = element.children[X - 1];

            const input =
                  typeof option.querySelector === 'function'
            ? option.querySelector(mcqChoiceInputSelector)
            : null;

            const choiceTarget = input ?? option;

            vlog(
                'choice:click',
                `clicking #${X}`,
                describeNode(choiceTarget),
                input ? '(its input)' : '(the option itself)'
            );

            choiceTarget.click();


            return true;
        }


        // Dispatches the cached choice with the re-entrancy guard held only
        // around the synchronous click, so a pending clipboard read elsewhere
        // can never lock the page.
        function dispatchCachedChoice(element, choice = cachedChoiceIndex) {
            vlog('choice:dispatch', `dispatching choice #${choice}`);

            processingChoice = true;

            try {
                if (!clickCachedChoice(element, choice)) {
                    vlog('choice:dispatch', 'click was not dispatched');

                    return false;
                }

                vlog(
                    'choice:dispatch',
                    'dispatched; clearing the pending list'
                );

                pendingChoiceList = null;

                return true;
            } finally {
                processingChoice = false;
            }
        }


        // The click handler needs `cachedChoiceIndex` synchronously to decide
        // whether to swallow the click, but the read is async and usually has
        // not landed yet. The click is already cancelled by then, so rather
        // than swallowing it for nothing, wait for a fresh read and answer.
        async function answerFromClipboard(element, source) {
            if (resolvingChoice) {
                vlog(
                    'choice:resolve',
                    'a resolution is already in flight; skipping'
                );

                return false;
            }

            vlog(
                'choice:resolve',
                `resolving from the clipboard (${source})`
            );

            resolvingChoice = true;

            try {
                const choice = await refreshCachedChoice(source);

                if (!element.isConnected) {
                    vlog('choice:resolve', 'list left the document; giving up');

                    return false;
                }

                if (choice === undefined) {
                    vlog('choice:resolve', 'clipboard unreadable; giving up');

                    return false;
                }

                return dispatchCachedChoice(element, choice);
            } finally {
                resolvingChoice = false;
            }
        }


        async function handleChoiceClick(event) {
            if (processingChoice) {
                vlog(
                    'mcq:click',
                    'a choice is already being processed; ignoring'
                );

                return;
            }

            const element = findOptionList(event.target);

            if (!element) {
                return;
            }

            const N = element.children.length;



            // First click on a list: copy the question text instead of
            // selecting anything.
            if (!selectedChoiceLists.has(element)) {
                vlog(
                    'mcq:click',
                    `first click on ${describeNode(element)}`,
                    `(${element.children.length} options,`,
                    `cachedChoiceIndex=${cachedChoiceIndex});`,
                    'copying the question'
                );

                const questionText = getMcqText(element);

                if (!questionText.trim()) {
                    vlog(
                        'mcq:click',
                        'no question text; letting the click through'
                    );

                    return;
                }

                // Synchronous, so the click cannot select an option.
                event.preventDefault();
                event.stopPropagation();


                processingChoice = true;

                try {
                    try {
                        await withTimeout(
                            navigator.clipboard.writeText(questionText),
                            CLIPBOARD_TIMEOUT_MS,
                            'clipboard write'
                        );
                    } catch (error) {
                        console.warn(
                            'Could not copy the MCQ question text.',
                            error
                        );

                        return;
                    }

                    vlog(
                        'clipboard:write',
                        'MCQ question text',
                        preview(questionText)
                    );

                    selectedChoiceLists.add(element);

                    pendingChoiceList = element;

                    tabReturnRetries = 0;

                    mcqLog(
                        'copied question text —',
                        `${questionText.length} chars`
                    );
                } finally {
                    processingChoice = false;
                }

                return;
            }


            // Synchronous, so it actually cancels the click the user made.
            event.preventDefault();
            event.stopPropagation();


            if (cachedChoiceIndex !== null) {
                vlog(
                    'mcq:click',
                    `second click with cached choice #${cachedChoiceIndex}; dispatching`
                );

                dispatchCachedChoice(element);

                return;
            }

            vlog(
                'mcq:click',
                'second click with no cached choice; resolving from the clipboard'
            );

            await answerFromClipboard(element, 'click');
        }


        // ------------------------------------------------------------
        // RETURNING TO THE TAB
        // ------------------------------------------------------------

        // `focus` can fire while the return handler is still waiting on an
        // unreadable clipboard, in which case that attempt is dropped. Retry a
        // few times so coming back to the tab still answers on its own.
        const TAB_RETURN_RETRY_LIMIT = 4;
        const TAB_RETURN_RETRY_MS = 200;

        let tabReturnRetries = 0;


        function scheduleTabReturnRetry() {
            if (tabReturnRetries >= TAB_RETURN_RETRY_LIMIT) {
                vlog(
                    'tab-return',
                    `retry limit (${TAB_RETURN_RETRY_LIMIT}) reached; giving up`
                );

                tabReturnRetries = 0;

                return;
            }

            tabReturnRetries += 1;

            vlog(
                'tab-return',
                `scheduling retry ${tabReturnRetries}/${TAB_RETURN_RETRY_LIMIT}`,
                `in ${TAB_RETURN_RETRY_MS} ms`
            );

            setTimeout(() => {
                if (!pendingChoiceList || !pendingChoiceList.isConnected) {
                    vlog(
                        'tab-return',
                        'nothing pending any more; dropping the retry'
                    );

                    tabReturnRetries = 0;

                    return;
                }

                if (document.visibilityState !== 'visible') {
                    vlog('tab-return', 'still hidden; retry skipped');

                    return;
                }

                // The read would only be refused again.
                if (!document.hasFocus()) {
                    vlog('tab-return', 'not focused yet; retry skipped');

                    return;
                }

                handleReturnToTab({ type: 'retry' });
            }, TAB_RETURN_RETRY_MS);
        }


        // Leaving the tab to get an answer keeps the question armed, so
        // coming back applies `(Choice #N)` from the clipboard directly.
        async function handleReturnToTab(event) {
            if (
                event?.type === 'visibilitychange' &&
                document.visibilityState !== 'visible'
            ) {
                return;
            }

            const element = pendingChoiceList;

            if (!element || !element.isConnected) {
                return;
            }

            if (handlingTabReturn) {
                vlog('tab-return', 'already handling a return; ignoring');

                return;
            }

            vlog(
                'tab-return',
                `handling ${event?.type ?? 'manual'}; pending list`,
                describeNode(element)
            );

            // A genuine return (not a retry) gets a fresh retry budget.
            if (event?.type !== 'retry') {
                tabReturnRetries = 0;
            }

            handlingTabReturn = true;

            let failed = false;

            try {
                const choice = await refreshCachedChoice(
                    event?.type ?? 'tab return'
                );

                // The user may have moved on while the clipboard was read.
                if (pendingChoiceList !== element) {
                    vlog(
                        'tab-return',
                        'the pending list changed; dropping this answer'
                    );

                    return;
                }

                if (!element.isConnected) {
                    vlog(
                        'tab-return',
                        'the pending list left the document; clearing it'
                    );

                    pendingChoiceList = null;

                    return;
                }

                // `visibilitychange` fires just before the document gains
                // focus, so Chrome can refuse the read here. Stay armed and
                // retry rather than answering with nothing.
                if (choice === undefined) {
                    vlog('tab-return', 'clipboard unreadable; retrying');

                    failed = true;


                    return;
                }

                // A click that landed while this read was in flight resolves
                // through the click path; letting both dispatch would click
                // the option twice and toggle a checkbox back off.
                if (resolvingChoice) {
                    vlog(
                        'tab-return',
                        'a click resolution is in flight; letting it answer'
                    );

                    return;
                }

                // Held only around the synchronous dispatch, which is all the
                // re-entrant click needs suppressing for. A slow clipboard
                // read therefore cannot lock the page's clicks.
                vlog('tab-return', `answering with choice #${choice}`);

                dispatchCachedChoice(element, choice);
            } finally {
                handlingTabReturn = false;

                if (failed) {
                    scheduleTabReturnRetry();
                }
            }
        }


        document.addEventListener(
            'click',
            handleChoiceClick,
            true
        );

        document.addEventListener(
            'pointerdown',
            handleChoicePointerDown,
            true
        );

        document.addEventListener(
            'focusin',
            handleChoiceFocusIn,
            true
        );

        document.addEventListener(
            'visibilitychange',
            handleReturnToTab
        );

        // `visibilitychange` can fire before the document is focused, in which
        // case the clipboard read is refused; this retries once it is.
        window.addEventListener(
            'focus',
            handleReturnToTab
        );


        // ============================================================
        // NEXT QUESTION (ALL QUESTION TYPES)
        // ============================================================

        const NEXT_QUESTION_SELECTOR =
              'button[aria-label="Next question"]';

        const NEXT_QUESTION_ENABLED_SELECTOR =
              `${NEXT_QUESTION_SELECTOR}:not([aria-disabled="true"])`;


        function findNextQuestionButton() {
            for (
                const button of document.querySelectorAll(
                    NEXT_QUESTION_ENABLED_SELECTOR
                )
            ) {
                if (button.disabled === true) continue;

                // Skip copies that are rendered but not on screen.
                if (button.getClientRects().length === 0) continue;

                return button;
            }

            return null;
        }


        // The button is only enabled once the question has been answered, so
        // the click is driven by the state change rather than by a timer.
        let lastNextQuestionButton = null;
        let lastNextQuestionEnabled = false;

        let nextQuestionCheckTimer = null;


        function advanceToNextQuestion() {
            const button = findNextQuestionButton();

            const enabled = button !== null;

            const wasEnabled =
                  enabled &&
                  lastNextQuestionEnabled &&
                  button === lastNextQuestionButton;

            const previouslyEnabled = lastNextQuestionEnabled;

            lastNextQuestionButton = button;
            lastNextQuestionEnabled = enabled;

            if (previouslyEnabled && !enabled) {
                vlog('next', 'next button went away (disabled or hidden)');
            }

            // Only act on the disabled → enabled transition (or a new node),
            // so one answer advances exactly one question.
            if (!enabled || wasEnabled) {
                return;
            }

            vlog(
                'next',
                'next button became enabled; clicking it',
                describeNode(button)
            );

            console.log(
                'AUTO LEARNVIA: advancing to the next question'
            );

            button.click();
        }


        // Mutation bursts are coalesced into a single DOM read.
        function scheduleNextQuestionCheck() {
            if (nextQuestionCheckTimer !== null) return;

            nextQuestionCheckTimer = setTimeout(
                () => {
                    nextQuestionCheckTimer = null;

                    vlog('next', 'mutation burst settled; re-checking the button');

                    advanceToNextQuestion();
                },
                0
            );
        }


        // Prime the state so a button that was already enabled when the
        // script loaded (an earlier answer, a revisited question) is left
        // alone until it changes.
        lastNextQuestionButton = findNextQuestionButton();
        lastNextQuestionEnabled = lastNextQuestionButton !== null;


        const nextQuestionObserver = new MutationObserver(
            scheduleNextQuestionCheck
        );

        nextQuestionObserver.observe(
            document.documentElement,
            {
                subtree: true,
                childList: true,
                attributes: true,
                attributeFilter: ['aria-disabled'],
            }
        );


        // ============================================================
        // CLEANUP FOR SPA NAVIGATION
        // ============================================================

        cleanup = () => {
            vlog(
                'init',
                'removing listeners, observers and timers',
                `(${verboseHistory.length} log entries so far)`
            );

            document.removeEventListener(
                'focusin',
                handleFocus
            );

            document.removeEventListener(
                'click',
                handleChoiceClick,
                true
            );

            document.removeEventListener(
                'pointerdown',
                handleChoicePointerDown,
                true
            );

            document.removeEventListener(
                'focusin',
                handleChoiceFocusIn,
                true
            );

            document.removeEventListener(
                'visibilitychange',
                handleReturnToTab
            );

            window.removeEventListener(
                'focus',
                handleReturnToTab
            );

            nextQuestionObserver.disconnect();

            if (nextQuestionCheckTimer !== null) {
                clearTimeout(nextQuestionCheckTimer);

                nextQuestionCheckTimer = null;
            }

            vlog('init', 'teardown complete');
        };

        vlog(
            'init',
            'ready;',
            `nextButton=${lastNextQuestionButton !== null}`,
            `set up in ${elapsed(initializedAt)}`
        );
    }


    // ================================================================
    // INITIAL LOAD
    // ================================================================

    initialize();


    // ================================================================
    // LEARNVIA SPA URL CHANGES
    // ================================================================

    window.onurlchange = function(event) {
        vlog('init', 'SPA navigation detected', location.href);

        initialize();
    };

})();