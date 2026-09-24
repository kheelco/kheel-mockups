---
name: ui-option
version: 1.0.0
kind: composed
status: active
summary: One choice inside a select's list.
---

# Option

## Purpose

One choice in the open list of a `ui-select`. It is not used on its own.

## Anatomy

A row with an optional icon, the option's text, and a check when selected.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The option's text. |
| icon | content | icon | | Optional leading icon. |
| selected | state | boolean | | Marks the chosen option. |
| disabled | state | boolean | | The option cannot be chosen. |

## Variants

None.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | — |
| Interaction | hover | `:hover` or keyboard highlight | Sunken background. |
| Selection | unselected | Default | — |
| Selection | selected | `selected` property | Check at the end; medium weight. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Muted text; not choosable. |

## Behaviour

Choosing an option sets the select's value and closes the list.

## Content rules

As the select.

## Accessibility

Exposed as `option` with `aria-selected`.

## Rules of use

- Only inside `ui-select`.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--color-text` | semantic |  | Option text. |
| `--color-surface-hover` | semantic |  | Background on hover or keyboard highlight. |
| `--color-action` | semantic |  | Check mark on the selected option. |
| `--color-text-disabled` | semantic |  | Text when disabled. |
| `--radius-sm` | semantic |  | Highlight corners. |
| `--font-body`, `--text-md`, `--weight-medium`, `--leading-tight` | semantic |  | Type; medium weight when selected. |
| `--space-2` | semantic |  | Padding and gap. |

## Template

```html
<div class="option" role="option">
  <ui-icon data-if="icon" name="{{icon}}" size="small"></ui-icon>
  <span class="text">{{label}}</span>
  <ui-icon data-if="selected" class="check" name="check" size="small"></ui-icon>
</div>
```

## Style

```css
:host { display: block; }
.option { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-2); border-radius: var(--radius-sm); font: var(--text-md) / var(--leading-tight) var(--font-body); color: var(--color-text); cursor: pointer; }
.text { flex: 1; }
.option:hover, :host([state~="hover"]) .option { background: var(--color-surface-hover); }
:host([selected]) .option { font-weight: var(--weight-medium); }
.check { color: var(--color-action); }
:host([disabled]) .option { color: var(--color-text-disabled); pointer-events: none; }
```

## Example

```xml
<ui-box border="" radius="medium" padding="1" width="fit">
  <ui-option label="Unassigned"/>
  <ui-option label="Mere Tipene" selected=""/>
  <ui-option label="Sam Liu" state="hover"/>
  <ui-option label="Priya Shah" disabled=""/>
</ui-box>
```
