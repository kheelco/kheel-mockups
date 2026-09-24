---
name: ui-icon
version: 1.0.0
kind: elemental
status: active
summary: Shows one icon from the design system's icon set.
---

# Icon

## Purpose

Shows a single icon from `assets/icons/`. Use it on its own for a pictogram, or through the `icon` property of
other components (button, badge, navigation item), which place it for you. Use an image, not an icon, for
pictures and illustrations.

## Anatomy

A square box holding one SVG. The icon draws with the current text colour.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| name | content | icon | | The icon's name, as listed in the manifest. |
| size | variant | small, medium, large | medium | 14, 16 or 20 px. |
| label | content | text | | Accessible name. Leave blank when the icon is decorative. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| size | small | Inside compact controls: small buttons, badges, table headers. |
| size | medium | The default beside body text. |
| size | large | Standing alone, or in empty states. |

## States

None — an icon has no states of its own; it follows the component it is in.

## Behaviour

None. An icon is never interactive by itself; put it in a button to make it clickable.

## Content rules

Use one meaning per icon across the product: `trash-2` always means delete, `pencil` always means edit.

## Accessibility

Decorative icons (beside a text label) have no `label` and are hidden from assistive technology. An icon that
carries meaning on its own **must** have a `label`.

## Rules of use

- Don't use an icon as the only way to convey status; pair it with text or a badge.
- Don't mix sizes within one row of controls.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--icon-size` | component | `--icon-md` | Width and height of the icon. `size` sets it to `--icon-sm`, `--icon-md` or `--icon-lg`; containers such as badges set it directly. |
| `--icon-sm`, `--icon-md`, `--icon-lg` | semantic |  | The three icon sizes. |

## Template

```html
<span class="icon" role="img" aria-label="{{label}}"><mockup-asset src="icons/{{name}}.svg"></mockup-asset></span>
```

## Style

```css
:host { display: inline-flex; flex: none; vertical-align: middle; width: var(--icon-size); height: var(--icon-size); --icon-size: var(--icon-md, 16px); }
:host([size="small"]) { --icon-size: var(--icon-sm, 14px); }
:host([size="large"]) { --icon-size: var(--icon-lg, 20px); }
.icon, mockup-asset { display: block; width: 100%; height: 100%; }
svg { display: block; width: 100%; height: 100%; }
```

## Example

```xml
<div layout="row" gap="4" align="center">
  <ui-icon name="search" size="small"/>
  <ui-icon name="search"/>
  <ui-icon name="search" size="large"/>
  <ui-icon name="circle-check" label="Complete"/>
</div>
```
