---
component: jui-btn
component-version: 1
target: jui
---

# jui-btn → JUI

## Maps to

The **Btn** fragment, `com.effacy.jui.ui.client.fragments.Btn` — a fragment, so it is inserted into a DOM builder
inside a component's renderer and its click is dispatched by that component.

```java
Btn.$(parent, "Add member")
    .icon(FontAwesome.plus())
    .variant(Btn.Variant.OUTLINED)
    .onclick(cb -> { … cb.complete(); });
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| label | `Btn.$(parent, label)` | |
| icon | `.icon(…)` | A FontAwesome icon; see the `jui-icon` mapping for names. |
| variant, expanded, rounded, compact | `.variant(Btn.Variant.…)` | `standard` → `STANDARD`; with `expanded` → `STANDARD_EXPANDED`; with `rounded` → `STANDARD_ROUNDED`; both → `STANDARD_EXPANDED_ROUNDED`; `outlined` → `OUTLINED` (`OUTLINED_ROUNDED` when rounded); `text` → `TEXT` (`TEXT_COMPACT` when compact); `compact` alone → `COMPACT`. |
| nature | `.nature(Btn.Nature.…)` | `NORMAL`, `WARNING`, `DANGER`, `SUCCESS`, `GREY`. |
| disabled | `.disable(true)` | |
| waiting | — | Automatic while the `onclick` callback is outstanding; `.immediate()` turns it off. |
| (no label) | `.iconOnly()` | |

## Slots

None.

## States

Hover, focus and disabled are handled by the fragment's stylesheet. The waiting state is driven by the
asynchronous `onclick` callback: call `cb.complete()` when the action finishes.

## Notes

Theme through the `--frag-btn-*` tokens (for one button, `.css("--frag-btn-…: …")`) or the `--jui-comp-button-*`
family tokens. If the button needs to exist on its own as a component — its own events and lifecycle — map to
`jui-button` (the Button component) instead.
