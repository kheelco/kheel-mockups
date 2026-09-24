---
component: jui-control-form
component-version: 1
target: jui
---

# jui-control-form → JUI

## Maps to

The **ControlForm** component, `com.effacy.jui.ui.client.control.builder.ControlForm<SRC,DST>` — usually extended
and configured in its constructor, or built inline with `ControlFormCreator`. It implements `IFormBuilder`,
`IGroupBuilder` (delegating to its top-level group) and `IModificationContext`.

```java
public class PersonForm extends ControlForm<Void, Void> {
    public PersonForm() {
        super(new ControlForm.Config().maxWidth(Length.px(500)));
        header(header -> {
            header.icon(FontAwesome.user());
            header.title("A simple form");
            header.instruction("This is a simple form for demonstration purposes");
        });
        row(row -> {
            row.control("firstName", "Your first name", Controls.text(cfg -> {
                cfg.validator(NotEmptyValidator.validator("please enter your first name"));
            }), cell -> cell.grow(1).required());
        });
        bar(bar -> bar.add(ButtonCreator.build(btn -> {
            btn.label("Submit");
            btn.handler(() -> { if (PersonForm.this.validate()) { /* … */ } });
        })));
    }
}
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| title, icon, instruction | `header(h -> h.title(…).icon(…).instruction(…))` | On the top-level group. |
| guidance | `footer(f -> f.guidance(…))` | |
| error | `validate()` failing, or `invalidate(List<? extends IErrorMessage>)` | The block's look can be replaced with `errorRenderer(…)` on the configuration. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The top-level group's body: `row(…)`, `control(…)` (a one-cell row), `group(…)` / `group2(…)` / `group3(…)`, `separator()`, and other content via `insert(…)` or DOM helpers (`Notice.$(this)…`). |
| bar | `bar(bar -> bar.add(…))`. In a dialog, use `ControlFormCreator.createForDialog()` and let the dialog provide the buttons. |

## States

Invalid: the error block appears when `validate()` returns `false` or after `invalidate(…)` with residual
messages; it clears on the next successful validation or `reset()`.

## Notes

Soft references (`cell.by("…")`, `control("ref", "Label", …)`) give access through the modification context:
`value(ref)`, `set(ref, v)`, `enable` / `disable` / `show` / `hide`, and `onBuild(…)`, `onReset(…)` for initial
state. Tokens `--cpt-form-*` restyle all forms; the override stylesheet is `ControlForm_Standard_Override.css` in
`…/control/builder`. `logControlState()` logs each control's validity for debugging.
