---
component: jui-text-control
component-version: 1
target: jui
---

# jui-text-control → JUI

## Maps to

The **TextControl** control, `com.effacy.jui.ui.client.control.TextControl` (value type `String`), created through
the `Controls` helper (or `TextControlCreator`).

```java
TextControl ctl = Controls.text(cfg -> {
    cfg.placeholder("Search");
    cfg.iconLeft(FontAwesome.magnifyingGlass());
    cfg.clearAction();
    cfg.name("keywords");
    cfg.validator(NotEmptyValidator.validator("please enter your name"));
});
ctl.setValue("Jill Jones");
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| value | `ctl.setValue(…)` | Read back with `ctl.value()`. |
| placeholder | `cfg.placeholder(…)` | |
| icon-left | `cfg.iconLeft(FontAwesome.…())` | See the `jui-icon` mapping for icon names. |
| icon-right | `cfg.iconRight(…)` | Check the method name for the JUI version in use. |
| clear-action | `cfg.clearAction()` | |
| password | `cfg.password()` | The control renders `type=password` when configured for password capture; check the exact method name. |
| disabled | `ctl.disable()` | |
| read-only | `cfg.readOnly()` | |
| invalid | validators / `invalidator().invalidate(…)` | Not a configuration property; see States. |
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

The control has no label: in a form use `row.control("Label", Controls.text(…), cell -> …)`
(`jui-control-form-cell`), elsewhere `ControlField` (`jui-control-field`). Restyle through the `--cpt-textctl-*`
tokens (per instance `cfg.css("--cpt-textctl-…: …")`) or the family tokens `--jui-comp-control-*`; JUI also
offers `TextControl.Config.Style` / variants (for example `Style.STANDARD`) and project `Variants`. JUI's
stylesheet reads optional `--jui-textctl-*` overrides before the family tokens; the mockup goes straight to the
family tokens. For keyword search boxes wrap the modified handler in `DelayedModifiedHandler.create(300, …)`.
