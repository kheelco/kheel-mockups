---
component: jui-stack
component-version: 1
target: jui
---

# jui-stack → JUI

## Maps to

The **Stack** fragment, `com.effacy.jui.ui.client.fragments.Stack` (fragment class `Stack.StackFragment`, a
fragment with children), styled by the `juiStack` rules in `FragmentStyles.css`.

```java
Stack.$(parent).horizontal().gap(Length.em(0.5)).align(Stack.Align.CENTER).wrap().$(row -> {
    Pill.$(row, "Design");
    Pill.$(row, "Research");
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| horizontal | `.horizontal()` | Absent → `.vertical()` (the default). |
| gap | `.gap(Length.…)` | Steps: 1 = 0.25rem, 2 = 0.5rem, 3 = 0.75rem, 4 = 1rem, 5 = 1.25rem, 6 = 1.5rem, 8 = 2rem, 10 = 2.5rem, 12 = 3rem (≈ the same in `Length.em(…)` at a 16px base). Absent → leave unset (CSS default `1em`). |
| align | `.align(Stack.Align.…)` | `START`, `CENTER`, `END`, `JUSTIFY` (adds the `stretch` class). Unset behaves as `CENTER`. |
| justify | `.justify(Stack.Justify.…)` | `START`, `CENTER`, `END`. **Caution:** JUI sets `justify-items`, which flexbox ignores, so it has no visible effect; to get the mockup's placement add `.css("justify-content: flex-end")` (check) or use a spacer. |
| wrap | `.wrap()` | |
| hide-if-empty | `.hideIfEmpty()` | |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The stack's children: `.$(stack -> { … })` or `Stack.$(parent, s -> …)`. |

## States

None to wire. `hideIfEmpty()` is evaluated at build time.

## Notes

`--jui-stack-gap` is a mockup token; JUI sets the gap inline. Adornments (`.css(…)`) apply to the root.
