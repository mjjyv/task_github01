import test from 'node:test';
import assert from 'node:assert/strict';
import { extractMathTokens, renderMathTokens } from '../src/js/modules/math-processor.js';

test('extractMathTokens should correctly separate display math block $$...$$', () => {
    const input = `Here is a matrix:
$$
\\begin{vmatrix}a & b\\\\
c & d
\\end{vmatrix}=ad-bc
$$
And some text.`;

    const { text, mathTokens } = extractMathTokens(input);

    assert.equal(mathTokens.length, 1);
    assert.equal(mathTokens[0].displayMode, true);
    assert.ok(mathTokens[0].formula.includes('begin{vmatrix}'));
    assert.ok(text.includes('%%KATEX_BLOCK_0%%'));
    assert.ok(!text.includes('\\begin{vmatrix}'));
});

test('extractMathTokens should correctly separate inline math $...$', () => {
    const input = 'This is an inline equation $E = mc^2$ and $e^{i\\pi} + 1 = 0$.';
    const { text, mathTokens } = extractMathTokens(input);

    assert.equal(mathTokens.length, 2);
    assert.equal(mathTokens[0].displayMode, false);
    assert.equal(mathTokens[0].formula, 'E = mc^2');
    assert.equal(mathTokens[1].formula, 'e^{i\\pi} + 1 = 0');
    assert.ok(text.includes('%%KATEX_INLINE_0%%'));
    assert.ok(text.includes('%%KATEX_INLINE_1%%'));
});

test('renderMathTokens should fallback cleanly when katex is not loaded in test environment', () => {
    const input = '<p>Equation: %%KATEX_INLINE_0%%</p>';
    const tokens = [{
        token: '%%KATEX_INLINE_0%%',
        formula: 'x = 10',
        displayMode: false
    }];

    const output = renderMathTokens(input, tokens);
    assert.ok(output.includes('$x = 10$'));
    assert.ok(!output.includes('%%KATEX_INLINE_0%%'));
});
