---
name: jui-number-control
version: 1.0.0
kind: composed
status: active
summary: NumberControl control — a numeric input with decrement and increment steppers.
---

# NumberControl (control)

## Purpose

Represents JUI's **NumberControl**: entry of a number, typed or stepped, within an optional minimum and maximum.
Use it for quantities, counts, percentages and limits. Use `jui-text-control` for number-like codes that are not
quantities (phone numbers, postcodes). As with every control the label and errors come from the enclosing
`jui-control-form-cell` or `jui-control-field`.

## Anatomy

A bordered box (JUI `.inner`) holding the input and, flush against the right edge, two square stepper buttons
(decrement and increment) on a lightly shaded surface, each separated by a thin divider.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| value | content | text | | The current number (**Control values**). Absent shows the placeholder. |
| placeholder | content | text | | Hint shown while empty (JUI `placeholder`). |
| disabled | state | boolean | | Disabled (JUI `disable()`). |
| read-only | state | boolean | | Read-only (JUI `readOnly`). |
| invalid | state | boolean | | Failed validation (for example outside the minimum or maximum): red border. |
| waiting | state | boolean | | Waiting for its value: pulsing blank box. |

## Variants

None. Minimum, maximum and step (JUI configuration) change behaviour, not appearance.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Neutral border. |
| Interaction | hover | `:hover` on a stepper | The stepper darkens. |
| Interaction | focus | `:focus-within` | Focus-coloured border with a soft focus ring. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Sunken surface at half opacity, muted text. |
| Availability | read-only | `read-only` property | Read-only surface at half opacity, muted text. |
| Validation | valid | Default | — |
| Validation | invalid | `invalid` property | Error-coloured border and ring. |
| Activity | idle | Default | — |
| Activity | waiting | `waiting` property | Content hidden; the box pulses. |
| Content | empty | No `value` | Placeholder shown. |
| Content | filled | `value` set | The number. |

## Behaviour

Typing or the steppers change the value by the configured step, within the minimum and maximum; each change is
reported (**Control values**). Values outside the range fail validation.

## Content rules

Show the unit in the label or placeholder (`Hours per week`), not in the value.

## Accessibility

A real `input`; the steppers are buttons with accessible names (`Decrease`, `Increase`) and the arrow keys step
the value.

## Rules of use

- Size the control to the expected number of digits (JUI `width(…)`); don't let it grow across a whole form row.
- Use a validator for the range so an out-of-range value shows an error message.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-numberctl-height` | component | `--jui-ctl-height` | Box and stepper height; stepper width. |
| `--jui-numberctl-border` | component | `--jui-ctl-border` | Border colour. |
| `--jui-numberctl-border-radius` | component | `--jui-ctl-border-radius` | Corner radius. |
| `--jui-numberctl-text` | component | `--jui-ctl-text` | Value colour. |
| `--jui-numberctl-text-light` | component | `--jui-ctl-text-placeholder` | Placeholder colour. |
| `--jui-numberctl-bg` | component | `--jui-ctl-bg` | Box surface. |
| `--jui-numberctl-stepper-bg` | component | `--jui-color-neutral05` | Stepper surface (JUI `#fbfbfb`). |
| `--jui-ctl-height`, `--jui-ctl-border`, `--jui-ctl-border-radius`, `--jui-ctl-text`, `--jui-ctl-text-placeholder`, `--jui-ctl-bg`, `--jui-ctl-action` | semantic | | The control family defaults and stepper icons. |
| `--jui-ctl-text-disabled`, `--jui-ctl-text-readonly` | semantic | | Disabled and read-only text. |
| `--jui-ctl-focus`, `--jui-ctl-focus-offset`, `--jui-ctl-err-focus`, `--jui-ctl-err-focus-offset` | semantic | | Focus and invalid borders and rings. |
| `--jui-ctl-bg-disabled`, `--jui-ctl-opacity-disabled`, `--jui-ctl-bg-readonly`, `--jui-ctl-opacity-readonly` | semantic | | Disabled and read-only surfaces. |
| `--jui-ctl-bg-wait`, `--jui-role-surface-muted`, `--jui-role-surface-raised` | semantic | | Waiting surface and its pulse. |
| `--jui-color-neutral05`, `--jui-color-neutral10` | semantic | | Stepper surface (JUI `#fbfbfb`), stepper divider and hover surface (JUI `#eee`). |

