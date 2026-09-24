---
name: ui-nav-item
version: 1.0.0
kind: composed
status: active
summary: One place in the navigation.
---

# Navigation item

## Purpose

One place the user can go from the navigation. Used only inside `ui-nav` or `ui-nav-group`.

## Anatomy

An icon, a label and an optional count, as one link.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The place's name. |
| icon | content | icon | | Leading icon. Use icons for all items in a navigation or none. |
| href | content | path | | Mockup to go to. |
| count | content | number | | Items needing attention there, such as unread or overdue. |
| current | state | boolean | | Marks the item as the place the user is in. |

## Variants

None.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Muted text. |
| Interaction | hover | `:hover` | Hover background, text colour. |
| Interaction | focus | `:focus-visible` | Focus ring. |
| Selection | default | Default | — |
| Selection | current | `current` property | Action-subtle background, action-coloured text and icon. |

## Behaviour

Clicking goes to the place. The count updates as items are dealt with.

## Content rules

One or two words. The count is shown only when it is above zero.

## Accessibility

A link; the current item has `aria-current="page"`.

## Rules of use

- Only inside `ui-nav` or `ui-nav-group`.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--color-text-muted` | semantic |  | Label and icon at rest. |
| `--color-surface-hover`, `--color-text` | semantic |  | Background and text on hover. |
| `--color-action`, `--color-action-subtle` | semantic |  | Text, icon and background of the current item. |
| `--color-surface-sunken`, `--color-surface` | semantic |  | Count background; `--color-surface` on the current item. |
| `--color-focus-ring` | semantic |  | Focus ring. |
| `--radius-md`, `--radius-full` | semantic |  | Item corners; count pill. |
| `--font-body`, `--text-md`, `--text-xs`, `--weight-medium` | semantic |  | Label and count type. |
| `--space-2`, `--space-3` | semantic |  | Padding and gap. |

## Template

```html
<a class="item" href="{{href}}">
  <ui-icon data-if="icon" name="{{icon}}"></ui-icon>
  <span class="label">{{label}}</span>
  <span class="count" data-if="count">{{count}}</span>
</a>
```

## Style

```css
:host { display: block; }
.item {
  display: flex; align-items: center; gap: var(--space-3);
  height: 34px; padding: 0 var(--space-3); border-radius: var(--radius-md);
  font: var(--weight-medium) var(--text-md) / 1 var(--font-body); color: var(--color-text-muted); text-decoration: none;
}
.item:hover, :host([state~="hover"]) .item { background: var(--color-surface-hover); color: var(--color-text); }
.item:focus-visible, :host([state~="focus"]) .item { outline: 2px solid var(--color-focus-ring); outline-offset: -2px; }
:host([current]) .item { background: var(--color-action-subtle); color: var(--color-action); }
.label { flex: 1; }
.count { font-size: var(--text-xs); padding: 2px var(--space-2); border-radius: var(--radius-full); background: var(--color-surface-sunken); color: var(--color-text-muted); }
:host([current]) .count { background: var(--color-surface); color: var(--color-action); }
```

## Example

```xml
<ui-box width="fit" padding="3" surface="raised" border="" radius="medium">
  <ui-nav>
    <ui-nav-item icon="house" label="Default"/>
    <ui-nav-item icon="inbox" label="Hover" state="hover" count="3"/>
    <ui-nav-item icon="briefcase" label="Current" current=""/>
  </ui-nav>
</ui-box>
```
