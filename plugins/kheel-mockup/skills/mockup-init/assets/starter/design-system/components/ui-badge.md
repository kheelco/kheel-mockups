---
name: ui-badge
version: 1.0.0
kind: composed
status: active
summary: Shows a short status or category label.
---

# Badge

## Purpose

Shows a short, non-interactive label for a status (Paid, Overdue) or a category (Plumbing). Use a chip instead
when the user can select or remove it.

## Anatomy

A pill holding an optional leading icon and a label.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The text. |
| tone | variant | neutral, info, success, warning, danger | neutral | The meaning the colour carries. |
| icon | content | icon | | Optional leading icon. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| tone | neutral | Categories and states with no good/bad meaning. |
| tone | info | In progress, informational. |
| tone | success | Complete, paid, healthy. |
| tone | warning | Needs attention soon: due, pending review. |
| tone | danger | Failed, overdue, blocked. |

## States

None — a badge is static.

## Behaviour

None. A badge is not interactive.

## Content rules

One or two words in sentence case. Use the same word for the same status everywhere.

## Accessibility

The label carries the meaning; tone is never the only cue. Contrast between text and background meets 4.5:1.

## Rules of use

- Keep a status's tone consistent across the product: if Overdue is `danger` in one table it is `danger` everywhere.
- Don't use badges for actions.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--badge-bg` | component | `--color-neutral-subtle` | Background; each tone points it at its subtle colour (`--color-info-subtle`, `--color-success-subtle`, …). |
| `--badge-fg` | component | `--color-neutral` | Text and icon colour; each tone points it at its strong colour (`--color-info`, `--color-success`, …). |
| `--icon-size` | component | `12px` | Sets the size of the `ui-icon` inside the badge. |
| `--color-neutral`, `--color-neutral-subtle`, `--color-info`, `--color-info-subtle`, `--color-success`, `--color-success-subtle`, `--color-warning`, `--color-warning-subtle`, `--color-danger`, `--color-danger-subtle` | semantic |  | Tone colours. |
| `--radius-full` | semantic |  | Pill shape. |
| `--font-body`, `--text-xs`, `--weight-medium` | semantic |  | Label type. |
| `--space-1`, `--space-2` | semantic |  | Gap and horizontal padding. |

## Template

```html
<span class="badge"><ui-icon data-if="icon" name="{{icon}}" size="small"></ui-icon>{{label}}</span>
```

## Style

```css
:host { display: inline-flex; vertical-align: middle; --badge-bg: var(--color-neutral-subtle); --badge-fg: var(--color-neutral); }
:host([tone="info"]) { --badge-bg: var(--color-info-subtle); --badge-fg: var(--color-info); }
:host([tone="success"]) { --badge-bg: var(--color-success-subtle); --badge-fg: var(--color-success); }
:host([tone="warning"]) { --badge-bg: var(--color-warning-subtle); --badge-fg: var(--color-warning); }
:host([tone="danger"]) { --badge-bg: var(--color-danger-subtle); --badge-fg: var(--color-danger); }
.badge {
  display: inline-flex; align-items: center; gap: var(--space-1);
  padding: 2px var(--space-2); border-radius: var(--radius-full);
  background: var(--badge-bg); color: var(--badge-fg);
  font: var(--weight-medium) var(--text-xs) / 18px var(--font-body); white-space: nowrap;
}
ui-icon { --icon-size: 12px; }
```

## Example

```xml
<div layout="row" gap="2" wrap="">
  <ui-badge label="Draft"/>
  <ui-badge tone="info" label="Scheduled"/>
  <ui-badge tone="success" icon="check" label="Paid"/>
  <ui-badge tone="warning" label="Due soon"/>
  <ui-badge tone="danger" label="Overdue"/>
</div>
```
