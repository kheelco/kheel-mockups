---
component: jui-control-form-row
component-version: 1
target: jui
---

# jui-control-form-row → JUI

## Maps to

A row of a `ControlForm` group: `IRowBuilder` (implemented by `RowBuilder`), created with `row(…)`.

```java
row(row -> {
    row.control("Owner / operator", Controls.selector(cfg -> cfg.placeholder("Select person")), cell -> cell.grow(1));
    row.component(ButtonCreator.build(cfg -> cfg.label("Add new").iconOnLeft().icon(FontAwesome.plus())));
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| no-labels | — | JUI marks the row `nolabel` itself when none of its cells has a label. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | `row.control(…)` cells, `row.component(…)` cells, and `row.expander()` (an empty growing cell). |

## States

None.

## Notes

`row.adjustPrior(Length…)` tightens or opens the space above a row. A single-cell row is usually written with the
group's `control(…)` shortcut.
