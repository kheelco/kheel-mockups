---
name: jui-multi-check-control
version: 1.0.0
kind: elemental
status: active
summary: MultiCheckControl control — a compact pill of options, any of which can be switched on, yielding a set of values.
---

# MultiCheckControl (control)

## Purpose

Represents JUI's **MultiCheckControl**: a set of options drawn as one rounded pill of segments, each switched on
or off independently, so the value is the set of options switched on (`List<V>`). It is a compact alternative to a
list of checkboxes for short, related options — days of the week, channels, sizes. Use a checkbox
`jui-selection-group-control` when options need descriptions or are long, `jui-multi-selection-control` when
there are many, and `jui-check-control` for a single on/off choice. As a control it takes its field label from
the enclosing `jui-control-form-cell` or `jui-control-field`; it may also carry a short inline label of its own.

## Anatomy

An item (JUI `.item`) with an optional inline label, a spacer and the toggle pill (JUI `div.toggle`): a rounded
grey track holding one segment per option (default slot). Segments that are on are filled in the active colour
with semibold white text.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | Optional inline label before the pill (JUI `label`). |
| bold | variant | boolean | | Semibold inline label (JUI `bold`). |
| reverse | variant | boolean | | Pill first, label after it (JUI `reverse`). |
| expand | variant | boolean | | The spacer grows so label and pill sit at opposite edges (JUI `expand`). |
| disabled | state | boolean | | Disabled (JUI `disable()`). |
| read-only | state | boolean | | Read-only (JUI `readOnly`). |
| invalid | state | boolean | | Failed validation, such as none selected when one is required. |
| waiting | state | boolean | | Waiting for its value: contents hidden. |

## Variants

The mockup shows JUI's standard style. JUI also has `PANEL`, `SEGMENTED` and `INLINE` variants that retune the
`--jui-multicheckctl-*` tokens (for example a card-like lift on the selected segment); set those tokens to mock
them.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Grey pill; options off in white text. |
| Interaction | hover | `:hover` on a segment | The segment fills in the active colour. |
| Interaction | focus | `:focus-within` | Focus-coloured border and soft ring around the pill. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Sunken surface at half opacity; not-allowed cursor. |
| Availability | read-only | `read-only` property | Read-only surface at half opacity; not-allowed cursor. |
| Validation | valid | Default | — |
| Validation | invalid | `invalid` property | Error ring around the pill. |
| Activity | idle | Default | — |
| Activity | waiting | `waiting` property | Contents hidden; the control pulses. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | text | | Segments side by side in the pill | One plain element (`span`) per option. Mark options that are on with `data-selected=""`. |

## Behaviour

Clicking a segment switches that option on or off and reports the new set (**Control values**). Any number of
options may be on, including none.

## Content rules

Option labels are one short word or abbreviation (`Mon`, `Email`, `S`, `M`, `L`). Keep to about seven options.

## Accessibility

Each segment is a checkbox (JUI hides the input under the label) and is announced with its label and state;
Space toggles the focused one.

## Rules of use

