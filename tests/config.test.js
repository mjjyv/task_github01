import test from 'node:test';
import assert from 'node:assert/strict';
import { APP_CONFIG } from '../src/js/config.js';

test('APP_CONFIG should have proper constants and sample text', () => {
    assert.ok(APP_CONFIG.STORAGE_KEY);
    assert.equal(typeof APP_CONFIG.STORAGE_KEY, 'string');
    assert.equal(APP_CONFIG.WORDS_PER_MINUTE, 200);
    assert.ok(APP_CONFIG.DEFAULT_SAMPLE.includes('Obsidian'));
});
