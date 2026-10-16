---
name: jui-accordion
version: 1.0.0
kind: composed
status: active
summary: Accordion fragment — a collapsible section card with a caret, optional icon, title and summary over a body.
---

# Accordion (fragment)

## Purpose

Represents JUI's **Accordion** fragment: a bordered section card whose header (caret, optional icon tile, title
and a summary line) opens and closes the body beneath it. Use it to break a long form or page into sections the
user can fold away — each section summarising its contents while closed — or, with `fixed`, as a static section
card with the same look. Being a fragment, it has no events of its own: anything in its header or body is
handled by the enclosing component (see **Fragment events**). For a plain surface with no heading use a card; for
switching between sections that are never shown together use tabs.

## Anatomy

- **Header** — a caret (`jui-icon` chevron, turned down when open), an optional icon tile (`jui-icon` in a grey
  rounded square), the title and, below it, the summary.
- **Body** — the section's content, padded and separated from the header by a light rule. Hidden when collapsed.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| title | content | text | | The title shown in the header. |
| icon | content | icon | | Optional icon shown in a tile beside the title. |
| collapsed | state | boolean | | Shows the accordion closed (JUI `open(false)`); JUI accordions start open. |
| fixed | variant | boolean | | Not collapsible (JUI `collapsible(false)`): always open, no caret, no click affordance. |
| no-header | variant | boolean | | Hides the header, leaving only the framed body (JUI `header(false)`). |
| error | state | boolean | | Marks the section as containing invalid content (JUI `error(true)`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| fixed | present | A static section card among collapsible ones, or a section that must always be seen. |
| no-header | present | A framed body with no heading, matching neighbouring accordions. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | White header. |
| Interaction | hover | `:hover` on the header | Header background `#fafafa` (not when `fixed`). |
| Expansion | open | Default | Caret points down; body shown. |
| Expansion | collapsed | `collapsed` property | Caret points right; body hidden; header rounded on all corners. |
| Validation | valid | Default | — |
| Validation | error | `error` property | Rust-red border, caret and title; pale red icon tile. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| summary | | jui-icon | A wrapping row with a small gap, under the title. | A short summary of the section's contents ("Manager · Peer · 2 of 6"), useful while collapsed. |
| default | | | configurable | The section's body. |

## Behaviour

Clicking the header toggles the body (a native `details` element in JUI), unless `fixed`. JUI can open, close,
mark in error, hide or show the accordion after it is rendered. Controls in the body are handled by the enclosing
component (**Fragment events**).

## Content rules

The title names the section in a few words (`Reviewers`, `Schedule`). The summary states what the section
currently holds, not instructions.

## Accessibility

The header is a native `summary`, so it is keyboard focusable and announces expanded or collapsed. The error
state must be explained by a message in the body, not by colour alone.

## Rules of use

- Keep sections open by default unless there are many; use `collapsed` for secondary sections.
- Use `error` together with an error message on the offending control inside.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer. The raw colours are JUI's own.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-accordion-bg` | component | `#ffffff` | Card background (and header hover when `fixed`). |
| `--cpt-accordion-border` | component | `#d4d4d4` | Card border; the error border when `error`. |
| `--cpt-accordion-radius` | component | `8px` | Corner radius. |
| `--cpt-accordion-summary-padding` | component | `0.875em 1em` | Header padding. |
| `--cpt-accordion-summary-gap` | component | `1em` | Gap between caret, icon and title. |
| `--cpt-accordion-summary-hover-bg` | component | `#fafafa` | Header hover background. |
| `--cpt-accordion-caret-color` | component | `#9a9a9a` | Caret colour; the error colour when `error`. |
| `--cpt-accordion-icon-size` | component | `3em` | Icon tile size (the glyph is 55 % of it). |
| `--cpt-accordion-icon-radius` | component | `6px` | Icon tile radius. |
| `--cpt-accordion-icon-bg` | component | `#f0f0f0` | Icon tile background; pale red when `error`. |
| `--cpt-accordion-icon-color` | component | `#555555` | Icon colour; red when `error`. |
| `--cpt-accordion-title-color` | component | `#222222` | Title colour; dark red when `error`. |
| `--cpt-accordion-title-size` | component | `1.2em` | Title size. |
| `--cpt-accordion-title-weight` | component | `600` | Title weight. |
| `--cpt-accordion-sum-color` | component | `#6b6b6b` | Summary colour. |
| `--cpt-accordion-sum-size` | component | `1em` | Summary size. |
| `--cpt-accordion-sum-gap` | component | `6px` | Gap between summary items. |
| `--cpt-accordion-body-padding` | component | `1.5em` | Body padding. |
| `--cpt-accordion-body-border` | component | `#ececec` | Rule between header and body. |
| `--cpt-accordion-error-border` | component | `#c0432a` | Border in the error state. |
| `--cpt-accordion-error-caret-color` | component | `#c0432a` | Caret in the error state. |
| `--cpt-accordion-error-icon-bg` | component | `#fae3d8` | Icon tile in the error state. |
| `--cpt-accordion-error-icon-color` | component | `#c0432a` | Icon in the error state. |
| `--cpt-accordion-error-title-color` | component | `#a13720` | Title in the error state. |
| `--jui-role-focus-ring` | semantic | | Focus ring on the header. |

## Template

```html
<div class="acc">
  <div class="summary" tabindex="0">
    <span class="caret"><jui-icon name="chevron-right"></jui-icon></span>
    <div class="icon" data-if="icon"><jui-icon name="{{icon}}"></jui-icon></div>
    <div class="head">
      <div class="title" data-if="title">{{title}}</div>
      <div class="sum"><slot name="summary"></slot></div>
    </div>
  </div>
  <div class="body" data-layout=""><slot></slot></div>
</div>
```

## Style

```css
:host {
  display: block;
  --cpt-accordion-bg: #ffffff;
  --cpt-accordion-border: #d4d4d4;
  --cpt-accordion-radius: 8px;
  --cpt-accordion-summary-padding: 0.875em 1em;
  --cpt-accordion-summary-gap: 1em;
  --cpt-accordion-summary-hover-bg: #fafafa;
  --cpt-accordion-caret-color: #9a9a9a;
  --cpt-accordion-icon-size: 3em;
  --cpt-accordion-icon-radius: 6px;
  --cpt-accordion-icon-bg: #f0f0f0;
  --cpt-accordion-icon-color: #555555;
  --cpt-accordion-title-color: #222222;
  --cpt-accordion-title-size: 1.2em;
  --cpt-accordion-title-weight: 600;
  --cpt-accordion-sum-color: #6b6b6b;
  --cpt-accordion-sum-size: 1em;
  --cpt-accordion-sum-gap: 6px;
  --cpt-accordion-body-padding: 1.5em;
  --cpt-accordion-body-border: #ececec;
  --cpt-accordion-error-border: #c0432a;
  --cpt-accordion-error-caret-color: #c0432a;
  --cpt-accordion-error-icon-bg: #fae3d8;
  --cpt-accordion-error-icon-color: #c0432a;
  --cpt-accordion-error-title-color: #a13720;
}
:host([error]) {
  --cpt-accordion-border: var(--cpt-accordion-error-border);
  --cpt-accordion-caret-color: var(--cpt-accordion-error-caret-color);
  --cpt-accordion-icon-bg: var(--cpt-accordion-error-icon-bg);
  --cpt-accordion-icon-color: var(--cpt-accordion-error-icon-color);
  --cpt-accordion-title-color: var(--cpt-accordion-error-title-color);
}
.acc {
  background: var(--cpt-accordion-bg);
  border: 1px solid var(--cpt-accordion-border);
  border-radius: var(--cpt-accordion-radius);
}
.summary {
  cursor: pointer;
  padding: var(--cpt-accordion-summary-padding);
  display: flex;
  align-items: center;
  gap: var(--cpt-accordion-summary-gap);
  border-radius: var(--cpt-accordion-radius) var(--cpt-accordion-radius) 0 0;
}
:host([collapsed]:not([fixed])) .summary { border-radius: var(--cpt-accordion-radius); }
.summary:hover, :host([state~="hover"]) .summary { background: var(--cpt-accordion-summary-hover-bg); }
.summary:focus-visible, :host([state~="focus"]) .summary { outline: 2px solid var(--jui-role-focus-ring); outline-offset: 2px; }
.caret {
  color: var(--cpt-accordion-caret-color);
  display: inline-flex;
  transition: transform 0.15s ease;
  flex-shrink: 0;
  transform: rotate(90deg);
}
:host([collapsed]:not([fixed])) .caret { transform: none; }
.icon {
  width: var(--cpt-accordion-icon-size);
  height: var(--cpt-accordion-icon-size);
  border-radius: var(--cpt-accordion-icon-radius);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--cpt-accordion-icon-bg);
  color: var(--cpt-accordion-icon-color);
  flex-shrink: 0;
  font-size: calc(var(--cpt-accordion-icon-size) * 0.55);
}
.head { flex: 1; min-width: 0; }
.title {
  font-weight: var(--cpt-accordion-title-weight);
  font-size: var(--cpt-accordion-title-size);
  color: var(--cpt-accordion-title-color);
}
.sum {
  display: none;
  font-size: var(--cpt-accordion-sum-size);
  color: var(--cpt-accordion-sum-color);
  margin-top: 0.2em;
  align-items: center;
  gap: var(--cpt-accordion-sum-gap);
  flex-wrap: wrap;
}
:host([data-filled~="summary"]) .sum { display: flex; }
.body {
  display: block;
  padding: var(--cpt-accordion-body-padding);
  border-top: 1px solid var(--cpt-accordion-body-border);
}
:host([collapsed]:not([fixed])) .body { display: none; }
:host([fixed]) .summary { cursor: default; }
:host([fixed]) .summary:hover, :host([fixed][state~="hover"]) .summary { background: var(--cpt-accordion-bg); }
:host([fixed]) .caret { display: none; }
:host([no-header]) .summary { display: none; }
:host([no-header]) .body { border-top: none; }
```

## Example

```xml
<div layout="column" gap="3">
  <jui-accordion title="Reviewers" icon="users">
    <span slot="summary">Manager · Peer · 2 of 6</span>
    <p>Choose who reviews this submission and in what order.</p>
  </jui-accordion>
  <jui-accordion title="Schedule" icon="calendar" collapsed="" state="hover">
    <span slot="summary">Weekly, starting Monday</span>
    <p>Hidden while collapsed.</p>
  </jui-accordion>
  <jui-accordion title="Attachments" icon="paperclip" error="">
    <span slot="summary">1 file failed to upload</span>
    <p>Remove the failed file or upload it again.</p>
  </jui-accordion>
  <jui-accordion title="Terms" fixed="">
    <p>A static section card: always open, no caret.</p>
  </jui-accordion>
  <jui-accordion no-header="">
    <p>A framed body with no header.</p>
  </jui-accordion>
</div>
```
