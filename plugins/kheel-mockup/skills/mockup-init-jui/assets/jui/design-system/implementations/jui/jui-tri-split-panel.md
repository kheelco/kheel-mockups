---
component: jui-tri-split-panel
component-version: 1
target: jui
---

# jui-tri-split-panel → JUI

## Maps to

The **TriSplitPanel** component, `com.effacy.jui.ui.client.panel.TriSplitPanel`, usually extended as the base
class of a table or gallery that has a toolbar and a footer. Areas are filled with `addTop(...)`, `add(...)` and
`addBottom(...)`.

```java
public class ThingTable extends TriSplitPanel {
    public ThingTable() {
        super(new TriSplitPanel.Config()
            .topLayout(new ActionBarLayout.Config()
                .zone(HAlignment.LEFT, Length.em(2)).zone(HAlignment.RIGHT).insets(Insets.em(1)).build())
            .bottomLayout(new ActionBarLayout.Config()
                .zone(HAlignment.LEFT, Length.em(2)).zone(HAlignment.RIGHT).insets(Insets.em(1, 0.5)).build())
            .separator());
        addTop(ButtonCreator.build(b -> b.label("Add thing")), new ActionBarLayout.Data(1));
        add(new ThingTableBody());
        addBottom(new CountIndicator(totalResults, "things"), new ActionBarLayout.Data(1));
    }
}
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| separator | `.separator()` | |
| scrollable | `.scrollable()` | From `PanelBase.Config`. |
| padding | `.padding(Insets.em(…))` | |
| layout attributes | `.layout(…)` | Layout of the main area; see the `jui-panel` mapping. |

## Slots

| Slot | Maps to |
| --- | --- |
| top | `addTop(component, layoutData)`; a `jui-action-bar-layout` here is `.topLayout(new ActionBarLayout.Config()…)`. |
| default | `add(component)` |
| bottom | `addBottom(component, layoutData)`; a `jui-action-bar-layout` here is `.bottomLayout(…)`. |

## States

None. `activate`, `activateTop` and `activateBottom` switch children in areas using `CardFitLayout`.

## Notes

`CountIndicator` in the example is a project component, not part of JUI. Theme with `--cpt-trisplitpanel-*`.
