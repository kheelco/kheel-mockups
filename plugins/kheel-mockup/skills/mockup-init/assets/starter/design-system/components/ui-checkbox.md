---
name: ui-checkbox
version: 1.0.0
kind: composed
status: active
summary: A yes/no choice, alone or in a group, and row selection in tables.
---

# Checkbox

## Purpose

Lets the user turn one option on or off, pick several options from a group, or select rows in a table. Use a
chip for quick filters and a select for one choice from many.

## Anatomy

A square box that shows a check or a dash, and an optional label to its right.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The option's text. Omit only inside a table, where the column or row gives context. |
| checked | state | boolean | | Puts the checkbox in the checked state. |
| indeterminate | state | boolean | | Puts the checkbox in the indeterminate state (some, not all, rows selected). |
| disabled | state | boolean | | Puts the checkbox in the disabled state. |

## Variants

None.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | — |
| Interaction | hover | `:hover` | Border darkens. |
| Interaction | focus | `:focus-visible` | Focus ring around the box. |
| Selection | unchecked | Default | Empty box. |
| Selection | checked | `checked` property | Filled with the action colour, white check. |
| Selection | indeterminate | `indeterminate` property | Filled with the action colour, white dash. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | 45 % opacity; not interactive. |

## Behaviour

Clicking the box or the label toggles `checked`. A select-all checkbox is indeterminate when some rows are
selected, and selects all when clicked.

## Content rules

Label the positive: "Send reminders", not "Don't send reminders".

## Accessibility

A native checkbox underneath; the label is associated with it. Indeterminate is exposed as `aria-checked="mixed"`.

## Rules of use

- Don't use a checkbox to trigger an immediate action; that is a switch or a button.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--icon-size` | component | `12px` | Sets the size of the check and dash icons. |
| `--color-surface`, `--color-border-strong` | semantic |  | Box background and border when unchecked. |
| `--color-text-subtle` | semantic |  | Box border on hover. |
| `--color-action`, `--color-on-action` | semantic |  | Box fill and mark when checked or indeterminate. |
| `--color-focus-ring` | semantic |  | Focus ring. |
| `--radius-sm` | semantic |  | Box corners. |
| `--color-text`, `--font-body`, `--text-md`, `--leading-tight` | semantic |  | Label. |
| `--space-2` | semantic |  | Gap between box and label. |

## Template

```html
<label class="wrap">
  <span class="box">
    <ui-icon data-if="checked" name="check" size="small"></ui-icon>
    <ui-icon data-if="indeterminate" name="minus" size="small"></ui-icon>
  </span>
  <span class="label" data-if="label">{{label}}</span>
</label>
```

## Style

```css
:host { display: inline-flex; vertical-align: middle; }
.wrap { display: inline-flex; align-items: center; gap: var(--space-2); cursor: pointer; font: var(--text-md) / var(--leading-tight) var(--font-body); color: var(--color-text); }
.box {
  display: inline-flex; align-items: center; justify-content: center; flex: none;
  width: 16px; height: 16px; border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-strong); background: var(--color-surface); color: var(--color-on-action);
}
.wrap:hover .box, :host([state~="hover"]) .box { border-color: var(--color-text-subtle); }
:host([state~="focus"]) .box, .wrap:focus-within .box { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; }
:host([checked]) .box, :host([indeterminate]) .box { background: var(--color-action); border-color: var(--color-action); }
ui-icon { --icon-size: 12px; }
:host([disabled]) .wrap { opacity: 0.45; pointer-events: none; }
```

## Example

```xml
<div layout="row" gap="5" wrap="">
  <ui-checkbox label="Unchecked"/>
  <ui-checkbox label="Checked" checked=""/>
  <ui-checkbox label="Some selected" indeterminate=""/>
  <ui-checkbox label="Focus" state="focus"/>
  <ui-checkbox label="Disabled" disabled=""/>
</div>
```
