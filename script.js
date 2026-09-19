/**
 * Markdown Studio Engine
 * Handles real-time parsing, syntax highlighting, toolbar actions, and statistics.
 */

document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('markdownInput');
    const preview = document.getElementById('previewContent');
    const statWords = document.getElementById('statWords');
    const statChars = document.getElementById('statChars');
    const statReadingTime = document.getElementById('statReadingTime');
    const statusSaveState = document.getElementById('statusSaveState');
    const btnClear = document.getElementById('btnClear');
    const toolBtns = document.querySelectorAll('.tool-btn[data-action]');

    // Configure marked.js
    marked.setOptions({
        gfm: true,
        breaks: true,
        headerIds: true,
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(code, { language: lang }).value;
                } catch (err) {}
            }
            return hljs.highlightAuto(code).value;
        }
    });

    // Debounce helper
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Update Statistics (Words, Characters, Reading Time)
    function updateStats(text) {
        const charCount = text.length;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const readingTime = Math.ceil(words / 200); // 200 WPM

        statWords.textContent = `${words} từ`;
        statChars.textContent = `${charCount} ký tự`;
        statReadingTime.textContent = `~${readingTime} phút đọc`;
    }

    // Render Markdown to Preview with Sanitization
    function renderMarkdown() {
        const rawMarkdown = editor.value;
        updateStats(rawMarkdown);

        try {
            const rawHtml = marked.parse(rawMarkdown);
            // Sanitize HTML to prevent XSS attacks
            const cleanHtml = DOMPurify.sanitize(rawHtml, {
                ADD_TAGS: ['input'],
                ADD_ATTR: ['type', 'checked', 'disabled']
            });
            preview.innerHTML = cleanHtml;
        } catch (error) {
            preview.innerHTML = `<p style="color: red;">Lỗi hiển thị Markdown: ${error.message}</p>`;
        }
    }

    // Insert formatting from Toolbar
    function insertFormat(action) {
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const text = editor.value;
        const selectedText = text.substring(start, end);

        let replacement = '';
        let cursorOffset = 0;

        switch (action) {
            case 'bold':
                replacement = `**${selectedText || 'văn bản in đậm'}**`;
                cursorOffset = selectedText ? replacement.length : 2;
                break;
            case 'italic':
                replacement = `*${selectedText || 'văn bản in nghiêng'}*`;
                cursorOffset = selectedText ? replacement.length : 1;
                break;
            case 'strike':
                replacement = `~~${selectedText || 'gạch ngang'}~~`;
                cursorOffset = selectedText ? replacement.length : 2;
                break;
            case 'h1':
                replacement = `# ${selectedText || 'Tiêu đề 1'}\n`;
                break;
            case 'h2':
                replacement = `## ${selectedText || 'Tiêu đề 2'}\n`;
                break;
            case 'h3':
                replacement = `### ${selectedText || 'Tiêu đề 3'}\n`;
                break;
            case 'quote':
                replacement = `> ${selectedText || 'Trích dẫn ở đây...'}\n`;
                break;
            case 'code':
                if (selectedText.includes('\n') || !selectedText) {
                    replacement = `\`\`\`javascript\n${selectedText || '// Viết mã tại đây'}\n\`\`\`\n`;
                } else {
                    replacement = `\`${selectedText}\``;
                }
                break;
            case 'link':
                replacement = `[${selectedText || 'Tên liên kết'}](https://example.com)`;
                break;
            case 'image':
                replacement = `![${selectedText || 'Mô tả hình ảnh'}](https://picsum.photos/600/300)`;
                break;
            case 'ul':
                replacement = `- ${selectedText || 'Mục danh sách'}\n- Mục tiếp theo\n`;
                break;
            case 'ol':
                replacement = `1. ${selectedText || 'Bước thứ nhất'}\n2. Bước thứ hai\n`;
                break;
            case 'task':
                replacement = `- [ ] ${selectedText || 'Việc cần làm'}\n- [x] Việc đã hoàn thành\n`;
                break;
            case 'table':
                replacement = `| Cột 1 | Cột 2 | Cột 3 |\n| :--- | :---: | ---: |\n| Dữ liệu 1 | Căn giữa | Căn phải |\n| Dữ liệu 2 | Giá trị | 100$ |\n`;
                break;
            default:
                return;
        }

        editor.setRangeText(replacement, start, end, 'end');
        editor.focus();
        renderMarkdown();
    }

    // Event Listeners for Toolbar
    toolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            insertFormat(btn.dataset.action);
        });
    });

    // Clear content
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            if (confirm('Bạn có chắc muốn xóa trắng văn bản?')) {
                editor.value = '';
                renderMarkdown();
            }
        });
    }

    // Keyboard shortcuts (Ctrl+B, Ctrl+I)
    editor.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
            e.preventDefault();
            insertFormat('bold');
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
            e.preventDefault();
            insertFormat('italic');
        }
    });

    // Real-time input handling with debounce
    const handleInput = debounce(() => {
        renderMarkdown();
    }, 100);

    editor.addEventListener('input', handleInput);

    // Initial render
    renderMarkdown();
});
