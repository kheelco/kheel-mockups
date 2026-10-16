---
name: jui-expander
version: 1.0.0
kind: elemental
status: active
summary: Expander fragment — an invisible spacer that takes up the remaining space in a row.
---

# Expander (fragment)

## Purpose

Represents JUI's **Expander** fragment: an empty block with `flex-grow: 1`. Placed in a horizontal flex row (a
toolbar, a dialog header or footer, a card header) it pushes whatever follows it to the far end — JUI's `Dialog`
uses it to push the close icon and the right-hand actions to the right. It has no content and no events (its
neighbours' events are handled by the enclosing component, **Fragment events**). In a mockup, `justify="between"`
on the row or `grow=""` on a neighbour often does the same job; use `jui-expander` where the JUI code will use an
`Expander`. Despite its name it is not a disclosure control: for a section that expands and collapses use
`jui-accordion`.

## Anatomy

One empty block that grows to fill the free space of its flex container.

## Properties

None.

## Variants

None.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Visibility | default | Always | Invisible; takes the free space in the row. |

## Behaviour

None — it only takes space. Outside a flex container it has no effect.

## Content rules

None — it has no content.

## Accessibility

Purely presentational; it is ignored by assistive technology.

## Rules of use

- Use it only in a horizontal flex row; in a column it pushes the following items to the bottom.
- One expander per row splits the row in two; two expanders centre what lies between them.

## Tokens

None — the style uses no tokens.

## Template

```html
<div class="expander"></div>
```

## Style

```css
:host { display: block; flex-grow: 1; align-self: stretch; }
```

## Example

```xml
<div layout="column" gap="3">
  <div layout="row" align="center" gap="2">
    <jui-btn label="Back" variant="outlined" nature="grey"/>
    <jui-expander/>
    <jui-btn label="Cancel" variant="text"/>
    <jui-btn label="Save"/>
  </div>
  <div layout="row" align="center" gap="2">
    <jui-expander/>
    <strong>Centred between two expanders</strong>
    <jui-expander/>
  </div>
</div>
```
