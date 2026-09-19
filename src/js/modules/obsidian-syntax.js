/**
 * Obsidian Flavored Markdown (OFM) Syntax Processor
 * Handles Frontmatter (YAML Properties), Callouts (foldable & typed), Highlights,
 * Wikilinks, Embeds, Tags, and Comments.
 */

// Mapping of Obsidian callout types to their display attributes
export const CALLOUT_TYPES = {
    note: { title: 'Note', icon: '📝', color: '#0284c7' },
    abstract: { title: 'Abstract', icon: '📋', color: '#06b6d4' },
    summary: { title: 'Summary', icon: '📋', color: '#06b6d4' },
    tldr: { title: 'TL;DR', icon: '📋', color: '#06b6d4' },
    info: { title: 'Info', icon: 'ℹ️', color: '#0284c7' },
    todo: { title: 'Todo', icon: '☑️', color: '#0284c7' },
    tip: { title: 'Tip', icon: '💡', color: '#10b981' },
    hint: { title: 'Hint', icon: '💡', color: '#10b981' },
    important: { title: 'Important', icon: '💡', color: '#10b981' },
    success: { title: 'Success', icon: '✅', color: '#10b981' },
    check: { title: 'Check', icon: '✅', color: '#10b981' },
    done: { title: 'Done', icon: '✅', color: '#10b981' },
    question: { title: 'Question', icon: '❓', color: '#eab308' },
    help: { title: 'Help', icon: '❓', color: '#eab308' },
    faq: { title: 'FAQ', icon: '❓', color: '#eab308' },
    warning: { title: 'Warning', icon: '⚠️', color: '#f97316' },
    caution: { title: 'Caution', icon: '⚠️', color: '#f97316' },
    attention: { title: 'Attention', icon: '⚠️', color: '#f97316' },
    failure: { title: 'Failure', icon: '❌', color: '#ef4444' },
    fail: { title: 'Fail', icon: '❌', color: '#ef4444' },
    missing: { title: 'Missing', icon: '❌', color: '#ef4444' },
    danger: { title: 'Danger', icon: '⚡', color: '#dc2626' },
    error: { title: 'Error', icon: '⚡', color: '#dc2626' },
    bug: { title: 'Bug', icon: '🐞', color: '#ef4444' },
    example: { title: 'Example', icon: '📌', color: '#a855f7' },
    quote: { title: 'Quote', icon: '❝', color: '#94a3b8' },
    cite: { title: 'Cite', icon: '❝', color: '#94a3b8' }
};

/**
 * 1. Extract YAML Frontmatter / Properties
 */
export function extractFrontmatter(markdown) {
    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
    const match = markdown.match(frontmatterRegex);

    if (!match) {
        return { frontmatter: null, content: markdown };
    }

    const rawYaml = match[1];
    const content = markdown.slice(match[0].length);
    const properties = {};

    let currentKey = null;
    let isList = false;

    rawYaml.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;

        // List item under current key
        if (line.startsWith('  - ') || line.startsWith('- ')) {
            const val = trimmed.replace(/^-\s*/, '').trim();
            if (currentKey) {
                if (!Array.isArray(properties[currentKey])) {
                    properties[currentKey] = [];
                }
                properties[currentKey].push(val);
            }
            return;
        }

        // Key-value pair
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
            const key = line.slice(0, colonIndex).trim();
            const value = line.slice(colonIndex + 1).trim();

            currentKey = key;
            if (value === '') {
                // Potential list coming up
                properties[key] = [];
                isList = true;
            } else {
                properties[key] = value.replace(/^["']|["']$/g, '');
                isList = false;
            }
        }
    });

    return { frontmatter: properties, content };
}

/**
 * 2. Render Frontmatter as Obsidian Properties widget
 */
export function renderPropertiesWidget(properties) {
    if (!properties || Object.keys(properties).length === 0) return '';

    const entries = Object.entries(properties);
    let rowsHtml = '';

    entries.forEach(([key, val]) => {
        let displayVal = '';
        if (Array.isArray(val)) {
            displayVal = val.map(item => `<span class="property-pill">${escapeHtml(item)}</span>`).join(' ');
        } else {
            displayVal = `<span class="property-val">${escapeHtml(String(val))}</span>`;
        }

        rowsHtml += `
            <div class="property-row">
                <span class="property-key">${escapeHtml(key)}</span>
                <div class="property-value-container">${displayVal}</div>
            </div>
        `;
    });

    return `
        <div class="obsidian-properties">
            <div class="properties-header">
                <span class="properties-icon">🏷️</span>
                <span class="properties-title">Thuộc tính (Properties)</span>
            </div>
            <div class="properties-body">
                ${rowsHtml}
            </div>
        </div>
    `;
}

/**
 * 3. Process Obsidian Comments: %% text %%
 */
export function processComments(markdown) {
    return markdown.replace(/%%[\s\S]*?%%/g, '');
}

/**
 * 4. Process Obsidian Highlights: ==text==
 */
export function processHighlights(markdown) {
    return markdown.replace(/==([^=\n\r]+)==/g, '<mark class="obsidian-highlight">$1</mark>');
}

/**
 * 5. Process Obsidian Wikilinks: [[Target]] and [[Target|Alias]]
 */
