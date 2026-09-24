---
name: jui-text-search-control
version: 1.0.0
kind: composed
status: active
summary: TextSearchControl control — a text input that offers matching values from a list or store as you type.
---

# TextSearchControl (control)

## Purpose

Represents JUI's **TextSearchControl**: a single-line text input whose typing searches a set of candidate values
(fixed, `Controls.textsearch(cfg, "Sydney", "Melbourne")`, or a store) and offers the matches in a menu beneath
it. The value is the text, which may be one of the matches or free text. Use it for type-ahead entry such as
suburbs, tags or known names. Use `jui-selection-control` when the value must be one of the candidates, and
`jui-text-control` when there is nothing to suggest. Like all controls it draws no label; the enclosing
`jui-control-form-cell` or `jui-control-field` does.

## Anatomy

- **Input box** (JUI `.inner`) — optional leading icon (a lock when read-only), the input, an optional clear
  action (`x`) that replaces the trailing icon while there is text, and an optional trailing icon.
- **Menu** (JUI `SearchMenu`) — while open, the matching values one per line with dividers between them (default
  slot), or an empty message. JUI floats it over the page; the mockup draws it in the flow beneath the input.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| value | content | text | | The typed text (**Control values**). Absent shows the placeholder. |
| placeholder | content | text | | Hint shown while empty (JUI `placeholder`). |
| icon-left | content | icon | | Leading icon (JUI `iconLeft`). |
| icon-right | content | icon | | Trailing icon (JUI `iconRight`). |
| clear-action | variant | boolean | | Shows a clear (`x`) action while there is text (JUI `clearAction`). |
| empty-message | content | text | No matches | Shown in the open menu when nothing matches. |
| disabled | state | boolean | | Disabled (JUI `disable()`). |
| read-only | state | boolean | | Read-only: shows a lock (JUI `readOnly`). |
| invalid | state | boolean | | Failed validation: red border. |
| waiting | state | boolean | | Waiting for its value: pulsing blank box. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| icon-left | an icon | Say what is being searched (`search`, `map-pin`). |
| clear-action | present | Where clearing and starting again is common. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Neutral border. |
| Interaction | hover | `:hover` | The clear action darkens. |
| Interaction | focus | `:focus-within` | Focus-coloured border with a soft focus ring. |
| Disclosure | closed | Default | Only the input. |
| Disclosure | open | `state="open"` (in JUI: typing that finds matches) | Menu of matches beneath the input. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Sunken surface at half opacity, muted text. |
| Availability | read-only | `read-only` property | Read-only surface at half opacity; lock in place of the leading icon. |
| Validation | valid | Default | — |
| Validation | invalid | `invalid` property | Error-coloured border and ring. |
| Activity | idle | Default | — |
| Activity | waiting | `waiting` property | Content hidden; the box pulses. |
| Content | empty | No `value` | Placeholder shown; clear action hidden. |
| Content | filled | `value` set | Text shown; clear action shown when enabled. |
| Matches | listed | Matches in the default slot | One match per line, divided; the highlighted one (`data-active`) is shaded. |
| Matches | no-matches | Nothing in the default slot | The empty message. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | text | | One match per line | The matches shown while open, as plain elements (`div`). Mark the highlighted match with `data-active=""`; use `strong` inside a match to show the typed part. |

## Behaviour

Typing updates the value (**Control values**) and searches the candidates; when there are matches the menu opens
beneath the input. Choosing a match puts it in the input and closes the menu; Escape or clicking elsewhere closes
it and keeps the typed text.

## Content rules

The placeholder says what can be searched (`Start typing a suburb`).

## Accessibility

A real `input`; the menu behaves as a list of suggestions navigated with the arrow keys and chosen with Enter.
The label comes from the enclosing field or cell.

## Rules of use

- Show the menu with `state="open"` and put the matches in the default slot.
- If free text must not be accepted, use `jui-selection-control`.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-ctl-height`, `--jui-ctl-border`, `--jui-ctl-border-radius`, `--jui-ctl-bg`, `--jui-ctl-text`, `--jui-ctl-text-placeholder`, `--jui-ctl-action`, `--jui-ctl-action-readonly` | semantic | | Input box, text, placeholder and icons. |
| `--jui-ctl-text-disabled`, `--jui-ctl-text-readonly`, `--jui-ctl-text-offset` | semantic | | Disabled and read-only text; highlighted match. |
| `--jui-ctl-focus`, `--jui-ctl-focus-offset`, `--jui-ctl-err-focus`, `--jui-ctl-err-focus-offset` | semantic | | Focus and invalid borders and rings. |
| `--jui-ctl-bg-disabled`, `--jui-ctl-opacity-disabled`, `--jui-ctl-bg-readonly`, `--jui-ctl-opacity-readonly` | semantic | | Disabled and read-only surfaces. |
| `--jui-ctl-bg-wait`, `--jui-role-surface-muted`, `--jui-role-surface-raised` | semantic | | Waiting surface and its pulse. |
| `--jui-color-neutral05`, `--jui-color-neutral10`, `--jui-color-neutral40` | semantic | | Match list surface, dividers and menu shadow (JUI's `#fcfcfc`, `#eee`, `#999`). |

## Template

