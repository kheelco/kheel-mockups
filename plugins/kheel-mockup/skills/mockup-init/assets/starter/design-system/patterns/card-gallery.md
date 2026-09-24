# Card gallery

## Purpose and when to use it

Browsing a collection of items that are recognised by sight or read as a whole — sites, products, documents,
people — and narrowing it with a filter bar. Use the **Data table** when people compare fields across items.

## Components

`ui-panel` (variant `plain`), `ui-box` (the filter bar), `ui-text-field` (search), `ui-chip` (quick filters),
`ui-select` (further filters and sort), `ui-grid`, `ui-card`, `ui-badge`, `ui-empty-state`.

## Supported variations

| Variation | Optional | Depends on |
| --- | --- | --- |
| Search | yes | — |
| Quick filter chips | yes | A filter with two to six common values. |
| Further filters | yes | — |
| Sort | yes | More than one meaningful order. |
| Media on cards | yes | Items that have a picture. |

## Arrangement rules

| Area | Rule |
| --- | --- |
| Filter bar | A row directly above the grid: search on the left, then chips for the most common filter, then selects for the rest; sort, if any, on the far right. |
| Clear filters | Appears at the end of the chips when any filter is active. |
| Result count | Beneath the filter bar, left-aligned: "24 sites". |
| Grid | `ui-grid` with `min` chosen for the card content; every card in the grid has the same structure. |
| Cards | Title, subtitle and at most two badges; the whole card opens the item. |
| More | Pagination beneath the grid for large collections; otherwise the whole set. |

Filters follow the shared **Filtering** behaviour: they apply immediately, combine with AND across filters, and
reset pagination.

## States and data conditions

| Condition | Handling |
| --- | --- |
| Loading | Cards in their `loading` state, as many as a typical first page. |
| Nothing yet | A page state with an empty state inviting the first item; no filter bar. |
| Nothing matches | The filter bar stays; the grid is replaced by "No *items* match these filters" and Clear filters. |
| Error | The grid is replaced by an error message and Retry. |

## Accessibility

The grid is a list (`role="list"`); each card is a list item whose title is its link. Chip selection and the
result count are announced.

## Rules of use

- Don't put more than six chips in the bar; move the rest into a select.
- Don't mix card structures in one gallery.

## Example

```xml
<ui-panel variant="plain" title="Sites">
  <ui-box layout="row" gap="2" align="center" wrap="">
    <ui-text-field icon="search" placeholder="Search sites"/>
    <ui-chip label="All" selected=""/>
    <ui-chip label="Residential"/>
    <ui-chip label="Commercial"/>
    <ui-select placeholder="Any region" icon="map-pin" ml="auto"/>
  </ui-box>
  <small>3 sites</small>
  <ui-grid>
    <ui-card title="12 Kauri St" subtitle="Residential" media="placeholder" href="#"/>
    <ui-card title="Harbour Tower" subtitle="Commercial" media="placeholder" href="#"/>
    <ui-card title="Mill Rd depot" subtitle="Commercial" media="placeholder" href="#"/>
  </ui-grid>
</ui-panel>
```
