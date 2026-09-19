/**
 * Markdown Studio Engine & Advanced Tools
 * Real-time parser, syntax highlight, synchronized scrolling, sample docs, export HTML/MD, local persistence.
 */

document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('markdownInput');
    const preview = document.getElementById('previewContent');
    const statWords = document.getElementById('statWords');
    const statChars = document.getElementById('statChars');
    const statReadingTime = document.getElementById('statReadingTime');
    const statusSaveState = document.getElementById('statusSaveState');
    const btnClear = document.getElementById('btnClear');
    const btnSample = document.getElementById('btnSample');
    const btnCopyHtml = document.getElementById('btnCopyHtml');
    const btnExportMd = document.getElementById('btnExportMd');
    const btnExportHtml = document.getElementById('btnExportHtml');
    const toolBtns = document.querySelectorAll('.tool-btn[data-action]');

    const STORAGE_KEY = 'markdown_studio_content';

    const SAMPLE_MARKDOWN = `# Chào mừng bạn đến với Markdown Studio 🚀

**Markdown Studio** là trình xem và biên tập Markdown trực quan với hỗ trợ Live Preview thời gian thực.

---

## 💡 Tính năng nổi bật
- [x] Soạn thảo Markdown với bộ tô màu cú pháp (Syntax Highlighting).
- [x] Hỗ trợ bảng (GFM Table), danh sách việc cần làm (Task List).
- [x] Đồng bộ vị trí cuộn trang giữa Trình soạn thảo và Xem trước.
- [x] Tự động lưu nội dung vào **LocalStorage**.
- [x] Xuất tài liệu ra định dạng **.md** hoặc trang **HTML độc lập**.

---

## 💻 Đoạn mã minh họa (Code Highlight)

\`\`\`javascript
// Hàm tính giai thừa với JavaScript
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

console.log('5! =', factorial(5));
\`\`\`

---

## 📊 Bảng so sánh (GFM Table)

| Tính năng | Markdown Studio | Trình đọc thông thường |
| :--- | :---: | :---: |
| Xem trước thời gian thực | ✅ Có | ❌ Không |
| Tô màu cú pháp Code | ✅ Đầy đủ | ⚠️ Hạn chế |
| Đồng bộ cuộn | ✅ Mượt mà | ❌ Không |
| Xuất HTML đóng gói | ✅ 1-Click | ❌ Không |

---

> ❝ Sự đơn giản là đỉnh cao của sự tinh tế. ❞
> — *Leonardo da Vinci*
`;

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

    // Save to LocalStorage
    function saveToStorage(text) {
        localStorage.setItem(STORAGE_KEY, text);
        statusSaveState.textContent = 'Đã lưu tự động ' + new Date().toLocaleTimeString();
    }

    // Update Statistics
    function updateStats(text) {
        const charCount = text.length;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const readingTime = Math.ceil(words / 200);

        statWords.textContent = `${words} từ`;
        statChars.textContent = `${charCount} ký tự`;
        statReadingTime.textContent = `~${readingTime} phút đọc`;
    }

    // Render Markdown to Preview
    function renderMarkdown() {
        const rawMarkdown = editor.value;
        updateStats(rawMarkdown);

        try {
            const rawHtml = marked.parse(rawMarkdown);
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

        switch (action) {
            case 'bold':
                replacement = `**${selectedText || 'văn bản in đậm'}**`;
                break;
            case 'italic':
                replacement = `*${selectedText || 'văn bản in nghiêng'}*`;
                break;
            case 'strike':
                replacement = `~~${selectedText || 'gạch ngang'}~~`;
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
        saveToStorage(editor.value);
    }

    // Synchronized Scrolling
    let isEditorScrolling = false;
    let isPreviewScrolling = false;

    editor.addEventListener('scroll', () => {
        if (isPreviewScrolling) return;
        isEditorScrolling = true;
        const scrollPercentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
        preview.scrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight);
        setTimeout(() => { isEditorScrolling = false; }, 50);
    });

    preview.addEventListener('scroll', () => {
        if (isEditorScrolling) return;
        isPreviewScrolling = true;
        const scrollPercentage = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
        editor.scrollTop = scrollPercentage * (editor.scrollHeight - editor.clientHeight);
        setTimeout(() => { isPreviewScrolling = false; }, 50);
    });

    // Toolbar Listeners
    toolBtns.forEach(btn => {
        btn.addEventListener('click', () => insertFormat(btn.dataset.action));
    });

    // Clear content
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            if (confirm('Bạn có chắc muốn xóa trắng văn bản?')) {
                editor.value = '';
                renderMarkdown();
                saveToStorage('');
            }
        });
    }

    // Load Sample Markdown
    if (btnSample) {
        btnSample.addEventListener('click', () => {
            editor.value = SAMPLE_MARKDOWN;
            renderMarkdown();
            saveToStorage(editor.value);
        });
    }

    // Copy HTML to Clipboard
    if (btnCopyHtml) {
        btnCopyHtml.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(preview.innerHTML);
                const originalText = btnCopyHtml.textContent;
                btnCopyHtml.textContent = '✅ Đã chép!';
                setTimeout(() => { btnCopyHtml.textContent = originalText; }, 2000);
            } catch (err) {
                alert('Không thể sao chép vào clipboard.');
            }
        });
    }

    // Export .md file
    if (btnExportMd) {
        btnExportMd.addEventListener('click', () => {
            const blob = new Blob([editor.value], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `document_${Date.now()}.md`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    // Export standalone HTML file
    if (btnExportHtml) {
        btnExportHtml.addEventListener('click', () => {
            const standaloneHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Markdown Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; max-width: 860px; margin: 40px auto; padding: 0 20px; color: #1e293b; }
        pre { background: #0f172a; padding: 16px; border-radius: 8px; overflow: auto; }
        code { font-family: Consolas, Monaco, monospace; font-size: 14px; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #cbd5e1; padding: 10px 14px; }
        th { background: #f8fafc; }
        blockquote { border-left: 4px solid #38bdf8; margin: 0; padding: 8px 16px; background: #f0f9ff; color: #334155; }
    </style>
</head>
<body>
${preview.innerHTML}
</body>
</html>`;
            const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `document_${Date.now()}.html`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    // Real-time input handling
    const handleInput = debounce(() => {
        renderMarkdown();
        saveToStorage(editor.value);
    }, 150);

    editor.addEventListener('input', handleInput);

    // Initial Load: from LocalStorage or Sample
    const savedContent = localStorage.getItem(STORAGE_KEY);
    editor.value = savedContent !== null ? savedContent : SAMPLE_MARKDOWN;
    renderMarkdown();
});
