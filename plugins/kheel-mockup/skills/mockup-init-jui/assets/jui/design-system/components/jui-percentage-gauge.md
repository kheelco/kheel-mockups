---
name: jui-percentage-gauge
version: 1.0.0
kind: composed
status: active
summary: PercentageGuage fragment — a circular dial filled to a percentage, with the percentage or an icon at its centre.
---

# PercentageGuage (fragment)

## Purpose

Represents JUI's **PercentageGuage** fragment (JUI spells it *Guage*): a ring whose dial is drawn round to a
percentage, with the percentage — or an icon — in the middle. Use it for a compact, glanceable completion figure
in a card, a list row or a header. Being a fragment, it has no events; the enclosing component re-renders it (see
**Fragment events**). For a horizontal bar use `jui-percentage-line` or `jui-progress-bar`.

## Anatomy

- **Ring** — a light grey circle, the full track.
- **Dial** — an arc in the primary colour from the top, clockwise, to the percentage, with rounded ends.
- **Centre** — the percentage in bold with a small raised `%`, or an icon (`jui-icon`) in its place.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| percentage | content | number | 0 | The fill, 0 to 100. |
| icon | content | icon | | An icon shown in the centre instead of the percentage (JUI `icon(…)`), e.g. a tick when complete. |
| size | variant | small, medium, large | medium | Diameter (JUI sizes it with CSS): 2.5, 4 and 6 em. 4 em is the JUI documentation's. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| size | small | In list rows and table cells. |
| size | medium | In cards. |
| size | large | As the headline figure of a panel. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Progress | empty | `percentage="0"` | Grey ring only. |
| Progress | partial | `percentage` between 1 and 99 | Dial drawn to the percentage. |
| Progress | complete | `percentage="100"` | Full dial; often shown with `icon="check"`. |

## Behaviour

Static. JUI clamps the dial to 0–100, can compute the percentage from a numerator and denominator, and can choose
the icon from the percentage (e.g. a tick at 100).

## Content rules

None beyond the number; label what it measures next to the gauge.

## Accessibility

The centre text gives the value. Expose it as a progress indicator with a label in the real screen; an icon in
the centre needs a text alternative.

## Rules of use

- Always pair the gauge with a label saying what it measures.
- Don't use a gauge for values that can exceed 100 %.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer. The raw colours are JUI's own.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--frag-guage-bg` | component | `#eaeaea` | Ring colour. |
| `--frag-guage-dial` | component | `--jui-color-primary50` | Dial colour. |
| `--frag-guage-text` | component | `#666` | Centre text and icon colour. |
| `--frag-guage-size` | component | `4em` | Diameter; `size` sets 2.5 or 6 em. |
| `--jui-color-primary50` | semantic | | Dial colour. |

## Template

```html
<div class="guage">
  <svg viewBox="0 0 36 36">
    <path class="guage_bg" fill="none" stroke-width="3.8" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
    <path class="guage_dial" fill="none" stroke-width="3.8" stroke-linecap="round" stroke-dasharray="{{percentage}}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
  </svg>
  <div class="centre" data-if="!icon"><span>{{percentage}}<i>%</i></span></div>
  <div class="centre" data-if="icon"><jui-icon name="{{icon}}"></jui-icon></div>
</div>
```

## Style

```css
:host {
  display: inline-block;
  vertical-align: middle;
  --frag-guage-bg: #eaeaea;
  --frag-guage-dial: var(--jui-color-primary50);
  --frag-guage-text: #666;
  --frag-guage-size: 4em;
}
:host([size="small"]) { --frag-guage-size: 2.5em; }
:host([size="large"]) { --frag-guage-size: 6em; }
.guage { position: relative; width: var(--frag-guage-size); height: var(--frag-guage-size); }
svg { display: block; width: 100%; height: 100%; }
.guage_bg { stroke: var(--frag-guage-bg); }
.guage_dial { stroke: var(--frag-guage-dial); }
.centre { position: absolute; inset: 0; display: flex; justify-content: center; align-items: center; color: var(--frag-guage-text); }
.centre span { font-weight: 600; font-size: 0.95em; position: relative; left: 1px; }
:host([size="small"]) .centre span { font-size: 0.75em; }
.centre i { font-size: 0.65em; font-style: normal; top: -0.5em; position: relative; }
.centre jui-icon { font-weight: 600; font-size: 1.2em; }
```

## Example

```xml
<div layout="row" gap="6" align="center" wrap="">
  <jui-percentage-gauge percentage="0"/>
  <jui-percentage-gauge percentage="45"/>
  <jui-percentage-gauge percentage="80"/>
  <jui-percentage-gauge percentage="100" icon="check"/>
  <jui-percentage-gauge percentage="30" size="small"/>
  <jui-percentage-gauge percentage="65" size="large"/>
</div>
```
