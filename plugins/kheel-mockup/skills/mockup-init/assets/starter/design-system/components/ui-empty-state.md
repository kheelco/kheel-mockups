---
name: ui-empty-state
version: 1.0.0
kind: composed
status: active
summary: Explains why there is nothing to show and what to do next.
---

# Empty state

## Purpose

Fills the space where content would be when there is none, and says what to do about it. The two common cases
need different words: nothing exists yet (encourage creating the first one), and nothing matches the current
filters (offer to clear them).

## Anatomy

An icon in a soft circle, a title, a description, and optional actions.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| icon | content | icon | inbox | The icon. |
| title | content | text | | What is empty, in plain words. |
| description | content | text | | Why, and what to do next. |

## Variants

None.

## States

None.

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| actions | ui-button | ui-button | Row, centred | The next step. Placed automatically. |

## Behaviour

None of its own.

## Content rules

Title: "No jobs yet" / "No jobs match these filters". Description: one sentence. Action: the verb that fixes it
("Create job", "Clear filters").

## Accessibility

The title is a heading at the level of the region it fills.

## Rules of use

- Never show an empty table or grid without one.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--color-surface-sunken`, `--color-text-muted`, `--radius-full` | semantic |  | Icon circle and icon. |
| `--color-text` | semantic |  | Title. |
| `--font-body`, `--text-lg`, `--text-md`, `--weight-semibold`, `--leading-tight` | semantic |  | Title and description type. |
| `--space-2`, `--space-3`, `--space-4`, `--space-8` | semantic |  | Padding and gaps. |

## Template

```html
<div class="empty">
  <span class="icon"><ui-icon name="{{icon}}" size="large"></ui-icon></span>
  <h3 class="title">{{title}}</h3>
  <p class="desc" data-if="description">{{description}}</p>
  <div class="actions"><slot name="actions"></slot></div>
</div>
```

## Style

```css
:host { display: block; }
.empty { display: flex; flex-direction: column; align-items: center; text-align: center; gap: var(--space-2); padding: var(--space-8) var(--space-4); max-width: 420px; margin: 0 auto; }
.icon { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: var(--radius-full); background: var(--color-surface-sunken); color: var(--color-text-muted); margin-bottom: var(--space-2); }
.title { margin: 0; font: var(--weight-semibold) var(--text-lg) / var(--leading-tight) var(--font-body); color: var(--color-text); }
.desc { margin: 0; color: var(--color-text-muted); font-size: var(--text-md); }
.actions { gap: var(--space-2); margin-top: var(--space-3); }
.actions { display: none; }
:host([data-filled~="actions"]) .actions { display: flex; }
```

## Example

```xml
<div layout="grid" cols="2" gap="4">
  <ui-box border="" radius="large" surface="raised">
    <ui-empty-state title="No jobs yet" description="Jobs you create or are assigned will show here.">
      <ui-button variant="primary" icon="plus" label="Create job"/>
    </ui-empty-state>
  </ui-box>
  <ui-box border="" radius="large" surface="raised">
    <ui-empty-state icon="search" title="No jobs match these filters" description="Try removing a filter or searching for something else.">
      <ui-button label="Clear filters"/>
    </ui-empty-state>
  </ui-box>
</div>
```
