---
name: jui-text-control
version: 1.0.0
kind: composed
status: active
summary: TextControl control — a single-line text input with optional icons, clear action and the standard control states.
---

# TextControl (control)

## Purpose

Represents JUI's **TextControl**: the single-line text input (value type `String`). Use it for names, titles,
emails, codes and keyword search boxes. Like every JUI control it draws only the input — no label, guidance or
error text; those come from the form it sits in (`jui-control-form-cell` inside a `jui-control-form`) or from a
`jui-control-field` fragment. Use `jui-text-area-control` for multi-line text, `jui-number-control` for numbers,
`jui-text-search-control` when typing should offer matching values to pick from, and `jui-selection-control`
when the value must come from a list.

## Anatomy

A bordered box (JUI's `.inner`) holding, left to right: an optional leading icon (`jui-icon`), replaced by a lock
when read-only; the input (value or placeholder); an optional clear action (`x`, shown once there is a value); and
an optional trailing icon, which the clear action replaces while it is shown.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| value | content | text | | The current value (**Control values**: set with `setValue`, read with `value()`). Absent shows the placeholder. |
| placeholder | content | text | | Hint shown while the control is empty (JUI `placeholder`). |
| icon-left | content | icon | | Leading icon (JUI `iconLeft`), such as `search`. |
| icon-right | content | icon | | Trailing icon (JUI `iconRight`). |
| clear-action | variant | boolean | | Shows a clear (`x`) action while there is a value (JUI `clearAction`). |
| password | variant | boolean | | Masks the value as a password field (JUI `password`). |
| disabled | state | boolean | | Disabled: temporarily unavailable (JUI `disable()`). |
| read-only | state | boolean | | Read-only: presents a value that cannot be edited; shows a lock (JUI `readOnly`). |
| invalid | state | boolean | | Failed validation: red border (JUI invalidation). The message is shown by the enclosing field or cell. |
| waiting | state | boolean | | Waiting for its value to load: a pulsing blank box (JUI `waiting(true)`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| clear-action | present | Search and filter boxes, where clearing the value is a common action. |
| password | present | Secrets. The value is masked. |
| icon-left | an icon | A leading icon that says what the field is for (`search`, `mail`, `user`). |

JUI's text control also has project-level style variants (`TextControl.Config.Style`, `Variant`) that retune
the `--cpt-textctl-*` tokens; the mockup shows the standard style.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Neutral border on the control surface. |
| Interaction | hover | `:hover` | Hover border and surface (the same as rest in the standard style). |
| Interaction | focus | `:focus-within` | Focus-coloured border with a soft focus ring. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Sunken surface at half opacity, muted text and icons, not-allowed cursor. |
| Availability | read-only | `read-only` property | Read-only surface at half opacity, muted text; the leading icon is replaced by a lock. |
| Validation | valid | Default | — |
| Validation | invalid | `invalid` property | Error-coloured border with a thin error ring; a wider soft glow when also focused. |
| Activity | idle | Default | — |
| Activity | waiting | `waiting` property | Content hidden, border transparent, the box pulses between two muted surfaces. |
| Content | empty | No `value` | Placeholder in the placeholder colour; clear action hidden. |
| Content | filled | `value` set | Value in the text colour; clear action shown when enabled. |

## Behaviour

Typing changes the value; each change is reported to the control's modified handler (**Control values**) and
marks the control dirty against its reset value. The clear action empties the value. Validation runs when the
form validates (or on demand); failing it puts the control in the invalid state and hands the messages to the
enclosing `ControlForm` cell or `ControlField`, which display them. Read-only and disabled controls do not accept
input and are skipped by validation.

## Content rules

Placeholders are examples or hints in sentence case (`Enter your name`, `Search`), never the label: the label
belongs to the field or cell around the control.

## Accessibility

A real `input`. Its accessible name comes from the enclosing field or cell label (JUI links them); give
`aria-label` when the control stands alone, such as a search box. The focus ring is never removed.

## Rules of use

- Always label a text control through `jui-control-form-cell` or `jui-control-field`, not by placing text beside
  it — the control never draws its own label.
- Show an error by setting `invalid` on the control and the message on its cell or field, together.
- Use `read-only` for values the user may see but not change; use `disabled` only for temporarily unavailable
  input.

## Tokens

The tokens the style uses: its own component tokens (JUI's `--cpt-textctl-*` layer), and semantic tokens from
`tokens.md`.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-textctl-font` | component | `inherit` | Input font family. |
| `--cpt-textctl-weight` | component | `normal` | Input weight. |
| `--cpt-textctl-size` | component | `--jui-font-size-md` | Input font size. |
| `--cpt-textctl-padding` | component | `0 --jui-space-3` | Box padding. |
| `--cpt-textctl-height` | component | `--jui-comp-control-height` | Box height. |
| `--cpt-textctl-border` | component | `--jui-comp-control-border` | Border colour at rest. |
| `--cpt-textctl-border-hover` | component | `--cpt-textctl-border` | Border colour on hover. |
| `--cpt-textctl-border-focus` | component | `--jui-ctl-focus` | Border colour when focused. |
| `--cpt-textctl-border-style` | component | `solid` | Border style. |
| `--cpt-textctl-border-radius` | component | `--jui-comp-control-radius` | Corner radius. |
| `--cpt-textctl-bg` | component | `--jui-comp-control-surface` | Box surface. |
| `--cpt-textctl-bg-hover` | component | `--cpt-textctl-bg` | Surface on hover. |
| `--cpt-textctl-bg-focus` | component | `--cpt-textctl-bg` | Surface when focused. |
| `--cpt-textctl-text` | component | `--jui-comp-control-text` | Value colour. |
| `--cpt-textctl-text-disabled` | component | `--jui-comp-control-text-disabled` | Value colour when disabled. |
| `--cpt-textctl-text-readonly` | component | `--jui-comp-control-text-readonly` | Value colour when read-only. |
| `--cpt-textctl-text-placeholder` | component | `--jui-comp-control-text-placeholder` | Placeholder and clear-action colour. |
| `--cpt-textctl-icon` | component | `--jui-comp-control-action` | Leading, trailing and lock icon colour. |
| `--cpt-textctl-icon-disabled` | component | `--jui-comp-control-action-disabled` | Icon colour when disabled. |
| `--cpt-textctl-icon-readonly` | component | `--jui-comp-control-action-readonly` | Icon colour when read-only. |
| `--cpt-textctl-bg-readonly` | component | `--jui-ctl-bg-readonly` | Surface when read-only. |
| `--cpt-textctl-opacity-readonly` | component | `--jui-ctl-opacity-readonly` | Opacity when read-only. |
| `--jui-font-size-md`, `--jui-space-3` | semantic | | Input size and padding. |
| `--jui-comp-control-height`, `--jui-comp-control-border`, `--jui-comp-control-radius`, `--jui-comp-control-surface`, `--jui-comp-control-text`, `--jui-comp-control-text-disabled`, `--jui-comp-control-text-readonly`, `--jui-comp-control-text-placeholder`, `--jui-comp-control-action`, `--jui-comp-control-action-disabled`, `--jui-comp-control-action-readonly` | semantic | | The control family defaults the component tokens start from. |
| `--jui-ctl-focus`, `--jui-ctl-focus-offset` | semantic | | Focus border and ring. |
| `--jui-ctl-err-focus`, `--jui-ctl-err-focus-offset` | semantic | | Invalid border and ring. |
| `--jui-ctl-bg-disabled`, `--jui-ctl-opacity-disabled`, `--jui-ctl-bg-readonly`, `--jui-ctl-opacity-readonly` | semantic | | Disabled and read-only surfaces. |
| `--jui-ctl-bg-wait`, `--jui-role-surface-muted`, `--jui-role-surface-raised` | semantic | | Waiting surface and its pulse. |

## Template

```html
<div class="inner">
  <jui-icon data-if="icon-left" class="left" name="{{icon-left}}"></jui-icon>
  <jui-icon class="lock" name="lock"></jui-icon>
  <input data-if="!password" type="text" value="{{value}}" placeholder="{{placeholder}}">
  <input data-if="password" type="password" value="{{value}}" placeholder="{{placeholder}}">
  <jui-icon data-if="clear-action" class="clear" name="x"></jui-icon>
  <jui-icon data-if="icon-right" class="right" name="{{icon-right}}"></jui-icon>
</div>
```

## Style

```css
:host {
  display: block;
  --cpt-textctl-font: inherit;
  --cpt-textctl-weight: normal;
  --cpt-textctl-size: var(--jui-font-size-md);
  --cpt-textctl-padding: 0 var(--jui-space-3);
  --cpt-textctl-height: var(--jui-comp-control-height);
  --cpt-textctl-border: var(--jui-comp-control-border);
  --cpt-textctl-border-hover: var(--cpt-textctl-border);
  --cpt-textctl-border-focus: var(--jui-ctl-focus);
  --cpt-textctl-border-style: solid;
  --cpt-textctl-border-radius: var(--jui-comp-control-radius);
  --cpt-textctl-bg: var(--jui-comp-control-surface);
  --cpt-textctl-bg-hover: var(--cpt-textctl-bg);
  --cpt-textctl-bg-focus: var(--cpt-textctl-bg);
  --cpt-textctl-text: var(--jui-comp-control-text);
  --cpt-textctl-text-disabled: var(--jui-comp-control-text-disabled);
  --cpt-textctl-text-readonly: var(--jui-comp-control-text-readonly);
  --cpt-textctl-text-placeholder: var(--jui-comp-control-text-placeholder);
  --cpt-textctl-icon: var(--jui-comp-control-action);
  --cpt-textctl-icon-disabled: var(--jui-comp-control-action-disabled);
  --cpt-textctl-icon-readonly: var(--jui-comp-control-action-readonly);
  --cpt-textctl-bg-readonly: var(--jui-ctl-bg-readonly);
  --cpt-textctl-opacity-readonly: var(--jui-ctl-opacity-readonly);
}
.inner {
  margin: 2px 0; height: var(--cpt-textctl-height); box-sizing: content-box; padding: var(--cpt-textctl-padding);
  border: 1px var(--cpt-textctl-border-style) var(--cpt-textctl-border); border-radius: var(--cpt-textctl-border-radius);
  background: var(--cpt-textctl-bg); color: var(--cpt-textctl-text);
  display: flex; flex-direction: row; align-items: center; gap: 0.5rem;
}
input {
  flex: 1; min-width: 0; width: 100%; padding: 0; margin: 0; border: none; outline: none; background: inherit; color: inherit;
  font-family: var(--cpt-textctl-font); font-weight: var(--cpt-textctl-weight); font-size: var(--cpt-textctl-size);
}
input::placeholder { color: var(--cpt-textctl-text-placeholder); }
jui-icon { color: var(--cpt-textctl-icon); }
.lock { display: none; }
.clear { color: var(--cpt-textctl-text-placeholder); cursor: pointer; display: none; }
:host([value]:not([value=""])) .clear { display: inline-flex; }
:host([value]:not([value=""])[clear-action]) .right { display: none; }
:host(:hover) .clear { color: var(--cpt-textctl-text); }
:host(:hover) .inner, :host([state~="hover"]) .inner { border-color: var(--cpt-textctl-border-hover); background: var(--cpt-textctl-bg-hover); }
:host(:focus-within) .inner, :host([state~="focus"]) .inner {
  background: var(--cpt-textctl-bg-focus); border-color: var(--cpt-textctl-border-focus); box-shadow: 0 0 0 2px var(--jui-ctl-focus-offset);
}
:host([invalid]) .inner { border-color: var(--jui-ctl-err-focus); box-shadow: 0 0 0 1px var(--jui-ctl-err-focus-offset); }
:host([invalid]:focus-within) .inner, :host([invalid][state~="focus"]) .inner { box-shadow: 0 0 3px 1px var(--jui-ctl-err-focus-offset); }
:host([disabled]) .inner { background: var(--jui-ctl-bg-disabled); opacity: var(--jui-ctl-opacity-disabled); cursor: not-allowed; }
:host([disabled]) input { color: var(--cpt-textctl-text-disabled); pointer-events: none; }
:host([disabled]) jui-icon { color: var(--cpt-textctl-icon-disabled); }
:host([read-only]) .inner { background: var(--cpt-textctl-bg-readonly); opacity: var(--cpt-textctl-opacity-readonly); cursor: not-allowed; }
:host([read-only]) input { color: var(--cpt-textctl-text-readonly); pointer-events: none; }
:host([read-only]) jui-icon { color: var(--cpt-textctl-icon-readonly); }
:host([read-only]) .left, :host([read-only]) .clear { display: none; }
:host([read-only]) .lock { display: inline-flex; color: var(--cpt-textctl-icon); }
:host([disabled]) .clear, :host([read-only]) .clear { display: none; }
:host([waiting]) .inner { animation: jui-waiting 1s infinite; border-color: transparent; background-color: var(--jui-ctl-bg-wait); box-shadow: none; }
:host([waiting]) .inner > * { visibility: hidden; }
@keyframes jui-waiting { from { background-color: var(--jui-role-surface-muted); } to { background-color: var(--jui-role-surface-raised); } }
```

## Example

```xml
<div layout="grid" cols="3" gap="4">
  <jui-text-control placeholder="Enter your name"/>
  <jui-text-control value="Jill Jones"/>
  <jui-text-control placeholder="Search" icon-left="search" clear-action="" aria-label="Search"/>
  <jui-text-control value="invoices 2026" icon-left="search" clear-action="" aria-label="Search"/>
  <jui-text-control value="secret" password=""/>
  <jui-text-control placeholder="Email" icon-right="mail"/>
  <jui-text-control value="Hover" state="hover"/>
  <jui-text-control value="Focused" state="focus"/>
  <jui-text-control value="Not an email" invalid=""/>
  <jui-text-control value="Disabled" disabled=""/>
  <jui-text-control value="ACME-0042" read-only="" icon-left="tag"/>
  <jui-text-control value="Loading" waiting=""/>
  <jui-control-field label="Your name" required="" description="As it appears on your passport." error="please enter your full name" span="full">
    <jui-text-control value="J" invalid=""/>
  </jui-control-field>
</div>
```
