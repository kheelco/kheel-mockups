---
component: jui-modal-dialog
component-version: 1
target: jui
---

# jui-modal-dialog → JUI

## Maps to

The **ModalDialog** component, `com.effacy.jui.ui.client.modal.ModalDialog` (extends `Modal`), normally created
with `ModalDialogCreator`: `build(component, cfg -> …)` wraps a component in a dialog, and
`dialog(component, cfg -> …, cancel -> …, apply -> …)` returns a reusable `IDialogOpener<V1,V2>` whose `open(value,
callback)` passes a value in and a result out. The body of the mockup is the wrapped component.

```java
ModalDialogCreator.build(new CreateProjectForm(), cfg -> {
    cfg.title("Create a project").width(Length.px(400)).removeOnClose();
    cfg.action(a -> a.label("Cancel").outlined().handler(h -> h.success()));
    cfg.action(a -> a.label("Create").handler(h -> {
        if (h.contents().validate()) h.success(); else h.fail();
    }));
}).open();
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| title | `.title(String)` | |
| subtitle | `.subtitle(String)` | The header is compact (CSS class `compact`) when there is no subtitle. |
| subtitle-icon | `.subtitleIcon(FontAwesome.…())` | |
| description | `.description(String)` | `updateDescription(String)` changes it after render. |
| closable | `.closable(boolean)` | On by default; `closable(icon, text)` gives a custom close control. |
| title-wrap | `.titleWrap()` | |
| variant | `.variant(ModalDialog.Config.Variant.…)` | `STANDARD`, `SEPARATED`, `UNIFORM` (the `style(ModalStyle)` enum is deprecated). |
| type | `.type(Modal.Type.…)` | `CENTER`, `TOP`, `SLIDER`. |
| padding | `.padding(Insets.em(…))` | JUI's default is no padding (the content usually brings its own, e.g. a control panel's `padding(...)`); the mockup defaults to `4` (1em). |
| (dialog width) | `.width(Length)`, `.maxWidth(…)`, `.minWidth(…)`, `.height(…)` | The mockup's `width` on the `dialog` root: small ≈ 400px, medium ≈ 600px, large ≈ 800px; check the design. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The wrapped component (`build(component, …)` / `dialog(component, …)`). |
| actions | `cfg.action(a -> a.label(…)…)` per button, in order; `a.outlined()`, `a.danger()`, `a.link()`, `a.normal()` or `a.variant(Button.Config.Variant.…)` for the look; `a.icon(…)` for an icon. |
| actions-left | As `actions`, with `a.left(true)`. |

## States

Compact/full header follows `subtitle`. The footer is shown when at least one action is added. Action buttons
show their own waiting state while a handler is outstanding; `success()` closes the dialog, `fail()` keeps it
open. Close-control rotation is CSS.

## Notes

- JUI renders actions as **Button** components (`Button.Config`), not Btn fragments; the mockup uses `jui-btn`
  for their look. Map `variant="outlined" nature="grey"` to `a.outlined()` (or the grey outlined variant) and
  `nature="danger"` to `a.danger()`.
- `removeOnClose()` disposes a one-off dialog when it closes; keep reusable dialogs (openers) instead.
- If the content implements `IEditable`, `IResetable` or `IProcessable`, `dialog(...)` wires value in, reset and
  result out (see JUI's modals documentation).
