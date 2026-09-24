---
name: jui-control-form-cell
version: 1.0.0
kind: composed
status: active
summary: ControlForm cell layout — one control in a form row with its label, help, guidance and error messages.
---

# ControlForm cell (layout)

## Purpose

Represents a **cell** of a JUI `ControlForm` row (`IControlCell`, configured through
`row.control(label, control, cell -> …)`): the label above a control — marked required, with optional help — the
control itself, the control's error messages when it is invalid, and optional guidance. This is where a control
in a form gets its label; controls never draw their own. Use it for every control in a `jui-control-form-row`.
Outside a form use `jui-control-field`, the equivalent fragment.

## Anatomy

- **Label** — small medium-weight text with a fixed minimum height, so labels line up across a row; semibold with
  a leading `*` when required; followed by a small `?` help icon that shows a dark bubble on hover.
- **Guidance above** — optional guidance between label and control.
- **Control** (default slot).
- **Error messages** — the control's messages in the error colour (the label turns the error colour too).
- **Guidance** — optional guidance in small muted type below.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The label (the `label` argument of `row.control(…)`; `null` for none). |
| required | variant | boolean | | Required marker: semibold with a leading `*` (JUI `cell.required()`). Presentation only. |
| help | content | text | | Help text shown in a bubble from a `?` beside the label (JUI `cell.help(…)`). |
| guidance | content | text | | Guidance text below the control (JUI `cell.guidance(…)`). |
| guidance-top | variant | boolean | | Shows the guidance between the label and the control instead. |
| error | content | text | | The control's validation message; puts the cell in the error state. Set `invalid` on the control too. |
| disabled | state | boolean | | The cell's control is disabled (JUI `cell.disable()`): muted, regular-weight label without the required marker. Set `disabled` on the control too. |
| right-align | variant | boolean | | Aligns the control to the right of a growing cell (JUI `cell.rightAlign()`). |

The cell's width is set with the mockup's `grow` attribute: `grow=""` is JUI's `cell.grow(1)`.

## Variants

| Property | Value | Use |
| --- | --- | --- |
| required | present | Fields that must be filled in; always pair with a validator. |
| guidance-top | present | Guidance that must be read before filling in the field. |
| right-align | present | A control that belongs at the right edge, such as a toggle in a settings row. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Validation | valid | Default | — |
| Validation | error | `error` property | Label in the error colour; the message beneath the control. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Label muted and regular weight; required marker hidden. |
| Help | help-closed | Default | Only the `?` icon. |
| Help | help-open | `:hover` on the `?`, or `state="help-open"` | The help bubble above the label. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | | jui-text-control, jui-selection-control, jui-text-area-control, jui-calendar-control, jui-check-control | Block; the control fills the cell | The cell's control, or a component (JUI `row.component(…)`). |

## Behaviour

The cell listens to its control: when the control is invalidated its messages appear here and the label turns
red; they clear when the control becomes valid. Hiding or disabling the control (JUI `hide`, `disable` by
reference) hides or mutes the whole cell. Hovering the help icon shows the bubble.

## Content rules

Label: a short noun phrase in sentence case, no colon. Guidance: one short sentence. Help: extra detail most
people don't need. Error: JUI validator style, lower case (`please enter your name`).

## Accessibility

The label is the control's label. Help is reachable by keyboard as well as hover. Error messages follow the
control in reading order.

## Rules of use

- One control per cell.
- Set `error` on the cell and `invalid` on its control together; likewise `disabled`.
- Omit the label for a check control, whose own label names it.

## Tokens

The cell reads the `--cpt-form-*` tokens set by `jui-control-form`, with JUI's values as fallbacks.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-form-text`, `--cpt-form-text-error`, `--cpt-form-text-disabled` | inherited | | Label colour: normal, in error, disabled; error messages. |
| `--cpt-form-label-size`, `--cpt-form-label-min-height`, `--cpt-form-label-margin-bottom` | inherited | | Label size, minimum height and spacing. |
| `--cpt-form-row-label-display` | inherited | | Set by `jui-control-form-row` (`no-labels`) to hide the label. |
| `--cpt-form-help-bg`, `--cpt-form-help`, `--cpt-form-help-radius`, `--cpt-form-help-bubble-width`, `--cpt-form-help-icon-size`, `--cpt-form-help-icon-opacity` | inherited | | Help bubble and icon. |
| `--cpt-form-footer-guidance`, `--cpt-form-footer-guidance-size` | inherited | | Guidance colour and size. |
| `--jui-space-2`, `--jui-space-3` | semantic | | Label, message and guidance spacing; bubble padding. |
| `--jui-comp-form-text`, `--jui-comp-form-text-error`, `--jui-comp-form-text-disabled`, `--jui-comp-form-help-surface`, `--jui-comp-form-help-text`, `--jui-comp-form-help-radius`, `--jui-comp-form-footer` | semantic | | Colour fallbacks. |
| `--jui-font-weight-medium`, `--jui-font-weight-semibold`, `--jui-font-weight-regular` | semantic | | Label weights. |

