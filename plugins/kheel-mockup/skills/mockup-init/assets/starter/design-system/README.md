---
name: Starter
version: 0.1.0
prefix: ui
source: local
---

# Starter design system

A small, neutral design system to start mockups with. It covers the parts most business applications need —
controls, cards, panels, grids, tables, navigation and dialogs — in a quiet grey-and-blue look that keeps
attention on structure. Make it the product's own by changing the tokens, and by adding, changing or removing
components as the product needs.

This file is the manifest: it lists everything the design system contains. A component, pattern or icon that is
not listed here is not part of the design system. `index.html`, `_runtime.js` and `_guide.md` in this folder
are the viewer and its guide — part of the mockup mechanism, not of the design system.

## Tokens

- [Tokens](tokens.md) — colour, type, spacing, radius, elevation and motion.

## Components

| Component | Version | Kind | Summary |
| --- | --- | --- | --- |
| [ui-icon](components/ui-icon.md) | 1.0.0 | elemental | Shows one icon from the design system's icon set. |
| [ui-button](components/ui-button.md) | 1.0.0 | composed | Triggers an action. |
| [ui-badge](components/ui-badge.md) | 1.0.0 | composed | Shows a short status or category label. |
| [ui-chip](components/ui-chip.md) | 1.0.0 | composed | A compact option the user can select or remove, typically a filter. |
| [ui-checkbox](components/ui-checkbox.md) | 1.0.0 | composed | A yes/no choice, alone or in a group, and row selection in tables. |
| [ui-text-field](components/ui-text-field.md) | 1.0.0 | composed | A labelled single-line text input with helper and error messages. |
| [ui-select](components/ui-select.md) | 1.0.0 | composed | Chooses one option from a list that opens on demand. |
| [ui-option](components/ui-option.md) | 1.0.0 | composed | One choice inside a select's list. |
| [ui-box](components/ui-box.md) | 1.0.0 | elemental | A general-purpose container with optional padding, border, surface and layout. |
| [ui-card](components/ui-card.md) | 1.0.0 | composed | A self-contained summary of one item, often one of many in a grid or list. |
| [ui-panel](components/ui-panel.md) | 1.0.0 | composed | A titled region of a page with actions in its header. |
| [ui-grid](components/ui-grid.md) | 1.0.0 | elemental | A responsive grid of equal-width items, such as cards. |
| [ui-table](components/ui-table.md) | 1.0.0 | composed | A table of items with sortable column headers, a toolbar, a footer and container states. |
| [ui-table-column](components/ui-table-column.md) | 1.0.0 | composed | One column header of a table, optionally sortable. |
| [ui-table-row](components/ui-table-row.md) | 1.0.0 | elemental | One row of a table. |
| [ui-table-cell](components/ui-table-cell.md) | 1.0.0 | elemental | One cell of a table row. |
| [ui-pagination](components/ui-pagination.md) | 1.0.0 | composed | Moves between pages of a long list and says where the user is. |
| [ui-empty-state](components/ui-empty-state.md) | 1.0.0 | composed | Explains why there is nothing to show and what to do next. |
| [ui-nav](components/ui-nav.md) | 1.0.0 | composed | The product's main navigation, as a vertical list of items and groups. |
| [ui-nav-group](components/ui-nav-group.md) | 1.0.0 | composed | A labelled group of navigation items. |
| [ui-nav-item](components/ui-nav-item.md) | 1.0.0 | composed | One place in the navigation. |
| [ui-shell](components/ui-shell.md) | 1.0.0 | composed | The frame every page sits in — sidebar navigation, top bar and main content. |
| [ui-dialog](components/ui-dialog.md) | 1.0.0 | composed | A modal surface for a short task or a confirmation. |

## Behaviours

- [Shared behaviours](behaviours.md) — field validation, remote list loading, sortable columns, filtering.

## Patterns

| Pattern | Summary |
| --- | --- |
| [Data table](patterns/data-table.md) | Finding, sorting and acting on records in a table. |
| [Card gallery](patterns/card-gallery.md) | Browsing and filtering visual items in a grid of cards. |

## Icons

From [Lucide](https://lucide.dev) (ISC licence, see `assets/icons/LICENSE-lucide.txt`).

`arrow-down` `arrow-left` `arrow-up` `bell` `briefcase` `calendar` `check` `chevron-down` `chevron-left` `chevron-right` `chevron-up` `chevrons-up-down` `circle-alert` `circle-check` `circle-x` `clock` `download` `ellipsis` `external-link` `eye` `file-text` `filter` `folder` `house` `image` `inbox` `info` `layout-grid` `list` `loader-circle` `log-out` `mail` `map-pin` `minus` `pencil` `phone` `plus` `refresh-cw` `search` `settings` `star` `tag` `trash-2` `triangle-alert` `upload` `user` `users` `x`
