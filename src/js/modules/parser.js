/**
 * Markdown Parser Module
 * Integrates marked.js, DOMPurify, highlight.js, and Obsidian Flavored Markdown (OFM) pre-processing.
 */

import { preprocessObsidianMarkdown, renderPropertiesWidget } from './obsidian-syntax.js';

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
    if (!rawMarkdown) return '';

    try {
        // Step 1: Preprocess Obsidian Flavored Markdown (Frontmatter, Callouts, Highlights, Wikilinks, Tags)
        const { frontmatter, processedMarkdown } = preprocessObsidianMarkdown(rawMarkdown);

        // Step 2: Render Properties Widget if YAML Frontmatter is present
        const propertiesHtml = renderPropertiesWidget(frontmatter);

        // Step 3: Parse standard Markdown with marked.js
        let rawHtml = '';
        if (typeof marked !== 'undefined') {
            rawHtml = marked.parse(processedMarkdown);
        } else {
            rawHtml = processedMarkdown;
        }

        const combinedHtml = propertiesHtml + rawHtml;

        // Step 4: Sanitize HTML while preserving Obsidian elements (<mark>, <details>, <summary>, data-* attributes)
        if (typeof DOMPurify !== 'undefined') {
            return DOMPurify.sanitize(combinedHtml, {
                ADD_TAGS: ['input', 'mark', 'details', 'summary'],
                ADD_ATTR: ['type', 'checked', 'disabled', 'open', 'data-callout', 'data-tag', 'data-href', 'target']
            });
        }

        return combinedHtml;
    } catch (error) {
        return `<p style="color: red;">Lỗi hiển thị Markdown: ${error.message}</p>`;
    }
}
