---
name: jui-multi-selection-control
version: 1.0.0
kind: composed
status: active
summary: MultiSelectionControl control — a dropdown for picking several values, shown as text or as chips, with a checkbox list menu.
---

# MultiSelectionControl (control)

## Purpose

Represents JUI's **MultiSelectionControl**: pick any number of values from a fixed or store-backed list (value
type `List<V>`). The selection shows in the box as text or as removable chips; the menu lists the options with a
checkbox each. Use it for tags, assignees, categories. Use `jui-selection-control` for exactly one value, a
checkbox `jui-selection-group-control` when there are only a few options that should all be visible, and
`jui-multi-check-control` for a compact segmented on/off set. The control draws no label; the enclosing
`jui-control-form-cell` or `jui-control-field` does.

## Anatomy

- **Selector box** (JUI `.inner`) — the selection as text (`value`) or as chips (the `chips` slot, JUI `.inner.chip`
  with one `span.chip` per value, each with a remove `x`), or the placeholder; a clear action (`x`); a lock when
  read-only; the open chevron.
- **Menu** (JUI `SelectorMenu`) — while open, beneath the box: a keyword search box and the options, each with a
  checkbox, ticked when selected (default slot); an empty message when there are none.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| value | content | text | | The selection as text, such as `Design, Research` (**Control values**). Ignored when chips are given. |
| placeholder | content | text | | Shown while nothing is selected (JUI `placeholder`). |
| allow-empty | variant | boolean | | Shows a clear (`x`) action that empties the selection. |
| hide-search | variant | boolean | | Hides the keyword search box in the menu (JUI `allowSearch(false)`). |
| keywords | content | text | | Keywords typed into the menu's search box. |
| empty-message | content | text | No items | Shown in the menu when there are no options. |
| disabled | state | boolean | | Disabled (JUI `disable()`). |
| read-only | state | boolean | | Read-only: lock shown, cannot open (JUI `readOnly`). |
| invalid | state | boolean | | Failed validation: red border. |
| waiting | state | boolean | | Waiting for its value: pulsing blank box. |

## Variants

The selection shows as text (set `value`) or as chips (put one `span` per selected value in the `chips` slot).
Chips suit a handful of short values that people remove individually; text suits long lists or summaries such
as `3 selected`.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Neutral border; chevron down. |
| Interaction | hover | `:hover` | The clear action darkens. |
| Interaction | focus | `:focus-within` | Focus-coloured border with a soft focus ring. |
| Disclosure | closed | Default | Only the box. |
| Disclosure | open | `:focus-within`, or `state="open"` | Menu beneath the box; chevron turned over. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Sunken surface at half opacity; does not open. |
| Availability | read-only | `read-only` property | Read-only surface at half opacity with a lock; does not open. |
| Validation | valid | Default | — |
| Validation | invalid | `invalid` property | Error-coloured border and ring. |
| Activity | idle | Default | — |
| Activity | waiting | `waiting` property | Content hidden; the box pulses. |
| Content | empty | No `value` and no chips | Placeholder in the light text colour. |
| Content | filled | `value` or chips | The selection. |
| Options | listed | Options in the default slot | Options with checkboxes; `data-selected` ticks one, `data-active` highlights it. |
| Options | no-options | Nothing in the default slot | The empty message. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | text | | One option per line, with a checkbox | The options in the open menu, as plain elements (`div`). Tick selected ones with `data-selected=""`; highlight one with `data-active=""`. |
| chips | text | | Chips wrapping in the box | The selected values as chips, one plain `span` each (write `slot="chips"`). |

## Behaviour

Clicking the box opens the menu. Ticking an option adds it to the selection, unticking removes it; the menu stays
open for further choices. A chip's `x` removes that value; the clear action removes all. Each change is reported
(**Control values**). Escape or clicking elsewhere closes the menu.

## Content rules

Option and chip labels are short nouns in sentence case.

## Accessibility

The box is focusable and opens with Enter or Space; arrow keys move through the options and Space toggles one.
Each chip's remove action needs an accessible name (`Remove Design`).

## Rules of use

