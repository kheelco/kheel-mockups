---
name: ui-grid
version: 1.0.0
kind: elemental
status: active
summary: A responsive grid of equal-width items, such as cards.
---

# Grid

## Purpose

Lays out a set of like items — cards, tiles, thumbnails — in equal columns that reflow to fit the width. For
arranging different parts of a page, use layout attributes on a box or plain element instead.

## Anatomy

A grid container with a slot. Columns are as many as fit at the minimum item width, unless fixed with `cols`.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| min | variant | small, medium, large | medium | Minimum item width before the grid drops a column: 12, 16 or 22 rem. |

The layout attributes `cols` (a fixed number of columns) and `gap` also apply.

## Variants

| Property | Value | Use |
| --- | --- | --- |
| min | small | Compact tiles, thumbnails. |
| min | medium | Cards. |
| min | large | Rich cards with media. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | populated | Items present | — |
| Content | empty | No items | The parent shows an empty state; the grid itself renders nothing. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | ui-card | configurable | The items. Each takes one cell; `span` widens one. |

## Behaviour

Reflows as the width changes. Item order is reading order.

## Content rules

Items in one grid share a structure.

## Accessibility

When the items are a list of like things, give the grid `role="list"` and each item `role="listitem"`.

## Rules of use

- Don't use a grid for a form; use layout attributes.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--grid-min` | component | `16rem` | Minimum item width before a column is dropped; `min` sets `12rem`, `16rem` or `22rem`. |
| `--space-4` | semantic |  | Default gap between items. |

## Template

```html
<div class="grid" data-layout><slot></slot></div>
```

## Style

```css
:host { display: block; --grid-min: 16rem; }
:host([min="small"]) { --grid-min: 12rem; }
:host([min="large"]) { --grid-min: 22rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(var(--grid-min), 100%), 1fr)); gap: var(--space-4); }
```

## Example

```xml
<ui-grid min="small">
  <ui-box padding="4" border="" radius="medium" surface="raised">One</ui-box>
  <ui-box padding="4" border="" radius="medium" surface="raised">Two</ui-box>
  <ui-box padding="4" border="" radius="medium" surface="raised">Three</ui-box>
  <ui-box padding="4" border="" radius="medium" surface="raised" span="2">Spans two</ui-box>
  <ui-box padding="4" border="" radius="medium" surface="raised">Five</ui-box>
</ui-grid>
```
