---
name: jui-formatted-text-editor
version: 1.0.0
kind: composed
status: active
summary: FormattedTextEditor control — a rich text editor with a configurable toolbar of formatting tools, holding a formatted text document.
---

# FormattedTextEditor (control)

## Purpose

Represents JUI's **FormattedTextEditor** (in the jui-text module): a rich text editor whose value is a
`FormattedText` document of paragraphs, headings, lists, quotes and the like, with inline formats such as bold and
links. Use it where people write formatted content: a description, a message, a policy, notes. Use
`jui-text-area-control` for plain text, and `jui-ftext` to show formatted text that isn't being edited. It draws only
the editor; the label, guidance and errors come from the enclosing `jui-control-form-cell` or `jui-control-field`.

## Anatomy

A toolbar of tools (`jui-editor-tool`) joined to an editing area beneath it, the two in one bordered box with
rounded corners. The editing area holds the document, or the placeholder while it is empty. Depending on `position`,
the toolbar sits apart above the area, below it, appears above it only while the editor has focus, or floats over
the selected text.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| placeholder | content | text | | Hint shown while the document is empty (JUI `placeholder`). |
| tools | variant | all, markdown | all | The tools in the toolbar, unless the `toolbar` slot gives its own: `all` is JUI's default set (`Tools.all()`): the inline formats, headings, paragraph, lists, table, equation and diagram; `markdown` is the set Markdown can carry: bold, italic and strikethrough, the two lists, and link. |
| position | variant | top, top-separate, top-hover, top-transparent, bottom, floating | top | Where the toolbar goes (JUI `position(Position.…)`): joined above the area; above it with a gap; above it only while focused; the same with the area's border shown only on hover; joined below the area; or floating over a selection, with no border at all. |
| height | variant | text | 500px | The control's minimum height as a CSS length (JUI `height(Length)`; JUI's default is 500px). The editing area fills it. |
| seamless | variant | boolean | | No borders and no focus ring, to sit flush inside a card or panel that draws the boundary (JUI `variant(Variant.SEAMLESS)`). |
| width | variant | text | | The control's width as a CSS length, such as `30em`. Without it the control fills its cell. `full` and `fit` work as on any element. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| tools | all | Long-form content where people need headings, tables and the like. |
| tools | markdown | Content stored or sent as Markdown, or short formatted text such as a comment or a description. |
| position | top | The standard editor in a form. |
| position | top-separate | Where the toolbar should read as a bar of its own. |
| position | top-hover, top-transparent | Content that is mostly read and sometimes edited in place: the toolbar appears only while editing. Leave room above the editor for it. |
| position | bottom | A message composer, where the tools sit beside the send action. |
| position | floating | A document page, where the text should look as it will when shown. |
| seamless | present | Inside a card or panel that already draws the border. |
| height | a CSS length | Size the editor to the expected length: `150px` for a comment, `300px` or more for a document. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Light grey border; with `top-hover` and `top-transparent` the toolbar is hidden, and with `top-transparent` the area's border too. |
| Interaction | hover | `:hover` | With `top-transparent`, the area's border shows. Otherwise as at rest. |
| Interaction | focus | `:focus-within` | A soft focus ring around the editor; with `top-hover` and `top-transparent` the toolbar appears above it. None with `seamless`. |
| Selection | collapsed | Default | With `floating`, no toolbar. |
| Selection | selection | `state="selection"` | With `floating`, the toolbar floats over the selected text, in a white card with a shadow. |
| Content | empty | No content | Placeholder shown. |
| Content | filled | Content in the default slot | The document shown. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | text | | Blocks in normal flow, compact spacing. | The document: `p`, `h1`–`h5`, `ul` and `ol` with `li`, `blockquote` and `pre`, with `strong`, `em`, `u`, `s`, `code`, `mark`, `sub`, `sup` and `a` inside them. |
| toolbar | jui-editor-tool | jui-editor-tool | A row of tools, wrapping. | A toolbar of your own, replacing the `tools` preset: a `jui-editor-tool` for each tool, with `separator` ones between groups. |

