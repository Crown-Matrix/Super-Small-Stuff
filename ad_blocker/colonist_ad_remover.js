// ==UserScript==
// @name         Colonist.io Ad blocker
// @namespace    http://tampermonkey.net/
// @version      2026-010-15
// @description  Removes colonist.io ads
// @author       You
// @match        https://colonist.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log('HELLO?')

    setInterval(() => {
        document.querySelectorAll('#endgame-item-box, #in_game_ad_right, .adsbyvli,#main_page_ad_right_top, .in_game_ad_bottom, .in_game_ad_bottom_small, .quantcast-ad-div, #in_game_ad_left_slot, #in_game_ad_left, .in_game_ad_left').forEach((element) => {
            element.style.display = 'none'
        })
    }, 1000)


})();