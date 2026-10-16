---
name: jui-menu-item
version: 1.0.0
kind: composed
status: active
summary: MenuItem fragment — one action in a menu, with an optional icon and a label.
---

# MenuItem (fragment)

## Purpose

Represents JUI's **MenuItem** fragment: one entry of a `jui-menu` — an optional icon and a label that runs an
action when clicked. Being a fragment, it has no events of its own: its click is handled by the enclosing
component (see **Fragment events**). Use it only inside `jui-menu`; for an action outside a menu use `jui-btn`.

## Anatomy

A row holding an optional leading icon (`jui-icon`, in a fixed 1.2 em column so labels align) and the label.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The item's text (JUI shows `NO LABEL` when empty). |
| icon | content | icon | | Optional leading icon. |
| icon-space | variant | boolean | | Reserves the icon column without an icon (JUI `icon("")`), so the label aligns with iconned items. |
| variant | variant | normal, error | normal | `error` colours the item red for destructive actions. |
| disabled | state | boolean | | Puts the item in the disabled state (JUI `disabled(true)`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | normal | Everyday actions: grey text, grey hover. |
| variant | error | Destructive actions (delete, remove): red text, pale red hover. Place last. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | As the variant. |
| Interaction | hover | `:hover` | Grey background with rounded corners; pale red for `error`. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Disabled text colour, no hover background, not clickable. |

## Behaviour

A click runs the item's action through the enclosing component (**Fragment events**) and, inside a
`jui-menu-activator`, closes the menu. A disabled item ignores clicks, unless JUI's `disabledButClickable` is used
to explain why the action is unavailable.

## Content rules

A verb or short verb phrase in sentence case: `Edit`, `Duplicate`, `Delete`. Use icons for all items in a menu or
for none (use `icon-space` to align when only some have one).

## Accessibility

The label is the accessible name. Don't convey the error variant by colour alone — the label must say what the
action does.

## Rules of use

- Use `error` only for destructive actions, and keep them last.
- Prefer hiding actions the user can never take over showing them disabled.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--frag-menuitem-text` | component | `--jui-color-neutral60` | Label and icon colour; `--jui-color-error50` for `error`, `--jui-text-disabled` when disabled. |
| `--frag-menuitem-hover-bg` | component | `--jui-color-neutral10` | Hover background; `--jui-color-error05` for `error`, transparent when disabled. |
| `--jui-color-neutral60`, `--jui-color-neutral10`, `--jui-color-error50`, `--jui-color-error05`, `--jui-text-disabled` | semantic | | Item colours. |
| `--jui-border-radius` | semantic | | Hover background radius. |

## Template

```html
<div class="item">
  <span class="icon" data-if="icon"><jui-icon name="{{icon}}"></jui-icon></span>
  <span class="icon" data-if="icon-space"></span>
  <span class="label">{{label}}</span>
</div>
```

## Style

```css
:host {
  display: block;
  --frag-menuitem-text: var(--jui-color-neutral60);
  --frag-menuitem-hover-bg: var(--jui-color-neutral10);
}
:host([variant="error"]) { --frag-menuitem-text: var(--jui-color-error50); --frag-menuitem-hover-bg: var(--jui-color-error05); }
:host([disabled]) { --frag-menuitem-text: var(--jui-text-disabled); --frag-menuitem-hover-bg: transparent; }
.item {
  white-space: nowrap;
  margin: 0 0.45em;
  padding: 0.35em 0.65em;
  color: var(--frag-menuitem-text);
  display: flex;
  gap: 0.75em;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
}
:host([disabled]) .item { cursor: default; }
.item:hover, :host([state~="hover"]) .item {
  background-color: var(--frag-menuitem-hover-bg);
  border-radius: var(--jui-border-radius);
}
.icon { display: inline-flex; justify-content: center; width: 1.2em; flex: none; }
```

## Example

```xml
<jui-menu>
  <jui-menu-item icon="pencil" label="Edit"/>
  <jui-menu-item icon="copy" label="Duplicate" state="hover"/>
  <jui-menu-item icon-space="" label="Move to…"/>
  <jui-menu-item icon="download" label="Export" disabled=""/>
  <jui-menu-item icon="trash-2" label="Delete" variant="error"/>
  <jui-menu-item icon="x" label="Remove" variant="error" state="hover"/>
</jui-menu>
```
