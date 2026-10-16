---
name: jui-progress-bar
version: 1.0.0
kind: elemental
status: active
summary: ProgressBar fragment — a bar filled to a percentage, with the percentage and optional commentary.
---

# ProgressBar (fragment)

## Purpose

Represents JUI's **ProgressBar** fragment: a horizontal bar filled to a percentage, with the percentage shown
beside it (or beneath, in the vertical variants) and an optional line of commentary ("3 of 8 steps"). Use it for
progress through a known amount of work — a task, an upload, a profile's completeness. Being a fragment, it has no
events; the enclosing component re-renders it as the progress changes (see **Fragment events**). For a compact
bar with a label above it use `jui-percentage-line`; for a circular dial use `jui-percentage-gauge`; for content
that is loading use `jui-loading`.

## Anatomy

- **Bar** — a bordered, rounded track with a fill to the percentage.
- **Indicator** — the percentage as text (`45%`): to the right of the bar, or on the left with
  `percentage-on-left`, or at the end of the commentary row in the vertical variants.
- **Commentary** — optional text: after the bar (before it when reversed), or on a row beneath the bar in the
  vertical variants.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| percentage | content | number | 0 | The progress, 0 to 100. |
| commentary | content | text | | Commentary beside or beneath the bar. |
| variant | variant | standard, reverse, vertical, vertical-mono | standard | The arrangement and look (JUI `ProgressBar.Variant`). |
| percentage-on-left | variant | boolean | | Puts the percentage (and, horizontally, the commentary) before the bar (JUI `percentageOnLeft(true)`; `reverse` does this). |
| bar-only | variant | boolean | | Shows the bar alone, 1 em high, without the percentage (JUI `barOnly(true)`); commentary still shows. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | standard | Bar, then the percentage, then the commentary, on one line. Green outline, pale green fill. |
| variant | reverse | Commentary, then the percentage, then the bar: for right-aligned progress in tables. |
| variant | vertical | A thin 5 px bar with the commentary and the percentage on a row beneath: for cards. |
| variant | vertical-mono | A 7 px borderless grey track with a solid green fill and a bold green percentage beneath: a stronger vertical look. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Progress | empty | `percentage="0"` | Empty track, `0%`. |
| Progress | in-progress | `percentage` between 1 and 99 | Track filled to the percentage. |
| Progress | complete | `percentage="100"` | Track full, `100%`. |

## Behaviour

Static; the enclosing component re-renders it when the progress changes (**Fragment events**). Negative
percentages show as 0.

## Content rules

Commentary counts what the percentage measures: `3 of 8 steps`, `12 MB of 40 MB`. Keep it to a few words.

## Accessibility

The percentage is shown as text. In the real screen expose the bar as a progress indicator with its value.

## Rules of use

- Use a progress bar only when the total is known; otherwise use a spinner or `jui-loading`.
- Use one variant consistently within a list or table.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer. The raw colours are JUI's own.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--frag-progress-bar-border-color` | component | `--jui-color-success70` | Track border. |
| `--frag-progress-bar-border-size` | component | `1px` | Track border width; `0` for `vertical-mono`. |
| `--frag-progress-bar-border-radius` | component | `10px` | Track radius; `3px` for the vertical variants. |
| `--frag-progress-bar-bg` | component | `#fff` | Track background; `#eeeeee` for `vertical-mono`. |
| `--frag-progress-bar-fg` | component | `--jui-color-success10` | Fill colour; `--jui-color-success70` for `vertical-mono`. |
| `--frag-progress-bar-height` | component | `10px` | Track height; `5px` vertical, `7px` vertical-mono, `1em` bar-only. |
| `--frag-progress-commentary-vertical-gap` | component | `0.5em` | Gap between the bar and the commentary row, vertically. |
| `--frag-progress-commentary-gap` | component | `2em` | Gap between the bar and the commentary, horizontally. |
| `--frag-progress-commentary-color` | component | `--jui-color-neutral50` | Commentary colour. |
| `--frag-progress-commentary-size` | component | `1em` | Commentary size. |
| `--frag-progress-commentary-weight` | component | `500` | Commentary weight. |
| `--frag-progress-indicator-gap` | component | `1em` | Gap between the bar and the percentage. |
| `--frag-progress-indicator-color` | component | `--jui-color-neutral50` | Percentage colour; `--jui-color-success80` for `vertical-mono`. |
| `--frag-progress-indicator-size` | component | `1em` | Percentage size; `1.2em` for `vertical-mono`. |
| `--frag-progress-indicator-weight` | component | `400` | Percentage weight; `600` for `vertical-mono`. |
| `--jui-color-success10`, `--jui-color-success70`, `--jui-color-success80`, `--jui-color-neutral50` | semantic | | Bar and text colours. |

## Template

```html
<div class="pb">
  <div class="outer">
    <div class="bar"><div class="fill" style="width: {{percentage}}%"></div></div>
    <div class="indicator" data-if="!bar-only">{{percentage}}%</div>
  </div>
  <div class="commentary">
    <div class="text" data-if="commentary">{{commentary}}</div>
    <div class="spacer"></div>
    <div class="indicator" data-if="!bar-only">{{percentage}}%</div>
  </div>
</div>
```

