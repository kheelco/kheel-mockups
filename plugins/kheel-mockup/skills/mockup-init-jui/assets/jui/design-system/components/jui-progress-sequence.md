---
name: jui-progress-sequence
version: 1.0.0
kind: elemental
status: active
summary: ProgressSequence component — a row of labelled steps joined by a line, showing progress through a multi-step flow.
---

# ProgressSequence (component)

## Purpose

Represents JUI's **ProgressSequence**: a step indicator for a multi-step flow, typically at the top of a dialog
that walks through stages (a wizard: details, then members, then confirm). Each step is labelled and marked done
(a tick), active (a dotted circle) or pending (an empty circle), with a line joining the steps. Put it at the top
of a `jui-modal-dialog`'s body and show each stage as its own dialog mockup. Use `jui-tab-navigator` when the
user may move freely between sections rather than through them in order.

## Anatomy

A row of steps (`jui-progress-sequence-step`), each a small uppercase label above its marker, with lines running
between the markers. The whole sequence is in a dark primary colour. In the compressed form the steps keep their
natural width and the row is centred.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| compressed | variant | boolean | | Steps take their natural width and the sequence is centred, instead of spreading across the width (JUI `compressed()`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| compressed | absent | The steps spread across the full width; inner steps take twice the room of the end ones. |
| compressed | present | Short sequences in wide dialogs, kept together in the middle. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | filled | Steps present | The steps and their joining lines. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | jui-progress-sequence-step | jui-progress-sequence-step | A row of steps. | The steps, first to last (JUI `add(label, state)`). |

## Behaviour

None: it only shows progress. The flow moves it on by rebuilding it with new states.

## Content rules

Step labels are one or two words (`Details`, `Members`, `Confirm`); the sequence shows them in capitals.

## Accessibility

Present as an ordered list; the active step should carry `aria-current="step"`, and done and pending states need
text alternatives, since they are shown only by icons.

## Rules of use

- Exactly one step is active; steps before it are done, steps after it pending.
- Keep to about five steps.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-msp-text` | component | `--jui-color-primary70` | Colour of labels, markers and lines. |
| `--cpt-msp-bookend-grow` | component | `0` | Space either side of the steps; `1` when compressed. |
| `--cpt-msp-item-grow`, `--cpt-msp-item-grow-center` | component | `1`, `2` | How much of the width the end and inner steps take; `0` when compressed. |
| `--jui-color-primary70` | semantic | | Sequence colour. |

## Template

```html
<div class="sequence">
  <div class="bookend"></div>
  <slot></slot>
  <div class="bookend"></div>
</div>
```

## Style

```css
:host { display: block; --cpt-msp-text: var(--jui-color-primary70); --cpt-msp-bookend-grow: 0; --cpt-msp-item-grow: 1; --cpt-msp-item-grow-center: 2; }
:host([compressed]) { --cpt-msp-bookend-grow: 1; --cpt-msp-item-grow: 0; --cpt-msp-item-grow-center: 0; }
.sequence { display: flex; color: var(--cpt-msp-text); }
.bookend { flex-grow: var(--cpt-msp-bookend-grow); }
```

## Example

```xml
<div layout="column" gap="6">
  <jui-progress-sequence>
    <jui-progress-sequence-step label="Details" status="done"/>
    <jui-progress-sequence-step label="Members" status="active"/>
    <jui-progress-sequence-step label="Billing"/>
    <jui-progress-sequence-step label="Confirm"/>
  </jui-progress-sequence>
  <jui-progress-sequence compressed="">
    <jui-progress-sequence-step label="Upload" status="done"/>
    <jui-progress-sequence-step label="Map columns" status="done"/>
    <jui-progress-sequence-step label="Import" status="active"/>
  </jui-progress-sequence>
</div>
```
