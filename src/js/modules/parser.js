/**
 * Markdown Parser Module
 * Integrates marked.js, DOMPurify, highlight.js, Obsidian Flavored Markdown (OFM),
 * and LaTeX KaTeX math processing.
 */

import { preprocessObsidianMarkdown, renderPropertiesWidget } from './obsidian-syntax.js';
import { extractMathTokens, renderMathTokens } from './math-processor.js';

export function configureParser() {
    if (typeof marked !== 'undefined') {
        marked.setOptions({
            gfm: true,
            breaks: true,
            headerIds: true,
            highlight: function(code, lang) {
                // Don't highlight mermaid here, let mermaid.js handle it
                if (lang === 'mermaid') {
                    return code;
                }
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
        // Step 1: Protect Math formulas ($...$ and $$...$$) using KaTeX tokens
        const { text: textWithMathTokens, mathTokens } = extractMathTokens(rawMarkdown);

        const innerParse = (text) => {
            if (typeof marked !== 'undefined') {
                return marked.parse(text);
            }
            return text;
        };

        // Step 2: Preprocess Obsidian Flavored Markdown (Frontmatter, Callouts, Highlights, Wikilinks, Tags)
        const { frontmatter, processedMarkdown } = preprocessObsidianMarkdown(textWithMathTokens, innerParse);

        // Step 3: Render Properties Widget if YAML Frontmatter is present
        const propertiesHtml = renderPropertiesWidget(frontmatter);

        // Step 4: Parse standard Markdown with marked.js
        let rawHtml = '';
        if (typeof marked !== 'undefined') {
            rawHtml = marked.parse(processedMarkdown);
        } else {
            rawHtml = processedMarkdown;
        }

        const combinedHtml = propertiesHtml + rawHtml;

        // Step 5: Sanitize HTML while preserving Obsidian elements, Math tokens & interactive inputs
        let sanitizedHtml = combinedHtml;
        if (typeof DOMPurify !== 'undefined') {
            sanitizedHtml = DOMPurify.sanitize(combinedHtml, {
                ADD_TAGS: ['input', 'mark', 'details', 'summary'],
                ADD_ATTR: ['type', 'checked', 'disabled', 'open', 'data-callout', 'data-tag', 'data-href', 'data-line', 'target', 'style']
            });
        }

        // Step 6: Render KaTeX math expressions into sanitized HTML
        const finalHtml = renderMathTokens(sanitizedHtml, mathTokens);

        return finalHtml;
    } catch (error) {
        return `<p style="color: red;">Lỗi hiển thị Markdown: ${error.message}</p>`;
    }
}
