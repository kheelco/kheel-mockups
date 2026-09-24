---
name: jui-stack
version: 1.0.0
kind: elemental
status: active
summary: Stack fragment — lays its children out in a column or a row with a gap, alignment and wrapping.
---

# Stack (fragment)

## Purpose

Represents JUI's **Stack** fragment: a flex container with no surface of its own that arranges its children
vertically (the default) or horizontally, with a gap, cross-axis alignment, main-axis justification and optional
wrapping. It is how a component's renderer lays out a group of fragments. Being a fragment it has no events;
anything clickable inside is handled by the enclosing component (see **Fragment events**). Use `jui-box` for the
simpler row/column box, `jui-card` or `jui-paper` when the group needs a surface, and plain `div` layout
attributes in a mockup only where nothing in JUI would correspond.

Its layout is set by its own properties, which mirror JUI's `StackFragment` methods — not by the mockup's
layout attributes. Note that JUI centres children across the axis by default.

## Anatomy

A flex container; its children are the consumer's content.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| horizontal | variant | boolean | | Lays children in a row (JUI `horizontal()`); otherwise a column (JUI `vertical()`, the default). |
| gap | variant | 0, 1, 2, 3, 4, 5, 6, 8, 10, 12 | | Space between children as a spacing step (JUI `gap(Length)`). Absent: JUI's `1em`. |
| align | variant | start, center, end, justify | center | Cross-axis alignment (JUI `align(Stack.Align)`); `justify` stretches every child to the full width (column) or height (row). |
| justify | variant | start, center, end | | Main-axis placement (JUI `justify(Stack.Justify)`). Absent: start. |
| wrap | variant | boolean | | Lets a row wrap onto more lines (JUI `wrap()`). |
| hide-if-empty | variant | boolean | | Renders nothing when there are no children (JUI `hideIfEmpty()`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| horizontal | off | Vertical stack: form sections, card bodies, lists of fragments. |
| horizontal | on | A row: pills, buttons, icon and text. |
| align | center | JUI's default: children centred across the axis. |
| align | start | Left-aligned column, or top-aligned row: the usual choice for text. |
| align | end | Right-aligned column, or bottom-aligned row. |
| align | justify | Children fill the cross axis: full-width blocks in a column. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | filled | Children present | Children laid out. |
| Content | empty | No children | Nothing (zero size); hidden entirely with `hide-if-empty`. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | jui-btn, jui-pill, jui-card, jui-para, jui-avatar | Flex column or row, set by `horizontal`, `gap`, `align`, `justify` and `wrap`. | The stacked content. |

## Behaviour

None — a layout container.

## Content rules

None — it holds other content.

## Accessibility

A `div` with no role. Order children in the reading order; don't reorder visually.

## Rules of use

- Set `align="start"` for columns of text; JUI's centred default suits icons and buttons, not paragraphs.
- Prefer one stack with a gap over margins on each child.
- Use `wrap` on rows whose content can outgrow the width (pills, tags).

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-stack-gap` | component | `1em` | Gap between children; `gap` sets a spacing step. |
| `--jui-space-1`, `--jui-space-2`, `--jui-space-3`, `--jui-space-4`, `--jui-space-5`, `--jui-space-6`, `--jui-space-8`, `--jui-space-10`, `--jui-space-12` | semantic | | Gap steps. |

## Template

```html
<div class="stack"><slot></slot></div>
```

## Style

```css
:host { display: block; --jui-stack-gap: 1em; }
:host([gap="0"]) { --jui-stack-gap: 0; }
:host([gap="1"]) { --jui-stack-gap: var(--jui-space-1); }
:host([gap="2"]) { --jui-stack-gap: var(--jui-space-2); }
:host([gap="3"]) { --jui-stack-gap: var(--jui-space-3); }
:host([gap="4"]) { --jui-stack-gap: var(--jui-space-4); }
:host([gap="5"]) { --jui-stack-gap: var(--jui-space-5); }
:host([gap="6"]) { --jui-stack-gap: var(--jui-space-6); }
:host([gap="8"]) { --jui-stack-gap: var(--jui-space-8); }
:host([gap="10"]) { --jui-stack-gap: var(--jui-space-10); }
:host([gap="12"]) { --jui-stack-gap: var(--jui-space-12); }
:host([hide-if-empty]:not([data-filled])) { display: none; }
.stack { display: flex; flex-direction: column; align-items: center; gap: var(--jui-stack-gap); }
:host([horizontal]) .stack { flex-direction: row; }
:host([wrap]) .stack { flex-wrap: wrap; }
:host([align="start"]) .stack { align-items: start; }
:host([align="end"]) .stack { align-items: end; }
:host([align="justify"]) .stack { align-items: stretch; }
:host([align="justify"]:not([horizontal])) ::slotted(*) { width: 100%; }
:host([align="justify"][horizontal]) ::slotted(*) { width: auto; height: 100%; }
:host([justify="start"]) .stack { justify-content: flex-start; }
:host([justify="center"]) .stack { justify-content: center; }
:host([justify="end"]) .stack { justify-content: flex-end; }
```

## Example

```xml
<div layout="row" gap="6" align="start">
  <jui-stack>
    <jui-avatar initials="JC" size="medium"/>
    <span>Centred column</span>
    <jui-btn label="Follow" variant="outlined"/>
  </jui-stack>
  <jui-stack align="start" gap="2">
    <strong>Left-aligned column</strong>
    <span>gap="2"</span>
    <jui-btn label="Action" variant="text" compact=""/>
  </jui-stack>
  <jui-stack align="justify" gap="2" grow="">
    <jui-card padding="2">Stretched to full width</jui-card>
    <jui-card padding="2">align="justify"</jui-card>
  </jui-stack>
  <jui-stack horizontal="" gap="2" wrap="" grow="">
    <jui-pill label="Design"/>
    <jui-pill label="Research"/>
    <jui-pill label="Hiring"/>
    <jui-pill label="Remote"/>
  </jui-stack>
  <jui-stack horizontal="" gap="2" justify="end" grow="">
    <jui-btn label="Cancel" nature="grey" variant="outlined"/>
    <jui-btn label="Save"/>
  </jui-stack>
</div>
```
