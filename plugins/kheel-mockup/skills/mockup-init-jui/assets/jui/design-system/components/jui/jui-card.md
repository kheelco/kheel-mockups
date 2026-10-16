---
name: jui-card
version: 1.0.0
kind: elemental
status: active
summary: Card fragment — an outlined surface that groups related content, optionally clickable with a hover lift.
---

# Card (fragment)

## Purpose

Represents JUI's **Card** fragment: a surface that groups one item's content — a summary tile in a grid, a
record in a list, a settings block — inside a component's content. By default it is outlined (white, subtle
border, rounded corners); its content stacks vertically, or sits in a row when `horizontal`. Being a fragment,
a clickable card's click is handled by the enclosing component (see **Fragment events**). Use `jui-paper` for
an unframed content block, `jui-stack` or `jui-box` for layout with no surface, and a panel component when the
region needs a title bar and its own behaviour.

## Anatomy

A flex container with a border and radius (outlined), holding the consumer's content — typically a
`jui-card-header`, then text, pills and buttons. Headings and paragraphs inside lose their margins.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| variant | variant | outlined, plain | outlined | `outlined` is JUI's `Variant.OUTLINED` (the default); `plain` is a card with no chrome (a custom `Variant.create(…)` with no style). |
| horizontal | variant | boolean | | Lays the content in a row, centred vertically (JUI `horizontal()`). |
| padding | variant | 0, 1, 2, 3, 4, 5, 6, 8 | 0 | Inner padding as a spacing step (JUI `padding(Insets)`); JUI's default is none. |
| gap | variant | 0, 1, 2, 3, 4, 5, 6, 8 | 0 | Space between children (JUI `gap(Length)`). |
| clickable | variant | boolean | | The whole card is an action: pointer cursor (JUI `onclick(…)`, which adds `clickable`). Pair with `href` or `opens`. |
| hover-lift | variant | boolean | | Casts a soft shadow on hover (JUI's `juiFragments-hover-shadow` style), for cards that are clicked. |
| selected | state | boolean | | Shows the card as the chosen one (primary border), as an enclosing component does by repointing `--jui-card-outlined-border`. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | outlined | Most cards: a framed tile on a page or panel background. |
| variant | plain | A card's layout and click without a frame, inside something already framed. |
| horizontal | on | A compact row: avatar or icon, text, then actions. |
| hover-lift | on | Grids of clickable cards, to show they respond. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | As the variant. |
| Interaction | hover | `:hover` | With `hover-lift`, a soft `0 0 10px` shadow; otherwise unchanged. |
| Interaction | focus | `:focus-visible` | Focus ring, when the card is an action. |
| Selection | unselected | Default | — |
| Selection | selected | `selected` property | Primary border. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | jui-card-header, jui-para, jui-pill, jui-btn, jui-divider, jui-stack | Flex column (a row when `horizontal`), spaced by `gap` and `padding`. | The card's content. |

## Behaviour

A clickable card runs its action through the enclosing component (**Fragment events**); in a mockup give it
`href` or `opens`. Buttons inside a clickable card handle their own clicks.

## Content rules

One item per card. Lead with a `jui-card-header` (or a heading), keep supporting text short, and put actions last.

## Accessibility

JUI renders a `div`. A clickable card needs a real link or button inside it (often the header title) or
`role="button"` and `tabindex="0"` on the card, and a name that says where it goes.

## Rules of use

- Use `hover-lift` only on cards that are clickable; a lift on a static card promises an action that isn't there.
- Don't nest outlined cards; use `plain` or `jui-paper` inside.
- Give cards in a grid the same padding so their edges line up.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-card-outlined-bg` | component | `--jui-frag-card-outlined-bg` | Background when outlined. |
| `--jui-card-outlined-border` | component | `--jui-frag-card-outlined-border` | Border colour when outlined; `--jui-color-primary50` when selected. |
| `--jui-card-outlined-border-radius` | component | `--jui-frag-card-outlined-border-radius` | Corner radius when outlined. |
| `--jui-card-outlined-shadow-color` | component | `--jui-color-neutral30` | Resting shadow colour when outlined. |
| `--jui-card-outlined-shadow-size` | component | `0` | Resting shadow blur (none by default). |
| `--jui-card-padding` | component | `0` | Inner padding; `padding` sets a spacing step. |
| `--jui-card-gap` | component | `0` | Gap between children; `gap` sets a spacing step. |
| `--jui-card-hover-shadow` | component | `0 0 10px #ccc` | Shadow on hover with `hover-lift`. |
| `--jui-frag-card-outlined-bg`, `--jui-frag-card-outlined-border`, `--jui-frag-card-outlined-border-radius` | semantic | | JUI's theme values for the outlined card. |
| `--jui-color-neutral30`, `--jui-color-primary50` | semantic | | Resting shadow and selected border. |
| `--jui-space-1`, `--jui-space-2`, `--jui-space-3`, `--jui-space-4`, `--jui-space-5`, `--jui-space-6`, `--jui-space-8` | semantic | | Padding and gap steps. |
| `--jui-role-focus-ring` | semantic | | Focus ring. |

## Template

```html
<div class="card"><slot></slot></div>
```

## Style

```css
:host {
  display: block;
  --jui-card-outlined-bg: var(--jui-frag-card-outlined-bg);
  --jui-card-outlined-border: var(--jui-frag-card-outlined-border);
  --jui-card-outlined-border-radius: var(--jui-frag-card-outlined-border-radius);
  --jui-card-outlined-shadow-color: var(--jui-color-neutral30);
  --jui-card-outlined-shadow-size: 0;
  --jui-card-padding: 0;
  --jui-card-gap: 0;
  --jui-card-hover-shadow: 0 0 10px #ccc;
}
:host([padding="1"]) { --jui-card-padding: var(--jui-space-1); }
:host([padding="2"]) { --jui-card-padding: var(--jui-space-2); }
:host([padding="3"]) { --jui-card-padding: var(--jui-space-3); }
:host([padding="4"]) { --jui-card-padding: var(--jui-space-4); }
:host([padding="5"]) { --jui-card-padding: var(--jui-space-5); }
:host([padding="6"]) { --jui-card-padding: var(--jui-space-6); }
:host([padding="8"]) { --jui-card-padding: var(--jui-space-8); }
:host([gap="1"]) { --jui-card-gap: var(--jui-space-1); }
:host([gap="2"]) { --jui-card-gap: var(--jui-space-2); }
:host([gap="3"]) { --jui-card-gap: var(--jui-space-3); }
:host([gap="4"]) { --jui-card-gap: var(--jui-space-4); }
:host([gap="5"]) { --jui-card-gap: var(--jui-space-5); }
:host([gap="6"]) { --jui-card-gap: var(--jui-space-6); }
:host([gap="8"]) { --jui-card-gap: var(--jui-space-8); }
:host([selected]) { --jui-card-outlined-border: var(--jui-color-primary50); }
.card {
  position: relative; display: flex; flex-direction: column; height: 100%;
  gap: var(--jui-card-gap); padding: var(--jui-card-padding);
}
:host([variant="outlined"]) .card {
  background-color: var(--jui-card-outlined-bg);
  border: 1px solid var(--jui-card-outlined-border);
  border-radius: var(--jui-card-outlined-border-radius);
  box-shadow: 0 0 var(--jui-card-outlined-shadow-size) var(--jui-card-outlined-shadow-color);
}
:host([horizontal]) .card { flex-direction: row; align-items: center; }
:host([clickable]) .card, :host([href]) .card, :host([opens]) .card { cursor: pointer; }
:host([hover-lift]:hover) .card, :host([hover-lift][state~="hover"]) .card { box-shadow: var(--jui-card-hover-shadow); transition: box-shadow 0.2s; }
:host(:focus-visible) .card, :host([state~="focus"]) .card { outline: 2px solid var(--jui-role-focus-ring); outline-offset: 2px; }
::slotted(h1), ::slotted(h2), ::slotted(h3), ::slotted(h4), ::slotted(h5), ::slotted(p) { margin: 0; padding: 0; }
```

## Example

```xml
<div layout="grid" cols="3" gap="4">
  <jui-card padding="4" gap="3">
    <jui-card-header icon="briefcase" title="Senior designer" subtitle="Melbourne · Full time"/>
    <p>Lead the design of our hiring tools.</p>
    <div layout="row" gap="2"><jui-pill label="Open" variant="success"/><jui-pill label="12 applicants"/></div>
  </jui-card>
  <jui-card padding="4" gap="3" clickable="" hover-lift="" state="hover">
    <jui-card-header icon="folder" title="Clickable, hovered" subtitle="Lifts on hover"/>
    <p>The whole card opens the record.</p>
  </jui-card>
  <jui-card padding="4" gap="3" selected="">
    <jui-card-header icon="star" title="Selected" subtitle="Primary border"/>
    <p>The chosen plan.</p>
  </jui-card>
  <jui-card padding="3" gap="3" horizontal="" span="2">
    <jui-avatar initials="JC" size="medium"/>
    <jui-card-header title="Jane Citizen" subtitle="Product lead"/>
    <jui-btn label="Message" variant="outlined" ml="auto"/>
  </jui-card>
  <jui-card variant="plain" padding="3" gap="2">
    <strong>Plain card</strong>
    <span>No frame.</span>
  </jui-card>
</div>
```
