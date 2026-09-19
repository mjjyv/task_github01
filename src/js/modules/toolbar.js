/**
 * Toolbar & Text Formatting Module
 * Extended with Obsidian Flavored Markdown (Highlight, Callout, Wikilink, Frontmatter, Math, Mermaid)
 */

export function applyFormatting(editor, action) {
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
        case 'highlight':
            replacement = `==${selectedText || 'văn bản tô sáng'}==`;
            break;
        case 'wikilink':
            replacement = `[[${selectedText || 'Tên ghi chú'}]]`;
            break;
        case 'callout':
            replacement = `> [!tip] ${selectedText || 'Mẹo hay'}\n> Nội dung callout tại đây...\n`;
            break;
        case 'math':
            if (selectedText.includes('\n') || !selectedText) {
                replacement = `$$\n${selectedText || '\\begin{vmatrix}a & b\\\\\nc & d\n\\end{vmatrix}=ad-bc'}\n$$\n`;
            } else {
                replacement = `$${selectedText}$`;
            }
            break;
        case 'mermaid':
            replacement = `\`\`\`mermaid\ngraph TD\n    A[Bắt đầu] --> B{Điều kiện}\n    B -->|Đúng| C[Thành công]\n    B -->|Sai| D[Thử lại]\n\`\`\`\n`;
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
}
