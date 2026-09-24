---
name: jui-gallery
version: 1.0.0
kind: composed
status: active
summary: Gallery component — a store-backed collection of items in a grid or rows, with infinite paging and loading, empty and error states.
---

# Gallery (component)

## Purpose

Represents JUI's **Gallery** component (`Gallery` / `GalleryCreator`, `…client.gallery`): records from a store,
each drawn by a gallery item (`IGalleryItem`, typically a `PanelGalleryItem` — `jui-panel-gallery-item` — or one
built with `GalleryItemCreator`), laid out as a wrapping grid of tiles (`Style.GRID`) or as full-width rows
(`Style.ROW`). The gallery is paginated through its store: it loads the first page and loads the next as it is
scrolled to the bottom (infinite scrolling, no pager). It shows a mask while loading and replaces the items with
an empty or error notice (`jui-empty-notification`) when the store holds nothing.

Use a gallery when each record is best seen as a card or a stacked item. Use the **Table** (`jui-table`) instead
when records are compared field by field in columns.

## Anatomy

- **Items** — one gallery item per record, wrapped with a gap (grid) or stacked full width (row), inside 1em of
  padding.
- **Last item area** — optional content after the items (JUI `lastItem(…)`): a "Load more" action, a count such
  as "Showing 24 of 132", or an "Add" tile.
- **Empty area** — shown instead of the items when the store is empty or in error: JUI's default notice unless
  one is placed in the `empty` slot.
- **Mask** — while loading, the gallery fades and JUI's three-bar loader shows in the centre (omitted when quiet).

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| variant | variant | grid, row | grid | The layout (JUI `style(Style.GRID)` or `style(Style.ROW)`). |
| loading | state | none, indicator, quiet | none | Shows the loading mask; `quiet` fades the items without the loader, as while the next page loads. |
| empty | state | none, unfiltered, filtered, error | none | Replaces the items with the empty notice for an empty store, an empty filtered result, or a store error. |
| error-message | content | text | The service is currently unavailable. | The store's status message shown by the default error notice. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | grid | Tiles of a fixed width that wrap across the available width: people, projects, documents. |
| variant | row | Full-width items stacked one per line: activity, search results, richer summaries. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Loading | idle | `loading="none"` | — |
| Loading | loading | `loading="indicator"` | Items and empty area at half opacity, three-bar loader centred over them (the first load). |
| Loading | loading-quiet | `loading="quiet"` | Items at half opacity, no loader (loading the next page). |
| Content | populated | `empty="none"` | Items, then the last item area if filled. |
| Content | empty-unfiltered | `empty="unfiltered"` | Items hidden; "Sorry, no results found" notice. |
| Content | empty-filtered | `empty="filtered"` | As unfiltered unless `emptyFiltered(…)` is set; put a notice with a "Clear filters" action in the `empty` slot. |
| Content | error | `empty="error"` | Items hidden; "Sorry, there was a problem" notice with `error-message`. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | jui-panel-gallery-item | Wrapping tiles (grid) or full-width rows (row) | The items, one per record, in store order. |
| last | any | jui-btn | Full-width area after the items | JUI's `lastItem(…)`: "Load more", a result count, or an "Add" tile. |
| empty | jui-empty-notification | jui-empty-notification | Centred column | Replaces JUI's default notice for the current `empty` state. |

## Behaviour

- **Paging.** The gallery asks its store for the next page when scrolled to within a few pixels of the bottom (and
  after a resize leaves room); the next page loads quietly. A "Load more" action in the `last` area is an
  alternative the store can offer.
- **Filtering.** A search or filter control re-queries the store; while it reloads the gallery shows the loading
  state, then the items, or the filtered-empty notice when nothing matches.
- **Empty and error.** After a load the gallery shows the error notice when the store is in error, the filtered
  or unfiltered notice when it is empty, and the items otherwise.
- **Grouping.** JUI can insert group headings between items (`groupBy(…)`); place a heading element between
  items to show it.

## Content rules

- Keep items in one gallery the same kind and the same size.
- Empty notices say what is missing and, for a filtered result, how to widen it.

## Accessibility

Each item should be a single focusable target when it opens a record. The loading state should be announced in
the real implementation (the mask is visual only in JUI).

## Rules of use

- Show the first-load, empty, filtered-empty and error states in mockups — use `loading` and `empty`.
- Use `grid` for scanning many similar things, `row` when each item carries more text.
- Use a table when people compare values across records.

## Tokens

