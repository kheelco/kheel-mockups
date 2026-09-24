---
name: ui-table-column
version: 1.0.0
kind: composed
status: active
summary: One column header of a table, optionally sortable.
---

# Table column

## Purpose

Heads one column of a `ui-table` and, when sortable, lets the user sort by it. Used only inside a table.

## Anatomy

The column's label (the element's text, or a control such as a select-all checkbox) and a sort indicator.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| sortable | variant | boolean | | The column can be sorted. Shows a neutral sort indicator when not sorted. |
| sort | state | none, ascending, descending | none | The current sort. At most one column per table is not `none`. |
| align | variant | start, center, end | start | Alignment; matches the column's cells. |
| shrink | variant | boolean | | Narrows the column to its content, for checkbox and action columns. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| align | end | Numbers, money, dates. |
| shrink | present | Selection and row-action columns. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Sort | unsorted | `sort="none"` | Neutral up-down indicator when sortable; none otherwise. |
| Sort | ascending | `sort="ascending"` | Up arrow; label in strong text. |
| Sort | descending | `sort="descending"` | Down arrow; label in strong text. |
| Interaction | resting | Default | — |
| Interaction | hover | `:hover` when sortable | Label darkens. |
| Interaction | focus | `:focus-visible` when sortable | Focus ring. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | text, ui-checkbox | | Inline | The label, or a select-all checkbox. |

## Behaviour

Follows the shared **Sortable columns** behaviour.

## Content rules

One or two words. No trailing punctuation.

## Accessibility

A sortable header is a button announcing its label and sort state; the header cell carries `aria-sort`.

## Rules of use

- Only inside `ui-table`.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--table-cell-px` | inherited | `--space-4` | Horizontal padding, from the table's density. |
| `--color-surface-sunken`, `--color-border` | semantic |  | Header background and the line beneath it. |
| `--color-text-muted`, `--color-text` | semantic |  | Label colour; darker when hovered or sorted. |
| `--color-action` | semantic |  | Sort direction arrow. |
| `--color-text-disabled` | semantic |  | Neutral sort indicator. |
| `--color-focus-ring`, `--radius-sm` | semantic |  | Focus ring. |
| `--font-body`, `--text-sm`, `--weight-medium`, `--leading-tight` | semantic |  | Label type. |
| `--space-1`, `--space-2`, `--space-4` | semantic |  | Gap and padding. |

## Template

```html
<div class="th" role="columnheader">
  <span class="label"><slot></slot></span>
  <ui-icon data-if="sort=ascending" class="dir" name="arrow-up" size="small"></ui-icon>
  <ui-icon data-if="sort=descending" class="dir" name="arrow-down" size="small"></ui-icon>
  <span data-if="sortable"><ui-icon data-if="sort=none" class="idle" name="chevrons-up-down" size="small"></ui-icon></span>
</div>
```

## Style

```css
:host {
  display: table-cell; vertical-align: middle; white-space: nowrap;
  padding: var(--space-2) var(--table-cell-px, var(--space-4));
  background: var(--color-surface-sunken); border-bottom: 1px solid var(--color-border);
  font: var(--weight-medium) var(--text-sm) / var(--leading-tight) var(--font-body); color: var(--color-text-muted); text-align: left;
}
:host([shrink]) { width: 1%; }
.th { display: flex; align-items: center; gap: var(--space-1); }
:host([align="center"]) .th { justify-content: center; }
:host([align="end"]) .th { justify-content: flex-end; }
:host([sortable]) { cursor: pointer; }
:host([sortable]:hover), :host([state~="hover"]) { color: var(--color-text); }
:host([state~="focus"]) .th { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; border-radius: var(--radius-sm); }
:host([sort="ascending"]), :host([sort="descending"]) { color: var(--color-text); }
.idle { color: var(--color-text-disabled); }
.dir { color: var(--color-action); }
```

## Example

```xml
<ui-table>
  <ui-table-column sortable="" sort="descending">Due</ui-table-column>
  <ui-table-column sortable="">Customer</ui-table-column>
  <ui-table-column sortable="" state="hover">Hovered</ui-table-column>
  <ui-table-column align="end">Value</ui-table-column>
</ui-table>
```