- Keep chips to a few short values; switch to text (`3 selected`) when the selection can be long.
- Show the menu with `state="open"` and mark the ticked options with `data-selected`.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-selectctl-border` | component | `--jui-ctl-border` | Box and menu border. |
| `--jui-selectctl-text` | component | `--jui-ctl-text` | Value colour; icons on hover. |
| `--jui-selectctl-text-light` | component | `--jui-ctl-text-placeholder` | Chevron and clear colour. |
| `--jui-selectctl-bg` | component | `--jui-ctl-bg` | Box surface. |
| `--jui-selectctl-chip-border-radius` | component | `12px` | Chip radius. |
| `--jui-selectctl-chip-size` | component | `0.9em` | Chip text size. |
| `--jui-ctl-border`, `--jui-ctl-text`, `--jui-ctl-text-placeholder`, `--jui-ctl-bg`, `--jui-ctl-height`, `--jui-ctl-border-radius`, `--jui-ctl-font`, `--jui-ctl-action` | semantic | | The control family defaults. |
| `--jui-ctl-text-offset`, `--jui-ctl-text-disabled`, `--jui-ctl-active` | semantic | | Highlighted option, empty message, ticked checkbox. |
| `--jui-ctl-focus`, `--jui-ctl-focus-offset`, `--jui-ctl-err-focus`, `--jui-ctl-err-focus-offset` | semantic | | Focus and invalid borders and rings. |
| `--jui-ctl-bg-disabled`, `--jui-ctl-opacity-disabled`, `--jui-ctl-bg-readonly`, `--jui-ctl-opacity-readonly` | semantic | | Disabled and read-only surfaces. |
| `--jui-ctl-bg-wait`, `--jui-role-surface-muted`, `--jui-role-surface-raised` | semantic | | Waiting surface and its pulse. |
| `--jui-color-aux-white`, `--jui-color-neutral05`, `--jui-color-neutral10`, `--jui-color-neutral20`, `--jui-color-neutral30`, `--jui-role-border-strong` | semantic | | Chip surface and border (JUI `#eaeaea`, `#ddd`), menu surfaces, divider, shadow, checkbox border. |

## Template

```html
<div class="control" tabindex="0">
  <div class="inner">
    <span class="content chips"><slot name="chips"></slot></span>
    <span class="content text" data-if="value">{{value}}</span>
    <span class="content text placeholder" data-if="!value">{{placeholder}}</span>
    <jui-icon class="lock" name="lock"></jui-icon>
    <jui-icon data-if="allow-empty" class="remove" name="x"></jui-icon>
    <jui-icon class="open" name="chevron-down"></jui-icon>
  </div>
  <div class="selector">
    <div class="menu">
      <div class="search" data-if="!hide-search"><div><jui-icon name="search"></jui-icon><input type="text" value="{{keywords}}"></div></div>
      <div class="list"><slot></slot></div>
      <div class="empty">{{empty-message}}</div>
    </div>
  </div>
</div>
```

## Style

