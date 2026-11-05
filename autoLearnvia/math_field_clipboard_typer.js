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

    let cleanup = null;

    function initialize() {
        console.log('AUTO LEARNVIA INITIALIZED:', location.href);

        // Remove the previous page's listener/state.
        if (cleanup) {
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
                    return node;
                }
            }

            const target = event.target;

            return target instanceof Element
                ? target.closest(fieldSelector)
            : null;
        }

        function findLongAnswerTextbox(event) {
            for (const node of event.composedPath()) {
                if (
                    node instanceof HTMLElement &&
                    node.matches(longAnswerTextboxSelector)
                ) {
                    return node;
                }
            }

            const target = event.target;

            return target instanceof Element
                ? target.closest(longAnswerTextboxSelector)
            : null;
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
                return;
            }

            // The app enables submit shortly after the paste; clicking while
            // disabled does nothing, so wait for it (bounded).
            if (button.disabled === true) {
                const startedAt = Date.now();

                while (
                    button.disabled === true &&
                    Date.now() - startedAt < timeoutMs
                ) {
                    await new Promise(
                        (resolve) => setTimeout(resolve, pollMs)
                    );
                }

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
                    return;
                }
            }

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
            const questionText = getCleanRecursiveText(
                getQuestionBox(textbox)
            );

            // Start at the answer editor's nearest scroll area.
            let scrollArea = textbox.closest('.rt-ScrollAreaRoot');

            if (!scrollArea) {
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

            const context = getCleanRecursiveText(
                findScrollArea(document.activeElement)
            );

            const problem = getCleanRecursiveText(
                findQuestionContainer(document.activeElement)
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
                throw new Error(
                    'Could not focus the target field; text was not typed.'
                );
            }

            const segments = text.split(NEW_LINE_TOKEN);

            for (let s = 0; s < segments.length; s++) {
                if (segments[s].length > 0) {
                    document.execCommand(
                        'insertText',
                        false,
                        segments[s]
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
            if (processingTextboxes.has(textbox)) return;

            processingTextboxes.add(textbox);

            try {
                if (!selectedTextboxes.has(textbox)) {

                    document
                        .querySelectorAll(
                        'button[data-state="closed"][aria-expanded="false"]:has(> div)'
                    )
                        .forEach((button) => button.click());

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

                    console.log(
                        'Copied question text for the focused long-answer textbox.'
                    );

                    return;
                }

                const text =
                      await navigator.clipboard.readText();

                if (
                    !text ||
                    !isTextboxFocused(textbox)
                ) {
                    return;
                }

                await typeIntoBulletField(
                    textbox,
                    text,
                    { delayMs: 1 }
                );

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

            console.log(
                `MathLive inline shortcut "${shortcut}":`,
                registeredShortcut
            );

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
                console.warn(
                    `Typing delay (${delayMs} ms) exceeds this math-field's inlineShortcutTimeout (${shortcutTimeout} ms); multi-character shortcuts may not be recognized.`
                );
            }


                const operations =
                      buildOperations(text);

                let index = 0;

                for (const operation of operations) {

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

            console.log(
                'Copied question text for the focused short-answer field.'
            );
        }


        async function typeClipboardInto(field) {
            const id = field.id;

            if (!id || readingIds.has(id)) {
                return;
            }

            if (
                field.value &&
                field.value.trim() !== ''
            ) {
                return;
            }

            readingIds.add(id);

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

                if (
                    !text ||
                    !field.isConnected ||
                    !field.hasFocus()
                ) {
                    return;
                }

                if (
                    field.value &&
                    field.value.trim() !== ''
                ) {
                    return;
                }

                field.executeCommand('selectAll');
                field.executeCommand('deleteBackward');

                await typeIntoMathField(
                    field,
                    text,
                    { delayMs: 4 }
                );

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
            if (handlingFocus) return;

            const textbox =
                  findLongAnswerTextbox(event);

            const field =
                  findMathField(event);

            if (!textbox && !field) {
                return;
            }


            // First focus on a long-answer textbox:
            // copy the question.
            if (
                textbox &&
                !selectedTextboxes.has(textbox)
            ) {
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

                if (!resource) continue;

                const text = getCleanRecursiveText(resource);

                if (!text.trim()) {
                    mcqLog(
                        'question text source is empty —',
                        describeNode(resource),
                        `(${finder.name}), trying the next rule`
                    );

                    continue;
                }

                mcqLog(
                    'question text source —',
                    describeNode(resource),
                    `(${finder.name}, ${text.length} chars)`
                );

                return text;
            }

            mcqLog(
                'no question text found; ancestors —',
                describeAncestors(element) || 'none'
            );

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

            const read = (async () => {
                try {
                    const clipboard = await withTimeout(
                        navigator.clipboard.readText(),
                        CLIPBOARD_TIMEOUT_MS,
                        'clipboard read'
                    );

                    const match = clipboard.match(mcqChoicePattern);

                    const value = match ? Number(match[1]) : null;

                    mcqLog(
                        `choice cache refreshed (${source}) —`,
                        JSON.stringify(clipboard),
                        '→',
                        value === null ? 'no choice' : `choice ${value}`
                    );

                    return value;
                } catch (error) {
                    mcqLog(
                        `choice cache refresh failed (${source}) —`,
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
                    value = await latestChoiceRead;

                    return value;
                }

                // Only the newest read owns the cache, and a failed read is
                // not evidence that the clipboard changed.
                if (value !== undefined) {
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

            mcqLog(
                'cached choice —',
                X === null ? 'none' : X,
                `(options: ${N})`
            );

            if (X === null) {
                mcqLog('no cached choice, ignoring');

                return false;
            }

            console.assert(
                0 < X && X <= N,
                `Choice #${X} is out of range (1–${N})`
            );

            if (!(0 < X && X <= N)) {
                mcqLog(`choice ${X} is out of range (1–${N}), ignoring`);

                return false;
            }

            const option = element.children[X - 1];

            const input =
                  typeof option.querySelector === 'function'
            ? option.querySelector(mcqChoiceInputSelector)
            : null;

            const choiceTarget = input ?? option;

            mcqLog(
                `clicking option ${X} of ${N} —`,
                describeNode(choiceTarget),
                input ? '(input)' : '(option container)'
            );

            choiceTarget.click();

            mcqLog(`option ${X} click dispatched`);

            return true;
        }


        // Dispatches the cached choice with the re-entrancy guard held only
        // around the synchronous click, so a pending clipboard read elsewhere
        // can never lock the page.
        function dispatchCachedChoice(element, choice = cachedChoiceIndex) {
            processingChoice = true;

            try {
                if (!clickCachedChoice(element, choice)) {
                    return false;
                }

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
                mcqLog('already resolving a choice, ignoring');

                return false;
            }

            resolvingChoice = true;

            try {
                mcqLog(`no cached choice yet (${source}), re-reading clipboard`);

                const choice = await refreshCachedChoice(source);

                if (!element.isConnected) {
                    mcqLog('option list is gone, ignoring');

                    return false;
                }

                if (choice === undefined) {
                    mcqLog('clipboard unreadable, not answering');

                    return false;
                }

                return dispatchCachedChoice(element, choice);
            } finally {
                resolvingChoice = false;
            }
        }


        async function handleChoiceClick(event) {
            mcqLog(
                'click —',
                describeNode(event.target)
            );

            if (processingChoice) {
                mcqLog('already processing a choice, ignoring');

                return;
            }

            const element = findOptionList(event.target);

            if (!element) {
                mcqLog('not inside an option list, ignoring');

                return;
            }

            const N = element.children.length;

            mcqLog(
                'option list —',
                describeNode(element),
                `(options: ${N})`
            );


            // First click on a list: copy the question text instead of
            // selecting anything.
            if (!selectedChoiceLists.has(element)) {
                const questionText = getMcqText(element);

                if (!questionText.trim()) {
                    mcqLog(
                        'could not find question text, letting the click through'
                    );

                    return;
                }

                // Synchronous, so the click cannot select an option.
                event.preventDefault();
                event.stopPropagation();

                mcqLog(
                    'cancelled the original click (first click: copying question)'
                );

                processingChoice = true;

                try {
                    try {
                        await withTimeout(
                            navigator.clipboard.writeText(questionText),
                            CLIPBOARD_TIMEOUT_MS,
                            'clipboard write'
                        );
                    } catch (error) {
                        mcqLog(
                            'could not write the clipboard —',
                            error?.message ?? error
                        );

                        console.warn(
                            'Could not copy the MCQ question text.',
                            error
                        );

                        return;
                    }

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

            mcqLog('cancelled the original click');

            if (cachedChoiceIndex !== null) {
                dispatchCachedChoice(element);

                return;
            }

            await answerFromClipboard(element, 'click');
        }


        // ------------------------------------------------------------
        // RIGHT-CLICK OVERRIDE
        // ------------------------------------------------------------

        // Answers normally come from the clipboard, and a plain click on an
        // option is swallowed while the question is being copied. Right-
        // clicking an option offers an explicit click instead, for when the
        // clipboard answer is wrong or never arrives.

        const OVERRIDE_MENU_ID = 'auto-learnvia-override-menu';

        let overrideMenu = null;
        let overrideMenuCleanup = null;


        // The option the event landed on, plus its position in the list.
        function findChoiceOption(target) {
            const list = findOptionList(target);

            if (!list) {
                return null;
            }

            let option = target;

            while (option && option.parentElement !== list) {
                option = option.parentElement;
            }

            if (!option) {
                return null;
            }

            return {
                list,
                option,
                choice: [...list.children].indexOf(option) + 1,
            };
        }


        function describeChoiceOption(option, choice) {
            const text =
                  getCleanRecursiveText(option)
                .replace(/\s+/g, ' ')
                .trim();

            if (!text) {
                return `Choice #${choice}`;
            }

            const preview =
                  text.length > 60
                ? `${text.slice(0, 60)}…`
                : text;

            return `Choice #${choice}: ${preview}`;
        }


        function hideOverrideMenu() {
            if (overrideMenuCleanup) {
                overrideMenuCleanup();

                overrideMenuCleanup = null;
            }

            overrideMenu?.remove();

            overrideMenu = null;
        }


        // `processingChoice` is what keeps the capture-phase click handler
        // out of this click: it neither cancels it nor copies the question.
        function clickOptionDirectly(list, choice) {
            hideOverrideMenu();

            const clicked = dispatchCachedChoice(list, choice);

            mcqLog(
                `right-click override — choice ${choice}`,
                clicked ? 'clicked' : 'not clicked'
            );

            if (!clicked) {
                console.warn(
                    `Could not click choice #${choice} of the MCQ.`
                );
            }

            return clicked;
        }


        function showOverrideMenu(event, found) {
            hideOverrideMenu();

            const { list, option, choice } = found;

            const menu = document.createElement('div');

            menu.id = OVERRIDE_MENU_ID;

            Object.assign(menu.style, {
                position: 'fixed',
                zIndex: '2147483647',
                minWidth: '180px',
                padding: '4px',
                background: '#1f1f23',
                color: '#f5f5f5',
                border: '1px solid #4b4b55',
                borderRadius: '6px',
                boxShadow: '0 6px 24px rgba(0, 0, 0, 0.45)',
                font: '12px/1.4 sans-serif',
                userSelect: 'none',
            });

            const caption = document.createElement('div');

            caption.textContent = describeChoiceOption(option, choice);

            Object.assign(caption.style, {
                maxWidth: '320px',
                padding: '4px 8px 6px',
                color: '#a8a8b3',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            });

            const item = document.createElement('button');

            item.type = 'button';
            item.textContent = `Override: click choice #${choice}`;

            Object.assign(item.style, {
                display: 'block',
                width: '100%',
                padding: '6px 8px',
                background: 'transparent',
                color: 'inherit',
                border: '0',
                borderRadius: '4px',
                font: 'inherit',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
            });

            item.addEventListener('click', (clickEvent) => {
                clickEvent.preventDefault();
                clickEvent.stopPropagation();

                clickOptionDirectly(list, choice);
            });

            item.addEventListener('mouseenter', () => {
                item.style.background = '#2f6feb';
            });

            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
            });

            menu.append(caption, item);
            document.body.appendChild(menu);

            // A keyboard-invoked context menu reports no coordinates, so fall
            // back to the option itself.
            const optionRect = option.getBoundingClientRect();

            const x = event.clientX || optionRect.left + 12;
            const y = event.clientY || optionRect.top + 12;

            const menuRect = menu.getBoundingClientRect();

            const left = Math.min(
                x,
                window.innerWidth - menuRect.width - 8
            );

            const top = Math.min(
                y,
                window.innerHeight - menuRect.height - 8
            );

            menu.style.left = `${Math.max(8, left)}px`;
            menu.style.top = `${Math.max(8, top)}px`;

            overrideMenu = menu;

            const listenerOptions = { capture: true };

            const dismiss = (dismissEvent) => {
                if (dismissEvent.type === 'keydown') {
                    if (dismissEvent.key !== 'Escape') return;
                } else if (menu.contains(dismissEvent.target)) {
                    return;
                }

                hideOverrideMenu();
            };

            document.addEventListener(
                'pointerdown',
                dismiss,
                listenerOptions
            );

            document.addEventListener(
                'keydown',
                dismiss,
                listenerOptions
            );

            window.addEventListener('resize', hideOverrideMenu);
            window.addEventListener('scroll', hideOverrideMenu, true);

            overrideMenuCleanup = () => {
                document.removeEventListener(
                    'pointerdown',
                    dismiss,
                    listenerOptions
                );

                document.removeEventListener(
                    'keydown',
                    dismiss,
                    listenerOptions
                );

                window.removeEventListener('resize', hideOverrideMenu);
                window.removeEventListener(
                    'scroll',
                    hideOverrideMenu,
                    true
                );
            };
        }


        function handleChoiceContextMenu(event) {
            const found = findChoiceOption(event.target);

            if (!found) {
                hideOverrideMenu();

                return;
            }

            event.preventDefault();
            event.stopPropagation();

            showOverrideMenu(event, found);
        }


        document.addEventListener(
            'contextmenu',
            handleChoiceContextMenu,
            true
        );


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
                mcqLog('giving up on the tab return (clipboard unreadable)');

                tabReturnRetries = 0;

                return;
            }

            tabReturnRetries += 1;

            setTimeout(() => {
                if (!pendingChoiceList || !pendingChoiceList.isConnected) {
                    tabReturnRetries = 0;

                    return;
                }

                if (document.visibilityState !== 'visible') return;

                // The read would only be refused again.
                if (!document.hasFocus()) return;

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
                mcqLog('already handling a tab return, ignoring');

                return;
            }

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
                    return;
                }

                if (!element.isConnected) {
                    pendingChoiceList = null;

                    return;
                }

                // `visibilitychange` fires just before the document gains
                // focus, so Chrome can refuse the read here. Stay armed and
                // retry rather than answering with nothing.
                if (choice === undefined) {
                    failed = true;

                    mcqLog('clipboard unreadable right now, retrying shortly');

                    return;
                }

                // A click that landed while this read was in flight resolves
                // through the click path; letting both dispatch would click
                // the option twice and toggle a checkbox back off.
                if (resolvingChoice) {
                    mcqLog('a click is already resolving this choice');

                    return;
                }

                // Held only around the synchronous dispatch, which is all the
                // re-entrant click needs suppressing for. A slow clipboard
                // read therefore cannot lock the page's clicks.
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

            lastNextQuestionButton = button;
            lastNextQuestionEnabled = enabled;

            // Only act on the disabled → enabled transition (or a new node),
            // so one answer advances exactly one question.
            if (!enabled || wasEnabled) {
                return;
            }

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
        // DOCUMENT MODIFICATION WATCHER (debug)
        // ============================================================

        // Logs every DOM mutation together with the call site that caused it.
        // This is a diagnostics tool: it wraps hot DOM APIs and builds a stack
        // per mutation, so set it to false when it is not needed.
        const MOD_WATCH_ENABLED = true;

        // Narrow the log to one subtree, e.g. '.test-question-mcq'.
        const MOD_WATCH_SELECTOR = null;

        const MOD_LOG_PREFIX = '[Auto Learnvia][mod]';

        const MOD_TRACE_LIMIT = 400;
        const MOD_LOG_LIMIT = 1000;
        const MOD_PRINT_PER_BATCH = 15;

        const MOD_PATCHED = Symbol.for('autoLearnvia.patched');

        // The patched DOM methods outlive initialize(), so they report through
        // a global sink instead of a closure the next initialize() would strand.
        const MOD_SINK_KEY = '__learnviaModSink';

        const modObserveOptions = {
            subtree: true,
            childList: true,
            attributes: true,
            attributeOldValue: true,
            characterData: true,
            characterDataOldValue: true,
        };

        const modTraces = [];
        const modLog = [];

        let modificationObserver = null;


        function recordModification(api, target, detail) {
            window[MOD_SINK_KEY]?.(api, target, detail);
        }


        function modificationStack() {
            const limit = Error.stackTraceLimit;

            Error.stackTraceLimit = 50;

            const stack = new Error().stack ?? '';

            Error.stackTraceLimit = limit;

            return stack;
        }


        // Drops this file's own frames so the first line is the real caller.
        function firstSourceFrame(stack) {
            const frames = String(stack ?? '')
                .split('\n')
                .map((line) => line.trim())
                .filter((line) => line.startsWith('at '))
                .filter(
                    (line) => !/autoLearnviaProxy|recordModification|modificationStack|firstSourceFrame/.test(line)
                );

            return frames[0] ?? '(unknown)';
        }


        function describeModification(record) {
            if (record.type === 'attributes') {
                const value = record.target.getAttribute?.(record.attributeName);

                return `${record.attributeName}: ${String(record.oldValue ?? '').slice(0, 60)} → ${String(value ?? '').slice(0, 60)}`;
            }

            if (record.type === 'characterData') {
                return `${JSON.stringify(record.oldValue ?? '')} → ${JSON.stringify(record.target.data ?? '')}`
                    .slice(0, 160);
            }

            const added = [...record.addedNodes].map(describeNode).join(', ');
            const removed = [...record.removedNodes].map(describeNode).join(', ');

            return `+[${added}] -[${removed}]`.slice(0, 200);
        }


        // The newest recorded call whose receiver is the changed node or one of
        // its ancestors: mutation observers fire after the fact, so the stack
        // has to come from the patched DOM APIs, not from the record itself.
        function culpritFor(record) {
            for (let index = modTraces.length - 1; index >= 0; index -= 1) {
                const trace = modTraces[index];

                for (let node = record.target; node; node = node.parentNode) {
                    if (node === trace.target) {
                        return trace;
                    }
                }
            }

            return modTraces[modTraces.length - 1] ?? null;
        }


        function shouldWatch(target) {
            if (MOD_WATCH_SELECTOR === null) {
                return true;
            }

            const element = target?.nodeType === Node.ELEMENT_NODE
                ? target
                : target?.parentElement;

            return !!element?.closest?.(MOD_WATCH_SELECTOR);
        }


        function reportModification(record) {
            const culprit = culpritFor(record);

            const entry = {
                at: Math.round(performance.now()),
                change: describeModification(record),
                via: culprit?.api ?? '(unknown)',
                detail: culprit?.detail ?? '',
                source: firstSourceFrame(culprit?.stack),
                stack: culprit?.stack ?? '',
            };

            modLog.push(entry);

            if (modLog.length > MOD_LOG_LIMIT) {
                modLog.shift();
            }

            return entry;
        }


        function patchMutationMethod(owner, name, detailFor) {
            const original = owner?.[name];

            if (typeof original !== 'function' || original[MOD_PATCHED]) {
                return;
            }

            const patched = function autoLearnviaProxy(...args) {
                recordModification(
                    `${describeNode(this)}.${name}`,
                    this,
                    detailFor?.(args)
                );

                return original.apply(this, args);
            };

            patched[MOD_PATCHED] = true;

            owner[name] = patched;
        }


        function patchMutationSetter(owner, name) {
            const descriptor = Object.getOwnPropertyDescriptor(owner, name);

            if (!descriptor?.set || descriptor.set[MOD_PATCHED]) {
                return;
            }

            const patched = function autoLearnviaProxy(value) {
                recordModification(
                    `set ${describeNode(this)}.${name}`,
                    this,
                    String(value ?? '').slice(0, 120)
                );

                return descriptor.set.call(this, value);
            };

            patched[MOD_PATCHED] = true;

            Object.defineProperty(owner, name, {
                ...descriptor,
                set: patched,
            });
        }


        function installMutationHooks() {
            for (const name of [
                'appendChild', 'insertBefore', 'removeChild', 'replaceChild',
            ]) {
                patchMutationMethod(Node.prototype, name);
            }

            for (const name of [
                'append', 'prepend', 'replaceChildren',
                'insertAdjacentElement', 'before', 'after',
                'replaceWith', 'remove',
            ]) {
                patchMutationMethod(Element.prototype, name);
            }

            patchMutationMethod(
                Element.prototype,
                'insertAdjacentHTML',
                (args) => String(args[1] ?? '')
            );

            for (const name of [
                'setAttribute', 'setAttributeNS', 'removeAttribute',
            ]) {
                patchMutationMethod(
                    Element.prototype,
                    name,
                    (args) => String(args[1] ?? args[0] ?? '')
                );
            }

            for (const name of ['add', 'remove', 'toggle', 'replace']) {
                patchMutationMethod(
                    DOMTokenList.prototype,
                    name,
                    (args) => args.join(' ')
                );
            }

            patchMutationMethod(
                CSSStyleDeclaration.prototype,
                'setProperty',
                (args) => `${args[0]}=${args[1]}`
            );

            for (const name of ['innerHTML', 'outerHTML']) {
                patchMutationSetter(Element.prototype, name);
            }

            patchMutationSetter(Node.prototype, 'textContent');
            patchMutationSetter(Node.prototype, 'nodeValue');
            patchMutationSetter(CharacterData.prototype, 'data');
        }


        if (MOD_WATCH_ENABLED) {
            modificationObserver = new MutationObserver((records) => {
                let printed = 0;

                for (const record of records) {
                    if (!shouldWatch(record.target)) continue;

                    const entry = reportModification(record);

                    // Every record is kept; only a slice is printed, so a
                    // burst of mutations cannot lock up the console.
                    if (printed >= MOD_PRINT_PER_BATCH) continue;

                    printed += 1;

                    console.groupCollapsed(
                        `${MOD_LOG_PREFIX} ${entry.change}`
                    );
                    console.log('via   ', entry.via);
                    console.log('from  ', entry.source);

                    if (entry.detail) {
                        console.log('detail', entry.detail);
                    }

                    console.log(entry.stack);
                    console.groupEnd();
                }
            });

            modificationObserver.observe(
                document.documentElement,
                modObserveOptions
            );

            window[MOD_SINK_KEY] = (api, target, detail) => {
                modTraces.push({
                    api,
                    target,
                    detail: String(detail ?? '').slice(0, 160),
                    at: Math.round(performance.now()),
                    stack: modificationStack(),
                });

                if (modTraces.length > MOD_TRACE_LIMIT) {
                    modTraces.shift();
                }
            };

            installMutationHooks();
        }


        window.__learnviaModLog = {
            entries: modLog,
            traces: modTraces,
            table: () => console.table(
                modLog.map(({ at, change, via, detail, source }) => ({
                    at, change, via, detail, source,
                }))
            ),
            last: (count = 10) => modLog.slice(-count),
            stop: () => modificationObserver?.disconnect(),
            start: () => modificationObserver?.observe(
                document.documentElement,
                modObserveOptions
            ),
        };


        // ============================================================
        // VIDEO NARRATION TRANSCRIPT (ARIA LIVE REGIONS)
        // ============================================================

        // The player narrates each segment into a polite live region instead
        // of shipping a caption file, so the transcript only exists as a
        // sequence of announcements while the video plays.
        const TRANSCRIPT_LOG_PREFIX = '[Auto Learnvia][transcript]';

        const TRANSCRIPT_SELECTOR =
              '[aria-live="polite"][aria-atomic="true"]';

        const TRANSCRIPT_LINE_LIMIT = 5000;

        const transcriptLines = [];

        // element → the text already recorded for it, so a re-render that
        // leaves the text alone is not recorded twice.
        const transcriptSeen = new WeakMap();

        const transcriptRoots = new Set();
        const transcriptObservers = [];

        let transcriptRepollTimer = null;


        function normaliseTranscriptText(text) {
            return String(text ?? '').replace(/\s+/g, ' ').trim();
        }


        function recordTranscriptLine(text) {
            const line = normaliseTranscriptText(text);

            if (!line) return;

            // The same segment can be announced twice in a row.
            if (transcriptLines[transcriptLines.length - 1] === line) return;

            transcriptLines.push(line);

            if (transcriptLines.length > TRANSCRIPT_LINE_LIMIT) {
                transcriptLines.shift();
            }

            console.log(`${TRANSCRIPT_LOG_PREFIX} +`, line);
        }


        function scanTranscriptRegions(root) {
            let regions = [];

            try {
                regions = [...(root.querySelectorAll?.(TRANSCRIPT_SELECTOR) ?? [])];
            } catch {
                return;
            }

            for (const region of regions) {
                const text = normaliseTranscriptText(region.textContent);

                if (transcriptSeen.get(region) === text) continue;

                transcriptSeen.set(region, text);

                recordTranscriptLine(text);
            }
        }


        // The live region can sit in a shadow root, which a document-level
        // observer never sees, so every open root gets its own observer.
        function collectTranscriptRoots(root, roots = []) {
            roots.push(root);

            let elements = [];

            try {
                elements = [...(root.querySelectorAll?.('*') ?? [])];
            } catch {
                return roots;
            }

            for (const element of elements) {
                if (element.shadowRoot) {
                    collectTranscriptRoots(element.shadowRoot, roots);
                }
            }

            return roots;
        }


        function watchTranscriptRoots() {
            for (const root of collectTranscriptRoots(document)) {
                if (transcriptRoots.has(root)) continue;

                transcriptRoots.add(root);

                scanTranscriptRegions(root);

                const observer = new MutationObserver(() => {
                    scanTranscriptRegions(root);

                    // The player may mount a new shadow root mid-playback.
                    scheduleTranscriptRepoll();
                });

                observer.observe(
                    root === document ? document.documentElement : root,
                    {
                        subtree: true,
                        childList: true,
                        characterData: true,
                    }
                );

                transcriptObservers.push(observer);
            }
        }


        function scheduleTranscriptRepoll() {
            if (transcriptRepollTimer !== null) return;

            transcriptRepollTimer = setTimeout(
                () => {
                    transcriptRepollTimer = null;

                    watchTranscriptRoots();
                },
                1000
            );
        }


        watchTranscriptRoots();


        window.__learnviaTranscript = {
            lines: transcriptLines,
            text: () => transcriptLines.join('\n'),
            copy: async () => {
                const text = transcriptLines.join('\n');

                await navigator.clipboard.writeText(text);

                console.log(
                    `${TRANSCRIPT_LOG_PREFIX} copied`,
                    transcriptLines.length,
                    'lines'
                );
            },
            clear: () => {
                transcriptLines.length = 0;
            },
            rescan: () => watchTranscriptRoots(),
        };


        // ============================================================
        // CLEANUP FOR SPA NAVIGATION
        // ============================================================

        cleanup = () => {
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

            document.removeEventListener(
                'contextmenu',
                handleChoiceContextMenu,
                true
            );

            hideOverrideMenu();

            nextQuestionObserver.disconnect();

            modificationObserver?.disconnect();

            modificationObserver = null;

            window[MOD_SINK_KEY] = null;

            for (const observer of transcriptObservers) {
                observer.disconnect();
            }

            transcriptObservers.length = 0;
            transcriptRoots.clear();

            if (transcriptRepollTimer !== null) {
                clearTimeout(transcriptRepollTimer);

                transcriptRepollTimer = null;
            }

            if (nextQuestionCheckTimer !== null) {
                clearTimeout(nextQuestionCheckTimer);

                nextQuestionCheckTimer = null;
            }
        };
    }


    // ================================================================
    // INITIAL LOAD
    // ================================================================

    initialize();


    // ================================================================
    // LEARNVIA SPA URL CHANGES
    // ================================================================

    window.onurlchange = function(event) {
        console.log(
            'AUTO LEARNVIA URL CHANGE:',
            event.oldURL,
            '→',
            event.url
        );

        initialize();
    };

})();