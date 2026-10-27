---
component: jui-multi-check-control
component-version: 2
target: jui
---

# jui-multi-check-control → JUI

## Maps to

The **MultiCheckControl** control, `com.effacy.jui.ui.client.control.MultiCheckControl<V>` (value type `V`), a
pill of options exactly one of which is on. Despite the name, its options are radio inputs sharing one name.

```java
Controls.<String>checkMulti(cfg -> {
    cfg.option("day", "Day");
    cfg.option("week", "Week");
    cfg.option("month", "Month");
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| (default slot) | `cfg.option(value, label)` per option | The `data-selected` option is the value: `ctl.setValue("week")`. A `null` value, or none set, selects the first option. |
| label | `cfg.label(…)` | |
| bold | `cfg.labelBold()` | |
| reverse | (no `cfg.left()`) | JUI puts the pill first and the label after it unless `cfg.left()`, so the mockup's default (label first) is `cfg.left()` and `reverse` is JUI's default. |
| expand | `cfg.expand()` | |
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

JUI has no multi-select pill. A mockup with several segments `data-selected` can't be built with this control:
redraw it as a checkbox `jui-selection-group-control` (`Controls.checkGroup`) or a `jui-multi-selection-control`,
or, if the pill is wanted, as an application component mapped to a control of the application's own (one drawn
with the `--jui-multicheckctl-*` variables matches this look).

JUI has no token for the inline label's size: it inherits the surrounding text. Until JUI adds `--jui-multicheckctl-label-size` (see `CHANGELOG.md`), size it with CSS on the control (`.css("font-size: …")`) where it must differ from the surrounding text.

JUI has variants beyond the standard look (`PANEL`, `SEGMENTED`, `INLINE`, per the stylesheet comments) that
retune the `--jui-multicheckctl-*` tokens; `nowrap(true)` stops labels wrapping.
