---
name: jui-tri-split-panel
version: 1.0.0
kind: elemental
status: active
summary: TriSplitPanel component — a top bar, a central content area and a bottom bar, stacked.
---

# TriSplitPanel (component)

## Purpose

Represents JUI's **TriSplitPanel** component: three stacked areas — *top* (`addTop(...)`), the central *main*
area (`add(...)`) and *bottom* (`addBottom(...)`) — each with its own layout. It is used for tables and galleries
that need both a toolbar (search, actions) and a footer (a result count, paging). Use `jui-split-panel` when
there is no footer, and `jui-panel` for a single area.

## Anatomy

A column on a white surface: the top area at its natural height, the main area growing to fill, and the bottom
area at its natural height. With `separator` a 1 px line runs above and below the main area.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| separator | variant | boolean | | Lines between the areas (JUI `separator()`). |
| scrollable | variant | boolean | | The main area scrolls between the fixed top and bottom (JUI `scrollable()`). |
| padding | variant | 0, 1, 2, 3, 4, 5, 6, 8 | 0 | Padding around the panel as a spacing step (JUI `padding(Insets)`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| separator | present | When the bars and the content need visual division. |
| scrollable | present | For a panel filling a fixed height, so the top and bottom bars stay in view. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | filled | Children in the bars | Each bar at its natural height. |
| Content | empty | Nothing in a bar | That bar takes no space. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| top | any | jui-action-bar-layout | A block at its natural height; lay it out with a `jui-action-bar-layout`. | The top bar (JUI `addTop(...)`), usually search and actions. |
| default | any | | configurable | The main area (JUI `add(...)`), usually a table or gallery. |
| bottom | any | jui-action-bar-layout | A block at its natural height; lay it out with a `jui-action-bar-layout`. | The bottom bar (JUI `addBottom(...)`), such as a result count. |

## Behaviour

None of its own. Each area defaults to `CardFitLayout` in JUI (`activate`, `activateTop`, `activateBottom`); the
bars are commonly given an `ActionBarLayout`.

## Content rules

Keep each bar to one row. Counts in the bottom bar read as "24 things".

## Accessibility

Plain `div`s; give a bar of controls `role="toolbar"` and an `aria-label`.

## Rules of use

- Put bars in `top` and `bottom` rather than in the main area, so they stay in place when it scrolls.
- Write `slot="top"` or `slot="bottom"` on each bar; both accept the same content, so nothing is placed for you.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-trisplitpanel-bg` | component | `--jui-color-aux-white` | Panel background. |
| `--cpt-trisplitpanel-top-bg` | component | `--cpt-trisplitpanel-bg` | Top bar background. |
| `--cpt-trisplitpanel-bottom-bg` | component | `--cpt-trisplitpanel-bg` | Bottom bar background. |
| `--cpt-trisplitpanel-separator` | component | `--jui-role-border-default` | Separator colour (JUI sets `#ccc`). |
| `--cpt-trisplitpanel-padding` | component | `0` | Padding around the panel; `padding` sets it. |
| `--jui-color-aux-white` | semantic | | Surface. |
| `--jui-role-border-default` | semantic | | Separator. |
| `--jui-space-1`, `--jui-space-2`, `--jui-space-3`, `--jui-space-4`, `--jui-space-5`, `--jui-space-6`, `--jui-space-8` | semantic | | Padding steps. |

## Template

```html
<div class="top"><slot name="top"></slot></div>
<div class="contents" data-layout><slot></slot></div>
<div class="bottom"><slot name="bottom"></slot></div>
```

## Style

```css
:host {
  display: flex; flex-direction: column; overflow: hidden;
  --cpt-trisplitpanel-bg: var(--jui-color-aux-white);
  --cpt-trisplitpanel-top-bg: var(--cpt-trisplitpanel-bg);
  --cpt-trisplitpanel-bottom-bg: var(--cpt-trisplitpanel-bg);
  --cpt-trisplitpanel-separator: var(--jui-role-border-default);
  --cpt-trisplitpanel-padding: 0;
  background-color: var(--cpt-trisplitpanel-bg);
  padding: var(--cpt-trisplitpanel-padding);
}
:host([padding="1"]) { --cpt-trisplitpanel-padding: var(--jui-space-1); }
:host([padding="2"]) { --cpt-trisplitpanel-padding: var(--jui-space-2); }
:host([padding="3"]) { --cpt-trisplitpanel-padding: var(--jui-space-3); }
:host([padding="4"]) { --cpt-trisplitpanel-padding: var(--jui-space-4); }
:host([padding="5"]) { --cpt-trisplitpanel-padding: var(--jui-space-5); }
:host([padding="6"]) { --cpt-trisplitpanel-padding: var(--jui-space-6); }
:host([padding="8"]) { --cpt-trisplitpanel-padding: var(--jui-space-8); }
.contents { flex-grow: 1; }
.top { background-color: var(--cpt-trisplitpanel-top-bg); }
.bottom { background-color: var(--cpt-trisplitpanel-bottom-bg); }
:host([scrollable]) { overflow: auto; height: 100%; }
:host([scrollable]) .contents { overflow-y: auto; }
:host([separator]) .contents { border-top: 1px solid var(--cpt-trisplitpanel-separator); border-bottom: 1px solid var(--cpt-trisplitpanel-separator); }
```

## Example

```xml
<jui-tri-split-panel separator="" layout="column" gap="2">
  <jui-action-bar-layout slot="top" padding="4">
    <jui-btn slot="left" label="Filter" icon="filter" variant="outlined" nature="grey"/>
    <jui-btn slot="right" label="Add thing" icon="plus"/>
  </jui-action-bar-layout>
  <p>The main area — typically a table or gallery of things.</p>
  <p>It scrolls between the bars when the panel is <code>scrollable</code>.</p>
  <jui-action-bar-layout slot="bottom" padding="3">
    <small slot="right">24 things</small>
  </jui-action-bar-layout>
</jui-tri-split-panel>
```
