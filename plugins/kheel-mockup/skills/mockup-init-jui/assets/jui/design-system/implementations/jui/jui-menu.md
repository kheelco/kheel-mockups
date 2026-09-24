---
component: jui-menu
component-version: 1
target: jui
---

# jui-menu → JUI

## Maps to

The **Menu** fragment, `com.effacy.jui.ui.client.fragments.Menu` (`Menu.MenuFragment`) — a fragment, inserted into
a DOM builder inside a component's renderer, usually inside a `MenuActivator`. Its items' clicks are dispatched by
the enclosing component.

```java
MenuActivator.$(parent).clickToActivate().$(content -> {
    Menu.$(content).width(Length.em(14)).$(
        MenuItem.$().label("Edit").icon(FontAwesome.pencil()).onclick(() -> edit()),
        MenuItem.$().label("Delete").icon(FontAwesome.trashCan()).variant(MenuItem.Variant.ERROR).onclick(() -> delete())
    );
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| variant | `.variant(Menu.Variant.OUTLINED)` | The default and only variant. |
| menu-width | `.width(Length.em(…))` | `auto` → leave unset; `small` 10 em, `medium` 14 em, `large` 20 em. |
| menu-height | `.height(Length.em(…))` | `auto` → leave unset; `small` 8 em, `medium` 12 em, `large` 16 em. JUI sets only the height; add `.css("overflow-y: auto;")` if the items can exceed it (the mockup scrolls). |

## Slots

| Slot | Maps to |
| --- | --- |
| default | Children passed to `.$(…)` (or `Menu.$(parent)` then `MenuItem.$(menu)`); each is wrapped in an `li`. |

## States

None of its own. Inside a `MenuActivator`, a click on any `MenuItem` closes the activator (wired automatically
when the menu is inserted into the activator).

## Notes

Rendered as `ul.juiMenu.juiMenu-outlined`. JUI's CSS variables are `--juiMenu-outlined-bg`, `-border`,
`-border-radius`, `-shadow-color` and `-shadow-size`; the mockup's `--frag-menu-outlined-*` tokens correspond one
to one. `--frag-menu-width`/`-height` have no JUI variable (JUI uses inline `width`/`height`).
