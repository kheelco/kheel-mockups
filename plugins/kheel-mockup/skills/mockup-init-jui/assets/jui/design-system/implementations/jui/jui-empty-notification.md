---
component: jui-empty-notification
component-version: 1
target: jui
---

# jui-empty-notification → JUI

## Maps to

`com.effacy.jui.ui.client.gallery.EmptyNotification` — not a component: a description of one or more panels,
rendered into an element with the static `EmptyNotification.buildPanel (…)`. It is used from a `Gallery`'s or
`Table`'s `emptyUnfiltered`, `emptyFiltered` and `emptyError` configuration.

```java
cfg.emptyFiltered (el -> EmptyNotification.buildPanel (el, new EmptyNotification (panel -> {
    panel.title ("No results match your filters");
    panel.paragraph ("Try removing a filter or searching for something else.");
    panel.action ("Clear filters", () -> filters.clear ());
})));
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| heading | `panel.title (…)` | |
| actions-right-aligned | `panel.actionsRightAligned (true)` | |

## Slots

| Slot | Maps to |
| --- | --- |
| default | `panel.paragraph (…)`, once per paragraph. |
| actions | `panel.action (label, Invoker)`, once per `jui-btn`. JUI renders these as `a` elements styled as buttons, not as `Btn` fragments. |

## States

None.

## Notes

Several `jui-empty-notification` elements in one empty slot map to several `panel(…)` calls on one
`EmptyNotification`. For `emptyError` the renderer is passed the store's message:
`cfg.emptyError ((el, msg) -> EmptyNotification.buildPanel (el, new EmptyNotification (p -> p.title ("…").paragraph (msg))))`.