## Interactions

Clicking into the editing area focuses the editor, and clicking elsewhere takes the focus away, so that the
`top-hover` toolbar shows and hides.

| Trigger | Target | When | Effect | Value |
| --- | --- | --- | --- | --- |
| click | `.editor` |  | add-state | focus |
| click-outside |  |  | remove-state | focus |

## Behaviour

Typing edits the document and reports each change (**Control values**); the value is the whole `FormattedText`
document. The toolbar's tools apply to the selection or the caret and show which formats and block type apply where
the caret is (see `jui-editor-tool`). Keyboard shortcuts apply the common formats (Ctrl+B, Ctrl+I, Ctrl+U), and Enter
at the end of a heading continues with a paragraph. Pasted Markdown and rich text become formatted content. A link,
image or variable tool opens a panel beside its button to choose the target. With `floating`, the toolbar appears
over a selection when there is one and goes when it collapses.

## Content rules

Show representative content, with the formatting it would really carry, so the mockup shows how it reads. The
placeholder hints at what to write (`Describe the role…`), not the label. Offer only the tools the content needs:
a comment needs bold, italic, lists and links, not tables.

## Accessibility

The editing area is an editable region labelled by the enclosing field or cell; the tools are buttons named by their
tooltips. The keyboard shortcuts make the common formats available without the toolbar.

## Rules of use

- Label it through `jui-control-form-cell` or `jui-control-field`.
- Set `height` to the room the content needs; JUI's default of 500px suits a document, not a form field.
- With `top-hover` or `top-transparent`, leave room above the editor for the toolbar, which overlays what is there.
- JUI's editor has no read-only or disabled mode: to show content that can't be edited, use `jui-ftext`.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-formattededitor-border` | component | `#ddd` | Border colour. |
| `--jui-formattededitor-border-radius` | component | `6px` | Corner radius of the box (and of the toolbar and area when apart). |
| `--jui-formattededitor-border-toolbar-side`, `--jui-formattededitor-border-toolbar-top`, `--jui-formattededitor-border-toolbar-bottom` | component | `1px solid` the border colour | The toolbar's borders; `top-separate`, `top-hover` and `top-transparent` keep its bottom border, `seamless` removes them. |
| `--jui-formattededitor-border-toolbar-radius` | component | top corners rounded | The toolbar's corners: all rounded when apart from the area, bottom ones with `bottom`. |
| `--jui-formattededitor-border-toolbar-bg` | component | `transparent` | Toolbar background; white with `top-hover` and `top-transparent`. |
| `--jui-formattededitor-border-toolbar-hover-top` | component | `-40px` | How far above the area the `top-hover` toolbar sits. |
| `--jui-formattededitor-border-toolbar-shadow` | component | `none` | Toolbar shadow. |
| `--jui-formattededitor-border-editor-side`, `--jui-formattededitor-border-editor-top`, `--jui-formattededitor-border-editor-bottom` | component | `1px solid` the border colour, no top | The area's borders; it gains a top border when apart from the toolbar, and loses its bottom one with `bottom`. |
| `--jui-formattededitor-border-editor-radius` | component | bottom corners rounded | The area's corners. |
| `--jui-formattededitor-focus-shadow` | component | `0 0 0 2px` the focus offset colour | The focus ring. |
| `--jui-ftext-placeholder-color` | component | `#9aa0a6` | Placeholder colour. |
| `--jui-richtext-block-spacing` | component | `2px` | Space above and below each block. |
| `--jui-richtext-para-spacing` | component | `0.2em` | Space after a paragraph. |
| `--jui-richtext-list-indent` | component | `0em` | Extra indent of a list. |
| `--jui-richtext-line-height` | component | `inherit` | Line height of the text. |
| `--jui-richtext-heading-weight` | component | `500` | Heading weight. |
| `--jui-richtext-h1-size`, `--jui-richtext-h2-size`, `--jui-richtext-h3-size`, `--jui-richtext-h4-size`, `--jui-richtext-h5-size` | component | `1.8em` to `1.1em` | Heading sizes. |
| `--jui-richtext-quote-border`, `--jui-richtext-quote-bg`, `--jui-richtext-quote-color`, `--jui-richtext-quote-radius` | component | | Quotes: a grey bar on the left over a faint grey background. |
| `--jui-richtext-codeblock-bg`, `--jui-richtext-codeblock-radius` | component | | Code blocks: a grey panel. |
| `--jui-richtext-mono-font` | component | a monospace stack | Code block font. |
| `--jui-ctl-focus-offset` | semantic | | The focus ring colour. |
| `--jui-font-family-heading` | semantic | | Heading font. |

