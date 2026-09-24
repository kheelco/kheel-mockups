---
name: jui-selection-control
version: 1.0.0
kind: composed
status: active
summary: SelectionControl control — a single-select dropdown over a fixed or store-backed list, with keyword search in its menu.
---

# SelectionControl (control)

## Purpose

Represents JUI's **SelectionControl**: pick one value from a list of candidates, which may be fixed
(`Controls.selector(cfg, "Dr", "Other")`) or come from a store that loads and searches remotely. Use it for
choices with more than a handful of options, or whose options are data. The control draws only the selector;
its label and errors come from the enclosing `jui-control-form-cell` or `jui-control-field`. Use
`jui-multi-selection-control` to pick several values, `jui-selection-group-control` (radio) when there are only
two to five options that should all be visible, and `jui-text-search-control` when free text is allowed as well.

## Anatomy

- **Selector box** (JUI `.inner`) — an optional leading icon, an optional bold prompt, the selected value (or the
  placeholder), a clear action (`x`) when an empty value is allowed, a lock when read-only, and the open chevron,
  which turns over while the menu is open.
- **Menu** (JUI `SelectorMenu`) — shown beneath the box while open: a keyword search box, the list of options
  (default slot) and a message when there are none. In JUI the menu floats over the page; the mockup draws it
  in the flow, directly beneath the box.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| value | content | text | | The label of the selected value (**Control values**). Absent shows the placeholder. |
| placeholder | content | text | | Shown while nothing is selected (JUI `placeholder`). |
| icon-left | content | icon | | Leading icon (JUI `iconLeft`). |
| prompt | content | text | | A bold prompt before the value, such as `Status` (JUI `prompt`). |
| allow-empty | variant | boolean | | Shows a clear (`x`) action so the selection can be emptied (JUI `allowEmpty`). |
| hide-search | variant | boolean | | Hides the keyword search box in the menu (JUI `allowSearch(false)`). |
| keywords | content | text | | Keywords typed into the menu's search box. |
| empty-message | content | text | No items | Shown in the menu when there are no options (JUI `emptyUnfiltered` / `emptyFiltered`). |
| disabled | state | boolean | | Disabled (JUI `disable()`). |
| read-only | state | boolean | | Read-only: shows a lock and cannot be opened (JUI `readOnly`). |
| invalid | state | boolean | | Failed validation: red border. |
| waiting | state | boolean | | Waiting for its value: pulsing blank box. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| allow-empty | present | Optional choices that can be cleared back to nothing. |
| hide-search | present | Short fixed lists where searching adds nothing (`Dr`, `Mr`, `Other`). |
| prompt | text | Filter bars, where the prompt replaces a label: `Status: Open`. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Neutral border; chevron pointing down. |
| Interaction | hover | `:hover` | Hover border (the same as rest in the standard style); the clear action darkens. |
| Interaction | focus | `:focus-within` | Focus-coloured border with a soft focus ring. |
| Disclosure | closed | Default | Only the selector box. |
| Disclosure | open | `:focus-within`, or `state="open"` | Menu shown beneath the box; chevron turned over. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Sunken surface at half opacity, not-allowed cursor; does not open. |
| Availability | read-only | `read-only` property | Read-only surface at half opacity with a lock; does not open. |
| Validation | valid | Default | — |
| Validation | invalid | `invalid` property | Error-coloured border and ring. |
| Activity | idle | Default | — |
| Activity | waiting | `waiting` property | Content hidden; the box pulses. |
| Content | empty | No `value` | Placeholder in the light text colour; clear action hidden. |
| Content | filled | `value` set | The selected value's label. |
| Options | listed | Options in the default slot | The options, one per line; the highlighted one (`data-active`) is shaded. |
| Options | no-options | Nothing in the default slot | The empty message, centred in the menu. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | text | | One option per line | The options shown in the open menu, as plain elements (`div`), one per option. Mark the highlighted option with `data-active=""`. |

## Behaviour

Clicking the box opens the menu; typing in the search box filters the options (locally for a fixed list, through
the store for a searchable store). Choosing an option closes the menu, shows its label and reports the change
(**Control values**). The clear action empties the value. Escape or clicking elsewhere closes the menu without
changing the value. Disabled and read-only selectors do not open.

## Content rules

Option labels are short and distinct, in sentence case. The placeholder says what to choose (`Select a role`).

## Accessibility

The box is focusable and opens with Enter or Space; arrow keys move the highlight through the options and Enter
selects. The label comes from the enclosing field or cell.

## Rules of use

