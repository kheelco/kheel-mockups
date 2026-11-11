---
component: jui-button-option
component-version: 1
target: jui
---

# jui-button-option → JUI

## Maps to

An option of a **Button**, added to its `Button.Config` with `option(label, text, code, handler)` or
`iconOption(label, text, icon, handler)`. It is not a component of its own: the button draws each option as a row
of its menu (`menuitem`), in the order added.

```java
ButtonCreator.build (cfg -> cfg.label ("Add requirement").icon (FontAwesome.plus ()).split ()
    .handler (() -> addRequirement ())
    .option ("Requirement", "Something the solution must do", "REQ", () -> addRequirement ())
    .option ("Rule", "A constraint on how it is done", "RULE", () -> addRule ()));
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| label | `option(label, …)` | |
| text | `option(…, text, …)` | `null` for none. |
| code | `option(…, code, …)` | `null` for none. |
| icon | `iconOption(label, text, icon, handler)` | A FontAwesome class in place of the code; see the `jui-icon` mapping. |

## Slots

None.

## States

`active` is the row JUI highlights on hover or with Down and Up (`ButtonOptions.css`, `.active`); choosing it
(click or Enter) closes the menu, then runs the handler.

## Notes

- Test ids: an option carries `<button test-id>-option-<code or label>`.
- Needs jui-stack with juiproject/jui-stack#131 (merged into `develop`, in the release after 0.4.4).
