import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateStats } from '../src/js/modules/stats.js';

test('calculateStats should handle empty or null string', () => {
    assert.deepEqual(calculateStats(''), {
        chars: 0,
        words: 0,
        readingTimeMinutes: 0
    });

    assert.deepEqual(calculateStats(null), {
        chars: 0,
        words: 0,
        readingTimeMinutes: 0
    });
});

test('calculateStats should accurately count characters and words', () => {
    const text = 'Chào mừng bạn đến với Markdown Studio';
    const result = calculateStats(text);

    assert.equal(result.chars, text.length);
    assert.equal(result.words, 7);
    assert.equal(result.readingTimeMinutes, 1);
});

test('calculateStats should compute reading time correctly for longer text', () => {
    // 400 words should be ~2 minutes
    const wordsArray = new Array(400).fill('từ');
    const text = wordsArray.join(' ');
    const result = calculateStats(text);

    assert.equal(result.words, 400);
    assert.equal(result.readingTimeMinutes, 2);
});