The tokens the style uses: JUI's `--cpt-gallery-*` component tokens, and semantic tokens from `tokens.md`.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-gallery-bg` | component | `transparent` | Background behind the items. |
| `--cpt-gallery-grid-padding` | component | `1em` | Padding around the items (both styles; JUI's row style hard-codes the same value). |
| `--cpt-gallery-grid-gap` | component | `1em` | Gap between items (both styles). |
| `--jui-state-waiting` | semantic | | Loader bars. |

## Template

```html
<div class="gallery">
  <div class="target">
    <slot></slot>
    <div class="last"><slot name="last"></slot></div>
  </div>
</div>
<div class="empty">
  <slot name="empty">
    <jui-empty-notification data-if="!empty=error" heading="Sorry, no results found">We were not able to find anything to display.</jui-empty-notification>
    <jui-empty-notification data-if="empty=error" heading="Sorry, there was a problem">{{error-message}}</jui-empty-notification>
  </slot>
</div>
<div class="mask"><div class="loader"></div></div>
```

## Style

```css
:host {
  display: block;
  position: relative;
  overflow: hidden;
  --cpt-gallery-bg: transparent;
  --cpt-gallery-grid-padding: 1em;
  --cpt-gallery-grid-gap: 1em;
}
.gallery { background: var(--cpt-gallery-bg); }
.target { padding: var(--cpt-gallery-grid-padding); display: flex; flex-wrap: wrap; gap: var(--cpt-gallery-grid-gap); }
:host([variant="row"]) ::slotted(*) { width: 100%; }
.last { display: none; flex-basis: 100%; }
:host([data-filled~="last"]) .last { display: block; }
.empty { display: none; min-height: 14em; }
:host([empty="unfiltered"]) .empty, :host([empty="filtered"]) .empty, :host([empty="error"]) .empty { display: block; }
:host([empty="unfiltered"]) .gallery, :host([empty="filtered"]) .gallery, :host([empty="error"]) .gallery { display: none; }
.mask { display: none; position: absolute; inset: 0; z-index: 2; }
:host([loading="indicator"]) .mask, :host([loading="quiet"]) .mask { display: block; }
:host([loading="indicator"]) .gallery, :host([loading="quiet"]) .gallery,
:host([loading="indicator"]) .empty, :host([loading="quiet"]) .empty { opacity: 0.5; }
.mask .loader { font-size: 0.8em; position: absolute; left: 50%; top: 50%; margin: -2em auto 0 auto; }
:host([loading="quiet"]) .mask .loader { display: none; }
.loader, .loader::before, .loader::after {
  background: var(--jui-state-waiting);
  animation: jui-loader 1s infinite ease-in-out;
  width: 1em; height: 4em; border-radius: 1em;
}
.loader { animation-delay: 0.16s; }
.loader::before, .loader::after { position: absolute; top: 0; content: ''; }
.loader::before { animation-delay: 0.32s; left: -1.5em; }
.loader::after { left: 1.5em; }
@keyframes jui-loader { 0%, 80%, 100% { height: 4em; } 40% { height: 5em; } }
```

## Example

```xml
<div layout="column" gap="6">
  <jui-gallery spec="Backed by a PaginatedStore of projects, 12 per page; the next page loads on scrolling to the bottom.">
    <jui-panel-gallery-item heading="Website refresh" subtitle="12 tasks, due Friday" title-icon="folder" title-link="" menu="" item-width="medium"/>
    <jui-panel-gallery-item heading="Mobile app" subtitle="4 tasks, due next week" title-icon="folder" title-link="" menu="" item-width="medium"/>
    <jui-panel-gallery-item heading="Brand guidelines" subtitle="Completed" title-icon="folder" title-link="" menu="" item-width="medium"/>
    <jui-panel-gallery-item heading="Quarterly report" subtitle="Draft" title-icon="file-text" title-link="" menu="" item-width="medium" state="hover"/>
    <div slot="last" layout="row" gap="3" align="center" justify="center">
      <span>Showing 4 of 27</span>
      <jui-btn label="Load more" variant="outlined"/>
    </div>
  </jui-gallery>
  <jui-gallery variant="row">
    <jui-panel-gallery-item heading="Ada Lovelace updated the project plan" subtitle="2 hours ago" title-icon="pencil"/>
    <jui-panel-gallery-item heading="Grace Hopper invited Alan Turing" subtitle="Yesterday" title-icon="user"/>
  </jui-gallery>
  <div layout="row" gap="4" align="start">
    <jui-gallery grow="" loading="indicator">
      <jui-panel-gallery-item heading="Website refresh" title-icon="folder" item-width="small"/>
      <jui-panel-gallery-item heading="Mobile app" title-icon="folder" item-width="small"/>
      <jui-panel-gallery-item heading="Brand guidelines" title-icon="folder" item-width="small"/>
    </jui-gallery>
    <jui-gallery grow="" empty="filtered">
      <jui-empty-notification heading="No projects match your search">
        <p>Try a different search term.</p>
        <jui-btn slot="actions" label="Clear search"/>
      </jui-empty-notification>
    </jui-gallery>
    <jui-gallery grow="" empty="error" error-message="Could not reach the server."/>
  </div>
</div>
```
