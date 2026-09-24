---
component: jui-card-navigator-card
component-version: 1
target: jui
---

# jui-card-navigator-card → JUI

## Maps to

A card of a **CardNavigator**: `CardNavigator.Config.card(reference, component, config)`, configured through its
`CardConfiguration`. It is not a component of its own; the `component` is the section the card opens.

```java
cfg.card("users", new UsersSection(), c -> c
    .label("Users")
    .description("Invite people and manage their roles."));
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| label | `.label(String)` | Also `label(Supplier<String>)`. |
| description | `.description(String)` | |

## Slots

None.

## States

Hover is CSS. `navigator.disable("users")` hides a card; `enable(...)` shows it.

## Notes

`icon(…)`, `notice(…)`, `attr(name, value)` and `ref(…)` are further `CardConfiguration` options. A card whose
reference has a `/` (segmented) is not drawn in the grid.
