---
name: jui-box
version: 1.0.0
kind: elemental
status: active
summary: Box fragment — a simple flex box that stacks its children in a column or a row with a gap.
---

# Box (fragment)

## Purpose

Represents JUI's **Box** fragment: the simplest layout container — a column (default) or a row of children with a
gap, centred across the axis like `jui-stack`. It has no surface and no events; anything clickable inside is
handled by the enclosing component (see **Fragment events**). Use `jui-stack` when you need alignment,
justification or wrapping; use `jui-card` or `jui-paper` when the group needs a surface.

## Anatomy

A flex container; its children are the consumer's content.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| row | variant | boolean | | Lays children in a row (JUI `row()`); otherwise a column (JUI `col()`, the default). |
| gap | variant | 0, 1, 2, 3, 4, 5, 6, 8, 10, 12 | | Space between children as a spacing step (JUI `gap(Length)`). Absent: JUI's `1em`. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| row | off | A centred column. |
| row | on | A centred row. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | filled | Children present | Children laid out. |
| Content | empty | No children | Nothing (zero size). |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | jui-btn, jui-pill, jui-avatar, jui-icon | Flex column (a row with `row`), centred across the axis, spaced by `gap`. | The boxed content. |

## Behaviour

None — a layout container.

## Content rules

None — it holds other content.

## Accessibility

A `div` with no role.

## Rules of use

- Reach for `jui-stack` as soon as you need left alignment or wrapping; Box always centres.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-box-gap` | component | `1em` | Gap between children; `gap` sets a spacing step. |
| `--jui-space-1`, `--jui-space-2`, `--jui-space-3`, `--jui-space-4`, `--jui-space-5`, `--jui-space-6`, `--jui-space-8`, `--jui-space-10`, `--jui-space-12` | semantic | | Gap steps. |

## Template

```html
<div class="box"><slot></slot></div>
```

## Style

```css
:host { display: block; --jui-box-gap: 1em; }
:host([gap="0"]) { --jui-box-gap: 0; }
:host([gap="1"]) { --jui-box-gap: var(--jui-space-1); }
:host([gap="2"]) { --jui-box-gap: var(--jui-space-2); }
:host([gap="3"]) { --jui-box-gap: var(--jui-space-3); }
:host([gap="4"]) { --jui-box-gap: var(--jui-space-4); }
:host([gap="5"]) { --jui-box-gap: var(--jui-space-5); }
:host([gap="6"]) { --jui-box-gap: var(--jui-space-6); }
:host([gap="8"]) { --jui-box-gap: var(--jui-space-8); }
:host([gap="10"]) { --jui-box-gap: var(--jui-space-10); }
:host([gap="12"]) { --jui-box-gap: var(--jui-space-12); }
.box { display: flex; flex-direction: column; align-items: center; gap: var(--jui-box-gap); }
:host([row]) .box { flex-direction: row; }
```

## Example

```xml
<div layout="row" gap="8" align="start">
  <jui-box>
    <jui-icon name="inbox" size="large"/>
    <span>Column, 1em gap</span>
  </jui-box>
  <jui-box row="" gap="2">
    <jui-avatar initials="AL" size="small"/>
    <span>Row, gap="2"</span>
    <jui-pill label="Owner"/>
  </jui-box>
</div>
```
