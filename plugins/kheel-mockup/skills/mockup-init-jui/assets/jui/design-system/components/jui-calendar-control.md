---
name: jui-calendar-control
version: 1.0.0
kind: composed
status: active
summary: CalendarControl control — a date field that opens a month calendar to pick a date.
---

# CalendarControl (control)

## Purpose

Represents JUI's **CalendarControl**: a date picker. The field shows the chosen date; clicking it opens a month
calendar to pick from, with previous and next month navigation. Use it for any single date (due dates, dates of
birth, effective dates). The control draws no label; the enclosing `jui-control-form-cell` or `jui-control-field`
provides it. For a date that is really free text (such as "early March") use `jui-text-control`.

## Anatomy

- **Date field** (JUI `.inner`, 16em wide) — a calendar icon (a lock when read-only), the date (or placeholder)
  and an optional clear action (`x`) shown while a date is set.
- **Calendar** (JUI `#selector`) — while open, beneath the field: a month header with previous and next arrows,
  then a table of weekday headings and dates. Dates outside the month are greyed; today is marked in the accent
  colour with a dot beneath; the selected date is filled. JUI floats the calendar over the page; the mockup draws
  it in the flow beneath the field.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| value | content | text | | The chosen date as displayed, such as `15 Sep 2026` (**Control values**). |
| placeholder | content | text | | Shown while no date is set (JUI `placeholder`). |
| clear-action | variant | boolean | | Shows a clear (`x`) action while a date is set (JUI `clearAction`). |
| month | content | text | September 2026 | The month shown in the open calendar's header. The grid is a fixed five-week month starting on a Tuesday. |
| selected-day | content | number | | Day of the month drawn as selected in the open calendar (1–30). |
| today | content | number | | Day of the month drawn as today (1–30). |
| disabled | state | boolean | | Disabled (JUI `disable()`). |
| read-only | state | boolean | | Read-only: lock in place of the calendar icon (JUI `readOnly`). |
| invalid | state | boolean | | Failed validation: red border. |
| waiting | state | boolean | | Waiting for its value: pulsing blank box. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| clear-action | present | Optional dates that can be removed again. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Neutral border. |
| Interaction | hover | `:hover` | Hover border (the same as rest in the standard style); dates shade on hover. |
| Interaction | focus | `:focus-within` | Focus-coloured border with a soft focus ring. |
| Disclosure | closed | Default | Only the field. |
| Disclosure | open | `:focus-within`, or `state="open"` | Calendar beneath the field. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Sunken surface at half opacity, muted text; does not open. |
| Availability | read-only | `read-only` property | Read-only surface at half opacity with a lock; does not open. |
| Validation | valid | Default | — |
| Validation | invalid | `invalid` property | Error-coloured border and ring. |
| Activity | idle | Default | — |
| Activity | waiting | `waiting` property | Content hidden; the box pulses. |
| Content | empty | No `value` | Placeholder; clear action hidden. |
| Content | filled | `value` set | The date; clear action shown when enabled. |

## Behaviour

Clicking the field opens the calendar at the month of the current value (or today). The arrows move a month back
or forward. Clicking a date sets the value, closes the calendar and reports the change (**Control values**).
Dates outside the allowed range are shown disabled and cannot be picked. The clear action removes the date.

## Content rules

Show dates in the product's standard short format (`15 Sep 2026`). The placeholder shows the expected format or
says what to pick (`Select a date`).

## Accessibility

The field is focusable and opens with Enter; arrow keys move between dates and Enter picks one. The label comes
from the enclosing field or cell.

## Rules of use