- For two to five options that should all be visible, use a radio `jui-selection-group-control` instead.
- Show the menu with `state="open"` to mock the list; put the options in the default slot.
- Keep the search box unless the list is short and fixed.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-selectctl-bg` | component | `--jui-ctl-bg` | Box surface. |
| `--cpt-selectctl-bg-hover` | component | `--cpt-selectctl-bg` | Surface on hover. |
| `--cpt-selectctl-border` | component | `--jui-ctl-border` | Box and menu border colour. |
| `--cpt-selectctl-border-radius` | component | `--jui-ctl-border-radius` | Box and menu radius. |
| `--cpt-selectctl-border-hover` | component | `--cpt-selectctl-border` | Border on hover. |
| `--cpt-selectctl-padding` | component | `0 0.75em` | Box padding. |
| `--cpt-selectctl-gap` | component | `0.75em` | Gap between the box's parts. |
| `--cpt-selectctl-text` | component | `--jui-ctl-text` | Value colour; clear and chevron on hover. |
| `--cpt-selectctl-text-light` | component | `--jui-ctl-text-placeholder` | Placeholder, chevron and clear colour. |
| `--cpt-selectctl-icon-color` | component | `--cpt-selectctl-text-light` | Leading icon colour. |
| `--cpt-selectctl-prompt-color` | component | `--cpt-selectctl-text-light` | Prompt colour. |
| `--cpt-selectctl-prompt-weight` | component | `600` | Prompt weight. |
| `--cpt-selectctl-height` | component | `--jui-ctl-height` | Box height. |
| `--jui-ctl-bg`, `--jui-ctl-border`, `--jui-ctl-border-radius`, `--jui-ctl-text`, `--jui-ctl-text-placeholder`, `--jui-ctl-height`, `--jui-ctl-font`, `--jui-ctl-action` | semantic | | The control family defaults. |
| `--jui-ctl-text-offset`, `--jui-ctl-text-disabled` | semantic | | Highlighted option and empty-message colours. |
| `--jui-ctl-focus`, `--jui-ctl-focus-offset`, `--jui-ctl-err-focus`, `--jui-ctl-err-focus-offset` | semantic | | Focus and invalid borders and rings; the focused search box. |
| `--jui-ctl-bg-disabled`, `--jui-ctl-opacity-disabled`, `--jui-ctl-bg-readonly`, `--jui-ctl-opacity-readonly` | semantic | | Disabled and read-only surfaces. |
| `--jui-ctl-bg-wait`, `--jui-role-surface-muted`, `--jui-role-surface-raised` | semantic | | Waiting surface and its pulse. |
| `--jui-color-aux-white`, `--jui-color-neutral05`, `--jui-color-neutral20`, `--jui-color-neutral30` | semantic | | Menu search-box surface, list surface, divider and shadow (JUI's `#fff`, `#fcfcfc`, `#eaeaea`, `#ccc`). |

## Template

