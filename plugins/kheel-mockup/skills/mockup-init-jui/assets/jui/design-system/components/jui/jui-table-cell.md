---
name: jui-table-cell
version: 1.0.0
kind: elemental
status: active
summary: Table cell component — one cell of a Table row, as drawn by its column's cell renderer.
---

# Table cell (component)

## Purpose

Represents one cell of JUI's **Table**: what a column's cell renderer (`ITableCellRenderer`, set with
`header.renderer(…)`) draws for one record. JUI's standard renderers are `TextTableCellRenderer` (plain text),
`LinkTableCellHandler` (a link that runs a handler) and `BuilderTableCellRenderer` (any DOM, built with the DOM
builder — badges, buttons, stacked text). It exists only inside a `jui-table-row`.

## Anatomy

A table cell with the table's body padding and text colour, holding the rendered content: text, a link, or any
components placed in it.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| renderer | variant | text, link, builder | text | Which cell renderer draws the content: plain text, a link, or custom content. |
| alignment | variant | left, center, right | left | Horizontal alignment of the content (set by the renderer's own CSS in JUI). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| renderer | text | A plain value (`TextTableCellRenderer`). |
| renderer | link | A value that opens something — the record, or a related one (`LinkTableCellHandler`); link colour, underlined on hover. |
| renderer | builder | Custom content (`BuilderTableCellRenderer`): place components such as `jui-btn` or `jui-icon` in the cell. |
| alignment | right | Amounts and other numbers, so digits line up. |
| alignment | center | Short icons or flags. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | — |
| Interaction | hover | `:hover`, link renderer | The link underlines and darkens. |

Row hover and selection are drawn by `jui-table-row`.

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | jui-btn, jui-icon | Inline content | The cell's content: text, or components for a `builder` cell. |

## Behaviour

A link cell's click runs its handler for the record and does not trigger the row click; give it `href` or `opens`
in a mockup. Events from components in a builder cell are handled by the cell's handler (JUI's
`ITableCellHandler`).

## Content rules

Keep cells to one line where possible; format numbers, dates and amounts consistently down the column.

## Accessibility

Renders as a `td` in JUI. Links and buttons in cells must be real interactive elements with meaningful text.

## Rules of use

- Use `link` for navigation from a cell, and `builder` with `jui-btn` for row actions.
- Right-align numeric columns.

## Tokens

The tokens the style uses. The padding and colour are set by the enclosing `jui-table`.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-tbl-cell-padding`, `--cpt-tbl-cell-color` | inherited | | Cell padding and text colour. |
| `--jui-text-link`, `--jui-text-link-hover` | semantic | | Link renderer colours. |

## Template

```html
<span class="content"><slot></slot></span>
```

## Style

```css
:host {
  display: table-cell;
  vertical-align: middle;
  padding: var(--cpt-tbl-cell-padding);
  color: var(--cpt-tbl-cell-color);
  text-align: left;
}
:host([alignment="center"]) { text-align: center; }
:host([alignment="right"]) { text-align: right; }
:host([renderer="link"]) .content { color: var(--jui-text-link); cursor: pointer; }
:host([renderer="link"]) .content:hover, :host([renderer="link"][state~="hover"]) .content { color: var(--jui-text-link-hover); text-decoration: underline; }
```

## Example

```xml
<jui-table>
  <jui-table-column label="Text"/>
  <jui-table-column label="Link"/>
  <jui-table-column label="Builder" column-width="large"/>
  <jui-table-column label="Amount" column-width="small"/>
  <jui-table-row>
    <jui-table-cell>Plain value</jui-table-cell>
    <jui-table-cell renderer="link">Open record</jui-table-cell>
    <jui-table-cell renderer="builder">
      <jui-btn label="Edit" icon="pencil" variant="outlined"/>
      <jui-btn icon="trash-2" nature="danger" variant="text" aria-label="Delete"/>
    </jui-table-cell>
    <jui-table-cell alignment="right">$1,250.00</jui-table-cell>
  </jui-table-row>
  <jui-table-row>
    <jui-table-cell>Another value</jui-table-cell>
    <jui-table-cell renderer="link" state="hover">Hovered link</jui-table-cell>
    <jui-table-cell renderer="builder"><jui-icon name="circle-check" tone="success"/> Active</jui-table-cell>
    <jui-table-cell alignment="right">$80.00</jui-table-cell>
  </jui-table-row>
</jui-table>
```
