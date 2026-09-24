---
name: jui-typography
version: 1.0.0
kind: elemental
status: active
summary: Typography fragment — applies JUI's Material-style type scale to headings and text.
---

# Typography (fragment)

## Purpose

Represents JUI's **Typography** fragment: a type-scale container. With no style it is a block whose `h1`–`h6`
and `p` children take JUI's Material-style scale (light, very large display headings down to a medium `h6`);
with a style (`body1`, `body2`, `subtitle1`, `subtitle2`) it is a single paragraph in that text style. Use it for
content-heavy pages — articles, onboarding, empty-state explanations — where that scale is wanted. It has no
events (see **Fragment events**). Use `jui-paper` for ordinary content blocks with JUI's standard headings, and
`jui-para` for plain user text.

## Anatomy

Either a block containing headings and paragraphs, or one paragraph of text in the chosen style. Every element
has a `0.35em` bottom margin.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| variant | variant | container, body1, body2, subtitle1, subtitle2 | container | `container` is a `div` styling its headings and paragraphs (JUI with no `style`); the others render one `p` in that style (JUI `style(Typography.Style.…)`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | container | Hold `h1`–`h6` and `p` in the Material scale: `h1` 6em light … `h6` 1.25em medium; `p` 1em. |
| variant | body1 | Body text: 1em, regular, 1.5 line height. |
| variant | body2 | Secondary body text: JUI currently draws it the same as body1. |
| variant | subtitle1 | A subtitle: 1em regular, 1.75 line height. |
| variant | subtitle2 | A smaller, medium-weight subtitle: 0.875em. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | filled | Content present | The styled text. |
| Content | empty | No content | Nothing. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | text | | Normal flow. | For `container`, headings (`h1`–`h6`) and paragraphs; for the text styles, the paragraph's text. |

## Behaviour

None.

## Content rules

Use the display sizes (`h1`–`h3`) sparingly — one per page at most; they are very large.

## Accessibility

Headings keep their semantic levels; don't pick a heading level for its size alone.

## Rules of use

- Don't mix Typography's scale with the base heading styles on one page; pick one.
- In JUI the text styles only take effect inside a Typography container — nest them (see the mapping).

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-typography-font-size` | component | `14px` | The base size every step scales from. |

## Template

```html
<div class="typo"><slot></slot></div>
```

## Style

Slotted rules are `!important` because the base styles for plain headings and paragraphs would otherwise win.

```css
:host { display: block; --jui-typography-font-size: 14px; }
.typo { font-size: var(--jui-typography-font-size); }
::slotted(*) { margin: 0 0 0.35em 0 !important; }
::slotted(h1) { font-weight: 300 !important; font-size: 6em !important; line-height: 1.167 !important; letter-spacing: -0.01562em !important; }
::slotted(h2) { font-weight: 300 !important; font-size: 3.75em !important; line-height: 1.2 !important; letter-spacing: -0.00833em !important; }
::slotted(h3) { font-weight: 400 !important; font-size: 3em !important; line-height: 1.167 !important; letter-spacing: 0 !important; }
::slotted(h4) { font-weight: 400 !important; font-size: 2.125em !important; line-height: 1.235 !important; letter-spacing: 0.00735em !important; }
::slotted(h5) { font-weight: 400 !important; font-size: 1.5em !important; line-height: 1.334 !important; letter-spacing: 0 !important; }
::slotted(h6) { font-weight: 500 !important; font-size: 1.25em !important; line-height: 1.6 !important; letter-spacing: 0.0075em !important; }
::slotted(p) { font-weight: 400 !important; font-size: 1em !important; line-height: 1.5 !important; letter-spacing: 0.00938em !important; }
:host([variant="body1"]) .typo, :host([variant="body2"]) .typo { margin: 0 0 0.35em 0; font-weight: 400; line-height: 1.5; letter-spacing: 0.00938em; }
:host([variant="subtitle1"]) .typo { margin: 0 0 0.35em 0; font-weight: 400; line-height: 1.75; letter-spacing: 0.00938em; }
:host([variant="subtitle2"]) .typo { margin: 0 0 0.35em 0; font-weight: 500; font-size: calc(var(--jui-typography-font-size) * 0.875); line-height: 1.57; letter-spacing: 0.00714em; }
```

## Example

```xml
<div layout="column" gap="4">
  <jui-typography>
    <h4>Welcome to hiring</h4>
    <h6>Set up your first role</h6>
    <p>Create a role, invite your team and start reviewing candidates in minutes.</p>
  </jui-typography>
  <jui-typography variant="subtitle1">Subtitle 1 — a line introducing a section.</jui-typography>
  <jui-typography variant="subtitle2">Subtitle 2 — smaller, medium weight.</jui-typography>
  <jui-typography variant="body1">Body 1 — regular body text in the Typography scale.</jui-typography>
  <jui-typography variant="body2">Body 2 — currently identical to body 1 in JUI.</jui-typography>
</div>
```
