# Data table

## Purpose and when to use it

Finding, comparing and acting on records of one kind — jobs, customers, invoices — in a table. Use it when the
records share fields that people scan and compare. Use the **Card gallery** when items are visual or are browsed
rather than compared.

## Components

`ui-panel` (with `padding="none"`), `ui-table`, `ui-table-column`, `ui-table-row`, `ui-table-cell`,
`ui-text-field` (search), `ui-select` and `ui-chip` (filters), `ui-checkbox` (selection), `ui-button` (actions),
`ui-badge` (status), `ui-pagination`, `ui-empty-state`.

## Supported variations

| Variation | Optional | Depends on |
| --- | --- | --- |
| Search | yes | — |
| Filters | yes | — |
| Selection and bulk actions | yes | At least one action that applies to several records. |
| Row actions | yes | At most two; the rest belong on the record's page. |
| Pagination | yes | More than one page of records. |

A small reference table may have none of these and is still this pattern.

## Arrangement rules

| Area | Rule |
| --- | --- |
| Page | The table sits in a panel titled with the record type ("Jobs"); the panel's actions hold the create action. |
| Toolbar | In the table's `toolbar` slot: search first, then filters, left-aligned. |
| Bulk actions | When rows are selected, the toolbar is replaced by "*n* selected" and the bulk actions. |
| Columns | Selection first (if any), then the naming column (`tone="strong"`), then the rest; numbers and dates aligned to the end; row actions last. |
| Sorting | In the column headers, one active sort at a time (shared **Sortable columns** behaviour). |
| Opening | Rows with `href` open the record's page. |
| Pagination | In the table's `footer` slot, below the rows. |

## States and data conditions

| Condition | Handling |
| --- | --- |
| Loading | The table's `loading` state; toolbar stays. |
| Nothing yet | A page state (`<name>.empty.xml`) with an empty state inviting creation; no toolbar. |
| Nothing matches | The table's `empty` state with "No *records* match these filters" and Clear filters. |
| Error | The table's `empty` slot with an error message and Retry. |
| No permission | The table's `no-permission` state. |

## Accessibility

Focus order: search, filters, column headers, rows, pagination. Selection count and result counts are
announced. Sort direction is shown by arrows, status by words in badges.

## Rules of use

- Keep column order the same for the same record type everywhere, so people learn it once.
- Don't hide filters in a menu when there are three or fewer; show them in the toolbar.
- Don't put the create action in the toolbar; it belongs to the panel, because it is not about the current rows.

## Example

```xml
<ui-panel title="Jobs" padding="none">
  <ui-button slot="actions" variant="primary" icon="plus" label="New job"/>
  <ui-table caption="Jobs">
    <ui-box slot="toolbar" layout="row" gap="2" align="center">
      <ui-text-field icon="search" placeholder="Search jobs"/>
      <ui-select placeholder="Any status"/>
    </ui-box>
    <ui-table-column sortable="" sort="ascending">Job</ui-table-column>
    <ui-table-column>Status</ui-table-column>
    <ui-table-column align="end">Value</ui-table-column>
    <ui-table-row href="job.xml">
      <ui-table-cell tone="strong">Blocked drain</ui-table-cell>
      <ui-table-cell><ui-badge tone="info" label="Scheduled"/></ui-table-cell>
      <ui-table-cell align="end">$240.00</ui-table-cell>
    </ui-table-row>
    <ui-pagination page="1" pages="3" summary="1–20 of 52"/>
  </ui-table>
</ui-panel>
```
