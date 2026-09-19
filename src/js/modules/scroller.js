/**
 * Synchronized Scrolling Module
 */

export function setupSyncScroll(editor, preview) {
    let isEditorScrolling = false;
    let isPreviewScrolling = false;

    editor.addEventListener('scroll', () => {
        if (isPreviewScrolling) return;
        isEditorScrolling = true;
        const maxScroll = editor.scrollHeight - editor.clientHeight;
        if (maxScroll > 0) {
            const scrollPercentage = editor.scrollTop / maxScroll;
            preview.scrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight);
        }
        setTimeout(() => { isEditorScrolling = false; }, 50);
    });

    preview.addEventListener('scroll', () => {
        if (isEditorScrolling) return;
        isPreviewScrolling = true;
        const maxScroll = preview.scrollHeight - preview.clientHeight;
        if (maxScroll > 0) {
            const scrollPercentage = preview.scrollTop / maxScroll;
            editor.scrollTop = scrollPercentage * (editor.scrollHeight - editor.clientHeight);
        }
        setTimeout(() => { isPreviewScrolling = false; }, 50);
    });
}
