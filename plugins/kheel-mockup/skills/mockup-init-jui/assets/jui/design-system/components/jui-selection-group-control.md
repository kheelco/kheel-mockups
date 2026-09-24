---
name: jui-selection-group-control
version: 1.0.0
kind: elemental
status: active
summary: SelectionGroupControl control — a laid-out group of checkbox or radio options, each with a label and optional description.
---

# SelectionGroupControl (control)

## Purpose

Represents JUI's **SelectionGroupControl**: all the options visible at once, each with a checkbox
(`Controls.checkGroup`, pick any) or a radio button (`Controls.radioGroup`, pick one). The value is the list of
selected option values. Use it when there are two to about six options that people should compare, especially
when each needs a description. Use `jui-selection-control` or `jui-multi-selection-control` for longer lists,
`jui-check-control` for a single yes/no, and `jui-multi-check-control` for a compact pill of short options. The
group's own label comes from the enclosing `jui-control-form-cell` or `jui-control-field`.

## Anatomy

A list of items (JUI `.item`), each with its input (checkbox or radio) and a label block: the option label in
medium weight — optionally preceded by an icon — and a description beneath it. Radio groups lay items out in a
wrapping row, checkbox groups in a column; the vertical and survey styles are always a column, and survey draws
each item as a bordered card that highlights when selected.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| type | variant | check, radio | check | Checkboxes (pick any; JUI `Controls.checkGroup`) or radio buttons (pick one; `Controls.radioGroup` / `radio()`). |
| variant | variant | standard, vertical, survey | standard | The layout style (JUI `Config.Style`: standard, `VERTICAL`, `SURVEY`). |
| disabled | state | boolean | | Disabled (JUI `disable()`). |
| read-only | state | boolean | | Read-only (JUI `readOnly`). |
| invalid | state | boolean | | Failed validation, such as nothing selected. |
| waiting | state | boolean | | Waiting for its value: items hidden and pulsing. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| type | check | Independent options; any number may be chosen. |
| type | radio | Mutually exclusive options; exactly one is chosen. |
| variant | standard | Radio options in a wrapping row, checkbox options in a column. |
| variant | vertical | Always a column, with more room between input and label. |
| variant | survey | A column of bordered cards; the selected card is outlined and tinted. For choices that deserve weight, such as plans or account types. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | — |
| Interaction | hover | `:hover` on an item | Pointer cursor; survey cards shade. |
| Interaction | focus | `:focus-within` | Soft focus ring around the first item's input. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Labels muted at reduced opacity; not-allowed cursor. |
| Availability | read-only | `read-only` property | Labels and inputs in the read-only colours; not-allowed cursor. |
| Validation | valid | Default | — |
| Validation | invalid | `invalid` property | Inputs outlined in the error colour. |
| Activity | idle | Default | — |
| Activity | waiting | `waiting` property | Items hidden, each pulsing. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | text | jui-icon | Row or column by type and variant | One plain `div` per option: the label text, optionally a leading `jui-icon`, and a `p` for the description. Mark chosen options `data-selected=""`, indented ones `data-indented=""`, unavailable ones `data-disabled=""`. |

## Behaviour

Clicking an option (input or label) selects it; in a radio group this deselects the previous one, in a checkbox
group it toggles only that option. Each change is reported (**Control values**).

## Content rules

Option labels are short and parallel in form; descriptions are a single sentence saying what the option means.

## Accessibility

Real checkboxes or radios (JUI `input`) labelled by their option labels; a radio group is one tab stop and the
arrow keys move between options.

## Rules of use

