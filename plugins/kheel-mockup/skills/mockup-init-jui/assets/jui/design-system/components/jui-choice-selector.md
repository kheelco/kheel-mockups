---
name: jui-choice-selector
version: 1.0.0
kind: composed
status: active
summary: ChoiceSelector fragment — a segmented row of options, one of which is chosen.
---

# ChoiceSelector (fragment)

## Purpose

Represents JUI's **ChoiceSelector** fragment: a compact segmented strip of two to five options where one is shown
as chosen — switching a view ("List / Board"), filtering ("All / Open / Closed") or recording a quick judgement
down the rows of a listing ("Behind / On track / Ahead"). Being a fragment it holds no value: each option's click
is handled by the enclosing component (see **Fragment events**), which re-renders the selector with the new
choice. Use a select or radio control in a form, where the choice is a control value (see **Control values**), and
a tab set to switch between whole panels.

## Anatomy

A rounded, bordered strip (the relief) holding `jui-choice-selector-option` children side by side, each with an
optional icon and a label. The chosen option is raised (white with a soft shadow in the standard variant) or
tinted, per variant and tone.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| variant | variant | standard, control, compact, inline, segmented | standard | The look (JUI `ChoiceSelector.Variant`). |
| disabled | state | boolean | | Disables every option (JUI `disable(true)`): none is shown chosen and none responds. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | standard | Grey tray with the chosen option raised in white. A standalone view switch. |
| variant | control | Flush options with dividers and bold grey text, no relief — sits in a form row at control height. |
| variant | compact | Borderless grey tray, smaller options. Dense toolbars and filter strips. |
| variant | inline | White, bordered, flush options with dividers; chosen option tinted. Repeated in table rows, with tones. |
| variant | segmented | Like inline without the dividers; a quieter segmented control. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Availability | enabled | Default | Options respond to hover and click. |
| Availability | disabled | `disabled` property | No option is shown chosen; labels faded; no-drop cursor. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | jui-choice-selector-option | jui-choice-selector-option | A row of equal-growing options separated by the relief. | The options, in order. Mark one `active`. |

## Behaviour

Clicking an option that is not chosen or disabled invokes its handler through the enclosing component
(**Fragment events**), which re-renders the selector with that option `active`. Options have hover feedback;
the chosen one does not.

## Content rules

Short labels of one or two words, parallel in form (all nouns or all adjectives), in sentence case. Icons are
optional; use them on all options or none.

## Accessibility

JUI renders `div`s. When implementing, give the strip `role="radiogroup"` and each option `role="radio"` with
`aria-checked`, and make them focusable, so the choice is announced and reachable by keyboard.

## Rules of use

