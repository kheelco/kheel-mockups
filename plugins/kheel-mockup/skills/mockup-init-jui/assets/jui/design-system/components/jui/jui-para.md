---
name: jui-para
version: 1.0.0
kind: elemental
status: active
summary: Para fragment — renders a block of plain text as paragraphs, keeping its line breaks.
---

# Para (fragment)

## Purpose

Represents JUI's **Para** fragment: it takes a piece of plain text — typically user-entered or from the server —
and renders it as one `p` per paragraph (paragraphs separated by blank lines), with single line breaks kept as
`br`. Use it for descriptions, notes and comments whose text you don't control. It has no events (see
**Fragment events**). Use a plain `p` for a fixed sentence of UI copy, and `jui-typography` for styled type.

## Anatomy

A sequence of paragraphs with the browser's paragraph spacing (`1em` above and below), in the surrounding text
style.

## Properties

None.

## Variants

None.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | filled | Text present | One or more paragraphs. |
| Content | empty | No text | Nothing is rendered. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | text | | Paragraphs in normal flow. | The text. Write one paragraph as text, or several as `p` elements; use `br` for a line break within one. |

## Behaviour

None. In JUI, text with no content renders nothing.

## Content rules

Show representative real text, including its paragraph breaks, so the mockup shows how long content wraps.

## Accessibility

Real `p` elements, so screen readers announce paragraphs.

## Rules of use

- Use Para for text that arrives as a string; it never interprets markup — a `<b>` in the data shows as text.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-para-spacing` | component | `1em` | Space above and below each paragraph (the browser's default for `p`, which JUI keeps). |

## Template

```html
<div class="para"><slot></slot></div>
```

## Style

```css
:host { display: block; --jui-para-spacing: 1em; }
:host(:not([data-filled])) { display: none; }
.para { margin: var(--jui-para-spacing) 0; }
::slotted(p) { margin: var(--jui-para-spacing) 0 !important; }
```

## Example

```xml
<jui-card padding="4" width="fit">
  <jui-para>
    <p>Jane joined the design team in 2021 and leads the hiring tools work.<br/>Based in Melbourne.</p>
    <p>She is interested in research roles and has asked to be considered for the new lead position.</p>
  </jui-para>
  <jui-para>A single paragraph written as plain text.</jui-para>
</jui-card>
```
