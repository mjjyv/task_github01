/**
 * Exporter Module
 * Handles exporting Markdown, standalone HTML, and Clipboard operations.
 */

export async function copyHtmlToClipboard(htmlContent) {
    try {
        await navigator.clipboard.writeText(htmlContent);
        return true;
    } catch (err) {
        console.error('Không thể copy vào clipboard:', err);
        return false;
    }
}

export function exportMarkdownFile(content, filename = `document_${Date.now()}.md`) {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    downloadBlob(blob, filename);
}

export function exportHtmlFile(htmlBody, filename = `document_${Date.now()}.html`) {
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
${htmlBody}
</body>
</html>`;
    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    downloadBlob(blob, filename);
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