- Use radios only when exactly one option must be chosen; give radio groups a sensible default selection.
- Keep to about six options; beyond that use a selection control.
- Use the survey style sparingly, for weighty choices.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-selectiongroup-text` | component | `--jui-ctl-text` | Label colour. |
| `--jui-selectiongroup-itemgap` | component | `1em` | Gap between items; `0.5em` survey. |
| `--jui-selectiongroup-labelgap` | component | `0.75em` | Gap between input and label; `1em` vertical and survey. |
| `--jui-selectiongroup-inputsize` | component | `1em` | Input size. |
| `--jui-selectiongroup-description` | component | `--jui-ctl-text` | Description colour. |
| `--jui-selectiongroup-hover` | component | `--jui-color-neutral05` | Survey card hover surface (JUI `#f6f6f6`). |
| `--jui-selectiongroup-border` | component | `--jui-color-neutral20` | Survey card border (JUI `#ddd`). |
| `--jui-ctl-text`, `--jui-color-neutral05`, `--jui-color-neutral20` | semantic | | Defaults above. |
| `--jui-ctl-active`, `--jui-ctl-active-bg`, `--jui-role-border-strong`, `--jui-color-aux-white` | semantic | | Selected input and survey card; input border and surface. |
| `--jui-ctl-focus-offset`, `--jui-ctl-err-focus` | semantic | | Focus ring; invalid outline. |
| `--jui-ctl-text-disabled`, `--jui-ctl-text-readonly`, `--jui-ctl-bg-readonly` | semantic | | Disabled and read-only looks. |
| `--jui-ctl-bg-wait`, `--jui-role-surface-muted`, `--jui-role-surface-raised` | semantic | | Waiting surface and its pulse. |

## Template

```html
<div class="inner" tabindex="-1"><slot></slot></div>
```

## Style

```css
:host {
  display: block; padding-top: 0.5em;
  --jui-selectiongroup-text: var(--jui-ctl-text);
  --jui-selectiongroup-itemgap: 1em;
  --jui-selectiongroup-labelgap: 0.75em;
  --jui-selectiongroup-inputsize: 1em;
  --jui-selectiongroup-description: var(--jui-ctl-text);
  --jui-selectiongroup-hover: var(--jui-color-neutral05);
  --jui-selectiongroup-border: var(--jui-color-neutral20);
}
:host([variant="vertical"]) { --jui-selectiongroup-itemgap: 1em; --jui-selectiongroup-labelgap: 1em; }
:host([variant="survey"]) { --jui-selectiongroup-itemgap: 0.5em; --jui-selectiongroup-labelgap: 1em; }
.inner { outline: none; display: flex; flex-direction: column; flex-wrap: wrap; gap: var(--jui-selectiongroup-itemgap); color: var(--jui-selectiongroup-text); }
:host([type="radio"][variant="standard"]) .inner { flex-direction: row; }
::slotted(*) {
  display: block; position: relative; cursor: pointer; user-select: none; font-weight: 500;
  padding-left: calc(var(--jui-selectiongroup-inputsize) + var(--jui-selectiongroup-labelgap));
}
::slotted(*)::before {
  content: ""; position: absolute; left: 0; top: 0.2em; box-sizing: border-box;
  width: calc(var(--jui-selectiongroup-inputsize) / 0.8); height: calc(var(--jui-selectiongroup-inputsize) / 0.8);
  border: 1px solid var(--jui-role-border-strong); border-radius: 3px; background: var(--jui-color-aux-white);
  color: var(--jui-color-aux-white); font-size: 0.8em; line-height: 1.15em; text-align: center; font-weight: 600;
}
:host([type="radio"]) ::slotted(*)::before { border-radius: 50%; }
:host([type="check"]) ::slotted([data-selected])::before { content: "\2713"; background: var(--jui-ctl-active); border-color: var(--jui-ctl-active); }
:host([type="radio"]) ::slotted([data-selected])::before {
  border-color: var(--jui-ctl-active);
  background: radial-gradient(circle, var(--jui-ctl-active) 0 36%, var(--jui-color-aux-white) 40%);
}
::slotted([data-indented]) { margin-left: 2em; }
::slotted([data-disabled]) { opacity: 0.6; cursor: default; }
:host([variant="survey"]) ::slotted(*) {
  border: 1px solid var(--jui-selectiongroup-border); border-radius: 3px;
  padding: 0.75em 1em 0.75em calc(1em + var(--jui-selectiongroup-inputsize) + var(--jui-selectiongroup-labelgap));
}
:host([variant="survey"]) ::slotted(*)::before { left: 1em; top: 0.95em; }
:host([variant="survey"]) ::slotted(:hover) { background-color: var(--jui-selectiongroup-hover); }
:host([variant="survey"]) ::slotted([data-selected]) { border-color: var(--jui-ctl-active); background-color: var(--jui-ctl-active-bg); }
:host(:focus-within) ::slotted(:first-child)::before, :host([state~="focus"]) ::slotted(:first-child)::before { box-shadow: 0 0 0 2px var(--jui-ctl-focus-offset); }
:host(:hover) ::slotted(:hover)::before, :host([state~="hover"]) ::slotted(:first-child)::before { border-color: var(--jui-selectiongroup-text); }
:host([invalid]) ::slotted(*)::before { border-color: var(--jui-ctl-err-focus); }
:host([disabled]) ::slotted(*) { opacity: 0.6; color: var(--jui-ctl-text-disabled); cursor: not-allowed; }
:host([read-only]) ::slotted(*) { color: var(--jui-ctl-text-readonly); cursor: not-allowed; }
:host([read-only]) ::slotted(*)::before { background: var(--jui-ctl-bg-readonly); }
:host([disabled]) .inner, :host([read-only]) .inner { pointer-events: none; }
:host([waiting]) ::slotted(*) { animation: jui-waiting 1s infinite; background-color: var(--jui-ctl-bg-wait); color: transparent; }
:host([waiting]) ::slotted(*)::before { visibility: hidden; }
@keyframes jui-waiting { from { background-color: var(--jui-role-surface-muted); } to { background-color: var(--jui-role-surface-raised); } }
```

