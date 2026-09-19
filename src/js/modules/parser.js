/**
 * Markdown Parser Module
 * Handles marked.js configuration, code syntax highlighting, and XSS sanitization.
 */

export function configureParser() {
    if (typeof marked !== 'undefined') {
        marked.setOptions({
            gfm: true,
            breaks: true,
            headerIds: true,
            highlight: function(code, lang) {
                if (typeof hljs !== 'undefined' && lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(code, { language: lang }).value;
                    } catch (err) {}
                }
                if (typeof hljs !== 'undefined') {
                    return hljs.highlightAuto(code).value;
                }
                return code;
            }
        });
    }
}

export function parseMarkdown(rawMarkdown) {
    if (typeof marked === 'undefined') {
        return rawMarkdown;
    }
    
    try {
        const rawHtml = marked.parse(rawMarkdown);
        if (typeof DOMPurify !== 'undefined') {
            return DOMPurify.sanitize(rawHtml, {
                ADD_TAGS: ['input'],
                ADD_ATTR: ['type', 'checked', 'disabled']
            });
        }
        return rawHtml;
    } catch (error) {
        return `<p style="color: red;">Lỗi hiển thị Markdown: ${error.message}</p>`;
    }
}
