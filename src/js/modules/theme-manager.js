/**
 * Theme Manager Module
 * Manages Obsidian Dark and Light themes, synchronizes CSS variables,
 * and updates Mermaid diagram themes.
 */

const THEME_STORAGE_KEY = 'obsidian_theme';

export function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
    applyTheme(savedTheme);
    return savedTheme;
}

export function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'light') {
        root.classList.add('theme-light');
        root.classList.remove('theme-dark');
    } else {
        root.classList.add('theme-dark');
        root.classList.remove('theme-light');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update Mermaid theme if loaded
    if (typeof mermaid !== 'undefined') {
        try {
            mermaid.initialize({
                startOnLoad: false,
                theme: theme === 'light' ? 'default' : 'dark',
                securityLevel: 'loose'
            });
        } catch (e) {}
    }
}

export function toggleTheme() {
    const current = getCurrentTheme();
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    return nextTheme;
}

export function getCurrentTheme() {
    return document.documentElement.classList.contains('theme-light') ? 'light' : 'dark';
}
