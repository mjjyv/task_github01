/**
 * Math Processor Module (KaTeX Integration)
 * Protects LaTeX math expressions ($inline$ and $$block$$) from Markdown parsers
 * using placeholder tokens, and renders them into high-fidelity math formulas.
 */

/**
 * Extracts math formulas and replaces them with unique placeholder tokens.
 * Runs BEFORE Markdown parsing.
 */
export function extractMathTokens(text) {
    if (!text) return { text: '', mathTokens: [] };

    const mathTokens = [];
    let tokenIndex = 0;

    // 1. Match Display / Block Math: $$ ... $$
    let processed = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
        const token = `%%KATEX_BLOCK_${tokenIndex}%%`;
        mathTokens.push({
            token,
            formula: formula.trim(),
            displayMode: true
        });
        tokenIndex++;
        return token;
    });

    // 2. Match Inline Math: $ ... $ (ignoring escaped \$ and empty $)
    processed = processed.replace(/(?<!\\)\$([^\$\n\r]+?)\$/g, (match, formula) => {
        const token = `%%KATEX_INLINE_${tokenIndex}%%`;
        mathTokens.push({
            token,
            formula: formula.trim(),
            displayMode: false
        });
        tokenIndex++;
        return token;
    });

    return {
        text: processed,
        mathTokens
    };
}

/**
 * Replaces placeholder tokens with rendered KaTeX HTML or fallback formatting.
 * Runs AFTER Markdown parsing.
 */
export function renderMathTokens(html, mathTokens) {
    if (!html || !mathTokens || mathTokens.length === 0) return html;

    let result = html;

    mathTokens.forEach(({ token, formula, displayMode }) => {
        let renderedMath = '';

        if (typeof katex !== 'undefined') {
            try {
                renderedMath = katex.renderToString(formula, {
                    displayMode,
                    throwOnError: false,
                    output: 'htmlAndMathml'
                });
            } catch (err) {
                console.warn('KaTeX render error:', err);
                renderedMath = displayMode 
                    ? `<div class="katex-error">$$${escapeMathHtml(formula)}$$</div>` 
                    : `<span class="katex-error">$${escapeMathHtml(formula)}$</span>`;
            }
        } else {
            // Fallback if KaTeX is not loaded
            renderedMath = displayMode
                ? `<div class="katex-fallback">$$${escapeMathHtml(formula)}$$</div>`
                : `<code class="katex-fallback">$${escapeMathHtml(formula)}$</code>`;
        }

        // Replace all occurrences of this token
        result = result.replaceAll(token, renderedMath);
    });

    return result;
}

function escapeMathHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
