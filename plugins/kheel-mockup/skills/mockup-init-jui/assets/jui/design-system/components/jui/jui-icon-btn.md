---
name: jui-icon-btn
version: 1.0.0
kind: composed
status: active
summary: IconBtn fragment — a round, borderless button showing only an icon.
---

# IconBtn (fragment)

## Purpose

Represents JUI's **IconBtn** fragment: a compact circular button that shows a single icon and no label — close
buttons, row actions, "more" triggers and toolbar tools where the icon speaks for itself. Being a fragment, it has
no events of its own: its click is handled by the component it sits in (see **Fragment events** in the shared
behaviours). Use `jui-btn` without a label when the icon-only button must share the look (fill, outline, nature)
of the labelled buttons next to it, and `jui-icon` for an icon that is not an action.

## Anatomy

A transparent circular `button`, `2em` square, holding one `jui-icon` centred. On hover a light grey disc
appears behind the icon and the icon darkens.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| icon | content | icon | | The icon. Required: JUI renders nothing without one. |
| size | variant | small, medium, large | medium | Icon size (JUI `size(Length)`, the button's font size): `1em`, `1.2em` (JUI's default) or `1.5em`. The circle scales with it. |
| label | content | text | | Accessible name (JUI `attr("aria-label", …)`). |
| waiting | state | boolean | | Shows the running state, as while an asynchronous click completes. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| size | small | Dense rows and inline with small text. |
| size | medium | The JUI default; most places. |
| size | large | Prominent standalone tools, such as a dialog's close button in a large header. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Grey icon on a transparent background. |
| Interaction | hover | `:hover` | Light grey disc (`--jui-iconbtn-bg-hover`), darker icon. |
| Interaction | focus | `:focus-visible` | Focus ring. |
| Activity | idle | Default | — |
| Activity | waiting | `waiting` property | The button is disabled while the click's callback is outstanding; it ignores further clicks. JUI gives no visual change beyond a default cursor. |

## Behaviour

A click runs the action through the enclosing component (**Fragment events**). While the action's callback is
outstanding the button is disabled (JUI's `running` class), and re-enabled when the callback completes.

## Content rules

Choose an icon whose meaning is unmistakable (`x` to close, `pencil` to edit, `trash-2` to delete, `ellipsis` for
more). If the meaning is not obvious, use a labelled `jui-btn` instead.

## Accessibility

A real `button` element. Always give `label`, since there is no visible text. The target is `2em` square — keep
`size="medium"` or larger where touch is expected.

## Rules of use

- Give every icon button a `label`; it is the only name a screen reader has.
- Don't use an icon button for the primary action of a surface; use a labelled `jui-btn`.
- Don't mix icon buttons and filled `jui-btn` icon-only buttons in one toolbar; pick one look.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-iconbtn-color` | component | `#777` | Icon colour at rest. |
| `--jui-iconbtn-color-hover` | component | `#444` | Icon colour on hover. |
| `--jui-iconbtn-size` | component | `1.2em` | Font size, which sets the icon size; `size` sets `1em` or `1.5em`. |
| `--jui-iconbtn-bg-hover` | component | `#efefef` | Disc painted on hover. |
| `--jui-iconbtn-dimension` | component | `2em` | Width and height of the circle. |
| `--jui-role-focus-ring` | semantic | | Focus ring. |

## Template

```html
<button type="button" class="btn" aria-label="{{label}}">
  <jui-icon name="{{icon}}"></jui-icon>
</button>
```

## Style

```css
:host {
  display: inline-flex;
  vertical-align: middle;
  --jui-iconbtn-color: #777;
  --jui-iconbtn-color-hover: #444;
  --jui-iconbtn-size: 1.2em;
  --jui-iconbtn-bg-hover: #efefef;
  --jui-iconbtn-dimension: 2em;
}
:host([size="small"]) { --jui-iconbtn-size: 1em; }
:host([size="large"]) { --jui-iconbtn-size: 1.5em; }
.btn {
  display: flex; align-items: center; justify-content: center;
  padding: 0; border: none; border-radius: 1em; background: transparent;
  font: inherit; font-size: var(--jui-iconbtn-size); color: var(--jui-iconbtn-color);
  width: var(--jui-iconbtn-dimension); height: var(--jui-iconbtn-dimension);
  cursor: pointer; transition: background 0.2s, color 0.2s;
}
.btn:hover, :host([state~="hover"]) .btn { background: var(--jui-iconbtn-bg-hover); color: var(--jui-iconbtn-color-hover); }
.btn:focus-visible, :host([state~="focus"]) .btn { outline: 2px solid var(--jui-role-focus-ring); outline-offset: 2px; }
:host([waiting]) .btn { cursor: default; pointer-events: none; }
jui-icon { display: block; }
```

## Example

```xml
<div layout="row" gap="3" align="center">
  <jui-icon-btn icon="pencil" label="Edit"/>
  <jui-icon-btn icon="trash-2" label="Delete"/>
  <jui-icon-btn icon="ellipsis" label="More"/>
  <jui-icon-btn icon="x" label="Close" size="small"/>
  <jui-icon-btn icon="settings" label="Settings" size="large"/>
  <jui-icon-btn icon="pencil" label="Edit (hover)" state="hover"/>
  <jui-icon-btn icon="pencil" label="Edit (focus)" state="focus"/>
  <jui-icon-btn icon="refresh-cw" label="Refreshing" waiting=""/>
</div>
```
