---
name: jui-menu-activator
version: 1.0.0
kind: composed
status: active
summary: MenuActivator fragment — a vertical-ellipsis trigger that opens a menu on hover or click.
---

# MenuActivator (fragment)

## Purpose

Represents JUI's **MenuActivator** fragment: the round "more actions" trigger (a vertical ellipsis) that opens the
`jui-menu` placed inside it — typically at the end of a table row, card header or list item. By default the menu
opens while the pointer is over the trigger; `click-to-activate` makes it open and close on click instead. Being a
fragment, it has no events of its own: the menu items' clicks are handled by the enclosing component (see
**Fragment events**), and a click on an item closes the menu. When the actions deserve to be visible, use
`jui-btn`s instead; when the trigger should be a labelled button, use a button with a menu in the real screen.

## Anatomy

A round trigger with a vertical-ellipsis icon (`jui-icon`). When open, the slotted `jui-menu` floats beneath the
trigger, right-aligned to it, 0.5 em below (or above, with `above`).

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| click-to-activate | variant | boolean | | Opens and closes on click (JUI `clickToActivate()`); otherwise the menu opens on hover. |
| above | variant | boolean | | Shows the menu above the trigger (JUI `aboveForced()`); JUI also does this on its own near the bottom of the scroll area. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| click-to-activate | absent | Hover to open: quick, for rows of data where menus are browsed. |
| click-to-activate | present | Click to open: deliberate, and the only choice on touch devices. |
| above | present | For triggers near the bottom of the page or a scroll area. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Grey ellipsis, no background; the menu is hidden. |
| Interaction | hover | `:hover` | Light grey round background, darker ellipsis; the menu shows unless `click-to-activate`. |
| Expansion | closed | Default | Menu hidden. |
| Expansion | open | A click with `click-to-activate` | The menu is shown beneath the trigger (above with `above`), fading in. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | jui-menu | jui-menu | A floating panel beneath the trigger, right-aligned. | The menu to open. |

## Behaviour

Opens on hover, or on click with `click-to-activate` (a second click closes it). Clicking a menu item runs its
action through the enclosing component (**Fragment events**) and closes the menu. With neither `above` nor a
threshold set, JUI shows the menu above the trigger when the trigger is within 100 px of the bottom of its scroll
area.

## Content rules

Only secondary actions belong behind the ellipsis; the primary action for the row or card stays visible.

## Accessibility

The trigger needs an accessible name in the real screen ("More actions"). Prefer `click-to-activate` where
keyboard or touch use matters, as hover-only menus cannot be opened without a pointer.

## Rules of use

- Show the menu in a mockup with `state="open"`; leave room around the trigger for it, as it floats over the
  content below.
- One activator per row or card.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--frag-menu-activator-radius` | component | `30px` | Trigger corner radius (round). |
| `--frag-menu-activator-padding` | component | `6px 11px` | Trigger padding. |
| `--frag-menu-activator-above-offset` | component | `2em` | Distance of the menu's bottom from the trigger's bottom when shown above. |
| `--frag-menu-activator-right-offset` | component | `0` | Offset of the menu from the trigger's right edge. |
| `--frag-menu-activator-hover-bg` | component | `--jui-color-neutral10` | Trigger background on hover and when open. |
| `--frag-menu-activator-hover-color` | component | `--jui-color-neutral80` | Ellipsis colour on hover and when open. |
| `--frag-menu-activator-color` | component | `--jui-color-neutral50` | Ellipsis colour at rest. |
| `--jui-color-neutral10`, `--jui-color-neutral50`, `--jui-color-neutral80` | semantic | | Trigger colours. |

## Template

```html
<span class="activator">
  <span class="trigger"><jui-icon name="ellipsis"></jui-icon></span>
  <div class="panel"><slot></slot></div>
</span>
```

## Style

```css
:host {
  display: inline-block;
  vertical-align: middle;
  --frag-menu-activator-radius: 30px;
  --frag-menu-activator-padding: 6px 11px;
  --frag-menu-activator-above-offset: 2em;
  --frag-menu-activator-right-offset: 0;
  --frag-menu-activator-hover-bg: var(--jui-color-neutral10);
  --frag-menu-activator-hover-color: var(--jui-color-neutral80);
  --frag-menu-activator-color: var(--jui-color-neutral50);
}
.activator {
  position: relative;
  display: inline-block;
  padding: var(--frag-menu-activator-padding);
  border-radius: var(--frag-menu-activator-radius);
  transition: background-color 0.1s ease-in;
  cursor: pointer;
  line-height: 1;
}
.trigger { display: inline-flex; color: var(--frag-menu-activator-color); transform: rotate(90deg); }
.panel {
  display: none;
  position: absolute;
  z-index: 100000;
  top: 100%;
  right: var(--frag-menu-activator-right-offset);
  padding-top: 0.5em;
  cursor: default;
  line-height: normal;
}
.activator:hover, :host([state~="hover"]) .activator, :host([state~="open"]) .activator { background-color: var(--frag-menu-activator-hover-bg); }
.activator:hover .trigger, :host([state~="hover"]) .trigger, :host([state~="open"]) .trigger { color: var(--frag-menu-activator-hover-color); }
:host(:not([click-to-activate])) .activator:hover .panel,
:host(:not([click-to-activate])[state~="hover"]) .panel,
:host([state~="open"]) .panel { display: block; animation: juiMenuActivator-fade 0.4s; }
:host([above]) .panel { top: auto; bottom: var(--frag-menu-activator-above-offset); padding-top: 0; }
@keyframes juiMenuActivator-fade { from { opacity: 0; } to { opacity: 1; } }
```

## Example

```xml
<div layout="column" gap="2">
  <div layout="row" gap="8" align="center" justify="center">
    <jui-menu-activator/>
    <jui-menu-activator state="hover" click-to-activate=""/>
    <jui-menu-activator click-to-activate="" state="open">
      <jui-menu>
        <jui-menu-item icon="pencil" label="Edit"/>
        <jui-menu-item icon="copy" label="Duplicate"/>
        <jui-menu-item icon="trash-2" label="Delete" variant="error"/>
      </jui-menu>
    </jui-menu-activator>
  </div>
  <div mt="12" mb="12"></div>
</div>
```
