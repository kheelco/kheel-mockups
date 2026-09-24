---
component: jui-table-cell
component-version: 1
target: jui
---

# jui-table-cell → JUI

## Maps to

The output of the column's cell renderer, an `ITableCellRenderer<R>` (`com.effacy.jui.ui.client.table`) set with
`header.renderer(…)`. Standard renderers live in `com.effacy.jui.ui.client.table.renderer`.

```java
h.renderer (TextTableCellRenderer.create (r -> r.getRole ()));
h.renderer (LinkTableCellHandler.create (r -> r.getName (), r -> open (r)));
h.renderer (BuilderTableCellRenderer.create ((cell, r) -> {
    Btn.$ (cell, "Edit").icon (FontAwesome.pencil ()).onclick (() -> edit (r));
}));
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| renderer | `TextTableCellRenderer.create (…)` / `LinkTableCellHandler.create (value, handler)` / `BuilderTableCellRenderer.create ((cell, r) -> …)` | `text` / `link` / `builder`. |
| alignment | CSS on the rendered content | No config method: in a builder renderer, e.g. `Div.$ (cell).css ("text-align: right;").text (…)`. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The value passed to the text or link renderer, or the DOM built by the builder renderer. |

## States

Link hover is the browser's link styling under the theme.

## Notes

Events from a builder cell are handled by the cell (`ITableCellHandler`), so buttons in cells work without
triggering the row's `onclick`. Use `ITableCellRenderer.convert (…)` to reuse a renderer over a property of the
record.
