---
name: jui-btn
version: 1.0.0
kind: composed
status: active
summary: Btn fragment — a lightweight inline button with a label, an icon and a click action.
---

# Btn (fragment)

## Purpose

Represents JUI's **Btn** fragment: the everyday button for actions inside a component's content — toolbars, card
footers, dialog actions, row actions. Being a fragment, it has no events of its own: its click is handled by the
component it sits in (see **Fragment events** in the shared behaviours). Use the **Button** component
(`jui-button`) instead when the button must be a component in its own right — placed directly in a layout or
driven independently of its surroundings.

## Anatomy

A container holding an optional leading icon (`jui-icon`) and a label. While waiting on an asynchronous action,
a spinner overlays the content and the label is hidden, keeping the width.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The button's text. Omit for an icon-only button (JUI `iconOnly`), and give `aria-label`. |
| icon | content | icon | | Optional leading icon. |
| variant | variant | standard, outlined, text | standard | The look: filled, outlined, or text only. |
| nature | variant | normal, warning, danger, success, grey | normal | The colour and meaning. |
| expanded | variant | boolean | | Wider horizontal padding (JUI `EXPANDED`). |
| rounded | variant | boolean | | Fully rounded corners (JUI `ROUNDED`). |
| compact | variant | boolean | | No horizontal padding (JUI `COMPACT`). |
| disabled | state | boolean | | Puts the button in the disabled state (JUI `disable()`). |
| waiting | state | boolean | | Puts the button in the waiting state, as while an asynchronous click completes. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | standard | Filled with the nature's colour: the main action in a group. |
| variant | outlined | Bordered and filled with white; fills with the nature's colour on hover. Supporting actions. |
| variant | text | Text only, underlined on hover. Low-emphasis and inline actions. |
| nature | normal | The primary interactive colour. |
| nature | warning | Actions that need care. |
| nature | danger | Destructive actions; semibold label. |
| nature | success | Completing or confirming actions. |
| nature | grey | Neutral, grey outline; secondary actions next to a primary one. |

JUI's named variants combine these: `STANDARD_ROUNDED` is `variant="standard" rounded=""`,
`STANDARD_EXPANDED_ROUNDED` adds `expanded=""`, `OUTLINED_ROUNDED` is `variant="outlined" rounded=""`, and
`TEXT_COMPACT` is `variant="text" compact=""`.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | As the variant and nature. |
| Interaction | hover | `:hover` | Hover background (`--frag-btn-hover-bg`); outlined fills; text underlines. |
| Interaction | focus | `:focus-visible` | Focus ring. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Transparent background, muted border and text, not-allowed cursor. |
| Activity | idle | Default | — |
| Activity | waiting | `waiting` property | Label hidden, spinner centred, width held; ignores clicks. |

## Behaviour

A click runs the button's action through the enclosing component (see **Fragment events**). When the action is
asynchronous, the button shows the waiting state until it completes, unless JUI's `immediate()` is set.

## Content rules

A verb or verb phrase in sentence case: `Save`, `Add member`, `Cancel`.

## Accessibility

A real `button` element. Icon-only buttons need an accessible label. The focus ring is never removed.

## Rules of use

