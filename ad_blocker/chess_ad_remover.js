// ==UserScript==
// @name         Chess Ad blocker
// @namespace    http://tampermonkey.net/
// @version      2026-09-23
// @description  Removes chess ads
// @author       You
// @match        https://chess.com/*
// @match        https://www.chess.com/play/online
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log('HELLO?')

    setInterval(() => {
    document.querySelectorAll('#sidebar-ad, .board-layout-ad').forEach((element) => {
        element.style.display = 'none'
    })
}, 1000)


})();