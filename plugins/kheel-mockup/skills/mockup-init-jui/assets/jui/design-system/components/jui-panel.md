---
name: jui-panel
version: 1.0.0
kind: elemental
status: active
summary: Panel component — a plain container that lays out the components added to it.
---

# Panel (component)

## Purpose

Represents JUI's **Panel** component: the most basic container, a single content area into which components are
added (`add(...)`) and set out by a layout. It has no chrome of its own beyond optional padding and a border, so
it is used to group content, give it a scroll area, or act as the base of a custom component. Use
`jui-title-panel` when the area needs a titled header, `jui-split-panel` for a content area plus a toolbar or
side area, `jui-tri-split-panel` for a toolbar, content and footer, and `jui-action-bar-layout` for a row of
buttons (JUI's `PanelCreator.buttonBar(...)`).

JUI panels take their arrangement from a **layout** rather than from CSS. In a mockup the layout is expressed with
the layout attributes on the panel (its default slot is configurable):

| JUI layout | In a mockup |
| --- | --- |
| `CardFitLayout` (the default) | Shows one child at a time (`activate(...)`): place only the child that is showing. |
| `VertLayout` (`VertLayoutCreator.create(Length.em(n))`) | `layout="column"` with `gap` the spacing (1em ≈ `gap="4"`). With a separator line between children, use `jui-vert-layout`. |
| `ActionBarLayout` | Place a `jui-action-bar-layout` in the panel, or use it in place of the panel. |
| `MinimalLayout` | No layout attributes; children flow as they are. |

## Anatomy

A block holding the consumer's content. Padding and a 1 px border are optional; with `scrollable` the content
area scrolls within the panel's height.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| padding | variant | 0, 1, 2, 3, 4, 5, 6, 8 | 0 | Inner padding as a spacing step (JUI `padding(Insets)`); `4` is 1em. |
| border | variant | boolean | | A 1 px border around the panel (JUI `border(Border)`). |
| scrollable | variant | boolean | | The contents scroll within the panel's height (JUI `scrollable()`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| padding | 0 … 8 | Stand in for JUI's free `Insets`; choose the nearest step. |
| border | present | To delineate the panel from its surroundings. JUI takes any `Border`; the mockup draws the standard line. |
| scrollable | present | For a panel of fixed or filled height whose content can overflow. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | filled | Children present | The children as laid out. |
| Content | empty | No children | Nothing is drawn beyond padding and border. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | jui-action-bar-layout, jui-vert-layout | configurable | The panel's contents (JUI `add(...)`). |

## Behaviour

None of its own. With the default `CardFitLayout` only the active child shows and `activate(IComponent)` switches
between them; in a mockup, show each case as its own mockup or page state.

## Content rules

None — the panel holds other components.

## Accessibility

A plain `div`; add `role="region"` and an `aria-label` when the panel is a landmark the user navigates to.

## Rules of use

- Don't use a panel only to add spacing; use the layout attributes on a plain `div` for that.
- Choose the layout by what JUI will use: a column (`VertLayout`), a single visible child (`CardFitLayout`) or an
  action bar (`jui-action-bar-layout`), so the mockup can be built without guessing.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-panel-padding` | component | `0` | Inner padding; `padding` sets it to a spacing step. |
| `--cpt-panel-border` | component | `--jui-role-border-default` | Border colour when `border` is set. |
| `--jui-space-1`, `--jui-space-2`, `--jui-space-3`, `--jui-space-4`, `--jui-space-5`, `--jui-space-6`, `--jui-space-8` | semantic | | Padding steps. |
| `--jui-role-border-default` | semantic | | Border colour. |

## Template

```html
<div class="contents" data-layout><slot></slot></div>
```

## Style

```css
:host { display: block; --cpt-panel-padding: 0; --cpt-panel-border: var(--jui-role-border-default); }
:host([padding="1"]) { --cpt-panel-padding: var(--jui-space-1); }
:host([padding="2"]) { --cpt-panel-padding: var(--jui-space-2); }
:host([padding="3"]) { --cpt-panel-padding: var(--jui-space-3); }
:host([padding="4"]) { --cpt-panel-padding: var(--jui-space-4); }
:host([padding="5"]) { --cpt-panel-padding: var(--jui-space-5); }
:host([padding="6"]) { --cpt-panel-padding: var(--jui-space-6); }
:host([padding="8"]) { --cpt-panel-padding: var(--jui-space-8); }
:host([border]) { border: 1px solid var(--cpt-panel-border); }
.contents { padding: var(--cpt-panel-padding); }
:host([scrollable]) { display: flex; flex-direction: column; overflow: auto; }
:host([scrollable]) .contents { flex-grow: 1; overflow-y: auto; }
```

## Example

```xml
<div layout="row" gap="4" align="start">
  <jui-panel border="" padding="4" layout="column" gap="4" grow="">
    <p>A panel with a vertical layout (JUI <code>VertLayout</code> with 1em spacing).</p>
    <p>Each child is placed one after the other down the panel.</p>
    <jui-btn label="Continue"/>
  </jui-panel>
  <jui-panel border="" padding="2" layout="row" gap="2" grow="">
    <jui-btn label="Show first" variant="outlined"/>
    <jui-btn label="Show second" variant="outlined"/>
  </jui-panel>
</div>
```
