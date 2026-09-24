---
name: ui-button
version: 1.0.0
kind: composed
status: active
summary: Triggers an action.
---

# Button

## Purpose

Triggers an action: submitting a form, opening a dialog, confirming a choice. If the control takes the user to
another place rather than acting, it is a link — in a mockup, any element with `href` — not a button.

## Anatomy

A container holding an optional leading icon (`ui-icon`) and a label. While loading, a spinner replaces the icon.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The button's text. Omit for an icon-only button, and give `aria-label` instead. |
| icon | content | icon | | Optional leading icon. |
| variant | variant | primary, secondary, ghost, danger | secondary | Emphasis. |
| size | variant | small, medium | medium | Height: 30 or 36 px. |
| disabled | state | boolean | | Puts the button in the disabled state. |
| loading | state | boolean | | Puts the button in the loading state. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | primary | The main action on a view. At most one per view. |
| variant | secondary | A supporting action. |
| variant | ghost | A low-emphasis action that recedes until wanted: toolbars, row actions. |
| variant | danger | A destructive action, such as deleting. Warns by colour and word. |
| size | small | Dense contexts: tables, toolbars, cards. |
| size | medium | Everywhere else. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | As the variant. |
| Interaction | hover | `:hover` | Background darkens one step. |
| Interaction | focus | `:focus-visible` | 2 px focus ring outside the border. |
| Interaction | active | `:active` | Background darkens a further step. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | 45 % opacity; no hover; skipped by keyboard. |
| Activity | idle | Default | — |
| Activity | loading | `loading` property | Spinner in place of the icon; width held; ignores further clicks. |

## Behaviour

On click the button fires its action once. A disabled button does not fire. A loading button ignores further
clicks until the action resolves, which prevents double submission. `Enter` and `Space` activate it.

## Content rules

A label is a verb or verb phrase in sentence case — `Save`, `Schedule job`, `Cancel` — one to three words.

## Accessibility

Rendered as a real `button` element. The focus ring is never removed. An icon-only button **must** carry an
`aria-label`. The hit area is at least 36 × 36 px in medium size.

## Rules of use

- One `primary` button per view, so the main action is unmistakable.
- Don't use `danger` for an ordinary save; the colour loses its meaning.
- Don't disable a button to hint that a form is incomplete without saying what is missing.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--button-bg` | component | `--color-surface` | Background. Each variant points it at its own colour: `--color-action` (primary), `transparent` (ghost), `--color-danger` (danger). |
| `--button-bg-hover` | component | `--color-surface-hover` | Background on hover and when pressed; `--color-action-hover`, `--color-surface-hover` or `--color-danger-hover` by variant. |
| `--button-fg` | component | `--color-text` | Label and icon colour; `--color-on-action` on primary and danger, `--color-text-muted` on ghost. |
| `--button-border` | component | `--color-border-strong` | Border colour; transparent on primary, ghost and danger. |
| `--button-height` | component | `--control-height-md` | Height; `--control-height-sm` in the small size. |
| `--button-px` | component | `--space-4` | Horizontal padding; `--space-3` in the small size. |
| `--color-surface`, `--color-surface-hover`, `--color-border-strong`, `--color-text`, `--color-text-muted`, `--color-action`, `--color-action-hover`, `--color-on-action`, `--color-danger`, `--color-danger-hover` | semantic |  | The values the button tokens point at, per variant. |
| `--control-height-md`, `--control-height-sm` | semantic |  | Button heights. |
| `--color-focus-ring` | semantic |  | Focus ring. |
| `--radius-md` | semantic |  | Corner radius. |
| `--font-body`, `--text-md`, `--text-sm`, `--weight-medium` | semantic |  | Label type; `--text-sm` in the small size. |
| `--space-2`, `--space-3`, `--space-4` | semantic |  | Gap between icon and label, and padding. |
| `--duration-fast` | semantic |  | Hover and focus transitions. |

## Template

```html
<button type="button" part="button" aria-busy="false">
  <span class="spinner" data-if="loading"></span>
  <span class="lead" data-if="!loading"><ui-icon data-if="icon" name="{{icon}}" size="small"></ui-icon></span>
  <span class="label" data-if="label">{{label}}</span>
</button>
```

## Style

```css
:host {
  display: inline-flex;
  vertical-align: middle;
  --button-bg: var(--color-surface);
  --button-bg-hover: var(--color-surface-hover);
  --button-fg: var(--color-text);
  --button-border: var(--color-border-strong);
  --button-height: var(--control-height-md, 36px);
  --button-px: var(--space-4);
}
:host([variant="primary"]) { --button-bg: var(--color-action); --button-bg-hover: var(--color-action-hover); --button-fg: var(--color-on-action); --button-border: transparent; }
:host([variant="ghost"]) { --button-bg: transparent; --button-bg-hover: var(--color-surface-hover); --button-border: transparent; --button-fg: var(--color-text-muted); }
:host([variant="danger"]) { --button-bg: var(--color-danger); --button-bg-hover: var(--color-danger-hover); --button-fg: var(--color-on-action); --button-border: transparent; }
:host([size="small"]) { --button-height: var(--control-height-sm, 30px); --button-px: var(--space-3); }
button {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2);
  width: 100%; height: var(--button-height); padding: 0 var(--button-px);
  border: 1px solid var(--button-border); border-radius: var(--radius-md);
  background: var(--button-bg); color: var(--button-fg);
  font: var(--weight-medium) var(--text-md) / 1 var(--font-body); white-space: nowrap; cursor: pointer;
  transition: background var(--duration-fast), box-shadow var(--duration-fast);
}
:host([size="small"]) button { font-size: var(--text-sm); }
:host(:not([label])) button { padding: 0; width: var(--button-height); }
.lead:empty { display: none; }
button:hover, :host([state~="hover"]) button { background: var(--button-bg-hover); }
:host([state~="active"]) button, button:active { filter: brightness(0.94); }
button:focus-visible, :host([state~="focus"]) button { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; }
:host([disabled]) button { opacity: 0.45; cursor: not-allowed; pointer-events: none; }
:host([loading]) button { cursor: progress; pointer-events: none; }
.spinner { width: 14px; height: 14px; border-radius: 50%; border: 2px solid currentColor; border-right-color: transparent; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
```

## Example

```xml
<div layout="column" gap="3">
  <div layout="row" gap="2" wrap="">
    <ui-button variant="primary" label="Save"/>
    <ui-button label="Cancel"/>
    <ui-button variant="ghost" icon="pencil" label="Edit"/>
    <ui-button variant="danger" icon="trash-2" label="Delete"/>
    <ui-button icon="ellipsis" aria-label="More actions"/>
  </div>
  <div layout="row" gap="2" wrap="">
    <ui-button variant="primary" label="Hover" state="hover"/>
    <ui-button label="Focus" state="focus"/>
    <ui-button variant="primary" label="Disabled" disabled=""/>
    <ui-button variant="primary" label="Saving" loading=""/>
    <ui-button size="small" icon="plus" label="Small"/>
  </div>
</div>
```