## Template

```html
<div class="inner">
  <input type="text" inputmode="numeric" value="{{value}}" placeholder="{{placeholder}}">
  <span class="steppers">
    <em class="step" title="Decrease"><jui-icon name="minus"></jui-icon></em>
    <em class="step" title="Increase"><jui-icon name="plus"></jui-icon></em>
  </span>
</div>
```

## Style

```css
:host {
  display: block;
  --jui-numberctl-height: var(--jui-ctl-height);
  --jui-numberctl-border: var(--jui-ctl-border);
  --jui-numberctl-border-radius: var(--jui-ctl-border-radius);
  --jui-numberctl-text: var(--jui-ctl-text);
  --jui-numberctl-text-light: var(--jui-ctl-text-placeholder);
  --jui-numberctl-bg: var(--jui-ctl-bg);
  --jui-numberctl-stepper-bg: var(--jui-color-neutral05);
}
.inner {
  margin: 2px 0; min-height: var(--jui-numberctl-height); box-sizing: content-box; padding: 0 0 0 0.75em; overflow: hidden;
  border: 1px solid var(--jui-numberctl-border); border-radius: var(--jui-numberctl-border-radius);
  background: var(--jui-numberctl-bg); color: var(--jui-numberctl-text);
  display: flex; flex-direction: row; align-items: center; gap: 0.75em;
}
input { flex: 1; min-width: 0; width: 100%; padding: 0; margin: 0; border: none; outline: none; background: inherit; color: inherit; font: inherit; font-size: 1em; }
input::placeholder { color: var(--jui-numberctl-text-light); }
.steppers { display: flex; flex-direction: row; align-items: center; }
.step {
  display: flex; align-items: center; justify-content: center; user-select: none; cursor: pointer; font-style: normal;
  width: var(--jui-numberctl-height); height: var(--jui-numberctl-height);
  border-left: 1px solid var(--jui-color-neutral10); background: var(--jui-numberctl-stepper-bg); color: var(--jui-ctl-action);
}
.step:hover, :host([state~="hover"]) .step:last-child { background-color: var(--jui-color-neutral10); }
:host(:focus-within) .inner, :host([state~="focus"]) .inner { border-color: var(--jui-ctl-focus); box-shadow: 0 0 0 2px var(--jui-ctl-focus-offset); }
:host([invalid]) .inner { border-color: var(--jui-ctl-err-focus); box-shadow: 0 0 0 1px var(--jui-ctl-err-focus-offset); }
:host([invalid]:focus-within) .inner, :host([invalid][state~="focus"]) .inner { box-shadow: 0 0 3px 1px var(--jui-ctl-err-focus-offset); }
:host([disabled]) .inner { background: var(--jui-ctl-bg-disabled); opacity: var(--jui-ctl-opacity-disabled); cursor: not-allowed; }
:host([disabled]) input { color: var(--jui-ctl-text-disabled); }
:host([read-only]) .inner { background: var(--jui-ctl-bg-readonly); opacity: var(--jui-ctl-opacity-readonly); cursor: not-allowed; }
:host([read-only]) input { color: var(--jui-ctl-text-readonly); }
:host([disabled]) .inner > *, :host([read-only]) .inner > * { pointer-events: none; }
:host([waiting]) .inner { animation: jui-waiting 1s infinite; border-color: transparent; background-color: var(--jui-ctl-bg-wait); box-shadow: none; }
:host([waiting]) .inner > * { visibility: hidden; }
@keyframes jui-waiting { from { background-color: var(--jui-role-surface-muted); } to { background-color: var(--jui-role-surface-raised); } }
```

## Example

```xml
<div layout="row" gap="4" wrap="" align="start">
  <jui-number-control placeholder="0"/>
  <jui-number-control value="12"/>
  <jui-number-control value="12" state="focus hover"/>
  <jui-number-control value="120" invalid=""/>
  <jui-number-control value="12" disabled=""/>
  <jui-number-control value="12" read-only=""/>
  <jui-number-control value="12" waiting=""/>
  <jui-control-field label="Hours per week" error="cannot be more than 60">
    <jui-number-control value="75" invalid=""/>
  </jui-control-field>
</div>
```