- One `standard` button per group of actions; use `outlined` or `grey` for the rest.
- Use `danger` only for destructive actions.
- Prefer `jui-btn` inside components' content; use `jui-button` when a button is a component of its own.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--frag-btn-base` | component | `--jui-comp-button-surface` | The nature's colour; the filled background, outline border and text colour derive from it. Natures repoint it at `--jui-btn-warning-bg`, `--jui-btn-danger-bg`, `--jui-btn-success-bg` or white (grey). |
| `--frag-btn-bg` | component | `--frag-btn-base` | Background; white when outlined, transparent for text. |
| `--frag-btn-bg-hover` | component | `--jui-comp-button-surface-hover` | Hover colour for the nature. |
| `--frag-btn-hover-bg` | component | `--frag-btn-bg-hover` | Background painted on hover; the border colour when outlined, transparent for text. |
| `--frag-btn-border` | component | `--frag-btn-base` | Border colour; `--jui-color-neutral30` for grey. |
| `--frag-btn-border-width` | component | `1px` | Border width; `0` for text. |
| `--frag-btn-radius` | component | `--jui-comp-button-radius` | Corner radius; `16px` when rounded. |
| `--frag-btn-text` | component | `--jui-comp-button-text` | Label and icon colour; the border colour when outlined, the base colour for text. |
| `--frag-btn-text-hover` | component | `--frag-btn-text` | Label colour on hover; white when outlined. |
| `--frag-btn-text-weight` | component | `--jui-comp-button-font-weight` | Label weight; `600` for danger. |
| `--frag-btn-padding-tb` | component | `--jui-comp-button-padding-block` | Vertical padding. |
| `--frag-btn-padding-lr` | component | `--jui-comp-button-padding-inline` | Horizontal padding; `1em` expanded, `0` compact. |
| `--frag-btn-font-size` | component | `--jui-comp-button-font-size` | Label size. |
| `--frag-btn-gap` | component | `--jui-comp-button-gap` | Gap between icon and label. |
| `--frag-btn-letter-spacing` | component | `--jui-comp-button-letter-spacing` | Label tracking. |
| `--frag-btn-margin` | component | `--jui-comp-button-margin` | Outer margin. |
| `--frag-btn-hover-text-decoration` | component | `none` | `underline` for text. |
| `--frag-btn-bg-disabled`, `--frag-btn-text-disabled`, `--frag-btn-border-disabled` | component | `--jui-comp-button-surface-disabled`, `--jui-comp-button-text-disabled`, `--jui-comp-button-border-disabled` | The disabled look. |
| `--jui-comp-button-surface`, `--jui-comp-button-surface-hover`, `--jui-comp-button-radius`, `--jui-comp-button-text`, `--jui-comp-button-font-weight`, `--jui-comp-button-padding-block`, `--jui-comp-button-padding-inline`, `--jui-comp-button-font-size`, `--jui-comp-button-gap`, `--jui-comp-button-letter-spacing`, `--jui-comp-button-margin`, `--jui-comp-button-surface-disabled`, `--jui-comp-button-text-disabled`, `--jui-comp-button-border-disabled` | semantic | | The button family defaults the component tokens start from. |
| `--jui-btn-warning-bg`, `--jui-btn-warning-bg-hover`, `--jui-btn-danger-bg`, `--jui-btn-danger-bg-hover`, `--jui-btn-success-bg`, `--jui-btn-success-bg-hover` | semantic | | Nature colours. |
| `--jui-color-aux-white`, `--jui-color-neutral05`, `--jui-color-neutral30`, `--jui-color-neutral60` | semantic | | White surfaces (outlined, grey) and the grey nature. |
| `--jui-role-focus-ring` | semantic | | Focus ring. |

## Template

```html
<button type="button" class="btn">
  <span class="content">
    <jui-icon data-if="icon" name="{{icon}}"></jui-icon>
    <span class="label" data-if="label">{{label}}</span>
  </span>
  <span class="spinner" data-if="waiting"></span>
</button>
```

## Style