## Example

```xml
<div layout="grid" cols="3" gap="6">
  <jui-selection-group-control>
    <div data-selected="">The first option<p>A description for the first option.</p></div>
    <div>The second option<p>A description for the second option.</p></div>
    <div data-indented="" data-selected="">An indented option</div>
  </jui-selection-group-control>
  <jui-selection-group-control type="radio">
    <div data-selected="">Option 1</div>
    <div>Option 2</div>
    <div data-disabled="">Option 3</div>
  </jui-selection-group-control>
  <jui-selection-group-control type="radio" variant="vertical">
    <div data-selected=""><jui-icon name="users"/> Public to organisation</div>
    <div><jui-icon name="lock"/> Private to me</div>
  </jui-selection-group-control>
  <jui-selection-group-control type="radio" variant="survey" span="2">
    <div data-selected="">Standard user<p>A real person who can be invited to access this account.</p></div>
    <div>API user<p>Allows a third party application to access this account via the API.</p></div>
  </jui-selection-group-control>
  <jui-selection-group-control variant="survey">
    <div data-selected="">Email</div>
    <div>SMS</div>
  </jui-selection-group-control>
  <jui-selection-group-control type="radio" state="focus">
    <div>Focused</div>
    <div>Option 2</div>
  </jui-selection-group-control>
  <jui-selection-group-control type="radio" invalid="">
    <div>Yes</div>
    <div>No</div>
  </jui-selection-group-control>
  <jui-selection-group-control disabled="">
    <div data-selected="">Disabled on</div>
    <div>Disabled off</div>
  </jui-selection-group-control>
  <jui-selection-group-control read-only="" type="radio">
    <div data-selected="">Read-only</div>
    <div>Option 2</div>
  </jui-selection-group-control>
  <jui-control-field label="Privacy" required="" error="please select an option" span="full">
    <jui-selection-group-control type="radio" invalid="">
      <div><jui-icon name="users"/> Public to organisation</div>
      <div><jui-icon name="lock"/> Private to me</div>
    </jui-selection-group-control>
  </jui-control-field>
</div>
```
