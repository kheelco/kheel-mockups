---
name: jui-table-column
version: 1.0.0
kind: composed
status: active
summary: Table column component — one column header of a Table, with its title, icon, width and sort indicator.
---

# Table column (component)

## Purpose

Represents one column of JUI's **Table**: a header declared with `Table.Config.header(label, header -> …)`
(JUI's `Table.Config.Header`). It gives the column its title, an optional icon, a width and, when sortable, the
sort indicator; the cells beneath it are drawn by the header's cell renderer (see `jui-table-cell`). It exists
only inside a `jui-table`, which places it in the header row; it is not a component in its own right in JUI.

## Anatomy

A header cell holding an optional leading icon (`jui-icon`), the title (one line, truncated with an ellipsis) and,
when sortable, a sort indicator (`jui-icon`): an up-down arrow while unsorted, a down arrow when ascending, an up
arrow when descending.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The column title (`header(label)`). |
| icon | content | icon | | Optional icon before the title (`icon(…)`). |
| sortable | variant | boolean | | The column can be sorted (`sortable(direction, handler)`); shows the sort indicator and a pointer cursor. |
| sort | state | none, ascending, descending | none | The column's active sort, if it is the sorted column (`sorted()` for the initial one). |
| column-width | variant | auto, narrow, small, medium, large, wide | auto | Fixed column width (`width(Length)`): 4, 6, 10, 14 or 20 em; `auto` shares the remaining width. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| sortable | on | Columns people order by: names, dates, amounts. |
| column-width | auto | Text columns that should take up the slack. |
| column-width | narrow, small | Short codes, numbers, dates, status. |
| column-width | medium, large, wide | Names and titles that deserve a guaranteed width. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Sort | unsorted | `sort="none"` | Sortable columns show the up-down indicator in the sort indicator colour. |
| Sort | ascending | `sort="ascending"` | Down arrow in the header text colour. |
| Sort | descending | `sort="descending"` | Up arrow in the header text colour. |

## Behaviour

Clicking a sortable header sorts the table by that column in its default direction, or toggles the direction if
it is already the sorted column; the other columns return to unsorted. The sort itself is done by the column's
sort handler on the store (see `jui-table`).

## Content rules

A short noun or noun phrase in sentence case, without trailing punctuation. Icons only where they aid scanning.

## Accessibility

Renders as a `th` in JUI. The title is text, so the column is announced by it; an icon beside it is decorative.

## Rules of use

- Only mark a column `sortable` if the store can sort by it.
- Set `sort` on at most one column per table.
- Give fixed widths to short columns and leave the main text column `auto`.

## Tokens

The tokens the style uses. All are set by the enclosing `jui-table` (its `--cpt-tbl-*` layer), so a table
variant restyles its headers.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-tbl-header-padding`, `--cpt-tbl-header-border` | inherited | | Cell padding and the divider under the header row. |
| `--cpt-tbl-header-gap` | inherited | | Gap between icon, title and indicator. |
| `--cpt-tbl-header-color`, `--cpt-tbl-header-font-size`, `--cpt-tbl-header-font-weight`, `--cpt-tbl-header-text-transform`, `--cpt-tbl-header-letter-spacing` | inherited | | Title typography. |
| `--cpt-tbl-header-icon-color` | inherited | | Leading icon colour. |
| `--cpt-tbl-sort-indicator-color` | inherited | | Unsorted indicator colour. |

## Template

```html
<div class="th">
  <jui-icon class="icon" data-if="icon" name="{{icon}}"></jui-icon>
  <span class="header">{{label}}</span>
  <span class="sorter" data-if="sortable">
    <jui-icon class="sortable" name="chevrons-up-down"></jui-icon>
    <jui-icon class="ascending" name="arrow-down"></jui-icon>
    <jui-icon class="descending" name="arrow-up"></jui-icon>
  </span>
</div>
```

## Style

```css
:host {
  display: table-cell;
  vertical-align: middle;
  padding: var(--cpt-tbl-header-padding);
  border-bottom: var(--cpt-tbl-header-border);
}
:host([sortable]) { cursor: pointer; }
:host([column-width="narrow"]) { width: 4em; }
:host([column-width="small"]) { width: 6em; }
:host([column-width="medium"]) { width: 10em; }
:host([column-width="large"]) { width: 14em; }
:host([column-width="wide"]) { width: 20em; }
.th {
  display: flex;
  gap: var(--cpt-tbl-header-gap);
  align-items: center;
  color: var(--cpt-tbl-header-color);
  font-size: var(--cpt-tbl-header-font-size);
  font-weight: var(--cpt-tbl-header-font-weight);
  text-transform: var(--cpt-tbl-header-text-transform);
  letter-spacing: var(--cpt-tbl-header-letter-spacing);
}
.header { flex-grow: 1; text-align: left; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; user-select: none; }
.icon { color: var(--cpt-tbl-header-icon-color); }
.sorter { display: inline-flex; width: 1em; }
.sorter jui-icon { display: none; }
:host([sort="none"]) .sorter .sortable { display: inline-flex; color: var(--cpt-tbl-sort-indicator-color); }
:host([sort="ascending"]) .sorter .ascending { display: inline-flex; }
:host([sort="descending"]) .sorter .descending { display: inline-flex; }
```

## Example

```xml
<jui-table>
  <jui-table-column label="Name" icon="user" sortable="" sort="ascending" column-width="large"/>
  <jui-table-column label="Updated" sortable="" sort="descending" column-width="medium"/>
  <jui-table-column label="Owner" sortable=""/>
  <jui-table-column label="Notes"/>
  <jui-table-row>
    <jui-table-cell>Quarterly report</jui-table-cell>
    <jui-table-cell>Today</jui-table-cell>
    <jui-table-cell>Ada Lovelace</jui-table-cell>
    <jui-table-cell>Draft for review</jui-table-cell>
  </jui-table-row>
</jui-table>
```
