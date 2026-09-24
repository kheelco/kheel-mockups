---
name: jui-action-bar-layout
version: 1.0.0
kind: elemental
status: active
summary: ActionBarLayout layout — a horizontal bar of left, centre and right zones, generally holding buttons.
---

# ActionBarLayout (layout)

## Purpose

Represents JUI's **ActionBarLayout** (`com.effacy.jui.core.client.component.layout`): a layout that arranges the
components of a region in a row of *zones*, left to right, each aligning its content to the left, centre or
right. It is how JUI sets out toolbars and button bars — a search control on the left and actions on the right
above a table, the buttons of a dialog footer, a panel of buttons (`PanelCreator.buttonBar(...)`). In JUI it is a
layout assigned to a panel's region; in a mockup it is a box placed where that region is. Use the layout
attributes (`layout="row"`) on a plain `div` or panel instead when the items simply flow in one row with no
left/right split.

## Anatomy

A flex row of up to three zones — `left`, `center` and `right` — each a wrapping flex row that grows to share the
width. Zones with nothing in them take no space, so a bar with only a right zone pushes everything right.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| valign | variant | top, center, bottom | center | Vertical alignment of the zones (JUI's top and bottom alignment of the layout). |
| spacing | variant | 0, 1, 2, 3, 4, 6, 8 | 2 | Space between the items of a zone (JUI zone spacing, `zone(HAlignment, Length)`); `2` is 0.5em. |
| padding | variant | 0, 1, 2, 3, 4, 6, 8 | 0 | Inset around the bar (JUI `insets(Insets)`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| valign | center | Items of different heights centred on one line — the usual toolbar. |
| valign | top, bottom | When one zone holds taller content (a multi-line control) and the others should align to its top or foot. |
| spacing | 0 … 8 | Stand in for the zone spacing JUI takes as a length. |
| padding | 0 … 8 | Stand in for JUI's `insets`; a toolbar above a table typically uses 1em (`4`). |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | filled | Items in a zone | The zone is drawn and shares the width with the other filled zones. |
| Content | empty | No items in a zone | The zone takes no space. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| left | any | jui-btn | A wrapping row, left-aligned. | The left zone (JUI `zone(HAlignment.LEFT)`, `ActionBarLayout.Data(0)`). |
| center | any | jui-btn | A wrapping row, centred. | A centre zone (JUI `zone(HAlignment.CENTER)`). |
| right | any | jui-btn | A wrapping row, right-aligned. | The right zone (JUI `zone(HAlignment.RIGHT)`), usually the actions. |

## Behaviour

None. When a zone's items do not fit they wrap onto a further line, with 0.5em between lines.

## Content rules

Put the primary action in the right zone, last. Keep a bar to one line where possible.

## Accessibility

Give a bar of controls `role="toolbar"` and an `aria-label`. Order of zones is the reading and tab order.

## Rules of use

- Use it for a row of actions with a left/right split; a single plain row is `layout="row"`.
- Zones are independent: don't rely on items in different zones lining up with each other.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-actionbar-spacing` | component | `--jui-space-2` | Space between items of a zone; `spacing` sets it. |
| `--cpt-actionbar-padding` | component | `0` | Inset around the bar; `padding` sets it. |
| `--cpt-actionbar-row-gap` | component | `0.5em` | Space between wrapped lines of a zone (JUI's `row-gap`). |
| `--jui-space-1`, `--jui-space-2`, `--jui-space-3`, `--jui-space-4`, `--jui-space-6`, `--jui-space-8` | semantic | | Spacing and padding steps. |

## Template

```html
<div class="layout">
  <div class="zone left"><slot name="left"></slot></div>
  <div class="zone center"><slot name="center"></slot></div>
  <div class="zone right"><slot name="right"></slot></div>
</div>
```

## Style

```css
:host { display: block; --cpt-actionbar-spacing: var(--jui-space-2); --cpt-actionbar-padding: 0; --cpt-actionbar-row-gap: 0.5em; }
:host([spacing="0"]) { --cpt-actionbar-spacing: 0; }
:host([spacing="1"]) { --cpt-actionbar-spacing: var(--jui-space-1); }
:host([spacing="3"]) { --cpt-actionbar-spacing: var(--jui-space-3); }
:host([spacing="4"]) { --cpt-actionbar-spacing: var(--jui-space-4); }
:host([spacing="6"]) { --cpt-actionbar-spacing: var(--jui-space-6); }
:host([spacing="8"]) { --cpt-actionbar-spacing: var(--jui-space-8); }
:host([padding="1"]) { --cpt-actionbar-padding: var(--jui-space-1); }
:host([padding="2"]) { --cpt-actionbar-padding: var(--jui-space-2); }
:host([padding="3"]) { --cpt-actionbar-padding: var(--jui-space-3); }
:host([padding="4"]) { --cpt-actionbar-padding: var(--jui-space-4); }
:host([padding="6"]) { --cpt-actionbar-padding: var(--jui-space-6); }
:host([padding="8"]) { --cpt-actionbar-padding: var(--jui-space-8); }
.layout { display: flex; align-items: center; padding: var(--cpt-actionbar-padding); }
:host([valign="top"]) .layout { align-items: start; }
:host([valign="bottom"]) .layout { align-items: end; }
.zone { display: none; align-items: center; justify-content: center; flex-grow: 1; flex-wrap: wrap;
  row-gap: var(--cpt-actionbar-row-gap); column-gap: var(--cpt-actionbar-spacing); }
.zone.left { justify-content: left; }
.zone.right { justify-content: right; }
:host([data-filled~="left"]) .zone.left,
:host([data-filled~="center"]) .zone.center,
:host([data-filled~="right"]) .zone.right { display: flex; }
```

## Example

```xml
<div layout="column" gap="4">
  <jui-action-bar-layout padding="3">
    <jui-btn slot="left" label="Filter" icon="filter" variant="outlined" nature="grey"/>
    <jui-btn slot="left" label="Export" icon="download" variant="outlined" nature="grey"/>
    <jui-btn slot="right" label="Add member" icon="plus"/>
  </jui-action-bar-layout>
  <jui-action-bar-layout padding="3">
    <jui-btn slot="left" label="Back" icon="chevron-left" variant="text"/>
    <span slot="center">Step 2 of 3</span>
    <jui-btn slot="right" label="Cancel" variant="outlined" nature="grey"/>
    <jui-btn slot="right" label="Next"/>
  </jui-action-bar-layout>
  <jui-action-bar-layout padding="3">
    <jui-btn slot="right" label="Cancel" variant="outlined" nature="grey"/>
    <jui-btn slot="right" label="Save"/>
  </jui-action-bar-layout>
</div>
```