- Show the calendar with `state="open"`; set `selected-day` to match `value`.
- Use one control per date; for a range use two, labelled `From` and `To`.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-calendarctl-icon` | component | `--jui-ctl-text-placeholder` | Calendar icon and clear action colour. |
| `--jui-calendarctl-selector-month-border` | component | `--jui-color-neutral20` | Border of a month arrow on hover (JUI `#e1e1e1`). |
| `--jui-calendarctl-selector-size` | component | `1em` | Calendar text size. |
| `--jui-calendarctl-selector-bg` | component | `--jui-color-aux-white` | Calendar surface. |
| `--jui-calendarctl-selector-shadow` | component | `--jui-color-neutral30` | Calendar shadow colour (JUI `#ccc`). |
| `--jui-calendarctl-selector-text` | component | `--jui-text` | Calendar text. |
| `--jui-calendarctl-selector-item` | component | `--jui-color-primary50` | Today's date and dot. |
| `--jui-calendarctl-selector-item-hover` | component | `--jui-color-primary40` | Date on hover. |
| `--jui-calendarctl-selector-item-selected` | component | `--jui-color-primary60` | Selected date fill. |
| `--cpt-calendarctl-bg` | component | `--jui-ctl-bg` | Field surface. |
| `--cpt-calendarctl-bg-hover` | component | `--cpt-calendarctl-bg` | Field surface on hover. |
| `--cpt-calendarctl-border` | component | `--jui-ctl-border` | Field border. |
| `--cpt-calendarctl-border-hover` | component | `--cpt-calendarctl-border` | Field border on hover. |
| `--cpt-calendarctl-border-radius` | component | `--jui-ctl-border-radius` | Field and calendar radius. |
| `--cpt-calendarctl-padding` | component | `0 0.75em` | Field padding. |
| `--cpt-calendarctl-height` | component | `--jui-ctl-height` | Field height. |
| `--cpt-calendarctl-gap` | component | `0.5em` | Gap between the field's parts. |
| `--cpt-calendarctl-icon` | component | `--jui-calendarctl-icon` | Calendar icon colour. |
| `--jui-ctl-bg`, `--jui-ctl-border`, `--jui-ctl-border-radius`, `--jui-ctl-height`, `--jui-ctl-text`, `--jui-ctl-text-placeholder`, `--jui-ctl-action`, `--jui-ctl-action-readonly`, `--jui-text` | semantic | | The control family defaults. |
| `--jui-ctl-text-disabled`, `--jui-ctl-text-readonly` | semantic | | Disabled and read-only text. |
| `--jui-ctl-focus`, `--jui-ctl-focus-offset`, `--jui-ctl-err-focus`, `--jui-ctl-err-focus-offset` | semantic | | Focus and invalid borders and rings. |
| `--jui-ctl-bg-disabled`, `--jui-ctl-opacity-disabled`, `--jui-ctl-bg-readonly`, `--jui-ctl-opacity-readonly` | semantic | | Disabled and read-only surfaces. |
| `--jui-ctl-bg-wait`, `--jui-role-surface-muted`, `--jui-role-surface-raised` | semantic | | Waiting surface and its pulse. |
| `--jui-color-primary40`, `--jui-color-primary50`, `--jui-color-primary60`, `--jui-color-aux-white`, `--jui-color-neutral20`, `--jui-color-neutral30` | semantic | | Calendar colours (above) and outside dates (JUI `#ccc`). |

## Template

```html
<div class="control" tabindex="0">
  <div class="inner">
    <jui-icon class="cal" name="calendar"></jui-icon>
    <jui-icon class="lock" name="lock"></jui-icon>
    <span class="content" data-if="value">{{value}}</span>
    <span class="content placeholder" data-if="!value">{{placeholder}}</span>
    <jui-icon data-if="clear-action" class="clear" name="x"></jui-icon>
  </div>
  <div class="selector">
    <div class="panel">
      <div class="months">
        <em><jui-icon name="chevron-left"></jui-icon></em>
        <div>{{month}}</div>
        <em><jui-icon name="chevron-right"></jui-icon></em>
      </div>
      <div class="dates">
        <table>
        <tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr>
        <tr><td class="outside">31</td><td class="d1">1<em></em></td><td class="d2">2<em></em></td><td class="d3">3<em></em></td><td class="d4">4<em></em></td><td class="d5">5<em></em></td><td class="d6">6<em></em></td></tr>
        <tr><td class="d7">7<em></em></td><td class="d8">8<em></em></td><td class="d9">9<em></em></td><td class="d10">10<em></em></td><td class="d11">11<em></em></td><td class="d12">12<em></em></td><td class="d13">13<em></em></td></tr>
        <tr><td class="d14">14<em></em></td><td class="d15">15<em></em></td><td class="d16">16<em></em></td><td class="d17">17<em></em></td><td class="d18">18<em></em></td><td class="d19">19<em></em></td><td class="d20">20<em></em></td></tr>
        <tr><td class="d21">21<em></em></td><td class="d22">22<em></em></td><td class="d23">23<em></em></td><td class="d24">24<em></em></td><td class="d25">25<em></em></td><td class="d26">26<em></em></td><td class="d27">27<em></em></td></tr>
        <tr><td class="d28">28<em></em></td><td class="d29">29<em></em></td><td class="d30">30<em></em></td><td class="outside">1</td><td class="outside">2</td><td class="outside">3</td><td class="outside">4</td></tr>
        </table>
      </div>
    </div>
  </div>
</div>
```

