---
name: jui-ftext
version: 1.0.0
kind: elemental
status: active
summary: FText fragment — shows a formatted text document read-only, as the formatted text editor presents it, in compact or document spacing.
---

# FText (fragment)

## Purpose

Represents JUI's **FText** fragment (in the jui-text module): a `FormattedText` document shown read-only, such as a
description, a policy or a message written with `jui-formatted-text-editor`. It presents text exactly as the editor
does, so content looks the same written and read. Use `jui-para` for plain text, which never interprets formatting.

## Anatomy

The document's blocks in sequence: paragraphs, headings, bullet and numbered lists, quotes (a grey bar on the left
over a faint grey background) and code blocks (a grey panel), with inline bold, italic, underline, strikethrough,
code, highlight and links (in the text colour, with a light dashed underline).

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| content-style | variant | compact, document | compact | Spacing (JUI `contentStyle(ContentStyle.…)`): `compact` is tight, for a field or a card; `document` is roomier, with taller lines and indented lists, for reading at length. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| content-style | compact | Formatted text in a card, a table cell, a panel beside other content. |
| content-style | document | A page whose main content is the text: a policy, an article, a long description. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | filled | Content present | The document. |
| Content | empty | No content | Nothing is rendered. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | text | | Blocks in normal flow. | The document: `p`, `h1`–`h5`, `ul` and `ol` with `li`, `blockquote` and `pre`, with `strong`, `em`, `u`, `s`, `code`, `mark`, `sub`, `sup` and `a` inside them. |

## Behaviour

Clicking a link follows it: an external one opens in a new tab, and an `#anchor` scrolls within the text.

## Content rules

Show representative real content with the formatting it would carry, so the mockup shows how it reads.

## Accessibility

Real headings, lists, quotes and links, so screen readers announce the document's structure.

## Rules of use

- Use it for text written with `jui-formatted-text-editor`, to show that text where it isn't being edited.
- Headings start at `h1` in the content; JUI can shift them down to fit the page (`topHeadingLevel`).

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-richtext-block-spacing` | component | `2px` | Space above and below each block; `5px` in `document`. |
| `--jui-richtext-para-spacing` | component | `0.2em` | Space after a paragraph; `0.6em` in `document`. |
| `--jui-richtext-list-indent` | component | `0em` | Extra indent of a list; `1.5em` in `document`. |
| `--jui-richtext-line-height` | component | `inherit` | Line height; `1.6` in `document`. |
| `--jui-richtext-heading-weight` | component | `500` | Heading weight. |
| `--jui-richtext-h1-size`, `--jui-richtext-h2-size`, `--jui-richtext-h3-size`, `--jui-richtext-h4-size`, `--jui-richtext-h5-size` | component | `1.8em` to `1.1em` | Heading sizes. |
| `--jui-richtext-quote-border`, `--jui-richtext-quote-bg`, `--jui-richtext-quote-color`, `--jui-richtext-quote-radius` | component | | Quotes: a grey bar on the left over a faint grey background. |
| `--jui-richtext-codeblock-bg`, `--jui-richtext-codeblock-radius` | component | | Code blocks: a grey panel. |
| `--jui-richtext-mono-font` | component | a monospace stack | Code block font. |
| `--jui-font-family-heading` | semantic | | Heading font. |

## Template

```html
<div class="richtext"><slot></slot></div>
```

## Style

```css
:host {
  display: block;
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
:host([content-style="document"]) {
  --jui-richtext-block-spacing: 5px;
  --jui-richtext-para-spacing: 0.6em;
  --jui-richtext-list-indent: 1.5em;
  --jui-richtext-line-height: 1.6;
}
:host(:not([data-filled])) { display: none; }
.richtext { position: relative; line-height: var(--jui-richtext-line-height); }

::slotted(*) { margin: 0 !important; padding: var(--jui-richtext-block-spacing) 0 !important; }
::slotted(p) { margin-bottom: var(--jui-richtext-para-spacing) !important; }
::slotted(ul), ::slotted(ol) { padding-left: calc(1.5em + var(--jui-richtext-list-indent)) !important; }
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
  margin: 0.75em 0 !important; padding: 0.85em 1em !important; overflow-x: auto; white-space: pre-wrap; font-family: var(--jui-richtext-mono-font);
  background: var(--jui-richtext-codeblock-bg); border-radius: var(--jui-richtext-codeblock-radius);
}
```

## Example

```xml
<div layout="grid" cols="2" gap="6">
  <jui-card padding="4">
    <jui-ftext>
      <p>The successful candidate will <strong>lead the design</strong> of our hiring tools, working with:</p>
      <ul><li>product managers, on what to build next;</li><li>engineers, on <em>how</em> it is built.</li></ul>
      <p>See <a href="#">the team page</a> for more, or ask about <code>hiring-tools</code>.</p>
    </jui-ftext>
  </jui-card>
  <jui-ftext content-style="document">
    <h2>Leave policy</h2>
    <p>Annual leave accrues at <strong>four weeks</strong> a year and is taken by agreement with your manager. <mark>Unused leave carries over.</mark></p>
    <blockquote>Requests of more than two weeks need a month's notice.</blockquote>
    <ol><li>Submit the request.</li><li>Your manager approves it.</li></ol>
    <pre><code>leave.request(days = 10)</code></pre>
  </jui-ftext>
</div>
```
