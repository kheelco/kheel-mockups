---
component: jui-panel
component-version: 1
target: jui
---

# jui-panel → JUI

## Maps to

The **Panel** component, `com.effacy.jui.ui.client.panel.Panel` (configuration from `PanelBase.Config`), usually
built with `PanelCreator` or extended as the base class of a custom component. Children are added with
`add(...)` and set out by the panel's layout.

```java
Panel panel = PanelCreator.build(cfg -> cfg
        .padding(Insets.em(1))
        .layout(VertLayoutCreator.create(Length.em(1))),
    p -> {
        p.add(new MyIntro());
        p.add(ButtonCreator.build(b -> b.label("Continue")));
    });
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| padding | `.padding(Insets.em(…))` | Steps: `1` = 0.25em, `2` = 0.5em, `3` = 0.75em, `4` = 1em, `5` = 1.25em, `6` = 1.5em, `8` = 2em. |
| border | `.border(Border.…)` | Build the border with JUI's `Border` support (1px solid, the default line colour); check the exact factory in `com.effacy.jui.core.client.dom.css.Border`. |
| scrollable | `.scrollable()` | |
| layout / gap (layout attributes) | `.layout(…)` | `layout="column" gap="n"` → `VertLayoutCreator.create(Length.em(…))`; no layout attributes → the default `CardFitLayout` (one child showing) or `MinimalLayout`; a row of buttons → `ActionBarLayout` (see `jui-action-bar-layout`). |

## Slots

| Slot | Maps to |
| --- | --- |
| default | `panel.add(component)` (with `LayoutData` where the layout takes it). |

## States

None beyond what the layout does. With `CardFitLayout`, `panel.activate(cpt)` switches the visible child.

## Notes

Plain DOM (text, headings) cannot be added to a panel directly: wrap it in a component (`ComponentCreator.build(el
-> …)`) or render it from a custom component's `buildNode`. `width(Length)` and `widthMax(Length)` exist for
fixed widths.
