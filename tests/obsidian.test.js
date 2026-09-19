import test from 'node:test';
import assert from 'node:assert/strict';
import { 
    extractFrontmatter, 
    renderPropertiesWidget, 
    processComments, 
    processHighlights, 
    processWikilinks, 
    processTags, 
    processCallouts,
    preprocessObsidianMarkdown 
} from '../src/js/modules/obsidian-syntax.js';

test('extractFrontmatter should parse YAML properties correctly', () => {
    const md = `---
title: My Obsidian Note
tags:
  - note
  - test
status: draft
---
# Main Content`;

    const { frontmatter, content } = extractFrontmatter(md);
    assert.ok(frontmatter);
    assert.equal(frontmatter.title, 'My Obsidian Note');
    assert.deepEqual(frontmatter.tags, ['note', 'test']);
    assert.equal(frontmatter.status, 'draft');
    assert.equal(content.trim(), '# Main Content');
});

test('processComments should remove Obsidian %% comments %%', () => {
    const input = 'Visible content %% secret comment %% and more visible';
    const output = processComments(input);
    assert.equal(output, 'Visible content  and more visible');
});

test('processHighlights should transform ==text== to mark tag', () => {
    const input = 'This is ==highlighted text== in Obsidian.';
    const output = processHighlights(input);
    assert.equal(output, 'This is <mark class="obsidian-highlight">highlighted text</mark> in Obsidian.');
});

test('processWikilinks should handle plain links and links with aliases', () => {
    const input = 'Check [[Obsidian Note]] and [[Obsidian Note|Custom Title]]';
    const output = processWikilinks(input);
    assert.ok(output.includes('data-href="Obsidian Note"'));
    assert.ok(output.includes('Obsidian Note'));
    assert.ok(output.includes('Custom Title'));
});

test('processTags should recognize standard and nested tags', () => {
    const input = 'Tags: #obsidian #project/2026 but not #1984 number';
    const output = processTags(input);
    assert.ok(output.includes('data-tag="obsidian"'));
    assert.ok(output.includes('data-tag="project/2026"'));
    assert.ok(!output.includes('data-tag="1984"')); // numbers only are ignored
});

test('processCallouts should transform callouts with foldable state', () => {
    const input = `> [!tip]- Foldable Tip
> Hidden tip body`;
    const output = processCallouts(input);
    assert.ok(output.includes('<details class="callout callout-tip"'));
    assert.ok(output.includes('Foldable Tip'));
    assert.ok(output.includes('Hidden tip body'));
});
