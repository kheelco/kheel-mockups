---
name: jui-pill
version: 1.0.0
kind: composed
status: active
summary: Pill fragment — a small rounded status or tag label with an optional leading icon.
---

# Pill (fragment)

## Purpose

Represents JUI's **Pill** fragment: a small, fully rounded, non-interactive label that conveys a status ("Paid",
"Overdue") or a tag ("Beta", "v2.1") inline with other content — in table cells, card headers, beside titles.
Being a fragment, it is drawn by the component it sits in and has no events of its own (see **Fragment events**).
Use `jui-btn` for anything clickable, and a notice for a message that needs a sentence.

## Anatomy

A rounded span holding an optional leading `jui-icon` and a single-line label that truncates with an ellipsis.
The semantic variants supply their own icon; `icon` replaces it and `no-icon` removes it.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The pill's text. Required: JUI renders nothing without one. |
| variant | variant | neutral, outline, info, success, warning, danger | neutral | Colour scheme and default icon (JUI `Pill.Variant`). |
| icon | content | icon | | Leading icon, replacing the variant's own (JUI `icon(…)`). |
| no-icon | variant | boolean | | Removes the variant's icon (JUI `icon(null)`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | neutral | Grey, no icon. The default for plain tags and counts. |
| variant | outline | White with a subtle border and muted text, no icon. A quiet tag or version marker. |
| variant | info | Blue with an info icon. Informational status: "Draft", "Scheduled". |
| variant | success | Green with a tick. Completed or healthy: "Paid", "Active". |
| variant | warning | Amber with a warning triangle. Needs attention: "Due soon". |
| variant | danger | Red with an alert icon. Failed or blocked: "Overdue", "Failed". |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | default | A label | As the variant. |
| Content | truncated | Label longer than `--frag-pill-max-width` | Label cut with an ellipsis. |

## Behaviour

Static. A pill has no interaction of its own; if the enclosing component attaches one it handles it
(**Fragment events**).

## Content rules

One or two words in sentence case: `Paid`, `Due soon`, `Beta`. Use the same word for the same status everywhere.
Don't end with punctuation.

## Accessibility

Colour is never the only signal: the label carries the meaning and the semantic variants add an icon. The icon is
decorative.

## Rules of use

- Match the variant to the meaning (`danger` only for failure or blocking), not to decoration.
- Keep pills short; a sentence belongs in a notice.
- Don't make pills clickable; use a `jui-btn` or a link.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--frag-pill-bg` | component | `--jui-color-neutral10` | Background; white for outline, the `-10` tint of info, success, warning and danger. |
| `--frag-pill-text` | component | `--jui-color-neutral60` | Label colour; the `-70` shade of info, success, warning and danger. |
| `--frag-pill-border` | component | `transparent` | Border colour; `--jui-color-neutral30` for outline. |
| `--frag-pill-border-width` | component | `1px` | Border width. |
| `--frag-pill-radius` | component | `999px` | Corner radius. |
| `--frag-pill-max-width` | component | `none` | Maximum width before the label truncates. |
| `--frag-pill-padding-tb` | component | `2px` | Vertical padding. |
| `--frag-pill-padding-lr` | component | `8px` | Horizontal padding. |
| `--frag-pill-font-size` | component | `0.72rem` | Label size. |
| `--frag-pill-font-weight` | component | `600` | Label weight. |
| `--frag-pill-text-transform` | component | `none` | Label case. |
| `--frag-pill-letter-spacing` | component | `normal` | Label tracking. |
| `--frag-pill-gap` | component | `4px` | Gap between icon and label. |
| `--frag-pill-icon-color` | component | `--frag-pill-text` | Icon colour. |
| `--frag-pill-icon-size` | component | `0.95em` | Icon size. |
| `--jui-color-neutral10`, `--jui-color-neutral30`, `--jui-color-neutral60`, `--jui-color-aux-white` | semantic | | Neutral and outline colours. |
| `--jui-color-info10`, `--jui-color-info70`, `--jui-color-success10`, `--jui-color-success70`, `--jui-color-warning10`, `--jui-color-warning70`, `--jui-color-error10`, `--jui-color-error70` | semantic | | Semantic variant colours. |

