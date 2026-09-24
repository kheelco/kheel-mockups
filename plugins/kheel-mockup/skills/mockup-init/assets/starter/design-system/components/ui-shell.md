---
name: ui-shell
version: 1.0.0
kind: composed
status: active
summary: The frame every page sits in — sidebar navigation, top bar and main content.
---

# Shell

## Purpose

The shared frame of the product: a sidebar with the product name and navigation, a top bar for search and the
user, and the main content area. Every full page uses it, so people always find things in the same place.

## Anatomy

A sidebar (brand, `nav` slot) on the left; on the right, a top bar (`header` slot, notifications, user) above
the main area.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| product | content | text | Product | The product's name, shown top left. |
| user | content | text | | The signed-in user's name, shown top right. |

## Variants

None.

## States

None of its own.

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| nav | ui-nav | | Sidebar, below the product name | The main navigation. Placed automatically. |
| header | any | ui-text-field, ui-button | Row, left of the top bar | Global search or context. Place with `slot="header"`. |
| default | any | ui-panel | configurable | The page's content. Defaults to a column with `gap` 6. |

## Behaviour

The sidebar and top bar stay in place while the main area scrolls.

## Content rules

None.

## Accessibility

Landmarks: `nav` for navigation, `header` for the top bar, `main` for content. A skip link to `main` comes first.

## Rules of use

- Every `page` mockup of the product uses the shell, except sign-in and similar pages outside the product.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--viewport-height` | inherited | `100vh` | Minimum height, set by the viewer to the height available. |
| `--color-bg` | semantic |  | Page background. |
| `--color-surface`, `--color-border` | semantic |  | Sidebar and top bar surfaces and dividers. |
| `--color-action`, `--radius-md` | semantic |  | Product mark. |
| `--color-text` | semantic |  | Product name and user name. |
| `--color-surface-sunken`, `--color-text-muted`, `--radius-full` | semantic |  | User avatar. |
| `--font-body`, `--text-lg`, `--text-sm`, `--weight-semibold`, `--weight-medium` | semantic |  | Product name and user name type. |
| `--space-2`, `--space-3`, `--space-4`, `--space-5`, `--space-6` | semantic |  | Padding and gaps. |

## Template

```html
<div class="shell">
  <aside class="side">
    <div class="brand"><span class="mark"></span>{{product}}</div>
    <slot name="nav"></slot>
  </aside>
  <div class="column">
    <header class="top">
      <div class="header"><slot name="header"></slot></div>
      <ui-button variant="ghost" icon="bell" aria-label="Notifications"></ui-button>
      <span class="user" data-if="user"><span class="avatar"><ui-icon name="user" size="small"></ui-icon></span>{{user}}</span>
    </header>
    <main class="main" data-layout><slot></slot></main>
  </div>
</div>
```

## Style

```css
:host { display: block; }
.shell { display: grid; grid-template-columns: 232px 1fr; min-height: var(--viewport-height, 100vh); background: var(--color-bg); }
.side { background: var(--color-surface); border-right: 1px solid var(--color-border); padding: var(--space-4) var(--space-3); display: flex; flex-direction: column; gap: var(--space-5); }
.brand { display: flex; align-items: center; gap: var(--space-2); padding: 0 var(--space-3); font: var(--weight-semibold) var(--text-lg) / 1 var(--font-body); color: var(--color-text); }
.mark { width: 22px; height: 22px; border-radius: var(--radius-md); background: var(--color-action); }
.column { display: flex; flex-direction: column; min-width: 0; }
.top { display: flex; align-items: center; gap: var(--space-3); height: 56px; padding: 0 var(--space-6); background: var(--color-surface); border-bottom: 1px solid var(--color-border); }
.header { flex: 1; display: flex; align-items: center; gap: var(--space-3); }
.user { display: flex; align-items: center; gap: var(--space-2); font: var(--weight-medium) var(--text-sm) / 1 var(--font-body); color: var(--color-text); }
.avatar { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: var(--radius-full); background: var(--color-surface-sunken); color: var(--color-text-muted); }
.main { flex: 1; display: flex; flex-direction: column; gap: var(--space-6); padding: var(--space-6); }
```
