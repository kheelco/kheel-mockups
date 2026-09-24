---
component: jui-panel-gallery-item
component-version: 1
target: jui
---

# jui-panel-gallery-item → JUI

## Maps to

`com.effacy.jui.ui.client.gallery.item.PanelGalleryItem<R, D>` — a gallery item, supplied to the gallery as a
factory from `PanelGalleryItem.create (builder)` (or `create (converter, builder)` to render a converted value).
Each mockup item is one record drawn by that factory.

```java
PanelGalleryItem.<Project>create (item -> {
    item.width (Length.em (18));
    item.header (r -> r.getName (), h -> {
        h.titleIcon (FontAwesome.folder ());
        h.subtitle (r -> r.getSummary ());
        h.clickHandler (i -> open (i.getRecord ()));
        h.menu (m -> { /* context menu items */ });
    });
});
```

Titles and subtitles are `Provider<String, D>`; the snippet assumes a lambda satisfies it — check
(`ProviderBuilder.string ("…")` gives a constant). Check the `ContextMenu` item API in the source.

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| heading | `item.header (title, …)` | |
| subtitle | `h.subtitle (…)` | |
| title-icon | `h.titleIcon (…)` | FontAwesome class. |
| title-avatar | `h.titleAvatar (Provider<String, D>)` | Image URL per record; replaces the icon when present. |
| title-link | `h.clickHandler (…)` | Renders the title as a link. |
| clickable | `item.clickHandler (…)` | Whole panel; invoked after any other handler. |
| menu | `h.menu (…)` | A `ContextMenu`; the activator shows only when the menu has items. |
| item-width | `item.width (Length.em (n))` | `small` 14, `medium` 18, `large` 24; `auto` → no call. `item.height (Length)` also exists. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | No working equivalent: `item.section (…)` exists but its `Section` currently renders placeholder text. For body content, build the item with `GalleryItemCreator.supplier ((r, el) -> …)` (e.g. a `Card` fragment) instead. |

## States

Hover colours are in the item's stylesheet.

## Notes

The item's stylesheet uses literal colours (`#eee` border, `#ddd` icon, `#444` title, `#c4c4c4` menu); restyle
with a `PanelGalleryItem_Override.css` or a custom item if the theme needs it — there is no `--cpt-*` layer.
