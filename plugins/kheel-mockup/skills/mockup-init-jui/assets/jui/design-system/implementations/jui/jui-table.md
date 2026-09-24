---
component: jui-table
component-version: 1
target: jui
---

# jui-table → JUI

## Maps to

The **Table** component, `com.effacy.jui.ui.client.table.Table<R>`, created with
`com.effacy.jui.ui.client.table.TableCreator` — a component over a store (`IStore<R>`, usually a
`PaginatedStore`). Columns (`jui-table-column`) are declared on the config with `header(…)`; rows and cells are
not declared — JUI renders one row per record in the store and fills each cell with its column's renderer.

```java
Table<Member> table = TableCreator.build (cfg -> {
    cfg.selectable ();
    cfg.onclick (r -> open (r));
    cfg.header ("Name", h -> {
        h.renderer (LinkTableCellHandler.create (r -> r.getName (), r -> open (r)));
        h.sortable (SortDirection.ASC, dir -> store.query (q -> q.sortByName (dir))).sorted ();
        h.width (Length.em (14));
    });
    cfg.header ("Email", h -> {
        h.icon (FontAwesome.envelope ());
        h.renderer (TextTableCellRenderer.create (r -> r.getEmail ()));
    });
}, store);
add (table);
store.load (0, 20);
```

`TableCreator.$(parent, cfg -> …, store)` inserts it into a DOM builder instead.

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| variant | `cfg.variant (Table.Config.Variant.PANEL)` | `standard` is the default (no call). |
| selectable | `cfg.selectable ()` | Selection goes to the store's selection (`IStoreSelection`); the store must support it. |
| clickable | `cfg.onclick (r -> …)` | The `href`/`opens` on the mockup's rows is what the handler does. |
| loading | — | Automatic: the table listens to the store and shows the mask while it loads; `quiet` is used for loads after the first. `showLoading(boolean quiet)` / `hideLoading()` exist on `Table` if needed by hand. |
| empty | `cfg.emptyUnfiltered (…)`, `cfg.emptyFiltered (…)`, `cfg.emptyError ((el, msg) -> …)` | The state itself is automatic from the store's status after a load (`ERROR`, empty with `FILTERED`, empty otherwise). The config methods only replace the notices. |
| error-message | — | Comes from `IStore.getStatusMessage()`. |

## Slots

| Slot | Maps to |
| --- | --- |
| columns | One `cfg.header (label, h -> …)` per `jui-table-column`, in order. |
| default | Records in the store; each `jui-table-row` is one record, and each `jui-table-cell` is what that column's `renderer(…)` draws. |
| empty | The content of `emptyUnfiltered` / `emptyFiltered` / `emptyError`: build it with `EmptyNotification.buildPanel (el, new EmptyNotification (panel -> …))`. |

## States

Loading, empty, filtered-empty and error states are driven by the store's load cycle; nothing needs wiring beyond
supplying the store and, if the default wording is not wanted, the empty renderers. The table re-renders on store
change and requests the next page when scrolled to the bottom (`IPaginatedStore.loadNext`).

## Notes

- `scrollable` is on by default: the table fills its container's height, the header is sticky
  (`--cpt-tbl-sticky-bg`) and the body scrolls. Give the table a bounded height (e.g. add it to a panel that
  fills the page) or call `cfg.scrollable (false)`.
- Theme with the `--cpt-tbl-*` tokens (`cfg.css ("--cpt-tbl-…: …")`) or the `--jui-comp-table-*` family tokens.
- `cfg.cellPadding (Insets)` and `cfg.color (Color)` also exist for quick adjustments.
- Sort icons are configurable with `cfg.iconAscending (…)`, `iconDescending (…)`, `iconSortable (…)`.
