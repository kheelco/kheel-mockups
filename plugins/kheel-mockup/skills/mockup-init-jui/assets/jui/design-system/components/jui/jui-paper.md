---
name: jui-paper
version: 1.0.0
kind: elemental
status: active
summary: Paper fragment — an unframed content block that gives the headings inside it JUI's heading style.
---

# Paper (fragment)

## Purpose

Represents JUI's **Paper** fragment: a plain block of content — headings, paragraphs, lists — drawn by a
component's renderer. It has no frame of its own; what it adds is JUI's heading treatment (semibold, header colour)
for any `h1`–`h6` inside. It is also the base of `jui-card`. Being a fragment it has no events; anything clickable
inside is handled by the enclosing component (see **Fragment events**). Use `jui-card` when the content needs a
bordered surface, and `jui-typography` for Material-style type scale.

## Anatomy

A block holding the consumer's content. Headings inside it are semibold in `--jui-text-header`.

## Properties

None.

## Variants

None.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | filled | Children present | The content. |
| Content | empty | No children | Nothing. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | jui-para, jui-divider, jui-stack | configurable | The content. |

## Behaviour

None — a content container.

## Content rules

Structure the content with headings in order (`h2` under `h1`, and so on).

## Accessibility

A `div` with no role; the headings inside carry the structure.

## Rules of use

- Use Paper to hold free-form content; don't add borders or shadows around it — use `jui-card` for that.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-paper-heading-color` | component | `--jui-text-header` | Colour of headings inside. |
| `--jui-paper-heading-weight` | component | `600` | Weight of headings inside. |
| `--jui-text-header` | semantic | | Heading colour. |

## Template

```html
<div class="paper" data-layout><slot></slot></div>
```

## Style

```css
:host { display: block; --jui-paper-heading-color: var(--jui-text-header); --jui-paper-heading-weight: 600; }
::slotted(h1), ::slotted(h2), ::slotted(h3), ::slotted(h4), ::slotted(h5), ::slotted(h6) {
  font-weight: var(--jui-paper-heading-weight) !important; color: var(--jui-paper-heading-color) !important;
}
```

## Example

```xml
<jui-paper layout="column" gap="2">
  <h3>Interview guide</h3>
  <p>Use these questions to structure the first-round call.</p>
  <h4>Background</h4>
  <p>Ask about the candidate's most recent role and why they are looking.</p>
</jui-paper>
```
