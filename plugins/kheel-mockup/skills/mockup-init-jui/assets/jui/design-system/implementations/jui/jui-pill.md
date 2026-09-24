---
component: jui-pill
component-version: 1
target: jui
---

# jui-pill → JUI

## Maps to

The **Pill** fragment, `com.effacy.jui.ui.client.fragments.Pill` (fragment class `Pill.PillFragment`), styled by
`fragments/Pill.css`. A fragment, inserted into a DOM builder inside a component's renderer.

```java
Pill.$(parent, "Paid").variant(Pill.Variant.SUCCESS);
Pill.$(parent, "Beta").variant(Pill.Variant.OUTLINE);
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| label | `Pill.$(parent, label)` | Nothing renders when the label is `null`. |
| variant | `.variant(Pill.Variant.…)` | `NEUTRAL` (default), `OUTLINE`, `INFO`, `SUCCESS`, `WARNING`, `DANGER`. The semantic variants set the icon, so call `.icon(…)` **after** `.variant(…)`. |
| icon | `.icon(FontAwesome.…())` | See the `jui-icon` mapping for names. The variants' own icons are `circleInfo`, `circleCheck`, `triangleExclamation` and `circleExclamation`. |
| no-icon | `.icon(null)` | After `.variant(…)`. |

## Slots

None.

## States

None to wire: the pill is static. Truncation follows `--frag-pill-max-width`.

## Notes

The `--frag-pill-*` tokens are JUI's own and map one to one; retune one pill with `.css("--frag-pill-…: …")` or
all pills in a theme. `.testId(…)` and `.attr(…)` are available.
