/**
 * Application Entry Point
 * Orchestrates modules, event handlers, Obsidian modes, Split Resizer, Vault Explorer,
 * Command Palette, Outline TOC, Theme Manager, KaTeX Math, and Mermaid Diagrams.
 */

import { APP_CONFIG } from './config.js';
import { configureParser, parseMarkdown } from './modules/parser.js';
import { calculateStats, updateStatsUI } from './modules/stats.js';
import { saveContent, loadContent, clearContent } from './modules/storage.js';
import { applyFormatting } from './modules/toolbar.js';
import { setupSyncScroll } from './modules/scroller.js';
import { copyHtmlToClipboard, exportMarkdownFile, exportHtmlFile } from './modules/exporter.js';
import { renderMermaidDiagrams } from './modules/diagram-processor.js';
import { initTheme, toggleTheme, getCurrentTheme } from './modules/theme-manager.js';
import { extractHeadings, renderOutlineUI } from './modules/outline-toc.js';
import { CommandPalette } from './modules/command-palette.js';
import { VAULT_DOCS } from './vault-docs.js';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const editor = document.getElementById('markdownInput');
    const preview = document.getElementById('previewContent');
    const workspace = document.getElementById('workspace');
    const editorPane = document.getElementById('editorPane');
    const paneResizer = document.getElementById('paneResizer');
    
    // Sidebars
    const vaultSidebar = document.getElementById('vaultSidebar');
    const btnToggleSidebar = document.getElementById('btnToggleSidebar');
    const docFileList = document.getElementById('docFileList');
    const docSearchInput = document.getElementById('docSearchInput');
    const currentDocTitle = document.getElementById('currentDocTitle');
    
    const outlinePanel = document.getElementById('outlinePanel');
    const btnToggleOutline = document.getElementById('btnToggleOutline');
    const outlineContainer = document.getElementById('outlineContainer');

    // Theme & Command Palette Buttons
    const btnThemeToggle = document.getElementById('btnThemeToggle');
    const btnCommandPalette = document.getElementById('btnCommandPalette');

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

    // Initialize Markdown Parser & Theme
    configureParser();
    initTheme();

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

        // Update Outline (TOC)
        updateOutline(markdown);

        // Parse and render HTML with full Obsidian styling & KaTeX math
        preview.innerHTML = parseMarkdown(markdown);
        
        // Enhance rendered code blocks (Add language header & Copy button)
        enhanceCodeBlocks();

        // Attach Interactive events (Checkboxes, Wikilinks)
        attachInteractivePreviewEvents();

        // Render Mermaid Diagrams if present
        await renderMermaidDiagrams(preview);
    }

    // Update Outline TOC Tree
    function updateOutline(markdown) {
        const headings = extractHeadings(markdown);
        renderOutlineUI(outlineContainer, headings, (heading) => {
            scrollToHeading(heading);
        });
    }

    function scrollToHeading(heading) {
        // Find corresponding heading in preview
        const previewHeadings = preview.querySelectorAll('h1, h2, h3, h4, h5, h6');
        for (const el of previewHeadings) {
            if (el.textContent.trim().toLowerCase().includes(heading.text.toLowerCase())) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Also scroll editor to approximate line
                const totalLines = editor.value.split('\n').length;
                if (totalLines > 0) {
                    const scrollRatio = heading.lineNumber / totalLines;
                    editor.scrollTop = scrollRatio * (editor.scrollHeight - editor.clientHeight);
                }
                break;
            }
        }
    }

    // Wrap code blocks with Header & Copy Button
    function enhanceCodeBlocks() {
        const preElements = preview.querySelectorAll('pre');
        preElements.forEach((pre) => {
            if (pre.parentElement && pre.parentElement.classList.contains('code-block-wrapper')) {
                return;
            }

            const codeEl = pre.querySelector('code');
            if (!codeEl) return;

            if (codeEl.classList.contains('language-mermaid')) return;

            let langName = 'CODE';
            codeEl.classList.forEach((cls) => {
                if (cls.startsWith('language-')) {
                    langName = cls.replace('language-', '').toUpperCase();
                }
            });

            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';

            const header = document.createElement('div');
            header.className = 'code-block-header';
            header.innerHTML = `
                <span class="code-lang-tag">${langName}</span>
                <button type="button" class="code-copy-btn" title="Sao chép đoạn mã">📋 Copy</button>
            `;

            const copyBtn = header.querySelector('.code-copy-btn');
            copyBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(codeEl.textContent);
                    copyBtn.textContent = '✅ Đã chép!';
                    copyBtn.style.color = '#38bdf8';
                    setTimeout(() => {
                        copyBtn.textContent = '📋 Copy';
                        copyBtn.style.color = '';
                    }, 2000);
                } catch (err) {
                    console.error('Không thể copy code:', err);
                }
            });

            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(header);
            wrapper.appendChild(pre);
        });
    }

    // Interactive Preview (Click Checkbox in Preview -> Updates Editor)
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

    // Split Pane Resizer (Drag to Resize)
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

    // Obsidian View Modes (Dual, Source, Reading) & Ctrl+E Shortcut
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

    // Sidebar Vault Explorer (Docs)
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

    btnToggleOutline.addEventListener('click', () => {
        outlinePanel.classList.toggle('collapsed');
    });

    btnThemeToggle.addEventListener('click', () => {
        const theme = toggleTheme();
        render();
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

    // Command Palette Setup (Ctrl+P)
    const commandList = [
        { title: 'Chuyển sang Chế độ Đọc (Reading View)', category: 'Chế độ xem', shortcut: 'Ctrl+E', icon: '📖', action: () => setViewMode('reading') },
        { title: 'Chuyển sang Chế độ Song Song (Dual-Pane)', category: 'Chế độ xem', icon: '⚖️', action: () => setViewMode('dual') },
        { title: 'Chuyển sang Chế độ Soạn Thảo (Source Mode)', category: 'Chế độ xem', icon: '✏️', action: () => setViewMode('source') },
        { title: 'Đổi Giao diện Sáng / Tối (Toggle Theme)', category: 'Giao diện', icon: '🌓', action: () => { toggleTheme(); render(); } },
        { title: 'Đóng / Mở Thanh bên Vault (Docs)', category: 'Giao diện', icon: '📂', action: () => vaultSidebar.classList.toggle('collapsed') },
        { title: 'Đóng / Mở Mục lục Tài liệu (Outline TOC)', category: 'Giao diện', icon: '📑', action: () => outlinePanel.classList.toggle('collapsed') },
        { title: 'Chèn Hộp thông tin (Obsidian Callout)', category: 'Định dạng', icon: '💡', action: () => { applyFormatting(editor, 'callout'); render(); } },
        { title: 'Chèn Công thức Toán học LaTeX', category: 'Định dạng', icon: '📐', action: () => { applyFormatting(editor, 'math'); render(); } },
        { title: 'Chèn Sơ đồ Biểu đồ Mermaid', category: 'Định dạng', icon: '📊', action: () => { applyFormatting(editor, 'mermaid'); render(); } },
        { title: 'Chèn Liên kết Nội bộ (Wikilink)', category: 'Định dạng', icon: '🔗', action: () => { applyFormatting(editor, 'wikilink'); render(); } },
        { title: 'Chèn Bảng Dữ liệu (Table)', category: 'Định dạng', icon: '▦', action: () => { applyFormatting(editor, 'table'); render(); } },
        { title: 'Sao chép Toàn bộ HTML ra Clipboard', category: 'Xuất dữ liệu', icon: '📋', action: () => btnCopyHtml.click() },
        { title: 'Tải về file Markdown (.md)', category: 'Xuất dữ liệu', icon: '💾', action: () => btnExportMd.click() },
        { title: 'Tải về trang HTML độc lập', category: 'Xuất dữ liệu', icon: '🚀', action: () => btnExportHtml.click() },
        { title: 'Xóa trắng toàn bộ nội dung', category: 'Chỉnh sửa', icon: '🗑️', action: () => btnClear.click() }
    ];

    const palette = new CommandPalette({ commands: commandList });
    btnCommandPalette.addEventListener('click', () => palette.open());

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
