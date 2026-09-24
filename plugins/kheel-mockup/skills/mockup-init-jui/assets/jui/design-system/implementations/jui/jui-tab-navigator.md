---
component: jui-tab-navigator
component-version: 1
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

## Slots

| Slot | Maps to |
| --- | --- |
| tabs | One `tab(reference, label, component)` per `jui-tab-navigator-tab`, in order (see its mapping). A tab's `group` starts `group(label)` before it. |
| default | The active tab's component. Build each tab's page as its own component. |

## States

The active tab follows navigation: the first tab (or the one named by the navigation path) is active on
render; `navigate(...)` or a tab click changes it. The `vertical-compact` expansion on hover is pure CSS.

## Notes

- The reference given to each tab becomes a path segment (`section/members`), so pick stable references; the
  mockup's `href` on a tab says which page it shows.
- To intercept leaving a tab (unsaved changes) implement `INavigationAware.onNavigateFrom(...)` on the tab's
  component or use `ITabConfig.navigationHandler(...)`.
- `minHeight(Length)`, `effect(Effect)`, `color(String)` and a custom `presenter(INavigationPresenter)` have no
  mockup property.
