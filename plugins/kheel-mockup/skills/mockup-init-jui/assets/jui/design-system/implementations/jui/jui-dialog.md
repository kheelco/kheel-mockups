---
component: jui-dialog
component-version: 1
target: jui
---

# jui-dialog → JUI

## Maps to

The **Dialog** fragment, `com.effacy.jui.ui.client.fragments.Dialog` (`Dialog.DialogFragment`) — an inline,
non-modal panel. Its close and action handlers run in the enclosing component.

```java
Dialog.$(parent)
    .css("width: 400px;")
    .title("A simple dialog")
    .onclose(() -> hide())
    .variant(Dialog.Variant.PLAIN)
    .action(Dialog.Action.left("Clear", Btn.Variant.TEXT, Btn.Nature.GREY, () -> clear()))
    .action(Dialog.Action.right("Apply", Btn.Variant.STANDARD_EXPANDED, () -> apply()))
    .$(
        Html.$("<div style='padding: 0.5em 1.5em;'><p>Contents.</p></div>")
    );
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| title | `.title(…)` | |
| closable | `.onclose(Invoker)` | The close icon (`FontAwesome.times()`) appears only when a handler is set. |
| variant | `.variant(Dialog.Variant.…)` | `PLAIN` (drop shadow) or `PLAIN_NO_SHADOW`. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | Children passed to `.$(…)`, inserted into `.contents`. JUI adds no padding. |
| left-actions | `.action(Dialog.Action.left(label, variant, nature, icon, handler))` per `jui-btn`, taking its label, icon, variant and nature. |
| actions | `.action(Dialog.Action.right(…))` per `jui-btn`. |

## States

The close icon's hover rotation is CSS. The dialog does not hide itself: `onclose` and the action handlers must
do it.

## Notes

JUI's CSS variables are `--juiDialog-border-radius-shadow`, `-border-radius`, `-border-color`, `-header-bg` and
`-header-color`; the mockup's `--frag-dialog-*` tokens correspond. Set a width with `.css("width: …;")`. For a
modal dialog use JUI's modal dialog components, not this fragment.