## Template

```html
<span class="pill">
  <span class="icon" data-if="!no-icon">
    <jui-icon data-if="icon" name="{{icon}}"></jui-icon>
    <span class="auto" data-if="!icon">
      <jui-icon data-if="variant=info" name="info"></jui-icon>
      <jui-icon data-if="variant=success" name="circle-check"></jui-icon>
      <jui-icon data-if="variant=warning" name="triangle-alert"></jui-icon>
      <jui-icon data-if="variant=danger" name="circle-alert"></jui-icon>
    </span>
  </span>
  <span class="label">{{label}}</span>
</span>
```

## Style

```css
:host {
  display: inline-flex;
  vertical-align: middle;
  max-width: 100%;
  --frag-pill-bg: var(--jui-color-neutral10);
  --frag-pill-text: var(--jui-color-neutral60);
  --frag-pill-border: transparent;
  --frag-pill-border-width: 1px;
  --frag-pill-radius: 999px;
  --frag-pill-max-width: none;
  --frag-pill-padding-tb: 2px;
  --frag-pill-padding-lr: 8px;
  --frag-pill-font-size: 0.72rem;
  --frag-pill-font-weight: 600;
  --frag-pill-text-transform: none;
  --frag-pill-letter-spacing: normal;
  --frag-pill-gap: 4px;
  --frag-pill-icon-color: var(--frag-pill-text);
  --frag-pill-icon-size: 0.95em;
}
:host([variant="outline"]) { --frag-pill-bg: var(--jui-color-aux-white); --frag-pill-border: var(--jui-color-neutral30); --frag-pill-text: var(--jui-color-neutral60); }
:host([variant="info"]) { --frag-pill-bg: var(--jui-color-info10); --frag-pill-text: var(--jui-color-info70); }
:host([variant="success"]) { --frag-pill-bg: var(--jui-color-success10); --frag-pill-text: var(--jui-color-success70); }
:host([variant="warning"]) { --frag-pill-bg: var(--jui-color-warning10); --frag-pill-text: var(--jui-color-warning70); }
:host([variant="danger"]) { --frag-pill-bg: var(--jui-color-error10); --frag-pill-text: var(--jui-color-error70); }
.pill {
  display: inline-flex; align-items: center; gap: var(--frag-pill-gap);
  padding: var(--frag-pill-padding-tb) var(--frag-pill-padding-lr);
  border: var(--frag-pill-border-width) solid var(--frag-pill-border); border-radius: var(--frag-pill-radius);
  background-color: var(--frag-pill-bg); color: var(--frag-pill-text);
  font-size: var(--frag-pill-font-size); font-weight: var(--frag-pill-font-weight);
  text-transform: var(--frag-pill-text-transform); letter-spacing: var(--frag-pill-letter-spacing);
  line-height: 1.4; white-space: nowrap; max-width: var(--frag-pill-max-width); min-width: 0;
}
.icon, .auto { display: contents; }
jui-icon { color: var(--frag-pill-icon-color); font-size: var(--frag-pill-icon-size); line-height: 1; flex-shrink: 0; }
.label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
```

## Example

```xml
<div layout="column" gap="3">
  <div layout="row" gap="2" align="center" wrap="">
    <jui-pill label="Neutral"/>
    <jui-pill label="v2.1" variant="outline"/>
    <jui-pill label="Scheduled" variant="info"/>
    <jui-pill label="Paid" variant="success"/>
    <jui-pill label="Due soon" variant="warning"/>
    <jui-pill label="Overdue" variant="danger"/>
  </div>
  <div layout="row" gap="2" align="center" wrap="">
    <jui-pill label="Tagged" icon="tag"/>
    <jui-pill label="Paid" variant="success" no-icon=""/>
    <jui-pill label="Assigned" variant="info" icon="user"/>
  </div>
</div>
```
