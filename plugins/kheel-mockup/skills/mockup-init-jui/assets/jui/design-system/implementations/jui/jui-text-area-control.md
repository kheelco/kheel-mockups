---
component: jui-text-area-control
component-version: 1
target: jui
---

# jui-text-area-control → JUI

## Maps to

The **TextAreaControl** control, `com.effacy.jui.ui.client.control.TextAreaControl` (value type `String`).

```java
Controls.textarea(cfg -> {
    cfg.name("description");
    cfg.rows(5);
    cfg.validator(LengthValidator.validator(0, 400, "cannot exceed {max} characters"));
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| value | `ctl.setValue(…)` | |
| placeholder | `cfg.placeholder(…)` | |
| rows | `cfg.rows(n)` | |
| icon-right | `cfg.iconRight(…)` | Check the method name. |
| counter, counter-limit | character counter configuration | JUI renders a `.counter` (turning `.limit` at the maximum) when a maximum length is configured; check the configuration method (for example `maxLength(…)` / `counter(…)`). The mockup's text is illustrative. |
| resizable | `cfg.resizable()` | Adds the `resizable` style; check the method name. |
| disabled | `ctl.disable()` | |
| read-only | `cfg.readOnly()` | Check for this control. |
| invalid | validators / `invalidator().invalidate(…)` | |
| waiting | `ctl.waiting(true)` | |

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

Label it through a `ControlForm` cell or a `ControlField`. Tokens: `--cpt-textareactl-*` (with optional
`--jui-textareactl-*` overrides in JUI) and the `--jui-comp-control-*` family.
