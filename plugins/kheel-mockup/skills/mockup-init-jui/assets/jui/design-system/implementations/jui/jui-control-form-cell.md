---
component: jui-control-form-cell
component-version: 1
target: jui
---

# jui-control-form-cell → JUI

## Maps to

A cell of a `ControlForm` row: `IControlCell`, configured by the last argument of `row.control(…)` (or the
group's `control(…)` shortcut).

```java
row.control("email", "Email", Controls.text(cfg -> {
    cfg.validator(EmailValidator.validator("please enter a valid email address")); // check validator name
}), cell -> {
    cell.grow(1);
    cell.required();
    cell.guidance("We'll never share it.");
    cell.help("Used to sign in.");
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| label | the `label` argument of `control(…)` | `null` for none. |
| (grow attribute) | `cell.grow(1)` | Larger numbers are relative flex weights. |
| required | `cell.required()` | Presentation only — add a validator too. |
| help | `cell.help(…)` | |
| guidance | `cell.guidance(…)` | |
| guidance-top | top guidance | The stylesheet has `div.guidance_top`; check the configuration method. |
| error | — | Shown automatically from the control's invalidation. |
| disabled | `cell.disable()` | Or `disable("ref")` at runtime. |
| right-align | `cell.rightAlign()` | |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The `control` argument of `control(…)`, or a component via `row.component(…)`. |

## States

Error and disabled follow the control; help opens on hover.

## Notes

`cell.by("ref")` gives the control a soft reference for `value(ref)` / `set(ref, …)`; `cell.offset(dy, dx)`
nudges the contents. Hiding the control hides the whole cell.
