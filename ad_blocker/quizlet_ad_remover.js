// ==UserScript==
// @name         Quizlet Ad blocker
// @namespace    http://tampermonkey.net/
// @version      2026-09-23
// @description  Removes quizlet ads
// @author       You
// @match        https://quizlet.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log('HELLO?')

    setInterval(() => {
    // Classes
    [
        '.SetPageTerms-embeddedDesktopAdWrapper',
        '.SiteAd',
        '.SiteAd-adContainer',
        '.TimeAndVisibilityAd',
        '.celtra-hotspot',
        '.bx-creative',
        '.hideBelow--xl'
    ].forEach(s =>
        document.querySelectorAll(s).forEach(e => e.style.display = 'none')
    );


    // IDs
    [
        'targetDiv-SidebarAdsContainer'
    ].forEach(id => {
        const e = document.getElementById(id);
        if (e) e.style.display = 'none';
    });

    // Visibility IDs
    [
        'targetDiv-setpage_billboard'
    ].forEach(id => {
        const e = document.getElementById(id);
        if (e) e.style.visibility = 'hidden';
    });

    // Attributes
    [
        { href: 'https://cert.privo.com/#/companies/quizlet_partner' }
    ].forEach(attr => {
        const key = Object.keys(attr)[0];
        const value = attr[key];

        document.querySelectorAll(`[${key}="${value}"]`)
            .forEach(e => e.style.display = 'none');
    });
}, 1000);


})();