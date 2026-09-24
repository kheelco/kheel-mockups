---
name: ui-table-cell
version: 1.0.0
kind: elemental
status: active
summary: One cell of a table row.
---

# Table cell

## Purpose

Holds one value of one record in a `ui-table-row`: text, a badge, a checkbox, or a row action.

## Anatomy

A cell with padding and a bottom rule; its contents sit in a row.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| align | variant | start, center, end | start | Alignment; matches the column. |
| tone | variant | default, strong, muted | default | `strong` for the item's name, `muted` for secondary values. |
| shrink | variant | boolean | | Narrows the cell to its content. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| tone | strong | The column that names the item. |
| tone | muted | Secondary details: dates, references. |

## States

None — a cell follows its row.

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | ui-badge, ui-checkbox, ui-button | Row, centred vertically | The value. |

## Behaviour

None.

## Content rules

Show an em dash (—) for a missing value.

## Accessibility

Exposed as a cell.

## Rules of use

- Only inside `ui-table-row`.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--table-cell-py`, `--table-cell-px` | inherited | `--space-3`, `--space-4` | Padding, from the table's density. |
| `--color-border` | semantic |  | Line under each row. |
| `--color-text`, `--color-text-muted` | semantic |  | Text; the muted tone. |
| `--font-body`, `--text-md`, `--text-sm`, `--weight-medium`, `--leading-tight` | semantic |  | Type; `--weight-medium` for the strong tone, `--text-sm` for muted. |
| `--space-2`, `--space-3`, `--space-4` | semantic |  | Gap between contents, and padding fallbacks. |

## Template

```html
<div class="td"><slot></slot></div>
```

## Style

```css
:host {
  display: table-cell; vertical-align: middle;
  padding: var(--table-cell-py, var(--space-3)) var(--table-cell-px, var(--space-4));
  border-bottom: 1px solid var(--color-border);
  font: var(--text-md) / var(--leading-tight) var(--font-body); color: var(--color-text);
}
:host([shrink]) { width: 1%; white-space: nowrap; }
.td { display: flex; align-items: center; gap: var(--space-2); }
:host([align="center"]) .td { justify-content: center; }
:host([align="end"]) .td { justify-content: flex-end; font-variant-numeric: tabular-nums; }
:host([tone="strong"]) { font-weight: var(--weight-medium); }
:host([tone="muted"]) { color: var(--color-text-muted); font-size: var(--text-sm); }
```

## Example

```xml
<ui-table>
  <ui-table-column>Default</ui-table-column>
  <ui-table-column>Strong</ui-table-column>
  <ui-table-column>Muted</ui-table-column>
  <ui-table-column align="end">End</ui-table-column>
  <ui-table-row>
    <ui-table-cell>Text</ui-table-cell>
    <ui-table-cell tone="strong">Item name</ui-table-cell>
    <ui-table-cell tone="muted">12 Mar 2026</ui-table-cell>
    <ui-table-cell align="end">$1,240.00</ui-table-cell>
  </ui-table-row>
</ui-table>
```
