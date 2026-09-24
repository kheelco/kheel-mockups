---
name: ui-table
version: 1.0.0
kind: composed
status: active
summary: A table of items with sortable column headers, a toolbar, a footer and container states.
---

# Table

## Purpose

Shows a set of records as rows with aligned columns, so they can be scanned, compared, sorted and opened. Use it
when the items share the same fields and people compare them; use a card grid when items are visual or have
little in common. The **Data table** pattern says how a table works with search, filters, bulk actions and
pagination.

## Anatomy

From top to bottom: an optional toolbar; the header row of columns (`ui-table-column`); the rows
(`ui-table-row`, each holding `ui-table-cell`s); a region for the empty, loading and no-permission conditions; and
an optional footer, usually pagination.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| density | variant | comfortable, compact | comfortable | Row height: 48 or 36 px. |
| caption | content | text | | Accessible name for the table ("Jobs"). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| density | comfortable | Default; lists people work through one by one. |
| density | compact | Dense data people scan and compare. |

## States

The table is a container, so it owns the conditions in which it has no ordinary rows to show. Show them with
`state`.

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | populated | Rows present | Rows show. |
| Content | empty | No rows (none exist, or none match the filters) | Rows hidden; the `empty` slot shows, or "No items to show." |
| Loading | loaded | Default | — |
| Loading | loading | Rows still arriving | Rows hidden; a spinner row shows. |
| Access | permitted | Default | — |
| Access | no-permission | The user may not see these records | Rows hidden; a message says so, rather than an empty table that reads as missing data. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| toolbar | any | ui-text-field, ui-select, ui-chip, ui-button | Row above the header, space between | Search, filters and bulk actions. Place with `slot="toolbar"`. |
| columns | ui-table-column | | The header row | The column headers, in order. Placed automatically. |
| default | ui-table-row | | One row each | The rows. |
| empty | ui-empty-state, text | ui-empty-state | Centred | What to show in the empty state. Placed automatically. |
| footer | ui-pagination, text | ui-pagination | Row below the rows | Pagination or a summary. Placed automatically. |

## Behaviour

- **Sorting.** One column is sorted at a time. Clicking a sortable column sorts by it ascending, then
  descending; the previously sorted column returns to unsorted. See the shared **Sortable columns** behaviour.
- **Opening a row.** A row with `href` opens its item when clicked anywhere except on a control in the row.
- **Selection.** When rows can be selected, the first column holds checkboxes and its header a select-all
  checkbox; selecting rows reveals bulk actions in the toolbar (see the **Data table** pattern).

## Content rules

Column labels are short nouns in sentence case. Numbers and dates align to the end; text to the start. Show an
em dash (—) for a missing value, never a blank.

## Accessibility

Exposed as a table with column headers; the sorted column carries `aria-sort`. The sort direction is shown by an
arrow, not colour alone. Row actions are real buttons with labels.

## Rules of use

- Don't put more than one or two actions in a row; open the item for the rest.
- Keep the same column order for the same kind of record across the product.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--table-cell-py` | component | `--space-3` | Vertical cell padding, read by rows and cells; `--space-2` in the compact density. |
| `--table-cell-px` | component | `--space-4` | Horizontal cell padding, read by columns and cells; `--space-3` in the compact density. |
| `--color-border` | semantic |  | Line under the toolbar. |
| `--color-text`, `--color-text-muted` | semantic |  | Table text; empty, loading and no-permission messages. |
| `--color-border-strong` | semantic |  | Loading spinner track. |
| `--font-body`, `--text-md`, `--leading-tight` | semantic |  | Table type. |
| `--space-2`, `--space-3`, `--space-4`, `--space-10` | semantic |  | Toolbar and footer padding, gaps, and the condition area padding. |

## Template

```html
<div class="frame">
  <div class="toolbar"><slot name="toolbar"></slot></div>
  <div class="scroll">
    <div class="table" role="table" aria-label="{{caption}}">
      <div class="head" role="row"><slot name="columns"></slot></div>
      <slot></slot>
    </div>
  </div>
  <div class="condition empty"><slot name="empty"><span class="default">No items to show.</span></slot></div>
  <div class="condition loading"><span class="spinner"></span>Loading…</div>
  <div class="condition denied"><ui-icon name="eye" size="large"></ui-icon>You don't have permission to see these items.</div>
  <div class="footer"><slot name="footer"></slot></div>
</div>
```

## Style

```css
:host { display: block; --table-cell-py: var(--space-3); --table-cell-px: var(--space-4); }
:host([density="compact"]) { --table-cell-py: var(--space-2); --table-cell-px: var(--space-3); }
.toolbar { display: none; align-items: center; justify-content: space-between; gap: var(--space-3); flex-wrap: wrap; padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--color-border); }
:host([data-filled~="toolbar"]) .toolbar { display: flex; }
.scroll { overflow-x: auto; }
.table { display: table; width: 100%; border-collapse: collapse; font: var(--text-md) / var(--leading-tight) var(--font-body); color: var(--color-text); }
.head { display: table-row; }
.condition { display: none; flex-direction: column; align-items: center; justify-content: center; gap: var(--space-2); padding: var(--space-10) var(--space-4); color: var(--color-text-muted); text-align: center; }
:host([state~="empty"]) .empty, :host([state~="loading"]) .loading, :host([state~="no-permission"]) .denied { display: flex; }
:host([state~="loading"]) .loading { flex-direction: row; }
:host([state~="empty"]) ::slotted(ui-table-row), :host([state~="loading"]) ::slotted(ui-table-row), :host([state~="no-permission"]) ::slotted(ui-table-row) { display: none; }
:host([state~="no-permission"]) .denied ~ .footer, :host([state~="loading"]) .footer { display: none; }
.spinner { width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--color-border-strong); border-right-color: transparent; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.footer { display: none; align-items: center; padding: var(--space-3) var(--space-4); }
:host([data-filled~="footer"]) .footer { display: flex; }
.footer ::slotted(*) { flex: 1; }
```

## Example

```xml
<ui-table caption="Jobs">
  <ui-box slot="toolbar" layout="row" gap="2" align="center">
    <ui-text-field icon="search" placeholder="Search jobs"/>
    <ui-select placeholder="Any status"/>
  </ui-box>
  <ui-table-column shrink=""><ui-checkbox indeterminate="" aria-label="Select all"/></ui-table-column>
  <ui-table-column sortable="" sort="ascending">Job</ui-table-column>
  <ui-table-column sortable="">Customer</ui-table-column>
  <ui-table-column>Status</ui-table-column>
  <ui-table-column sortable="" align="end">Value</ui-table-column>
  <ui-table-row href="#">
    <ui-table-cell><ui-checkbox checked=""/></ui-table-cell>
    <ui-table-cell tone="strong">Blocked drain</ui-table-cell>
    <ui-table-cell>Aroha Ngata</ui-table-cell>
    <ui-table-cell><ui-badge tone="info" label="Scheduled"/></ui-table-cell>
    <ui-table-cell align="end">$240.00</ui-table-cell>
  </ui-table-row>
  <ui-table-row href="#" state="hover">
    <ui-table-cell><ui-checkbox/></ui-table-cell>
    <ui-table-cell tone="strong">Heat pump service</ui-table-cell>
    <ui-table-cell>Sam Liu</ui-table-cell>
    <ui-table-cell><ui-badge tone="danger" label="Overdue"/></ui-table-cell>
    <ui-table-cell align="end">$180.00</ui-table-cell>
  </ui-table-row>
  <ui-pagination page="1" pages="7" summary="1–20 of 134"/>
</ui-table>
```