## Template

```html
<div class="cell">
  <label class="label"><span class="text">{{label}}</span><span class="help" data-if="help"><jui-icon name="circle-help"></jui-icon><span class="bubble">{{help}}</span></span></label>
  <div class="guidance top" data-if="guidance-top">{{guidance}}</div>
  <div class="control"><slot></slot></div>
  <ul class="error" data-if="error"><li>{{error}}</li></ul>
  <div class="guidance bottom" data-if="guidance">{{guidance}}</div>
</div>
```

## Style

```css
:host { display: block; }
.cell { display: flex; flex-direction: column; }
.label {
  display: var(--cpt-form-row-label-display, block); position: relative;
  min-height: var(--cpt-form-label-min-height, 1.35em); margin-bottom: var(--cpt-form-label-margin-bottom, var(--jui-space-2));
  color: var(--cpt-form-text, var(--jui-comp-form-text)); font-size: var(--cpt-form-label-size, 0.95em); font-weight: var(--jui-font-weight-medium);
}
:host([required]) .label { font-weight: var(--jui-font-weight-semibold); }
:host([required]) .text::before { content: '*'; padding: 2px; }
:host([error]) .label { color: var(--cpt-form-text-error, var(--jui-comp-form-text-error)); }
:host([disabled]) .label { color: var(--cpt-form-text-disabled, var(--jui-comp-form-text-disabled)); font-weight: var(--jui-font-weight-regular); }
:host([disabled]) .text::before { display: none; }
.control { position: relative; display: flex; flex-direction: column; }
:host([right-align]) .control { align-items: flex-end; }
.error { list-style: none; margin: var(--jui-space-2) 0 0 0; padding: 0; color: var(--cpt-form-text-error, var(--jui-comp-form-text-error)); }
.guidance { color: var(--cpt-form-footer-guidance, var(--jui-comp-form-footer)); font-size: var(--cpt-form-footer-guidance-size, 0.9em); }
.guidance.bottom { margin-top: var(--jui-space-2); }
.guidance.top { margin-top: calc(-1 * var(--jui-space-2)); margin-bottom: var(--jui-space-2); }
:host([guidance-top]) .guidance.bottom { display: none; }
/* Help icon and bubble. */
.help { position: relative; display: inline; cursor: help; }
.help jui-icon { position: relative; left: 0.5em; top: -0.25em; font-size: var(--cpt-form-help-icon-size, 0.8em); opacity: var(--cpt-form-help-icon-opacity, 0.75); }
.bubble {
  display: none; position: absolute; bottom: 25px; left: -7em; z-index: 5; margin: 0; padding: var(--jui-space-3);
  width: var(--cpt-form-help-bubble-width, 15em); font-size: 0.85em; font-weight: var(--jui-font-weight-medium);
  color: var(--cpt-form-help, var(--jui-comp-form-help-text)); background: var(--cpt-form-help-bg, var(--jui-comp-form-help-surface));
  border-radius: var(--cpt-form-help-radius, var(--jui-comp-form-help-radius));
}
.bubble::before {
  content: ' '; position: absolute; bottom: -6px; left: 50%; margin-left: -9px; width: 0; height: 0;
  border-left: 7px solid transparent; border-right: 7px solid transparent; border-top: 7px solid var(--cpt-form-help-bg, var(--jui-comp-form-help-surface));
}
.help:hover .bubble, :host([state~="help-open"]) .bubble { display: block; }
```

## Example

```xml
<jui-control-form>
  <jui-control-form-row>
    <jui-control-form-cell label="First name" required="" grow=""><jui-text-control value="Jill"/></jui-control-form-cell>
    <jui-control-form-cell label="Middle name" grow="" guidance="This is some guidance"><jui-text-control/></jui-control-form-cell>
    <jui-control-form-cell label="Last name" required="" grow="" help="As it appears on your passport."><jui-text-control/></jui-control-form-cell>
  </jui-control-form-row>
  <jui-control-form-row>
    <jui-control-form-cell label="Email" required="" grow="" error="please enter a valid email address"><jui-text-control value="jill@" invalid=""/></jui-control-form-cell>
    <jui-control-form-cell label="Title" required="" disabled=""><jui-selection-control value="Dr" disabled=""/></jui-control-form-cell>
    <jui-control-form-cell label="Start date" guidance-top="" guidance="Leave blank to start today." help="The first day the person can sign in." state="help-open"><jui-calendar-control/></jui-control-form-cell>
  </jui-control-form-row>
  <jui-control-form-row>
    <jui-control-form-cell grow="" right-align=""><jui-check-control label="Send me updates" toggle="" checked=""/></jui-control-form-cell>
  </jui-control-form-row>
</jui-control-form>
```
