---
component: jui-percentage-gauge
component-version: 1
target: jui
---

# jui-percentage-gauge → JUI

## Maps to

The **PercentageGuage** fragment, `com.effacy.jui.ui.client.fragments.PercentageGuage` (note JUI's spelling).

```java
PercentageGuage.$(parent, 45).css("width: 4em;");
PercentageGuage.$(parent, done, total).icon(p -> (p >= 100) ? FontAwesome.check() : null).css("width: 4em;");
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| percentage | `PercentageGuage.$(parent, percentage)` | Or `$(parent, numerator, denominator)`; the dial is clamped to 0–100. |
| icon | `.icon(FontAwesome.…())` | Or `.icon(Function<Integer,String>)` to choose by percentage (return `null` for the number). |
| size | `.css("width: …;")` | `small` 2.5 em, `medium` 4 em, `large` 6 em. |

## Slots

None.

## States

None.

## Notes

Rendered as `.juiPGuage` with an SVG ring; theme through `--frag-guage-bg`, `--frag-guage-dial` and
`--frag-guage-text` (the same names as the mockup). `--frag-guage-size` is mockup-only; JUI is sized by CSS width.
