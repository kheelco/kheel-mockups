---
component: jui-split-panel
component-version: 1
target: jui
---

# jui-split-panel → JUI

## Maps to

The **SplitPanel** component, `com.effacy.jui.ui.client.panel.SplitPanel`, built with `SplitPanelCreator` or
extended as the base class of a table or gallery component. The main area takes `add(...)`, the other area
`addOther(...)`.

```java
public class ThingTable extends SplitPanel {
    public ThingTable() {
        super(new SplitPanel.Config()
            .vertical()
            .separator()
            .otherLayout(new ActionBarLayout.Config()
                .zone(HAlignment.LEFT, Length.em(1))
                .zone(HAlignment.RIGHT)
                .insets(Insets.em(1))
                .build()));
        addOther(Controls.text(cfg -> cfg.iconLeft(FontAwesome.search()).placeholder("Search things")),
            new ActionBarLayout.Data(0));
        add(new ThingTableBody());
    }
}
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| vertical | `.vertical()` | |
| reverse | `.reverse()` | |
| separator | `.separator()` | |
| scrollable | `.scrollable()` | From `PanelBase.Config`. |
| padding | `.padding(Insets.em(…))` | Steps: `1` = 0.25em … `4` = 1em, `6` = 1.5em, `8` = 2em. |
| layout attributes | `.layout(…)` | Layout of the main area; see the `jui-panel` mapping. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | `add(component)` |
| other | `addOther(component, layoutData)`; a `jui-action-bar-layout` in the other slot becomes `.otherLayout(new ActionBarLayout.Config()…)`, and each of its zones' children `addOther(cpt, new ActionBarLayout.Data(zoneIndex))`. |

## States

None. `activate(cpt)` and `activateOther(cpt)` switch children when an area uses the default `CardFitLayout`.

## Notes

The separator colour is JUI's `--titlepanel-color-separator`. The mockup's separate `jui-action-bar-layout`
element is not a JUI component: it is the other area's layout (see its mapping).
