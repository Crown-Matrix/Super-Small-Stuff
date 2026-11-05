// ==UserScript==
// @name         RateMyProfessors Ad Blocker
// @namespace    http://tampermonkey.net/
// @version      2026-11-05
// @description  try to take over the world!
// @author       You
// @match        https://www.ratemyprofessors.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ratemyprofessors.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

// Selectors to hide with display: none
const displayNoneSelectors = [
  "#mainClickTag",
  '[id^="bx-close-inside-"]',
  "#ap__container",
  ".GoogleCreativeContainerClass",
  'div[type="billboard-large"]',
  "#carousel_two",
  "#stage",
  "#IN_VIEW_BANNER",
  ".ad-container",
  'div[type="billboard"]',
  '[class*="AdRail__StyledAdRail-"]',
  '[class*="cnx-ad"]',
  '#jw-video-player',
  '[class*="VideoPlayer__StyledPlayer"]',
  '.trc_rbox_container',
  '#taboola-mid-article-thumbnails',
  '[class*="il-sr-info-native-wrapper"]',
  '[class*="il-sr-native-wrapper"]'
];

// Selectors to hide with visibility: hidden
const visibilityHiddenSelectors = [
  '.ad-slot',
  '.sticky-header',
];

function hideElements(displayNone, visibilityHidden) {
  displayNone.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.style.setProperty('display', 'none', 'important');
    });
  });

  visibilityHidden.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.style.setProperty('visibility', 'hidden', 'important');
    });
  });
}

// Run immediately, then keep re-applying every 500ms
hideElements(displayNoneSelectors, visibilityHiddenSelectors);
setInterval(() => {
  hideElements(displayNoneSelectors, visibilityHiddenSelectors);
}, 500);
})();