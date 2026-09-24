---
component: jui-card-navigator
component-version: 1
target: jui
---

# jui-card-navigator → JUI

## Maps to

The **CardNavigator** component, `com.effacy.jui.ui.client.navigation.CardNavigator`, configured with
`CardNavigator.Config` and one `card(...)` per section. It implements `INavigationHandlerWithProvider`, so it can
be a tab's component or the root of navigation.

```java
CardNavigator settings = new CardNavigator.Config()
    .style(CardNavigator.Config.Style.STANDARD)
    .title("Settings")
    .card("users", new UsersSection(), c -> c.label("Users").description("Invite people and manage their roles."))
    .card("users/user", new UserSection(), c -> c.label("User"))
    .card("billing", new BillingSection(), c -> c.label("Billing").description("Plan, payment method and invoices."))
    .build();
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| title | `.title(String)` | `title(String, icon)` / `title(String, icon, hoverIcon)` replace the compact variant's back arrow; `titleOnlyInBreadcrumb(true)` hides the top-level heading. |
| variant | `.style(CardNavigator.Config.Style.…)` | `standard` → `STANDARD`, `extended` → `EXTENDED`, `compact` → `COMPACT`. |
| current | — | The open card, from navigation: `navigate(context, List.of("users"))`, a card click or the URL path. Its label is the card's `label(…)`, or the `CardNavigator.ATTR_CARDLABEL` navigation metadata, or `updateCurrentLabel(String)` after the fact. |
| parent | a segmented card | Declare the nested card with a path reference (`"users/user"`); the breadcrumb then shows the parent card's label. |
| notice | the current card's `.notice(String)` | Shown only in the extended and compact styles. |

## Slots

| Slot | Maps to |
| --- | --- |
| cards | `card(reference, component, c -> c.label(…).description(…))` per `jui-card-navigator-card`, in order. |
| default | The open card's component (the `component` passed to its `card(...)`). |

## States

The top-level and card-open states are driven by navigation; crumb and card hover are CSS. `enable(ref…)` and
`disable(ref…)` show or hide cards.

## Notes

- `hideNavigation(true)` removes the header entirely; `navigationHandler(...)` can intercept breadcrumb clicks.
- A card's `icon(…)` is shown after the heading in the open state; the mockup does not draw it.