- Two to five options; more belongs in a select.
- Exactly one option `active` (or none, before a first choice in a judgement row).
- Use tones only with `inline` or `segmented`, and only where the choice carries a judgement.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-choice-selector-relief-border` | component | `--jui-color-neutral20` | Strip border; transparent for compact. |
| `--jui-choice-selector-relief` | component | `3px` | Padding and gap round the options; `0` for control, inline and segmented. |
| `--jui-choice-selector-radius` | component | `6px` | Strip radius; `8px` compact and segmented, `7px` inline. |
| `--jui-choice-selector-shadow` | component | `--jui-color-neutral30` | Colour of the chosen option's shadow. |
| `--jui-choice-selector-shadow-selected` | component | `0 0 6px` shadow | Chosen option's shadow; `none` for all but standard. |
| `--jui-choice-selector-bg` | component | `--jui-color-neutral10` | Strip background; white for inline and segmented. |
| `--jui-choice-selector-bg-hover` | component | `--jui-color-neutral20` | Option hover background; `--jui-color-neutral05` for inline and segmented. |
| `--jui-choice-selector-bg-selected` | component | `--jui-color-aux-white` | Chosen option background; `--jui-color-neutral10` for inline and segmented; tones repoint it per option. |
| `--jui-choice-selector-text` | component | `--jui-color-neutral60` | Option text; `--jui-color-neutral50` for control, inline and segmented. |
| `--jui-choice-selector-text-hover` | component | `--jui-choice-selector-text` | Option text on hover. |
| `--jui-choice-selector-text-selected` | component | `--jui-color-neutral90` | Chosen option text; `--jui-color-neutral70` for segmented. |
| `--jui-choice-selector-text-weight` | component | `300` | Option weight; `600` control, `500` compact, inline and segmented. |
| `--jui-choice-selector-text-size` | component | `inherit` | Option text size. |
| `--jui-choice-selector-option-lr` | component | `1em` | Option horizontal padding; `0.7em` compact, inline and segmented. |
| `--jui-choice-selector-option-tb` | component | `0.5em` | Option vertical padding; `0.25em` control, inline and segmented, `0.2em` compact. |
| `--jui-choice-selector-option-radius` | component | `--jui-choice-selector-radius` | Option radius; `0` control, inline and segmented, `5px` compact. |
| `--jui-choice-selector-option-divider` | component | `none` | Border between options; a 1px line for control and inline. |
| `--jui-choice-selector-opacity-disabled` | component | `0.4` | Fade of disabled labels. |
| `--jui-color-neutral10`, `--jui-color-neutral20`, `--jui-color-neutral30`, `--jui-color-neutral05`, `--jui-color-neutral50`, `--jui-color-neutral60`, `--jui-color-neutral70`, `--jui-color-neutral90`, `--jui-color-aux-white` | semantic | | Strip and option colours. |

## Template

```html
<div class="strip"><slot></slot></div>
```

## Style

```css
:host {
  display: inline-flex;
  vertical-align: middle;
  max-width: 100%;
  --jui-choice-selector-relief-border: var(--jui-color-neutral20);
  --jui-choice-selector-relief: 3px;
  --jui-choice-selector-radius: 6px;
  --jui-choice-selector-shadow: var(--jui-color-neutral30);
  --jui-choice-selector-shadow-selected: 0 0 6px var(--jui-choice-selector-shadow);
  --jui-choice-selector-bg: var(--jui-color-neutral10);
  --jui-choice-selector-bg-hover: var(--jui-color-neutral20);
  --jui-choice-selector-bg-selected: var(--jui-color-aux-white);
  --jui-choice-selector-text: var(--jui-color-neutral60);
  --jui-choice-selector-text-hover: var(--jui-choice-selector-text);
  --jui-choice-selector-text-selected: var(--jui-color-neutral90);
  --jui-choice-selector-text-weight: 300;
  --jui-choice-selector-text-size: inherit;
  --jui-choice-selector-option-lr: 1em;
  --jui-choice-selector-option-tb: 0.5em;
  --jui-choice-selector-option-radius: var(--jui-choice-selector-radius);
  --jui-choice-selector-option-divider: none;
  --jui-choice-selector-opacity-disabled: 0.4;
}
:host([variant="control"]) {
  --jui-choice-selector-relief: 0; --jui-choice-selector-option-tb: 0.25em; --jui-choice-selector-text-weight: 600;
  --jui-choice-selector-option-radius: 0; --jui-choice-selector-text: var(--jui-color-neutral50);
  --jui-choice-selector-option-divider: 1px solid #e1e1e1; --jui-choice-selector-shadow-selected: none;
}
:host([variant="compact"]) {
  --jui-choice-selector-relief: 3px; --jui-choice-selector-relief-border: transparent; --jui-choice-selector-radius: 8px;
  --jui-choice-selector-option-radius: 5px; --jui-choice-selector-option-tb: 0.2em; --jui-choice-selector-option-lr: 0.7em;
  --jui-choice-selector-text-weight: 500; --jui-choice-selector-shadow-selected: none;
}
:host([variant="inline"]) {
  --jui-choice-selector-relief: 0; --jui-choice-selector-relief-border: var(--jui-color-neutral20); --jui-choice-selector-radius: 7px;
  --jui-choice-selector-option-radius: 0; --jui-choice-selector-option-divider: 1px solid var(--jui-color-neutral20);
  --jui-choice-selector-bg: var(--jui-color-aux-white); --jui-choice-selector-bg-hover: var(--jui-color-neutral05);
  --jui-choice-selector-bg-selected: var(--jui-color-neutral10); --jui-choice-selector-text: var(--jui-color-neutral50);
  --jui-choice-selector-text-selected: var(--jui-color-neutral90); --jui-choice-selector-option-tb: 0.25em;
  --jui-choice-selector-option-lr: 0.7em; --jui-choice-selector-text-weight: 500; --jui-choice-selector-shadow-selected: none;
}
:host([variant="segmented"]) {
  --jui-choice-selector-relief: 0; --jui-choice-selector-relief-border: var(--jui-color-neutral20); --jui-choice-selector-radius: 8px;
  --jui-choice-selector-option-radius: 0; --jui-choice-selector-bg: var(--jui-color-aux-white);
  --jui-choice-selector-bg-selected: var(--jui-color-neutral10); --jui-choice-selector-bg-hover: var(--jui-color-neutral05);
  --jui-choice-selector-text: var(--jui-color-neutral50); --jui-choice-selector-text-selected: var(--jui-color-neutral70);
  --jui-choice-selector-option-tb: 0.25em; --jui-choice-selector-option-lr: 0.7em; --jui-choice-selector-text-weight: 500;
  --jui-choice-selector-shadow-selected: none;
}
.strip {
  display: flex; width: fit-content; max-width: 100%; overflow: hidden;
  gap: var(--jui-choice-selector-relief); padding: var(--jui-choice-selector-relief);
  border: 1px solid var(--jui-choice-selector-relief-border); border-radius: var(--jui-choice-selector-radius);
  background: var(--jui-choice-selector-bg); color: var(--jui-choice-selector-text);
}
::slotted(:not(:first-child)) { border-left: var(--jui-choice-selector-option-divider); }
:host([disabled]) ::slotted(*) {
  --jui-choice-selector-bg-selected: var(--jui-choice-selector-bg); --jui-choice-selector-text-selected: var(--jui-choice-selector-text);
  --jui-choice-selector-shadow-selected: none; --jui-choice-selector-bg-hover: transparent;
  opacity: var(--jui-choice-selector-opacity-disabled); cursor: no-drop;
}
```

## Example

```xml
<div layout="column" gap="4" align="start">
  <jui-choice-selector>
    <jui-choice-selector-option label="List" icon="list" active=""/>
    <jui-choice-selector-option label="Board" icon="layout-grid"/>
    <jui-choice-selector-option label="Calendar" icon="calendar"/>
  </jui-choice-selector>
  <jui-choice-selector variant="control">
    <jui-choice-selector-option label="Day"/>
    <jui-choice-selector-option label="Week" active=""/>
    <jui-choice-selector-option label="Month"/>
  </jui-choice-selector>
  <jui-choice-selector variant="compact">
    <jui-choice-selector-option label="All" active=""/>
    <jui-choice-selector-option label="Open" state="hover"/>
    <jui-choice-selector-option label="Closed" disabled=""/>
  </jui-choice-selector>
  <jui-choice-selector variant="inline">
    <jui-choice-selector-option label="Behind" icon="arrow-down" tone="negative"/>
    <jui-choice-selector-option label="On track" icon="check" tone="positive" active=""/>
    <jui-choice-selector-option label="Ahead" icon="arrow-up" tone="info"/>
  </jui-choice-selector>
  <jui-choice-selector variant="segmented">
    <jui-choice-selector-option label="Low"/>
    <jui-choice-selector-option label="Medium" tone="caution" active=""/>
    <jui-choice-selector-option label="High"/>
  </jui-choice-selector>
  <jui-choice-selector disabled="">
    <jui-choice-selector-option label="Yes" active=""/>
    <jui-choice-selector-option label="No"/>
  </jui-choice-selector>
</div>
```
