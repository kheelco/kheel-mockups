---
name: jui-divider
version: 1.0.0
kind: elemental
status: active
summary: Divider fragment — a horizontal rule separating groups of content.
---

# Divider (fragment)

## Purpose

Represents JUI's **Divider** fragment: a thin horizontal line (`hr`) between groups of content inside a card, a
paper or a menu. It has no events (see **Fragment events**). Use spacing (a `jui-stack` gap) instead when the
groups are already distinct, and a card when the groups are separate items.

## Anatomy

A single 1px line spanning the container's width, with a little space above and below.

## Properties

None.

## Variants

None.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Appearance | default | Always | A light 1px line. |

## Behaviour

None.

## Content rules

None — it has no content.

## Accessibility

An `hr`, announced as a separator. Don't use it purely for decoration where the separation carries no meaning.

## Rules of use

- Don't stack dividers or put one at the very start or end of a container.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-divider-color` | component | `--jui-line-light` | Line colour. |
| `--jui-divider-margin` | component | `0.5em` | Space above and below (the browser's `hr` default, which JUI keeps). |
| `--jui-line-light` | semantic | | Line colour. |

## Template

```html
<hr class="divider">
```

## Style

```css
:host { display: block; --jui-divider-color: var(--jui-line-light); --jui-divider-margin: 0.5em; }
.divider { margin: var(--jui-divider-margin) 0; border: 0; border-top: 1px solid var(--jui-divider-color); }
```

## Example

```xml
<jui-card padding="4" gap="1" width="fit">
  <strong>Contact</strong>
  <span>jane@example.com</span>
  <jui-divider/>
  <strong>Location</strong>
  <span>Melbourne</span>
</jui-card>
```
