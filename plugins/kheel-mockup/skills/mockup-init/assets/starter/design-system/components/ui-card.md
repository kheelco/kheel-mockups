---
name: ui-card
version: 1.0.0
kind: composed
status: active
summary: A self-contained summary of one item, often one of many in a grid or list.
---

# Card

## Purpose

Summarises one item — a job, a product, a person — so it can be scanned among others and opened for more. Cards
usually appear in a grid (see the **Card gallery** pattern). For a titled region of a page rather than an item,
use a panel.

## Anatomy

A raised, bordered surface with, from top to bottom: an optional media area; a header with title, optional
subtitle and badges; the body; and an optional footer of actions.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| title | content | text | | The item's name. |
| subtitle | content | text | | A secondary line: a date, an owner, a category. |
| href | content | path | | Mockup to open when the card is clicked. Makes the whole card interactive. |
| media | variant | none, placeholder | none | `placeholder` shows an image placeholder when the mockup has no real image; use the `media` slot for a real one. |
| selected | state | boolean | | Puts the card in the selected state. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| media | none | Text-first items. |
| media | placeholder | Visual items (products, sites, documents) before real imagery exists. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | resting | Default | Border, small shadow. |
| Interaction | hover | `:hover` when `href` is set | Medium shadow; title takes the link colour. |
| Interaction | focus | `:focus-visible` when `href` is set | Focus ring around the card. |
| Selection | unselected | Default | — |
| Selection | selected | `selected` property | Action-coloured 2 px border. |
| Loading | loaded | Default | — |
| Loading | loading | Data still arriving | Skeleton bars in place of the text. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| media | img, any | | Fills the top, 16:9 | A real image or visual. |
| badges | ui-badge | ui-badge | Row, top right of the header | Status of the item. |
| default | any | | configurable | Body: a few lines of key facts. |
| actions | ui-button | ui-button | Row, right-aligned in the footer | Actions on the item. |

## Behaviour

When `href` is set, clicking anywhere on the card except an action opens the item. Actions in the footer act on
the item without opening it.

## Content rules

Title on one line where possible; the body shows at most three or four facts. Keep every card in a set to the
same structure so they can be compared.

## Accessibility

The title is the card's heading and, when interactive, its link; the whole-card click is an enhancement, not the
only target. Actions are separate buttons with their own labels.

## Rules of use

- Don't put more than two actions on a card; move the rest to the item's page.
- Don't mix interactive and non-interactive cards in one grid.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--color-surface`, `--color-border`, `--shadow-sm` | semantic |  | Card surface, border and resting elevation. |
| `--shadow-md`, `--color-link` | semantic |  | Elevation and title colour on hover. |
| `--color-action` | semantic |  | Border when selected. |
| `--color-focus-ring` | semantic |  | Focus ring. |
| `--color-surface-sunken`, `--color-text-subtle` | semantic |  | Media placeholder background and icon; loading skeleton bars. |
| `--color-text`, `--color-text-muted` | semantic |  | Title; subtitle and body text. |
| `--radius-lg`, `--radius-sm` | semantic |  | Card corners; skeleton bar corners. |
| `--font-body`, `--text-lg`, `--text-sm`, `--weight-semibold`, `--leading-tight` | semantic |  | Title and body type. |
| `--space-1`, `--space-2`, `--space-3`, `--space-4` | semantic |  | Padding and gaps. |
| `--duration-normal` | semantic |  | Hover transition. |

## Template

```html
<article class="card">
  <div class="media" data-if="media=placeholder"><ui-icon name="image" size="large"></ui-icon></div>
  <div class="media real"><slot name="media"></slot></div>
  <header>
    <div class="titles">
      <h3 class="title">{{title}}</h3>
      <p class="subtitle" data-if="subtitle">{{subtitle}}</p>
    </div>
    <div class="badges"><slot name="badges"></slot></div>
  </header>
  <div class="body" data-layout><slot></slot></div>
  <footer><slot name="actions"></slot></footer>
</article>
```

## Style

```css
:host { display: block; }
.card { display: flex; flex-direction: column; height: 100%; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); overflow: hidden; transition: box-shadow var(--duration-normal), border-color var(--duration-normal); }
:host([href]) .card { cursor: pointer; }
:host([href]:hover) .card, :host([state~="hover"]) .card { box-shadow: var(--shadow-md); }
:host([href]:hover) .title, :host([state~="hover"]) .title { color: var(--color-link); }
:host([state~="focus"]) .card { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; }
:host([selected]) .card { border-color: var(--color-action); box-shadow: 0 0 0 1px var(--color-action); }
.media { aspect-ratio: 16 / 9; background: var(--color-surface-sunken); color: var(--color-text-subtle); display: flex; align-items: center; justify-content: center; }
.media.real { display: none; }
:host([data-filled~="media"]) .media.real { display: block; }
.media.real ::slotted(img) { width: 100%; height: 100%; object-fit: cover; }
header { display: flex; gap: var(--space-3); align-items: flex-start; padding: var(--space-4) var(--space-4) 0; }
.titles { flex: 1; min-width: 0; }
.title { margin: 0; font: var(--weight-semibold) var(--text-lg) / var(--leading-tight) var(--font-body); color: var(--color-text); }
.subtitle { margin: var(--space-1) 0 0; font-size: var(--text-sm); color: var(--color-text-muted); }
.badges { display: flex; gap: var(--space-1); flex-wrap: wrap; justify-content: flex-end; }
.body { flex: 1; display: flex; flex-direction: column; gap: var(--space-1); padding: var(--space-3) var(--space-4) var(--space-4); font-size: var(--text-sm); color: var(--color-text-muted); }
footer { display: none; gap: var(--space-2); justify-content: flex-end; padding: var(--space-3) var(--space-4); border-top: 1px solid var(--color-border); }
:host([data-filled~="actions"]) footer { display: flex; }
:host([state~="loading"]) .title, :host([state~="loading"]) .subtitle, :host([state~="loading"]) .body { color: transparent; background: linear-gradient(var(--color-surface-sunken) 0 0) content-box; border-radius: var(--radius-sm); }
:host([state~="loading"]) .body ::slotted(*) { visibility: hidden; }
```

## Example

```xml
<ui-grid>
  <ui-card title="Blocked drain" subtitle="12 Kauri St · Today 2pm" href="#">
    <ui-badge tone="info" label="Scheduled"/>
    <span>Assigned to Mere Tipene</span>
    <span>Est. 2 h</span>
    <ui-button size="small" variant="ghost" label="Reassign"/>
  </ui-card>
  <ui-card title="Heat pump service" subtitle="Hover state" media="placeholder" state="hover">
    <ui-badge tone="warning" label="Due soon"/>
    <span>Annual maintenance</span>
  </ui-card>
  <ui-card title="Selected card" subtitle="With selection" selected="">
    <span>Selected cards show an action border.</span>
  </ui-card>
  <ui-card title="Loading card" subtitle="Loading" state="loading">
    <span>Skeleton</span>
  </ui-card>
</ui-grid>
```