## Style

```css
:host {
  display: block;
  --frag-progress-bar-border-color: var(--jui-color-success70);
  --frag-progress-bar-border-size: 1px;
  --frag-progress-bar-border-radius: 10px;
  --frag-progress-bar-bg: #fff;
  --frag-progress-bar-fg: var(--jui-color-success10);
  --frag-progress-bar-height: 10px;
  --frag-progress-commentary-vertical-gap: 0.5em;
  --frag-progress-commentary-gap: 2em;
  --frag-progress-commentary-color: var(--jui-color-neutral50);
  --frag-progress-commentary-size: 1em;
  --frag-progress-commentary-weight: 500;
  --frag-progress-indicator-gap: 1em;
  --frag-progress-indicator-color: var(--jui-color-neutral50);
  --frag-progress-indicator-size: 1em;
  --frag-progress-indicator-weight: 400;
}
:host([bar-only]) { --frag-progress-bar-height: 1em; }
:host([variant="vertical"]) { --frag-progress-bar-height: 5px; --frag-progress-bar-border-radius: 3px; }
:host([variant="vertical-mono"]) {
  --frag-progress-bar-border-size: 0; --frag-progress-bar-height: 7px; --frag-progress-bar-border-radius: 3px;
  --frag-progress-bar-bg: #eeeeee; --frag-progress-bar-fg: var(--jui-color-success70);
  --frag-progress-indicator-color: var(--jui-color-success80); --frag-progress-indicator-size: 1.2em; --frag-progress-indicator-weight: 600;
}
.pb { display: flex; gap: var(--frag-progress-commentary-gap); align-items: center; }
.outer { flex: 1; display: flex; align-items: center; gap: var(--frag-progress-indicator-gap); }
.bar {
  flex: 1;
  border: var(--frag-progress-bar-border-size) solid var(--frag-progress-bar-border-color);
  border-radius: var(--frag-progress-bar-border-radius);
  overflow: hidden;
  background: var(--frag-progress-bar-bg);
  height: var(--frag-progress-bar-height);
}
.fill { background: var(--frag-progress-bar-fg); height: 100%; max-width: 100%; }
.indicator {
  color: var(--frag-progress-indicator-color);
  font-size: var(--frag-progress-indicator-size);
  font-weight: var(--frag-progress-indicator-weight);
}
.commentary {
  display: flex;
  color: var(--frag-progress-commentary-color);
  font-size: var(--frag-progress-commentary-size);
  font-weight: var(--frag-progress-commentary-weight);
  white-space: nowrap;
}
/* Horizontal: the percentage sits beside the bar; the commentary row shows only its text. */
.commentary .spacer, .commentary .indicator { display: none; }
:host(:not([commentary])) .commentary { display: none; }
:host([variant="reverse"]) .pb { flex-direction: row-reverse; }
:host([variant="reverse"]) .outer, :host([percentage-on-left]) .outer { flex-direction: row-reverse; }
:host([variant="reverse"]) .commentary, :host([percentage-on-left]) .commentary { flex-direction: row-reverse; }
/* Vertical: bar above a row of commentary and percentage. */
:host([variant="vertical"]) .pb, :host([variant="vertical-mono"]) .pb { flex-direction: column; align-items: stretch; gap: var(--frag-progress-commentary-vertical-gap); }
:host([variant="vertical"]) .outer .indicator, :host([variant="vertical-mono"]) .outer .indicator { display: none; }
:host([variant="vertical"]) .commentary, :host([variant="vertical-mono"]) .commentary { display: flex; }
:host([variant="vertical"]) .commentary .spacer, :host([variant="vertical-mono"]) .commentary .spacer { display: block; flex: 1; }
:host([variant="vertical"]) .commentary .indicator, :host([variant="vertical-mono"]) .commentary .indicator { display: block; }
:host([variant="vertical"][bar-only]:not([commentary])) .commentary, :host([variant="vertical-mono"][bar-only]:not([commentary])) .commentary { display: none; }
```

## Example

```xml
<div layout="grid" cols="2" gap="6">
  <div layout="column" gap="4">
    <jui-progress-bar percentage="45" commentary="3 of 8 steps"/>
    <jui-progress-bar percentage="0"/>
    <jui-progress-bar percentage="100" commentary="Complete"/>
    <jui-progress-bar percentage="70" variant="reverse" commentary="12 MB of 40 MB"/>
    <jui-progress-bar percentage="30" bar-only=""/>
  </div>
  <div layout="column" gap="4">
    <jui-progress-bar percentage="60" variant="vertical" commentary="Profile completeness"/>
    <jui-progress-bar percentage="85" variant="vertical-mono" commentary="Goals met"/>
    <jui-progress-bar percentage="25" variant="vertical" percentage-on-left="" commentary="Reviews submitted"/>
  </div>
</div>
```
