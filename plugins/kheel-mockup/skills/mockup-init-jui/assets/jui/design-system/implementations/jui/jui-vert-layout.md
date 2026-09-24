---
component: jui-vert-layout
component-version: 1
target: jui
---

# jui-vert-layout → JUI

## Maps to

The **VertLayout** layout, `com.effacy.jui.core.client.component.layout.VertLayout` (jui-core), assigned as the
layout of a panel: the element's children are the panel's children, added in order.

```java
Panel panel = new Panel.Config()
    .layout(VertLayout.$().separator(VertLayout.VertLayoutData.Separator.LINE).spacing(Length.em(1)).build())
    .build();
panel.add(new PartA());
panel.add(new PartB());
```

`VertLayoutCreator.create(Length.em(1))` gives the layout with spacing and no separator.

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| spacing | `.spacing(Length.em(…))` | `4` = 1em, `2` = 0.5em. |
| separator | `.separator(Separator.LINE)` | `VertLayout.VertLayoutData.Separator`. |
| padding | `VertLayout.data().paddingSide(Length…)` per child, or the panel's `padding(Insets)` | Check which the design intends; the panel's padding is the usual one. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | `panel.add(component)` in order (optionally with `VertLayout.data()…` layout data). |

## States

None.

## Notes

A `jui-panel` with `layout="column" gap="n"` is also a `VertLayout` (without separator); prefer that in mockups
when no line is needed. The jui-core Java source was not available: API taken from the JUI docs
(`intro_gettingstarted.md`, `lessons_2.md`).