## Template

```html
<style data-if="width">:host { width: {{width}}; max-width: 100%; }</style>
<style>.root { min-height: {{height}}; }</style>
<div class="root">
  <div class="toolbar">
    <slot name="toolbar">
      <span class="preset" data-if="tools=all">
        <jui-editor-tool icon="bold" tooltip="Bold (Ctrl+B)"></jui-editor-tool>
        <jui-editor-tool icon="italic" tooltip="Italic (Ctrl+I)"></jui-editor-tool>
        <jui-editor-tool icon="underline" tooltip="Underline (Ctrl+U)"></jui-editor-tool>
        <jui-editor-tool icon="strikethrough" tooltip="Strikethrough"></jui-editor-tool>
        <jui-editor-tool icon="subscript" tooltip="Subscript"></jui-editor-tool>
        <jui-editor-tool icon="superscript" tooltip="Superscript"></jui-editor-tool>
        <jui-editor-tool icon="code" tooltip="Code"></jui-editor-tool>
        <jui-editor-tool icon="highlighter" tooltip="Highlight"></jui-editor-tool>
        <jui-editor-tool separator=""></jui-editor-tool>
        <jui-editor-tool label="H1" tooltip="Heading 1"></jui-editor-tool>
        <jui-editor-tool label="H2" tooltip="Heading 2"></jui-editor-tool>
        <jui-editor-tool label="H3" tooltip="Heading 3"></jui-editor-tool>
        <jui-editor-tool label="H4" tooltip="Heading 4"></jui-editor-tool>
        <jui-editor-tool label="H5" tooltip="Heading 5"></jui-editor-tool>
        <jui-editor-tool icon="pilcrow" tooltip="Paragraph"></jui-editor-tool>
        <jui-editor-tool separator=""></jui-editor-tool>
        <jui-editor-tool icon="list" tooltip="Bullet List"></jui-editor-tool>
        <jui-editor-tool icon="list-ordered" tooltip="Numbered List"></jui-editor-tool>
        <jui-editor-tool separator=""></jui-editor-tool>
        <jui-editor-tool icon="table" tooltip="Insert Table"></jui-editor-tool>
        <jui-editor-tool icon="sigma" tooltip="Insert Equation"></jui-editor-tool>
        <jui-editor-tool icon="workflow" tooltip="Insert Diagram"></jui-editor-tool>
      </span>
      <span class="preset" data-if="tools=markdown">
        <jui-editor-tool icon="bold" tooltip="Bold (Ctrl+B)"></jui-editor-tool>
        <jui-editor-tool icon="italic" tooltip="Italic (Ctrl+I)"></jui-editor-tool>
        <jui-editor-tool icon="strikethrough" tooltip="Strikethrough"></jui-editor-tool>
        <jui-editor-tool separator=""></jui-editor-tool>
        <jui-editor-tool icon="list" tooltip="Bullet List"></jui-editor-tool>
        <jui-editor-tool icon="list-ordered" tooltip="Numbered List"></jui-editor-tool>
        <jui-editor-tool separator=""></jui-editor-tool>
        <jui-editor-tool icon="link-2" tooltip="Link"></jui-editor-tool>
      </span>
    </slot>
  </div>
  <div class="editor">
    <div class="content"><slot></slot></div>
    <div class="placeholder" data-if="placeholder">{{placeholder}}</div>
  </div>
</div>
```

## Style

