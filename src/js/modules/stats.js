/**
 * Text Statistics Module
 * Calculates words, characters, and estimated reading time.
 */

import { APP_CONFIG } from '../config.js';

export function calculateStats(text) {
    const charCount = text ? text.length : 0;
    const words = text && text.trim() ? text.trim().split(/\s+/).length : 0;
    const readingTime = Math.ceil(words / (APP_CONFIG.WORDS_PER_MINUTE || 200));

    return {
        chars: charCount,
        words: words,
        readingTimeMinutes: readingTime
    };
}

export function updateStatsUI(elements, stats) {
    if (elements.words) elements.words.textContent = `${stats.words} từ`;
    if (elements.chars) elements.chars.textContent = `${stats.chars} ký tự`;
    if (elements.readingTime) elements.readingTime.textContent = `~${stats.readingTimeMinutes} phút đọc`;
}
