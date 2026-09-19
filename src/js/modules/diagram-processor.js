/**
 * Diagram Processor Module (Mermaid.js Integration)
 * Renders Mermaid code blocks into SVG diagrams dynamically.
 */

let isMermaidInitialized = false;

export function configureMermaid() {
    if (typeof mermaid !== 'undefined' && !isMermaidInitialized) {
        try {
            mermaid.initialize({
                startOnLoad: false,
                theme: 'dark',
                securityLevel: 'loose',
                flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'cardinal' },
                sequence: { useMaxWidth: true }
            });
            isMermaidInitialized = true;
        } catch (e) {
            console.warn('Failed to initialize Mermaid:', e);
        }
    }
}

/**
 * Scans the container for Mermaid code blocks and renders SVG diagrams.
 */
export async function renderMermaidDiagrams(containerElement) {
    if (!containerElement || typeof mermaid === 'undefined') return;

    configureMermaid();

    // Look for <pre><code class="language-mermaid"> or <div class="mermaid">
    const mermaidBlocks = containerElement.querySelectorAll('pre code.language-mermaid');

    let counter = 0;
    for (const codeEl of mermaidBlocks) {
        const rawCode = codeEl.textContent.trim();
        const preEl = codeEl.parentElement;
        if (!rawCode || !preEl) continue;

        const diagramId = `mermaid-diagram-${Date.now()}-${counter++}`;
        const wrapper = document.createElement('div');
        wrapper.className = 'mermaid-container';

        try {
            const { svg } = await mermaid.render(diagramId, rawCode);
            wrapper.innerHTML = svg;
            preEl.replaceWith(wrapper);
        } catch (error) {
            console.warn('Mermaid rendering error:', error);
            wrapper.innerHTML = `<div class="mermaid-error"><span class="error-title">⚠️ Lỗi vẽ biểu đồ Mermaid:</span><pre>${error.message || 'Cú pháp không hợp lệ'}</pre></div>`;
            preEl.replaceWith(wrapper);
        }
    }
}
