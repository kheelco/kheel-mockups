---
name: jui-panel-selection-control
version: 1.0.0
kind: elemental
status: active
summary: PanelSelectionControl control — a multi-selection drawn as a grid of selectable tiles.
---

# PanelSelectionControl (control)

## Purpose

Represents JUI's **PanelSelectionControl**: several options shown as a grid of tiles (panels), each with an
optional icon, a title and a short description; clicking a tile selects or deselects it, and the value is the set
of selected options. Use it when options are few (up to about nine), visual and worth explaining — modules to
enable, interests, integrations. Use a checkbox `jui-selection-group-control` for the same choice in a compact
list, and `jui-multi-selection-control` for many options. Its label comes from the enclosing
`jui-control-form-cell` or `jui-control-field`.

## Anatomy

A grid of tiles (default slot). Each tile is a bordered, rounded panel holding its content — typically a
`jui-icon`, a `strong` title and a `p` description — with a tick badge in the top-right corner when selected;
selected tiles are outlined and tinted in the active colour.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| columns | variant | 2, 3, 4 | 3 | Tiles per row. |
| disabled | state | boolean | | Disabled (JUI `disable()`). |
| read-only | state | boolean | | Read-only (JUI `readOnly`). |
| invalid | state | boolean | | Failed validation, such as nothing selected. |
| waiting | state | boolean | | Waiting for its value: tiles blank and pulsing. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| columns | 2, 3, 4 | Fit the tiles to the width: 2 for longer descriptions, 4 for icon-and-title tiles. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Neutral tile borders. |
| Interaction | hover | `:hover` on a tile | The tile shades. |
| Interaction | focus | `:focus-within` | Soft focus ring around the first tile. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Tiles at reduced opacity; not-allowed cursor. |
| Availability | read-only | `read-only` property | Unselected tiles dimmed; selected tiles keep their look; not-allowed cursor. |
| Validation | valid | Default | — |
| Validation | invalid | `invalid` property | Tile borders in the error colour. |
| Activity | idle | Default | — |
| Activity | waiting | `waiting` property | Tile contents hidden; tiles pulse. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | text | jui-icon | Grid of `columns` tiles | One plain `div` per option holding its icon, `strong` title and `p` description. Mark selected tiles `data-selected=""` and unavailable ones `data-disabled=""`. |

## Behaviour

Clicking a tile toggles it in the selection and reports the new set (**Control values**). Disabled tiles don't
respond.

## Content rules

Titles are two or three words; descriptions one short sentence. Use icons consistently — all tiles or none.

## Accessibility

Each tile acts as a checkbox (role and checked state), is reachable with Tab and toggles with Space; the tick is
not the only sign of selection (the border and tint change too).

## Rules of use

- Keep tiles the same size and content shape; mixed tiles read as unrelated things.
- For more than about nine options use a multi-selection control.

## Tokens

