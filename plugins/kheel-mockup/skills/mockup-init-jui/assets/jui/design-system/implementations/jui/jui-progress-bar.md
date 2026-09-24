---
component: jui-progress-bar
component-version: 1
target: jui
---

# jui-progress-bar → JUI

## Maps to

The **ProgressBar** fragment, `com.effacy.jui.ui.client.fragments.ProgressBar` (`ProgressBar.ProgressBarFragment`),
with variants through the standard fragment `variant(…)` mechanism.

```java
ProgressBar.$(parent, 45, Length.em(20), "3 of 8 steps");

ProgressBar.$(parent)
    .variant(ProgressBar.Variant.VERTICAL_MONO)
    .percentage(85)
    .commentary("Goals met");
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| percentage | `.percentage(int)` | Negative values show as 0. |
| commentary | `.commentary(…)` | |
| variant | `.variant(ProgressBar.Variant.…)` | `STANDARD`, `REVERSE`, `VERTICAL`, `VERTICAL_MONO`. |
| percentage-on-left | `.percentageOnLeft(true)` | Set by `REVERSE`. |
| bar-only | `.barOnly(true)` | Bar height defaults to 1 em unless `.barHeight(…)` is set. |

## Slots

None.

## States

None; re-render with a new percentage to update.

## Notes

`.width(Length)` sets the width of the whole fragment, or of the bar only with `.widthOnBar(true)` (which
`STANDARD` and `REVERSE` set); in the mockup use layout attributes. JUI's CSS variables are
`--juiProgressBar-bar-border-color`, `-bar-border-size`, `-bar-border-radius`, `-bar-bg`, `-bar-fg`,
`-bar-height`, `-commentary-vertical-gap`, `-commentary-gap`, `-commentary-color`, `-commentary-size`,
`-commentary-weight`, `-indicator-gap`, `-indicator-color`, `-indicator-size` and `-indicator-weight`; the
mockup's `--frag-progress-*` tokens correspond one to one.
