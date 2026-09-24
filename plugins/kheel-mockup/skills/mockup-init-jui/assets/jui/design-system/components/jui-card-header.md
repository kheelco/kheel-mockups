---
name: jui-card-header
version: 1.0.0
kind: composed
status: active
summary: CardHeader fragment — a card's heading row with a large icon, a title and a subtitle.
---

# CardHeader (fragment)

## Purpose

Represents JUI's **CardHeader** fragment: the heading row that opens a `jui-card` — an optional large icon beside
a title and a muted subtitle. When the header has an action the title becomes a link, and its click is handled
by the enclosing component (see **Fragment events**). Use a plain heading for a card that needs only a title, and
a panel's own title bar for a region that is not a card.

## Anatomy

A row, `1em` gap, vertically centred: a `jui-icon` drawn at twice the text size, then a column of the title
(medium weight; link-coloured when clickable) and the subtitle (smaller, subtle).

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| title | content | text | | The title (JUI `title(…)`); JUI shows `MISSING TITLE` when none is given. |
| subtitle | content | text | | Secondary line under the title (JUI `subtitle(…)`). |
| icon | content | icon | | Large leading icon (JUI `icon(…)`). |
| link | variant | boolean | | The title is a link (JUI `onclick(…)`). Implied by `href` or `opens`. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| link | off | A static heading. |
| link | on | The title opens the item; link colour, underline on hover. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Title in text or link colour. |
| Interaction | hover | `:hover` on a linked title | Title underlined. |
| Interaction | focus | `:focus-visible` on a linked title | Focus ring round the title. |

## Behaviour

With an action, clicking the title (not the whole row) invokes it through the enclosing component
(**Fragment events**). In a mockup put `href` or `opens` on the header.

## Content rules

Title: the item's name, a few words, no trailing punctuation. Subtitle: one short line of context (location,
type, date), separated by `·` rather than commas when listing facts.

## Accessibility

A linked title is an `a` element; give it an `href` in the implementation so it is keyboard reachable. The icon is
decorative.

## Rules of use

- One header per card, first in the card.
- Keep the subtitle to one line; put longer text in the card body.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-card-header-gap` | component | `1em` | Gap between icon and text. |
| `--jui-card-header-icon-size` | component | `2em` | Icon size. |
| `--jui-card-header-title-color` | component | `--jui-text` | Title colour; `--jui-text-link` when linked. |
| `--jui-card-header-title-weight` | component | `500` | Title weight. |
| `--jui-card-header-subtitle-color` | component | `--jui-text-subtle` | Subtitle colour. |
| `--jui-card-header-subtitle-size` | component | `0.9em` | Subtitle size. |
| `--jui-text`, `--jui-text-link`, `--jui-text-subtle` | semantic | | Text colours. |
| `--jui-role-focus-ring` | semantic | | Focus ring. |

## Template

```html
<div class="header">
  <span class="icon" data-if="icon"><jui-icon name="{{icon}}"></jui-icon></span>
  <div class="inner">
    <div class="title">{{title}}</div>
    <div class="subtitle" data-if="subtitle">{{subtitle}}</div>
  </div>
</div>
```

## Style

```css
:host {
  display: block;
  --jui-card-header-gap: 1em;
  --jui-card-header-icon-size: 2em;
  --jui-card-header-title-color: var(--jui-text);
  --jui-card-header-title-weight: 500;
  --jui-card-header-subtitle-color: var(--jui-text-subtle);
  --jui-card-header-subtitle-size: 0.9em;
}
:host([link]), :host([href]), :host([opens]) { --jui-card-header-title-color: var(--jui-text-link); }
.header { display: flex; flex-direction: row; gap: var(--jui-card-header-gap); align-items: center; }
.icon { display: inline-flex; flex: none; font-size: var(--jui-card-header-icon-size); width: 1em; height: 1em; }
.inner { display: flex; flex-direction: column; gap: 0.2em; min-width: 0; }
.title { color: var(--jui-card-header-title-color); font-weight: var(--jui-card-header-title-weight); }
:host([link]) .title, :host([href]) .title, :host([opens]) .title { cursor: pointer; text-decoration: none; }
:host([link]) .title:hover, :host([href]) .title:hover, :host([opens]) .title:hover, :host([state~="hover"]) .title { text-decoration: underline; }
:host([state~="focus"]) .title, .title:focus-visible { outline: 2px solid var(--jui-role-focus-ring); outline-offset: 2px; }
.subtitle { color: var(--jui-card-header-subtitle-color); font-size: var(--jui-card-header-subtitle-size); }
```

## Example

```xml
<div layout="column" gap="4">
  <jui-card-header icon="briefcase" title="Senior designer" subtitle="Melbourne · Full time"/>
  <jui-card-header icon="folder" title="Linked title" subtitle="Opens the record" link=""/>
  <jui-card-header icon="folder" title="Linked, hovered" subtitle="Underlined" link="" state="hover"/>
  <jui-card-header title="No icon" subtitle="Title and subtitle only"/>
  <jui-card-header icon="users" title="Title only"/>
</div>
```
