---
name: jui-info-block
version: 1.0.0
kind: elemental
status: active
summary: InfoBlock component — a heading with a subtitle over lines of small icon-and-text facts.
---

# InfoBlock (component)

## Purpose

Represents JUI's **InfoBlock**: a template component that presents a record's summary — a header (title and
optional subtitle) followed by *info lines*, each a row of small facts (an icon with a value or a link: an email
address, a phone number, a created date). It is used at the top of a record's page or in a card. Use a table or a
form in read-only mode for many labelled fields, and `jui-title-panel` when the title heads a panel of content.

## Anatomy

A column, 1em apart: the header (title as a heading, subtitle in grey beneath it), then each line
(`jui-info-block-line`) holding its items (`jui-info-block-item`).

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| title | content | text | | The header's title (JUI `header(title, …)`). |
| subtitle | content | text | | The header's subtitle (JUI `Header.subtitle(…)`). |
| padding | variant | 0, 1, 2, 3, 4, 6, 8 | 0 | Padding around the block (JUI `padding(Insets)`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| padding | 0 … 8 | Stand in for JUI's `Insets`. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | titled | `title` set | Header drawn. |
| Content | untitled | No `title` | Lines only. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | jui-info-block-line | jui-info-block-line | A column, 1em apart. | The info lines (JUI `line(...)`), in order. |

## Behaviour

None. Link items are clickable.

## Content rules

Title: the record's name. Subtitle: a short description or role. Items: values, not labels — the icon says what
the value is.

## Accessibility

The title is a level-2 heading. Icons in items are decorative, so each value must be recognisable without its
icon or carry an `aria-label`.

## Rules of use

- Keep to two or three lines of a few items each.
- Don't use it for editable data.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-infoblock-subtitle` | component | `#999` | Subtitle colour (JUI's value). |
| `--cpt-infoblock-padding` | component | `0` | Padding; `padding` sets it. |
| `--jui-role-text-heading`, `--jui-font-size-xl` | semantic | | Title colour and size. |
| `--jui-space-1`, `--jui-space-2`, `--jui-space-3`, `--jui-space-4`, `--jui-space-6`, `--jui-space-8` | semantic | | Padding steps. |

## Template

```html
<div class="block">
  <div class="header" data-if="title">
    <h2>{{title}}</h2>
    <p data-if="subtitle">{{subtitle}}</p>
  </div>
  <slot></slot>
</div>
```

## Style

```css
:host { display: block; --cpt-infoblock-subtitle: #999; --cpt-infoblock-padding: 0; }
:host([padding="1"]) { --cpt-infoblock-padding: var(--jui-space-1); }
:host([padding="2"]) { --cpt-infoblock-padding: var(--jui-space-2); }
:host([padding="3"]) { --cpt-infoblock-padding: var(--jui-space-3); }
:host([padding="4"]) { --cpt-infoblock-padding: var(--jui-space-4); }
:host([padding="6"]) { --cpt-infoblock-padding: var(--jui-space-6); }
:host([padding="8"]) { --cpt-infoblock-padding: var(--jui-space-8); }
.block { display: flex; flex-direction: column; gap: 1em; padding: var(--cpt-infoblock-padding); }
h2 { margin: 0; font-weight: 600; font-size: var(--jui-font-size-xl); line-height: 1.3; color: var(--jui-role-text-heading); }
.header p { margin: 0; color: var(--cpt-infoblock-subtitle); }
```

## Example

```xml
<jui-info-block title="Jane Citizen" subtitle="Project lead, Melbourne office">
  <jui-info-block-line>
    <jui-info-block-item icon="mail" label="jane@example.com" link=""/>
    <jui-info-block-item icon="phone" label="+61 3 9000 0000"/>
  </jui-info-block-line>
  <jui-info-block-line>
    <jui-info-block-item icon="calendar" label="Joined 3 March 2024"/>
    <jui-info-block-item icon="map-pin" label="Melbourne"/>
  </jui-info-block-line>
</jui-info-block>
```
