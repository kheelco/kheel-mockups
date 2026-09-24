---
name: jui-button
version: 1.0.0
kind: composed
status: active
summary: Button component — a stand-alone button component with a label, an icon, a variant and an asynchronous click handler.
---

# Button (component)

## Purpose

Represents JUI's **Button** component (`Button` / `ButtonCreator`, `…client.button`): a button that is a component
in its own right — it has its own lifecycle, focus management, events and handler (`IButtonHandler`, completed
asynchronously with `cb.complete()`), and can be placed directly into a layout, a form footer or a toolbar, or
held and driven from code (`click()`, `updateLabel(…)`, `disable()`, `waiting(…)`).

The **Btn** fragment (`jui-btn`) looks similar but is lighter: it is drawn inside another component's DOM, has no
lifecycle of its own and its click is handled by that enclosing component. Use `jui-btn` for buttons inside a
component's content (card footers, row actions, dialog actions built with the DOM builder); use `jui-button`
when the button is a component of its own — added to a panel or layout, or kept and controlled independently.
Both draw from the same `--jui-comp-button-*` family tokens, so they match.

## Anatomy

An outer surface with a border and radius holding a link-like action: an optional icon (`jui-icon`, on the left
or the right) and the label. While the handler runs, a spinner (`jui-icon`) replaces the content in the centre,
keeping the width.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The button's text (`label(…)`). |
| icon | content | icon | | Optional icon (`icon(…)`). |
| icon-position | variant | left, right | left | Which side of the label the icon sits (`iconOnLeft()` / `iconOnRight()`). |
| variant | variant | standard, outlined, link | standard | The look (JUI `Variant.STANDARD`, `OUTLINED`, `LINK`). |
| nature | variant | normal, success, warning, danger | normal | The colour of a standard button (JUI `Variant.SUCCESS`, `WARNING`, `DANGER`, combined with `STANDARD`). |
| disabled | state | boolean | | Puts the button in the disabled state (`disable()`). |
| waiting | state | boolean | | Puts the button in the waiting state, as while its handler runs (`waiting(true)`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | standard | Filled with the primary colour (or the nature's): the main action of a panel or form. |
| variant | outlined | White with a primary border and text; a light tint on hover. Secondary actions. |
| variant | link | No surface or border; link-coloured text, underlined on hover. Tertiary actions such as "Cancel". |
| nature | success | Completing or confirming actions. |
| nature | warning | Actions that need care. |
| nature | danger | Destructive actions. |
| icon-position | right | Forward-moving actions ("Next") with a trailing arrow. |

JUI's deprecated `Style` enum maps onto these: `NORMAL` is `standard`, `NORMAL_SUCCESS` / `NORMAL_WARNING` /
`NORMAL_DANGER` add the nature, `OUTLINED` and `LINK` are the variants.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | As the variant and nature. |
| Interaction | hover | `:hover` | Hover background; link variant underlines. Not while disabled or waiting. |
| Interaction | focus | `:focus-within` (keyboard focus in JUI) | Focus border and a 2px focus ring. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Disabled background and border, muted content, not-allowed cursor. |
| Activity | idle | Default | — |
| Activity | waiting | `waiting` property | Sunken background, muted border, content hidden and a spinner centred; ignores clicks. |

## Behaviour

A click calls the handler and, by default (`Behaviour.WAIT`), shows the waiting state until the handler calls
`cb.complete()`; the button then takes focus back. `Behaviour.DISABLE` disables it instead while the handler runs,
and `Behaviour.NORMAL` leaves it unchanged. A click while waiting or disabled is ignored. JUI shows the focus
ring only for keyboard focus, not after a mouse click.

## Content rules

A verb or verb phrase in sentence case: `Save`, `Add member`, `Cancel`.

## Accessibility

JUI renders the action as a focusable anchor (`href="javascript:;"`); give icon-only buttons an accessible
label. The focus ring is never removed.

## Rules of use

- One `standard` button per group of actions; `outlined` or `link` for the rest.
- Use `danger` only for destructive actions.
- Inside a component's own DOM, prefer the `jui-btn` fragment; use `jui-button` when the button is a component.

## Tokens

The tokens the style uses: JUI's `--cpt-btn-*` component contract (`docs/css_component_contracts.md`), and the
semantic tokens from `tokens.md` it starts from.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-btn-height` | component | `--jui-comp-button-height` | Height of the surface. |
| `--cpt-btn-bg` | component | `--jui-comp-button-surface` | Background; the outline surface for `outlined`, transparent for `link`, the nature's surface for natures. |
| `--cpt-btn-bg-hover` | component | `--jui-comp-button-surface-hover` | Hover background, repointed like `--cpt-btn-bg`. |
| `--cpt-btn-border` | component | `--jui-comp-button-border` | Border colour; the outline border, transparent for `link`, the nature's border. |
| `--cpt-btn-border-width` | component | `1px` | Border width; `0` for `link`. |
| `--cpt-btn-border-radius` | component | `--jui-comp-button-radius` | Radius. |
| `--cpt-btn-text` | component | `--jui-comp-button-text` | Content colour; the outline or link text colour. |
| `--cpt-btn-text-hover` | component | `--cpt-btn-text` | Content colour on hover. |
| `--cpt-btn-text-size` | component | `--jui-comp-button-font-size` | Base text size. |
| `--cpt-btn-text-lineheight` | component | `--jui-comp-button-text-lineheight` | Label line height; `1.2` for `link`. |
| `--cpt-btn-font-weight` | component | `--jui-comp-button-font-weight` | Label weight. |
| `--cpt-btn-padding-inline` | component | `--jui-comp-button-padding-inline` | Horizontal padding. |
| `--cpt-btn-padding-block` | component | `--jui-comp-button-padding-block` | Vertical padding; `0` for `link`. |
| `--cpt-btn-gap` | component | `--jui-comp-button-gap` | Icon–label gap. |
| `--cpt-btn-margin` | component | `--jui-comp-button-margin` | Outer margin; `0` for `link`. |
| `--cpt-btn-hover-text-decoration` | component | `none` | `underline` for `link`. |
| `--cpt-btn-disabled-bg` | component | `--jui-comp-button-surface-disabled` | Disabled background; transparent for `outlined` and `link`. |
| `--cpt-btn-disabled-border` | component | `--jui-comp-button-border-disabled` | Disabled border; transparent for `link`. |
| `--cpt-btn-disabled-text` | component | `--jui-comp-button-text-disabled` | Disabled content colour; `--jui-state-disabled` for `link`. |
| `--cpt-btn-disabled-opacity` | component | `--jui-comp-button-disabled-opacity` | Disabled content opacity. |
| `--cpt-btn-waiting-bg` | component | `--jui-comp-button-waiting-surface` | Waiting background; transparent for `link`. |
| `--cpt-btn-waiting-border` | component | `--jui-comp-button-waiting-border` | Waiting border. |
| `--cpt-btn-waiting-text` | component | `--jui-comp-button-waiting-text` | Spinner colour. |
| `--cpt-btn-focus-border` | component | `--jui-comp-button-focus-border` | Focus border colour. |
| `--cpt-btn-focus-shadow` | component | `--jui-comp-button-focus-shadow` | Focus ring colour. |
| `--jui-comp-button-height`, `--jui-comp-button-surface`, `--jui-comp-button-surface-hover`, `--jui-comp-button-border`, `--jui-comp-button-radius`, `--jui-comp-button-text`, `--jui-comp-button-font-size`, `--jui-comp-button-text-lineheight`, `--jui-comp-button-font-weight`, `--jui-comp-button-padding-inline`, `--jui-comp-button-padding-block`, `--jui-comp-button-gap`, `--jui-comp-button-margin`, `--jui-comp-button-surface-disabled`, `--jui-comp-button-border-disabled`, `--jui-comp-button-text-disabled`, `--jui-comp-button-disabled-opacity`, `--jui-comp-button-waiting-surface`, `--jui-comp-button-waiting-border`, `--jui-comp-button-waiting-text`, `--jui-comp-button-focus-border`, `--jui-comp-button-focus-shadow` | semantic | | The button family defaults the component tokens start from. |
| `--jui-comp-button-outline-surface`, `--jui-comp-button-outline-surface-hover`, `--jui-comp-button-outline-text`, `--jui-comp-button-outline-border` | semantic | | The `outlined` variant. |
| `--jui-comp-button-link-text`, `--jui-comp-button-link-text-hover`, `--jui-state-disabled` | semantic | | The `link` variant. |
| `--jui-comp-button-success-surface`, `--jui-comp-button-success-surface-hover`, `--jui-comp-button-success-border`, `--jui-comp-button-warning-surface`, `--jui-comp-button-warning-surface-hover`, `--jui-comp-button-warning-border`, `--jui-comp-button-danger-surface`, `--jui-comp-button-danger-surface-hover`, `--jui-comp-button-danger-border` | semantic | | Natures. |

## Template

```html
<div class="outer">
  <a class="action" role="button" tabindex="0">
    <jui-icon class="spinner" name="loader-circle"></jui-icon>
    <jui-icon class="icon" data-if="icon" name="{{icon}}"></jui-icon>
    <span class="label" data-if="label">{{label}}</span>
  </a>
</div>
```

## Style

```css
:host {
  --cpt-btn-height: var(--jui-comp-button-height);
  --cpt-btn-bg: var(--jui-comp-button-surface);
  --cpt-btn-bg-hover: var(--jui-comp-button-surface-hover);
  --cpt-btn-border: var(--jui-comp-button-border);
  --cpt-btn-border-width: 1px;
  --cpt-btn-border-radius: var(--jui-comp-button-radius);
  --cpt-btn-text: var(--jui-comp-button-text);
  --cpt-btn-text-hover: var(--cpt-btn-text);
  --cpt-btn-text-size: var(--jui-comp-button-font-size);
  --cpt-btn-text-lineheight: var(--jui-comp-button-text-lineheight);
  --cpt-btn-font-weight: var(--jui-comp-button-font-weight);
  --cpt-btn-padding-inline: var(--jui-comp-button-padding-inline);
  --cpt-btn-padding-block: var(--jui-comp-button-padding-block);
  --cpt-btn-gap: var(--jui-comp-button-gap);
  --cpt-btn-margin: var(--jui-comp-button-margin);
  --cpt-btn-hover-text-decoration: none;
  --cpt-btn-disabled-bg: var(--jui-comp-button-surface-disabled);
  --cpt-btn-disabled-border: var(--jui-comp-button-border-disabled);
  --cpt-btn-disabled-text: var(--jui-comp-button-text-disabled);
  --cpt-btn-disabled-opacity: var(--jui-comp-button-disabled-opacity);
  --cpt-btn-waiting-bg: var(--jui-comp-button-waiting-surface);
  --cpt-btn-waiting-border: var(--jui-comp-button-waiting-border);
  --cpt-btn-waiting-text: var(--jui-comp-button-waiting-text);
  --cpt-btn-focus-border: var(--jui-comp-button-focus-border);
  --cpt-btn-focus-shadow: var(--jui-comp-button-focus-shadow);
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  overflow: hidden;
  margin: var(--cpt-btn-margin);
  border: var(--cpt-btn-border-width) solid var(--cpt-btn-border);
  border-radius: var(--cpt-btn-border-radius);
  background: var(--cpt-btn-bg);
  font-size: var(--cpt-btn-text-size);
}
:host([variant="outlined"]) {
  --cpt-btn-bg: var(--jui-comp-button-outline-surface);
  --cpt-btn-bg-hover: var(--jui-comp-button-outline-surface-hover);
  --cpt-btn-text: var(--jui-comp-button-outline-text);
  --cpt-btn-text-hover: var(--jui-comp-button-outline-text);
  --cpt-btn-border: var(--jui-comp-button-outline-border);
  --cpt-btn-disabled-bg: transparent;
}
:host([variant="link"]) {
  --cpt-btn-bg: transparent;
  --cpt-btn-bg-hover: transparent;
  --cpt-btn-text: var(--jui-comp-button-link-text);
  --cpt-btn-text-hover: var(--jui-comp-button-link-text-hover);
  --cpt-btn-border: transparent;
  --cpt-btn-border-width: 0;
  --cpt-btn-padding-block: 0;
  --cpt-btn-text-lineheight: 1.2;
  --cpt-btn-margin: 0;
  --cpt-btn-waiting-bg: transparent;
  --cpt-btn-disabled-bg: transparent;
  --cpt-btn-disabled-border: transparent;
  --cpt-btn-disabled-text: var(--jui-state-disabled);
  --cpt-btn-hover-text-decoration: underline;
}
:host([variant="standard"][nature="success"]) { --cpt-btn-bg: var(--jui-comp-button-success-surface); --cpt-btn-bg-hover: var(--jui-comp-button-success-surface-hover); --cpt-btn-border: var(--jui-comp-button-success-border); }
:host([variant="standard"][nature="warning"]) { --cpt-btn-bg: var(--jui-comp-button-warning-surface); --cpt-btn-bg-hover: var(--jui-comp-button-warning-surface-hover); --cpt-btn-border: var(--jui-comp-button-warning-border); }
:host([variant="standard"][nature="danger"]) { --cpt-btn-bg: var(--jui-comp-button-danger-surface); --cpt-btn-bg-hover: var(--jui-comp-button-danger-surface-hover); --cpt-btn-border: var(--jui-comp-button-danger-border); }
.outer {
  margin: 0;
  padding: var(--cpt-btn-padding-block) 2px;
  background: var(--cpt-btn-bg);
  width: 100%;
  height: var(--cpt-btn-height);
  display: flex;
  align-items: center;
  justify-content: center;
}
.action {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: var(--cpt-btn-gap);
  align-items: center;
  justify-content: center;
  padding-left: var(--cpt-btn-padding-inline);
  padding-right: var(--cpt-btn-padding-inline);
  color: var(--cpt-btn-text);
  text-align: center;
  text-decoration: none;
  outline: none;
  cursor: pointer;
}
:host([icon-position="right"]) .action { flex-direction: row-reverse; }
.label { line-height: var(--cpt-btn-text-lineheight); font-size: 1em; white-space: nowrap; font-weight: var(--cpt-btn-font-weight); }
.spinner { display: none; position: absolute; left: 50%; top: 50%; margin-top: -0.5em; margin-left: -0.5em; font-size: 1.4em; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
:host(:not([disabled]):not([waiting])) .outer:hover, :host([state~="hover"]:not([disabled]):not([waiting])) .outer { background: var(--cpt-btn-bg-hover); }
:host(:not([disabled]):not([waiting])) .outer:hover .action, :host([state~="hover"]:not([disabled]):not([waiting])) .action { color: var(--cpt-btn-text-hover); }
:host(:not([disabled]):not([waiting])) .outer:hover .label, :host([state~="hover"]:not([disabled]):not([waiting])) .label { text-decoration: var(--cpt-btn-hover-text-decoration); }
:host(:focus-within), :host([state~="focus"]) { border-color: var(--cpt-btn-focus-border); box-shadow: 0 0 0 2px var(--cpt-btn-focus-shadow); overflow: visible; }
:host([disabled]) { border-color: var(--cpt-btn-disabled-border); background: var(--cpt-btn-disabled-bg); }
:host([disabled]) .outer { background: var(--cpt-btn-disabled-bg); }
:host([disabled]) .action { color: var(--cpt-btn-disabled-text); opacity: var(--cpt-btn-disabled-opacity); cursor: not-allowed; }
:host([waiting]) { border-color: var(--cpt-btn-waiting-border); }
:host([waiting]) .outer { background: var(--cpt-btn-waiting-bg); }
:host([waiting]) .action { opacity: 0.6; cursor: default; pointer-events: none; }
:host([waiting]) .label, :host([waiting]) .icon { visibility: hidden; }
:host([waiting]) .spinner { display: block; color: var(--cpt-btn-waiting-text); }
```

## Example

```xml
<div layout="column" gap="3">
  <div layout="row" gap="2" wrap="" align="center">
    <jui-button label="Save"/>
    <jui-button label="Add member" icon="plus" variant="outlined"/>
    <jui-button label="Cancel" variant="link"/>
    <jui-button label="Approve" icon="check" nature="success"/>
    <jui-button label="Review" nature="warning"/>
    <jui-button label="Delete" icon="trash-2" nature="danger"/>
    <jui-button label="Next" icon="chevron-right" icon-position="right"/>
  </div>
  <div layout="row" gap="2" wrap="" align="center">
    <jui-button label="Hover" state="hover"/>
    <jui-button label="Outlined hover" variant="outlined" state="hover"/>
    <jui-button label="Link hover" variant="link" state="hover"/>
    <jui-button label="Focus" state="focus"/>
    <jui-button label="Disabled" disabled=""/>
    <jui-button label="Disabled" variant="outlined" disabled=""/>
    <jui-button label="Saving" waiting=""/>
  </div>
</div>
```
