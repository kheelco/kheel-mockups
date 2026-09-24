---
name: jui-control-field
version: 1.0.0
kind: elemental
status: active
summary: ControlField fragment — wraps a control with its label, description and validation messages.
---

# ControlField (fragment)

## Purpose

Represents JUI's **ControlField** fragment: a label (with an optional description under it) above a control, and
the control's validation messages below it. Use it to lay out a labelled control outside a `ControlForm` — in a
component's own rendering, a filter panel, a settings row. Inside a `ControlForm` use `jui-control-form-cell`
instead, which is the form's own label/guidance/error cell. Being a fragment it has no events of its own: it
listens to its control's invalidation and everything else is handled by the enclosing component (**Fragment
events**).

## Anatomy

- **Label block** — the label (medium weight; semibold with a leading `* ` when required) and, beneath it, an
  optional description in a muted, slightly smaller type.
- **Control** — the control placed in the fragment (default slot).
- **Messages** — the control's error messages, one per line in the error colour, shown only while the control is
  invalid.

In the side-by-side variant the three parts sit in a row: the label block in a fixed 12em column, the control,
and (as in JUI, where the messages list is the row's third child) the messages to the right of the control.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The field label (JUI `label`). Omit for no label block. |
| description | content | text | | Supporting text under the label (JUI `description`). |
| required | variant | boolean | | Marks the label as required: semibold with a `* ` prefix (JUI `required()`). Presentation only. |
| error | content | text | | The validation message(s) shown below the control; puts the field in the error state. Set `invalid` on the control too. |
| variant | variant | stacked, side-by-side | stacked | Label above the control, or in a 12em column beside it (JUI `Variant.SIDE_BY_SIDE`). |
| invert-required | variant | boolean | | Puts the required marker after the label (` *`) instead of before (JUI `Variant.INVERT_REQUIRED`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | stacked | The default: label and description above the control. |
| variant | side-by-side | Settings-style rows where labels line up in a column to the left. |
| invert-required | present | House styles that put the asterisk after the label. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Validation | valid | Default | No messages shown. |
| Validation | error | `error` property | Messages shown below the control in the error colour. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | | jui-text-control, jui-text-area-control, jui-selection-control, jui-calendar-control, jui-check-control | Block; the control fills the width | The control (occasionally several controls acting as one). |

## Behaviour

The fragment registers with the control placed in it and shows the control's invalidation messages as they
arrive, clearing them when the control becomes valid again (**Fragment events**). It never validates on its own
and adds no behaviour to the control.

## Content rules

Label: a short noun phrase in sentence case, no trailing colon (`Email address`). Description: one sentence of
help that is needed to fill in the field. Error: what is wrong and how to fix it, in lower case as JUI validators
phrase them (`please enter your name`).

## Accessibility

The label is a `label` element for the control. Error messages follow the control in reading order. Required
fields must also be validated; the marker is only visual.

## Rules of use

- One control per field; group several related controls with a `jui-control-form-row` in a form instead.
- Set `error` here and `invalid` on the control together — the fragment shows the message, the control shows the
  red border.
- Prefer `jui-control-form-cell` inside a `jui-control-form`; mixing both inside one form gives two styles of
  label.

## Tokens

The tokens the style uses: its own component tokens (JUI's `--jui-frag-controlfield-*` layer) and semantic tokens
from `tokens.md`.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-frag-controlfield-label-top` | component | `0` | Offset of the label block; `8px` side-by-side so it lines up with the control. |
| `--jui-frag-controlfield-label-width` | component | `auto` | Width of the label block; `12em` side-by-side. |
| `--jui-frag-controlfield-label-gap` | component | `0.5em` | Space between the label block and the control. |
| `--jui-frag-controlfield-label-weight` | component | `500` | Label weight. |
| `--jui-frag-controlfield-description-gap` | component | `0.25em` | Space between label and description. |
| `--jui-frag-controlfield-description-color` | component | `#888` | Description colour (JUI's own value). |
| `--jui-frag-controlfield-description-size` | component | `0.95em` | Description size. |
| `--jui-frag-controlfield-description-weight` | component | `400` | Description weight. |
| `--jui-frag-controlfield-error-size` | component | `1em` | Message size. |
| `--jui-frag-controlfield-error-color` | component | `--jui-ctl-err-focus` | Message colour. |
| `--jui-frag-controlfield-error-margin` | component | `0.75em` | Space above the messages. |
| `--jui-frag-controlfield-required-weight` | component | `600` | Label weight when required. |
| `--jui-frag-controlfield-required-symbol-before` | component | `'* '` | Marker before a required label; empty when inverted. |
| `--jui-frag-controlfield-required-symbol-after` | component | `''` | Marker after a required label; `' *'` when inverted. |
| `--jui-ctl-err-focus` | semantic | | Error colour. |

## Template

```html
<div class="field">
  <div class="label" data-if="label">
    <label>{{label}}</label>
    <div class="description" data-if="description">{{description}}</div>
  </div>
  <div class="main"><slot></slot></div>
  <ul class="messages" data-if="error"><li>{{error}}</li></ul>
</div>
```

## Style

```css
:host {
  display: block;
  --jui-frag-controlfield-label-top: 0;
  --jui-frag-controlfield-label-width: auto;
  --jui-frag-controlfield-label-gap: 0.5em;
  --jui-frag-controlfield-label-weight: 500;
  --jui-frag-controlfield-description-gap: 0.25em;
  --jui-frag-controlfield-description-color: #888;
  --jui-frag-controlfield-description-size: 0.95em;
  --jui-frag-controlfield-description-weight: 400;
  --jui-frag-controlfield-error-size: 1em;
  --jui-frag-controlfield-error-color: var(--jui-ctl-err-focus);
  --jui-frag-controlfield-error-margin: 0.75em;
  --jui-frag-controlfield-required-weight: 600;
  --jui-frag-controlfield-required-symbol-before: '* ';
  --jui-frag-controlfield-required-symbol-after: '';
}
:host([variant="side-by-side"]) { --jui-frag-controlfield-label-width: 12em; --jui-frag-controlfield-label-top: 8px; }
:host([invert-required]) { --jui-frag-controlfield-required-symbol-before: ''; --jui-frag-controlfield-required-symbol-after: ' *'; }
:host([variant="side-by-side"]) .field { display: flex; flex-direction: row; align-items: start; gap: 2em; }
:host([variant="side-by-side"]) .main { flex: 1; min-width: 0; }
.label {
  margin-top: var(--jui-frag-controlfield-label-top); margin-bottom: var(--jui-frag-controlfield-label-gap);
  width: var(--jui-frag-controlfield-label-width); flex-shrink: 0;
}
label { display: inline-block; font-weight: var(--jui-frag-controlfield-label-weight); }
:host([required]) label { font-weight: var(--jui-frag-controlfield-required-weight); }
:host([required]) label::before { content: var(--jui-frag-controlfield-required-symbol-before); }
:host([required]) label::after { content: var(--jui-frag-controlfield-required-symbol-after); }
.description {
  font-size: var(--jui-frag-controlfield-description-size); font-weight: var(--jui-frag-controlfield-description-weight);
  color: var(--jui-frag-controlfield-description-color); margin-top: var(--jui-frag-controlfield-description-gap);
}
.messages {
  list-style: none; margin: var(--jui-frag-controlfield-error-margin) 0 0 0; padding: 0;
  color: var(--jui-frag-controlfield-error-color); font-size: var(--jui-frag-controlfield-error-size);
}
:host([variant="side-by-side"]) .messages { margin-top: var(--jui-frag-controlfield-label-top); }
```

## Example

```xml
<div layout="column" gap="6">
  <div layout="grid" cols="2" gap="6">
    <jui-control-field label="Display name" description="Shown to others in the organisation.">
      <jui-text-control placeholder="Enter a display name"/>
    </jui-control-field>
    <jui-control-field label="Email address" required="">
      <jui-text-control value="jill@" invalid="" state="focus"/>
      <specification>Validated when the form is submitted.</specification>
    </jui-control-field>
    <jui-control-field label="Email address" required="" error="please enter a valid email address">
      <jui-text-control value="jill@" invalid=""/>
    </jui-control-field>
    <jui-control-field label="Role" required="" invert-required="">
      <jui-selection-control placeholder="Select a role"/>
    </jui-control-field>
  </div>
  <jui-control-field label="Time zone" description="Used for all dates and reminders." variant="side-by-side">
    <jui-selection-control value="Australia/Sydney"/>
  </jui-control-field>
</div>
```
