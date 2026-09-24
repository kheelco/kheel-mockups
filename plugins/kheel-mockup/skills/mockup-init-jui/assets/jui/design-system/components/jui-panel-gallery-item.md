---
name: jui-panel-gallery-item
version: 1.0.0
kind: composed
status: active
summary: PanelGalleryItem component — the standard gallery item, a bordered panel with an icon or avatar, a title, a subtitle and a menu.
---

# PanelGalleryItem (component)

## Purpose

Represents JUI's **PanelGalleryItem** (`…client.gallery.item.PanelGalleryItem`): the standard item a `Gallery`
draws for each record — a white, bordered panel whose header shows a title icon or avatar, the record's title
(plain, or a link that opens it), an optional subtitle and an optional actions menu. It is created with
`PanelGalleryItem.create(builder)` and configured per gallery, not placed on its own. Use it inside `jui-gallery`;
when an item needs a different shape (a card with an image, stacked details), JUI builds a custom item with
`GalleryItemCreator.supplier(…)` — place that content directly in the gallery instead.

## Anatomy

- **Header** — a row: title icon (`jui-icon`, pale; large when there is a subtitle) or a round avatar image; the
  title (bold, or a link) above the subtitle; and a menu activator (`jui-icon`, an ellipsis) at the right.
- **Body** — optional content under the header.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| heading | content | text | | The record's title (`header(title)`). |
| subtitle | content | text | | Secondary line under the title (`header.subtitle(…)`). |
| title-icon | content | icon | | Icon at the left of the header (`header.titleIcon(…)`); 1.5em, or 3em when there is a subtitle. |
| title-avatar | content | text | | Image URL for a round avatar in place of the icon (`header.titleAvatar(…)`). |
| title-link | variant | boolean | | The title is a link that opens the record (`header.clickHandler(…)`). |
| clickable | variant | boolean | | The whole panel opens the record (`clickHandler(…)`): pointer cursor. |
| menu | variant | boolean | | Shows the actions menu activator (`header.menu(…)`). |
| item-width | variant | auto, small, medium, large | auto | Fixed width (`width(Length)`): 14, 18 or 24 em; `auto` fits the content. Ignored in a `row` gallery, where items fill the width. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| title-link | on | The title is the way to open the record; the rest of the panel is not clickable. |
| clickable | on | The whole panel is the target — for simple items without a menu. |
| menu | on | Per-record actions (edit, archive, delete) in a context menu. |
| item-width | small, medium, large | Grid galleries, so tiles line up. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | — |
| Interaction | hover | `:hover` | Title link and menu activator turn the link hover colour. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | | Stacked, padded under the header | Body content under the header (see Notes in the mapping: JUI's `section()` is not yet implemented). |

## Behaviour

Clicking the title link (or the panel, when `clickable`) passes the item to its click handler; clicking the menu
activator opens the context menu of actions. Events are dispatched by the gallery. In a mockup, put `href` or
`opens` on the item.

## Content rules

- Title: the record's name, one line.
- Subtitle: one short line of status or context — "12 tasks, due Friday".
- Menu actions: verbs, the destructive one last.

## Accessibility

The title is a heading (`h6`) or a link. The menu activator must have an accessible name ("Actions") in the real
implementation. Avatars are decorative next to the title.

## Rules of use

- Use either `title-link` or `clickable`, not both.
- Give all items in a grid the same `item-width`.
- Prefer an icon that says what kind of record it is; an avatar for people.

## Tokens

JUI's stylesheet for this item uses literal colours; the mockup names them as component tokens with JUI's values.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-pgi-bg` | component | `--jui-color-aux-white` | Panel background. |
| `--cpt-pgi-border` | component | `#eee` | Panel border. |
| `--cpt-pgi-radius` | component | `--jui-radius-sm` | Panel radius (4px). |
| `--cpt-pgi-icon` | component | `#ddd` | Title icon colour. |
| `--cpt-pgi-title` | component | `#444` | Plain title colour. |
| `--cpt-pgi-menu` | component | `#c4c4c4` | Menu activator colour. |
| `--cpt-pgi-avatar-border` | component | `#ccc` | Avatar ring. |
| `--jui-color-aux-white`, `--jui-radius-sm` | semantic | | Panel background and radius defaults. |
| `--jui-text-link`, `--jui-text-link-hover` | semantic | | Title link colour and hover; menu hover. |

## Template

```html
<div class="panel">
  <div class="header">
    <jui-icon class="title-icon" data-if="title-icon" name="{{title-icon}}"></jui-icon>
    <span class="avatar" data-if="title-avatar"><img src="{{title-avatar}}" alt=""/></span>
    <div class="body">
      <h6 data-if="!title-link">{{heading}}</h6>
      <a class="title" data-if="title-link">{{heading}}</a>
      <p data-if="subtitle">{{subtitle}}</p>
    </div>
    <span class="menu" data-if="menu"><jui-icon name="ellipsis"></jui-icon></span>
  </div>
  <div class="sections"><slot></slot></div>
</div>
```

## Style

```css
:host {
  display: inline-block;
  vertical-align: top;
  --cpt-pgi-bg: var(--jui-color-aux-white);
  --cpt-pgi-border: #eee;
  --cpt-pgi-radius: var(--jui-radius-sm);
  --cpt-pgi-icon: #ddd;
  --cpt-pgi-title: #444;
  --cpt-pgi-menu: #c4c4c4;
  --cpt-pgi-avatar-border: #ccc;
}
:host([item-width="small"]) { width: 14em; }
:host([item-width="medium"]) { width: 18em; }
:host([item-width="large"]) { width: 24em; }
:host([clickable]), :host([href]), :host([opens]) { cursor: pointer; }
.panel { border: 1px solid var(--cpt-pgi-border); background: var(--cpt-pgi-bg); border-radius: var(--cpt-pgi-radius); height: 100%; }
.header { padding: 1em 1.15em; display: flex; gap: 1em; align-items: start; }
.title-icon { color: var(--cpt-pgi-icon); font-size: 1.5em; }
:host([subtitle]) .title-icon { font-size: 3em; }
:host([title-avatar]) .title-icon { display: none; }
.avatar { display: inline-block; border: 1px solid var(--cpt-pgi-avatar-border); border-radius: 100%; line-height: 0; }
.avatar img { border: 2px solid var(--cpt-pgi-bg); border-radius: 100%; width: 3.3em; height: 3.3em; }
.body { flex-grow: 1; min-width: 0; }
h6 { font-size: 1.2em; margin: 0; color: var(--cpt-pgi-title); font-weight: bold; }
.title { font-size: 1.2em; color: var(--jui-text-link); font-weight: bold; text-decoration: none; cursor: pointer; transition: 0.15s ease-in color; }
.title:hover, :host([state~="hover"]) .title { color: var(--jui-text-link-hover); }
p { margin: 0; }
.menu { color: var(--cpt-pgi-menu); cursor: pointer; font-size: 1.3em; width: 1em; margin-right: -0.4em; text-align: center; transition: 0.3s ease-in color; }
.menu:hover, :host([state~="hover"]) .menu { color: var(--jui-text-link); }
.sections { display: none; padding: 0 1.15em 1em; }
:host([data-filled~="default"]) .sections { display: block; }
```

## Example

```xml
<div layout="row" gap="4" wrap="" align="start">
  <jui-panel-gallery-item heading="Website refresh" subtitle="12 tasks, due Friday" title-icon="folder" title-link="" menu="" item-width="medium"/>
  <jui-panel-gallery-item heading="Quarterly report" title-icon="file-text" item-width="medium" clickable=""/>
  <jui-panel-gallery-item heading="Mobile app" subtitle="Hovered" title-icon="folder" title-link="" menu="" item-width="medium" state="hover"/>
  <jui-panel-gallery-item heading="Onboarding" subtitle="3 of 5 steps done" title-icon="users" item-width="medium">
    Next: invite your team.
  </jui-panel-gallery-item>
</div>
```
