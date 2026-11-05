// ==UserScript==
// @name         Canvas Dark Mode (UTA) with toggle
// @icon         data:image/png;base64,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
// @namespace    https://uta.instructure.com/
// @version      1.3.6
// @description  Dark theme for UTA Canvas with a toggle button in the global nav. Preference is remembered (default: dark).
// @match        https://uta.instructure.com/*
// @run-at       document-start
// @noframes
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function () {
  'use strict';

  /* ---------------- Preference (persisted in the userscript manager's storage) ---------------- */
  var PREF_KEY = 'canvasDarkEnabled';
  var darkEnabled = true; // default: dark

  function loadPref() {
    try {
      if (typeof GM_getValue === 'function') {
        darkEnabled = GM_getValue(PREF_KEY, true) !== false;
        return;
      }
    } catch (e) {}
    try {
      var v = localStorage.getItem(PREF_KEY);
      if (v !== null) darkEnabled = v !== 'false';
    } catch (e) {}
  }
  function savePref() {
    try {
      if (typeof GM_setValue === 'function') { GM_setValue(PREF_KEY, darkEnabled); return; }
    } catch (e) {}
    try { localStorage.setItem(PREF_KEY, String(darkEnabled)); } catch (e) {}
  }
  loadPref();

  /* ---------------- Theme CSS ---------------- */
  var CSS = `
:root {
  --bg:        #12151a;
  --surface:   #1a1e25;
  --surface-2: #232933;
  --border:    #2e3541;
  --text:      #e4e8ee;
  --text-dim:  #9ba5b3;
  --link:      #7bbcf0;
  --accent:    #4aa3e8;
  --due:       #7bbcf0;
  --missing:   #ff8085;
  --done:      #5fd68c;
  color-scheme: dark;
}

/* ---------- Page shell ---------- */
html, body,
#application, #wrapper, #main, #not_right_side,
#content-wrapper, #content, #right-side-wrapper {
  background: var(--bg) !important;
  color: var(--text) !important;
}
.ic-Layout-watermark { display: none !important; }

#content :where(div, span, section, ul, li, nav, header, aside):not([style]) {
  background-color: transparent;
}
.ic-app, .ic-Layout-wrapper, .ic-Layout-columns, .ic-Layout-contentWrapper,
.ic-Layout-contentMain, .ic-app-main-content, .ic-app-main-content__secondary,
#right-side, #right-side-wrapper {
  background: var(--bg) !important;
  color: var(--text) !important;
}

/* ---------- Global nav + mobile header ---------- */
#header.ic-app-header,
#mobile-header {
  background: #0b0d11 !important;
  border-right: 1px solid var(--border);
}
.ic-app-header__menu-list-link { color: var(--text-dim) !important; }
.ic-app-header__menu-list-link:hover,
.ic-app-header__menu-list-item--active .ic-app-header__menu-list-link {
  color: #fff !important;
  background: var(--surface-2) !important;
}
.ic-icon-svg, .ic-icon-svg path { fill: currentColor; }
.menu-item__text, .mobile-header-title { color: inherit !important; }

#header.ic-app-header,
#header .ic-app-header__main-navigation,
#header .ic-app-header__secondary-navigation,
#header .ic-app-header__logomark-container,
#header .ic-app-header__logomark,
#header .ic-app-header__menu-list,
#header .ic-app-header__menu-list-item {
  background-color: #0b0d11 !important;
}
#header .ic-app-header__menu-list-item--active { background-color: var(--surface-2) !important; }

/* ---------- Headings and text ---------- */
#content h1, #content h2, #content h3 { color: var(--text) !important; }
#content [class*="-text"],
#content [class*="-heading"] { color: var(--text) !important; }
#content span[color="secondary"],
#content span[color="secondary"][class*="-text"] { color: var(--text-dim) !important; }
#content span[color="primary"] { color: var(--text) !important; }
#content a, #content a[class*="-link"],
#content a [class*="-text"] { color: var(--link) !important; }
#content a:hover { color: #a9d6f7 !important; }

/* ---------- Widgets ---------- */
#content section[data-testid^="widget-"] {
  background: var(--surface) !important;
  border: 1px solid var(--border) !important;
  border-radius: 8px;
  box-shadow: none !important;
}
#content li[data-cid="ListItem"] {
  background: transparent !important;
  border-color: var(--border) !important;
}
#content [data-testid^="listed-course-work-item-"] > div,
#content [data-testid^="announcement-item-"] {
  background: transparent !important;
  border-color: var(--border) !important;
}
#content [data-testid^="listed-course-work-item-"] > div:hover {
  background: var(--surface-2) !important;
}

/* ---------- Summary counts ---------- */
#content [data-testid^="statistics-card-"] {
  background: var(--surface-2) !important;
  border-color: var(--border) !important;
}
#content [style*="rgb(26, 90, 142)"],
#content [style*="rgb(26, 90, 142)"] svg { color: var(--due) !important; fill: var(--due); }
#content [style*="rgb(199, 31, 35)"] { color: var(--missing) !important; }
#content [style*="rgb(2, 118, 52)"]  { color: var(--done) !important; }

#content [data-testid*="status-pill-"] {
  background: var(--surface-2) !important;
  border-color: var(--border) !important;
  color: var(--text) !important;
}
#content [data-testid*="status-pill-"] svg { fill: var(--text-dim); }

/* ---------- Course grade cards (widget dashboard) ---------- */
#content [data-testid^="course-grade-card-"] {
  background: var(--surface-2) !important;
  border: 1px solid var(--border) !important;
  border-radius: 8px;
  box-shadow: none !important;
}

/* ---------- Form controls ---------- */
#content label[class*="formFieldLayout"] > span:first-child,
#content label[class*="formFieldLayout"] [class*="__label"] { color: var(--text-dim) !important; }
#content [class*="textInput__facade"] {
  background: var(--surface-2) !important;
  border-color: var(--border) !important;
}
#content input[class*="textInput"],
#content input[type="text"] {
  background: transparent !important;
  color: var(--text) !important;
}
#content [class*="select__icon"] svg,
#content [class*="textInput__afterElement"] svg { fill: var(--text-dim); }

#content [class*="toggleFacade__facade"] {
  background: var(--surface-2) !important;
  border-color: var(--border) !important;
}
#content [class*="toggleFacade__label"] { color: var(--text) !important; }
#content input[type="checkbox"]:checked + label [class*="toggleFacade__facade"] {
  background: var(--accent) !important;
  border-color: var(--accent) !important;
}

/* ---------- Buttons and pagination ---------- */
#content button[data-cid~="BaseButton"] {
  background-color: var(--surface-2) !important;
  border-color: var(--border) !important;
  color: var(--text) !important;
}
#content button[data-cid~="BaseButton"] [class*="baseButton__content"],
#content button[data-cid~="BaseButton"] [class*="baseButton__children"] {
  background: transparent !important;
  color: inherit !important;
}
#content button[data-cid~="BaseButton"] svg { fill: currentColor; }
#content button[data-cid~="BaseButton"]:hover { background-color: #2d3542 !important; }
#content button[data-cid~="PaginationButton"][aria-current="page"] {
  background-color: var(--accent) !important;
  border-color: var(--accent) !important;
  color: #0b0d11 !important;
}
#content [data-testid^="hide-single-grade-button-"],
#content [data-testid^="color-picker-trigger-"] {
  background: transparent !important;
  border-color: transparent !important;
  color: #fff !important;
}

/* ---------- Tabs ---------- */
#content [role="tablist"] { border-color: var(--border) !important; }
#content [role="tab"] { color: var(--text-dim) !important; background: transparent !important; }
#content [role="tab"][aria-selected="true"] {
  color: var(--text) !important;
  border-color: var(--accent) !important;
}

/* ---------- Dropdown menus ---------- */
[role="listbox"], [role="menu"] {
  background: var(--surface-2) !important;
  border: 1px solid var(--border) !important;
  color: var(--text) !important;
}
[role="option"], [role="menuitem"] { color: var(--text) !important; background: transparent !important; }
[role="option"]:hover, [role="option"][aria-selected="true"],
[role="menuitem"]:hover { background: #2d3542 !important; }

/* ---------- Courses / Account tray ---------- */
#nav-tray-portal [role="dialog"],
#nav-tray-portal .navigation-tray-container,
#nav-tray-portal .tray-with-space-for-global-nav {
  background: var(--surface) !important;
  color: var(--text) !important;
}
#nav-tray-portal :where(div, span, ul, li, h2):not([style]) {
  background-color: transparent;
  color: var(--text);
}
#nav-tray-portal div[class*="-text"] { color: var(--text-dim) !important; }
#nav-tray-portal a, #nav-tray-portal a [class*="-text"] { color: var(--link) !important; }
#nav-tray-portal a div[class*="-text"] { color: var(--link) !important; }
#nav-tray-portal li { border-color: var(--border) !important; }
#nav-tray-portal hr { border-color: var(--border) !important; background: var(--border) !important; }
#nav-tray-portal button { background: transparent !important; color: var(--text) !important; }
#nav-tray-portal svg { fill: currentColor; }

[role="dialog"]:not(#ek-modal) {
  background: var(--surface) !important;
  color: var(--text) !important;
}

/* ====================== Course pages ====================== */
.ic-app-nav-toggle-and-crumbs {
  background: var(--bg) !important;
  border-color: var(--border) !important;
}
.ic-app-nav-toggle-and-crumbs :where(a, span, div, button, i, li, ol, svg) {
  color: var(--text) !important;
  background-color: transparent;
}
.ic-app-nav-toggle-and-crumbs button[data-cid~="BaseButton"],
#immersive_reader_mobile_mount_point button[data-cid~="BaseButton"] {
  background-color: var(--surface-2) !important;
  border-color: var(--border) !important;
  color: var(--text) !important;
}
#immersive_reader_mount_point svg path[fill="#000000"],
#immersive_reader_mobile_mount_point svg path[fill="#000000"] { fill: var(--text); }

.ic-app-nav-toggle-and-crumbs,
.ic-app-crumbs,
.ic-app-crumbs-enhanced-rubrics,
#breadcrumbs,
#breadcrumbs *:not(svg):not(path) {
  background: transparent !important;
  background-image: none !important;
  color: var(--text) !important;
  border-color: var(--border) !important;
  box-shadow: none !important;
  text-shadow: none !important;
}
.ic-app-nav-toggle-and-crumbs { background: var(--bg) !important; }
.ic-app-crumbs::before, .ic-app-crumbs::after,
.ic-app-nav-toggle-and-crumbs::before, .ic-app-nav-toggle-and-crumbs::after,
#breadcrumbs::before, #breadcrumbs::after,
#breadcrumbs *::before, #breadcrumbs *::after {
  background: transparent !important;
  background-image: none !important;
  box-shadow: none !important;
  border-color: var(--border) !important;
  color: var(--text-dim) !important;
}
#breadcrumbs a:hover, #breadcrumbs [data-cid~="Link"]:hover { color: #a9d6f7 !important; }
#breadcrumbs svg { fill: currentColor; color: var(--text-dim) !important; }

#left-side, #sticky-container, .ic-app-course-menu, .ic-sticky-frame {
  background: var(--bg) !important;
  border-color: var(--border) !important;
}
#section-tabs-header-subtitle, #section-tabs-header { color: var(--text-dim) !important; }
#section-tabs a { color: var(--link) !important; background: transparent !important; }
#section-tabs a:hover { color: #a9d6f7 !important; background: var(--surface-2) !important; }
#section-tabs a.active { color: #fff !important; background: var(--surface-2) !important; }

.header-bar-outer-container, .sticky-toolbar, .header-bar, .page-toolbar {
  background: var(--bg) !important;
  border-color: var(--border) !important;
}
.course-title, .page-title { color: var(--text) !important; }

.user_content, .show-content, .dp-wrapper {
  background: transparent !important;
  color: var(--text) !important;
}
.user_content :where(p, li, ul, ol, h1, h2, h3, h4, h5, h6, span, strong, em, b, td, th, header, nav, div) {
  color: inherit;
}
.user_content [style*="color"]:not(i):not(.dp-heading-ignore) { color: var(--text) !important; }
.user_content [style*="background"]:not(i):not(img):not(.dp-heading-ignore) {
  background: var(--surface) !important;
}
.user_content i[style], .user_content .dp-icon {
  background: transparent !important;
  color: var(--accent) !important;
}
.user_content a { color: var(--link) !important; }
.user_content a:hover { color: #a9d6f7 !important; }
.dp-wrapper .dp-content-block {
  background: var(--surface) !important;
  color: var(--text) !important;
  border-color: var(--border) !important;
}
.dp-wrapper .dp-header-pre { background: var(--surface-2) !important; color: var(--text) !important; }
.dp-wrapper .dp-heading { border-top-color: var(--border) !important; }
.dp-wrapper .dp-link-grid a {
  background: var(--surface-2) !important;
  color: var(--link) !important;
  border-color: var(--border) !important;
}
.dp-wrapper .dp-link-grid a:hover { background: #2d3542 !important; color: #fff !important; }
.dp-wrapper .dp-heading-ignore { background: #0b2a45 !important; color: #fff !important; }
.user_content img { background: transparent; }

#right-side { color: var(--text) !important; }
#right-side :where(h1, h2, h3, h4, b, strong, p, div, span, li, ul, i) {
  color: inherit;
  background-color: transparent;
}
#right-side span[color="secondary"] { color: var(--text-dim) !important; }
#right-side a { color: var(--link) !important; }
#right-side a:hover { color: #a9d6f7 !important; }
#right-side .btn, #right-side .button-sidebar-wide {
  background: var(--surface-2) !important;
  border: 1px solid var(--border) !important;
  color: var(--text) !important;
  box-shadow: none !important;
}
#right-side .btn:hover { background: #2d3542 !important; }
#right-side button { background: transparent !important; color: var(--text) !important; }
#right-side svg { fill: currentColor; }
#right-side li, #right-side .event, .right-side-list li { border-color: var(--border) !important; }
.todo-list-header, .events_list h2 { color: var(--text) !important; }

/* ====================== Generic Canvas pages ====================== */
.btn, .Button, .Button--secondary, .Button--icon-action, .Button--link {
  background-color: var(--surface-2) !important;
  background-image: none !important;
  color: var(--text) !important;
  border-color: var(--border) !important;
  box-shadow: none !important;
}
.btn-primary, .Button--primary {
  background-color: var(--accent) !important;
  color: #0b0d11 !important;
}
.btn:hover, .Button:hover { background-color: #2d3542 !important; }
input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]),
textarea, select {
  background-color: var(--surface-2) !important;
  color: var(--text) !important;
  border-color: var(--border) !important;
}
table, th, td { background-color: transparent !important; color: var(--text) !important; border-color: var(--border) !important; }
.ic-Table--striped tbody tr:nth-child(odd), tr:nth-child(odd) > td { background-color: rgba(255,255,255,0.03) !important; }
.ig-row, .ig-header, .context_module, .item-group-condensed, .item-group-container, .ig-list,
.assignment-group, .content-box, .ic-Action-header, .ic-notification, .ui-widget-content,
.ui-widget-header, .ui-dialog, .ui-tabs, .ui-tabs-panel, .ui-menu, .ui-autocomplete {
  background: var(--surface) !important;
  color: var(--text) !important;
  border-color: var(--border) !important;
}
.ig-row a, .ig-title, .item_name a { color: var(--link) !important; }
.ic-Layout-contentMain a { color: var(--link); }
.ic-Layout-contentMain label, .ic-Layout-contentMain legend, .ic-Layout-contentMain h1,
.ic-Layout-contentMain h2, .ic-Layout-contentMain h3, .ic-Layout-contentMain h4 { color: var(--text); }
.ic-notification, .alert { color: var(--text) !important; }

/* ====================== Assignments / module-style lists ====================== */
.item-group-condensed, .assignment_group, .item-group-container, .ig-list, .assignment-list {
  background: transparent !important;
  border-color: var(--border) !important;
  box-shadow: none !important;
}
.ig-header,
.item-group-condensed .ig-header,
.assignment_group .ig-header {
  background: #2c3442 !important;
  border: 1px solid #3d4757 !important;
  border-bottom: 2px solid var(--accent) !important;
  color: #fff !important;
  border-radius: 6px 6px 0 0;
}
.ig-header :where(h2, h3, span, div, a, button, i, b, strong),
.ig-header .element_toggler,
.ig-header .ig-header-title {
  color: #fff !important;
  background: transparent !important;
  font-weight: 700;
  text-shadow: none !important;
}
.ig-header i[class*="icon-"] { color: var(--accent) !important; }
.ig-row {
  background: var(--surface) !important;
  border-color: var(--border) !important;
}
.ig-row:hover { background: var(--surface-2) !important; }
.ig-details, .ig-details__item, .ig-details :where(span, time, div) { color: var(--text-dim) !important; }
.ig-details .score-display b, .ig-details .grade-display strong { color: var(--text) !important; }
.ig-type-icon i, .ig-row i[class*="icon-"] { color: var(--accent) !important; }

#content [class*="radioInput__label"], #content fieldset legend { color: var(--text) !important; }
#content [class*="radioInput__facade"] {
  background: var(--surface-2) !important;
  border-color: #6b7686 !important;
}
#content input[type="radio"]:checked + label [class*="radioInput__facade"] {
  border-color: var(--accent) !important;
}
#content input::placeholder { color: var(--text-dim) !important; opacity: 1; }
#content [class*="textInput__layout"] svg { fill: var(--text-dim); color: var(--text-dim) !important; }

/* ====================== Generic Instructure UI (React) components ====================== */
/* Works on any page: assignments, quizzes, discussions, grades, modals, trays.
   Matches stable patterns (class-name fragments, data-testid, inline light colors), not specific pages. */

/* Containers: InstUI "View" wrappers and flex items get no light background of their own */
:is(#content, #nav-tray-portal, [role="dialog"], [data-position-content]) :where([class*="-view"], [class*="-view--"], [class*="-flexItem"], [class*="-flex-flex"], [class*="toggleDetails"], [class*="fileDrop"], table, thead, tbody, tr, td, th):not(button):not(.user_content *):not(.user_content) {
  background-color: transparent !important;
  border-color: var(--border) !important;
}

/* Inline light backgrounds set by React components (white / light greys) */
:is(#content, #nav-tray-portal, [role="dialog"], [data-position-content], [id$="-footer"], footer)
  :is([style*="background-color: rgb(255, 255, 255)"], [style*="background-color: rgb(245, 245, 245)"], [style*="background-color: rgb(242, 244, 244)"], [style*="background-color: rgb(248, 248, 248)"], [style*="background-color: rgb(238, 238, 238)"], [style*="background-color: white"], [style*="background-color: #fff"], [style*="background: rgb(255, 255, 255)"], [style*="background: white"]):not(.user_content *),
[data-testid$="-footer"][style*="background"], [id$="-footer"][style*="background"], footer[style*="background"] {
  background-color: var(--surface) !important;
  border-color: var(--border) !important;
}
/* Inline grey divider lines (e.g. the "or" separator) */
:is(#content, [role="dialog"]) [style*="background-color: rgb(106, 120, 131)"] { background-color: var(--border) !important; }
:is(#content, [role="dialog"]) [style*="border-top: 2px solid rgb(232, 234, 236)"] { border-top-color: var(--border) !important; }

/* Text inside those components */
:is(#content, #nav-tray-portal, [role="dialog"], [data-position-content]) :where([class*="-text"], [class*="-heading"], [class*="-formFieldLayout"], [class*="-fileDrop"]):not(.user_content *) { color: var(--text) !important; }
:is(#content, [role="dialog"]) span[color="brand"][class*="-text"] { color: var(--link) !important; }
:is(#content, [role="dialog"]) [class*="screenReaderContent"] { color: inherit !important; }

/* Drop zones / upload boxes */
#content [class*="fileDrop__label"], [role="dialog"] [class*="fileDrop__label"] {
  background: var(--surface) !important;
  border: 2px dashed var(--border) !important;
  color: var(--text) !important;
}
#content [class*="fileDrop__label"]:hover { border-color: var(--accent) !important; }
#content [class*="fileDrop"] img[src$=".svg"] { filter: invert(1) hue-rotate(180deg); }

/* Tables of data (rubrics, grades) */
#content table:not(.user_content table) thead td, #content table:not(.user_content table) thead th { background: var(--surface-2) !important; }

/* Rubric rating cells / choice buttons (disabled or not) */
#content :is(button[data-testid*="ratings"], button[data-testid*="rating"]) {
  background: var(--surface-2) !important;
  border: 1px solid var(--border) !important;
  color: var(--text) !important;
  opacity: 1 !important;
}
#content :is(button[data-testid*="ratings"], button[data-testid*="rating"]) * { color: var(--text) !important; background: transparent !important; }

/* Secondary / outlined InstUI buttons (submission type picker, webcam/files buttons, etc.) */
:is(#content, [role="dialog"]) button[data-cid~="BaseButton"]:not([class*="primary"]):not([id="submit-button"]) {
  background: var(--surface-2) !important;
  border-color: var(--border) !important;
  color: var(--text) !important;
  opacity: 1 !important;
}
:is(#content, [role="dialog"]) button[data-cid~="BaseButton"]:not([disabled]):hover { border-color: var(--accent) !important; }
:is(#content, [role="dialog"]) button[data-cid~="BaseButton"] :where([class*="-text"], [class*="-view"], span) { color: var(--text) !important; background: transparent !important; }
:is(#content, [role="dialog"]) button[data-cid~="BaseButton"] svg { fill: currentColor; color: var(--text) !important; }

/* Toggle-details links ("View Rubric", "Details") */
:is(#content, [role="dialog"]) button[class*="toggleDetails__toggle"],
:is(#content, [role="dialog"]) button[class*="toggleDetails__toggle"] * { color: var(--link) !important; background: transparent !important; }

/* Primary action buttons (Submit, Save, etc.) */
:is(#content, [role="dialog"], footer, [id$="-footer"]) :is(#submit-button, button[color="primary"], button[data-cid~="BaseButton"][class*="primary"]),
:is(#content, [role="dialog"], footer, [id$="-footer"]) :is(#submit-button, button[color="primary"]) * {
  background: var(--accent) !important;
  color: #0b0d11 !important;
  border-color: var(--accent) !important;
}

/* Sticky footers / action bars */
[id$="-footer"], [data-testid$="-footer"], footer {
  background-color: var(--surface) !important;
  border-color: var(--border) !important;
}
:is([id$="-footer"], [data-testid$="-footer"]) :where([class*="-view"], [class*="-flexItem"], [class*="-flex-flex"]) { background: transparent !important; }

/* ====================== Popovers, dropdown menus, tooltips (rendered in portals) ====================== */
[data-position-content] [class*="contextView__content"],
[data-position-content] [class*="-contextView"][class*="__content"],
[data-position-content] [role="menu"],
[data-position-content] [role="listbox"],
[role="menu"][data-cid="Menu"] {
  background: var(--surface-2) !important;
  border-color: var(--border) !important;
  color: var(--text) !important;
}
[data-position-content] [class*="contextView__arrow"] { border-color: var(--surface-2) !important; background: var(--surface-2) !important; }
[data-position-content] [class*="contextView__arrow"]::before,
[data-position-content] [class*="contextView__arrow"]::after { border-color: var(--border) !important; background: var(--surface-2) !important; }
[data-position-content] [class*="-view"]:not([class*="contextView"]) { background: transparent !important; }

/* Menu / select items */
[data-position-content] [role="menuitem"], [data-position-content] [role="option"],
[data-position-content] [role="menuitemradio"], [data-position-content] [role="menuitemcheckbox"],
[data-cid="MenuItem"], [data-cid="Options.Item"] {
  background: transparent !important;
  color: var(--text) !important;
}
[data-position-content] [role="menuitem"] *, [data-position-content] [role="option"] *,
[data-cid="MenuItem"] *, [class*="menuItem__label"], [class*="options__item"], [class*="optionItem"] {
  color: var(--text) !important;
  background-color: transparent !important;
}
[data-position-content] [role="menuitem"]:hover, [data-position-content] [role="menuitem"]:focus,
[data-position-content] [role="option"]:hover, [data-position-content] [role="option"][aria-selected="true"],
[data-position-content] [role="option"][class*="highlighted"], [data-cid="MenuItem"]:hover, [data-cid="MenuItem"]:focus {
  background: var(--accent) !important;
}
[data-position-content] [role="menuitem"]:hover *, [data-position-content] [role="menuitem"]:focus *,
[data-position-content] [role="option"]:hover *, [data-position-content] [role="option"][aria-selected="true"] *,
[data-cid="MenuItem"]:hover *, [data-cid="MenuItem"]:focus * { color: #0b0d11 !important; }
[data-position-content] [role="separator"], [data-position-content] hr { border-color: var(--border) !important; background: var(--border) !important; }
[data-position-content] svg { fill: currentColor; }

/* Tooltips */
[data-position-content][class*="tooltip"], [role="tooltip"], [class*="tooltip__root"] {
  background: var(--surface-2) !important; color: var(--text) !important; border-color: var(--border) !important;
}

/* ====================== Calendar (FullCalendar) ====================== */
.fc, .fc-unthemed, .calendar { color: var(--text) !important; }
.fc-unthemed th, .fc-unthemed td, .fc-unthemed thead, .fc-unthemed tbody,
.fc-unthemed .fc-divider, .fc-unthemed .fc-row, .fc-unthemed .fc-content,
.fc-unthemed .fc-popover, .fc-unthemed .fc-list-view, .fc-unthemed .fc-list-heading td {
  border-color: var(--border) !important;
}
.fc-unthemed .fc-widget-header, .fc-unthemed .fc-head, .fc-unthemed .fc-day-header,
.fc-view-container, .fc-view, .fc-scroller, .fc-day-grid, .fc-time-grid, .fc-body, .fc-row, .fc-bg,
.fc-widget-content, .fc-content-skeleton, .fc-day-grid-container {
  background-color: transparent !important;
}
.fc-day-header { color: var(--text-dim) !important; background: var(--surface) !important; }
.fc-day.fc-widget-content, .fc-bg td { background: var(--surface) !important; }
.fc-other-month, .fc-bg td.fc-other-month { background: var(--bg) !important; }
.fc-other-month .fc-day-number, .fc-day-top.fc-other-month .fc-day-number { color: var(--text-dim) !important; opacity: .7; }
.fc-bg td.fc-today, .fc-unthemed td.fc-today, .fc-unthemed .fc-today { background: var(--surface-2) !important; }
.fc-day-number, .fc-day-top a, .fc-axis, .fc-week-number { color: var(--text) !important; }
.fc-today .fc-day-number { color: var(--accent) !important; font-weight: bold; }
.fc-nonbusiness { background: var(--bg) !important; }
.fc-bg td.fc-past { background: var(--surface) !important; }
.fc-bg td.fc-today { background: var(--surface-2) !important; }

/* Events: dark pill tinted with the course colour (--ev is read from Canvas by the script) */
.fc-event, .fc-event.fc-h-event, a.fc-event, .fc-day-grid-event, .fc-time-grid-event {
  --ev: var(--accent);
  background-color: color-mix(in srgb, var(--ev) 22%, var(--surface)) !important;
  background-image: none !important;
  color: var(--text) !important;
  border: 0 !important;
  border-left: 3px solid var(--ev) !important;
  border-radius: 4px !important;
  margin: 1px 3px !important;
  padding: 2px 6px !important;
  font-size: 12px;
  line-height: 1.35;
  box-shadow: none !important;
  transition: background-color .12s;
}
.fc-event:hover, a.fc-event:hover {
  background-color: color-mix(in srgb, var(--ev) 36%, var(--surface)) !important;
  text-decoration: none !important;
}
.fc-event .fc-content { white-space: normal; }
.fc-event .fc-time { color: var(--text-dim) !important; font-weight: 600; margin-right: 2px; }
.fc-event .fc-title, .fc-event .fc-content { color: var(--text) !important; }
.fc-event i, .fc-event [class*="icon-"] { color: var(--ev) !important; margin-right: 3px; filter: brightness(1.35); }
.fc-event .fc-title.calendar__event--completed { color: var(--text-dim) !important; text-decoration: line-through; text-decoration-color: var(--border); }
.fc-event:has(.calendar__event--completed) { background-color: color-mix(in srgb, var(--ev) 10%, var(--surface)) !important; border-left-color: color-mix(in srgb, var(--ev) 55%, var(--surface)) !important; }
.fc-more, .fc-more-cell a { color: var(--link) !important; }
.fc-popover { background: var(--surface-2) !important; border-color: var(--border) !important; }
.fc-popover .fc-header { background: var(--surface) !important; color: var(--text) !important; }

/* Calendar page chrome: agenda list, mini calendar, sidebar */
#calendar_header, #calendar-app, #minical, .calendar_view_buttons { background: transparent !important; }
.agenda-wrapper, .agenda-day, .agenda-event__item, .agenda-event__container { background: transparent !important; color: var(--text) !important; border-color: var(--border) !important; }
.agenda-date, .agenda-event__time, .agenda-event__title { color: var(--text) !important; }
.ui-datepicker, .ui-datepicker-inline, .ui-datepicker table, #minical .ui-datepicker { background: var(--surface) !important; color: var(--text) !important; border-color: var(--border) !important; }
.ui-datepicker td a, .ui-datepicker td span { background: transparent !important; color: var(--text) !important; border-color: transparent !important; }
.ui-datepicker td a.ui-state-active, .ui-datepicker td a.ui-state-highlight { background: var(--accent) !important; color: #0b0d11 !important; }
.ui-datepicker-header { background: var(--surface-2) !important; color: var(--text) !important; border-color: var(--border) !important; }

/* ====================== External tool iframes (invert from outside) ====================== */
iframe.tool_launch {
  color-scheme: light;
  background: #fff;
  filter: invert(1) hue-rotate(180deg);
}

/* ====================== Classic dashboard course cards ====================== */
.ic-DashboardCard__box__container, .ic-DashboardCard__box, #dashboard_header_container {
  background: transparent !important;
  color: var(--text) !important;
}
.ic-DashboardCard {
  background: var(--surface) !important;
  border: 1px solid var(--border) !important;
  box-shadow: none !important;
  color: var(--text) !important;
}
.ic-DashboardCard__header { background: transparent !important; }
.ic-DashboardCard__header-title, .ic-DashboardCard__header-title span {
  color: var(--text) !important;
  font-weight: 700;
}
.ic-DashboardCard__link:hover .ic-DashboardCard__header-title,
.ic-DashboardCard__link:hover .ic-DashboardCard__header-title span { color: var(--link) !important; }
.ic-DashboardCard__header-subtitle, .ic-DashboardCard__header-term { color: var(--text-dim) !important; }
.ic-DashboardCard__action-container {
  background: var(--surface) !important;
  border-top: 1px solid var(--border) !important;
}
.ic-DashboardCard__action { color: var(--text-dim) !important; background: transparent !important; }
.ic-DashboardCard__action:hover { color: var(--accent) !important; background: var(--surface-2) !important; }
.ic-DashboardCard__action svg { fill: currentColor; }
.ic-DashboardCard__action-badge { background: var(--accent) !important; color: #0b0d11 !important; }
.ic-DashboardCard__header-button, .ic-DashboardCard__header-button i { color: #fff !important; background: transparent !important; }

/* ---------- Dividers, scrollbars, selection ---------- */
#content hr { border-color: var(--border) !important; }
::selection { background: #2f6ea3; color: #fff; }
* { scrollbar-color: #3a4250 var(--bg); }
*::-webkit-scrollbar { width: 12px; height: 12px; }
*::-webkit-scrollbar-track { background: var(--bg); }
*::-webkit-scrollbar-thumb { background: #3a4250; border-radius: 6px; border: 2px solid var(--bg); }
#content :focus-visible { outline: 2px solid var(--accent) !important; outline-offset: 2px; }
`;

  /* ---------------- Style tag, enabled/disabled via the media attribute ---------------- */
  var STYLE_ID = 'canvas-dark-userscript';
  var styleEl = null;

  function applyState() {
    if (styleEl) styleEl.media = darkEnabled ? 'all' : 'not all';
    updateButton();
    if (typeof tintEvents === 'function') tintEvents();
  }

  function ensureStyle() {
    var root = document.head || document.documentElement;
    if (!root) return;
    styleEl = document.getElementById(STYLE_ID);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = STYLE_ID;
      styleEl.textContent = CSS;
      root.appendChild(styleEl);
    } else if (styleEl.parentNode && styleEl.parentNode.lastElementChild !== styleEl) {
      styleEl.parentNode.appendChild(styleEl); // keep it last so it wins
    }
    styleEl.media = darkEnabled ? 'all' : 'not all';
  }

  /* ---------------- Toggle button in the global nav ---------------- */
  var BTN_ID = 'canvas-dark-toggle-item';
  var MOON = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  var SUN = '<circle cx="12" cy="12" r="4.5"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
    '<path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></g>';

  function updateButton() {
    var li = document.getElementById(BTN_ID);
    if (!li) return;
    var svg = li.querySelector('svg');
    var txt = li.querySelector('.menu-item__text');
    var a = li.querySelector('a');
    // Show the action the click will perform
    if (svg) svg.innerHTML = darkEnabled ? SUN : MOON;
    if (txt) txt.textContent = darkEnabled ? 'Light' : 'Dark';
    if (a) {
      var label = darkEnabled ? 'Switch to light mode' : 'Switch to dark mode';
      a.setAttribute('aria-label', label);
      a.setAttribute('title', label);
      a.setAttribute('aria-pressed', String(darkEnabled));
    }
  }

  function toggle(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    darkEnabled = !darkEnabled;
    savePref();
    applyState();
  }

  function ensureButton() {
    if (document.getElementById(BTN_ID)) return;
    var menu = document.getElementById('menu');
    if (!menu) return;

    var li = document.createElement('li');
    li.id = BTN_ID;
    li.className = 'menu-item ic-app-header__menu-list-item';
    li.innerHTML =
      '<a role="button" href="#" class="ic-app-header__menu-list-link">' +
        '<div class="menu-item-icon-container" aria-hidden="true">' +
          '<svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg menu-item__icon" viewBox="0 0 24 24" fill="currentColor"></svg>' +
        '</div>' +
        '<div class="menu-item__text"></div>' +
      '</a>';
    li.querySelector('a').addEventListener('click', toggle);

    // Put it just before Help (last item) if present, otherwise at the end
    var help = document.getElementById('global_nav_help_link');
    var helpLi = help && help.closest('li');
    if (helpLi && helpLi.parentNode === menu) menu.insertBefore(li, helpLi);
    else menu.appendChild(li);
    updateButton();
  }

  /* ---------------- Boot ---------------- */
  ensureStyle();

  function boot() {
    ensureStyle();
    ensureButton();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.addEventListener('load', boot);

  // Re-add the style/button if Canvas rebuilds the head or nav

  /* Read each calendar event's original course colour (theme off for one synchronous read, no repaint) */
  function tintEvents() {
    if (!darkEnabled || !styleEl) return;
    var els = document.querySelectorAll('.fc-event:not([data-ev])');
    if (!els.length) return;
    var prev = styleEl.media, colors = [], i, c, cs;
    styleEl.media = 'not all';
    for (i = 0; i < els.length; i++) {
      cs = getComputedStyle(els[i]);
      c = cs.backgroundColor;
      if (!c || c === 'transparent' || /rgba\(.*,\s*0\)$/.test(c)) c = cs.borderLeftColor;
      colors.push(c);
    }
    styleEl.media = prev;
    for (i = 0; i < els.length; i++) {
      els[i].setAttribute('data-ev', '1');
      if (colors[i]) els[i].style.setProperty('--ev', colors[i]);
    }
  }

  var obs = new MutationObserver(function () {
    if (!document.getElementById(STYLE_ID)) ensureStyle();
    if (document.getElementById('menu') && !document.getElementById(BTN_ID)) ensureButton();
    tintEvents();
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();