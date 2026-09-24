---
component: jui-info-block-item
component-version: 1
target: jui
---

# jui-info-block-item → JUI

## Maps to

An item of an **InfoBlock** line (`InfoLine`), rendered as `.info_line_item`: an optional icon and a text value,
or a link (`a`). Not a component of its own.

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| icon | the item's icon | A FontAwesome icon; see the `jui-icon` mapping. |
| label | the item's text | Often a `Provider<String, D>` reading the block's data. |
| link | the item's link/action | Rendered as an `a` in the link colour. |

## Slots

None.

## States

Link hover (underline) is CSS.

## Notes

`InfoLine`'s source was not in the reference checkout: check the method names for icon, text and link items
before implementing.
