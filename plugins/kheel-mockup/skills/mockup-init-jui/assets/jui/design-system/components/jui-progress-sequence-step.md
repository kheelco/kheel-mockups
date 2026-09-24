---
name: jui-progress-sequence-step
version: 1.0.0
kind: composed
status: active
summary: ProgressSequence step component — one labelled step of a progress sequence, done, active or pending.
---

# ProgressSequence step (component)

## Purpose

One step of a `jui-progress-sequence`, standing for JUI's `ProgressSequence.Config.add(label, State)`. It only
exists inside a progress sequence.

## Anatomy

A small uppercase label above a marker, with a line to the left and right of the marker joining it to its
neighbours (none before the first step or after the last). The marker is a tick (`jui-icon` "check") when done, a
dotted circle (`jui-icon` "circle-dot") when active, and an empty circle when pending.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The step's label. |
| status | state | pending, active, done | pending | Where the flow is relative to this step (JUI `ProgressSequence.Config.State`). |

## Variants

None.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Progress | pending | `status="pending"` | Empty circle. |
| Progress | active | `status="active"` | Dotted circle. |
| Progress | done | `status="done"` | Tick. |
| Position | first, inner, last | Position among the steps | No line before the first marker or after the last; inner steps take more width. |

## Behaviour

None.

## Content rules

One or two words; shown in capitals.

## Accessibility

The marker's meaning must also be available as text (for example a visually hidden "completed").

## Rules of use

- Mark one step `active`, those before it `done`.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-msp-text` | inherited | | Line and marker colour, from the sequence. |
| `--cpt-msp-item-grow`, `--cpt-msp-item-grow-center` | inherited | | Share of the width, from the sequence. |

## Template

```html
<div class="item">
  <label>{{label}}</label>
  <div class="bottom">
    <div class="line lead"></div>
    <jui-icon data-if="status=done" name="check"></jui-icon>
    <jui-icon data-if="status=active" name="circle-dot"></jui-icon>
    <span class="pending" data-if="status=pending"></span>
    <div class="line trail"></div>
  </div>
</div>
```

## Style

```css
:host { display: block; flex-grow: var(--cpt-msp-item-grow, 1); }
:host(:not(:first-child):not(:last-child)) { flex-grow: var(--cpt-msp-item-grow-center, 2); }
.item { display: flex; flex-direction: column; align-items: center; gap: 0.25em; }
label { text-transform: uppercase; font-size: 0.8em; font-weight: 500; padding: 0 1em; white-space: nowrap; }
.bottom { display: flex; flex-direction: row; align-items: center; width: 100%; gap: 0.2em; }
.line { flex-grow: 1; align-self: flex-start; height: 50%; min-height: 0.5em; border-bottom: 2px solid var(--cpt-msp-text, currentColor); }
:host(:first-child) .lead, :host(:last-child) .trail { border-bottom-color: transparent; }
.pending { display: inline-block; box-sizing: border-box; width: 1em; height: 1em; border: 2px solid currentColor; border-radius: 50%; }
```

## Example

```xml
<jui-progress-sequence>
  <jui-progress-sequence-step label="Done" status="done"/>
  <jui-progress-sequence-step label="Active" status="active"/>
  <jui-progress-sequence-step label="Pending"/>
</jui-progress-sequence>
```
