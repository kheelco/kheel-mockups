---
name: ui-nav-group
version: 1.0.0
kind: composed
status: active
summary: A labelled group of navigation items.
---

# Navigation group

## Purpose

Gathers related navigation items under a label so a longer navigation stays scannable. Used only inside
`ui-nav`.

## Anatomy

A small uppercase label above a list of navigation items.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The group's name. |

## Variants

None.

## States

None.

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | ui-nav-item | | Vertical list | The group's items. |

## Behaviour

None.

## Content rules

One or two words. Two to seven items per group.

## Accessibility

The label names the group (`role="group"`, `aria-label`).

## Rules of use

- Only inside `ui-nav`. Groups don't nest.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--color-text-subtle` | semantic |  | Group label. |
| `--font-body`, `--text-xs`, `--weight-semibold` | semantic |  | Group label type. |
| `--space-1`, `--space-3`, `--space-4` | semantic |  | Space above the group, label padding and gap. |

## Template

```html
<div class="group" role="group" aria-label="{{label}}">
  <span class="label">{{label}}</span>
  <slot></slot>
</div>
```

## Style

```css
:host { display: block; margin-top: var(--space-4); }
.group { display: flex; flex-direction: column; gap: var(--space-1); }
.label { padding: 0 var(--space-3) var(--space-1); font: var(--weight-semibold) var(--text-xs) / 1 var(--font-body); letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-subtle); }
```

## Example

```xml
<ui-box width="fit" padding="3" surface="raised" border="" radius="medium">
  <ui-nav>
    <ui-nav-group label="Records">
      <ui-nav-item icon="users" label="Customers"/>
      <ui-nav-item icon="file-text" label="Invoices"/>
    </ui-nav-group>
  </ui-nav>
</ui-box>
```
