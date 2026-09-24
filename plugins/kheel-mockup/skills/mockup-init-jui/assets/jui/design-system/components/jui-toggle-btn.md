---
name: jui-toggle-btn
version: 1.0.0
kind: elemental
status: active
summary: ToggleBtn fragment — a small on/off switch with an optional label, toggled by the enclosing component.
---

# ToggleBtn (fragment)

## Purpose

Represents JUI's **ToggleBtn** fragment: a compact pill-shaped switch with a knob, optionally followed by a label,
for turning a setting or a view option on and off inside a component's content — "Show archived", "Only mine".
Being a fragment it holds no value of its own: it is drawn `active` or not, and its click is handled by the
enclosing component (see **Fragment events**), which flips its state and re-renders it. Use the **CheckControl**
control (`jui-check-control`) instead when the on/off value belongs to a form and must be read,
validated or marked dirty as a control value (see **Control values**).

## Anatomy

A row of: the track (a rounded, bordered pill) holding the circular knob, which sits left when off and right when
on; and an optional label in medium-weight grey text.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | Text beside the switch (JUI `label(…)`). |
| active | state | boolean | | On: the knob moves right and the track fills with the primary tint (JUI `active(true)`). |
| variant | variant | standard | standard | The look (JUI `Variant.STANDARD`, the only one defined). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | standard | The only JUI variant: grey track when off, light primary track when on. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Value | off | Default | Knob on the left, light grey track with grey border. |
| Value | on | `active` property | Knob on the right, track `--jui-color-primary30` with a `--jui-color-primary50` border. |
| Interaction | default | At rest | Pointer cursor over the switch and label. |
| Interaction | focus | `:focus-visible` | Focus ring round the track (when the enclosing component makes it focusable). |

## Behaviour

Clicking anywhere on the switch or its label invokes the fragment's handler through the enclosing component
(**Fragment events**); the component then re-renders the fragment with the new `active` value. The switch does
not toggle itself.

## Content rules

The label names the thing that is on, in sentence case, without "Enable" or a question: `Show archived`, not
`Show archived?`.

## Accessibility

JUI renders plain `div`/`span` elements. When implementing, give the root `role="switch"`, `aria-checked` and
`tabindex="0"` (via `attr(…)`) so it can be reached and announced. A switch without a label needs `aria-label`.

## Rules of use

- Use for settings that take effect at once; use a checkbox control in a form that is saved later.
- Don't use it to choose between two named options; use `jui-choice-selector`.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-toggle-btn-width` | component | `2.2em` | Track width. |
| `--jui-toggle-btn-bg` | component | `#f1f1f1` | Track colour when off. |
| `--jui-toggle-btn-border` | component | `#ccc` | Track and knob border when off. |
| `--jui-toggle-btn-active-bg` | component | `--jui-color-primary30` | Track colour when on. |
| `--jui-toggle-btn-active-border` | component | `--jui-color-primary50` | Track and knob border when on. |
| `--jui-toggle-btn-knob-bg` | component | `#fff` | Knob colour. |
| `--jui-toggle-btn-label-gap` | component | `0.5em` | Gap between switch and label. |
| `--jui-toggle-btn-padding` | component | `1px` | Space between track border and knob. |
| `--jui-toggle-btn-label-size` | component | `0.95em` | Label size. |
| `--jui-toggle-btn-label-color` | component | `#666` | Label colour. |
| `--jui-toggle-btn-label-weight` | component | `500` | Label weight. |
| `--jui-color-primary30`, `--jui-color-primary50` | semantic | | The on colours. |
| `--jui-role-focus-ring` | semantic | | Focus ring. |

## Template

```html
<div class="toggle">
  <div class="track"><span class="knob"></span><span class="spacer"></span></div>
  <span class="label" data-if="label">{{label}}</span>
</div>
```

## Style

```css
:host {
  display: inline-flex;
  vertical-align: middle;
  --jui-toggle-btn-width: 2.2em;
  --jui-toggle-btn-bg: #f1f1f1;
  --jui-toggle-btn-border: #ccc;
  --jui-toggle-btn-active-bg: var(--jui-color-primary30);
  --jui-toggle-btn-active-border: var(--jui-color-primary50);
  --jui-toggle-btn-knob-bg: #fff;
  --jui-toggle-btn-label-gap: 0.5em;
  --jui-toggle-btn-padding: 1px;
  --jui-toggle-btn-label-size: 0.95em;
  --jui-toggle-btn-label-color: #666;
  --jui-toggle-btn-label-weight: 500;
}
.toggle { display: flex; flex-direction: row; align-items: center; gap: var(--jui-toggle-btn-label-gap); cursor: pointer; }
.track {
  display: flex; flex-direction: row; align-items: center; box-sizing: content-box;
  width: var(--jui-toggle-btn-width); padding: var(--jui-toggle-btn-padding);
  border: 1px solid var(--jui-toggle-btn-border); border-radius: 1em; background: var(--jui-toggle-btn-bg);
}
.knob { width: 1em; height: 1em; border: 1px solid var(--jui-toggle-btn-border); border-radius: 100%; background: var(--jui-toggle-btn-knob-bg); }
.spacer { flex-grow: 1; }
:host([active]) .track { flex-direction: row-reverse; background: var(--jui-toggle-btn-active-bg); border-color: var(--jui-toggle-btn-active-border); }
:host([active]) .knob { border-color: var(--jui-toggle-btn-active-border); }
:host(:focus-visible) .track, :host([state~="focus"]) .track { outline: 2px solid var(--jui-role-focus-ring); outline-offset: 2px; }
.label { font-size: var(--jui-toggle-btn-label-size); color: var(--jui-toggle-btn-label-color); font-weight: var(--jui-toggle-btn-label-weight); }
```

## Example

```xml
<div layout="row" gap="6" align="center" wrap="">
  <jui-toggle-btn label="Show archived"/>
  <jui-toggle-btn label="Only mine" active=""/>
  <jui-toggle-btn aria-label="Notifications"/>
  <jui-toggle-btn aria-label="Notifications" active=""/>
  <jui-toggle-btn label="Focused" state="focus"/>
</div>
```