```css
:host {
  display: block;
  --jui-selectctl-border: var(--jui-ctl-border);
  --jui-selectctl-text: var(--jui-ctl-text);
  --jui-selectctl-text-light: var(--jui-ctl-text-placeholder);
  --jui-selectctl-bg: var(--jui-ctl-bg);
  --jui-selectctl-chip-border-radius: 12px;
  --jui-selectctl-chip-size: 0.9em;
}
.control { outline: none; cursor: pointer; }
.inner {
  margin: 2px 0; min-height: var(--jui-ctl-height); box-sizing: content-box; padding: 0 0.75em;
  border: 1px solid var(--jui-selectctl-border); border-radius: var(--jui-ctl-border-radius);
  background: var(--jui-selectctl-bg); color: var(--jui-selectctl-text);
  display: flex; flex-direction: row; align-items: center; gap: 0.75em;
}
.content { flex-grow: 1; min-width: 3em; padding: 0.35em 0.15em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: var(--jui-ctl-font); }
.placeholder { color: var(--jui-ctl-text-placeholder); }
.chips { display: none; gap: 0.25em; flex-wrap: wrap; min-height: 1.8em; align-items: center; }
:host([data-filled~="chips"]) .chips { display: flex; }
:host([data-filled~="chips"]) .text { display: none; }
:host([data-filled~="chips"]) .inner { padding: 0 0.75em 0 0.25em; }
::slotted([slot="chips"]) {
  display: flex; align-items: center; white-space: nowrap; max-width: 100%; cursor: default;
  padding: 0.25em 0.75em; font-size: var(--jui-selectctl-chip-size); border-radius: var(--jui-selectctl-chip-border-radius);
  background-color: var(--jui-color-neutral10); border: 1px solid var(--jui-color-neutral20);
}
::slotted([slot="chips"])::after { content: "\00d7"; margin-left: 0.75em; cursor: pointer; }
.lock { display: none; color: var(--jui-ctl-action); }
.open, .remove { color: var(--jui-selectctl-text-light); transition: transform 0.1s; }
.remove { visibility: hidden; }
:host([value]:not([value=""])) .remove, :host([data-filled~="chips"]) .remove { visibility: visible; }
.open:hover, .remove:hover, :host([state~="hover"]) .remove { color: var(--jui-selectctl-text); }
:host(:focus-within) .inner, :host([state~="focus"]) .inner { border-color: var(--jui-ctl-focus); box-shadow: 0 0 0 2px var(--jui-ctl-focus-offset); }
:host([invalid]) .inner { border-color: var(--jui-ctl-err-focus); box-shadow: 0 0 0 1px var(--jui-ctl-err-focus-offset); }
:host([invalid]:focus-within) .inner, :host([invalid][state~="focus"]) .inner { box-shadow: 0 0 3px 1px var(--jui-ctl-err-focus-offset); }
:host([disabled]) .inner { background: var(--jui-ctl-bg-disabled); opacity: var(--jui-ctl-opacity-disabled); cursor: not-allowed; }
:host([read-only]) .inner { background: var(--jui-ctl-bg-readonly); opacity: var(--jui-ctl-opacity-readonly); cursor: not-allowed; }
:host([read-only]) .lock { display: inline-flex; }
:host([disabled]) .control, :host([read-only]) .control { pointer-events: none; }
:host([waiting]) .inner { animation: jui-waiting 1s infinite; border-color: transparent; background-color: var(--jui-ctl-bg-wait); box-shadow: none; }
:host([waiting]) .inner > * { visibility: hidden; }
@keyframes jui-waiting { from { background-color: var(--jui-role-surface-muted); } to { background-color: var(--jui-role-surface-raised); } }
/* Menu (JUI SelectorMenu), drawn in the flow beneath the box. */
.selector { display: none; padding: 0.35em 0; cursor: default; }
:host(:focus-within) .selector, :host([state~="open"]) .selector { display: block; }
:host(:focus-within) .open, :host([state~="open"]) .open { transform: rotate(180deg); }
:host([disabled]) .selector, :host([read-only]) .selector, :host([waiting]) .selector { display: none; }
.menu {
  min-width: 10em; display: flex; flex-direction: column; overflow: hidden; padding: 0.25em 0;
  background: var(--jui-ctl-bg); border: 1px solid var(--jui-selectctl-border); border-radius: var(--jui-ctl-border-radius);
  box-shadow: 0 0 10px var(--jui-color-neutral30);
}
.search { padding: 0.25em 0.5em 0.5em 0.5em; border-bottom: 1px solid var(--jui-color-neutral20); }
.search > div {
  display: flex; align-items: center; gap: 0.5em; padding: 0.25em;
  border: 1px solid var(--jui-selectctl-border); border-radius: var(--jui-ctl-border-radius); background: var(--jui-color-aux-white);
}
.search > div:focus-within { border-color: var(--jui-ctl-focus); box-shadow: 0 0 0 2px var(--jui-ctl-focus-offset); }
.search jui-icon { color: var(--jui-selectctl-text-light); }
.search input { flex: 1; min-width: 0; border: none; outline: none; font: inherit; font-size: 1em; background: transparent; color: var(--jui-selectctl-text); }
.list { background: var(--jui-color-neutral05); cursor: pointer; }
::slotted(:not([slot])) { display: flex; align-items: center; gap: 0.5em; padding: 0.2em 1em 0.2em 0.5em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
::slotted(:not([slot]))::before {
  content: ""; flex: none; width: 1.25em; height: 1.25em; box-sizing: border-box; border-radius: 3px; font-size: 0.8em; line-height: 1.15em; text-align: center; font-weight: 600;
  border: 1px solid var(--jui-role-border-strong); background: var(--jui-color-aux-white); color: var(--jui-color-aux-white);
}
::slotted([data-selected])::before { content: "\2713"; background: var(--jui-ctl-active); border-color: var(--jui-ctl-active); }
::slotted(:not([slot]):hover), ::slotted([data-active]) { background: var(--jui-ctl-text-offset); }
.empty { display: none; margin: 1em; text-align: center; color: var(--jui-ctl-text-disabled); }
:host(:not([data-filled~="default"])) .empty, :host([state~="no-options"]) .empty { display: block; }
:host(:not([data-filled~="default"])) .list { display: none; }
```

## Example

```xml
<div layout="grid" cols="3" gap="4" align="start">
  <jui-multi-selection-control placeholder="Select tags"/>
  <jui-multi-selection-control value="Design, Research" allow-empty=""/>
  <jui-multi-selection-control allow-empty="">
    <span slot="chips">Design</span>
    <span slot="chips">Research</span>
  </jui-multi-selection-control>
  <jui-multi-selection-control placeholder="Select tags" invalid=""/>
  <jui-multi-selection-control value="Design, Research" disabled=""/>
  <jui-multi-selection-control value="Design, Research" read-only=""/>
  <jui-control-field label="Teams" span="full">
    <jui-multi-selection-control state="open focus" allow-empty="">
      <span slot="chips">Design</span>
      <span slot="chips">Research</span>
      <div data-selected="">Design</div>
      <div>Engineering</div>
      <div data-active="">Marketing</div>
      <div data-selected="">Research</div>
    </jui-multi-selection-control>
  </jui-control-field>
</div>
```