- For one-of-several choices this is the wrong control: use a radio `jui-selection-group-control`.
- Don't use it for long labels; the pill doesn't wrap.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-multicheckctl-size` | component | `0.85em` | Segment text size. |
| `--jui-multicheckctl-border-radius` | component | `20px` | Pill radius. |
| `--jui-multicheckctl-border-width` | component | `0` | Pill border width. |
| `--jui-multicheckctl-border-color` | component | `transparent` | Pill border colour. |
| `--jui-multicheckctl-border-color-hover` | component | `--jui-multicheckctl-border-color` | Pill border on hover. |
| `--jui-multicheckctl-bg` | component | `--jui-color-neutral30` | Pill track (JUI `#ccc`). |
| `--jui-multicheckctl-bg-hover` | component | `--jui-multicheckctl-bg` | Pill track on hover. |
| `--jui-multicheckctl-padding` | component | `2px` | Space between track and segments. |
| `--jui-multicheckctl-item-weight` | component | `500` | Segment weight. |
| `--jui-multicheckctl-item-text` | component | `--jui-color-aux-white` | Segment text (JUI `#fff`). |
| `--jui-multicheckctl-item-padding-tb` | component | `1px` | Segment vertical padding. |
| `--jui-multicheckctl-item-padding-lr` | component | `8px` | Segment horizontal padding. |
| `--jui-multicheckctl-item-border-radius` | component | `--jui-multicheckctl-border-radius` | Segment radius. |
| `--jui-multicheckctl-item-hover-bg` | component | `--jui-ctl-active` | Segment on hover. |
| `--jui-multicheckctl-item-selected-weight` | component | `600` | Selected segment weight. |
| `--jui-multicheckctl-item-selected-bg` | component | `--jui-ctl-active` | Selected segment fill. |
| `--jui-multicheckctl-item-selected-text` | component | `--jui-color-aux-white` | Selected segment text. |
| `--jui-multicheckctl-item-selected-shadow` | component | `none` | Lift on the selected segment. |
| `--jui-multicheckctl-label-weight` | component | `500` | Inline label weight. |
| `--jui-multicheckctl-label-weight-bold` | component | `600` | Bold inline label weight. |
| `--jui-color-neutral30`, `--jui-color-aux-white`, `--jui-ctl-active`, `--jui-ctl-text` | semantic | | Defaults above; label colour. |
| `--jui-ctl-focus`, `--jui-ctl-focus-offset`, `--jui-ctl-err-focus-offset` | semantic | | Focus and invalid rings. |
| `--jui-ctl-bg-disabled`, `--jui-ctl-opacity-disabled`, `--jui-ctl-bg-readonly`, `--jui-ctl-opacity-readonly` | semantic | | Disabled and read-only looks. |
| `--jui-ctl-bg-wait`, `--jui-role-surface-muted`, `--jui-role-surface-raised` | semantic | | Waiting surface and its pulse. |

## Template

```html
<div class="inner">
  <div class="item">
    <span class="label" data-if="label">{{label}}</span>
    <span class="spacer" data-if="label"></span>
    <div class="toggle" tabindex="0"><slot></slot></div>
  </div>
</div>
```

## Style

