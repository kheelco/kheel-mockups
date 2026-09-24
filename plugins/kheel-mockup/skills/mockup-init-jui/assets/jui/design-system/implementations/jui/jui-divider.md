---
component: jui-divider
component-version: 1
target: jui
---

# jui-divider → JUI

## Maps to

The **Divider** fragment, `com.effacy.jui.ui.client.fragments.Divider` (fragment class `Divider.DividerFragment`),
which renders `<hr class="juiDivider">`.

```java
Divider.$(parent);
```

## Properties

None.

## Slots

None.

## States

None.

## Notes

JUI's `.juiDivider` rule is empty, so the line takes the browser's `hr` styling (an inset border, `0.5em` margins)
unless the application styles it; the mockup draws a flat `--jui-line-light` line. `--jui-divider-*` are mockup
tokens; to match, style `.juiDivider` in the application's CSS or use `.css("border: 0; border-top: 1px solid
var(--jui-line-light)")`.