```css
:host {
  display: inline-flex;
  vertical-align: middle;
  --frag-btn-margin: var(--jui-comp-button-margin);
  --frag-btn-base: var(--jui-comp-button-surface);
  --frag-btn-border: var(--frag-btn-base);
  --frag-btn-border-width: 1px;
  --frag-btn-radius: var(--jui-comp-button-radius);
  --frag-btn-text: var(--jui-comp-button-text);
  --frag-btn-text-hover: var(--frag-btn-text);
  --frag-btn-text-weight: var(--jui-comp-button-font-weight);
  --frag-btn-bg: var(--frag-btn-base);
  --frag-btn-bg-hover: var(--jui-comp-button-surface-hover);
  --frag-btn-hover-bg: var(--frag-btn-bg-hover);
  --frag-btn-padding-tb: var(--jui-comp-button-padding-block);
  --frag-btn-padding-lr: var(--jui-comp-button-padding-inline);
  --frag-btn-font-size: var(--jui-comp-button-font-size);
  --frag-btn-gap: var(--jui-comp-button-gap);
  --frag-btn-letter-spacing: var(--jui-comp-button-letter-spacing);
  --frag-btn-hover-text-decoration: none;
  --frag-btn-bg-disabled: var(--jui-comp-button-surface-disabled);
  --frag-btn-text-disabled: var(--jui-comp-button-text-disabled);
  --frag-btn-border-disabled: var(--jui-comp-button-border-disabled);
}
:host([variant="outlined"]) { --frag-btn-text: var(--frag-btn-border); --frag-btn-text-hover: var(--jui-color-aux-white); --frag-btn-bg: var(--jui-color-aux-white); --frag-btn-hover-bg: var(--frag-btn-border); }
:host([variant="text"]) { --frag-btn-text: var(--frag-btn-base); --frag-btn-text-hover: var(--frag-btn-base); --frag-btn-border-width: 0; --frag-btn-bg: transparent; --frag-btn-hover-bg: transparent; --frag-btn-hover-text-decoration: underline; }
:host([nature="warning"]) { --frag-btn-base: var(--jui-btn-warning-bg); --frag-btn-bg-hover: var(--jui-btn-warning-bg-hover); }
:host([nature="danger"]) { --frag-btn-base: var(--jui-btn-danger-bg); --frag-btn-bg-hover: var(--jui-btn-danger-bg-hover); --frag-btn-text-weight: 600; }
:host([nature="success"]) { --frag-btn-base: var(--jui-btn-success-bg); --frag-btn-bg-hover: var(--jui-btn-success-bg-hover); }
:host([nature="grey"]) { --frag-btn-border: var(--jui-color-neutral30); --frag-btn-base: var(--jui-color-aux-white); --frag-btn-bg-hover: var(--jui-color-neutral05); --frag-btn-text: var(--jui-color-neutral60); --frag-btn-text-hover: var(--jui-color-neutral60); }
:host([expanded]) { --frag-btn-padding-lr: 1em; }
:host([rounded]) { --frag-btn-radius: 16px; }
:host([compact]) { --frag-btn-padding-lr: 0; }
.btn {
  position: relative; display: inline-flex; align-items: center; justify-content: center;
  margin: var(--frag-btn-margin); padding: var(--frag-btn-padding-tb) var(--frag-btn-padding-lr);
  border: var(--frag-btn-border-width) solid var(--frag-btn-border); border-radius: var(--frag-btn-radius);
  background-color: var(--frag-btn-bg); color: var(--frag-btn-text);
  font: inherit; font-size: var(--frag-btn-font-size); font-weight: var(--frag-btn-text-weight);
  letter-spacing: var(--frag-btn-letter-spacing); line-height: 1.4; white-space: nowrap; cursor: pointer;
}
.content { display: inline-flex; align-items: center; gap: var(--frag-btn-gap); }
:host(:not([label])) .btn { padding: var(--frag-btn-padding-tb); aspect-ratio: 1; }
.btn:hover, :host([state~="hover"]) .btn { background-color: var(--frag-btn-hover-bg); color: var(--frag-btn-text-hover); }
.btn:hover .label, :host([state~="hover"]) .label { text-decoration: var(--frag-btn-hover-text-decoration); }
.btn:focus-visible, :host([state~="focus"]) .btn { outline: 2px solid var(--jui-role-focus-ring); outline-offset: 2px; }
:host([disabled]) .btn { background-color: var(--frag-btn-bg-disabled); color: var(--frag-btn-text-disabled); border-color: var(--frag-btn-border-disabled); cursor: not-allowed; pointer-events: none; }
:host([waiting]) .btn { pointer-events: none; }
:host([waiting]) .content { visibility: hidden; }
.spinner { position: absolute; inset: 0; margin: auto; width: 1em; height: 1em; border-radius: 50%; border: 2px solid currentColor; border-right-color: transparent; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
```

## Example

```xml
<div layout="column" gap="3">
  <div layout="row" gap="2" wrap="" align="center">
    <jui-btn label="Save"/>
    <jui-btn label="Add member" icon="plus" variant="outlined"/>
    <jui-btn label="Cancel" nature="grey" variant="outlined"/>
    <jui-btn label="Learn more" variant="text"/>
    <jui-btn label="Delete" icon="trash-2" nature="danger"/>
    <jui-btn label="Approve" nature="success" rounded="" expanded=""/>
    <jui-btn icon="ellipsis" nature="grey" variant="outlined" aria-label="More"/>
  </div>
  <div layout="row" gap="2" wrap="" align="center">
    <jui-btn label="Hover" state="hover"/>
    <jui-btn label="Outlined hover" variant="outlined" state="hover"/>
    <jui-btn label="Focus" state="focus"/>
    <jui-btn label="Disabled" disabled=""/>
    <jui-btn label="Saving" waiting=""/>
  </div>
</div>
```