export function processWikilinks(markdown) {
    // Exclude image embeds which start with ![[
    return markdown.replace(/(?<!\!)\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (match, target, alias) => {
        const displayText = alias ? alias.trim() : target.trim();
        const targetClean = target.trim();
        return `<span class="internal-link" data-href="${escapeHtml(targetClean)}" title="Mở liên kết nội bộ: ${escapeHtml(targetClean)}">${escapeHtml(displayText)}</span>`;
    });
}

/**
 * 6. Process Obsidian Embeds: ![[image.png]] and ![[image.png|300]]
 */
export function processEmbeds(markdown) {
    return markdown.replace(/\!\[\[([^\]|]+)(?:\|(\d+))?\]\]/g, (match, target, width) => {
        const file = target.trim();
        const widthAttr = width ? ` style="max-width: ${width}px; width: 100%;"` : '';
        // If image extension
        if (/\.(png|jpe?g|gif|svg|webp)$/i.test(file)) {
            return `<div class="obsidian-embed-image"><img src="${escapeHtml(file)}" alt="${escapeHtml(file)}"${widthAttr} loading="lazy" /></div>`;
        }
        // Generic file transclusion
        return `<div class="obsidian-embed-file"><span class="embed-icon">📄</span><span class="embed-title">${escapeHtml(file)}</span></div>`;
    });
}

/**
 * 7. Process Obsidian Tags: #tag and #nested/tag
 */
export function processTags(markdown) {
    // Tag must start with # followed by letters/numbers/underscores/dashes/slashes
    // and must contain at least one non-numeric character
    return markdown.replace(/(^|\s)#([a-zA-Z0-9_\-\/]+)/g, (match, prefix, tag) => {
        if (/^\d+$/.test(tag)) {
            // All numbers is not a valid tag in Obsidian
            return match;
        }
        return `${prefix}<a class="tag" href="#tag-${escapeHtml(tag)}" data-tag="${escapeHtml(tag)}">#${escapeHtml(tag)}</a>`;
    });
}

/**
 * 8. Process Obsidian Callouts:
 * > [!type]+ Custom Title
 * > Content here
 */
export function processCallouts(markdown) {
    // Regex matches blockquote blocks starting with > [!type]
    const calloutBlockRegex = /(^> \[!([a-zA-Z0-9_\-]+)\]([+\-])?(?:[ \t]+([^\r\n]*))?\r?\n(?:> ?[^\r\n]*\r?\n?)*)/gm;

    return markdown.replace(calloutBlockRegex, (block) => {
        const lines = block.split(/\r?\n/);
        const firstLine = lines[0];

        const match = firstLine.match(/^> \[!([a-zA-Z0-9_\-]+)\]([+\-])?(?:[ \t]+(.*))?$/);
        if (!match) return block;

        const rawType = match[1].toLowerCase();
        const foldState = match[2]; // '+' or '-' or undefined
        const customTitle = match[3] ? match[3].trim() : '';

        const typeInfo = CALLOUT_TYPES[rawType] || {
            title: rawType.charAt(0).toUpperCase() + rawType.slice(1),
            icon: '📝',
            color: '#0284c7'
        };

        const displayTitle = customTitle || typeInfo.title;

        // Collect body content
        const bodyLines = lines.slice(1).map(line => {
            return line.replace(/^> ?/, '');
        });
        const rawBody = bodyLines.join('\n').trim();

        const isFoldable = foldState === '+' || foldState === '-';
        const isOpen = foldState === '+' || !foldState;

        if (isFoldable) {
            return `
<details class="callout callout-${escapeHtml(rawType)}" data-callout="${escapeHtml(rawType)}" ${isOpen ? 'open' : ''} style="--callout-accent: ${typeInfo.color};">
<summary class="callout-title">
<span class="callout-icon">${typeInfo.icon}</span>
<span class="callout-title-inner">${escapeHtml(displayTitle)}</span>
<span class="callout-fold-indicator"></span>
</summary>
<div class="callout-content">

${rawBody}

</div>
</details>
`;
        }

        return `
<div class="callout callout-${escapeHtml(rawType)}" data-callout="${escapeHtml(rawType)}" style="--callout-accent: ${typeInfo.color};">
<div class="callout-title">
<span class="callout-icon">${typeInfo.icon}</span>
<span class="callout-title-inner">${escapeHtml(displayTitle)}</span>
</div>
<div class="callout-content">

${rawBody}

</div>
</div>
`;
    });
}

/**
 * Master OFM Pre-Processor (Runs BEFORE marked.js)
 */
export function preprocessObsidianMarkdown(markdown) {
    // Step 1: Extract YAML Frontmatter
    const { frontmatter, content } = extractFrontmatter(markdown);

    // Step 2: Strip comments
    let processed = processComments(content);

    // Step 3: Handle Highlights ==text==
    processed = processHighlights(processed);

    // Step 4: Handle Embeds ![[...]]
    processed = processEmbeds(processed);

    // Step 5: Handle Wikilinks [[...]]
    processed = processWikilinks(processed);

    // Step 6: Handle Tags #tag
    processed = processTags(processed);

    // Step 7: Handle Callouts > [!type]
    processed = processCallouts(processed);

    return {
        frontmatter,
        processedMarkdown: processed
    };
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
