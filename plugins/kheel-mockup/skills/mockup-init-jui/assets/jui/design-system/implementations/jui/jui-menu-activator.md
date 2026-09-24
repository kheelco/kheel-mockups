---
component: jui-menu-activator
component-version: 1
target: jui
---

# jui-menu-activator → JUI

## Maps to

The **MenuActivator** fragment, `com.effacy.jui.ui.client.fragments.MenuActivator`
(`MenuActivator.MenuActivatorFragment`). It renders its own vertical-ellipsis trigger
(`FontAwesome.ellipsisV()`) and a container for the menu.

```java
MenuActivator.$(cell).clickToActivate().$(content -> {
    Menu.$(content).$(
        MenuItem.$().label("Edit").icon(FontAwesome.edit()).onclick(() -> edit()),
        MenuItem.$().label("Delete").icon(FontAwesome.trashCan()).variant(MenuItem.Variant.ERROR).onclick(() -> delete())
    );
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| click-to-activate | `.clickToActivate()` | Without it the menu opens on hover (CSS `:hover`). |
| above | `.aboveForced()` | Otherwise JUI places the menu above automatically within `aboveThreshold(int)` px (default 100) of the bottom of the scroll area; `aboveThreshold(0)` disables that. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The `Menu` inserted into the activator (`.$(content -> Menu.$(content)…)`). |

## States

| State | JUI |
| --- | --- |
| hover | CSS `:hover` (and opens the menu when not click-to-activate). |
| open | The `open` class, toggled by the activator's `ActivationHandler` on click (with `clickToActivate()`); an item click closes it. The `above` class positions it above. |

## Notes

The mockup draws the trigger with the `ellipsis` icon rotated 90°, as the icon set has no vertical ellipsis; JUI
uses `FontAwesome.ellipsisV()`. JUI's CSS variables are `--juiMenuActivator-radius`, `-padding`, `-aboveOffset`,
`-belowOffset`, `-rightOffset`, `-hoverBg` and `-hoverColor`; the mockup's `--frag-menu-activator-*` tokens
correspond (kebab-cased). The rest colour (`--frag-menu-activator-color`) is fixed at `--jui-color-neutral50` in
JUI. For a trigger other than the ellipsis, a custom fragment or component is needed.
