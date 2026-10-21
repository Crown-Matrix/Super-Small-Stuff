// ==UserScript==
// @name         ChatGPT Ad blocker
// @namespace    http://tampermonkey.net/
// @version      2026-09-23
// @description  Removes chatgpt ads
// @author       You
// @match        https://chatgpt.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log('HELLO?')

    setInterval( () => {
    document.querySelectorAll('aria-label[" Sponsored "]').forEach((element) => {
        element.style.display = 'none';
    })
}, 1000)



})();