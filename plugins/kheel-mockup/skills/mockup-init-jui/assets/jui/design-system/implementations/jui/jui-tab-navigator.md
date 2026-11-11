---
component: jui-tab-navigator
component-version: 2
target: jui
---

# jui-tab-navigator → JUI

## Maps to

The **TabNavigator** component, `com.effacy.jui.ui.client.navigation.TabNavigator`, built with
`TabNavigatorCreator` or extended (an application section is often a `TabNavigator` subclass). Each
`jui-tab-navigator-tab` is a `tab(reference, label, component)`; the body content of the mockup is the component
of the active tab.

```java
public class ProjectSection extends TabNavigator {
    public ProjectSection() {
        super(new TabNavigator.Config()
            .variant(TabNavigator.Config.Variant.HORIZONTAL_UNDERLINE)
            .padding(Insets.em(1)));
        tab("overview", "Overview", new ProjectOverview());
        tab("members", "Members", new ProjectMembers()).icon(FontAwesome.users()).count(12);
        tab("billing", "Billing", new ProjectBilling()).indicator("New");
    }
}
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| variant | `.variant(TabNavigator.Config.Variant.…)` | `horizontal` → `HORIZONTAL`, `horizontal-underline` → `HORIZONTAL_UNDERLINE`, `horizontal-bar` → `HORIZONTAL_BAR`, `vertical` → `VERTICAL`, `vertical-icon` → `VERTICAL_ICON`, `vertical-alt` → `VERTICAL_ALT`, `vertical-compact` → `VERTICAL_COMPACT`. The `Style` enum of the same names is deprecated. |
| padding | `.padding(Insets.em(…))` | Applied as a margin around the body. |
| root | where the navigator is added | The application's root: add it to the page's root panel, which fills the window, so its `height: 100%` is the window's. The active tab's component is fitted to the body (`CardFitLayout`), which is what lets a table or gallery in it take its height from the screen. |

## Slots

| Slot | Maps to |
| --- | --- |
| tabs | One `tab(reference, label, component)` per `jui-tab-navigator-tab`, in order (see its mapping). A tab's `group` starts `group(label)` before it. |
| tools | `Config.tools(IComponent...)`, or `navigator.tools(...)` before it renders: the components at the strip's far end, in order. They are inserted with `Cpt`, so they render and are disposed of with the navigator. A navigator without tools is built exactly as before. Theme the inset with `--cpt-tabnavigator-tools-inset`. |
| default | The active tab's component. Build each tab's page as its own component. |

## States

The active tab follows navigation: the first tab (or the one named by the navigation path) is active on
render; `navigate(...)` or a tab click changes it. The `vertical-compact` expansion on hover is pure CSS.

## Hidden groups

A page reached from the tools rather than a tab (the mockup draws no tab for it and marks no tab `active`) is a
tab in a hidden group: `group(label).hidden()`, then its `tab(...)`. Its tabs are registered and navigable
(reference, deep link, `activate`, the navigation handler) but not drawn, so a selector in the tools can
`navigate(...)` to them.

```java
public class LandscapeSection extends TabNavigator {
    public LandscapeSection() {
        super(new TabNavigator.Config()
            .variant(TabNavigator.Config.Variant.HORIZONTAL_UNDERLINE));
        tools(ButtonCreator.build(cfg -> cfg.label("Analysis")
            .variant(Button.Config.Variant.OUTLINED)
            .option("Comparison", "Side by side, dimension by dimension", null, () -> navigate("analysis", "comparison"))
            .option("Moves", "What each competitor has done lately", null, () -> navigate("analysis", "moves"))));
        tab("overview", "Overview", new LandscapeOverview());
        tab("competitors", "Competitors", new Competitors());
        group("Analysis").hidden();
        tab("analysis", "Analysis", new AnalysisNavigator());
    }
}
```

## Notes

- The reference given to each tab becomes a path segment (`section/members`), so pick stable references; the
  mockup's `href` on a tab says which page it shows.
- To intercept leaving a tab (unsaved changes) implement `INavigationAware.onNavigateFrom(...)` on the tab's
  component or use `ITabConfig.navigationHandler(...)`.
- `minHeight(Length)`, `effect(Effect)`, `color(String)` and a custom `presenter(INavigationPresenter)` have no
  mockup property. Tools hide with the strip, under `hideNavigation()` or a configured presenter.
- Tools and hidden groups need jui-stack with juiproject/jui-stack#132 (merged into `develop`, in the release after
  0.4.4).
