---
component: jui-notifier
component-version: 1
target: jui
---

# jui-notifier → JUI

## Maps to

**Notifier** (`com.effacy.jui.ui.client` — check the package; its stylesheet is
`com/effacy/jui/ui/client/Notifier.css`): a transient toast created and shown in one call.

```java
Notifier.create().text("Successfully created").show(2000);
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| text | `.text(String)` | |
| placement | — | Always the bottom-left corner in JUI; `inline` is a mockup-only presentation. |

## Slots

None.

## States

`show(millis)` displays it for that long, then it fades and collapses (the `hiding` state); nothing to wire.

## Notes

Typically called from the success path of a remote call or a dialog's action handler. The Notifier Java source
was not in the reference checkout; the API is from the JUI catalogue and `cpt_patterns.md`.