## Style

```css
:host {
  display: block; width: 16em;
  --jui-calendarctl-icon: var(--jui-ctl-text-placeholder);
  --jui-calendarctl-selector-month-border: var(--jui-color-neutral20);
  --jui-calendarctl-selector-size: 1em;
  --jui-calendarctl-selector-bg: var(--jui-color-aux-white);
  --jui-calendarctl-selector-shadow: var(--jui-color-neutral30);
  --jui-calendarctl-selector-text: var(--jui-text);
  --jui-calendarctl-selector-item: var(--jui-color-primary50);
  --jui-calendarctl-selector-item-hover: var(--jui-color-primary40);
  --jui-calendarctl-selector-item-selected: var(--jui-color-primary60);
  --cpt-calendarctl-bg: var(--jui-ctl-bg);
  --cpt-calendarctl-bg-hover: var(--cpt-calendarctl-bg);
  --cpt-calendarctl-border: var(--jui-ctl-border);
  --cpt-calendarctl-border-hover: var(--cpt-calendarctl-border);
  --cpt-calendarctl-border-radius: var(--jui-ctl-border-radius);
  --cpt-calendarctl-padding: 0 0.75em;
  --cpt-calendarctl-height: var(--jui-ctl-height);
  --cpt-calendarctl-gap: 0.5em;
  --cpt-calendarctl-icon: var(--jui-calendarctl-icon);
}
.control { outline: none; cursor: pointer; }
.inner {
  margin: 2px 0; height: var(--cpt-calendarctl-height); box-sizing: content-box; padding: var(--cpt-calendarctl-padding);
  border: 1px solid var(--cpt-calendarctl-border); border-radius: var(--cpt-calendarctl-border-radius);
  background: var(--cpt-calendarctl-bg); color: var(--jui-ctl-text);
  display: flex; flex-direction: row; align-items: center; gap: var(--cpt-calendarctl-gap);
}
.cal { color: var(--cpt-calendarctl-icon); }
.lock { display: none; color: var(--jui-ctl-action); }
.content { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.placeholder { color: var(--jui-ctl-text-placeholder); }
.clear { color: var(--jui-calendarctl-icon); visibility: hidden; transition: transform 0.2s ease; }
:host([value]:not([value=""])) .clear { visibility: visible; }
.clear:hover { transform: rotate(90deg); }
:host(:hover) .inner, :host([state~="hover"]) .inner { border-color: var(--cpt-calendarctl-border-hover); background: var(--cpt-calendarctl-bg-hover); }
:host(:hover) .clear, :host([state~="hover"]) .clear { color: var(--jui-ctl-text); }
:host(:focus-within) .inner, :host([state~="focus"]) .inner { border-color: var(--jui-ctl-focus); box-shadow: 0 0 0 2px var(--jui-ctl-focus-offset); }
:host([invalid]) .inner { border-color: var(--jui-ctl-err-focus); box-shadow: 0 0 0 1px var(--jui-ctl-err-focus-offset); }
:host([invalid]:focus-within) .inner, :host([invalid][state~="focus"]) .inner { box-shadow: 0 0 3px 1px var(--jui-ctl-err-focus-offset); }
:host([disabled]) .inner { background: var(--jui-ctl-bg-disabled); opacity: var(--jui-ctl-opacity-disabled); cursor: not-allowed; }
:host([disabled]) .content { color: var(--jui-ctl-text-disabled); }
:host([read-only]) .inner { background: var(--jui-ctl-bg-readonly); opacity: var(--jui-ctl-opacity-readonly); cursor: not-allowed; }
:host([read-only]) .content { color: var(--jui-ctl-text-readonly); }
:host([read-only]) .cal, :host([read-only]) .clear, :host([disabled]) .clear { display: none; }
:host([read-only]) .lock { display: inline-flex; }
:host([read-only]) jui-icon { color: var(--jui-ctl-action-readonly); }
:host([disabled]) .control, :host([read-only]) .control { pointer-events: none; }
:host([waiting]) .inner { animation: jui-waiting 1s infinite; border-color: transparent; background-color: var(--jui-ctl-bg-wait); box-shadow: none; }
:host([waiting]) .inner > * { visibility: hidden; }
@keyframes jui-waiting { from { background-color: var(--jui-role-surface-muted); } to { background-color: var(--jui-role-surface-raised); } }
/* Calendar (JUI #selector), drawn in the flow beneath the field. */
.selector { display: none; min-width: 210px; padding: 0.75em 0 0.25em 0; font-size: var(--jui-calendarctl-selector-size); cursor: default; }
:host(:focus-within) .selector, :host([state~="open"]) .selector { display: block; }
:host([disabled]) .selector, :host([read-only]) .selector, :host([waiting]) .selector { display: none; }
.panel {
  overflow: hidden; padding: 1em 0 0.25em 0; border-radius: var(--cpt-calendarctl-border-radius);
  background: var(--jui-calendarctl-selector-bg); color: var(--jui-calendarctl-selector-text);
  box-shadow: 0 0 8px var(--jui-calendarctl-selector-shadow);
}
.months { display: flex; align-items: center; padding: 2px 1em; }
.months > em { display: flex; align-items: center; justify-content: center; width: 1.5em; height: 1.5em; border: 1px solid transparent; border-radius: 3px; cursor: pointer; }
.months > em:hover { border-color: var(--jui-calendarctl-selector-month-border); }
.months > div { flex-grow: 1; text-align: center; font-weight: 600; }
.dates { padding: 0.25em 0.75em; }
table { width: 100%; border-collapse: separate; border-spacing: 0; }
th { font-weight: 600; text-align: center; padding: 4px 0; }
td { text-align: center; font-weight: 500; border-radius: 3px; position: relative; padding: 4px; cursor: pointer; }
td em { display: none; position: absolute; left: 50%; margin-left: -2px; bottom: 2px; width: 4px; height: 4px; border-radius: 10px; background: var(--jui-calendarctl-selector-item); }
td.outside { color: var(--jui-color-neutral30); }
td:not(.outside):hover { color: var(--jui-color-aux-white); background-color: var(--jui-calendarctl-selector-item-hover); }
td.outside:hover { color: var(--jui-color-aux-white); background-color: var(--jui-color-neutral30); }
td:hover em { background: var(--jui-color-aux-white); }
:host([today="1"]) .d1, :host([today="2"]) .d2, :host([today="3"]) .d3, :host([today="4"]) .d4, :host([today="5"]) .d5, :host([today="6"]) .d6, :host([today="7"]) .d7, :host([today="8"]) .d8, :host([today="9"]) .d9, :host([today="10"]) .d10, :host([today="11"]) .d11, :host([today="12"]) .d12, :host([today="13"]) .d13, :host([today="14"]) .d14, :host([today="15"]) .d15, :host([today="16"]) .d16, :host([today="17"]) .d17, :host([today="18"]) .d18, :host([today="19"]) .d19, :host([today="20"]) .d20, :host([today="21"]) .d21, :host([today="22"]) .d22, :host([today="23"]) .d23, :host([today="24"]) .d24, :host([today="25"]) .d25, :host([today="26"]) .d26, :host([today="27"]) .d27, :host([today="28"]) .d28, :host([today="29"]) .d29, :host([today="30"]) .d30 { color: var(--jui-calendarctl-selector-item); }
:host([today="1"]) .d1 em, :host([today="2"]) .d2 em, :host([today="3"]) .d3 em, :host([today="4"]) .d4 em, :host([today="5"]) .d5 em, :host([today="6"]) .d6 em, :host([today="7"]) .d7 em, :host([today="8"]) .d8 em, :host([today="9"]) .d9 em, :host([today="10"]) .d10 em, :host([today="11"]) .d11 em, :host([today="12"]) .d12 em, :host([today="13"]) .d13 em, :host([today="14"]) .d14 em, :host([today="15"]) .d15 em, :host([today="16"]) .d16 em, :host([today="17"]) .d17 em, :host([today="18"]) .d18 em, :host([today="19"]) .d19 em, :host([today="20"]) .d20 em, :host([today="21"]) .d21 em, :host([today="22"]) .d22 em, :host([today="23"]) .d23 em, :host([today="24"]) .d24 em, :host([today="25"]) .d25 em, :host([today="26"]) .d26 em, :host([today="27"]) .d27 em, :host([today="28"]) .d28 em, :host([today="29"]) .d29 em, :host([today="30"]) .d30 em { display: block; }
:host([selected-day="1"]) .d1, :host([selected-day="2"]) .d2, :host([selected-day="3"]) .d3, :host([selected-day="4"]) .d4, :host([selected-day="5"]) .d5, :host([selected-day="6"]) .d6, :host([selected-day="7"]) .d7, :host([selected-day="8"]) .d8, :host([selected-day="9"]) .d9, :host([selected-day="10"]) .d10, :host([selected-day="11"]) .d11, :host([selected-day="12"]) .d12, :host([selected-day="13"]) .d13, :host([selected-day="14"]) .d14, :host([selected-day="15"]) .d15, :host([selected-day="16"]) .d16, :host([selected-day="17"]) .d17, :host([selected-day="18"]) .d18, :host([selected-day="19"]) .d19, :host([selected-day="20"]) .d20, :host([selected-day="21"]) .d21, :host([selected-day="22"]) .d22, :host([selected-day="23"]) .d23, :host([selected-day="24"]) .d24, :host([selected-day="25"]) .d25, :host([selected-day="26"]) .d26, :host([selected-day="27"]) .d27, :host([selected-day="28"]) .d28, :host([selected-day="29"]) .d29, :host([selected-day="30"]) .d30 { color: var(--jui-color-aux-white); background-color: var(--jui-calendarctl-selector-item-selected); }
:host([selected-day="1"]) .d1 em, :host([selected-day="2"]) .d2 em, :host([selected-day="3"]) .d3 em, :host([selected-day="4"]) .d4 em, :host([selected-day="5"]) .d5 em, :host([selected-day="6"]) .d6 em, :host([selected-day="7"]) .d7 em, :host([selected-day="8"]) .d8 em, :host([selected-day="9"]) .d9 em, :host([selected-day="10"]) .d10 em, :host([selected-day="11"]) .d11 em, :host([selected-day="12"]) .d12 em, :host([selected-day="13"]) .d13 em, :host([selected-day="14"]) .d14 em, :host([selected-day="15"]) .d15 em, :host([selected-day="16"]) .d16 em, :host([selected-day="17"]) .d17 em, :host([selected-day="18"]) .d18 em, :host([selected-day="19"]) .d19 em, :host([selected-day="20"]) .d20 em, :host([selected-day="21"]) .d21 em, :host([selected-day="22"]) .d22 em, :host([selected-day="23"]) .d23 em, :host([selected-day="24"]) .d24 em, :host([selected-day="25"]) .d25 em, :host([selected-day="26"]) .d26 em, :host([selected-day="27"]) .d27 em, :host([selected-day="28"]) .d28 em, :host([selected-day="29"]) .d29 em, :host([selected-day="30"]) .d30 em { background: var(--jui-color-aux-white); }
```

## Example

```xml
<div layout="row" gap="6" wrap="" align="start">
  <div layout="column" gap="4">
    <jui-calendar-control placeholder="Select a date"/>
    <jui-calendar-control value="15 Sep 2026" clear-action=""/>
    <jui-calendar-control value="15 Sep 2026" state="focus"/>
    <jui-calendar-control placeholder="Select a date" invalid=""/>
    <jui-calendar-control value="15 Sep 2026" disabled=""/>
    <jui-calendar-control value="15 Sep 2026" read-only=""/>
    <jui-calendar-control value="15 Sep 2026" waiting=""/>
  </div>
  <jui-control-field label="Due date" required="">
    <jui-calendar-control value="15 Sep 2026" clear-action="" selected-day="15" today="24" state="open focus"/>
  </jui-control-field>
</div>
```
