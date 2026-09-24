---
component: jui-notification-block
component-version: 1
target: jui
---

# jui-notification-block → JUI

## Maps to

The **NotificationBlock** component, `com.effacy.jui.ui.client.NotificationBlock`. It renders notifications from
a builder, so one JUI block can show several; each mockup `jui-notification-block` is one `notification(...)`.

```java
NotificationBlock block = new NotificationBlock.Config(NotificationBlock.Config.Style.STANDARD).build();
block.builder().notification(NotificationBlock.NotificationBuilder.Theme.ERROR, n -> n
    .title("Could not save")
    .content("Please correct the following:")
    .line("Name is required")
    .line("The end date must be after the start date"));
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| theme | `notification(Theme.…, …)` | `notice` → `NOTICE`, `success` → `SUCCESS`, `error` → `ERROR`. |
| variant | `new NotificationBlock.Config(Style.…)` | `standard` → `STANDARD`, `compact` → `STANDARD_COMPACT`, `full` → `FULL`. |
| title | `.title(String)` | |
| content | `.content(String)` | |

## Slots

| Slot | Maps to |
| --- | --- |
| default | `.line(String)` per `li` (or `.line(Collection<String>)`). |

## States

`builder().notification(...)` renders immediately (the consumer form calls `render()`); `clear()` hides the block.
Consecutive mockup blocks with the same `variant` are one JUI block with several notifications.

## Notes

`Config.padding(Insets)` pads the block. Control panels and forms use a `NotificationBlock` for their messages
area (`messagesStyles(Style.STANDARD_COMPACT)`), so a form's error summary maps there rather than to a separate
component.
