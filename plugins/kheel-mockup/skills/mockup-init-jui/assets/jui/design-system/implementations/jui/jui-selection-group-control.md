---
component: jui-selection-group-control
component-version: 1
target: jui
---

# jui-selection-group-control → JUI

## Maps to

The **SelectionGroupControl** control, `com.effacy.jui.ui.client.control.SelectionGroupControl<V>` (value type
`List<V>`), created as a checkbox group (`Controls.checkGroup`) or a radio group (`Controls.radioGroup`, which
calls `radio()`).

```java
Controls.<String>radioGroup(cfg -> {
    cfg.option("option1", FontAwesome.users(), "Public to organisation", null);
    cfg.option("option2", FontAwesome.lock(), "Private to me", null);
    cfg.validator(NotEmptyValidator.validator("please select an option"));
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| type | `Controls.checkGroup` (check) / `Controls.radioGroup` or `cfg.radio()` (radio) | |
| variant | `cfg.style(SelectionGroupControl.Config.Style.…)` | `standard` → default; `vertical` → `VERTICAL`; `survey` → `SURVEY`. The stylesheets `SelectionGroupControl_Vertical.css` and `_Survey.css` exist; check the constant names. |
| (default slot) | `cfg.option(value, icon, label, description)` | Also `option(value, label, description)`. `data-selected` options are those in the value (`ctl.setValue(ListSupport.list("option1"))`); `data-indented` and `data-disabled` map to per-option indent and disable settings (check). |
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

The mockup draws checkboxes and radios in the control active colour; JUI renders native inputs.