```css
:host {
  display: block;
  --jui-formattededitor-border: #ddd;
  --jui-formattededitor-border-radius: 6px;
  --jui-formattededitor-border-toolbar-side: 1px solid var(--jui-formattededitor-border);
  --jui-formattededitor-border-toolbar-top: 1px solid var(--jui-formattededitor-border);
  --jui-formattededitor-border-toolbar-bottom: 1px solid var(--jui-formattededitor-border);
  --jui-formattededitor-border-toolbar-radius: var(--jui-formattededitor-border-radius) var(--jui-formattededitor-border-radius) 0 0;
  --jui-formattededitor-border-toolbar-bg: transparent;
  --jui-formattededitor-border-toolbar-hover-top: -40px;
  --jui-formattededitor-border-toolbar-shadow: none;
  --jui-formattededitor-border-editor-side: 1px solid var(--jui-formattededitor-border);
  --jui-formattededitor-border-editor-top: none;
  --jui-formattededitor-border-editor-bottom: 1px solid var(--jui-formattededitor-border);
  --jui-formattededitor-border-editor-radius: 0 0 var(--jui-formattededitor-border-radius) var(--jui-formattededitor-border-radius);
  --jui-formattededitor-focus-shadow: 0 0 0 2px var(--jui-ctl-focus-offset);
  --jui-ftext-placeholder-color: #9aa0a6;
  --jui-richtext-block-spacing: 2px;
  --jui-richtext-para-spacing: 0.2em;
  --jui-richtext-list-indent: 0em;
  --jui-richtext-line-height: inherit;
  --jui-richtext-heading-weight: 500;
  --jui-richtext-h1-size: 1.8em;
  --jui-richtext-h2-size: 1.6em;
  --jui-richtext-h3-size: 1.4em;
  --jui-richtext-h4-size: 1.2em;
  --jui-richtext-h5-size: 1.1em;
  --jui-richtext-quote-border: rgba(135, 131, 120, 0.35);
  --jui-richtext-quote-bg: rgba(135, 131, 120, 0.06);
  --jui-richtext-quote-color: #5b6168;
  --jui-richtext-quote-radius: 6px;
  --jui-richtext-codeblock-bg: rgba(135, 131, 120, 0.15);
  --jui-richtext-codeblock-radius: 8px;
  --jui-richtext-mono-font: "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace;
}
:host([position="top-separate"]) {
  --jui-formattededitor-border-toolbar-radius: var(--jui-formattededitor-border-radius);
  --jui-formattededitor-border-editor-radius: var(--jui-formattededitor-border-radius);
  --jui-formattededitor-border-editor-top: 1px solid var(--jui-formattededitor-border);
}
:host([position="top-hover"]), :host([position="top-transparent"]) {
  --jui-formattededitor-border-toolbar-radius: var(--jui-formattededitor-border-radius);
  --jui-formattededitor-border-editor-radius: var(--jui-formattededitor-border-radius);
  --jui-formattededitor-border-editor-top: 1px solid var(--jui-formattededitor-border);
  --jui-formattededitor-border-toolbar-bg: #fff;
}
:host([position="bottom"]) {
  --jui-formattededitor-border-toolbar-radius: 0 0 var(--jui-formattededitor-border-radius) var(--jui-formattededitor-border-radius);
  --jui-formattededitor-border-editor-radius: var(--jui-formattededitor-border-radius) var(--jui-formattededitor-border-radius) 0 0;
  --jui-formattededitor-border-editor-top: 1px solid var(--jui-formattededitor-border);
  --jui-formattededitor-border-editor-bottom: none;
}
:host([seamless]) {
  --jui-formattededitor-border-toolbar-side: none;
  --jui-formattededitor-border-toolbar-top: none;
  --jui-formattededitor-border-toolbar-bottom: none;
  --jui-formattededitor-border-toolbar-radius: 0;
  --jui-formattededitor-border-editor-side: none;
  --jui-formattededitor-border-editor-top: none;
  --jui-formattededitor-border-editor-bottom: none;
  --jui-formattededitor-border-editor-radius: 0;
}

.root { position: relative; display: flex; flex-direction: column; box-sizing: border-box; border-radius: var(--jui-formattededitor-border-radius); }
:host([position="top-separate"]) .root { gap: 0.5em; }
:host([position="bottom"]) .root { flex-direction: column-reverse; }
:host(:focus-within:not([seamless])) .root, :host([state~="focus"]:not([seamless])) .root { box-shadow: var(--jui-formattededitor-focus-shadow); }

.toolbar {
  display: flex; flex-wrap: wrap; align-items: center; gap: 2px; padding: 4px 6px; flex-shrink: 0; overflow: hidden;
  border-left: var(--jui-formattededitor-border-toolbar-side);
  border-right: var(--jui-formattededitor-border-toolbar-side);
  border-top: var(--jui-formattededitor-border-toolbar-top);
  border-bottom: var(--jui-formattededitor-border-toolbar-bottom);
  border-radius: var(--jui-formattededitor-border-toolbar-radius);
  background: var(--jui-formattededitor-border-toolbar-bg);
  box-shadow: var(--jui-formattededitor-border-toolbar-shadow);
}
slot[name="toolbar"], .preset { display: contents; }
:host([position="top-hover"]) .toolbar, :host([position="top-transparent"]) .toolbar {
  position: absolute; top: var(--jui-formattededitor-border-toolbar-hover-top); left: 0; right: 0; box-sizing: border-box; display: none;
}
:host([position="top-hover"]:focus-within) .toolbar, :host([position="top-hover"][state~="focus"]) .toolbar,
:host([position="top-transparent"]:focus-within) .toolbar, :host([position="top-transparent"][state~="focus"]) .toolbar { display: flex; }
:host([position="floating"]) .toolbar {
  position: absolute; z-index: 1; top: 0.5em; left: 2em; max-width: calc(100% - 4em); display: none;
  border: 1px solid #e5e7eb; border-radius: var(--jui-formattededitor-border-radius); background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.06);
}
:host([position="floating"][state~="selection"]) .toolbar { display: flex; transform: translateY(-100%); }

.editor {
  position: relative; flex: 1; display: flex; flex-direction: column; border: 1px solid transparent;
  border-left: var(--jui-formattededitor-border-editor-side);
  border-right: var(--jui-formattededitor-border-editor-side);
  border-top: var(--jui-formattededitor-border-editor-top);
  border-bottom: var(--jui-formattededitor-border-editor-bottom);
  border-radius: var(--jui-formattededitor-border-editor-radius);
}
:host([position="top-transparent"]) .editor { border-color: transparent; }
:host([position="top-transparent"]:hover) .editor, :host([position="top-transparent"][state~="hover"]) .editor {
  border-left: var(--jui-formattededitor-border-editor-side);
  border-right: var(--jui-formattededitor-border-editor-side);
  border-top: var(--jui-formattededitor-border-editor-top);
  border-bottom: var(--jui-formattededitor-border-editor-bottom);
}
:host([position="floating"]) .editor { border: none; }
.content { flex: 1; min-height: 2em; padding: 0.5em; cursor: text; line-height: var(--jui-richtext-line-height); }
.placeholder { display: none; position: absolute; top: calc(0.5em + 2px); left: 0.5em; color: var(--jui-ftext-placeholder-color); pointer-events: none; }
:host(:not([data-filled~="default"])) .placeholder { display: block; }

::slotted(*) { margin: 0 !important; padding: var(--jui-richtext-block-spacing) 0 !important; min-height: 1em; white-space: pre-wrap; }
::slotted(p) { margin-bottom: var(--jui-richtext-para-spacing) !important; }
::slotted(ul), ::slotted(ol) { padding-left: calc(1.5em + var(--jui-richtext-list-indent)) !important; white-space: normal; }
::slotted(h1), ::slotted(h2), ::slotted(h3), ::slotted(h4), ::slotted(h5) { font-family: var(--jui-font-family-heading); font-weight: var(--jui-richtext-heading-weight) !important; color: inherit !important; border: none !important; }
::slotted(h1) { font-size: var(--jui-richtext-h1-size) !important; line-height: 1.25 !important; margin: 0.9em 0 0.3em !important; }
::slotted(h2) { font-size: var(--jui-richtext-h2-size) !important; line-height: 1.25 !important; margin: 0.8em 0 0.25em !important; }
::slotted(h3) { font-size: var(--jui-richtext-h3-size) !important; line-height: 1.3 !important; margin: 0.7em 0 0.2em !important; }
::slotted(h4) { font-size: var(--jui-richtext-h4-size) !important; line-height: 1.3 !important; margin: 0.7em 0 0.2em !important; }
::slotted(h5) { font-size: var(--jui-richtext-h5-size) !important; line-height: 1.3 !important; margin: 0.7em 0 0.2em !important; }
::slotted(:first-child) { margin-top: 0 !important; }
::slotted(blockquote) {
  margin: 0.7em 0 !important; padding: 0.55em 0.9em !important; border-left: 3px solid var(--jui-richtext-quote-border);
  border-radius: var(--jui-richtext-quote-radius); background: var(--jui-richtext-quote-bg); color: var(--jui-richtext-quote-color);
}
::slotted(pre) {
  margin: 0.75em 0 !important; padding: 0.85em 1em !important; overflow-x: auto; font-family: var(--jui-richtext-mono-font);
  background: var(--jui-richtext-codeblock-bg); border-radius: var(--jui-richtext-codeblock-radius);
}
```

