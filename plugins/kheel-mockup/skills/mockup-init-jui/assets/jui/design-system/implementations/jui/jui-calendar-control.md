---
component: jui-calendar-control
component-version: 1
target: jui
---

# jui-calendar-control → JUI

## Maps to

The **CalendarControl** control, `com.effacy.jui.ui.client.control.CalendarControl`, a date picker.

```java
Controls.calendar(cfg -> {
    cfg.name("dueDate");
    cfg.placeholder("Select a date");
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| value | `ctl.setValue(…)` | Check the value type (a date object) and the display format for the JUI version in use. |
| placeholder | `cfg.placeholder(…)` | |
| clear-action | `cfg.clearAction()` | The stylesheet has a `clear` action; check the method name. |
| month, selected-day, today | — | Illustrate the open calendar only; JUI opens at the value's month and marks today itself. |
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
| open | Opened by clicking the field; not set directly. |

## Notes

The calendar floats beneath the field (or above, `selector_top`) and may show an extra column of quick picks
(`div.extra`); the mockup draws a plain month in the flow. The control is 16em wide by default. Tokens:
`--jui-calendarctl-*` and `--cpt-calendarctl-*`.
