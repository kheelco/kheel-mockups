---
name: jui-icon
version: 1.0.0
kind: elemental
status: active
summary: Icon fragment — one icon, sized to the text around it.
---

# Icon (fragment)

## Purpose

Represents JUI's **Icon** fragment: a single icon glyph. Other components place icons for you through their
`icon` property; use `jui-icon` directly only for a free-standing icon. JUI draws icons from FontAwesome; the
mockup draws the equivalent from the design system's icon set, and the implementation mapping gives the
FontAwesome name for each.

## Anatomy

One glyph, `1em` square, in the current text colour unless a tone is set.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| name | content | icon | | The icon. |
| size | variant | inherit, small, medium, large | inherit | `inherit` follows the surrounding text (JUI's default); the others are 12, 16 and 20 px. |
| tone | variant | inherit, muted, primary, info, success, warning, danger | inherit | Colour (JUI `color(…)`). |
| label | content | text | | Accessible name when the icon carries meaning on its own. |

## Variants

`size` and `tone` stand in for JUI's free `size(Length)` and `color(Color)`; choose the nearest.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | — |
| Interaction | hover | `:hover`, when the icon has an action | Pointer cursor; darkens. |

## Behaviour

An icon with an action (JUI `onclick`, in a mockup `href` or `opens`) is clickable; its click is handled by the
enclosing component (**Fragment events**).

## Content rules

One meaning per icon across the product.

## Accessibility

Decorative icons have no label. An icon that carries meaning alone needs `label`; a clickable icon should usually
be a `jui-icon-btn` instead.

## Rules of use

- Prefer a component's own `icon` property over placing `jui-icon` beside it.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--frag-icon-size` | component | `1em` | Width and height; `size` sets 12, 16 or 20 px. |
| `--frag-icon-color` | component | `currentColor` | Colour; `tone` points it at a role colour. |
| `--jui-role-text-muted`, `--jui-role-interactive-primary`, `--jui-role-feedback-info`, `--jui-role-feedback-success`, `--jui-role-feedback-warning`, `--jui-role-feedback-error` | semantic | | Tone colours. |

## Template

```html
<span class="icon" role="img" aria-label="{{label}}"><mockup-asset src="icons/{{name}}.svg"></mockup-asset></span>
```

## Style

```css
:host { display: inline-flex; flex: none; vertical-align: -0.125em; --frag-icon-size: 1em; --frag-icon-color: currentColor; }
:host([size="small"]) { --frag-icon-size: 12px; }
:host([size="medium"]) { --frag-icon-size: 16px; }
:host([size="large"]) { --frag-icon-size: 20px; }
:host([tone="muted"]) { --frag-icon-color: var(--jui-role-text-muted); }
:host([tone="primary"]) { --frag-icon-color: var(--jui-role-interactive-primary); }
:host([tone="info"]) { --frag-icon-color: var(--jui-role-feedback-info); }
:host([tone="success"]) { --frag-icon-color: var(--jui-role-feedback-success); }
:host([tone="warning"]) { --frag-icon-color: var(--jui-role-feedback-warning); }
:host([tone="danger"]) { --frag-icon-color: var(--jui-role-feedback-error); }
:host([href]), :host([opens]) { cursor: pointer; }
.icon, mockup-asset { display: block; width: var(--frag-icon-size); height: var(--frag-icon-size); color: var(--frag-icon-color); }
svg { display: block; width: 100%; height: 100%; }
```

## Example

```xml
<div layout="row" gap="4" align="center">
  <span>Inherits <jui-icon name="star"/> text size</span>
  <jui-icon name="search" size="small"/>
  <jui-icon name="search" size="medium"/>
  <jui-icon name="search" size="large"/>
  <jui-icon name="circle-check" tone="success" size="large" label="Complete"/>
  <jui-icon name="triangle-alert" tone="warning" size="large" label="Warning"/>
</div>
```
