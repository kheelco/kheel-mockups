---
name: ui-select
version: 1.0.0
kind: composed
status: active
summary: Chooses one option from a list that opens on demand.
---

# Select

## Purpose

Lets the user choose one option from a known list of more than a handful. For two to four options that should
stay visible, use chips or checkboxes instead.

## Anatomy

A visible label, a trigger showing the current value and a chevron, and — when open — a list of options
(`ui-option`) beneath it. Helper and error messages as for the text field.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The field's label. May be omitted in a filter bar, with `placeholder` saying what it filters. |
| value | content | text | | The chosen option's text. |
| placeholder | content | text | Select… | Shown while nothing is chosen. |
| icon | content | icon | | Optional leading icon. |
| helper | content | text | | Guidance beneath the field. |
| error | state | text | | Error message; puts the select in the invalid state. |
| disabled | state | boolean | | Puts the select in the disabled state. |

## Variants

None.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | resting | Default | As a text field. |
| Interaction | hover | `:hover` | Border darkens. |
| Interaction | focus | `:focus-within` | Action-coloured border and ring. |
| Expansion | closed | Default | Only the trigger shows. |
| Expansion | open | Click on the trigger | The option list shows beneath, over following content. |
| Content | empty | No `value` | Placeholder shown in subtle text. |
| Content | filled | `value` present | Value shown. |
| Validation | neutral | Default | — |
| Validation | invalid | `error` property | Danger border and error message. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Sunken, muted; not interactive. |
| Loading | loaded | Default | — |
| Loading | loading | Options still arriving | Follows **Remote list loading**. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | ui-option | | Vertical list | The options, shown when open. |

## Behaviour

Clicking the trigger opens the list; choosing an option sets the value and closes it; Escape or clicking outside
closes it without change. In a mockup, show the open list with `state="open"`. A select whose options come from
the server follows the shared **Remote list loading** behaviour.

## Content rules

Order options logically (by frequency, then alphabetically). Keep option text short enough not to wrap.

## Accessibility

Keyboard: arrow keys move through options, Enter chooses, Escape closes. The trigger announces its label and value.

## Rules of use

- Don't use a select for yes/no; use a checkbox.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--color-surface`, `--color-border-strong`, `--color-text`, `--color-text-subtle` | semantic |  | Trigger background, border, value, and placeholder/chevron colour. |
| `--color-action`, `--color-action-subtle` | semantic |  | Border and ring when focused or open. |
| `--color-border`, `--shadow-lg` | semantic |  | Border and elevation of the open list. |
| `--color-danger` | semantic |  | Border and message when invalid. |
| `--color-surface-sunken`, `--color-text-disabled` | semantic |  | Trigger when disabled. |
| `--color-text-muted` | semantic |  | Helper text. |
| `--control-height-md` | semantic |  | Trigger height. |
| `--radius-md` | semantic |  | Trigger and list corners. |
| `--font-body`, `--text-md`, `--text-sm`, `--weight-medium`, `--leading-tight` | semantic |  | Value, label and message type. |
| `--space-1`, `--space-2`, `--space-3` | semantic |  | Gaps, padding and the list offset. |

## Template

```html
<div class="field">
  <span class="label" data-if="label">{{label}}</span>
  <span class="control" tabindex="0">
    <ui-icon data-if="icon" name="{{icon}}" size="small"></ui-icon>
    <span class="value" data-if="value">{{value}}</span>
    <span class="value placeholder" data-if="!value">{{placeholder}}</span>
    <ui-icon class="chev" name="chevron-down" size="small"></ui-icon>
  </span>
  <div class="list" role="listbox"><slot></slot></div>
  <span class="message error" data-if="error">{{error}}</span>
  <span class="message" data-if="!error"><span data-if="helper">{{helper}}</span></span>
</div>
```

## Style

```css
:host { display: block; min-width: 10rem; position: relative; }
.field { display: flex; flex-direction: column; gap: var(--space-1); font-family: var(--font-body); position: relative; }
.label { font: var(--weight-medium) var(--text-sm) / var(--leading-tight) var(--font-body); }
.control {
  display: flex; align-items: center; gap: var(--space-2);
  height: var(--control-height-md, 36px); padding: 0 var(--space-3);
  border: 1px solid var(--color-border-strong); border-radius: var(--radius-md); background: var(--color-surface);
  font-size: var(--text-md); color: var(--color-text); cursor: pointer;
}
.value { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.placeholder { color: var(--color-text-subtle); }
.chev { color: var(--color-text-subtle); }
.control:hover, :host([state~="hover"]) .control { border-color: var(--color-text-subtle); }
.control:focus-visible, :host([state~="focus"]) .control, :host([state~="open"]) .control { outline: 0; border-color: var(--color-action); box-shadow: 0 0 0 3px var(--color-action-subtle); }
.list {
  display: none; position: absolute; top: 100%; left: 0; right: 0; z-index: 20; margin-top: var(--space-1);
  padding: var(--space-1); background: var(--color-surface); border: 1px solid var(--color-border);
  border-radius: var(--radius-md); box-shadow: var(--shadow-lg); flex-direction: column;
}
:host([state~="open"]) .list { display: flex; }
.message { font-size: var(--text-sm); color: var(--color-text-muted); }
.message:empty { display: none; }
:host([error]) .control { border-color: var(--color-danger); }
.error { color: var(--color-danger); }
:host([disabled]) .control { background: var(--color-surface-sunken); color: var(--color-text-disabled); pointer-events: none; }
```

## Example

```xml
<div layout="row" gap="4" align="start">
  <ui-select label="Status" value="Scheduled"/>
  <ui-select label="Assignee" state="open" value="Mere Tipene">
    <ui-option label="Unassigned"/>
    <ui-option label="Mere Tipene" selected=""/>
    <ui-option label="Sam Liu"/>
    <ui-option label="Priya Shah" disabled=""/>
  </ui-select>
  <ui-select placeholder="All regions" icon="map-pin"/>
</div>
```
