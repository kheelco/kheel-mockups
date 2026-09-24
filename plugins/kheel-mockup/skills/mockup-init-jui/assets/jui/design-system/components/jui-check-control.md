---
name: jui-check-control
version: 1.0.0
kind: composed
status: active
summary: CheckControl control — a single checkbox (or toggle slider) with its own label and description, holding a boolean.
---

# CheckControl (control)

## Purpose

Represents JUI's **CheckControl**: one on/off choice (value type `Boolean`), drawn as a checkbox or, in its
toggle variant, as a slider switch. Unlike other controls it carries its own option label (and an optional
description) beside the box, because that text *is* the choice — `I agree to the terms`, `Send me updates`. In a
form it usually sits in a cell with no label. Use a checkbox `jui-selection-group-control` for several
independent options shown together, and `jui-multi-check-control` for a compact segmented set.

## Anatomy

An item (JUI `.item`) holding the checkbox — or the toggle track and thumb — then a spacer and the label, with
the description beneath the label in regular weight. Reversed, the label comes first; expanded, the spacer grows
so the box sits at the far edge.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The option label beside the box (JUI `label`). |
| description | content | text | | Supporting text beneath the label (JUI `description`). |
| checked | content | boolean | | The value: ticked or switched on (**Control values**). |
| toggle | variant | boolean | | Draws a slider switch instead of a checkbox (JUI toggle/slider variant). |
| reverse | variant | boolean | | Label first, box after it (JUI `reverse`). |
| expand | variant | boolean | | The spacer grows so label and box sit at opposite edges (JUI `expand`). |
| bold | variant | boolean | | Semibold label (JUI `bold`). |
| disabled | state | boolean | | Disabled (JUI `disable()`). |
| read-only | state | boolean | | Read-only (JUI `readOnly`). |
| invalid | state | boolean | | Failed validation (for example a required acknowledgement). |
| waiting | state | boolean | | Waiting for its value: pulsing blank item. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| toggle | absent | A checkbox: choices submitted with a form. |
| toggle | present | A slider switch: settings that read as on/off, often applied immediately. |
| reverse, expand | present | Settings lists: label on the left, switch aligned on the right. |
| bold | present | When the label is a heading for its description. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | — |
| Interaction | hover | `:hover` | Pointer cursor over box and label. |
| Interaction | focus | `:focus-within` | A soft focus ring around the box (or track), and faintly around the control. |
| Value | unchecked | Default | Empty box; toggle track grey with the thumb on the left. |
| Value | checked | `checked` property | Box filled in the active colour with a tick; toggle track in the active colour with the thumb on the right. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Label in the disabled colour at half opacity; box dimmed; not-allowed cursor. |
| Availability | read-only | `read-only` property | Whole control at half opacity on the read-only surface; not-allowed cursor. |
| Validation | valid | Default | — |
| Validation | invalid | `invalid` property | Error-coloured box border and a thin error ring around the control. |
| Activity | idle | Default | — |
| Activity | waiting | `waiting` property | Contents hidden; the item pulses. |

## Behaviour

