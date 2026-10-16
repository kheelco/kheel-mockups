---
name: jui-info-block-line
version: 1.0.0
kind: elemental
status: active
summary: InfoBlock line component — one row of items in an info block.
---

# InfoBlock line (component)

## Purpose

One line of a `jui-info-block`, standing for JUI's `InfoBlockCreator.line(...)` (an `InfoLine`): a row of small
facts, each a `jui-info-block-item`. It only exists inside an info block.

## Anatomy

A row of items, 1.5em apart.

## Properties

None.

## Variants

None.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | filled | Items present | The items in a row. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | jui-info-block-item | jui-info-block-item | A row, 1.5em apart. | The line's items, in order. |

## Behaviour

None.

## Content rules

Group related facts on one line (contact details together, dates together).

## Accessibility

Nothing beyond the items'.

## Rules of use

- Keep a line to what fits on one row at the usual width.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-infoblock-line-gap` | component | `1.5em` | Space between items. |

## Template

```html
<div class="info_line"><slot></slot></div>
```

## Style

```css
:host { display: block; --cpt-infoblock-line-gap: 1.5em; }
.info_line { display: flex; flex-wrap: wrap; gap: var(--cpt-infoblock-line-gap); }
```

## Example

```xml
<jui-info-block>
  <jui-info-block-line>
    <jui-info-block-item icon="mail" label="jane@example.com" link=""/>
    <jui-info-block-item icon="phone" label="+61 3 9000 0000"/>
    <jui-info-block-item icon="map-pin" label="Melbourne"/>
  </jui-info-block-line>
</jui-info-block>
```
