
// ==UserScript==
// @name         Snapchat MediaCopier
// @namespace    http://tampermonkey.net/
// @version      2026-10-19
// @description  Inspect and preview blob: media elements.
// @author       You
// @match        https://www.snapchat.com/web*
// @match        https://web.snapchat.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const ID = "blob-inspector";

    document.getElementById(ID)?.remove();

    const host = document.createElement("div");
    host.id = ID;
    host.style.cssText = `
        position: fixed !important;
        inset: 0 !important;
        z-index: 2147483647 !important;
        pointer-events: none !important;
    `;

    const shadow = host.attachShadow({ mode: "open" });

    shadow.innerHTML = `
        <style>
            * {
                box-sizing: border-box;
            }

            .window {
                position: fixed;
                z-index: 2147483647;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 620px;
                height: 390px;
                max-width: 95vw;
                max-height: 85vh;
                display: none;
                flex-direction: column;
                background: #181818;
                color: #eee;
                opacity: 1;
                border: 1px solid #484848;
                border-radius: 9px;
                box-shadow: 0 12px 50px #000;
                font: 13px -apple-system, BlinkMacSystemFont, sans-serif;
                overflow: hidden;
                pointer-events: auto;
            }

            header {
                padding: 11px 14px;
                background: #242424;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #383838;
                cursor: grab;
                user-select: none;
                flex-shrink: 0;
            }

            button {
                cursor: pointer;
                color: #eee;
                background: #303030;
                border: 1px solid #484848;
                border-radius: 4px;
                padding: 5px 9px;
                font: inherit;
            }

            button:hover {
                background: #454545;
            }

            .toggle-button {
                position: fixed;
                right: 16px;
                bottom: 16px;
                z-index: 2147483647;
                background: #242424;
                color: #eee;
                border: 1px solid #555;
                border-radius: 8px;
                padding: 10px 14px;
                font: 600 13px -apple-system, BlinkMacSystemFont, sans-serif;
                cursor: pointer;
                pointer-events: auto;
                box-shadow: 0 4px 16px #0008;
            }

            .toggle-button:hover {
                background: #383838;
            }

            .body {
                display: flex;
                flex: 1;
                min-height: 0;
            }

            .sidebar {
                width: 48%;
                flex-shrink: 0;
                overflow: auto;
                border-right: 1px solid #383838;
                background: #181818;
            }

            .item {
                display: block;
                width: 100%;
                text-align: left;
                border: 0;
                border-radius: 0;
                border-bottom: 1px solid #303030;
                padding: 10px;
                overflow-wrap: anywhere;
                background: #181818;
            }

            .item.selected {
                background: #343b49;
            }

            .tag {
                color: #9dbaff;
                font-weight: 600;
            }

            .url {
                color: #aaa;
                font-size: 11px;
                margin-top: 4px;
            }

            .preview {
                flex: 1;
                min-width: 0;
                padding: 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 10px;
                overflow: auto;
                background: #181818;
            }

            .preview img,
            .preview video,
            .preview iframe {
                max-width: 100%;
                max-height: 250px;
                object-fit: contain;
                border: 0;
            }

            .preview audio {
                max-width: 100%;
            }

            .info {
                color: #aaa;
                overflow-wrap: anywhere;
                text-align: center;
            }

            .empty {
                padding: 15px;
                color: #aaa;
            }

            footer {
                padding: 8px 12px;
                border-top: 1px solid #383838;
                background: #202020;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #aaa;
                flex-shrink: 0;
            }
        </style>

        <button class="toggle-button" id="toggle">
            Media Inspector
        </button>

        <div class="window">
            <header>
                <strong>Blob Inspector</strong>
                <div>
                    <button id="refresh">Refresh</button>
                    <button id="close">✕</button>
                </div>
            </header>

            <div class="body">
                <div class="sidebar" id="list"></div>

                <div class="preview" id="preview">
                    <span class="info">
                        Select an element to preview it.
                    </span>
                </div>
            </div>

            <footer>
                <span id="count">0 elements</span>
                <span>Drag header to move</span>
            </footer>
        </div>
    `;

    document.documentElement.appendChild(host);

    const $ = (selector) => shadow.querySelector(selector);
    const win = $(".window");
    const header = shadow.querySelector("header");
    const toggle = $("#toggle");

    let elements = [];
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let observer;
    let refreshQueued = false;

    // Toggle the inspector using the corner button.
    toggle.addEventListener("click", () => {
        const isHidden = win.style.display === "none" ||
            getComputedStyle(win).display === "none";

        win.style.display = isHidden ? "flex" : "none";

        if (isHidden) {
            refresh();
        }
    });

    // Close the inspector.
    $("#close").addEventListener("click", () => {
        win.style.display = "none";
    });

    // Make the window draggable by its header.
    header.addEventListener("mousedown", (event) => {
        if (event.target.closest("button")) return;
        if (event.button !== 0) return;

        const rect = win.getBoundingClientRect();

        dragging = true;
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;

        win.style.transform = "none";
        win.style.left = `${rect.left}px`;
        win.style.top = `${rect.top}px`;

        header.style.cursor = "grabbing";
        event.preventDefault();
    });

    function onMouseMove(event) {
        if (!dragging) return;

        const maxX = Math.max(0, window.innerWidth - win.offsetWidth);
        const maxY = Math.max(0, window.innerHeight - win.offsetHeight);

        win.style.left = `${Math.max(
            0,
            Math.min(event.clientX - offsetX, maxX)
        )}px`;

        win.style.top = `${Math.max(
            0,
            Math.min(event.clientY - offsetY, maxY)
        )}px`;
    }

    function onMouseUp() {
        dragging = false;
        header.style.cursor = "grab";
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Find elements whose src attribute starts with blob:.
    function getBlobElements() {
        return [...document.querySelectorAll("[src]")]
            .filter((el) =>
                el.getAttribute("src")?.startsWith("blob:")
            );
    }

    function refresh() {
        elements = getBlobElements();

        $("#list").replaceChildren();
        $("#preview").replaceChildren();

        $("#count").textContent =
            `${elements.length} element${elements.length === 1 ? "" : "s"}`;

        if (!elements.length) {
            const empty = document.createElement("div");
            empty.className = "empty";
            empty.textContent = "No blob: sources found.";
            $("#list").append(empty);

            const info = document.createElement("span");
            info.className = "info";
            info.textContent = "No blob: sources found.";
            $("#preview").append(info);
            return;
        }

        const info = document.createElement("span");
        info.className = "info";
        info.textContent = "Select an element to preview it.";
        $("#preview").append(info);

        elements.forEach((el, index) => {
            const item = document.createElement("button");
            item.className = "item";

            const tag = document.createElement("div");
            tag.className = "tag";
            tag.textContent =
                `${index + 1}. <${el.tagName.toLowerCase()}>` +
                (el.id ? `#${el.id}` : "");

            const url = document.createElement("div");
            url.className = "url";
            url.textContent = el.getAttribute("src");

            item.append(tag, url);

            item.addEventListener("click", () => {
                select(index, item);
            });

            $("#list").append(item);
        });
    }

    function select(index, item) {
        const source = elements[index];

        if (!source?.isConnected) {
            refresh();
            return;
        }

        shadow.querySelectorAll(".item").forEach((el) => {
            el.classList.remove("selected");
        });

        item.classList.add("selected");

        const preview = $("#preview");
        preview.replaceChildren();

        const label = document.createElement("div");
        label.className = "info";
        label.textContent =
            source.tagName.toLowerCase() +
            (source.id ? `#${source.id}` : "");

        preview.append(label);

        const tag = source.tagName.toLowerCase();
        let media;

        if (tag === "img") {
            media = document.createElement("img");
            media.alt = "Blob image preview";
        } else if (tag === "video") {
            media = document.createElement("video");
            media.controls = true;
            media.autoplay = false;
            media.playsInline = true;
        } else if (tag === "audio") {
            media = document.createElement("audio");
            media.controls = true;
        } else if (tag === "iframe") {
            media = document.createElement("iframe");
            media.title = "Blob preview";
        }

        if (media) {
            media.src = source.getAttribute("src");
            preview.append(media);
        } else {
            const info = document.createElement("div");
            info.className = "info";
            info.textContent =
                "No built-in preview for this element type.";
            preview.append(info);
        }

        const copy = document.createElement("button");
        copy.textContent = "Copy blob URL";

        copy.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(source.src);
                copy.textContent = "Copied!";
            } catch {
                copy.textContent = "Clipboard unavailable";
            }
        });

        preview.append(copy);
    }

    $("#refresh").addEventListener("click", refresh);

    // Automatically detect added, removed, or changed src elements.
    function scheduleRefresh() {
        if (refreshQueued) return;

        refreshQueued = true;

        requestAnimationFrame(() => {
            refreshQueued = false;

            if (host.isConnected && win.style.display !== "none") {
                refresh();
            }
        });
    }

    observer = new MutationObserver((mutations) => {
        if (mutations.some((mutation) =>
            mutation.type === "childList" ||
            mutation.attributeName === "src"
        )) {
            scheduleRefresh();
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["src"]
    });

    // Clean up listeners if the userscript is removed.
    function cleanup() {
        observer?.disconnect();
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
    }

    // Keep cleanup available if you later add a full removal button.
    host.cleanup = cleanup;

    // Inspector starts hidden; corner button remains visible.
    win.style.display = "none";
})();
