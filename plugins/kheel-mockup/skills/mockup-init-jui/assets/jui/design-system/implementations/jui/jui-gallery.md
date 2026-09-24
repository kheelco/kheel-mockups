---
component: jui-gallery
component-version: 1
target: jui
---

# jui-gallery → JUI

## Maps to

The **Gallery** component, `com.effacy.jui.ui.client.gallery.Gallery<R>`, created with
`com.effacy.jui.ui.client.gallery.GalleryCreator` from a config, a store (`IStore<R>`, usually a
`PaginatedStore`) and a factory for its items (`Supplier<IGalleryItem<R>>` — `PanelGalleryItem.create (…)` or
`GalleryItemCreator.supplier (…)`).

```java
Gallery<Project> gallery = GalleryCreator.build (cfg -> {
    cfg.style (Gallery.Config.Style.GRID);
    cfg.emptyFiltered (el -> EmptyNotification.buildPanel (el, new EmptyNotification (p -> {
        p.title ("No projects match your search");
        p.action ("Clear search", () -> search.clear ());
    })));
}, store, PanelGalleryItem.create (item -> {
    item.width (Length.em (18));
    item.header (r -> r.getName (), h -> {
        h.titleIcon (FontAwesome.folder ());
        h.subtitle (r -> r.getSummary ());
        h.clickHandler (i -> open (i.getRecord ()));
    });
}));
add (gallery);
store.load (0, 12);
```

`GalleryCreator.$(parent, cfg -> …, store, itemFactory)` inserts it into a builder. Titles and subtitles are `Provider<String, D>`; the snippet assumes a lambda
satisfies it — check (`ProviderBuilder.string ("…")` gives a constant).

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| variant | `cfg.style (Gallery.Config.Style.GRID)` / `Style.ROW` | `GRID` is the default. |
| loading | — | Automatic from the store's load cycle; `quiet` for loads after the first. `showLoading (boolean quiet)` / `hideLoading ()` exist. |
| empty | `cfg.emptyUnfiltered (…)`, `cfg.emptyFiltered (…)`, `cfg.emptyError ((el, msg) -> …)` | The state is automatic from the store status; the methods only replace the notices. |
| error-message | — | `IStore.getStatusMessage()`. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The store's records, each drawn by the item factory. Mockup items describe the data and the item shape. A plain heading between items maps to `gallery.groupBy (r -> GroupDescriptor.of (…), (el, g) -> …)`. |
| last | `cfg.lastItem (el -> …)` — rendered after the items. |
| empty | The empty renderers, built with `EmptyNotification.buildPanel`. |

## States

The gallery pages by itself: when scrolled to the bottom it calls `loadNext` on an `IPaginatedStore` (or
`IOffsetStore`) until the store is fully loaded. A "Load more" button in `last` is not built in — wire it to the
store's `loadNext (…)` if wanted.

## Notes

- `scrollable` is on by default: the gallery fills its container's height and scrolls, which is what triggers
  paging. Give it a bounded height, or `cfg.scrollable (false)`.
- Theme with `--cpt-gallery-bg`, `--cpt-gallery-grid-padding`, `--cpt-gallery-grid-gap`.
