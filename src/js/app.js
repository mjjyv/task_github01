/**
 * Application Entry Point
 * Orchestrates modules, event handlers, Obsidian modes, Split Resizer, Vault Explorer,
 * and asynchronous Mermaid diagram rendering.
 */

import { APP_CONFIG } from './config.js';
import { configureParser, parseMarkdown } from './modules/parser.js';
import { calculateStats, updateStatsUI } from './modules/stats.js';
import { saveContent, loadContent, clearContent } from './modules/storage.js';
import { applyFormatting } from './modules/toolbar.js';
import { setupSyncScroll } from './modules/scroller.js';
import { copyHtmlToClipboard, exportMarkdownFile, exportHtmlFile } from './modules/exporter.js';
import { renderMermaidDiagrams } from './modules/diagram-processor.js';
import { VAULT_DOCS } from './vault-docs.js';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const editor = document.getElementById('markdownInput');
    const preview = document.getElementById('previewContent');
    const workspace = document.getElementById('workspace');
    const editorPane = document.getElementById('editorPane');
    const paneResizer = document.getElementById('paneResizer');
    const vaultSidebar = document.getElementById('vaultSidebar');
    const btnToggleSidebar = document.getElementById('btnToggleSidebar');
    const docFileList = document.getElementById('docFileList');
    const docSearchInput = document.getElementById('docSearchInput');
    const currentDocTitle = document.getElementById('currentDocTitle');

    // Status & Stats Elements
    const statWords = document.getElementById('statWords');
    const statChars = document.getElementById('statChars');
    const statReadingTime = document.getElementById('statReadingTime');
    const statusSaveState = document.getElementById('statusSaveState');

    // Action & View Buttons
    const btnClear = document.getElementById('btnClear');
    const btnCopyHtml = document.getElementById('btnCopyHtml');
    const btnExportMd = document.getElementById('btnExportMd');
    const btnExportHtml = document.getElementById('btnExportHtml');
    const viewBtns = document.querySelectorAll('.view-mode-btn');
    const toolBtns = document.querySelectorAll('.tool-btn[data-action]');

    const statElements = {
        words: statWords,
        chars: statChars,
        readingTime: statReadingTime
    };

    let activeDocName = 'Ghi chú hiện tại';

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
    async function render() {
        const markdown = editor.value;
        
        // Update stats
        const stats = calculateStats(markdown);
        updateStatsUI(statElements, stats);

        // Parse and render HTML with full Obsidian styling & KaTeX math
        preview.innerHTML = parseMarkdown(markdown);
        attachInteractivePreviewEvents();

        // Render Mermaid Diagrams if present
        await renderMermaidDiagrams(preview);
    }

    // 1. Interactive Preview (Click Checkbox in Preview -> Updates Editor)
    function attachInteractivePreviewEvents() {
        const checkboxes = preview.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((cb, index) => {
            cb.removeAttribute('disabled');
            cb.addEventListener('change', () => {
                toggleTaskCheckboxInEditor(index, cb.checked);
            });
        });

        // Click Wikilink inside document -> auto navigate if exists in vault
        const wikilinks = preview.querySelectorAll('.internal-link');
        wikilinks.forEach(link => {
            link.addEventListener('click', () => {
                const target = link.dataset.href;
                if (!target) return;
                
                const foundKey = Object.keys(VAULT_DOCS).find(k => 
                    k.toLowerCase().includes(target.toLowerCase()) || 
                    target.toLowerCase().includes(k.toLowerCase().replace('.md', ''))
                );

                if (foundKey) {
                    loadDocIntoEditor(foundKey, VAULT_DOCS[foundKey]);
                }
            });
        });
    }

    function toggleTaskCheckboxInEditor(checkboxIndex, isChecked) {
        const lines = editor.value.split('\n');
        let taskCount = 0;

        for (let i = 0; i < lines.length; i++) {
            const taskMatch = lines[i].match(/^(\s*[-*+]\s+\[)([ xX])(\]\s+.*)$/);
            if (taskMatch) {
                if (taskCount === checkboxIndex) {
                    const mark = isChecked ? 'x' : ' ';
                    lines[i] = `${taskMatch[1]}${mark}${taskMatch[3]}`;
                    break;
                }
                taskCount++;
            }
        }

        editor.value = lines.join('\n');
        saveContent(editor.value);
        render();
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

    // 2. Split Pane Resizer (Drag to Resize)
    let isResizing = false;
    const RESIZE_STORAGE_KEY = 'obsidian_pane_ratio';

    const savedRatio = localStorage.getItem(RESIZE_STORAGE_KEY);
    if (savedRatio) {
        editorPane.style.width = `${savedRatio}%`;
    }

    paneResizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        paneResizer.classList.add('active');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        const workspaceRect = workspace.getBoundingClientRect();
        const pointerX = e.clientX - workspaceRect.left;
        const totalWidth = workspaceRect.width;

        let percentage = (pointerX / totalWidth) * 100;
        percentage = Math.max(15, Math.min(85, percentage));

        editorPane.style.width = `${percentage}%`;
        localStorage.setItem(RESIZE_STORAGE_KEY, percentage.toFixed(2));
    });

    window.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            paneResizer.classList.remove('active');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    });

    // 3. Obsidian View Modes (Dual, Source, Reading) & Ctrl+E Shortcut
    function setViewMode(mode) {
        workspace.classList.remove('mode-source', 'mode-reading');
        viewBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));

        if (mode === 'source') {
            workspace.classList.add('mode-source');
        } else if (mode === 'reading') {
            workspace.classList.add('mode-reading');
        }
    }

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => setViewMode(btn.dataset.mode));
    });

    function toggleReadingView() {
        if (workspace.classList.contains('mode-reading')) {
            setViewMode('dual');
        } else {
            setViewMode('reading');
        }
    }

    // 4. Sidebar Vault Explorer (Docs)
    function renderDocList(filter = '') {
        docFileList.innerHTML = '';
        const keys = Object.keys(VAULT_DOCS);
        const filteredKeys = keys.filter(k => k.toLowerCase().includes(filter.toLowerCase()));

        filteredKeys.forEach(filename => {
            const li = document.createElement('li');
            li.className = `file-item ${filename === activeDocName ? 'active' : ''}`;
            
            let displayName = filename.replace('life_obsidian_', '').replace('.md', '');
            li.innerHTML = `<span class="file-icon">📄</span><span class="file-name" title="${filename}">${displayName}</span>`;

            li.addEventListener('click', () => {
                loadDocIntoEditor(filename, VAULT_DOCS[filename]);
            });

            docFileList.appendChild(li);
        });
    }

    function loadDocIntoEditor(filename, content) {
        activeDocName = filename;
        editor.value = content;
        currentDocTitle.textContent = filename;
        saveContent(editor.value);
        render();
        renderDocList(docSearchInput.value);
    }

    btnToggleSidebar.addEventListener('click', () => {
        vaultSidebar.classList.toggle('collapsed');
    });

    docSearchInput.addEventListener('input', () => {
        renderDocList(docSearchInput.value);
    });

    // Toolbar formatting actions
    toolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            applyFormatting(editor, btn.dataset.action);
            render();
            saveContent(editor.value);
        });
    });

    // Keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+E for reading view)
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
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
            e.preventDefault();
            toggleReadingView();
        }
    });

    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e' && document.activeElement !== editor) {
            e.preventDefault();
            toggleReadingView();
        }
    });

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
            exportMarkdownFile(editor.value, `${activeDocName.replace('.md', '')}.md`);
        });
    }

    // Export .html
    if (btnExportHtml) {
        btnExportHtml.addEventListener('click', () => {
            exportHtmlFile(preview.innerHTML, `${activeDocName.replace('.md', '')}.html`);
        });
    }

    // Initial Load
    renderDocList();
    const saved = loadContent();
    editor.value = saved !== null ? saved : APP_CONFIG.DEFAULT_SAMPLE;
    render();
});
