---
name: jui-table-row
version: 1.0.0
kind: elemental
status: active
summary: Table row component — one record of a Table, holding its cells and, when the table is selectable, a selection checkbox.
---

# Table row (component)

## Purpose

Represents one record of JUI's **Table**: a body row that JUI renders for each record in the table's store. It
holds one `jui-table-cell` per column and, when the table is `selectable`, JUI's selector column — a leading
checkbox bound to the store's selection. It exists only inside a `jui-table`; it is not a JUI class of its own.

## Anatomy

An optional selector cell with a checkbox (shown when the enclosing table is `selectable`), then the cells in
column order. A hairline divider runs under every row except the last.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| selected | state | boolean | | The record is selected in the store's selection: its checkbox is checked. |

## Variants

None — the row follows its table's `selectable` and `clickable` settings.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | — |
| Interaction | hover | `:hover` | Row background from the table (transparent, or the muted surface with a pointer cursor when the table is `clickable`). |
| Selection | unselected | Default | Checkbox clear (selectable tables only). |
| Selection | selected | `selected` property | Checkbox checked. JUI does not highlight selected rows. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | jui-table-cell | jui-table-cell | Table row, one cell per column | The record's cells, in column order. |

## Behaviour

When the table is `clickable`, clicking the row (outside an interactive cell and outside its checkbox) opens the
record — in a mockup, give the row `href` or `opens`. Toggling the checkbox adds the record to or removes it from
the store's selection without triggering the row click.

## Content rules

One cell per column of the table, in the same order.

## Accessibility

Renders as a `tr` in JUI. The selector is a native checkbox; label it with the record's name in the real
implementation where selection matters.

## Rules of use

- Show a hovered and a selected row in mockups of clickable or selectable tables.
- Don't place anything but cells in a row.

## Tokens

The tokens the style uses, all set by the enclosing `jui-table`.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-tbl-selector-display`, `--cpt-tbl-selector-width` | inherited | | Whether the selector cell shows, and its width. |
| `--cpt-tbl-cell-padding`, `--cpt-tbl-row-border` | inherited | | Padding of the selector cell and the divider under each cell. |
| `--cpt-tbl-row-hover-bg`, `--cpt-tbl-row-cursor` | inherited | | Hover background and cursor. |

## Template

```html
<div class="selector">
  <input type="checkbox" data-if="selected" checked="" aria-label="Select row"/>
  <input type="checkbox" data-if="!selected" aria-label="Select row"/>
</div>
<slot></slot>
```

## Style

```css
:host { display: table-row; cursor: var(--cpt-tbl-row-cursor); }
.selector {
  display: var(--cpt-tbl-selector-display);
  width: var(--cpt-tbl-selector-width);
  padding: var(--cpt-tbl-cell-padding);
  border-bottom: var(--cpt-tbl-row-border);
  vertical-align: middle;
}
.selector input { margin: 0; vertical-align: middle; cursor: pointer; }
::slotted(*) { border-bottom: var(--cpt-tbl-row-border); }
:host(:last-of-type) .selector, :host(:last-of-type) ::slotted(*) { border-bottom: none; }
:host(:hover) .selector, :host([state~="hover"]) .selector,
:host(:hover) ::slotted(*), :host([state~="hover"]) ::slotted(*) { background: var(--cpt-tbl-row-hover-bg); }
```

## Example

```xml
<jui-table selectable="" clickable="">
  <jui-table-column label="Task"/>
  <jui-table-column label="Due" column-width="medium"/>
  <jui-table-row>
    <jui-table-cell>Default row</jui-table-cell>
    <jui-table-cell>Mon 3 Mar</jui-table-cell>
  </jui-table-row>
  <jui-table-row state="hover">
    <jui-table-cell>Hovered row</jui-table-cell>
    <jui-table-cell>Tue 4 Mar</jui-table-cell>
  </jui-table-row>
  <jui-table-row selected="">
    <jui-table-cell>Selected row</jui-table-cell>
    <jui-table-cell>Wed 5 Mar</jui-table-cell>
  </jui-table-row>
</jui-table>
```
