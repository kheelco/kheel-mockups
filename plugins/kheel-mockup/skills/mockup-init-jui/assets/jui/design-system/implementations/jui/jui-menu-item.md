---
component: jui-menu-item
component-version: 1
target: jui
---

# jui-menu-item → JUI

## Maps to

The **MenuItem** fragment, `com.effacy.jui.ui.client.fragments.MenuItem` (`MenuItem.MenuItemFragment`), inserted
into a `Menu`. Its click is dispatched by the enclosing component.

```java
MenuItem.$(menu)
    .label("Delete")
    .icon(FontAwesome.trashCan())
    .variant(MenuItem.Variant.ERROR)
    .onclick(() -> delete());
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| label | `.label(…)` | JUI renders `NO LABEL` when empty. |
| icon | `.icon(FontAwesome.…())` | See the `jui-icon` mapping for names. |
| icon-space | `.icon("")` | An empty string renders an empty icon slot. |
| variant | `.variant(MenuItem.Variant.…)` | `NORMAL`, `ERROR`. |
| disabled | `.disabled(true)` | `.disabledButClickable(true)` keeps it clickable (e.g. to explain why it is unavailable). |

## Slots

None.

## States

Hover is handled by `FragmentStyles.css`. The item only gets the pointer cursor (`clickable`) when it has an
`onclick` and is not disabled; the mockup always shows a pointer on enabled items.

## Notes

Rendered as `div.juiMenuItem.juiMenuItem-normal|error` with an `em` icon and a `span` label. JUI has no CSS
variables for the item; the mockup's `--frag-menuitem-text` and `--frag-menuitem-hover-bg` stand in for its fixed
colours (`--jui-color-neutral60`/`--jui-color-neutral10`, error `--jui-color-error50`/`--jui-color-error05`,
disabled `--jui-text-disabled`).
