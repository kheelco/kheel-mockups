---
component: jui-notification-dialog
component-version: 1
target: jui
---

# jui-notification-dialog → JUI

## Maps to

**NotificationDialog** (`com.effacy.jui.ui.client` — check the package; its stylesheet is
`com/effacy/jui/ui/client/NotificationDialog.css`), a helper that builds and opens a transient `ModalDialog`.
Each type has a builder: `confirm(title)`, `alert(title)`, `error(title)`, `save(title)` (and
`custom(Icon, title, builder)`).

```java
NotificationDialog.confirm("Delete project")
    .notice("Are you sure you want to delete this project? This cannot be undone.")
    .handler((outcome, done) -> {
        if (outcome.isOk())
            deleteProject(() -> done.complete());
        else
            done.complete();
    })
    .open();
```

Shorthands: `NotificationDialog.confirm(title, notice, outcome -> …)`, `NotificationDialog.alert(title, notice,
outcome -> …)`, and so on.

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| type | the builder: `confirm`, `alert`, `error`, `save` | |
| title | the builder's `title` argument | |
| message | `.notice(String)` | Repeatable, one paragraph each; `.renderer(builder -> …)` for custom content. |

## Slots

None. The buttons are fixed by the type: confirm → Cancel (`DISMISS`) + OK (`OK`); alert and error → Dismiss
(`DISMISS`); save → Cancel (`DISMISS`) + Discard changes (`DISCARD`) + Save (`OK`); the close control gives
`DISMISS`. `.configurer(cfg -> …)` replaces the action set when different buttons are needed.

## States

Outcome handling: `handler(Consumer<OutcomeType>)` closes on return; `handler(BiConsumer<OutcomeType,
ICompletionCallback>)` keeps the dialog open (its button waiting) until `done.complete()`.

## Notes

- Width defaults to 400px (`.width(Length)`); use a `small` dialog mockup.
- The type icons are global static fields (`CLS_CONFIRM`, `CLS_ALERT`, `CLS_ERROR`); the mockup's icons
  (`circle-help`, `circle-alert`, `save`) are stand-ins — check the application's settings. Button labels come
  from the `Labels` messages interface.
- The NotificationDialog Java source was not in the reference checkout; this mapping follows the JUI modals
  skill and docs.
