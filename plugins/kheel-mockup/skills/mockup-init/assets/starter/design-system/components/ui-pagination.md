---
name: ui-pagination
version: 1.0.0
kind: composed
status: active
summary: Moves between pages of a long list and says where the user is.
---

# Pagination

## Purpose

Splits a long list into pages and lets the user move between them. It changes which rows are shown, never their
order — that is sorting's job.

## Anatomy

A summary of what is shown ("1–20 of 134") on the left; previous and next buttons with the current position
between them on the right.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| page | state | number | 1 | The current page. Page 1 disables "previous". |
| pages | content | number | 1 | The number of pages. |
| summary | content | text | | What is shown, such as "1–20 of 134". |

## Variants

None.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Position | first | `page="1"` | Previous disabled. |
| Position | middle | Default | Both enabled. |
| Position | last | `state="last"` | Next disabled. |

## Behaviour

Previous and next move one page. Changing filters or sort returns to page 1.

## Content rules

The summary counts items, not pages.

## Accessibility

A `nav` labelled "Pagination"; the buttons have labels "Previous page" and "Next page".

## Rules of use

- Don't paginate lists shorter than two pages; show them whole.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--color-text-muted` | semantic |  | Summary and position text. |
| `--font-body`, `--text-sm` | semantic |  | Type. |
| `--space-2`, `--space-4` | semantic |  | Gaps. |

## Template

```html
<nav class="pg" aria-label="Pagination">
  <span class="summary">{{summary}}</span>
  <span class="controls">
    <ui-button class="prev" size="small" variant="ghost" icon="chevron-left" aria-label="Previous page"></ui-button>
    <span class="pos">Page {{page}} of {{pages}}</span>
    <ui-button class="next" size="small" variant="ghost" icon="chevron-right" aria-label="Next page"></ui-button>
  </span>
</nav>
```

## Style

```css
:host { display: block; }
.pg { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); font: var(--text-sm) / 1 var(--font-body); color: var(--color-text-muted); }
.controls { display: flex; align-items: center; gap: var(--space-2); }
.pos { white-space: nowrap; }
:host([page="1"]) .prev, :host([state~="last"]) .next { opacity: 0.4; pointer-events: none; }
```

## Example

```xml
<div layout="column" gap="4">
  <ui-pagination page="1" pages="7" summary="1–20 of 134"/>
  <ui-pagination page="7" pages="7" summary="121–134 of 134" state="last"/>
</div>
```
