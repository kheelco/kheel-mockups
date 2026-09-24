---
component: jui-percentage-line
component-version: 1
target: jui
---

# jui-percentage-line → JUI

## Maps to

The **PercentageLine** fragment, `com.effacy.jui.ui.client.fragments.PercentageLine`.

```java
PercentageLine.$(parent, 30).label("Completed").css("width: 10em;");
PercentageLine.$(parent, done, total).progress(done + " / " + total);
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| percentage | `PercentageLine.$(parent, percentage)` | Or `$(parent, numerator, denominator)`; clamped to 0–100. |
| label | `.label(…)` | |
| progress | `.progress(…)` | `.progress(condition, …)` sets it conditionally. |

## Slots

None.

## States

None.

## Notes

JUI renders it `inline-block` with no width; give it one with `.css("width: …;")` (the mockup defaults to 10 em,
the documentation example's). JUI's CSS variables are `--juiPLine-height`, `-border`, `-bg`, `-bar-bg`, `-text`,
`-text-weight` and `-text-size`; the mockup's `--frag-pline-*` tokens correspond.
