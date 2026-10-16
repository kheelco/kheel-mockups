---
name: jui-vert-layout
version: 1.0.0
kind: elemental
status: active
summary: VertLayout layout — children stacked down the page with spacing and an optional separator line between them.
---

# VertLayout (layout)

## Purpose

Represents JUI's **VertLayout** (`com.effacy.jui.core.client.component.layout`): the layout that arranges the
components of a panel's region vertically, one after another at their natural height, with spacing between them
and optionally a line separating each from the next. For a plain column with spacing, use the layout attributes
instead (`layout="column" gap="4"` on a `jui-panel` or `div`); use `jui-vert-layout` when the separator line is
wanted, since the layout attributes have no equivalent.

## Anatomy

A column of the consumer's children. With `separator`, each child after the first has a light line above it,
with the spacing on both sides of the line.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| spacing | variant | 0, 1, 2, 3, 4, 6, 8 | 4 | Space between children (JUI `spacing(Length)`); `4` is 1em. |
| separator | variant | boolean | | A line between children (JUI `separator(Separator.LINE)`). |
| padding | variant | 0, 1, 2, 3, 4, 6, 8 | 0 | Inset around the column (JUI `paddingSide` / padding layout data). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| separator | present | Sections of a page or lesson that read as distinct blocks. |
| spacing | 0 … 8 | Stand in for JUI's free spacing length. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | filled | Children present | Children stacked with spacing (and lines). |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | | A column; spacing and separators come from the properties. | The children, top to bottom. |

## Behaviour

None.

## Content rules

None — the layout holds other components.

## Accessibility

The separator is decorative; the reading order is the order of the children.

## Rules of use

- Use `layout="column" gap=".."` instead when no separator is wanted.
- Don't add borders to the children to fake separators; use `separator`.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-vertlayout-spacing` | component | `--jui-space-4` | Space between children; `spacing` sets it. |
| `--cpt-vertlayout-padding` | component | `0` | Inset around the column; `padding` sets it. |
| `--cpt-vertlayout-separator` | component | `--jui-line-light` | Separator colour (JUI's `separatorLine` uses `--jui-line-light`). |
| `--jui-line-light` | semantic | | Separator line. |
| `--jui-space-1`, `--jui-space-2`, `--jui-space-3`, `--jui-space-4`, `--jui-space-6`, `--jui-space-8` | semantic | | Spacing and padding steps. |

## Template

```html
<div class="column"><slot></slot></div>
```

## Style

```css
:host { display: block; --cpt-vertlayout-spacing: var(--jui-space-4); --cpt-vertlayout-padding: 0; --cpt-vertlayout-separator: var(--jui-line-light); }
:host([spacing="0"]) { --cpt-vertlayout-spacing: 0; }
:host([spacing="1"]) { --cpt-vertlayout-spacing: var(--jui-space-1); }
:host([spacing="2"]) { --cpt-vertlayout-spacing: var(--jui-space-2); }
:host([spacing="3"]) { --cpt-vertlayout-spacing: var(--jui-space-3); }
:host([spacing="6"]) { --cpt-vertlayout-spacing: var(--jui-space-6); }
:host([spacing="8"]) { --cpt-vertlayout-spacing: var(--jui-space-8); }
:host([padding="1"]) { --cpt-vertlayout-padding: var(--jui-space-1); }
:host([padding="2"]) { --cpt-vertlayout-padding: var(--jui-space-2); }
:host([padding="3"]) { --cpt-vertlayout-padding: var(--jui-space-3); }
:host([padding="4"]) { --cpt-vertlayout-padding: var(--jui-space-4); }
:host([padding="6"]) { --cpt-vertlayout-padding: var(--jui-space-6); }
:host([padding="8"]) { --cpt-vertlayout-padding: var(--jui-space-8); }
.column { display: flex; flex-direction: column; gap: var(--cpt-vertlayout-spacing); padding: var(--cpt-vertlayout-padding); }
::slotted(*) { margin: 0; }
:host([separator]) ::slotted(:not(:first-child)) { border-top: 1px solid var(--cpt-vertlayout-separator); padding-top: var(--cpt-vertlayout-spacing); }
```

## Example

```xml
<div layout="row" gap="6" align="start">
  <jui-vert-layout separator="" grow="">
    <div><strong>Part a</strong><p>Children are stacked down the page.</p></div>
    <div><strong>Part b</strong><p>A line separates each from the next.</p></div>
    <div><strong>Part c</strong><p>The spacing sits on both sides of the line.</p></div>
  </jui-vert-layout>
  <jui-vert-layout spacing="2" grow="">
    <jui-btn label="First"/>
    <jui-btn label="Second" variant="outlined"/>
    <jui-btn label="Third" variant="text"/>
  </jui-vert-layout>
</div>
```
