---
name: jui-split-panel
version: 1.0.0
kind: elemental
status: active
summary: SplitPanel component — a main content area beside or below a secondary area, such as a toolbar.
---

# SplitPanel (component)

## Purpose

Represents JUI's **SplitPanel** component: a panel with two content areas, the *main* area (`add(...)`) and the
*other* area (`addOther(...)`), arranged side by side or one above the other, optionally divided by a line. Its
most common use is a toolbar above a gallery or table: the other area holds an action bar (search on the left,
actions on the right) and the main area the results. Use `jui-tri-split-panel` when a footer is needed too, and
`jui-panel` for a single area.

## Anatomy

Two regions in a flex box. The other area takes its natural size; the main area grows to fill the rest. With
`separator` a 1 px line runs along the main area's edge that faces the other area.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| vertical | variant | boolean | | Stack the areas vertically (JUI `vertical()`); otherwise they sit side by side. |
| reverse | variant | boolean | | Put the other area after the main area (JUI `reverse()`): below it when vertical, to its right otherwise. |
| separator | variant | boolean | | A line between the areas (JUI `separator()`). |
| scrollable | variant | boolean | | The main area scrolls (JUI `scrollable()`). |
| padding | variant | 0, 1, 2, 3, 4, 5, 6, 8 | 0 | Padding around the panel as a spacing step (JUI `padding(Insets)`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| vertical | present | Toolbar above content — the usual table or gallery arrangement. |
| vertical | absent | Side area to the left of the content, such as a filter column. |
| reverse | present | Other area below (vertical) or to the right (horizontal), such as a footer bar or a detail pane. |
| separator | present | When the areas need visual division and neither has its own border. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | filled | Children present | Both areas as laid out. |
| Content | empty | No children in the other area | The other area takes no space. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | jui-panel | configurable | The main area (JUI `add(...)`); grows to fill the panel. |
| other | any | jui-action-bar-layout | A block at its natural size; lay it out with a `jui-action-bar-layout`. | The secondary area (JUI `addOther(...)`), such as a toolbar. |

## Behaviour

None of its own. Both areas default to `CardFitLayout` in JUI (one child showing, `activate(...)` and
`activateOther(...)` switch between them); the other area is commonly given an `ActionBarLayout`.

## Content rules

Keep the other area to one row of controls when it is a toolbar.

## Accessibility

Plain `div`s. When the other area is a toolbar of controls, give it `role="toolbar"` and an `aria-label`.

## Rules of use

- Put the toolbar in the other area, not the main area, so it stays in place while the main area scrolls.
- Use `vertical=""` for a toolbar above content; the default (horizontal) puts the other area to the left.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--titlepanel-color-separator` | component | `--jui-role-border-default` | Separator line colour (JUI's own name for it; JUI sets `#ccc`). |
| `--cpt-splitpanel-padding` | component | `0` | Padding around the panel; `padding` sets it to a spacing step. |
| `--jui-space-1`, `--jui-space-2`, `--jui-space-3`, `--jui-space-4`, `--jui-space-5`, `--jui-space-6`, `--jui-space-8` | semantic | | Padding steps. |
| `--jui-role-border-default` | semantic | | Separator line. |

## Template

```html
<div class="other"><slot name="other"></slot></div>
<div class="contents" data-layout><slot></slot></div>
```

## Style

```css
:host { display: flex; flex-direction: row; overflow: hidden; padding: var(--cpt-splitpanel-padding);
  --titlepanel-color-separator: var(--jui-role-border-default); --cpt-splitpanel-padding: 0; }
:host([padding="1"]) { --cpt-splitpanel-padding: var(--jui-space-1); }
:host([padding="2"]) { --cpt-splitpanel-padding: var(--jui-space-2); }
:host([padding="3"]) { --cpt-splitpanel-padding: var(--jui-space-3); }
:host([padding="4"]) { --cpt-splitpanel-padding: var(--jui-space-4); }
:host([padding="5"]) { --cpt-splitpanel-padding: var(--jui-space-5); }
:host([padding="6"]) { --cpt-splitpanel-padding: var(--jui-space-6); }
:host([padding="8"]) { --cpt-splitpanel-padding: var(--jui-space-8); }
:host([reverse]) { flex-direction: row-reverse; }
:host([vertical]) { flex-direction: column; }
:host([vertical][reverse]) { flex-direction: column-reverse; }
.contents { flex-grow: 1; min-width: 0; }
.other { flex: none; }
:host([scrollable]) { overflow: auto; }
:host([scrollable]) .contents { overflow-y: auto; }
:host([separator]) .contents { border-left: 1px solid var(--titlepanel-color-separator); }
:host([separator][reverse]) .contents { border-left: none; border-right: 1px solid var(--titlepanel-color-separator); }
:host([separator][vertical]) .contents { border-left: none; border-right: none; border-top: 1px solid var(--titlepanel-color-separator); }
:host([separator][vertical][reverse]) .contents { border-top: none; border-bottom: 1px solid var(--titlepanel-color-separator); }
```

## Example

```xml
<div layout="column" gap="4">
  <jui-split-panel vertical="" separator="" layout="column" gap="2">
    <jui-action-bar-layout slot="other" padding="3">
      <jui-btn slot="left" label="Filter" icon="filter" variant="outlined" nature="grey"/>
      <jui-btn slot="right" label="Add thing" icon="plus"/>
    </jui-action-bar-layout>
    <p>The main area — typically a table or gallery.</p>
    <p>It grows to fill the panel below the toolbar.</p>
  </jui-split-panel>
  <jui-split-panel separator="">
    <jui-panel slot="other" padding="4" layout="column" gap="2">
      <strong>Filters</strong>
      <span>Side area (the default, horizontal arrangement).</span>
    </jui-panel>
    <jui-panel padding="4">Main area to the right of the other area.</jui-panel>
  </jui-split-panel>
</div>
```
