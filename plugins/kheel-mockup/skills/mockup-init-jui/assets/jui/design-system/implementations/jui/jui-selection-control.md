---
component: jui-selection-control
component-version: 1
target: jui
---

# jui-selection-control → JUI

## Maps to

The **SelectionControl** control, `com.effacy.jui.ui.client.control.SelectionControl<V>`, over a fixed list or a
store (see JUI's `cpt_selection.md`).

```java
// Fixed values:
Controls.<String>selector(cfg -> {
    cfg.allowSearch(false);
    cfg.placeholder("Title");
}, "Dr", "Mr", "Other");

// A store, with labels:
Controls.<Person>selector(cfg -> {
    cfg.store(peopleStore);
    cfg.labelMapper(p -> p.getName());
    cfg.allowEmpty();
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| value | `ctl.setValue(v)` | The mockup shows the value's label (`labelMapper`, or `toString()`). |
| placeholder | `cfg.placeholder(…)` | |
| icon-left | `cfg.iconLeft(…)` | Check. |
| prompt | `cfg.prompt(…)` | The stylesheet has `span.prompt`; check the method name. |
| allow-empty | `cfg.allowEmpty()` | |
| hide-search | `cfg.allowSearch(false)` | |
| keywords | — | Typed by the user; filters an `IFilteredStore`, or is passed to an `ISearchStore` via `filter(keywords)`. |
| empty-message | `cfg.emptyUnfiltered(…)` / `cfg.emptyFiltered(…)` | Check these exist on this control's configuration; the store's `onSuccess(…, filtered)` flag decides which applies. |
| disabled, read-only, invalid, waiting | as for `jui-text-control` | |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The store's items (`ListStore` for fixed values, a `PaginatedStore` / `ISearchStore` for remote ones), labelled by `labelMapper`. `data-active` is the keyboard highlight, not configuration. |

## States

| State | How in JUI |
| --- | --- |
| focus, hover | Handled by the control's stylesheet (JUI toggles the `focus` style class as the input gains focus). |
| disabled | `ctl.disable()` / `ctl.enable()`, or `disable("ref")` / `enable("ref")` on a `ControlForm`. |
| read-only | Configuration `readOnly()` (verified in docs for `TextControl`); at runtime check `readOnly(boolean)` on the control. |
| invalid | Set by validation: `cfg.validator(…)` then `validate()`, or externally via `ctl.invalidator().invalidate(…)` / `accept(errors)` for server errors (paths matched by `name(…)` / `acceptor(…)`). The messages are displayed by the enclosing `ControlForm` cell or `ControlField`, not by the control. |
| waiting | `ctl.waiting(true)` while its value loads, `waiting(false)` after `setValue(…)`; `controls().waiting(…)` on a component does it for all its controls. |
| empty / filled | Follows the value: `setValue(…)` assigns it without dirtying; `value()` reads it. |
| open | Opened by clicking the control; not set directly. |

## Notes

The menu (`SelectorMenu`) floats beneath the control (above it when there is no room); the mockup draws it in
the flow. `cfg.clearStore(true)` reloads a paginated store on reset; `cfg.storeBatchSize(n)` overrides its page
size. Tokens: `--cpt-selectctl-*` (with optional `--jui-selectctl-*` overrides).
