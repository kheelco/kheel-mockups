---
name: jui-control-form-row
version: 1.0.0
kind: elemental
status: active
summary: ControlForm row layout — lays a form's cells out side by side, top-aligned.
---

# ControlForm row (layout)

## Purpose

Represents a **row** of a JUI `ControlForm` (`IRowBuilder`, created with `row(…)`): cells laid out left to right,
top-aligned, with the form's cell gap between them. Every control in a form sits in a cell in a row; a single
control is a row with one cell (JUI's `control(…)` shortcut). Use it inside `jui-control-form` or
`jui-control-form-group`. Cells take their natural width unless they grow (the `grow` attribute on the cell,
JUI `cell.grow(1)`); an empty growing cell pushes the others right (JUI `row.expander()`).

## Anatomy

A flex row of cells (`jui-control-form-cell`), or of components placed directly (JUI `row.component(…)`, such as a
button beside a field).

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| no-labels | variant | boolean | | No cell in the row has a label, so labels take no space (JUI's `nolabel` row). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| no-labels | present | Rows of unlabelled controls, such as a check control or a follow-on line of an address. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Visibility | shown | Default | — |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | | jui-control-form-cell, jui-btn | Row, top-aligned, the form's cell gap between items | The row's cells, or components placed directly. |

## Behaviour

None of its own. A row hides when all its cells are hidden (JUI hides a cell with its control).

## Content rules

Put related fields on one row (first and last name, city and postcode); keep to two or three cells.

## Accessibility

Reading order follows the cells left to right.

## Rules of use

- Give growing cells the `grow` attribute; leave short fields (numbers, dates) at their natural width.
- A component placed directly in a row (a button) lines up with the tops of the cells' labels; wrap it in a cell
  without a label, or set `no-labels`, to line it up with the controls.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-form-row-gap` | inherited | | Gap between cells, set by `jui-control-form`. |
| `--cpt-form-row-label-display` | component | `none` when `no-labels` | Hides the labels of the row's cells (read by `jui-control-form-cell`). |
| `--jui-space-6` | semantic | | Gap fallback. |

## Template

```html
<div class="row"><slot></slot></div>
```

## Style

```css
:host { display: block; }
:host([no-labels]) { --cpt-form-row-label-display: none; }
.row { display: flex; flex-direction: row; align-items: flex-start; gap: var(--cpt-form-row-gap, var(--jui-space-6)); }
::slotted(*) { min-width: 0; }
```

## Example

```xml
<jui-control-form>
  <jui-control-form-row>
    <jui-control-form-cell label="First name" grow=""><jui-text-control/></jui-control-form-cell>
    <jui-control-form-cell label="Middle name" grow="" guidance="This is some guidance"><jui-text-control/></jui-control-form-cell>
    <jui-control-form-cell label="Last name" grow="" help="This is some help text"><jui-text-control/></jui-control-form-cell>
  </jui-control-form-row>
  <jui-control-form-row>
    <jui-control-form-cell grow=""/>
    <jui-control-form-cell label="Name"><jui-text-control/></jui-control-form-cell>
  </jui-control-form-row>
  <jui-control-form-row no-labels="">
    <jui-control-form-cell grow=""><jui-selection-control placeholder="Select person"/></jui-control-form-cell>
    <jui-control-form-cell><jui-btn label="Add new" icon="plus"/></jui-control-form-cell>
  </jui-control-form-row>
</jui-control-form>
```
