---
name: ui-text-field
version: 1.0.0
kind: composed
status: active
summary: A labelled single-line text input with helper and error messages.
---

# Text field

## Purpose

Lets the user enter or edit a short piece of text: a name, an email address, a search term. Use a select when the
answer is one of a known set.

## Anatomy

A visible label, an input box with an optional leading icon, and a message region beneath that holds either
helper text or, when invalid, the error message.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The field's label. Omit only for a search box whose purpose is obvious, and give `placeholder`. |
| value | content | text | | The current value. Its presence puts the field in the filled state. |
| placeholder | content | text | | Hint shown while empty. |
| helper | content | text | | Guidance beneath the field. |
| error | state | text | | Error message. Its presence puts the field in the invalid state and replaces the helper. |
| icon | content | icon | | Optional leading icon, such as `search`. |
| type | variant | text, email, password, number, search | text | Kind of input. |
| required | content | boolean | | Marks the field as required. |
| disabled | state | boolean | | Puts the field in the disabled state. |
| readonly | state | boolean | | Puts the field in the read-only state. |

## Variants

`type` changes the keyboard and validation of the input, not its look.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | resting | Default | Border in `--color-border-strong`. |
| Interaction | hover | `:hover` | Border darkens. |
| Interaction | focus | `:focus-within` | Border and 3 px ring in the action colour. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Sunken background, muted text; not interactive. |
| Availability | read-only | `readonly` property | No border, value shown as text; still focusable. |
| Content | empty | No `value` | Placeholder shown. |
| Content | filled | `value` present | Value shown. |
| Validation | neutral | Default | — |
| Validation | invalid | `error` property | Danger border; error message with icon replaces helper. |

## Behaviour

Follows the shared **Field validation** behaviour: the error shows beneath the field after the user leaves it or
submits, and clears as soon as the value becomes valid.

## Content rules

Labels are nouns in sentence case ("Email address"). Helper text says what is expected, not what the label
already says. Error messages say what to do: "Enter an email address like name@example.com".

## Accessibility

The label is programmatically associated with the input, and the message region is its description. Required is
shown in text, not by colour or asterisk alone.

## Rules of use

- Don't use placeholder text as the label; it disappears on typing.
- Don't show an error before the user has had a chance to answer.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--color-surface`, `--color-border-strong`, `--color-text`, `--color-text-subtle` | semantic |  | Input background, border, value and placeholder/icon colour at rest. |
| `--color-action`, `--color-action-subtle` | semantic |  | Border and ring when focused. |
| `--color-danger`, `--color-danger-subtle` | semantic |  | Border, ring and message when invalid. |
| `--color-surface-sunken`, `--color-text-disabled` | semantic |  | Background and text when disabled. |
| `--color-text-muted` | semantic |  | Helper text. |
| `--control-height-md` | semantic |  | Input height. |
| `--radius-md` | semantic |  | Input corners. |
| `--font-body`, `--text-md`, `--text-sm`, `--weight-medium`, `--weight-regular`, `--leading-tight` | semantic |  | Value, label and message type. |
| `--space-1`, `--space-2`, `--space-3` | semantic |  | Gaps and horizontal padding. |
| `--duration-fast` | semantic |  | Focus transition. |

## Template

```html
<label class="field">
  <span class="label" data-if="label">{{label}}<span class="req" data-if="required"> (required)</span></span>
  <span class="control">
    <ui-icon data-if="icon" name="{{icon}}" size="small"></ui-icon>
    <input type="{{type}}" value="{{value}}" placeholder="{{placeholder}}">
  </span>
  <span class="message error" data-if="error"><ui-icon name="circle-alert" size="small"></ui-icon>{{error}}</span>
  <span class="message" data-if="!error"><span data-if="helper">{{helper}}</span></span>
</label>
```

## Style

```css
:host { display: block; min-width: 12rem; }
.field { display: flex; flex-direction: column; gap: var(--space-1); font-family: var(--font-body); }
.label { font: var(--weight-medium) var(--text-sm) / var(--leading-tight) var(--font-body); color: var(--color-text); }
.req { color: var(--color-text-subtle); font-weight: var(--weight-regular); }
.control {
  display: flex; align-items: center; gap: var(--space-2);
  height: var(--control-height-md, 36px); padding: 0 var(--space-3);
  border: 1px solid var(--color-border-strong); border-radius: var(--radius-md); background: var(--color-surface);
  color: var(--color-text-subtle);
  transition: border-color var(--duration-fast), box-shadow var(--duration-fast);
}
.control:hover, :host([state~="hover"]) .control { border-color: var(--color-text-subtle); }
.control:focus-within, :host([state~="focus"]) .control { border-color: var(--color-action); box-shadow: 0 0 0 3px var(--color-action-subtle); }
input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; font: var(--text-md) var(--font-body); color: var(--color-text); padding: 0; }
input::placeholder { color: var(--color-text-subtle); }
.message { font-size: var(--text-sm); color: var(--color-text-muted); display: flex; gap: var(--space-1); align-items: center; }
.message:empty { display: none; }
:host([error]) .control { border-color: var(--color-danger); }
:host([error]) .control:focus-within { box-shadow: 0 0 0 3px var(--color-danger-subtle); }
.error { color: var(--color-danger); }
:host([disabled]) .control { background: var(--color-surface-sunken); pointer-events: none; }
:host([disabled]) input, :host([disabled]) .label { color: var(--color-text-disabled); }
:host([readonly]) .control { border-color: transparent; background: transparent; padding-left: 0; }
```

## Example

```xml
<div layout="grid" cols="2" gap="4">
  <ui-text-field label="Customer name" placeholder="e.g. Aroha Ngata" helper="As it appears on invoices."/>
  <ui-text-field label="Email" value="aroha@example" error="Enter an email address like name@example.com" state="focus"/>
  <ui-text-field icon="search" placeholder="Search jobs" type="search"/>
  <ui-text-field label="Reference" value="JOB-1042" readonly=""/>
  <ui-text-field label="Account code" value="4100" disabled=""/>
  <ui-text-field label="Site address" required="" state="hover"/>
</div>
```
