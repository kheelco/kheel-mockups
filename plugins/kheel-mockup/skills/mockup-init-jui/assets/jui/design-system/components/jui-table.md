---
name: jui-table
version: 1.0.0
kind: composed
status: active
summary: Table component — a store-backed data table with declared columns, sorting, row selection, and loading, empty and error states.
---

# Table (component)

## Purpose

Represents JUI's **Table** component (`Table` / `TableCreator`, `…client.table`): records from a store shown as
rows under declared column headers. Each column (`jui-table-column`, JUI's `Table.Config.Header`) has a title, an
optional icon, a width and an optional sort; each row (`jui-table-row`) is one record, and each cell
(`jui-table-cell`) is what the column's cell renderer draws for that record. The table is paginated through its
store: it loads the first page and loads more as it is scrolled to the bottom (infinite scrolling), shows a mask
while loading, and replaces the rows with an empty or error notice (`jui-empty-notification`) when the store holds
nothing.

Use a table when records are compared across the same set of fields. Use the **Gallery** (`jui-gallery`) instead
when each record is presented as a card or a stacked item rather than as columns.

## Anatomy

- **Header row** — the `jui-table-column` children, on the header surface with a divider beneath. When the table
  is `selectable` an empty selector column comes first.
- **Body** — the `jui-table-row` children; each row holds `jui-table-cell` children in column order and, when
  selectable, a leading checkbox cell. Rows are separated by hairline dividers; the last row has none.
- **Empty area** — shown in place of the body when the store is empty or in error: a `jui-empty-notification`
  (JUI's defaults unless one is placed in the `empty` slot).
- **Mask** — while loading, the table fades and JUI's three-bar loader shows in the centre (omitted when quiet).

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| variant | variant | standard, panel | standard | `panel` is JUI's `Table.Config.Variant.PANEL`: a rounded, bordered, cream container with small uppercase headings. |
| selectable | variant | boolean | | Adds the selector (checkbox) column (JUI `selectable()`). |
| clickable | variant | boolean | | Rows are clickable (JUI `onclick(…)`): pointer cursor and a hover background. Give rows `href` or `opens`. |
| loading | state | none, indicator, quiet | none | Shows the loading mask; `quiet` fades the table without the loader, as when a further page is loading. |
| empty | state | none, unfiltered, filtered, error | none | Replaces the rows with the empty notice for an empty store, an empty filtered result, or a store error. |
| error-message | content | text | The service is currently unavailable. | The store's status message shown by the default error notice. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | standard | Transparent container; header row on the muted surface. The default for tables in panels. |
| variant | panel | Stand-alone table in its own rounded, bordered container (JUI `PANEL`). |
| selectable | on | Records can be selected for a bulk action; each row gets a checkbox. |
| clickable | on | A row opens its record. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Loading | idle | `loading="none"` | — |
| Loading | loading | `loading="indicator"` | Table and empty area at half opacity, three-bar loader centred over them. |
| Loading | loading-quiet | `loading="quiet"` | Table at half opacity, no loader (loading a further page). |
| Content | populated | `empty="none"` | Header and rows. |
| Content | empty-unfiltered | `empty="unfiltered"` | Rows hidden; "Sorry, no results found" notice under the header. |
| Content | empty-filtered | `empty="filtered"` | As unfiltered (JUI falls back to the unfiltered notice unless `emptyFiltered(…)` is set); put a notice with a "Clear filters" action in the `empty` slot. |
| Content | error | `empty="error"` | Rows hidden; "Sorry, there was a problem" notice with `error-message`. |

Row states (hover, selected) belong to `jui-table-row`; sort states to `jui-table-column`.

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| columns | jui-table-column | jui-table-column | Header row, one cell per column | The column headers, in order. |
| default | jui-table-row | jui-table-row | Table body, one row per record | The rows (records), in store order. |
| empty | jui-empty-notification | jui-empty-notification | Centred column | Replaces JUI's default notice for the current `empty` state. |

## Behaviour

- **Sorting.** Clicking a sortable column header activates its sort (in the column's default direction) or
  toggles the direction; the sort handler reorders the store and the table re-renders. Only one column is sorted
  at a time.
- **Paging.** The table loads the store's first page and asks for more when scrolled to the bottom; the further
  page loads quietly (`loading="quiet"`).
- **Selection.** Checking a row's box selects the record in the store's selection; the checkbox does not trigger
  the row click.
- **Row click.** With `clickable`, a click anywhere on a row (outside an interactive cell) passes the record to
  the `onclick` handler. In a mockup, put `href` or `opens` on the row.
- **Empty and error.** After a load the table shows the error notice when the store is in error, the filtered or
  unfiltered notice when it is empty, and the rows otherwise.

## Content rules

- Column titles are short nouns in sentence case: `Name`, `Last updated`.
- Every row has one cell per column, in column order.
- Empty notices say what is missing and, for a filtered result, how to widen it.

## Accessibility

The mockup uses CSS table layout; the real component renders a native `table` with `thead`/`th` and
`tbody`/`td`, so screen readers announce rows and columns. Sortable headers are operable by pointer only in JUI;
add a keyboard alternative where sorting matters. Selector checkboxes are native inputs.

## Rules of use

- Declare every column the rows use; do not leave columns without a header.
- Make a table `clickable` only when a row opens a record; use a link cell for a secondary destination.
- Show the loading, empty and error states in the mockup (with `loading` and `empty`) — they are where screens
  most often go wrong.
- Use a gallery for card-like presentation; a table for comparing fields.

## Tokens

The tokens the style uses: its own component tokens (JUI's `--cpt-tbl-*` layer, points of variation a theme can
set), semantic tokens from `tokens.md`, and tokens inherited from another component or the viewer. The header,
row and cell tokens are set here and read by `jui-table-column`, `jui-table-row` and `jui-table-cell`.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-tbl-selector-width` | component | `--jui-comp-table-selector-width` | Width of the selector column. |
| `--cpt-tbl-selector-display` | component | `none` | Shows the selector cells in the header and rows; `table-cell` when `selectable`. |
| `--cpt-tbl-header-gap` | component | `--jui-space-2` | Gap between a header's icon, title and sort indicator. |
| `--cpt-tbl-bg` | component | `--jui-comp-table-surface` | Container background; cream for `panel`. |
| `--cpt-tbl-border` | component | `0 solid transparent` | Container border; a hairline for `panel`. |
| `--cpt-tbl-radius` | component | `--jui-comp-table-radius` | Container radius; `12px` for `panel`. |
| `--cpt-tbl-shadow` | component | `--jui-comp-table-shadow` | Container shadow; a soft shadow for `panel`. |
| `--cpt-tbl-header-bg` | component | `--jui-comp-table-header-surface` | Header row background. |
| `--cpt-tbl-sticky-bg` | component | `--jui-comp-table-sticky-surface` | Sticky header background when the table scrolls (JUI `scrollable`); not drawn in a still mockup. |
| `--cpt-tbl-hover-bg` | component | `--jui-comp-table-row-hover` | Row hover background (transparent by default). |
| `--cpt-tbl-hover-clickable-bg` | component | `--jui-comp-table-row-hover-clickable` | Row hover background when `clickable`. |
| `--cpt-tbl-row-hover-bg` | component | `--cpt-tbl-hover-bg` | The hover background rows use; `--cpt-tbl-hover-clickable-bg` when `clickable`. |
| `--cpt-tbl-row-cursor` | component | `default` | Row cursor; `pointer` when `clickable`. |
| `--cpt-tbl-header-color` | component | `--jui-comp-table-heading-text` | Header text colour; plum for `panel`. |
| `--cpt-tbl-header-font-size` | component | `inherit` | Header text size; `11.5px` for `panel`. |
| `--cpt-tbl-header-font-weight` | component | `--jui-font-weight-medium` | Header weight; `700` for `panel`. |
| `--cpt-tbl-header-text-transform` | component | `none` | `uppercase` for `panel`. |
| `--cpt-tbl-header-letter-spacing` | component | `normal` | `0.1em` for `panel`. |
| `--cpt-tbl-header-padding` | component | `--jui-space-3 --jui-space-4 --jui-space-2` | Header cell padding. |
| `--cpt-tbl-header-border` | component | `1px solid --jui-comp-table-border` | Divider under the header row. |
| `--cpt-tbl-header-icon-color` | component | `--jui-comp-table-heading-icon` | Header icon colour. |
| `--cpt-tbl-sort-indicator-color` | component | `--jui-comp-table-sort-indicator` | Colour of the indicator on a sortable, unsorted column. |
| `--cpt-tbl-cell-color` | component | `--jui-comp-table-cell-text` | Body text colour. |
| `--cpt-tbl-cell-padding` | component | `--jui-space-1 --jui-space-4` | Body cell padding. |
| `--cpt-tbl-row-border` | component | `1px solid --jui-comp-table-row-border` | Divider between rows. |
| `--cpt-tbl-mask-opacity` | component | `--jui-comp-table-mask-opacity` | Opacity of the table while loading. |
| `--jui-comp-table-selector-width`, `--jui-comp-table-surface`, `--jui-comp-table-radius`, `--jui-comp-table-shadow`, `--jui-comp-table-header-surface`, `--jui-comp-table-sticky-surface`, `--jui-comp-table-row-hover`, `--jui-comp-table-row-hover-clickable`, `--jui-comp-table-heading-text`, `--jui-comp-table-border`, `--jui-comp-table-heading-icon`, `--jui-comp-table-sort-indicator`, `--jui-comp-table-cell-text`, `--jui-comp-table-row-border`, `--jui-comp-table-mask-opacity` | semantic | | The table family defaults the component tokens start from. |
| `--jui-space-1`, `--jui-space-2`, `--jui-space-3`, `--jui-space-4` | semantic | | Header and cell padding, header gap. |
| `--jui-font-weight-medium` | semantic | | Header weight. |
| `--jui-state-waiting` | semantic | | Loader bars. |

## Template

```html
<div class="table">
  <div class="thead">
    <div class="tr">
      <div class="th selector"></div>
      <slot name="columns"></slot>
    </div>
  </div>
  <div class="tbody"><slot></slot></div>
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
  --cpt-tbl-selector-width: var(--jui-comp-table-selector-width);
  --cpt-tbl-selector-display: none;
  --cpt-tbl-header-gap: var(--jui-space-2);
  --cpt-tbl-bg: var(--jui-comp-table-surface);
  --cpt-tbl-border: 0 solid transparent;
  --cpt-tbl-radius: var(--jui-comp-table-radius);
  --cpt-tbl-shadow: var(--jui-comp-table-shadow);
  --cpt-tbl-header-bg: var(--jui-comp-table-header-surface);
  --cpt-tbl-sticky-bg: var(--jui-comp-table-sticky-surface);
  --cpt-tbl-hover-bg: var(--jui-comp-table-row-hover);
  --cpt-tbl-hover-clickable-bg: var(--jui-comp-table-row-hover-clickable);
  --cpt-tbl-row-hover-bg: var(--cpt-tbl-hover-bg);
  --cpt-tbl-row-cursor: default;
  --cpt-tbl-header-color: var(--jui-comp-table-heading-text);
  --cpt-tbl-header-font-size: inherit;
  --cpt-tbl-header-font-weight: var(--jui-font-weight-medium);
  --cpt-tbl-header-text-transform: none;
  --cpt-tbl-header-letter-spacing: normal;
  --cpt-tbl-header-padding: var(--jui-space-3) var(--jui-space-4) var(--jui-space-2);
  --cpt-tbl-header-border: 1px solid var(--jui-comp-table-border);
  --cpt-tbl-header-icon-color: var(--jui-comp-table-heading-icon);
  --cpt-tbl-sort-indicator-color: var(--jui-comp-table-sort-indicator);
  --cpt-tbl-cell-color: var(--jui-comp-table-cell-text);
  --cpt-tbl-cell-padding: var(--jui-space-1) var(--jui-space-4);
  --cpt-tbl-row-border: 1px solid var(--jui-comp-table-row-border);
  --cpt-tbl-mask-opacity: var(--jui-comp-table-mask-opacity);
  background: var(--cpt-tbl-bg);
  border: var(--cpt-tbl-border);
  border-radius: var(--cpt-tbl-radius);
  box-shadow: var(--cpt-tbl-shadow);
}
:host([selectable]) { --cpt-tbl-selector-display: table-cell; }
:host([clickable]) { --cpt-tbl-row-hover-bg: var(--cpt-tbl-hover-clickable-bg); --cpt-tbl-row-cursor: pointer; }
:host([variant="panel"]) {
  --cpt-tbl-bg: #faf5ee;
  --cpt-tbl-border: 1px solid #ece0ec;
  --cpt-tbl-radius: 12px;
  --cpt-tbl-shadow: 0 1px 2px rgba(46,26,46,0.03), 0 1px 6px rgba(46,26,46,0.04);
  --cpt-tbl-header-bg: #faf5ee;
  --cpt-tbl-header-border: 1px solid #ece0ec;
  --cpt-tbl-header-color: #6b3e6b;
  --cpt-tbl-header-font-size: 11.5px;
  --cpt-tbl-header-font-weight: 700;
  --cpt-tbl-header-letter-spacing: 0.1em;
  --cpt-tbl-header-text-transform: uppercase;
  --cpt-tbl-header-padding: 0.85em 1em;
  --cpt-tbl-header-icon-color: #b893b8;
  --cpt-tbl-sticky-bg: #faf5ee;
  --cpt-tbl-sort-indicator-color: #b893b8;
  --cpt-tbl-cell-color: #2e1a2e;
  --cpt-tbl-cell-padding: 0.9em 1em;
  --cpt-tbl-row-border: 1px solid #f4ede2;
  --cpt-tbl-hover-bg: #faf5ee;
}
.table { display: table; width: 100%; border-collapse: separate; border-spacing: 0; table-layout: fixed; }
.thead { display: table-header-group; }
.tr { display: table-row; background: var(--cpt-tbl-header-bg); }
.tbody { display: table-row-group; }
.th.selector {
  display: var(--cpt-tbl-selector-display);
  width: var(--cpt-tbl-selector-width);
  padding: var(--cpt-tbl-header-padding);
  border-bottom: var(--cpt-tbl-header-border);
}
.empty { display: none; min-height: 12em; }
:host([empty="unfiltered"]) .empty, :host([empty="filtered"]) .empty, :host([empty="error"]) .empty { display: block; }
:host([empty="unfiltered"]) .tbody, :host([empty="filtered"]) .tbody, :host([empty="error"]) .tbody { display: none; }
.mask { display: none; position: absolute; inset: 0; z-index: 2; }
:host([loading="indicator"]) .mask, :host([loading="quiet"]) .mask { display: block; }
:host([loading="indicator"]) .table, :host([loading="quiet"]) .table,
:host([loading="indicator"]) .empty, :host([loading="quiet"]) .empty { opacity: var(--cpt-tbl-mask-opacity); }
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
  <jui-table selectable="" clickable="">
    <jui-table-column label="Name" sortable="" sort="ascending" column-width="large"/>
    <jui-table-column label="Email" icon="mail"/>
    <jui-table-column label="Role" sortable="" column-width="medium"/>
    <jui-table-column label="Last active" sortable="" column-width="medium"/>
    <jui-table-row>
      <jui-table-cell renderer="link">Ada Lovelace</jui-table-cell>
      <jui-table-cell>ada@example.com</jui-table-cell>
      <jui-table-cell>Administrator</jui-table-cell>
      <jui-table-cell>2 hours ago</jui-table-cell>
    </jui-table-row>
    <jui-table-row selected="" state="hover">
      <jui-table-cell renderer="link">Grace Hopper</jui-table-cell>
      <jui-table-cell>grace@example.com</jui-table-cell>
      <jui-table-cell>Editor</jui-table-cell>
      <jui-table-cell>Yesterday</jui-table-cell>
    </jui-table-row>
    <jui-table-row selected="">
      <jui-table-cell renderer="link">Alan Turing</jui-table-cell>
      <jui-table-cell>alan@example.com</jui-table-cell>
      <jui-table-cell>Viewer</jui-table-cell>
      <jui-table-cell>3 days ago</jui-table-cell>
    </jui-table-row>
  </jui-table>
  <jui-table variant="panel">
    <jui-table-column label="Invoice" sortable="" sort="descending" column-width="medium"/>
    <jui-table-column label="Customer"/>
    <jui-table-column label="Amount" column-width="medium"/>
    <jui-table-row>
      <jui-table-cell>1042</jui-table-cell>
      <jui-table-cell>Northwind Traders</jui-table-cell>
      <jui-table-cell alignment="right">$1,250.00</jui-table-cell>
    </jui-table-row>
    <jui-table-row>
      <jui-table-cell>1041</jui-table-cell>
      <jui-table-cell>Contoso Ltd</jui-table-cell>
      <jui-table-cell alignment="right">$320.00</jui-table-cell>
    </jui-table-row>
  </jui-table>
  <div layout="row" gap="4" align="start">
    <jui-table grow="" loading="indicator">
      <jui-table-column label="Name"/>
      <jui-table-column label="Status"/>
      <jui-table-row>
        <jui-table-cell>Loading page</jui-table-cell>
        <jui-table-cell>Pending</jui-table-cell>
      </jui-table-row>
      <jui-table-row>
        <jui-table-cell>Another record</jui-table-cell>
        <jui-table-cell>Pending</jui-table-cell>
      </jui-table-row>
    </jui-table>
    <jui-table grow="" empty="unfiltered">
      <jui-table-column label="Name"/>
      <jui-table-column label="Status"/>
    </jui-table>
    <jui-table grow="" empty="error" error-message="Could not reach the server.">
      <jui-table-column label="Name"/>
      <jui-table-column label="Status"/>
    </jui-table>
  </div>
</div>
```
