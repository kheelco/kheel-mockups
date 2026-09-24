---
component: jui-action-bar-layout
component-version: 1
target: jui
---

# jui-action-bar-layout → JUI

## Maps to

The **ActionBarLayout** layout, `com.effacy.jui.core.client.component.layout.ActionBarLayout` (jui-core), built
with `new ActionBarLayout.Config()…build()` or `ActionBarLayoutCreator.create(bar -> …)`. It is not a component:
it is assigned as the layout of a panel or of a region (a split panel's other area, a dialog footer), and each
child is added with `ActionBarLayout.Data(zoneIndex)`.

```java
Panel bar = PanelCreator.build(cfg -> cfg.layout(ActionBarLayoutCreator.create(b -> {
    b.zone(HAlignment.LEFT);
    b.zone(HAlignment.RIGHT);
})), p -> {
    p.add(ButtonCreator.build(c -> c.label("Filter")), new ActionBarLayout.Data(0));
    p.add(ButtonCreator.build(c -> c.label("Add member")), new ActionBarLayout.Data(1));
});
```

For the common two-zone button bar, `PanelCreator.buttonBar(cfg -> …, panel -> …)` does the above (with 2px
insets); `PanelCreator.buttonBarRightAligned(…)` gives a single right-aligned zone.

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| valign | the layout's vertical alignment | Top/bottom alignment of the layout (CSS classes `top`, `bottom`); check the `Config` method name in jui-core. |
| spacing | `zone(HAlignment, Length.em(…))` | The zone's spacing: `2` = 0.5em, `4` = 1em. |
| padding | `.insets(Insets.em(…))` | |

## Slots

| Slot | Maps to |
| --- | --- |
| left | `zone(HAlignment.LEFT)`; children added with `new ActionBarLayout.Data(i)` where `i` is this zone's index. |
| center | `zone(HAlignment.CENTER)`; as above. |
| right | `zone(HAlignment.RIGHT)`; as above. |

Declare only the zones the mockup fills, in order left to right; zone indices count the declared zones.

## States

None.

## Notes

JUI zones may be declared in any number and order; the mockup's three named zones cover the usual cases. The
jui-core Java source was not available when this mapping was written: the zone and insets API is taken from the
JUI docs and `PanelCreator`, the alignment method name is unverified.
