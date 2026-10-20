// ==UserScript==
// @name         Auto Outlook
// @namespace    http://tampermonkey.net/
// @version      2026-09-29.1
// @description  Saves your last Outlook URL and reopens it when you land on the default Outlook page
// @author       You
// @match        https://outlook.live.com/mail/0/
// @match        https://outlook.cloud.microsoft/mail/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQElEQVR42mP87if3nwEH4Nz0iLF+FwNO+UY3BkYmBgrBqAFUMIBiwMiw5D3OeGaIEWT8vxN3OmB0H00HwyQdAACoEQ0bu6ZVwAAAAABJRU5ErkJggg==
// @run-at       document-start
// @noframes
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        window.onurlchange
// ==/UserScript==

(function () {
    'use strict';

    const KEY = 'recent_Outlook';
    const FLAG = 'intentionalRedirect';

    // Default Outlook page: send the user to the last saved URL
    if (location.hostname === 'outlook.live.com') {
        // We were bounced back here after our own redirect: stay put and reset the flag
        if (sessionStorage.getItem(FLAG) === 'true') {
            sessionStorage.setItem(FLAG, 'false');
            return;
        }

        const saved = GM_getValue(KEY, '');
        if (saved) {
            sessionStorage.setItem(FLAG, 'true');
            location.replace(saved);
        }
        return; // never save anything from the live.com page
    }

    // Outlook proper: save the current URL now, and again on every in-app navigation
    const save = (url) => {
        if (url.startsWith('https://outlook.cloud.microsoft/mail/')) {
            GM_setValue(KEY, url);
            console.log('link saved:', url);
        }
    };

    save(location.href);

    if (window.onurlchange === null) {
        window.addEventListener('urlchange', (info) => save(info.url));
    }
})();