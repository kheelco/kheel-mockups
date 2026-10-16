---
name: jui-menu
version: 1.0.0
kind: elemental
status: active
summary: Menu fragment — a floating list of menu items with an outlined, shadowed surface.
---

# Menu (fragment)

## Purpose

Represents JUI's **Menu** fragment: the surface of a dropdown menu, a vertical list of `jui-menu-item`s. It is
almost always placed inside a `jui-menu-activator`, which opens it from a trigger; on its own it is useful for
showing a menu's contents in a mockup. Being a fragment, it has no events of its own: its items' clicks are
handled by the enclosing component (see **Fragment events**), and when it sits in an activator a click on any
item closes it. For a list of actions that is always visible, use buttons (`jui-btn`) instead.

## Anatomy

A list (`ul`) with vertical padding, a white background, a light border, rounded corners and a soft shadow. Each
child is a `jui-menu-item` in its own list entry.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| variant | variant | outlined | outlined | The look (JUI `Menu.Variant`; `OUTLINED` is the only one). |
| menu-width | variant | auto, small, medium, large | auto | Width of the menu (JUI `width(Length)`): `auto` fits the widest item; the others are 10, 14 and 20 em. |
| menu-height | variant | auto, small, medium, large | auto | Height of the menu (JUI `height(Length)`): `auto` fits the items; the others are 8, 12 and 16 em, scrolling beyond. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | outlined | White surface, light border, 0.5 rem radius and a soft shadow — the standard dropdown look. |
| menu-width | auto, small, medium, large | Stand in for JUI's free width; choose the nearest. Fixing the width keeps menus in a row of activators aligned. |
| menu-height | auto, small, medium, large | Stand in for JUI's free height; use for long menus. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Visibility | shown | Default | The menu is drawn where it is placed; inside a `jui-menu-activator` it shows only when the activator is open. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | jui-menu-item | jui-menu-item | A vertical list, one item per row. | The menu's items, in order. |

## Behaviour

The menu itself does nothing: items respond to clicks through the enclosing component (**Fragment events**). When
the menu is inside a `jui-menu-activator`, a click on an item also closes the activator.

## Content rules

Keep menus short (up to about seven items). Order items by frequency, with destructive items (`variant="error"`)
last.

## Accessibility

A list of items; each item's label is its accessible name. Menus opened by an activator should be reachable by
keyboard in the real screen.

## Rules of use

- Put a menu inside a `jui-menu-activator` in real screens; a free-standing menu is for showing its contents.
- Don't put anything but `jui-menu-item`s in a menu — JUI wraps each child in a list entry.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--frag-menu-outlined-bg` | component | `--jui-color-aux-white` | Background of the outlined menu. |
| `--frag-menu-outlined-border` | component | `--jui-line-light` | Border colour. |
| `--frag-menu-outlined-border-radius` | component | `0.5rem` | Corner radius. |
| `--frag-menu-outlined-shadow-color` | component | `--jui-color-neutral30` | Shadow colour. |
| `--frag-menu-outlined-shadow-size` | component | `10px` | Shadow blur. |
| `--frag-menu-width` | component | `auto` | Width; `menu-width` sets 10, 14 or 20 em. |
| `--frag-menu-height` | component | `auto` | Height; `menu-height` sets 8, 12 or 16 em. |
| `--jui-color-aux-white`, `--jui-line-light`, `--jui-color-neutral30` | semantic | | Surface, border and shadow colours. |

## Template

```html
<ul class="menu">
  <slot></slot>
</ul>
```

## Style

```css
:host {
  display: inline-block;
  vertical-align: top;
  --frag-menu-outlined-bg: var(--jui-color-aux-white);
  --frag-menu-outlined-border: var(--jui-line-light);
  --frag-menu-outlined-border-radius: 0.5rem;
  --frag-menu-outlined-shadow-color: var(--jui-color-neutral30);
  --frag-menu-outlined-shadow-size: 10px;
  --frag-menu-width: auto;
  --frag-menu-height: auto;
}
:host([menu-width="small"]) { --frag-menu-width: 10em; }
:host([menu-width="medium"]) { --frag-menu-width: 14em; }
:host([menu-width="large"]) { --frag-menu-width: 20em; }
:host([menu-height="small"]) { --frag-menu-height: 8em; }
:host([menu-height="medium"]) { --frag-menu-height: 12em; }
:host([menu-height="large"]) { --frag-menu-height: 16em; }
.menu {
  list-style: none;
  margin: 0;
  padding: 0.5em 0;
  box-sizing: border-box;
  width: var(--frag-menu-width);
  height: var(--frag-menu-height);
  overflow-y: auto;
  box-shadow: 0 0 var(--frag-menu-outlined-shadow-size) var(--frag-menu-outlined-shadow-color);
  cursor: pointer;
}
:host([variant="outlined"]) .menu {
  background-color: var(--frag-menu-outlined-bg);
  border: 1px solid var(--frag-menu-outlined-border);
  border-radius: var(--frag-menu-outlined-border-radius);
}
::slotted(*) { display: block; }
```

## Example

```xml
<div layout="row" gap="6" align="start">
  <jui-menu>
    <jui-menu-item icon="pencil" label="Edit"/>
    <jui-menu-item icon="copy" label="Duplicate"/>
    <jui-menu-item icon="download" label="Export" disabled=""/>
    <jui-menu-item icon="trash-2" label="Delete" variant="error"/>
  </jui-menu>
  <jui-menu menu-width="medium">
    <jui-menu-item icon="user" label="Profile"/>
    <jui-menu-item icon="settings" label="Settings" state="hover"/>
    <jui-menu-item icon="log-out" label="Sign out"/>
  </jui-menu>
  <jui-menu menu-width="small" menu-height="small">
    <jui-menu-item label="Today"/>
    <jui-menu-item label="Yesterday"/>
    <jui-menu-item label="Last 7 days"/>
    <jui-menu-item label="Last 30 days"/>
    <jui-menu-item label="Last 90 days"/>
    <jui-menu-item label="This year"/>
  </jui-menu>
</div>
```
