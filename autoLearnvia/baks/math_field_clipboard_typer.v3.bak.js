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

        const getCleanRecursiveText = (element) => {
            if (!element) return '';

            if (element.nodeType === Node.ELEMENT_NODE) {
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
            }

            return Array.from(element.childNodes)
                .map((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    return node.textContent
                        .replace(/\s+/g, ' ')
                        .trim();
                }

                if (node.nodeType === Node.ELEMENT_NODE) {
                    return getCleanRecursiveText(node);
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
        // CLEANUP FOR SPA NAVIGATION
        // ============================================================

        cleanup = () => {
            document.removeEventListener(
                'focusin',
                handleFocus
            );
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