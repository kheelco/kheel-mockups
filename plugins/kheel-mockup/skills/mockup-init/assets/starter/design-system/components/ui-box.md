---
name: ui-box
version: 1.0.0
kind: elemental
status: active
summary: A general-purpose container with optional padding, border, surface and layout.
---

# Box

## Purpose

The general container. Use it to group content with padding, a border, a surface colour or a shadow, and to lay
out its children, when no more specific component (card, panel) fits. It carries the decisions that plain HTML
may not — borders, backgrounds, padding — so they come from tokens.

## Anatomy

One surface with a slot. Everything else is chosen by properties.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| padding | variant | 0, 1, 2, 3, 4, 5, 6, 8 | 0 | Inner spacing, as a spacing step. |
| border | variant | boolean | | Draws a 1 px border. |
| radius | variant | none, small, medium, large | none | Corner radius. |
| surface | variant | none, raised, sunken, action | none | Background: transparent, the surface colour, the sunken colour, or the action-subtle colour. |
| shadow | variant | none, small, medium, large | none | Elevation. |

## Variants

Each property is its own axis; combine them freely. A bordered, raised box with medium radius is the usual
"plain card" when no heading is needed.

## States

None — a box is static.

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | | configurable | The contents. |

## Behaviour

None.

## Content rules

None.

## Accessibility

A box has no semantics. When it groups a region the user should be able to jump to, give it `role` and an
`aria-label`.

## Rules of use

- Prefer a card or panel when the content has a title; they carry the heading structure.
- Don't nest bordered boxes more than two deep.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--box-padding` | component | `0` | Inner spacing; `padding` points it at `--space-1` … `--space-8`. |
| `--box-border` | component | `0` | Border; `border` sets `1px solid var(--color-border)`. |
| `--box-radius` | component | `0` | Corners; `radius` points it at `--radius-sm`, `--radius-md` or `--radius-lg`. |
| `--box-bg` | component | `transparent` | Background; `surface` points it at `--color-surface`, `--color-surface-sunken` or `--color-action-subtle`. |
| `--box-shadow` | component | `none` | Elevation; `shadow` points it at `--shadow-sm`, `--shadow-md` or `--shadow-lg`. |
| `--space-1`, `--space-2`, `--space-3`, `--space-4`, `--space-5`, `--space-6`, `--space-8` | semantic |  | Padding steps. |
| `--color-border`, `--color-surface`, `--color-surface-sunken`, `--color-action-subtle` | semantic |  | Border and surface colours. |
| `--radius-sm`, `--radius-md`, `--radius-lg` | semantic |  | Radius steps. |
| `--shadow-sm`, `--shadow-md`, `--shadow-lg` | semantic |  | Shadow steps. |

## Template

```html
<div class="box" data-layout><slot></slot></div>
```

## Style

```css
:host { display: block; }
.box { padding: var(--box-padding, 0); border-radius: var(--box-radius, 0); background: var(--box-bg, transparent); box-shadow: var(--box-shadow, none); border: var(--box-border, 0); height: 100%; }
:host([padding="1"]) { --box-padding: var(--space-1); }
:host([padding="2"]) { --box-padding: var(--space-2); }
:host([padding="3"]) { --box-padding: var(--space-3); }
:host([padding="4"]) { --box-padding: var(--space-4); }
:host([padding="5"]) { --box-padding: var(--space-5); }
:host([padding="6"]) { --box-padding: var(--space-6); }
:host([padding="8"]) { --box-padding: var(--space-8); }
:host([border]:not([border="false"])) { --box-border: 1px solid var(--color-border); }
:host([radius="small"]) { --box-radius: var(--radius-sm); }
:host([radius="medium"]) { --box-radius: var(--radius-md); }
:host([radius="large"]) { --box-radius: var(--radius-lg); }
:host([surface="raised"]) { --box-bg: var(--color-surface); }
:host([surface="sunken"]) { --box-bg: var(--color-surface-sunken); }
:host([surface="action"]) { --box-bg: var(--color-action-subtle); }
:host([shadow="small"]) { --box-shadow: var(--shadow-sm); }
:host([shadow="medium"]) { --box-shadow: var(--shadow-md); }
:host([shadow="large"]) { --box-shadow: var(--shadow-lg); }
```

## Example

```xml
<div layout="row" gap="4" wrap="">
  <ui-box padding="4" border="" radius="medium" surface="raised" layout="column" gap="2">
    <strong>Bordered, raised</strong>
    <small>padding 4, radius medium</small>
  </ui-box>
  <ui-box padding="4" radius="large" surface="sunken">Sunken</ui-box>
  <ui-box padding="4" radius="large" surface="raised" shadow="medium">Shadow medium</ui-box>
  <ui-box padding="4" radius="medium" surface="action" layout="row" gap="2" align="center">
    <ui-icon name="info"/>Action surface
  </ui-box>
</div>
```