Clicking the box or the label flips the value and reports it (**Control values**). A check control often drives
other parts of a form — showing or hiding a group, enabling a field (JUI `show`, `hide`, `enable`, `disable` on
the form's modification context).

## Content rules

Write the label as the statement that is true when ticked (`Send me product updates`), not as a question.
Descriptions add one sentence of consequence.

## Accessibility

A real checkbox (JUI `input type=checkbox`), labelled by its own label; the toggle is the same input visually
hidden under the track. Space toggles it.

## Rules of use

- In a form, put it in a `jui-control-form-cell` without a label — its own label says what it is.
- Use the toggle for settings, the checkbox for choices submitted with a form; don't mix them in one list.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-checkctl-text` | component | `--jui-comp-control-text` | Label colour. |
| `--cpt-checkctl-description` | component | `--jui-comp-control-text` | Description colour. |
| `--cpt-checkctl-labelgap` | component | `--jui-space-3` | Gap between box and label. |
| `--cpt-checkctl-size` | component | `--jui-font-size-md` | Control text size (the box is `1em`). |
| `--cpt-checkctl-toggle-track` | component | `--jui-comp-control-surface-offset` | Toggle track when off. |
| `--cpt-checkctl-toggle-track-active` | component | `--jui-comp-control-active` | Toggle track when on; checked box fill. |
| `--cpt-checkctl-toggle-thumb` | component | `--jui-comp-control-surface` | Toggle thumb. |
| `--frag-icon-size` | component | `0.75em` | Size of the tick (`jui-icon`) inside a checked box. |
| `--jui-comp-control-text`, `--jui-comp-control-surface-offset`, `--jui-comp-control-active`, `--jui-comp-control-surface`, `--jui-space-3`, `--jui-font-size-md` | semantic | | The defaults above. |
| `--jui-font-weight-medium`, `--jui-font-weight-semibold`, `--jui-font-weight-regular` | semantic | | Label, bold label and description weights. |
| `--jui-role-border-strong`, `--jui-color-aux-white`, `--jui-ctl-action` | semantic | | Checkbox border and surface; thumb shadow. |
| `--jui-ctl-focus-offset`, `--jui-ctl-err-focus`, `--jui-ctl-err-focus-offset` | semantic | | Focus ring; invalid border and ring. |
| `--jui-ctl-text-disabled`, `--jui-ctl-opacity-disabled`, `--jui-ctl-bg-disabled`, `--jui-ctl-bg-readonly`, `--jui-ctl-opacity-readonly` | semantic | | Disabled and read-only looks. |
| `--jui-ctl-bg-wait`, `--jui-role-surface-muted`, `--jui-role-surface-raised` | semantic | | Waiting surface and its pulse. |

## Template

```html
<div class="inner">
  <div class="item">
    <span class="box" data-if="!toggle"><jui-icon data-if="checked" name="check"></jui-icon></span>
    <span class="toggle" data-if="toggle"></span>
    <span class="spacer"></span>
    <span class="text">
      <label>{{label}}<span class="description" data-if="description">{{description}}</span></label>
    </span>
  </div>
</div>
```

## Style

```css
:host {
  display: block;
  --cpt-checkctl-text: var(--jui-comp-control-text);
  --cpt-checkctl-description: var(--jui-comp-control-text);
  --cpt-checkctl-labelgap: var(--jui-space-3);
  --cpt-checkctl-size: var(--jui-font-size-md);
  --cpt-checkctl-toggle-track: var(--jui-comp-control-surface-offset);
  --cpt-checkctl-toggle-track-active: var(--jui-comp-control-active);
  --cpt-checkctl-toggle-thumb: var(--jui-comp-control-surface);
}
.inner { margin: 2px 0; font-size: var(--cpt-checkctl-size); color: var(--cpt-checkctl-text); display: flex; flex-direction: column; gap: var(--cpt-checkctl-labelgap); border-radius: 2px; }
.item { display: flex; flex-direction: row; align-items: flex-start; cursor: pointer; }
:host([reverse]) .item { flex-direction: row-reverse; }
.spacer { display: inline-block; width: var(--cpt-checkctl-labelgap); flex: none; }
:host([expand]) .spacer { flex-grow: 1; }
label { display: flex; flex-direction: column; user-select: none; cursor: pointer; font-weight: var(--jui-font-weight-medium); line-height: 1.25; }
:host([bold]) label { font-weight: var(--jui-font-weight-semibold); }
.description { font-weight: var(--jui-font-weight-regular); font-size: 0.95em; color: var(--cpt-checkctl-description); }
.box {
  flex: none; width: 1em; height: 1em; margin-top: 0.125em; box-sizing: border-box; border-radius: 3px;
  display: inline-flex; align-items: center; justify-content: center; font-size: 1em;
  border: 1px solid var(--jui-role-border-strong); background: var(--jui-color-aux-white); color: var(--jui-color-aux-white);
}
.box jui-icon { --frag-icon-size: 0.75em; }
:host([checked]) .box { background: var(--cpt-checkctl-toggle-track-active); border-color: var(--cpt-checkctl-toggle-track-active); }
.toggle { flex: none; position: relative; display: block; width: 38px; height: 20px; border-radius: 20px; background-color: var(--cpt-checkctl-toggle-track); transition: all 300ms ease; }
.toggle::after {
  content: ' '; position: absolute; top: 4px; left: 4px; height: 12px; width: 12px; border-radius: 50%;
  background-color: var(--cpt-checkctl-toggle-thumb); box-shadow: 0 0 3px inset var(--jui-ctl-action); transition: all 300ms ease;
}
:host([checked]) .toggle { background-color: var(--cpt-checkctl-toggle-track-active); }
:host([checked]) .toggle::after { left: 22px; box-shadow: none; }
:host(:focus-within) .box, :host([state~="focus"]) .box, :host(:focus-within) .toggle, :host([state~="focus"]) .toggle { box-shadow: 0 0 0 2px var(--jui-ctl-focus-offset); }
:host(:hover) .box, :host([state~="hover"]) .box { border-color: var(--cpt-checkctl-text); }
:host([invalid]) .inner { box-shadow: 0 0 0 1px var(--jui-ctl-err-focus-offset); }
:host([invalid]) .box { border-color: var(--jui-ctl-err-focus); }
:host([disabled]) .inner { background: var(--jui-ctl-bg-disabled); opacity: var(--jui-ctl-opacity-disabled); }
:host([disabled]) label { color: var(--jui-ctl-text-disabled); cursor: not-allowed; }
:host([disabled]) .item, :host([read-only]) .item { cursor: not-allowed; pointer-events: none; }
:host([read-only]) .inner { background: var(--jui-ctl-bg-readonly); opacity: var(--jui-ctl-opacity-readonly); }
:host([waiting]) .item { animation: jui-waiting 1s infinite; background-color: var(--jui-ctl-bg-wait); }
:host([waiting]) .item * { visibility: hidden; }
@keyframes jui-waiting { from { background-color: var(--jui-role-surface-muted); } to { background-color: var(--jui-role-surface-raised); } }
```

## Example

```xml
<div layout="grid" cols="3" gap="5">
  <jui-check-control label="Send me product updates"/>
  <jui-check-control label="Send me product updates" checked=""/>
  <jui-check-control label="Two-factor sign-in" description="Ask for a code from your phone each time you sign in." checked="" bold=""/>
  <jui-check-control label="Notifications" toggle=""/>
  <jui-check-control label="Notifications" toggle="" checked=""/>
  <jui-check-control label="Weekly summary" toggle="" checked="" reverse="" expand=""/>
  <jui-check-control label="Focused" state="focus"/>
  <jui-check-control label="Focused toggle" toggle="" state="focus"/>
  <jui-check-control label="I agree to the terms" invalid=""/>
  <jui-check-control label="Disabled" disabled=""/>
  <jui-check-control label="Disabled on" checked="" toggle="" disabled=""/>
  <jui-check-control label="Read-only" checked="" read-only=""/>
  <jui-check-control label="Waiting" waiting=""/>
  <jui-control-field error="please accept the terms to continue" span="2">
    <jui-check-control label="I agree to the terms" invalid=""/>
  </jui-control-field>
</div>
```
