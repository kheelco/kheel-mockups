---
component: jui-box
component-version: 1
target: jui
---

# jui-box → JUI

## Maps to

The **Box** fragment, `com.effacy.jui.ui.client.fragments.Box` (fragment class `Box.BoxFragment`, a fragment with
children). It renders a `div.juiStack`, so it shares Stack's CSS (column, centred, `1em` gap).

```java
Box.$(parent).row().gap(Length.em(0.5)).$(box -> {
    Avatar.$(box, null).initials("Ann Lee").size(Length.em(2));
    Span.$(box).text("Ann Lee");
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| row | `.row()` | Absent → `.col()` (the default). |
| gap | `.gap(Length.…)` | Steps as for `jui-stack`. Absent → leave unset (`1em`). |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The box's children: `.$(box -> { … })`. |

## States

None to wire.

## Notes

Box overrides `build(…)` to wrap its content in its own `div.juiStack` and then builds the fragment root inside
it — check in the JUI version in use that children end up as direct flex items; if not, prefer `Stack`, which
offers the same layout with alignment, justification and wrapping.
