import test from 'node:test';
import assert from 'node:assert/strict';
import { parseMarkdown } from '../src/js/modules/parser.js';

test('parseMarkdown should return string if marked is not loaded in node environment', () => {
    const raw = '# Title';
    const result = parseMarkdown(raw);
    assert.equal(typeof result, 'string');
});
