---
component: jui-multi-check-control
component-version: 1
target: jui
---

# jui-multi-check-control → JUI

## Maps to

The **MultiCheckControl** control, `com.effacy.jui.ui.client.control.MultiCheckControl<V>` (value type
`List<V>`), a pill of independently toggled options.

```java
Controls.<String>checkMulti(cfg -> {
    cfg.option("mon", "Mon");
    cfg.option("tue", "Tue");
    cfg.option("wed", "Wed");
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| (default slot) | `cfg.option(value, label)` per option | `data-selected` options are those in the value: `ctl.setValue(List.of("mon", "wed"))`. |
| label | `cfg.label(…)` | Check for this control. |
| bold, reverse, expand | `.item.bold`, `.item.reverse`, `.item.expand` presentation | Check the configuration methods. |
| disabled, read-only, invalid, waiting | as for `jui-text-control` | |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The options, from `cfg.option(…)`. |

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

JUI has variants beyond the standard look (`PANEL`, `SEGMENTED`, `INLINE`, per the stylesheet comments) that
retune the `--jui-multicheckctl-*` tokens; `nowrap(true)` stops labels wrapping.
