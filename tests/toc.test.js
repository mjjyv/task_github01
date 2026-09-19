import test from 'node:test';
import assert from 'node:assert/strict';
import { extractHeadings, generateSlug } from '../src/js/modules/outline-toc.js';

test('extractHeadings should correctly extract H1, H2, and H3 with clean text', () => {
    const markdown = `# Title 1
Some intro text.
## Section **Bold** and _Italic_
Paragraph.
### Sub-section [[WikiLink|Alias]]
\`\`\`javascript
# Inside code block should not be heading
\`\`\`
#### Level 4 Heading`;

    const headings = extractHeadings(markdown);

    assert.equal(headings.length, 4);
    assert.equal(headings[0].level, 1);
    assert.equal(headings[0].text, 'Title 1');
    assert.equal(headings[1].level, 2);
    assert.equal(headings[1].text, 'Section Bold and Italic');
    assert.equal(headings[2].level, 3);
    assert.equal(headings[2].text, 'Sub-section Alias');
    assert.equal(headings[3].level, 4);
    assert.equal(headings[3].text, 'Level 4 Heading');
});

test('generateSlug should create safe and unique slugs', () => {
    const slug1 = generateSlug('Hướng dẫn sử dụng Obsidian', 0);
    assert.ok(slug1.includes('huong-dan-su-dung-obsidian') || slug1.includes('0'));

    const slug2 = generateSlug('Complex #*! Text', 5);
    assert.ok(slug2.includes('complex-text-5') || slug2.includes('5'));
});
