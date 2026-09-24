---
component: jui-table-row
component-version: 1
target: jui
---

# jui-table-row → JUI

## Maps to

Nothing to create: each row is one record `R` of the **Table**'s store, rendered by the table (its internal
`RecordWrapper`) as a `tr` with one `td` per header. Rows in a mockup describe the data the store must hold.

```java
// The rows come from the store backing the table.
store.load (0, 20);
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| selected | `((IStoreSelection<R>) store).select (record)` | The checkbox reflects `isSelected (record)` on the store's selection (`unselect (record)` clears it); the table must be `selectable()` and the store an `IStoreSelection`. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The cells: one per `header(…)`, drawn by that header's renderer. |

## States

Hover is CSS (`tr:hover td`, stronger when the table has `onclick`). Selection is kept by the table through the
store's selection.

## Notes

`href`/`opens` on a mockup row means the table's `cfg.onclick (r -> …)` handler; a click on the selector checkbox
or an interactive cell does not reach it.
