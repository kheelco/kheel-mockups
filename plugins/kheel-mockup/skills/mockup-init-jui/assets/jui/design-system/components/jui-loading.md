---
name: jui-loading
version: 1.0.0
kind: elemental
status: active
summary: Loading fragment — a pulsing grey placeholder bar shown where content is still loading.
---

# Loading (fragment)

## Purpose

Represents JUI's **Loading** fragment: a pulsing grey bar that holds the place of text or a block of content
while it loads (a skeleton placeholder). Stack several of different widths to suggest the shape of what is
coming. Being a fragment, it has no events; the enclosing component replaces it with the real content when the
data arrives (see **Fragment events**). For an action in progress use a button's `waiting` state; for progress
through a known amount of work use `jui-progress-bar`.

## Anatomy

One rounded bar, full width and 1 em high by default, whose background pulses between two light greys.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| dark | variant | boolean | | A slightly darker placeholder, for use on light grey surfaces (JUI `dark()`). |
| height | variant | text, heading, block | text | Height (JUI `height(Length)`): 1 em (a line of text), 1.75 em (a heading) or 5 em (an image or card). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| dark | present | On grey backgrounds, where the standard placeholder disappears. |
| height | text | A line of text. Stack several, some in narrower containers, to suggest a paragraph. |
| height | heading | A heading or title. |
| height | block | An image, chart or card body. |

JUI's `width(…)`, `top(…)`, `bottom(…)`, `left(…)` and `right(…)` are expressed with the mockup's layout and
spacing attributes (`width`, `mt`, `mb`, `ml`, `mr`).

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Activity | loading | Always | The background pulses once a second. |

## Behaviour

Pulses continuously until the enclosing component replaces it with content.

## Content rules

None — it has no content. Match the placeholders to the layout of the content that will replace them.

## Accessibility

Decorative. The region being loaded should be marked busy in the real screen.

## Rules of use

- Use placeholders for content that takes noticeable time to load, not for instant results.
- Don't mix placeholders and a spinner for the same content.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer. The raw greys are JUI's own.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--frag-loading-bg` | component | `#f9f9f9` | Base background; `#f3f3f3` when `dark`. |
| `--frag-loading-height` | component | `1em` | Height; `height` sets 1.75 or 5 em. |
| `--jui-role-surface-muted`, `--jui-role-surface-raised` | semantic | | The two ends of the pulse (JUI's `jui-animation-waiting`). |

## Template

```html
<div class="loading"></div>
```

## Style

```css
:host {
  display: block;
  width: 100%;
  --frag-loading-bg: #f9f9f9;
  --frag-loading-height: 1em;
}
:host([dark]) { --frag-loading-bg: #f3f3f3; }
:host([height="heading"]) { --frag-loading-height: 1.75em; }
:host([height="block"]) { --frag-loading-height: 5em; }
.loading {
  height: var(--frag-loading-height);
  width: 100%;
  border-radius: 3px;
  background: var(--frag-loading-bg);
  animation: jui-animation-waiting 1s ease-in infinite;
}
@keyframes jui-animation-waiting {
  from { background-color: var(--jui-role-surface-muted); }
  to { background-color: var(--jui-role-surface-raised); }
}
```

## Example

```xml
<jui-accordion no-header="">
<div layout="grid" cols="2" gap="6">
  <div layout="column" gap="2">
    <jui-loading height="heading"/>
    <jui-loading/>
    <jui-loading/>
    <jui-loading/>
    <jui-loading height="block" mt="2"/>
  </div>
  <div layout="column" gap="2">
    <jui-loading dark="" height="heading"/>
    <jui-loading dark=""/>
    <jui-loading dark=""/>
    <jui-loading dark="" height="block" mt="2"/>
  </div>
</div>
</jui-accordion>
```
