---
component: jui-title-panel
component-version: 1
target: jui
---

# jui-title-panel → JUI

## Maps to

The **TitlePanel** component, `com.effacy.jui.ui.client.panel.TitlePanel`, built with `TitlePanelCreator` or
extended.

```java
TitlePanel panel = TitlePanelCreator.create(cfg -> cfg
        .title("Team members")
        .subtitle("People who can see this project")
        .icon(FontAwesome.users())
        .padding(Insets.em(1)),
    p -> p.add(new MemberList()));
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| title | `.title(String)` | |
| subtitle | `.subtitle(String)` | |
| icon | `.icon(FontAwesome.…())` | See the `jui-icon` mapping for names. |
| variant | `.style(TitlePanel.Config.Style.…)` | `split` → `SPLIT` (default), `above` → `ABOVE`. |
| scrollable | `.scrollable()` | |
| padding | `.padding(Insets.em(…))` | |
| layout attributes | `.layout(…)` | Default is `CardFitLayout`; see the `jui-panel` mapping. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | `add(component)` |

## States

None.

## Notes

JUI renders the subtitle as an `h4` while its stylesheet styles `h3`, so a real subtitle may pick up the page's
`h4` style rather than the 1.25em grey the mockup shows; check against the application's base styles.
`scale(double)` scales the title bar's font size and has no mockup property.