## Example

```xml
<div layout="column" gap="6">
  <jui-control-field label="Description">
    <jui-formatted-text-editor tools="markdown" height="200px" placeholder="Describe the role"/>
  </jui-control-field>
  <jui-formatted-text-editor tools="markdown" height="200px" state="focus">
    <p>The successful candidate will <strong>lead the design</strong> of our hiring tools, working with:</p>
    <ul><li>product managers, on what to build next;</li><li>engineers, on <em>how</em> it is built.</li></ul>
    <p>See <a href="#">the team page</a> for more.</p>
  </jui-formatted-text-editor>
  <jui-formatted-text-editor height="260px">
    <h2>Leave policy</h2>
    <p>Annual leave accrues at <strong>four weeks</strong> a year and is taken by agreement with your manager.</p>
    <blockquote>Requests of more than two weeks need a month's notice.</blockquote>
    <ol><li>Submit the request.</li><li>Your manager approves it.</li></ol>
  </jui-formatted-text-editor>
  <div layout="grid" cols="2" gap="4">
    <jui-formatted-text-editor position="top-separate" tools="markdown" height="140px" placeholder="Top, separate"/>
    <jui-formatted-text-editor position="bottom" tools="markdown" height="140px" placeholder="Write a message"/>
  </div>
  <div layout="grid" cols="2" gap="4" mt="8">
    <jui-formatted-text-editor position="top-hover" tools="markdown" height="120px" state="focus">
      <p>The toolbar shows above while the editor has focus.</p>
    </jui-formatted-text-editor>
    <jui-formatted-text-editor position="floating" height="120px" state="selection">
      <p>Select some text and the toolbar floats over it.</p>
    </jui-formatted-text-editor>
  </div>
  <jui-formatted-text-editor height="120px">
    <jui-editor-tool slot="toolbar" icon="bold" tooltip="Bold (Ctrl+B)" active=""/>
    <jui-editor-tool slot="toolbar" icon="italic" tooltip="Italic (Ctrl+I)"/>
    <jui-editor-tool slot="toolbar" separator=""/>
    <jui-editor-tool slot="toolbar" label="H2" tooltip="Heading 2"/>
    <jui-editor-tool slot="toolbar" label="H3" tooltip="Heading 3"/>
    <jui-editor-tool slot="toolbar" separator=""/>
    <jui-editor-tool slot="toolbar" label="{}" tooltip="Variable"/>
    <p><strong>Dear</strong> candidate, thank you for applying.</p>
  </jui-formatted-text-editor>
</div>
```
