---
component: jui-text-search-control
component-version: 1
target: jui
---

# jui-text-search-control → JUI

## Maps to

The **TextSearchControl** control, `com.effacy.jui.ui.client.control.TextSearchControl<S>`: a text input that
searches a fixed list or a store of candidates and offers matches in its `SearchMenu`.

```java
// Over a fixed set of candidates (placed in a ListStore by the helper):
Controls.textsearch(cfg -> {
    cfg.placeholder("Start typing a suburb");
}, "Sydney", "Sydenham", "North Sydney");

// Over a store:
Controls.<Suburb>textsearch(cfg -> cfg.store(suburbStore));
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| value | `ctl.setValue(…)` | |
| placeholder | `cfg.placeholder(…)` | |
| icon-left, icon-right | `cfg.iconLeft(…)`, `cfg.iconRight(…)` | Check they exist on this control's configuration. |
| clear-action | `cfg.clearAction()` | Check. |
| empty-message | — | Check how the search menu's empty text is configured. |
| (default slot) | `cfg.store(…)` or the helper's varargs values | The listed matches are the store's filtered contents. |
| disabled, read-only, invalid, waiting | as for `jui-text-control` | |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The candidates matching the typed text, supplied by the store (`ListStore`, or an `ISearchStore` for remote search). |

## States

| State | How in JUI |
| --- | --- |
| focus, hover | Handled by the control's stylesheet (JUI toggles the `focus` style class as the input gains focus). |
| disabled | `ctl.disable()` / `ctl.enable()`, or `disable("ref")` / `enable("ref")` on a `ControlForm`. |
| read-only | Configuration `readOnly()` (verified in docs for `TextControl`); at runtime check `readOnly(boolean)` on the control. |
| invalid | Set by validation: `cfg.validator(…)` then `validate()`, or externally via `ctl.invalidator().invalidate(…)` / `accept(errors)` for server errors (paths matched by `name(…)` / `acceptor(…)`). The messages are displayed by the enclosing `ControlForm` cell or `ControlField`, not by the control. |
| waiting | `ctl.waiting(true)` while its value loads, `waiting(false)` after `setValue(…)`; `controls().waiting(…)` on a component does it for all its controls. |
| empty / filled | Follows the value: `setValue(…)` assigns it without dirtying; `value()` reads it. |
| open | Opened by the control when typing finds matches; not set directly. |

## Notes

The menu floats beneath the input in JUI (`#selector`, above it when there is no room — `selector_top`); the
mockup draws it in the flow. The value is the text, so validate it if only candidates are acceptable, or use
`SelectionControl`.
