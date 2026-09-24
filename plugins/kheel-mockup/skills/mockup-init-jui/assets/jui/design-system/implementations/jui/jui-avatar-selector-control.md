---
component: jui-avatar-selector-control
component-version: 1
target: jui
---

# jui-avatar-selector-control → JUI

## Maps to

The **AvatarSelectorControl** control, `com.effacy.jui.ui.client.control.AvatarSelectorControl`: preview with
change/remove links, a panel of stock avatars and an upload drop zone, and a crop step. It has no `Controls`
factory; construct it through its `Config` (check the configuration API — its source was not available when this
mapping was written; the structure here follows `AvatarSelectorControl.css`).

```java
// Check: configuration of stock avatars, upload handling and the value type.
AvatarSelectorControl ctl = new AvatarSelectorControl.Config()
    /* stock images, uploader … */
    .build();
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| src | the value | Check the value type (an image reference or URL). |
| change-label, remove-label, stock-label, upload-label, upload-prompt | — | JUI's own texts; check whether they are configurable. |
| disabled, read-only | `ctl.disable()`, read-only | Both hide the change and remove links (per the stylesheet). |
| invalid, waiting | as for `jui-text-control` | |

## Slots

None.

## States

The panel (`open`) and crop step (`crop`) are driven by the control's own interaction; they are not set
directly.

## Notes

JUI's stylesheet colours links with `--jui-color-primary` (falling back to `#0066cc`); the mockup uses the
primary interactive role colour.
