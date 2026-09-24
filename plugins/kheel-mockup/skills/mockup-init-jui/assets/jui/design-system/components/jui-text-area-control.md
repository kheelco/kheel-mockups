---
name: jui-text-area-control
version: 1.0.0
kind: composed
status: active
summary: TextAreaControl control — a multi-line text input with a configurable number of rows and an optional character counter.
---

# TextAreaControl (control)

## Purpose

Represents JUI's **TextAreaControl**: multi-line text input (value type `String`) for descriptions, notes and
messages. It draws only the input box; the label, guidance and errors come from the enclosing
`jui-control-form-cell` or `jui-control-field`. Use `jui-text-control` for a single line.

## Anatomy

A bordered box (JUI's `.inner`) holding the text area; an optional icon pinned to the top-right corner; and an
optional character counter right-aligned below the text, inside the box.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| value | content | text | | The current text (**Control values**). Absent shows the placeholder. |
| placeholder | content | text | | Hint shown while empty (JUI `placeholder`). |
| rows | variant | number | 3 | Visible lines of text (JUI `rows`). |
| icon-right | content | icon | | Icon pinned to the top-right corner (JUI `iconRight`). |
| counter | content | text | | Character counter text, such as `120 / 400` (JUI counter, shown when a maximum length is configured). |
| counter-limit | state | boolean | | The counter has reached the limit: shown in the error colour. |
| resizable | variant | boolean | | The user may drag to resize (JUI `resizable`). |
| disabled | state | boolean | | Disabled (JUI `disable()`). |
| read-only | state | boolean | | Read-only (JUI `readOnly`). |
| invalid | state | boolean | | Failed validation: red border. |
| waiting | state | boolean | | Waiting for its value: pulsing blank box. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| rows | a number | Size the box to the expected length: 3 for a short note, 5–8 for a description. |
| counter | text | When a maximum length applies, so people can see how much room is left. |
| resizable | present | Long free text where people may want more room. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Neutral border on the control surface. |
| Interaction | hover | `:hover` | Hover border and surface (the same as rest in the standard style). |
| Interaction | focus | `:focus-within` | Focus-coloured border with a soft focus ring. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Sunken surface at half opacity, muted text. |
| Availability | read-only | `read-only` property | Read-only surface at half opacity, muted text. |
| Validation | valid | Default | — |
| Validation | invalid | `invalid` property | Error-coloured border and ring. |
| Activity | idle | Default | — |
| Activity | waiting | `waiting` property | Content hidden; the box pulses. |
| Content | empty | No `value` | Placeholder shown. |
| Content | filled | `value` set | Text shown. |
| Length | within-limit | Default | Counter in the text colour. |
| Length | at-limit | `counter-limit` property | Counter in the error colour. |

## Behaviour

Typing changes the value and reports each change (**Control values**); the counter updates as text is entered.
Validation failures put the control in the invalid state and the enclosing cell or field shows the messages.

## Content rules

The placeholder hints at what to write (`Describe the issue`), not the label.

## Accessibility

A real `textarea`, labelled by the enclosing field or cell. The counter is informational and should not be the
only sign of a length error — validation also reports it.

## Rules of use

- Label it through `jui-control-form-cell` or `jui-control-field`.
- Pair `counter` with a length validator; show `counter-limit` together with `invalid` when the limit is exceeded.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-textareactl-size` | component | `--jui-font-size-md` | Text size. |
| `--cpt-textareactl-padding` | component | `0.55em` | Box padding. |
| `--cpt-textareactl-bg` | component | `--jui-comp-control-surface` | Box surface. |
| `--cpt-textareactl-bg-hover` | component | `--cpt-textareactl-bg` | Surface on hover. |
| `--cpt-textareactl-bg-focus` | component | `--cpt-textareactl-bg` | Surface when focused. |
| `--cpt-textareactl-text` | component | `--jui-comp-control-text` | Text colour. |
| `--cpt-textareactl-text-disabled` | component | `--jui-comp-control-text-disabled` | Text colour when disabled. |
| `--cpt-textareactl-text-readonly` | component | `--jui-comp-control-text-readonly` | Text colour when read-only. |
| `--cpt-textareactl-text-placeholder` | component | `--jui-comp-control-text-placeholder` | Placeholder colour. |
| `--cpt-textareactl-border` | component | `--jui-comp-control-border` | Border colour. |
| `--cpt-textareactl-border-hover` | component | `--cpt-textareactl-border` | Border colour on hover. |
| `--cpt-textareactl-border-focus` | component | `--jui-ctl-focus` | Border colour when focused. |
| `--cpt-textareactl-border-radius` | component | `--jui-comp-control-radius` | Corner radius. |
| `--cpt-textareactl-icon` | component | `--jui-comp-control-action` | Corner icon colour. |
| `--cpt-textareactl-counter-limit` | component | `--jui-color-error70` | Counter colour at the limit. |
| `--cpt-textareactl-counter-text-color` | component | `--cpt-textareactl-text` | Counter colour. |
| `--cpt-textareactl-counter-text-size` | component | `0.9em` | Counter size. |
| `--jui-font-size-md`, `--jui-color-error70` | semantic | | Text size and the at-limit colour. |
| `--jui-comp-control-surface`, `--jui-comp-control-text`, `--jui-comp-control-text-disabled`, `--jui-comp-control-text-readonly`, `--jui-comp-control-text-placeholder`, `--jui-comp-control-border`, `--jui-comp-control-radius`, `--jui-comp-control-action` | semantic | | The control family defaults. |
| `--jui-ctl-focus`, `--jui-ctl-focus-offset`, `--jui-ctl-err-focus`, `--jui-ctl-err-focus-offset` | semantic | | Focus and invalid borders and rings. |
| `--jui-ctl-bg-disabled`, `--jui-ctl-opacity-disabled`, `--jui-ctl-bg-readonly`, `--jui-ctl-opacity-readonly` | semantic | | Disabled and read-only surfaces. |
| `--jui-ctl-bg-wait`, `--jui-role-surface-muted`, `--jui-role-surface-raised` | semantic | | Waiting surface and its pulse. |

## Template

```html
<div class="inner">
  <textarea rows="{{rows}}" placeholder="{{placeholder}}">{{value}}</textarea>
  <jui-icon data-if="icon-right" class="right" name="{{icon-right}}"></jui-icon>
  <div class="counter" data-if="counter">{{counter}}</div>
</div>
```

## Style

```css
:host {
  display: block;
  --cpt-textareactl-size: var(--jui-font-size-md);
  --cpt-textareactl-padding: 0.55em;
  --cpt-textareactl-bg: var(--jui-comp-control-surface);
  --cpt-textareactl-bg-hover: var(--cpt-textareactl-bg);
  --cpt-textareactl-bg-focus: var(--cpt-textareactl-bg);
  --cpt-textareactl-text: var(--jui-comp-control-text);
  --cpt-textareactl-text-disabled: var(--jui-comp-control-text-disabled);
  --cpt-textareactl-text-readonly: var(--jui-comp-control-text-readonly);
  --cpt-textareactl-text-placeholder: var(--jui-comp-control-text-placeholder);
  --cpt-textareactl-border: var(--jui-comp-control-border);
  --cpt-textareactl-border-hover: var(--cpt-textareactl-border);
  --cpt-textareactl-border-focus: var(--jui-ctl-focus);
  --cpt-textareactl-border-radius: var(--jui-comp-control-radius);
  --cpt-textareactl-icon: var(--jui-comp-control-action);
  --cpt-textareactl-counter-limit: var(--jui-color-error70);
  --cpt-textareactl-counter-text-color: var(--cpt-textareactl-text);
  --cpt-textareactl-counter-text-size: 0.9em;
}
.inner {
  margin: 2px 0; padding: var(--cpt-textareactl-padding); box-sizing: content-box; position: relative; overflow: hidden;
  border: 1px solid var(--cpt-textareactl-border); border-radius: var(--cpt-textareactl-border-radius);
  background: var(--cpt-textareactl-bg); color: var(--cpt-textareactl-text);
  display: flex; flex-direction: column; gap: 0.5em;
}
textarea {
  display: block; width: 100%; padding: 0; margin: 0; border: none; outline: none; resize: none;
  background: inherit; color: inherit; font: inherit; font-size: var(--cpt-textareactl-size); line-height: 1.4;
}
textarea::placeholder { color: var(--cpt-textareactl-text-placeholder); }
:host([resizable]) textarea { resize: vertical; }
:host([icon-right]) textarea { padding-right: 1.5em; }
.right { position: absolute; top: 0.5em; right: 0.5em; color: var(--cpt-textareactl-icon); pointer-events: none; }
.counter { text-align: right; margin-top: 0.25em; font-size: var(--cpt-textareactl-counter-text-size); color: var(--cpt-textareactl-counter-text-color); }
:host([counter-limit]) .counter, :host([state~="at-limit"]) .counter { color: var(--cpt-textareactl-counter-limit); }
:host(:hover) .inner, :host([state~="hover"]) .inner { border-color: var(--cpt-textareactl-border-hover); background: var(--cpt-textareactl-bg-hover); }
:host(:focus-within) .inner, :host([state~="focus"]) .inner {
  background: var(--cpt-textareactl-bg-focus); border-color: var(--cpt-textareactl-border-focus); box-shadow: 0 0 0 2px var(--jui-ctl-focus-offset);
}
:host([invalid]) .inner { border-color: var(--jui-ctl-err-focus); box-shadow: 0 0 0 1px var(--jui-ctl-err-focus-offset); }
:host([invalid]:focus-within) .inner, :host([invalid][state~="focus"]) .inner { box-shadow: 0 0 3px 1px var(--jui-ctl-err-focus-offset); }
:host([disabled]) .inner { background: var(--jui-ctl-bg-disabled); opacity: var(--jui-ctl-opacity-disabled); cursor: not-allowed; }
:host([disabled]) textarea { color: var(--cpt-textareactl-text-disabled); pointer-events: none; }
:host([read-only]) .inner { background: var(--jui-ctl-bg-readonly); opacity: var(--jui-ctl-opacity-readonly); cursor: not-allowed; }
:host([read-only]) textarea { color: var(--cpt-textareactl-text-readonly); pointer-events: none; }
:host([waiting]) .inner { animation: jui-waiting 1s infinite; border-color: transparent; background-color: var(--jui-ctl-bg-wait); box-shadow: none; }
:host([waiting]) .inner > * { visibility: hidden; }
@keyframes jui-waiting { from { background-color: var(--jui-role-surface-muted); } to { background-color: var(--jui-role-surface-raised); } }
```

## Example

```xml
<div layout="grid" cols="2" gap="4">
  <jui-text-area-control placeholder="Describe the issue"/>
  <jui-text-area-control rows="4" value="The invoice was sent to the wrong address and needs to be re-issued before the end of the month." counter="98 / 400"/>
  <jui-text-area-control rows="2" value="Focused" state="focus" icon-right="pencil"/>
  <jui-text-area-control rows="2" value="This note is far too long for the field." counter="412 / 400" counter-limit="" invalid=""/>
  <jui-text-area-control rows="2" value="Disabled" disabled=""/>
  <jui-text-area-control rows="2" value="Read-only notes" read-only=""/>
  <jui-control-field label="A description of yourself" span="full">
    <jui-text-area-control rows="3" placeholder="A few sentences about you" resizable=""/>
  </jui-control-field>
</div>
```
