---
component: jui-para
component-version: 1
target: jui
---

# jui-para → JUI

## Maps to

The **Para** fragment, `com.effacy.jui.ui.client.fragments.Para` (fragment class `Para.ParaFragment`). It renders
no wrapper: one `P` per paragraph (split on two or more newlines), with `Br` between lines, directly into the
parent.

```java
Para.$(parent, candidate.getNotes());
```

## Properties

None.

## Slots

| Slot | Maps to |
| --- | --- |
| default | The `text` argument of `Para.$(parent, text)`: join the mockup's paragraphs with `"\n\n"` and its `br` with `"\n"`. |

## States

`empty` is automatic: empty or `null` text renders nothing. The fragment's conditional (`conditional`) is also
honoured.

## Notes

`--jui-para-spacing` is a mockup token for the browser's default `p` margins; JUI has no Para CSS. Text is inserted
as text nodes, so markup in the string is not interpreted.
