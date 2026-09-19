/**
 * Outline (Table of Contents - TOC) Module
 * Extracts headings (H1-H6) from Markdown text, builds a hierarchical navigation tree,
 * and enables smooth scrolling with scroll-spy tracking.
 */

export function extractHeadings(markdown) {
    if (!markdown) return [];

    const lines = markdown.split(/\r?\n/);
    const headings = [];
    let inCodeBlock = false;

    lines.forEach((line, index) => {
        // Toggle code block state
        if (line.trim().startsWith('```') || line.trim().startsWith('~~~')) {
            inCodeBlock = !inCodeBlock;
            return;
        }

        if (inCodeBlock) return;

        // Match ATX headings: # H1, ## H2, etc.
        const match = line.match(/^(#{1,6})\s+(.+)$/);
        if (match) {
            const level = match[1].length;
            const rawText = match[2].trim();
            // Clean markdown syntax from heading text for display
            let cleanText = rawText
                .replace(/\*\*(.*?)\*\*/g, '$1')
                .replace(/__(.*?)__/g, '$1')
                .replace(/\*(.*?)\*/g, '$1')
                .replace(/_(.*?)_/g, '$1')
                .replace(/==(.*?)==/g, '$1')
                .replace(/\[\[(.*?)(?:\|(.*?))?\]\]/g, (m, target, alias) => alias ? alias.trim() : target.trim())
                .replace(/`(.*?)`/g, '$1');

            const slug = generateSlug(cleanText, index);

            headings.push({
                level,
                text: cleanText,
                slug,
                lineNumber: index
            });
        }
    });

    return headings;
}

export function generateSlug(text, index) {
    const base = text
        .toLowerCase()
        .replace(/[^\w\s\u00C0-\u1EF9-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
    return base ? `${base}-${index}` : `heading-${index}`;
}

/**
 * Renders the Outline navigation list in the Outline sidebar panel.
 */
export function renderOutlineUI(outlineContainer, headings, onHeadingClick) {
    if (!outlineContainer) return;

    outlineContainer.innerHTML = '';

    if (headings.length === 0) {
        outlineContainer.innerHTML = '<div class="outline-empty">Chưa có đề mục (H1-H6) trong tài liệu</div>';
        return;
    }

    const list = document.createElement('ul');
    list.className = 'outline-list';

    headings.forEach(h => {
        const item = document.createElement('li');
        item.className = `outline-item outline-h${h.level}`;
        item.dataset.slug = h.slug;
        item.textContent = h.text;

        item.addEventListener('click', () => {
            if (typeof onHeadingClick === 'function') {
                onHeadingClick(h);
            }
        });

        list.appendChild(item);
    });

    outlineContainer.appendChild(list);
}
