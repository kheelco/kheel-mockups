---
component: jui-icon-btn
component-version: 1
target: jui
---

# jui-icon-btn → JUI

## Maps to

The **IconBtn** fragment, `com.effacy.jui.ui.client.fragments.IconBtn` (fragment class `IconBtn.IconBtnFragment`)
— a fragment, so it is inserted into a DOM builder inside a component's renderer and its click is dispatched by
that component. The icon is a CSS class string, normally from `FontAwesome`.

```java
IconBtn.$(parent, FontAwesome.pencil())
    .attr("aria-label", "Edit")
    .onclick(cb -> { … cb.complete(); });
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| icon | `IconBtn.$(parent, icon)` | A FontAwesome class; see the `jui-icon` mapping for names. Nothing renders when it is `null`. |
| size | `.size(Length.em(…))` | `small` → `Length.em(1)`; `medium` → leave unset (CSS default `1.2em`); `large` → `Length.em(1.5)`. |
| label | `.attr("aria-label", label)` | |
| waiting | — | Automatic while an `onclick(Consumer<IButtonActionCallback>)` callback is outstanding (the button is disabled and gets the `running` class); `onclick(Invoker)` completes immediately. |

## Slots

None.

## States

Hover is handled by the fragment's stylesheet. The waiting state is driven by the asynchronous `onclick` callback:
call `cb.complete()` when the action finishes. There is no disable API; check before relying on `.attr("disabled", "")`.

## Notes

The real CSS variables are `--jui-iconbtn-color`, `--jui-iconbtn-color-hover`, `--jui-iconbtn-size`,
`--jui-iconbtn-bg-hover` and `--jui-iconbtn-dimension` (declared on the fragment's own class), so the mockup's
component tokens map one to one; set them with `.css("--jui-iconbtn-…: …")` on an ancestor or via `attr("style", …)`.
Use `.testId(…)` for tests.
