```markdown
---
aliases:
  - How to/Working with tags
permalink: tags
---
```

# Tags

Tags are keywords or topics that help you quickly find the notes you want.

## Add a tag to a note

To create a tag, enter a hash symbol (`#`) in the editor, followed by a keyword. For example, `#meeting`.

You can also add tags using the `tags` [[Properties|property]]. Tags in YAML should always be formatted as a list:

```yaml
---
tags:
  - recipe
  - cooking
---
```

## Find notes using tags

To find notes using the [[Search]] plugin, use the `tag` [[Search#Search operators|search operator]] in your search term, for example `tag:#meeting`.

You can also search for tags by clicking on them in your notes.

To find notes using the [[Tags view]] plugin, select **Tags: Show tags** in the [[Command palette]], and then select the tag you want to search for.

## Nested tags

Nested tags define tag hierarchies that make it easier to find and filter related tags.

Create nested tags by using forward slashes (`/`) in the tag name, for example `#inbox/to-read` and `#inbox/processing`.

- In [[Search]], `tag:inbox` will match `#inbox` as well as all nested tags such as `#inbox/to-read`.  
- In the [[Tags view]], nested tags are shown as belonging to their parent tag.  
- In [[Introduction to Bases|Bases]], nested tags are recognized by the [[Functions#hasTag|`hasTag`]] function, so `file.hasTag("a")` will match both `#a` and `#a/b`.  

## Tag format

You can use any of the following characters in your tags:

- Alphabetical letters
- Numbers
- Underscore (`_`)
- Hyphen (`-`)
- Forward slash (`/`) for [[#Nested tags|Nested tags]]
- Commonly accepted Unicode characters, including emojis and other symbols

Tags must contain at least one non-numerical character. For example, #1984 isn't a valid tag, but #y1984 is.

Tags are case-insensitive. For example, #tag and #TAG will be treated as identical.

> [!note] Note
> Tags will display with the casing they are first created with in the [[Tags view]].
> For example, creating #Tag and then #TAG will display #Tag for both.

Tags can't contain blank spaces. To separate two or more words, you can instead use the following formats:

- #camelCase
- #PascalCase
- #snake_case
- #kebab-case

---

```markdown
---
aliases:
  - How to/Manage attachments
permalink: attachments
---
```

# Attachments

You can import [[Accepted file formats]], or *attachments*, to your vault, such as images, audio files, or PDFs. Attachments are regular files that you can access using your file system. Attachments can be [[Embed files|embedded]].

## Add an attachment

You can add attachments to your vault in multiple ways. Only [[Accepted file formats]] can be added.

> [!todo]- Copy and paste attachments
> You can paste attachments directly into your notes. Obsidian creates a file with the pasted content in the default attachment location and [[Embed files|embeds]] it in the note.

> [!todo]- Drag and drop attachments
> If you drag a file from your file system into an open editor, Obsidian copies the file to the default attachment location and [[Embed files|embeds]] it in the note.

> [!todo]- Download attachments to vault folder
> You can download an attachment directly to your vault, for example if you [[Import notes#More formats|import from your browser]], or from other apps that saves files directly to your file system.

## Change default attachment location

By default, attachments are added to the root of your vault.

You can change the default attachment location under **[[Settings]] → Files & Links → Default location for new attachments**.

- **Vault folder** adds the attachment to the root of your vault.
- **In the folder specified below** adds the attachment to a specified folder.
- **Same folder as current file** adds the attachment to the same folder as the note you added it to.
- **In subfolder under current folder** adds attachments to a specified folder next to the note you added the attachment to. If it doesn't exist, Obsidian creates it when you add an attachment.

---


```markdown
---
aliases:
  - How to/Use callouts
description: This page details how to use callouts to include additional content without breaking the flow of your notes.
mobile: true
permalink: callouts
publish: true
---
```

# Callouts

Use callouts to include additional content without breaking the flow of your notes.

To create a callout, add `[!info]` to the first line of a blockquote, where `info` is the *type identifier*. The type identifier determines how the callout looks and feels. To see all available types, refer to [[#Supported types]]. Callouts are also supported natively on [[Introduction to Obsidian Publish|Obsidian Publish]].

```markdown
> [!info] Here's a callout title
> Here's a callout block.
> It supports **Markdown**, [[Internal link|Wikilinks]], and [[Embed files|embeds]]!
> ![[Engelbart.jpg]]
```

> [!info] Here's a callout title
> Here's a callout block.
> It supports **Markdown**, [[Internal link|Wikilinks]], and [[Embed files|embeds]]!
> ![[Engelbart.jpg]]

You can insert a default `[!note]` callout using the `Insert callout` [[Command palette|command]]. The cursor automatically positions in the callout name field, letting you delete the default name and type a new one before editing the content.

To wrap existing content in a callout, select the text (including lists, code blocks, etc.) and run the `Insert callout` command. The selected content will be automatically enclosed in the callout.

In [[Views and editing mode#Live Preview|Live Preview]], you can also right-click the callout name to change the callout type.

### Change the title

By default, the title of the callout is its type identifier in title case. You can change it by adding text after the type identifier:

```markdown
> [!tip] Callouts can have custom titles
> Like this one.
```

> [!tip] Callouts can have custom titles
> Like this one.

You can even omit the body to create title-only callouts:

```markdown
> [!tip] Title-only callout
```

> [!tip] Title-only callout

### Foldable callouts

You can make a callout foldable by adding a plus (`+`) or a minus (`-`) directly after the type identifier.

A plus sign expands the callout by default, and a minus sign collapses it instead.

```markdown
> [!faq]- Are callouts foldable?
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed.
```

> [!faq]- Are callouts foldable?
> Yes! In a foldable callout, the contents are hidden when collapsed.

### Nested callouts

You can nest callouts in multiple levels.

```markdown
> [!question] Can callouts be nested?
> > [!todo] Yes!, they can.
> > > [!example]  You can even use multiple layers of nesting.
```

> [!question] Can callouts be nested?
> > [!todo] Yes!, they can.
> > > [!example]  You can even use multiple layers of nesting.

### Customize callouts

[[CSS snippets]] and [[Community plugins]] can define custom callouts, or even overwrite the default configuration.

To define a custom callout, create the following CSS block:

```css
.callout[data-callout="custom-question-type"] {
    --callout-color: #000000;
    --callout-icon: lucide-alert-circle;
}
```

The value of the `data-callout` attribute is the type identifier you want to use, for example `[!custom-question-type]`.

- `--callout-color` defines the background color. Any valid CSS color works, for example a hex code (`#000000`) or an `rgb()` value.
- `--callout-icon` can be an icon ID from [lucide.dev](https://lucide.dev), or an SVG element. 

> [!warning] Note about lucide icon versions
> Obsidian updates Lucide icons periodically. The current version included is shown below; use these or earlier icons in custom callouts.
> ![[Credits#^lucide]]

> [!tip] SVG icons
> Instead of using a Lucide icon, you can also use a SVG element as the callout icon.
> ```css
> --callout-icon: '<svg>...custom svg...</svg>';
> ```

> [!tip]- Further customization
> You're not limited to `--callout-color` and `--callout-icon`. Callouts support standard CSS selectors and properties, along with additional CSS variables for things like border and title styling.
> 
> For example, hide a callout's title:
> ```css
> .callout[data-callout="custom-question-type"] .callout-title {
>     display: none;
> }
> ```
> 
> Or adjust its border:
> ```css
> .callout[data-callout="custom-question-type"] {
>     --callout-border-width: 2px;
>     --callout-border-opacity: 0.25;
> }
> ```
> 
> See the full list of [callout CSS variables](https://docs.obsidian.md/Reference/CSS+variables/Editor/Callout) for more options.

### Supported types

You can use several callout types and aliases. Each type comes with a different background color and icon.

To use these default styles, replace `info` in the examples with any of these types, such as `[!tip]` or `[!warning]`. Callout types can also be changed by right-clicking a callout in Live Preview mode.

Unless you [[#Customize callouts|Customize callouts]], any unsupported type defaults to the `note` type. The type identifier is case-insensitive.

> [!note]
> Lorem ipsum dolor sit amet

---

> [!abstract]
> Lorem ipsum dolor sit amet

Aliases: `summary`, `tldr`

---

> [!info]
> Lorem ipsum dolor sit amet

---

> [!todo]
> Lorem ipsum dolor sit amet

---

> [!tip]
> Lorem ipsum dolor sit amet

Aliases: `hint`, `important`

---

> [!success]
> Lorem ipsum dolor sit amet

Aliases: `check`, `done`

---

> [!question]
> Lorem ipsum dolor sit amet

Aliases: `help`, `faq`

---

> [!warning]
> Lorem ipsum dolor sit amet

Aliases: `caution`, `attention`

---

> [!failure]
> Lorem ipsum dolor sit amet

Aliases: `fail`, `missing`

---

> [!danger]
> Lorem ipsum dolor sit amet

Alias: `error`

---

> [!bug]
> Lorem ipsum dolor sit amet

---

> [!example]
> Lorem ipsum dolor sit amet

---

> [!quote]
> Lorem ipsum dolor sit amet

Alias: `cite`

---

```markdown
---
aliases: Fold
description: Learn how to get a better overview of large notes by using folding to hide parts of the note
mobile: false
permalink: folding
publish: true
---
```

# Folding

Learn how to get a better overview of large notes by using *folding* to hide parts of the note. Folding is useful when creating outlines for your notes and when you want to focus on what you're working on at the moment.

You can fold headings and indented lists by hovering the mouse cursor over the section you want to fold, and then selecting the arrow on the left. Folded sections show an arrow regardless of if you hover it or not.

Folding is turned on by default. To turn off folding, open **[[Settings]] → Editor**, and then turn off **Fold indent** or **Fold heading**, depending on your needs.

To toggle all sections at the same time, use the following commands:

- To collapse all sections, open the [[Command palette]], and then select **Fold all headings and lists**.
- To expand all sections, open the [[Command palette]], and then select **Unfold all headings and lists**.

> [!tip] Tip
> If you prefer to fold using your keyboard, you can assign [[Hotkeys|hotkeys]] to the **Fold less** and **Fold more** commands.
> - **Fold less** unfolds the section at the text cursor.
> - **Fold more** folds the section or list that contains the text cursor.

---

```markdown
---
aliases:
  - How to/Working with multiple cursors
permalink: multiple-cursors
---
```

# Multiple cursors

Obsidian lets you edit text in multiple places at the same time using multiple cursors. You can add additional cursors by holding `Alt` (or `Option` on macOS) and selecting another position in the note.

To remove a selection along with all additional cursors, click anywhere in the note without holding a key. You can also remove the selection by pressing `Escape`.

## Rectangular selection

If you want to edit consecutive lines of text—for example, to turn paragraphs into list items—you can hold `Shift+Alt` (or `Shift+Option` on macOS) while dragging. You can also hold the middle mouse button while dragging.

---

```markdown
---
aliases:
  - front matter
  - Advanced topics/YAML front matter
  - metadata
  - property
  - frontmatter
cssclasses:
  - soft-embed
description: Properties allow you to organize information about a note. Properties contain structured data such as text, links, dates, checkboxes, and numbers.
mobile: false
permalink: properties
publish: true
---
```

# Properties

Properties allow you to organize information about a note. Properties contain structured data such as text, links, dates, checkboxes, and numbers. Properties can also be used in combination with [[Community plugins]] that can do useful things with your structured data.

## Add properties to a note

There are several ways to add a property to a note:

- Use the **Add file property** [[Command palette|command]].
- Use the **`Cmd/Ctrl+;`** [[Hotkeys|hotkey]].
- Choose **Add file property** from the **More actions** menu (brought up by the three dots icon or by right-clicking the tab).
- Type `---` at the very beginning of a file.

Once you add a property, a row will appear at the top of the file with two inputs: the property *name* and the property *value*.

For the name, you can choose anything you like. Obsidian provides several default properties: `tags`, `cssclasses`, and `aliases`.

Once you choose the property name, you can give it a value.

### Property types

In addition to a name and value, properties also have a *type*. A property's type determines what kind of values it can store and how Obsidian handles them. To change the type of a property, click the type icon next to the property name and select a different option. You can also manage property types using the [[Properties view]] core plugin.

Obsidian supports the following property types:

- **[[#Text|Text]]**
- **[[#List|List]]**
- **[[#Number|Number]]**
- **[[#Checkbox|Checkbox]]**
- **[[#Date|Date]]**
- **[[#Date & time|Date & time]]**
- **[[#Tags|Tags]]**

Once a property type is assigned to a property name, all properties with that name across your vault will use the same type.

## Advanced uses

### Search properties

Properties have their own [[Search|search syntax]] that you can use alongside other search terms and operators. [[Search#Search properties|See search syntax for properties]].

### Templates

You can add properties to [[Plugins/Templates|Templates]].

When you insert a template into the active note, all the properties from the template will be added to the note. Obsidian will also merge any properties that exist in your note with properties in the template. 

### Rename properties

You can rename a property by right-clicking it in the [[Properties view|All properties view]].

### Display modes

You can change how properties are displayed in your note by going to  **[[Settings]] → Editor → Properties in document**. The options are:

- **Visible** (default) – displays properties at the top of the note, if there are any.
- **Hidden** – hides properties, can still be displayed in the sidebar via [[Properties view]].
- **Source** – displays properties in plain text YAML format.

### CSS snippets

You can use [[CSS snippets]] to change the appearance of specific notes.

### Not supported

A few features are not currently supported in Obsidian:

- **Nested properties**: To view nested properties, we recommend using the [[Views and editing mode#Source mode|source mode]].
- **Bulk-editing properties**: For in-depth bulk editing outside of [[Properties view]], we recommend using bulk-editing tools like VSCode, scripts, and community plugins.
- **Markdown in properties**: This is an intentional limitation as properties are meant for small, atomic bits of information that are both human and machine readable.

## Hotkeys

### Add a property

| Action | Hotkey |
| --- | --- |
| Add new property | `Cmd + ;` |

### Navigate between properties

When a property is focused 

| Action | Hotkey |
| --- | --- |
| Focus next property | `Down arrow` or `Tab` |
| Focus previous property | `Up arrow` or `Shift+Tab` |
| Jump to editor | `Alt+Down arrow` |

### Select properties

| Action | Hotkey |
| --- | --- |
| Extend selection upwards | `Shift+Up arrow` |
| Extend selection downwards | `Shift+Down arrow` |
| Select all | `Cmd+A` |

### Edit properties

| Action | Hotkey |
| --- | --- |
| Edit property name | `Left arrow` |
| Edit property value | `Right arrow` |
| Focus property | `Escape` |
| Delete property | `Cmd+Backspace`<br><br>if any properties are selected, it will delete the selection instead. |
| Undo | `Cmd+Z` |
| Redo | `Cmd+Shift+Z` |

### Vim (advanced)

| Action | Hotkey |
| --- | --- |
| Move down | `j` |
| Move up | `k` |
| Focus key | `h` |
| Focus value | `l` |
| Focus value (Cursor at end) | `A` |
| Focus value (Cursor at beginning) | `i` |
| Create new property | `o` |

## Property format

Properties are stored in [YAML](https://yaml.org/) format at the top of the file. YAML is a popular format that is easy for both humans and computers to read.

Property names are separated from their values by a colon followed by a space:

```yaml
---
name: value
---
```

While the order of each name-value pair doesn't matter, each name must be unique within a note. For example, you can't have more than one `tags` property.

Values can be [[#Text|text]], [[#Number|numbers]], [[#Checkbox|checkboxes]], [[#Date|dates]], [[#Date & time|dates and times]], or [[#List|lists]].

### Text

Text properties contain a single line of text. Markdown formatting is not rendered in text properties. Hashtags do not create tags when used in text properties.

Text properties can contain URLs and [[Internal links]] using the `[[Link]]` syntax. [[Internal links]] in text properties must be surrounded with quotes. Obsidian will automatically add these if you manually enter internal links into properties, but be careful to add them when using templating plugins.

```yaml
---
title: A New Hope
link: "[[Episode IV]]"
url: https://www.example.com
---
```

### List

List properties contain multiple values. Each value in a list appears on its own line, preceded by a hyphen (-) and a space.

List values can contain text, numbers, and [[Internal links]]. When using [[Internal links]] in list properties, surround them with quotes.

```yaml
---
cast: 
  - Mark Hamill
  - Harrison Ford
  - Carrie Fisher
links:
  - "[[Link]]" 
  - "[[Link2]]"
---
```

### Number

Number type properties must always be a literal number, not an expression with operators. Integers and decimals are both allowed.

```yaml
---
year: 1977
pie: 3.14
---
```

### Checkbox

Checkbox properties are either `true` or `false`. In Live Preview, this displays as a checkbox.

```yaml
---
favorite: true
reply: false
last: # Indeterminate value; often treated as false
```

### Date

Date properties are stored in the following format: 

```yaml
---
date: 2020-08-21
---
```

The date picker follows your operating system's default date and time format. You can change it in your system preferences: 

> [!info]- Windows
> **[[Settings]] → Time & Language → Language & Region → Regional Format → Change Formats**
> 
> ![[Windows-OS-DateTime.png#interface]]

> [!info]- Mac OS
> **System Preferences → Language and Region → Date format**
> 
> ![[Mac-OS-DateTime.png|450]]

With the [[Daily notes]] plugin enabled, the date property will additionally function as an internal link to the corresponding daily note for that date.

![[Daily notes#^daily-notes-date]]

### Date & time

Date & time properties include both a date and a specific time, stored in the following format:

```yaml
---
time: 2020-08-21T10:30:00
---
```

Like [[#Date|date properties]], the date and time picker follows your operating system's default format. You can change it in your system preferences.

### Tags

Tags properties are a special property type used exclusively by the `tags` property. This property type cannot be assigned to other properties.

Tags properties are formatted as a list, with each tag on its own line preceded by a hyphen (-) and a space. 

```yaml
---
tags: 
  - journal
  - personal
  - draft
---
```

The `tags` property is one of Obsidian's [[#Default properties]]. See [[Tags]] for more information about using tags in Obsidian.

### JSON properties

While we recommend using YAML to define properties, you can also define properties using [JSON](https://www.json.org/):

```json
---
{
  "tags": ["journal"],
  "publish": false
}
---
```

Note that the JSON block will be read, interpreted, and saved as YAML.

## Default properties

Obsidian comes with a set of default properties:

| Property | Type | Description |
| --- | --- | --- |
| `tags` | List | See [[Editing and formatting/Tags|Tags]]. |
| `aliases` | List | See [[Aliases]]. |
| `cssclasses` | List | Allows you to style individual notes using [[CSS snippets]]. |

### Properties for Obsidian Publish

The following default properties can be used with [[Introduction to Obsidian Publish|Obsidian Publish]]:

| Property | Description |
| --- | --- |
| `publish` | See [[Publish your content#Automatically select data to publish]]. |
| `permalink` | See [[Permalinks]]. |
| `description` | See [[Social media link previews#Description]]. |
| `image` | See [[Social media link previews#Image]]. |
| `cover` | See [[Social media link previews#Image]]. |

### Deprecated properties

These properties were deprecated in Obsidian 1.4 and should be replaced with their modern equivalents. Support for them as [[#Default properties]] is dropped in Obsidian 1.9.

| Property | Description |
| --- | --- |
| `tag` | Deprecated alias for `tags`. |
| `alias` | Deprecated alias for `aliases`. |
| `cssclass` | Deprecated alias for `cssclasses`. |

> [!tip] If you need to convert your files in your vault to the [[#Default properties]] format, you can use [[Format converter]] to change your vault en masse.

---

All six files have been converted to Obsidian Markdown with appropriate frontmatter, internal links (`[[...]]`), callouts, code blocks, and tables. You can now save each block as a `.md` file in your vault.