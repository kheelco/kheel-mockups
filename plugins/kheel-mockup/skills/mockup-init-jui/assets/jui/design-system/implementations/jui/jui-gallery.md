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
| height | the height of the gallery's container | Give the panel or region holding the gallery that height; the gallery takes `height: 100%` of it. |
| scrollable | `cfg.scrollable (false)` | `true` is the default (no call). |
| grow | how the gallery is placed | See **Notes**. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The store's records, each drawn by the item factory. Mockup items describe the data and the item shape. A plain heading between items maps to `gallery.groupBy (r -> GroupDescriptor.of (…), (el, g) -> …)`. |
| last | `cfg.lastItem (el -> …)` — rendered after the items. |
| empty | The empty renderers, built with `EmptyNotification.buildPanel`, or the application's own content built into the element. |

## States

The gallery pages by itself: whenever it is scrolled to the bottom (and after each page renders, and on a window
resize) it calls `loadNext` on an `IPaginatedStore` (or `IOffsetStore`) until the store is fully loaded. A "Load
more" action in `last` calls the store's `loadNext (…)` itself; the gallery's own paging still runs alongside it.

## Notes

- `scrollable` is on by default: the gallery fills its container's height and scrolls, which is what triggers
  paging. The height must be bounded: a gallery whose height follows its content is always "at the bottom" and
  loads the whole store, page after page. The same is true of `cfg.scrollable (false)` with a paginated store, so
  keep that for stores that hold a handful of records.
- In JUI a gallery fills its container (`height: 100%`) and the containers that frame a page fit their content to
  their own height (`CardFitLayout`, the default for panels and for a tab navigator's body). A mockup's `grow` on
  the gallery, under a toolbar in a `layout="column"` title panel, is in JUI a `TriSplitPanel` with the toolbar added
  with `addTop(…)` and the gallery as its content: the title panel fits the split panel to its height and the split
  panel fits the gallery to what is left. Don't add the gallery to a `VertLayout` (or a `scrollable()` panel), which
  leaves its height to its content.
- Theme with `--cpt-gallery-bg`, `--cpt-gallery-grid-padding`, `--cpt-gallery-grid-gap`.
