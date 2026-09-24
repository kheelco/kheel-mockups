---
name: jui-percentage-line
version: 1.0.0
kind: elemental
status: active
summary: PercentageLine fragment — a compact rounded percentage bar, with an optional label above.
---

# PercentageLine (fragment)

## Purpose

Represents JUI's **PercentageLine** fragment: a compact, rounded horizontal bar filled to a percentage. Without a
label, the percentage sits to the right of the bar; with a label, the label and the percentage sit on a small
line above it. The percentage text can be replaced by progress text ("4 / 10"). Use it in table cells, cards and
summaries. Being a fragment, it has no events; the enclosing component re-renders it (see **Fragment events**).
For a bar with commentary and more layouts use `jui-progress-bar`; for a circular dial use
`jui-percentage-gauge`.

## Anatomy

- **Info line** (with a label) — the label on the left, the percentage or progress text on the right, small and
  grey.
- **Bar** — a grey rounded track with a fill in the secondary colour.
- **Percentage** (without a label) — the percentage or progress text to the right of the bar.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| percentage | content | number | 0 | The fill, 0 to 100. |
| label | content | text | | A label above the bar on the left (JUI `label(…)`). |
| progress | content | text | | Text shown instead of the percentage (JUI `progress(…)`). |

## Variants

None. With or without `label` changes where the percentage sits.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Progress | empty | `percentage="0"` | Empty track. |
| Progress | partial | `percentage` between 1 and 99 | Track filled to the percentage. |
| Progress | full | `percentage="100"` | Track full. |

## Behaviour

Static. JUI clamps the percentage to 0–100 and can compute it from a numerator and denominator.

## Content rules

Labels are a word or two (`Completed`, `Budget used`); progress text is a count (`4 / 10`).

## Accessibility

The percentage or progress text is visible. Expose the bar as a progress indicator in the real screen.

## Rules of use

- Give it a width: it is inline and sized by its container (the JUI documentation uses 10 em); in a mockup use a
  sized container or `width="full"`.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer. The raw greys are JUI's own.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--frag-pline-height` | component | `1em` | Track height. |
| `--frag-pline-border` | component | `#eee` | Track border. |
| `--frag-pline-bg` | component | `#eee` | Track background. |
| `--frag-pline-bar-bg` | component | `--jui-color-secondary30` | Fill colour. |
| `--frag-pline-text` | component | `#999` | Label and percentage colour. |
| `--frag-pline-text-weight` | component | `500` | Label and percentage weight. |
| `--frag-pline-text-size` | component | `0.9em` | Label and percentage size. |
| `--jui-color-secondary30` | semantic | | Fill colour. |

## Template

```html
<div class="pline">
  <div class="info" data-if="label">
    <span>{{label}}</span>
    <span class="grow"></span>
    <span data-if="progress">{{progress}}</span>
    <span data-if="!progress">{{percentage}}%</span>
  </div>
  <div class="wrap">
    <div class="bar"><div class="fill" style="width: {{percentage}}%"></div></div>
    <div class="info" data-if="!label">
      <span data-if="progress">{{progress}}</span>
      <span data-if="!progress">{{percentage}}%</span>
    </div>
  </div>
</div>
```

## Style

```css
:host {
  display: inline-block;
  width: 10em;
  --frag-pline-height: 1em;
  --frag-pline-border: #eee;
  --frag-pline-bg: #eee;
  --frag-pline-bar-bg: var(--jui-color-secondary30);
  --frag-pline-text: #999;
  --frag-pline-text-weight: 500;
  --frag-pline-text-size: 0.9em;
}
.info {
  display: flex;
  padding: 0 0.25em 0.2em 0.25em;
  font-size: var(--frag-pline-text-size);
  font-weight: var(--frag-pline-text-weight);
  color: var(--frag-pline-text);
  white-space: nowrap;
}
.wrap .info { padding-bottom: 0; }
.grow { flex-grow: 1; }
.wrap { display: flex; gap: 0.75em; align-items: center; }
.bar {
  flex-grow: 1;
  box-sizing: border-box;
  height: var(--frag-pline-height);
  border: 1px solid var(--frag-pline-border);
  background: var(--frag-pline-bg);
  border-radius: 10px;
  overflow: hidden;
}
.fill { height: 100%; max-width: 100%; background: var(--frag-pline-bar-bg); }
```

## Example

```xml
<div layout="row" gap="8" align="end" wrap="">
  <jui-percentage-line percentage="45"/>
  <jui-percentage-line percentage="80" progress="8 / 10"/>
  <jui-percentage-line percentage="30" label="Completed"/>
  <jui-percentage-line percentage="100" label="Budget used" progress="$12k"/>
  <jui-percentage-line percentage="0" label="Reviewed"/>
</div>
```
