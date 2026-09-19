/**
 * Toolbar & Text Formatting Module
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
