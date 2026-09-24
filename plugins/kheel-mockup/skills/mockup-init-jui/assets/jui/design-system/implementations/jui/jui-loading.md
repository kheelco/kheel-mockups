---
component: jui-loading
component-version: 1
target: jui
---

# jui-loading → JUI

## Maps to

The **Loading** fragment, `com.effacy.jui.ui.client.fragments.Loading` (`Loading.LoadingFragment`).

```java
Loading.$(parent).height(Length.em(1.75)).bottom(Length.em(0.5));
Loading.$(parent);
Loading.$(parent).dark().width(Length.pct(60));
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| dark | `.dark()` | |
| height | `.height(Length.em(…))` | `text` → leave unset (1 em); `heading` 1.75 em; `block` 5 em. |
| (layout `width`, `mt`, `mb`, `ml`, `mr`) | `.width(…)`, `.top(…)`, `.bottom(…)`, `.left(…)`, `.right(…)` | `.size(height, width)` sets both. |

## Slots

None.

## States

Always animating (`jui-animation-waiting`). Replace it with the content when loading completes.

## Notes

JUI's CSS variable is `--juiLoading-bg` (the mockup's `--frag-loading-bg`). The pulse animates the background
between `--jui-role-surface-muted` and `--jui-role-surface-raised`.
