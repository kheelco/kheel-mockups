---
name: ui-chip
version: 1.0.0
kind: composed
status: active
summary: A compact option the user can select or remove, typically a filter.
---

# Chip

## Purpose

A compact, selectable option — most often a quick filter above a list or gallery, or an applied filter the user
can remove. Use a badge for a static label and a checkbox for a choice inside a form.

## Anatomy

A pill holding an optional leading icon, a label, an optional count and, when removable, a remove control.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The option's text. |
| icon | content | icon | | Optional leading icon. |
| count | content | number | | Optional number of matching items. |
| selected | state | boolean | | Puts the chip in the selected state. |
| removable | variant | boolean | | Shows a remove control, for applied filters. |
| disabled | state | boolean | | Puts the chip in the disabled state. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| removable | absent | A toggle: selecting it applies the option. |
| removable | present | An applied value: the × removes it. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Outlined. |
| Interaction | hover | `:hover` | Sunken background. |
| Interaction | focus | `:focus-visible` | Focus ring. |
| Selection | unselected | Default | Outlined. |
| Selection | selected | `selected` property | Action-subtle background, action-coloured text and border, check icon. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | 45 % opacity; not interactive. |

## Behaviour

Clicking toggles `selected`. In a filter bar, follows the shared **Filtering** behaviour. Clicking × on a
removable chip removes it.

## Content rules

One to three words. A count, when shown, is the number of results the option would give.

## Accessibility

A toggle chip is a `button` with `aria-pressed`. The remove control has an accessible label "Remove <label>".

## Rules of use

- Don't wrap chips over more than two lines; move the rest into a "More filters" control.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--color-surface`, `--color-border-strong`, `--color-text` | semantic |  | Background, border and text at rest. |
| `--color-surface-hover` | semantic |  | Background on hover. |
| `--color-action`, `--color-action-subtle` | semantic |  | Border, text and background when selected. |
| `--color-text-subtle` | semantic |  | Count and remove icon. |
| `--color-focus-ring` | semantic |  | Focus ring. |
| `--radius-full` | semantic |  | Pill shape. |
| `--font-body`, `--text-sm`, `--weight-medium`, `--weight-regular` | semantic |  | Label type; the count is regular weight. |
| `--space-1`, `--space-3` | semantic |  | Gap and horizontal padding. |

## Template

```html
<button type="button" class="chip" aria-pressed="false">
  <ui-icon data-if="selected" name="check" size="small"></ui-icon>
  <ui-icon data-if="icon" name="{{icon}}" size="small"></ui-icon>
  <span>{{label}}</span>
  <span class="count" data-if="count">{{count}}</span>
  <ui-icon data-if="removable" class="remove" name="x" size="small" label="Remove"></ui-icon>
</button>
```

## Style

```css
:host { display: inline-flex; vertical-align: middle; }
.chip {
  display: inline-flex; align-items: center; gap: var(--space-1);
  height: 30px; padding: 0 var(--space-3); border-radius: var(--radius-full);
  border: 1px solid var(--color-border-strong); background: var(--color-surface); color: var(--color-text);
  font: var(--weight-medium) var(--text-sm) / 1 var(--font-body); cursor: pointer; white-space: nowrap;
}
.chip:hover, :host([state~="hover"]) .chip { background: var(--color-surface-hover); }
.chip:focus-visible, :host([state~="focus"]) .chip { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; }
:host([selected]) .chip { background: var(--color-action-subtle); border-color: var(--color-action); color: var(--color-action); }
.count { color: var(--color-text-subtle); font-weight: var(--weight-regular); }
:host([selected]) .count { color: inherit; }
.remove { margin-right: calc(-1 * var(--space-1)); color: var(--color-text-subtle); }
:host([disabled]) .chip { opacity: 0.45; pointer-events: none; }
```

## Example

```xml
<div layout="row" gap="2" wrap="">
  <ui-chip label="All" selected=""/>
  <ui-chip label="Open" count="12"/>
  <ui-chip label="Hover" state="hover"/>
  <ui-chip icon="calendar" label="This week"/>
  <ui-chip label="Plumbing" removable="" selected=""/>
  <ui-chip label="Archived" disabled=""/>
</div>
```
