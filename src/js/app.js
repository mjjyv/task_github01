/**
 * Application Entry Point
 * Orchestrates modules, event handlers, and lifecycle.
 */

import { APP_CONFIG } from './config.js';
import { configureParser, parseMarkdown } from './modules/parser.js';
import { calculateStats, updateStatsUI } from './modules/stats.js';
import { saveContent, loadContent, clearContent } from './modules/storage.js';
import { applyFormatting } from './modules/toolbar.js';
import { setupSyncScroll } from './modules/scroller.js';
import { copyHtmlToClipboard, exportMarkdownFile, exportHtmlFile } from './modules/exporter.js';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const editor = document.getElementById('markdownInput');
    const preview = document.getElementById('previewContent');
    const statWords = document.getElementById('statWords');
    const statChars = document.getElementById('statChars');
    const statReadingTime = document.getElementById('statReadingTime');
    const statusSaveState = document.getElementById('statusSaveState');

    // Action Buttons
    const btnClear = document.getElementById('btnClear');
    const btnSample = document.getElementById('btnSample');
    const btnCopyHtml = document.getElementById('btnCopyHtml');
    const btnExportMd = document.getElementById('btnExportMd');
    const btnExportHtml = document.getElementById('btnExportHtml');
    const toolBtns = document.querySelectorAll('.tool-btn[data-action]');

    const statElements = {
        words: statWords,
        chars: statChars,
        readingTime: statReadingTime
    };

    // Initialize Markdown Parser
    configureParser();

    // Debounce Helper
    function debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // Main Render Function
    function render() {
        const markdown = editor.value;
        
        // Update stats
        const stats = calculateStats(markdown);
        updateStatsUI(statElements, stats);

        // Parse and render HTML
        preview.innerHTML = parseMarkdown(markdown);
    }

    // Auto-save & Render on input
    const onInput = debounce(() => {
        render();
        saveContent(editor.value);
        if (statusSaveState) {
            statusSaveState.textContent = 'Đã lưu tự động ' + new Date().toLocaleTimeString();
        }
    }, APP_CONFIG.DEBOUNCE_DELAY_MS || 120);

    editor.addEventListener('input', onInput);

    // Setup Synchronized Scrolling
    setupSyncScroll(editor, preview);

    // Toolbar actions
    toolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            applyFormatting(editor, btn.dataset.action);
            render();
            saveContent(editor.value);
        });
    });

    // Keyboard shortcuts (Ctrl+B, Ctrl+I)
    editor.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
            e.preventDefault();
            applyFormatting(editor, 'bold');
            render();
            saveContent(editor.value);
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
            e.preventDefault();
            applyFormatting(editor, 'italic');
            render();
            saveContent(editor.value);
        }
    });

    // Sample Document
    if (btnSample) {
        btnSample.addEventListener('click', () => {
            editor.value = APP_CONFIG.DEFAULT_SAMPLE;
            render();
            saveContent(editor.value);
        });
    }

    // Clear content
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            if (confirm('Bạn có chắc muốn xóa trắng văn bản?')) {
                editor.value = '';
                clearContent();
                render();
            }
        });
    }

    // Copy HTML
    if (btnCopyHtml) {
        btnCopyHtml.addEventListener('click', async () => {
            const success = await copyHtmlToClipboard(preview.innerHTML);
            if (success) {
                const oldText = btnCopyHtml.textContent;
                btnCopyHtml.textContent = '✅ Đã chép!';
                setTimeout(() => { btnCopyHtml.textContent = oldText; }, 2000);
            }
        });
    }

    // Export .md
    if (btnExportMd) {
        btnExportMd.addEventListener('click', () => {
            exportMarkdownFile(editor.value);
        });
    }

    // Export .html
    if (btnExportHtml) {
        btnExportHtml.addEventListener('click', () => {
            exportHtmlFile(preview.innerHTML);
        });
    }

    // Initial Load
    const saved = loadContent();
    editor.value = saved !== null ? saved : APP_CONFIG.DEFAULT_SAMPLE;
    render();
});
