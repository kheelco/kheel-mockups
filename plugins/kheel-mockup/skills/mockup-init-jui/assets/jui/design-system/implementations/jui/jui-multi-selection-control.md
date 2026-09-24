---
component: jui-multi-selection-control
component-version: 1
target: jui
---

# jui-multi-selection-control → JUI

## Maps to

The **MultiSelectionControl** control, `com.effacy.jui.ui.client.control.MultiSelectionControl<V>` (value type
`List<V>`).

```java
Controls.<String>multiselector(cfg -> {
    cfg.placeholder("Select teams");
}, "Design", "Engineering", "Marketing", "Research");
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| value | `ctl.setValue(List.of(…))` | Text display of the selection. |
| (chips slot) | chip presentation | JUI renders the selection as chips when configured for it (`.inner.chip`); check the configuration method. |
| placeholder | `cfg.placeholder(…)` | |
| allow-empty | `cfg.allowEmpty()` | Check for this control. |
| hide-search | `cfg.allowSearch(false)` | Check for this control. |
| keywords, empty-message | as for `jui-selection-control` | |
| disabled, read-only, invalid, waiting | as for `jui-text-control` | |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The store's items; `data-selected` marks items in the value. |
| chips | The value, one chip per selected item. |

## States

| State | How in JUI |
| --- | --- |
| focus, hover | Handled by the control's stylesheet (JUI toggles the `focus` style class as the input gains focus). |
| disabled | `ctl.disable()` / `ctl.enable()`, or `disable("ref")` / `enable("ref")` on a `ControlForm`. |
| read-only | Configuration `readOnly()` (verified in docs for `TextControl`); at runtime check `readOnly(boolean)` on the control. |
| invalid | Set by validation: `cfg.validator(…)` then `validate()`, or externally via `ctl.invalidator().invalidate(…)` / `accept(errors)` for server errors (paths matched by `name(…)` / `acceptor(…)`). The messages are displayed by the enclosing `ControlForm` cell or `ControlField`, not by the control. |
| waiting | `ctl.waiting(true)` while its value loads, `waiting(false)` after `setValue(…)`; `controls().waiting(…)` on a component does it for all its controls. |
| empty / filled | Follows the value: `setValue(…)` assigns it without dirtying; `value()` reads it. |
| open | Opened by clicking the control. |

## Notes

Menu items carry a checkbox (`li > input[type=checkbox]`). Tokens: `--jui-selectctl-*` set on the control.
