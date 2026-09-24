---
name: ui-table-row
version: 1.0.0
kind: elemental
status: active
summary: One row of a table.
---

# Table row

## Purpose

One record in a `ui-table`. Used only inside a table.

## Anatomy

A row of `ui-table-cell`s, in the same order as the table's columns.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| href | content | path | | Mockup to open when the row is clicked. Makes the row interactive. |
| selected | state | boolean | | Puts the row in the selected state. |

## Variants

None.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | resting | Default | — |
| Interaction | hover | `:hover` when `href` is set | Hover background. |
| Interaction | focus | `:focus-visible` when `href` is set | Focus ring inset. |
| Selection | unselected | Default | — |
| Selection | selected | `selected` property | Action-subtle background. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | ui-table-cell | | One cell per column | The row's cells. |

## Behaviour

Clicking a row with `href` opens its item, unless the click is on a control inside the row.

## Content rules

One cell per column, in column order.

## Accessibility

Exposed as a row. When the row opens an item, the item's name in the row is also a link, so keyboard users have a
target.

## Rules of use

- Only inside `ui-table`.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--color-surface-hover` | semantic |  | Background on hover. |
| `--color-action-subtle`, `--color-action-subtle-hover` | semantic |  | Background when selected, and selected on hover. |
| `--color-focus-ring` | semantic |  | Focus ring. |

## Template

```html
<slot></slot>
```

## Style

```css
:host { display: table-row; }
:host([href]) { cursor: pointer; }
:host([href]:hover), :host([state~="hover"]) { background: var(--color-surface-hover); }
:host([state~="focus"]) { outline: 2px solid var(--color-focus-ring); outline-offset: -2px; }
:host([selected]) { background: var(--color-action-subtle); }
:host([selected][href]:hover) { background: var(--color-action-subtle-hover); }
```

## Example

```xml
<ui-table>
  <ui-table-column>Row</ui-table-column>
  <ui-table-column>State</ui-table-column>
  <ui-table-row><ui-table-cell>One</ui-table-cell><ui-table-cell>Resting</ui-table-cell></ui-table-row>
  <ui-table-row href="#" state="hover"><ui-table-cell>Two</ui-table-cell><ui-table-cell>Hover</ui-table-cell></ui-table-row>
  <ui-table-row selected=""><ui-table-cell>Three</ui-table-cell><ui-table-cell>Selected</ui-table-cell></ui-table-row>
</ui-table>
```
