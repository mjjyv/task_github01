```markdown
---
aliases:
  - How to/Read and edit modes
  - Editing and formatting/Editing and previewing Markdown
  - Editing and formatting/Edit and previewing Markdown
  - Reading view
  - Live preview
  - Source mode
  - Editing view
  - Editing mode
permalink: edit-and-read
---
```

# Views and editing mode

Obsidian lets you control how you read and edit notes written in Markdown using *views* and *modes*.

- **Views** toggle between reading and editing your notes.
- **Modes** control how Markdown appears while you're editing.

> [!note] Note
> By default, Obsidian opens new tabs in editing mode. You can change this under **[[Settings]] → Editor → Default view for new tabs**.

## Reading view

*Reading view* shows your note without Markdown syntax, offering a clean, readable format for focused review.

To switch to *Reading view*:

- Click the view switcher ![[lucide-book-icon.svg#icon]] in the upper-right corner of the editor.
- Or click the interactive status icon ![[lucide-edit-3.svg#icon]] or ![[lucide-code-xml.svg#icon]] in the status bar and select **Reading view**.
- Or press `Ctrl+E` (`Cmd+E` on macOS).

> [!note] Note
> Enable **[[Settings]] → Appearance → Show tab title bar** to see the view switcher icon.  
> If that is disabled, turn on **[[Settings]] → Editor → Show editing mode in status bar** to toggle views from the status bar.

> [!tip] View side-by-side  
> To open a note in both *Editing* and *Reading view* at the same time, hold `Ctrl` (or `Cmd` on macOS) and click the view switcher.

## Editing view

*Editing view* lets you make changes to your note.

While in *Editing view*, the *Editing mode* defines, how Markdown is displayed. You can choose one of two *Editing modes*: *Live Preview* or *Source mode*.

### Live Preview

*Live Preview* shows formatted text inline while hiding most Markdown syntax. When your cursor enters formatted content, the underlying syntax becomes visible for editing.

To switch to *Live Preview*:

- Click the view switcher ![[lucide-edit-3.svg#icon]] in the upper-right corner of the editor.
- Or click the interactive status icon ![[lucide-book-icon.svg#icon]] or ![[lucide-code-xml.svg#icon]] in the status bar and select **Live Preview**.
- Or press `Ctrl+E` (`Cmd+E` on macOS).
- Or use the [[Command palette|command]] **Toggle Reading view**.

> [!note] Note
> By default, editing view is set to *Live Preview*. You can change this under **[[Settings]] → Editor → Default editing mode**.

> [!tip] In many cases, Live Preview can eliminate the need to switch to [[#Reading view|Reading view]].

### Source mode

*Source mode* displays all Markdown syntax exactly as written. Use it if you prefer plain text or need precise formatting control.

To switch to *Source mode*:

- Click the interactive status icon ![[lucide-book-icon.svg#icon]] or ![[lucide-edit-3.svg#icon]] in the status bar and select **Source mode**.

> [!note] Note
> By default, editing view is set to *Live Preview*. Change this to *Source mode* under **[[Settings]] → Editor → Default editing mode**.
> 
> To switch to *Source mode*, now additionally you can:
> - Click the view switcher ![[lucide-edit-3.svg#icon]] in the upper right corner of your note.
> - Or press `Ctrl+E` (`Cmd+E` on macOS).
> - Or use the [[Command palette|command]] **Toggle Reading view**.

> [!tip] Toggle *Editing mode*
> To toggle between *Live Preview* and *Source mode* quickly, you can set a [[Hotkeys|Hotkey]] for the [[Command palette|command]] **Toggle Live Preview/Source mode**.

---

```markdown
---
aliases:
  - Editing and formatting/Keyboard shortcuts for editing
permalink: editing-shortcuts
---
```

# Editing shortcuts

This page lists default keyboard shortcuts for navigating and editing text in Obsidian. These shortcuts are provided by your operating system or the framework Obsidian is built on, and cannot be customized within Obsidian.

For customizable keyboard shortcuts for Obsidian commands, see [[Hotkeys]].

## Windows and Linux shortcuts

### Common actions

| Action | Shortcut |
| --- | --- |
| Copy | `Ctrl+C` |
| Cut | `Ctrl+X` |
| Paste | `Ctrl+V` |
| Paste without formatting | `Ctrl+Shift+V` |
| Undo | `Ctrl+Z` |
| Redo | `Ctrl+Shift+Z` or `Ctrl+Y` |
| Copy paragraph | `Ctrl+C` (with no selected text) |
| Cut paragraph | `Ctrl+X` (with no selected text) |

### Text editing

| Action | Shortcut |
| --- | --- |
| Insert new line | `Enter` |
| Delete the previous character | `Backspace` |
| Delete the next character | `Delete` |
| Delete the previous word | `Ctrl+Backspace` |
| Delete the next word | `Ctrl+Delete` |
| Delete the current line | `Ctrl+Shift+K` (with no selected text) |

### Text navigation

| Action | Shortcut |
| --- | --- |
| Move the cursor one character | `Left/→` |
| Move the cursor to the beginning of the previous word | `Ctrl+←` |
| Move the cursor to the end of the next word | `Ctrl+→` |
| Move the cursor to the beginning of the current line | `Home` |
| Move the cursor to the end of the current line | `End` |
| Move the cursor to the previous line | `↑` |
| Move the cursor to the next line | `↓` |
| Move the cursor to the beginning of the note | `Ctrl+Home` |
| Move the cursor to the end of the note | `Ctrl+End` |
| Move the cursor up one page | `Page up` |
| Move the cursor down one page | `Page down` |

### Text selection

| Action | Shortcut |
| --- | --- |
| Simplify selection | `Escape` |
| Select all | `Ctrl+A` |
| Extend selection one character | `Shift+Left/→` |
| Extend selection to the beginning of the previous word | `Ctrl+Shift+←` |
| Extend selection to the end of the next word | `Ctrl+Shift+→` |
| Extend selection to the beginning of the current line | `Shift+Home` |
| Extend selection to the end of the current line | `Shift+End` |
| Extend selection to the beginning of the note | `Ctrl+Shift+Home` |
| Extend selection to the end of the note | `Ctrl+Shift+End` |
| Extend selection one page up | `Shift+Page up` |
| Extend selection one page down | `Shift+Page down` |

## macOS shortcuts

### Common actions

| Action | Shortcut |
| --- | --- |
| Copy | `Cmd+C` |
| Cut | `Cmd+X` |
| Paste | `Cmd+V` |
| Paste without formatting | `Cmd+Shift+V` |
| Undo | `Cmd+Z` |
| Redo | `Cmd+Shift+Z` |
| Copy paragraph | `Cmd+C` (with no selected text) |
| Cut paragraph | `Cmd+X` (with no selected text) |

### Text formatting

| Action | Shortcut |
| --- | --- |
| Bold text | `Cmd+B` |
| Italic text | `Cmd+I` |

### Text editing

| Action | Shortcut |
| --- | --- |
| Insert new line | `Enter` |
| Delete the previous character | `Backspace` |
| Delete the next character | `Delete` |
| Delete the previous word | `Option+Backspace` |
| Delete the next word | `Option+Delete` |
| Delete to the beginning of the current line | `Cmd+Backspace` |
| Delete to the end of the current line | `Cmd+Delete` |
| Delete the current line | `Cmd+Shift+K` (with no selected text) |

### Text navigation

| Action | Shortcut |
| --- | --- |
| Move the cursor one character | `Left/→` |
| Move the cursor to the beginning of the previous word | `Option+←` |
| Move the cursor to the end of the next word | `Option+→` |
| Move the cursor to the beginning of the current line | `Cmd+←` |
| Move the cursor to the end of the current line | `Cmd+→` |
| Move the cursor to the previous line | `↑` |
| Move the cursor to the next line | `↓` |
| Move the cursor to the beginning of the note | `Cmd+↑` |
| Move the cursor to the end of the note | `Cmd+↓` |
| Move the cursor up one page | `Fn+↑` |
| Move the cursor down one page | `Fn+↓` |

### Text selection

| Action | Shortcut |
| --- | --- |
| Simplify selection | `Escape` |
| Select all | `Cmd+A` |
| Extend selection one character | `Shift+Left/→` |
| Extend selection to the beginning of the previous word | `Option+Shift+←` |
| Extend selection to the end of the next word | `Option+Shift+→` |
| Extend selection to the beginning of the current line | `Cmd+Shift+←` |
| Extend selection to the end of the current line | `Cmd+Shift+→` |
| Extend selection to the beginning of the note | `Cmd+Shift+↑` |
| Extend selection to the end of the note | `Cmd+Shift+↓` |
| Extend selection one page up | `Ctrl+Shift+↑` |
| Extend selection one page down | `Ctrl+Shift+↓` |

---

```markdown
---
aliases:
  - How to/Embedding web pages
  - Iframe
  - Editing and formatting/Embedding web pages
permalink: embed-web-pages
---
```

# Embed web pages

Learn how to use the [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) HTML element to embed web pages in your notes.

To embed a web page, add the following in your note and replace the placeholder text with the URL of the web page you want to embed:

```html
<iframe src="INSERT YOUR URL HERE"></iframe>
```

> [!note] Note
> Some websites don't allow you to embed them. Instead, they may provide URLs that are meant for embedding them. If the website doesn't support embedding, try searching for the name of the website followed by "embed iframe". For example, "youtube embed iframe".

> [!tip] Tip
> If you're using [[Canvas]], you can embed a web page in a card. For more information, refer to [[Canvas#Add cards from web pages|Canvas > Add cards from web pages]].

## Embed a YouTube video

To embed a YouTube video, use the same Markdown syntax as [[Basic formatting syntax#External images|external images]]:

```md
![](https://www.youtube.com/watch?v=NnTvZWp5Q7o)
```

![](https://www.youtube.com/watch?v=NnTvZWp5Q7o)

## Embed a tweet

To embed a tweet, use the same Markdown syntax as [[Basic formatting syntax#External images|external images]]:

```md
![](https://twitter.com/obsdmd/status/1580548874246443010)
```

![](https://twitter.com/obsdmd/status/1580548874246443010)

---

```markdown
---
aliases:
  - Advanced topics/HTML sanitization
  - Editing and formatting/Using HTML
  - Editing and formatting/HTML content
description: Learn how to use HTML in Obsidian, including limitations with Markdown rendering, and HTML block requirements.
mobile: true
permalink: html
publish: true
---
```

# HTML content

Obsidian supports HTML to allow you to display your notes the way you want, or even [[Embed web pages|embed web pages]]. Allowing HTML inside your notes comes with risks. To prevent malicious code from doing harm, Obsidian *sanitizes* any HTML in your notes. 

> [!example] Example
> The `<script>` element normally lets you run JavaScript whenever it loads. If Obsidian didn't sanitize HTML, an attacker could convince you to paste a text containing JavaScript that extracts sensitive information from your computer and sends it back to them.

That said, since Markdown syntax does not support all forms of styling, using sanitized HTML can be yet another way of enhancing the quality of your notes. We've included some of the more common usages of HTML.

## HTML limitations

Obsidian has specific limitations when using HTML in your notes:

### No Markdown inside HTML

Obsidian does not render Markdown syntax inside HTML elements. This is an intentional design choice for performance optimization and to keep parser complexity low when managing large documents.

For example, this will not work as expected:

```md
<div>
This **will not** be bold and this `will not` be code.
</div>
```

### HTML blocks must be self-contained

HTML blocks must be complete and cannot contain blank lines within them. Blank lines will break the HTML block.

This will work:

```md
<table>
<tr>
<td>Content here</td>
</tr>
</table>
```

This will not work correctly:

```md
<table>

<tr>

<td>Content here</td>

</tr>

</table>
```

### When Markdown appears to work in HTML

Some inline HTML tags like `<span>` or `<a>` have limited functionality and may appear to render Markdown, but this is not actually what's happening. The Markdown is being processed outside of the HTML context.

For more details on how Obsidian handles Markdown, see [[Obsidian Flavored Markdown]].

## Common HTML usage

> [!info] More details on using `<iframe>` can be found in [[Embed web pages]].

### Comments

[[Basic formatting syntax#Comments|Markdown comments]] are the preferred way of adding hidden comments within your notes. However some methods of converting Markdown notes, such as [Pandoc](https://pandoc.org), have limited support of Markdown comments. In those instances, you can use a `<!-- HTML Comment -->` instead!

### Underline

If you need to quickly underline an item in your notes, you can use `<u>Example</u>` to create <u>your underlined text</u>.

### Span/Div

Span and div tags can be used to apply custom classes from a [[CSS snippets|CSS snippet]], or custom defined styling, onto a selected area of text. For example, using `<span style="font-family: cursive">your text</span>` can allow you to quickly <span style="font-family: cursive">change your font</span>.

## Strikethrough

Need to strike <s>some text</s>? Use `<s>this</s>` to strike it out.
