---
component: jui-panel-selection-control
component-version: 1
target: jui
---

# jui-panel-selection-control → JUI

## Maps to

The **PanelSelectionControl** control, `com.effacy.jui.ui.client.control.PanelSelectionControl` — a
multi-selection rendered as a grid of selectable tiles. It has no `Controls` factory; construct it through its
`Config` (check the configuration API — its source and styles were not available when this mapping was written).

```java
// Check: configuration methods for options, columns and tile content.
PanelSelectionControl<String> ctl = new PanelSelectionControl.Config<String>()
    /* options … */
    .build();
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| columns | — | Check how the grid's column count is configured. |
| (default slot) | the options | `data-selected` tiles are those in the value (`setValue(…)`). |
| disabled, read-only, invalid, waiting | as for `jui-text-control` | |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The options (tiles). |

## States

| State | How in JUI |
| --- | --- |
| focus, hover | Handled by the control's stylesheet (JUI toggles the `focus` style class as the input gains focus). |
| disabled | `ctl.disable()` / `ctl.enable()`, or `disable("ref")` / `enable("ref")` on a `ControlForm`. |
| read-only | Configuration `readOnly()` (verified in docs for `TextControl`); at runtime check `readOnly(boolean)` on the control. |
| invalid | Set by validation: `cfg.validator(…)` then `validate()`, or externally via `ctl.invalidator().invalidate(…)` / `accept(errors)` for server errors (paths matched by `name(…)` / `acceptor(…)`). The messages are displayed by the enclosing `ControlForm` cell or `ControlField`, not by the control. |
| waiting | `ctl.waiting(true)` while its value loads, `waiting(false)` after `setValue(…)`; `controls().waiting(…)` on a component does it for all its controls. |
| empty / filled | Follows the value: `setValue(…)` assigns it without dirtying; `value()` reads it. |

## Notes

The mockup's tile look is an approximation based on JUI's selection styles; follow JUI's own rendering.