The tile look follows JUI's selection styles (the survey style of `SelectionGroupControl`); JUI's own
PanelSelectionControl styles are not published with the CSS sources, so this is an approximation.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-panelselectctl-gap` | component | `--jui-space-3` | Gap between tiles. |
| `--cpt-panelselectctl-border` | component | `--jui-role-border-default` | Tile border. |
| `--cpt-panelselectctl-radius` | component | `--jui-radius-md` | Tile radius. |
| `--cpt-panelselectctl-bg` | component | `--jui-comp-control-surface` | Tile surface. |
| `--cpt-panelselectctl-bg-hover` | component | `--jui-role-surface-muted` | Tile surface on hover. |
| `--cpt-panelselectctl-padding` | component | `--jui-space-4` | Tile padding. |
| `--jui-space-3`, `--jui-space-4`, `--jui-role-border-default`, `--jui-radius-md`, `--jui-comp-control-surface`, `--jui-role-surface-muted` | semantic | | Defaults above. |
| `--jui-ctl-active`, `--jui-ctl-active-bg`, `--jui-color-aux-white`, `--jui-ctl-text` | semantic | | Selected outline, tint and tick; tile text. |
| `--jui-ctl-focus-offset`, `--jui-ctl-err-focus`, `--jui-ctl-opacity-disabled`, `--jui-ctl-opacity-readonly` | semantic | | Focus ring, invalid border, disabled and read-only dimming. |
| `--jui-ctl-bg-wait`, `--jui-role-surface-raised` | semantic | | Waiting surface and its pulse. |

## Template

```html
<div class="grid" tabindex="-1"><slot></slot></div>
```

## Style

```css
:host {
  display: block;
  --cpt-panelselectctl-gap: var(--jui-space-3);
  --cpt-panelselectctl-border: var(--jui-role-border-default);
  --cpt-panelselectctl-radius: var(--jui-radius-md);
  --cpt-panelselectctl-bg: var(--jui-comp-control-surface);
  --cpt-panelselectctl-bg-hover: var(--jui-role-surface-muted);
  --cpt-panelselectctl-padding: var(--jui-space-4);
}
.grid { outline: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--cpt-panelselectctl-gap); color: var(--jui-ctl-text); }
:host([columns="2"]) .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
:host([columns="4"]) .grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
::slotted(*) {
  position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 0.35em; cursor: pointer; user-select: none;
  padding: var(--cpt-panelselectctl-padding); padding-right: 2.5em;
  border: 1px solid var(--cpt-panelselectctl-border); border-radius: var(--cpt-panelselectctl-radius); background: var(--cpt-panelselectctl-bg);
}
::slotted(:hover) { background: var(--cpt-panelselectctl-bg-hover); }
::slotted([data-selected]) { border-color: var(--jui-ctl-active); background: var(--jui-ctl-active-bg); box-shadow: 0 0 0 1px var(--jui-ctl-active); }
::slotted([data-selected])::after {
  content: "\2713"; position: absolute; top: 0.6em; right: 0.6em; width: 1.4em; height: 1.4em; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 0.85em; font-weight: 700;
  background: var(--jui-ctl-active); color: var(--jui-color-aux-white);
}
::slotted([data-disabled]) { opacity: var(--jui-ctl-opacity-disabled); cursor: not-allowed; }
:host(:focus-within) ::slotted(:first-child), :host([state~="focus"]) ::slotted(:first-child) { box-shadow: 0 0 0 2px var(--jui-ctl-focus-offset); }
:host([state~="hover"]) ::slotted(:first-child) { background: var(--cpt-panelselectctl-bg-hover); }
:host([invalid]) ::slotted(*) { border-color: var(--jui-ctl-err-focus); }
:host([disabled]) ::slotted(*) { opacity: var(--jui-ctl-opacity-disabled); cursor: not-allowed; }
:host([read-only]) ::slotted(:not([data-selected])) { opacity: var(--jui-ctl-opacity-readonly); }
:host([read-only]) ::slotted(*) { cursor: not-allowed; }
:host([disabled]) .grid, :host([read-only]) .grid { pointer-events: none; }
:host([waiting]) ::slotted(*) { animation: jui-waiting 1s infinite; color: transparent; border-color: transparent; }
@keyframes jui-waiting { from { background-color: var(--jui-ctl-bg-wait); } to { background-color: var(--jui-role-surface-raised); } }
```

## Example

```xml
<div layout="column" gap="6">
  <jui-control-field label="Modules" description="Choose the modules to enable for this account.">
    <jui-panel-selection-control>
      <div data-selected=""><jui-icon name="users" size="large" tone="primary"/><strong>People</strong><p>Staff profiles, teams and roles.</p></div>
      <div><jui-icon name="calendar" size="large" tone="primary"/><strong>Scheduling</strong><p>Rosters, shifts and leave.</p></div>
      <div data-selected=""><jui-icon name="file-text" size="large" tone="primary"/><strong>Documents</strong><p>Contracts and policies with e-signing.</p></div>
      <div><jui-icon name="briefcase" size="large" tone="primary"/><strong>Jobs</strong><p>Job tracking and invoicing.</p></div>
      <div data-disabled=""><jui-icon name="send" size="large" tone="primary"/><strong>Campaigns</strong><p>Not available on your plan.</p></div>
    </jui-panel-selection-control>
  </jui-control-field>
  <div layout="grid" cols="2" gap="6">
    <jui-panel-selection-control columns="2" state="focus">
      <div><strong>Email</strong><p>Send by email.</p></div>
      <div data-selected=""><strong>SMS</strong><p>Send by text.</p></div>
    </jui-panel-selection-control>
    <jui-panel-selection-control columns="2" invalid="">
      <div><strong>Email</strong><p>Send by email.</p></div>
      <div><strong>SMS</strong><p>Send by text.</p></div>
    </jui-panel-selection-control>
    <jui-panel-selection-control columns="2" disabled="">
      <div data-selected=""><strong>Email</strong><p>Send by email.</p></div>
      <div><strong>SMS</strong><p>Send by text.</p></div>
    </jui-panel-selection-control>
    <jui-panel-selection-control columns="2" read-only="">
      <div data-selected=""><strong>Email</strong><p>Send by email.</p></div>
      <div><strong>SMS</strong><p>Send by text.</p></div>
    </jui-panel-selection-control>
  </div>
</div>
```