```css
:host {
  display: block;
  --jui-multicheckctl-size: 0.85em;
  --jui-multicheckctl-border-radius: 20px;
  --jui-multicheckctl-border-width: 0;
  --jui-multicheckctl-border-color: transparent;
  --jui-multicheckctl-border-color-hover: var(--jui-multicheckctl-border-color);
  --jui-multicheckctl-bg: var(--jui-color-neutral30);
  --jui-multicheckctl-bg-hover: var(--jui-multicheckctl-bg);
  --jui-multicheckctl-padding: 2px;
  --jui-multicheckctl-item-weight: 500;
  --jui-multicheckctl-item-text: var(--jui-color-aux-white);
  --jui-multicheckctl-item-padding-tb: 1px;
  --jui-multicheckctl-item-padding-lr: 8px;
  --jui-multicheckctl-item-border-radius: var(--jui-multicheckctl-border-radius);
  --jui-multicheckctl-item-hover-bg: var(--jui-ctl-active);
  --jui-multicheckctl-item-selected-weight: 600;
  --jui-multicheckctl-item-selected-bg: var(--jui-ctl-active);
  --jui-multicheckctl-item-selected-text: var(--jui-color-aux-white);
  --jui-multicheckctl-item-selected-shadow: none;
  --jui-multicheckctl-label-weight: 500;
  --jui-multicheckctl-label-weight-bold: 600;
}
.inner { margin: 2px 0; display: flex; flex-direction: column; gap: 0.75em; color: var(--jui-ctl-text); border-radius: var(--jui-multicheckctl-border-radius); }
.item { display: flex; flex-direction: row; align-items: center; }
:host([reverse]) .item { flex-direction: row-reverse; }
.label { user-select: none; white-space: nowrap; font-weight: var(--jui-multicheckctl-label-weight); }
:host([bold]) .label { font-weight: var(--jui-multicheckctl-label-weight-bold); }
.spacer { display: inline-block; width: 1em; }
:host([expand]) .spacer { flex-grow: 1; }
.toggle {
  display: flex; align-items: center; outline: none;
  border: var(--jui-multicheckctl-border-width) solid var(--jui-multicheckctl-border-color); border-radius: var(--jui-multicheckctl-border-radius);
  background: var(--jui-multicheckctl-bg); padding: var(--jui-multicheckctl-padding);
}
:host(:hover) .toggle, :host([state~="hover"]) .toggle { border-color: var(--jui-multicheckctl-border-color-hover); background: var(--jui-multicheckctl-bg-hover); }
::slotted(*) {
  display: block; flex: 1; text-align: center; cursor: pointer; user-select: none; white-space: nowrap;
  padding: var(--jui-multicheckctl-item-padding-tb) var(--jui-multicheckctl-item-padding-lr); border-radius: var(--jui-multicheckctl-item-border-radius);
  font-size: var(--jui-multicheckctl-size); font-weight: var(--jui-multicheckctl-item-weight); color: var(--jui-multicheckctl-item-text);
}
::slotted(:hover) { background: var(--jui-multicheckctl-item-hover-bg); }
::slotted([data-selected]) {
  background: var(--jui-multicheckctl-item-selected-bg); box-shadow: var(--jui-multicheckctl-item-selected-shadow);
  font-weight: var(--jui-multicheckctl-item-selected-weight); color: var(--jui-multicheckctl-item-selected-text);
}
:host(:focus-within) .toggle, :host([state~="focus"]) .toggle { border-color: var(--jui-ctl-focus); box-shadow: 0 0 0 2px var(--jui-ctl-focus-offset); }
:host([invalid]) .toggle { box-shadow: 0 0 3px 2px var(--jui-ctl-err-focus-offset); }
:host([disabled]) .inner { background: var(--jui-ctl-bg-disabled); opacity: var(--jui-ctl-opacity-disabled); cursor: not-allowed; }
:host([read-only]) .inner { background: var(--jui-ctl-bg-readonly); opacity: var(--jui-ctl-opacity-readonly); cursor: not-allowed; }
:host([disabled]) .item, :host([read-only]) .item { pointer-events: none; }
:host([waiting]) .inner { animation: jui-waiting 1s infinite; background-color: var(--jui-ctl-bg-wait); }
:host([waiting]) .item { visibility: hidden; }
@keyframes jui-waiting { from { background-color: var(--jui-role-surface-muted); } to { background-color: var(--jui-role-surface-raised); } }
```

## Example

```xml
<div layout="column" gap="4">
  <div layout="row" gap="6" wrap="" align="center">
    <jui-multi-check-control>
      <span data-selected="">Mon</span><span>Tue</span><span data-selected="">Wed</span><span>Thu</span><span data-selected="">Fri</span>
    </jui-multi-check-control>
    <jui-multi-check-control label="Notify by" bold="">
      <span data-selected="">Email</span><span>SMS</span><span>Push</span>
    </jui-multi-check-control>
    <jui-multi-check-control state="focus">
      <span>S</span><span data-selected="">M</span><span>L</span>
    </jui-multi-check-control>
  </div>
  <div layout="row" gap="6" wrap="" align="center">
    <jui-multi-check-control invalid="">
      <span>Email</span><span>SMS</span><span>Push</span>
    </jui-multi-check-control>
    <jui-multi-check-control disabled="">
      <span data-selected="">Email</span><span>SMS</span><span>Push</span>
    </jui-multi-check-control>
    <jui-multi-check-control read-only="">
      <span data-selected="">Email</span><span>SMS</span><span>Push</span>
    </jui-multi-check-control>
  </div>
  <jui-control-field label="Working days" description="The days reminders may be sent.">
    <jui-multi-check-control>
      <span data-selected="">Mon</span><span data-selected="">Tue</span><span data-selected="">Wed</span><span data-selected="">Thu</span><span>Fri</span>
    </jui-multi-check-control>
  </jui-control-field>
</div>
```
