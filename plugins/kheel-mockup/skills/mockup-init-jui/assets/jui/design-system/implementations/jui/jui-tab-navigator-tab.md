---
component: jui-tab-navigator-tab
component-version: 1
target: jui
---

# jui-tab-navigator-tab → JUI

## Maps to

A tab of a **TabNavigator**: `TabNavigator.tab(reference, label, component)` (or `Config.tab(...)`), which
returns a `TabCollection.ITabConfig` for its options. It is not a component of its own.

```java
group("Account");
tab("profile", "Profile", new ProfilePage()).icon(FontAwesome.user());
tab("notifications", "Notifications", new NotificationsPage()).icon(FontAwesome.bell()).count(3);
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| label | `tab(reference, label, …)` | Choose a stable `reference` (a path segment) for each tab. |
| icon | `.icon(FontAwesome.…())` | See the `jui-icon` mapping for names. |
| active | `navigator.activate(reference)` | Normally set by navigation (the path, or a click), not configuration. |
| count | `.count(int)` | Updates live after render; a negative value hides it. |
| indicator | `.indicator(String)` | |
| group | `group(label)` before the tab | Returns `ITabGroupConfig` (`icon`, `collapsable`, `expand`). |

## Slots

None.

## States

Hover and active styling are the navigator's. The active tab is changed with `navigator.activate(ref)` or
`navigate(...)`. `navigator.disable(ref…)` hides a tab entirely (JUI draws disabled tabs as `display: none`) and
`enable(ref…)` shows it again, so a disabled tab is simply left out of the mockup. `updateTabCount(ref, n)`,
`updateTabLabel(ref, label)` and `updateTabIcon(ref, icon)` change a tab after render.

## Notes

`tab(label, Invoker handler)` creates an action tab that runs code instead of showing a component. The
`vertical-icon` tooltip that JUI shows on hover is not drawn in the mockup.