```html
<div class="control" tabindex="0">
  <div class="inner">
    <jui-icon data-if="icon-left" class="icon-left" name="{{icon-left}}"></jui-icon>
    <span class="prompt" data-if="prompt">{{prompt}}</span>
    <span class="content" data-if="value">{{value}}</span>
    <span class="content placeholder" data-if="!value">{{placeholder}}</span>
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
  --cpt-selectctl-bg: var(--jui-ctl-bg);
  --cpt-selectctl-bg-hover: var(--cpt-selectctl-bg);
  --cpt-selectctl-border: var(--jui-ctl-border);
  --cpt-selectctl-border-radius: var(--jui-ctl-border-radius);
  --cpt-selectctl-border-hover: var(--cpt-selectctl-border);
  --cpt-selectctl-padding: 0 0.75em;
  --cpt-selectctl-gap: 0.75em;
  --cpt-selectctl-text: var(--jui-ctl-text);
  --cpt-selectctl-text-light: var(--jui-ctl-text-placeholder);
  --cpt-selectctl-icon-color: var(--cpt-selectctl-text-light);
  --cpt-selectctl-prompt-color: var(--cpt-selectctl-text-light);
  --cpt-selectctl-prompt-weight: 600;
  --cpt-selectctl-height: var(--jui-ctl-height);
}
.control { outline: none; cursor: pointer; }
.inner {
  margin: 2px 0; height: var(--cpt-selectctl-height); box-sizing: content-box; padding: var(--cpt-selectctl-padding);
  border: 1px solid var(--cpt-selectctl-border); border-radius: var(--cpt-selectctl-border-radius);
  background: var(--cpt-selectctl-bg); color: var(--cpt-selectctl-text);
  display: flex; flex-direction: row; align-items: center; gap: var(--cpt-selectctl-gap);
}
.icon-left { color: var(--cpt-selectctl-icon-color); }
.prompt { color: var(--cpt-selectctl-prompt-color); font-weight: var(--cpt-selectctl-prompt-weight); white-space: nowrap; }
.content { flex-grow: 1; min-width: 3em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: var(--jui-ctl-font); }
.placeholder { color: var(--cpt-selectctl-text-light); }
.lock { display: none; color: var(--jui-ctl-action); }
.open, .remove { color: var(--cpt-selectctl-text-light); transition: transform 0.1s; }
.remove { visibility: hidden; }
:host([value]:not([value=""])) .remove { visibility: visible; }
.open:hover, .remove:hover { color: var(--cpt-selectctl-text); }
:host(:hover) .inner, :host([state~="hover"]) .inner { border-color: var(--cpt-selectctl-border-hover); background: var(--cpt-selectctl-bg-hover); }
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
.selector { display: none; padding: 0.25em 0; cursor: default; }
:host(:focus-within) .selector, :host([state~="open"]) .selector { display: block; }
:host(:focus-within) .open, :host([state~="open"]) .open { transform: rotate(180deg); }
:host([disabled]) .selector, :host([read-only]) .selector, :host([waiting]) .selector { display: none; }
.menu {
  min-width: 10em; display: flex; flex-direction: column; overflow: hidden; padding: 0.25em 0;
  background: var(--jui-ctl-bg); border: 1px solid var(--cpt-selectctl-border); border-radius: var(--cpt-selectctl-border-radius);
  box-shadow: 0 0 10px var(--jui-color-neutral30);
}
.search { padding: 0.25em 0.5em 0.5em 0.5em; border-bottom: 1px solid var(--jui-color-neutral20); }
.search > div {
  display: flex; align-items: center; gap: 0.5em; padding: 0.25em;
  border: 1px solid var(--cpt-selectctl-border); border-radius: var(--cpt-selectctl-border-radius); background: var(--jui-color-aux-white);
}
.search > div:focus-within { border-color: var(--jui-ctl-focus); box-shadow: 0 0 0 2px var(--jui-ctl-focus-offset); }
.search jui-icon { color: var(--cpt-selectctl-text-light); }
.search input { flex: 1; min-width: 0; border: none; outline: none; font: inherit; font-size: 1em; background: transparent; color: var(--cpt-selectctl-text); }
.list { background: var(--jui-color-neutral05); cursor: pointer; }
::slotted(*) { display: flex; align-items: center; padding: 0.2em 1em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
::slotted(:hover), ::slotted([data-active]) { background: var(--jui-ctl-text-offset); }
.empty { display: none; margin: 1em; text-align: center; color: var(--jui-ctl-text-disabled); }
:host(:not([data-filled~="default"])) .empty, :host([state~="no-options"]) .empty { display: block; }
:host(:not([data-filled~="default"])) .list { display: none; }
```

## Example

```xml
<div layout="column" gap="4">
  <div layout="grid" cols="3" gap="4">
    <jui-selection-control placeholder="Select a role"/>
    <jui-selection-control value="Administrator" allow-empty=""/>
    <jui-selection-control prompt="Status" value="Open" icon-left="filter"/>
    <jui-selection-control value="Focused" state="focus"/>
    <jui-selection-control placeholder="Select a role" invalid=""/>
    <jui-selection-control value="Administrator" disabled=""/>
    <jui-selection-control value="Administrator" read-only=""/>
    <jui-selection-control value="Loading" waiting=""/>
  </div>
  <div layout="grid" cols="3" gap="4" align="start">
    <jui-control-field label="Owner / operator">
      <jui-selection-control value="Jill Jones" state="open focus" allow-empty="">
        <div>Anne Smith</div>
        <div data-active="">Jill Jones</div>
        <div>Mark Brown</div>
        <div>Tom Walker</div>
      </jui-selection-control>
    </jui-control-field>
    <jui-control-field label="Title">
      <jui-selection-control placeholder="Title" hide-search="" state="open focus">
        <div>Dr</div>
        <div>Mr</div>
        <div>Other</div>
      </jui-selection-control>
    </jui-control-field>
    <jui-control-field label="Customer">
      <jui-selection-control placeholder="Select customer" keywords="zzz" empty-message="No matching customers" state="open focus"/>
    </jui-control-field>
  </div>
</div>
```
