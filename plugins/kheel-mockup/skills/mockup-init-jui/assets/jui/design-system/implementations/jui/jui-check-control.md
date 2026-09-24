---
component: jui-check-control
component-version: 1
target: jui
---

# jui-check-control → JUI

## Maps to

The **CheckControl** control, `com.effacy.jui.ui.client.control.CheckControl` (value type `Boolean`).

```java
control(null, Controls.check(cfg -> {
    cfg.label("I have some additional information to add");
    cfg.modifiedHandler((ctl, val, prior) -> {
        if (val) show("extrainfo"); else hide("extrainfo");
    });
}));
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| label | `cfg.label(…)` | |
| description | `cfg.description(…)` | The stylesheet has `label > span.description`; check the method name. |
| checked | `ctl.setValue(true)` | |
| toggle | toggle (slider) presentation | The stylesheet's `.item.toggle` with `--cpt-checkctl-toggle-*` tokens; check the configuration method (for example a `toggle()` flag or a style/variant). |
| reverse, expand, bold | `.item.reverse`, `.item.expand`, `.item.bold` presentation | Check the configuration methods. |
| disabled, read-only, invalid, waiting | as for `jui-text-control` | |

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

In a form put it in a cell without a label (`row.control(null, Controls.check(…))`); its own label names it.
Per-instance restyling: `cfg.css("--cpt-checkctl-text: …")` or `cfg.styles("my-checkctl")`. The mockup draws the
checkbox in the control active colour; JUI renders a native checkbox.