```html
<div class="inner">
  <jui-icon data-if="icon-left" class="left" name="{{icon-left}}"></jui-icon>
  <jui-icon class="lock" name="lock"></jui-icon>
  <input type="text" value="{{value}}" placeholder="{{placeholder}}">
  <jui-icon data-if="clear-action" class="clear" name="x"></jui-icon>
  <jui-icon data-if="icon-right" class="right" name="{{icon-right}}"></jui-icon>
</div>
<div class="selector">
  <div class="menu">
    <div class="list"><slot></slot></div>
    <div class="empty">{{empty-message}}</div>
  </div>
</div>
```

## Style

```css
:host { display: block; }
.inner {
  margin: 2px 0; height: var(--jui-ctl-height); box-sizing: content-box; padding: 0 0.75em;
  border: 1px solid var(--jui-ctl-border); border-radius: var(--jui-ctl-border-radius);
  background: var(--jui-ctl-bg); color: var(--jui-ctl-text);
  display: flex; flex-direction: row; align-items: center; gap: 0.5em;
}
input { flex: 1; min-width: 0; width: 100%; padding: 0; margin: 0; border: none; outline: none; background: inherit; color: inherit; font: inherit; font-size: 1em; }
input::placeholder { color: var(--jui-ctl-text-placeholder); }
jui-icon { color: var(--jui-ctl-action); }
.lock { display: none; }
.clear { color: var(--jui-ctl-text-placeholder); cursor: pointer; display: none; }
:host([value]:not([value=""])) .clear { display: inline-flex; }
:host([value]:not([value=""])[clear-action]) .right { display: none; }
:host(:hover) .clear, :host([state~="hover"]) .clear { color: var(--jui-ctl-text); }
:host(:focus-within) .inner, :host([state~="focus"]) .inner { border-color: var(--jui-ctl-focus); box-shadow: 0 0 0 2px var(--jui-ctl-focus-offset); }
:host([invalid]) .inner { border-color: var(--jui-ctl-err-focus); box-shadow: 0 0 0 1px var(--jui-ctl-err-focus-offset); }
:host([invalid]:focus-within) .inner, :host([invalid][state~="focus"]) .inner { box-shadow: 0 0 3px 1px var(--jui-ctl-err-focus-offset); }
:host([disabled]) .inner { background: var(--jui-ctl-bg-disabled); opacity: var(--jui-ctl-opacity-disabled); cursor: not-allowed; }
:host([disabled]) input { color: var(--jui-ctl-text-disabled); pointer-events: none; }
:host([read-only]) .inner { background: var(--jui-ctl-bg-readonly); opacity: var(--jui-ctl-opacity-readonly); cursor: not-allowed; }
:host([read-only]) input { color: var(--jui-ctl-text-readonly); pointer-events: none; }
:host([read-only]) jui-icon { color: var(--jui-ctl-action-readonly); }
:host([read-only]) .left, :host([read-only]) .clear, :host([disabled]) .clear { display: none; }
:host([read-only]) .lock { display: inline-flex; color: var(--jui-ctl-action); }
:host([waiting]) .inner { animation: jui-waiting 1s infinite; border-color: transparent; background-color: var(--jui-ctl-bg-wait); box-shadow: none; }
:host([waiting]) .inner > * { visibility: hidden; }
@keyframes jui-waiting { from { background-color: var(--jui-role-surface-muted); } to { background-color: var(--jui-role-surface-raised); } }
/* Menu (JUI SearchMenu), drawn in the flow beneath the input. */
.selector { display: none; padding: 0.25em 0; }
:host([state~="open"]) .selector { display: block; }
:host([disabled]) .selector, :host([read-only]) .selector, :host([waiting]) .selector { display: none; }
.menu {
  min-width: 10em; display: flex; flex-direction: column; overflow: hidden; padding: 0.5em 0;
  background: var(--jui-ctl-bg); border: 1px solid var(--jui-ctl-border); border-radius: var(--jui-ctl-border-radius);
  box-shadow: 0 0 8px var(--jui-color-neutral40);
}
.list { background: var(--jui-color-neutral05); cursor: pointer; }
::slotted(*) { display: block; padding: 0.2em 1em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
::slotted(:not(:first-child)) { border-top: 1px solid var(--jui-color-neutral10); }
::slotted(:hover), ::slotted([data-active]) { background: var(--jui-ctl-text-offset); }
.empty { display: none; margin: 1em; text-align: center; color: var(--jui-ctl-text-disabled); }
:host(:not([data-filled~="default"])) .empty, :host([state~="no-matches"]) .empty { display: block; }
:host(:not([data-filled~="default"])) .list { display: none; }
```

## Example

```xml
<div layout="grid" cols="3" gap="4" align="start">
  <jui-text-search-control placeholder="Start typing a suburb" icon-left="map-pin"/>
  <jui-text-search-control value="Syd" icon-left="map-pin" clear-action="" state="open focus">
    <div data-active=""><strong>Syd</strong>ney</div>
    <div><strong>Syd</strong>enham</div>
    <div>North <strong>Syd</strong>ney</div>
  </jui-text-search-control>
  <jui-text-search-control value="Zzz" icon-left="map-pin" empty-message="No matching suburbs" state="open focus"/>
  <jui-text-search-control value="Newtown" invalid=""/>
  <jui-text-search-control value="Newtown" disabled=""/>
  <jui-text-search-control value="Newtown" read-only="" icon-left="map-pin"/>
</div>
```
