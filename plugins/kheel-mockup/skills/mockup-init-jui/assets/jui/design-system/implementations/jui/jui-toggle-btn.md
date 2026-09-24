---
component: jui-toggle-btn
component-version: 1
target: jui
---

# jui-toggle-btn → JUI

## Maps to

The **ToggleBtn** fragment, `com.effacy.jui.ui.client.fragments.ToggleBtn` (fragment class
`ToggleBtn.ToggleBtnFragment`). A fragment: it is rendered by the enclosing component, whose click handler flips
the state it keeps and re-renders (or rebuilds) the fragment.

```java
ToggleBtn.$(parent)
    .label("Show archived")
    .active(showArchived)
    .onclick(() -> { showArchived = !showArchived; rerender(); });
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| label | `.label(…)` | No label span is rendered when empty. |
| active | `.active(boolean)` | Adds the `juiToggleBtn_active` class. |
| variant | `.variant(ToggleBtn.Variant.STANDARD)` | The default; the only variant defined. |

## Slots

None.

## States

`on`/`off` is the `active` flag; the fragment does not change it on click — the `onclick(Invoker)` handler must
update the state and re-render. There is no hover style in JUI.

## Notes

JUI's CSS variables are camel-cased: `--juiToggleBtn-width`, `--juiToggleBtn-bg`, `--juiToggleBtn-border`,
`--juiToggleBtn-active-bg`, `--juiToggleBtn-active-border`, `--juiToggleBtn-knob-bg`, `--juiToggleBtn-label-gap`,
`--juiToggleBtn-padding`, `--juiToggleBtn-label-size`, `--juiToggleBtn-label-color`, `--juiToggleBtn-label-weight`
(in `FragmentStyles.css`); the mockup's `--jui-toggle-btn-*` tokens correspond one to one. For accessibility add
`.attr("role", "switch")`, `.attr("aria-checked", …)` and `.attr("tabindex", "0")`. If the value belongs to a
form, use a check control instead.
