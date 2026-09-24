---
component: jui-number-control
component-version: 1
target: jui
---

# jui-number-control → JUI

## Maps to

The **NumberControl** control, `com.effacy.jui.ui.client.control.NumberControl`.

```java
Controls.number(cfg -> {
    cfg.name("hours");
    cfg.width(Length.em(10));
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| value | `ctl.setValue(…)` | The value type is numeric (check whether `Long`, `Integer` or `Double` for the JUI version in use). |
| placeholder | `cfg.placeholder(…)` | |
| disabled, read-only, invalid, waiting | as for `jui-text-control` | |

Minimum, maximum and step are configured on `NumberControl.Config` (check the method names, for example
`min(…)`, `max(…)`, `step(…)`); they don't change the mockup.

## Slots

None.

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

Width: JUI controls take the width of their container; fix it with `cfg.width(Length…)` for short numbers.
Tokens: `--jui-numberctl-*` (set on the control) and the `--jui-ctl-*` legacy family.
