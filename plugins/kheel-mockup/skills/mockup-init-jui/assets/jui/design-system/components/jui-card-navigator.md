---
name: jui-card-navigator
version: 1.0.0
kind: composed
status: active
summary: CardNavigator component — a grid of cards leading to sections, each shown under a breadcrumb back to the grid.
---

# CardNavigator (component)

## Purpose

Represents JUI's **CardNavigator** component: navigation among sections presented as cards. At the top level it
shows a title and a grid of cards (label and description); choosing a card shows that card's component in the
body under a header with a breadcrumb back to the top and the card's name. Cards can be nested ("segmented"
cards such as `users/user`), which lengthens the breadcrumb. It suits settings or administration areas with
many independent sections. Use `jui-tab-navigator` when the sections are few and the user moves between them
often, since tabs stay visible.

A mockup shows one of its two states: the **top level** (no `current`; the cards) or a **card open**
(`current` set; the breadcrumb header and the card's content in the body).

## Anatomy

- Top level: a header with the title, then a white panel with rounded top corners holding the cards
  (`jui-card-navigator-card`), wrapped in rows.
- Card open: a header with a divider beneath, holding the breadcrumb (the title, with a back arrow in the compact
  variant; then any parent card; then, in the extended and compact variants, the current card with its notice)
  and, except in the compact variant, a heading with a round back button and the current card's label. The body
  below holds the card's content.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| title | content | text | | The navigator's title: the top-level heading and the first crumb (JUI `title(String)`). |
| variant | variant | standard, extended, compact | standard | The header's presentation (JUI `CardNavigator.Config.Style`). |
| current | content | text | | The label of the open card. When set, the card-open state is shown; when absent, the top level. |
| parent | content | text | | The label of a parent card, for a nested (segmented) card, shown as a crumb between the title and the current card. |
| notice | content | text | | A small notice beside the current crumb, such as `Beta` (the card's `notice(String)`); extended and compact only. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | standard | Breadcrumb up to the parent, then the current card as a large heading with a back button (JUI `STANDARD`). |
| variant | extended | As standard, but the breadcrumb continues to the current card (JUI `EXTENDED`). |
| variant | compact | Breadcrumb only, the current card last and larger, the title crumb with a back arrow; no top-level heading (JUI `COMPACT`). |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Navigation | top | `current` absent | Title and the grid of cards. |
| Navigation | card | `current` set | Breadcrumb header and the card's content. |
| Interaction | default | At rest | Crumbs as text. |
| Interaction | crumb-hover | `:hover` on a crumb | The crumb fills with the action colour and its text turns white. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| cards | jui-card-navigator-card | jui-card-navigator-card | A wrapping row of fixed-size cards. | The cards of the top level (JUI `card(reference, component, config)`). Placed here without `slot`. |
| default | any | jui-panel | configurable | The open card's content, shown when `current` is set. |

## Behaviour

Clicking a card navigates to it: the grid is replaced by the card's component and the breadcrumb header. Clicking
the title crumb or the back button returns to the parent or the top level. Navigation is path-based
(`section/card`), so cards can be linked to directly. In a mockup, give each card an `href` to the mockup of the
open card, and the open card's mockup a `href` on nothing — show the back link in the `specification`.

## Content rules

Card labels are short nouns (`Users`, `Billing`); descriptions one sentence saying what the section manages.
The title names the whole area (`Settings`).

## Accessibility

The title and current card are level-2 headings; card labels level-3. Crumbs and cards are clickable elements
and in the application should be links or buttons with visible focus.

## Rules of use

- Show either the top level or one open card per mockup; use a separate mockup for each.
- Keep descriptions short: cards have a fixed size and scroll their content.
- Use `parent` only for segmented cards (an entity within a section).

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-cardnavigator-action-bg` | component | `--jui-btn-bg` | Hovered crumbs and the back button. |
| `--jui-cardnavigator-notice` | component | `--jui-color-aux-white` | Notice text (JUI sets `#fff`). |
| `--jui-cardnavigator-notice-bg` | component | `--jui-color-secondary30` | Notice background. |
| `--jui-cardnavigator-header-border` | component | `#eee` | Divider under the card-open header (JUI's value). |
| `--jui-cardnavigator-header-bg` | component | `transparent` | Card-open header background. |
| `--jui-cardnavigator-header-color` | component | `inherit` | Card-open header text colour. |
| `--jui-cardnavigator-maxwidth` | component | `200px` | Minimum width of the navigator. |
| `--frag-icon-size` | component | `0.7em` | Size of the crumb separators and the back-button chevron. |
| `--jui-btn-bg`, `--jui-color-aux-white`, `--jui-color-secondary30`, `--jui-role-text-heading` | semantic | | Action, notice and heading colours; the white card panel. |

## Template

```html
<div class="wrap">
  <header class="header top" data-if="!current"><h2>{{title}}</h2></header>
  <header class="header open" data-if="current">
    <div class="crumb">
      <span class="clickable" data-if="title"><jui-icon class="back" name="arrow-left"></jui-icon>{{title}}</span>
      <jui-icon class="sep" data-if="parent" name="chevron-right"></jui-icon>
      <span class="clickable" data-if="parent">{{parent}}</span>
      <jui-icon class="sep last" name="chevron-right"></jui-icon>
      <span class="last">{{current}}<span class="notice" data-if="notice">{{notice}}</span></span>
    </div>
    <h2><a class="back"><jui-icon name="chevron-left"></jui-icon></a><span>{{current}}</span></h2>
  </header>
  <div class="navigator" data-if="!current"><div class="cards"><slot name="cards"></slot></div></div>
  <div class="body" data-if="current" data-layout><slot></slot></div>
</div>
```

## Style

```css
:host {
  display: block;
  --jui-cardnavigator-action-bg: var(--jui-btn-bg);
  --jui-cardnavigator-notice: var(--jui-color-aux-white);
  --jui-cardnavigator-notice-bg: var(--jui-color-secondary30);
  --jui-cardnavigator-header-border: #eee;
  --jui-cardnavigator-header-bg: transparent;
  --jui-cardnavigator-header-color: inherit;
  --jui-cardnavigator-maxwidth: 200px;
}
.wrap { height: 100%; display: flex; flex-direction: column; min-width: var(--jui-cardnavigator-maxwidth); }
.header { padding: 1em 2em; }
.header.open { border-bottom: 1px solid var(--jui-cardnavigator-header-border); background: var(--jui-cardnavigator-header-bg); color: var(--jui-cardnavigator-header-color); }
h2 { margin: 0; font-size: 1.5em; font-weight: 600; line-height: 1.3; display: flex; gap: 0.25em; align-items: center; color: var(--jui-role-text-heading); }
.crumb { margin-bottom: 0.5em; display: flex; align-items: center; position: relative; gap: 0.25em; left: -0.5em; }
.crumb .sep { --frag-icon-size: 0.7em; }
.crumb > span { font-weight: 500; display: flex; align-items: center; gap: 1em; padding: 0.25em 0.75em; border-radius: 12px; position: relative; }
.crumb .back { display: none; }
.crumb span.clickable { cursor: pointer; }
.crumb span.clickable:hover, :host([state~="crumb-hover"]) .crumb span.clickable:first-child { background: var(--jui-cardnavigator-action-bg); color: var(--jui-color-aux-white); }
.crumb .last { display: none; }
.notice {
  background-color: var(--jui-cardnavigator-notice-bg); color: var(--jui-cardnavigator-notice);
  position: absolute; left: 100%; top: 4px; font-size: 0.7em; font-weight: 500; padding: 1px 5px; border-radius: 4px; white-space: nowrap;
}
h2 a.back {
  cursor: pointer; display: flex; align-items: center; justify-content: center; width: 1.25em; height: 1.25em;
  border-radius: 100%; color: var(--jui-cardnavigator-action-bg); position: relative; left: -0.25em; --frag-icon-size: 0.7em;
}
h2 a.back:hover { color: var(--jui-color-aux-white); background-color: var(--jui-cardnavigator-action-bg); }
.navigator {
  flex-grow: 1; background: var(--jui-color-aux-white); margin: 0 2em; border-radius: 1em 1em 0 0; padding: 2em;
  border: 1px solid #f1f1f1; border-bottom: none;
}
.cards { display: flex; gap: 1em; flex-wrap: wrap; }
.body { flex-grow: 1; }
:host([variant="extended"]) .crumb .last, :host([variant="compact"]) .crumb .last { display: flex; }
:host([variant="extended"]) .crumb jui-icon.last, :host([variant="compact"]) .crumb jui-icon.last { display: inline-flex; }
:host([variant="compact"]) .header.top { display: none; }
:host([variant="compact"]) .crumb { margin-bottom: 0; }
:host([variant="compact"]) .crumb .back { display: inline-flex; }
:host([variant="compact"]) h2 { display: none; }
:host([variant="compact"]) .crumb > span.last { font-size: 1.2em; font-weight: 500; }
```

## Example

```xml
<div layout="column" gap="6">
  <jui-card-navigator title="Settings">
    <jui-card-navigator-card label="Users" description="Invite people and manage their roles."/>
    <jui-card-navigator-card label="Billing" description="Plan, payment method and invoices." state="hover"/>
    <jui-card-navigator-card label="Integrations" description="Connect other services."/>
  </jui-card-navigator>
  <jui-card-navigator title="Settings" current="Users">
    <jui-panel padding="4">STANDARD — the Users card's content.</jui-panel>
  </jui-card-navigator>
  <jui-card-navigator title="Settings" parent="Users" current="Jane Citizen" variant="extended" notice="Beta" state="crumb-hover">
    <jui-panel padding="4">EXTENDED — a segmented card (users/user).</jui-panel>
  </jui-card-navigator>
  <jui-card-navigator title="Settings" current="Billing" variant="compact">
    <jui-panel padding="4">COMPACT — breadcrumb only.</jui-panel>
  </jui-card-navigator>
</div>
```
