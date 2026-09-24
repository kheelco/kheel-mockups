---
name: jui-title-panel
version: 1.0.0
kind: composed
status: active
summary: TitlePanel component — a panel with a title bar (icon, title and subtitle) above its content.
---

# TitlePanel (component)

## Purpose

Represents JUI's **TitlePanel** component: a `jui-panel` with a title bar — an optional icon, a title and an
optional subtitle — above its content area. JUI retains it mainly for historical reasons; it suits a section or a
step-by-step progression (its content defaults to `CardFitLayout`, one page showing at a time). Use `jui-panel`
when no title is needed, and a heading in the content, or `jui-card-navigator`'s header, where the title belongs
to a page rather than a panel.

## Anatomy

A title bar (a `jui-icon`, then the title and subtitle stacked) over the content area. In the `split` style the
bar has a light background and a line beneath it; in the `above` style it is transparent with no line. When a
subtitle is present the icon is drawn large, spanning both lines.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| title | content | text | | The title (JUI `title(String)`). |
| subtitle | content | text | | Optional second line (JUI `subtitle(String)`). |
| icon | content | icon | | Optional icon before the title (JUI `icon(String)`). |
| variant | variant | split, above | split | The title bar's look (JUI `TitlePanel.Config.Style`). |
| scrollable | variant | boolean | | The content scrolls beneath the fixed title bar (JUI `scrollable()`). |
| padding | variant | 0, 1, 2, 3, 4, 5, 6, 8 | 0 | Padding of the content area as a spacing step (JUI `padding(Insets)`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | split | Title bar on a light surface, divided from the content by a line (JUI `SPLIT`, the default). |
| variant | above | Title sits directly above the content with no bar (JUI `ABOVE`). |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | titled | `title` set | The title bar as described. |
| Content | with-subtitle | `subtitle` set | A second line; the icon grows to span both lines. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | | configurable | The panel's content (JUI `add(...)`). |

## Behaviour

None of its own. With the default `CardFitLayout` only one child shows at a time and `activate(...)` moves
between them; show each page as its own mockup or page state.

## Content rules

Title in sentence case, a few words. Subtitle one short sentence.

## Accessibility

The title is a level-2 heading. The icon is decorative.

## Rules of use

- Prefer a heading inside a plain panel for new work; JUI keeps TitlePanel for compatibility.
- Don't repeat the title in the content.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--titlepanel-color-border` | component | `--jui-role-border-default` | Line beneath the title bar (JUI sets `#ccc`). |
| `--titlepanel-color-bg` | component | `--jui-role-surface-raised` | Title bar background (JUI sets `#fafafa`); transparent in `above`. |
| `--titlepanel-color-title` | component | `--jui-role-text-heading` | Title colour (JUI sets `#333`). |
| `--titlepanel-color-subtitle` | component | `--jui-color-neutral60` | Subtitle colour (JUI sets `#666`). |
| `--titlepanel-color-icon` | component | `--jui-color-neutral60` | Icon colour (JUI sets `#666`). |
| `--cpt-titlepanel-padding` | component | `0` | Content padding; `padding` sets it. |
| `--frag-icon-size` | component | `1.5em` | The icon's size; `3.25em` with a subtitle. |
| `--jui-role-border-default`, `--jui-role-surface-raised`, `--jui-role-text-heading`, `--jui-color-neutral60` | semantic | | Title bar colours. |
| `--jui-space-1`, `--jui-space-2`, `--jui-space-3`, `--jui-space-4`, `--jui-space-5`, `--jui-space-6`, `--jui-space-8` | semantic | | Padding steps. |

## Template

```html
<div class="title">
  <jui-icon data-if="icon" name="{{icon}}"></jui-icon>
  <div class="text">
    <h2>{{title}}</h2>
    <h3 data-if="subtitle">{{subtitle}}</h3>
  </div>
</div>
<div class="contents" data-layout><slot></slot></div>
```

## Style

```css
:host {
  display: flex; flex-direction: column; overflow: hidden;
  --titlepanel-color-border: var(--jui-role-border-default);
  --titlepanel-color-bg: var(--jui-role-surface-raised);
  --titlepanel-color-title: var(--jui-role-text-heading);
  --titlepanel-color-subtitle: var(--jui-color-neutral60);
  --titlepanel-color-icon: var(--jui-color-neutral60);
  --cpt-titlepanel-padding: 0;
}
:host([padding="1"]) { --cpt-titlepanel-padding: var(--jui-space-1); }
:host([padding="2"]) { --cpt-titlepanel-padding: var(--jui-space-2); }
:host([padding="3"]) { --cpt-titlepanel-padding: var(--jui-space-3); }
:host([padding="4"]) { --cpt-titlepanel-padding: var(--jui-space-4); }
:host([padding="5"]) { --cpt-titlepanel-padding: var(--jui-space-5); }
:host([padding="6"]) { --cpt-titlepanel-padding: var(--jui-space-6); }
:host([padding="8"]) { --cpt-titlepanel-padding: var(--jui-space-8); }
.title {
  display: flex; flex-direction: row; align-items: center; gap: 1.5em; padding: 0.75em 1em;
  background: var(--titlepanel-color-bg); border-bottom: 1px solid var(--titlepanel-color-border);
}
:host([variant="above"]) .title { background: transparent; border-bottom: none; }
.title jui-icon { --frag-icon-size: 1.5em; color: var(--titlepanel-color-icon); }
:host([subtitle]) .title jui-icon { --frag-icon-size: 3.25em; }
.text { flex-grow: 1; }
h2 { margin: 0; font-weight: 500; font-size: 1.5em; line-height: 1.2; color: var(--titlepanel-color-title); }
h3 { margin: 0.25em 0 0; font-weight: 400; font-size: 1.25em; line-height: 1.2; color: var(--titlepanel-color-subtitle); }
.contents { padding: var(--cpt-titlepanel-padding); }
:host([scrollable]) { overflow: auto; }
:host([scrollable]) .contents { flex-grow: 1; overflow-y: auto; }
```

## Example

```xml
<div layout="row" gap="4" align="start">
  <jui-title-panel title="Progression" icon="list" padding="4" layout="column" gap="3" grow="">
    <p>Page 1 of the progression.</p>
    <jui-btn label="Next"/>
  </jui-title-panel>
  <jui-title-panel title="Team members" subtitle="People who can see this project" icon="users" padding="4" grow="">
    <p>Content below a title with a subtitle.</p>
  </jui-title-panel>
  <jui-title-panel title="Above style" variant="above" padding="4" grow="">
    <p>The title sits directly above the content.</p>
  </jui-title-panel>
</div>
```
