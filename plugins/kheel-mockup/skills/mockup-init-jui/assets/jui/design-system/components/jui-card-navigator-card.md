---
name: jui-card-navigator-card
version: 1.0.0
kind: elemental
status: active
summary: CardNavigator card component — one card in a card navigator's top level, with a label and a description.
---

# CardNavigator card (component)

## Purpose

One card of a `jui-card-navigator`'s top level, standing for JUI's `CardNavigator.Config.card(reference,
component, config)` and its `CardConfiguration` (`label`, `description`). It only exists inside a card
navigator. Clicking it opens the card's section; in a mockup give it an `href` to the mockup of that section.

## Anatomy

A fixed-size tile (250 × 125 px) with the label as a small heading and the description below it. On hover it
takes a light background with rounded corners.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The card's label (JUI `label(String)`). |
| description | content | text | | One sentence about the section (JUI `description(String)`). |

## Variants

None.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Transparent. |
| Interaction | hover | `:hover` | Light background, 1em radius. |

## Behaviour

A click navigates to the card (the navigator shows its content and breadcrumb).

## Content rules

Label: a short noun in sentence case. Description: one sentence, no full stop needed, fitting the tile.

## Accessibility

The label is a level-3 heading; in the application the card should be keyboard-activatable.

## Rules of use

- Keep descriptions short; the tile is fixed in size and scrolls overflow.
- Don't put segmented (nested) cards here; they are reached from within their parent's content.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-cardnavigator-card-hover` | component | `#fafafa` | Hover background (JUI's value). |
| `--jui-role-text-heading` | semantic | | Label. |

## Template

```html
<div class="card">
  <h3>{{label}}</h3>
  <p data-if="description">{{description}}</p>
</div>
```

## Style

```css
:host { display: block; --cpt-cardnavigator-card-hover: #fafafa; }
.card { box-sizing: border-box; height: 125px; width: 250px; padding: 1em 1.5em; overflow-y: auto; cursor: pointer; }
.card:hover, :host([state~="hover"]) .card { background-color: var(--cpt-cardnavigator-card-hover); border-radius: 1em; }
h3 { margin: 0; font-size: 1.17em; font-weight: 500; color: var(--jui-role-text-heading); }
p { margin: 0.5em 0 0; }
```

## Example

```xml
<jui-card-navigator title="Settings">
  <jui-card-navigator-card label="Users" description="Invite people and manage their roles."/>
  <jui-card-navigator-card label="Billing" description="Plan, payment method and invoices." state="hover"/>
</jui-card-navigator>
```
