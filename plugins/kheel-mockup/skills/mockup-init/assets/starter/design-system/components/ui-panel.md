---
name: ui-panel
version: 1.0.0
kind: composed
status: active
summary: A titled region of a page with actions in its header.
---

# Panel

## Purpose

Frames one region of a page under a heading, with the actions that apply to that region in its header: the jobs
list, the customer's details, the activity log. For one item among many, use a card.

## Anatomy

A header (title, optional description, actions on the right), a body, and an optional footer.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| title | content | text | | The region's heading. |
| description | content | text | | One line beneath the title. |
| variant | variant | raised, plain | raised | `raised` is a bordered surface; `plain` has no surface, for regions directly on the page background. |
| padding | variant | normal, none | normal | `none` lets full-bleed content (tables) reach the edges. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | raised | The default for page regions. |
| variant | plain | Top-level page sections on the background, such as a page's own title and actions. |
| padding | none | Content that draws its own edges: tables, lists. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | populated | Default | — |
| Loading | loaded | Default | — |
| Loading | loading | Data still arriving | Body replaced by a spinner row. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| actions | any | ui-button, ui-select | Row, right of the title | Actions on the whole region. Place with `slot="actions"`. |
| default | any | | configurable | The body. |
| footer | any | | Row | Summary or secondary actions beneath the body. |

## Behaviour

None of its own.

## Content rules

Titles are nouns ("Jobs", "Contact details"). Keep header actions to three or fewer.

## Accessibility

The title is a heading at the level that fits the page's outline (h2 by default).

## Rules of use

- One primary button per panel at most, and one per page overall where possible.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--color-surface`, `--color-border`, `--shadow-sm` | semantic |  | Surface, border and elevation of the raised variant; `--color-border` also divides the footer. |
| `--color-text-muted` | semantic |  | Description and loading text. |
| `--color-border-strong` | semantic |  | Loading spinner track. |
| `--radius-lg` | semantic |  | Corners. |
| `--font-body`, `--text-xl`, `--text-2xl`, `--text-sm`, `--weight-semibold`, `--leading-tight` | semantic |  | Title (`--text-2xl` in the plain variant) and description type. |
| `--space-1`, `--space-2`, `--space-3`, `--space-4`, `--space-5`, `--space-8` | semantic |  | Padding and gaps. |

## Template

```html
<section class="panel">
  <header>
    <div class="titles">
      <h2 class="title" data-if="title">{{title}}</h2>
      <p class="desc" data-if="description">{{description}}</p>
    </div>
    <div class="actions"><slot name="actions"></slot></div>
  </header>
  <div class="body" data-layout><slot></slot></div>
  <div class="loading"><span class="spinner"></span>Loading…</div>
  <footer><slot name="footer"></slot></footer>
</section>
```

## Style

```css
:host { display: block; }
.panel { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
:host([variant="plain"]) .panel { background: transparent; border: 0; box-shadow: none; }
header { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-4) var(--space-5); }
:host([variant="plain"]) header { padding: 0 0 var(--space-4); }
.titles { flex: 1; min-width: 0; }
.title { margin: 0; font: var(--weight-semibold) var(--text-xl) / var(--leading-tight) var(--font-body); }
:host([variant="plain"]) .title { font-size: var(--text-2xl); }
.desc { margin: var(--space-1) 0 0; color: var(--color-text-muted); font-size: var(--text-sm); }
.actions { display: flex; gap: var(--space-2); align-items: center; }
.body { display: flex; flex-direction: column; gap: var(--space-4); padding: 0 var(--space-5) var(--space-5); }
:host([padding="none"]) .body { padding: 0; }
:host([variant="plain"]) .body { padding: 0; }
.loading { display: none; align-items: center; justify-content: center; gap: var(--space-2); padding: var(--space-8); color: var(--color-text-muted); }
:host([state~="loading"]) .loading { display: flex; }
:host([state~="loading"]) .body { display: none; }
.spinner { width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--color-border-strong); border-right-color: transparent; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
footer { display: none; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-5); border-top: 1px solid var(--color-border); }
:host([data-filled~="footer"]) footer { display: flex; }
```

## Example

```xml
<div layout="column" gap="4">
  <ui-panel title="Contact details" description="Used for job notifications.">
    <ui-button slot="actions" size="small" icon="pencil" label="Edit"/>
    <div layout="grid" cols="2" gap="3">
      <ui-text-field label="Phone" value="021 555 0199" readonly=""/>
      <ui-text-field label="Email" value="aroha@example.com" readonly=""/>
    </div>
  </ui-panel>
  <ui-panel title="Activity" state="loading"/>
</div>
```
