---
component: jui-table-column
component-version: 1
target: jui
---

# jui-table-column → JUI

## Maps to

A column header of the **Table**: `Table.Config.Header` (inner class of
`com.effacy.jui.ui.client.table.Table.Config`), declared with `header(label, h -> …)` on the table's config. It is
configuration, not a component.

```java
cfg.header ("Name", h -> {
    h.icon (FontAwesome.user ());
    h.renderer (TextTableCellRenderer.create (r -> r.getName ()));
    h.sortable (SortDirection.ASC, dir -> store.query (q -> q.sort ("name", dir))).sorted ();
    h.width (Length.em (14));
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| label | `header (label, …)` | |
| icon | `h.icon (…)` | A FontAwesome class; see the `jui-icon` mapping for names. |
| sortable | `h.sortable (SortDirection, Consumer<SortDirection>)` | The handler must re-sort the store (e.g. re-query it). The direction is the one used when the column is first activated. |
| sort | `h.sorted ()` | Marks the column sorted when the table first renders; `ascending`/`descending` is the direction passed to `sortable(…)`. Afterwards the table manages it. |
| column-width | `h.width (Length.em (n))` | `narrow` 4em, `small` 6em, `medium` 10em, `large` 14em, `wide` 20em; `auto` → no call. `h.minWidth (Length)` also exists (switches the table to `table-layout: auto`). |

## Slots

None.

## States

The sort indicator is maintained by the table: clicking a sortable header activates or toggles it and calls the
handler. `Table.sort (header, direction, quiet)` sets it programmatically.

## Notes

JUI's default icons are `FontAwesome.arrowDown()` (ascending), `arrowUp()` (descending) and `arrowsUpDown()`
(sortable, unsorted); the mockup approximates the last with a chevrons-up-down icon. Every column needs a
`renderer(…)` — see `jui-table-cell`.
