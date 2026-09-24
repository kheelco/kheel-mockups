---
name: jui-choice-selector-option
version: 1.0.0
kind: composed
status: active
summary: ChoiceSelector.Option fragment — one option in a choice selector, with a label, an icon and a tone.
---

# ChoiceSelector.Option (fragment)

## Purpose

Represents one `ChoiceSelector.Option` of JUI's **ChoiceSelector** fragment: a single choice in a
`jui-choice-selector` strip, with its label, optional icon, whether it is the chosen one, whether it is disabled
and an optional tone that colours it only when chosen. It exists only inside `jui-choice-selector`, which draws
its look through inherited tokens. Its click is handled by the enclosing component (see **Fragment events**).

## Anatomy

A centred row of an optional `jui-icon` (with a gap after it) and the label, filling an equal share of the strip.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The option's text. |
| icon | content | icon | | Optional leading icon. |
| active | state | boolean | | The chosen option (JUI `State.of(true)`). |
| disabled | state | boolean | | The option cannot be chosen (JUI `State.of(active, true)`). |
| tone | variant | none, positive, caution, negative, info | none | Colour when chosen (JUI `Option.tone(ChoiceSelector.Tone.…)`); at rest the option is neutral. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| tone | none | The selector variant's chosen look. |
| tone | positive | Green when chosen: a good judgement ("On track"). |
| tone | caution | Amber when chosen: needs watching. |
| tone | negative | Red when chosen: a bad judgement ("Behind"). |
| tone | info | Blue when chosen: neutral but notable ("Ahead"). |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Selection | unchosen | Default | Selector text colour on the tray. |
| Selection | chosen | `active` property | Chosen background, text and shadow (or the tone's colours). |
| Interaction | default | At rest | — |
| Interaction | hover | `:hover` on an unchosen, enabled option | Hover background and text; pointer cursor. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Never shown chosen; label faded; no-drop cursor. |

## Behaviour

Clicking an unchosen, enabled option invokes its handler through the enclosing component (**Fragment events**),
which re-renders the selector with this option `active`.

## Content rules

One or two words. See `jui-choice-selector`.

## Accessibility

See `jui-choice-selector`: each option should be a `radio` with `aria-checked`.

## Rules of use

- Use only inside `jui-choice-selector`.
- Give tones to all options of a judgement selector or to none.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-choice-selector-bg-selected` | component | from `jui-choice-selector` | Chosen background; tones set the `-10` tint of their colour. |
| `--jui-choice-selector-text-selected` | component | from `jui-choice-selector` | Chosen text; tones set success70, warning70, error60 or info60. |
| `--jui-choice-selector-text`, `--jui-choice-selector-text-hover`, `--jui-choice-selector-text-size`, `--jui-choice-selector-text-weight` | inherited | | Option text, set by the selector's variant. |
| `--jui-choice-selector-bg-hover`, `--jui-choice-selector-shadow-selected` | inherited | | Hover background and chosen shadow. |
| `--jui-choice-selector-option-tb`, `--jui-choice-selector-option-lr`, `--jui-choice-selector-option-radius` | inherited | | Option padding and radius. |
| `--jui-choice-selector-opacity-disabled` | inherited | | Fade of a disabled option's label. |
| `--jui-color-success10`, `--jui-color-success70`, `--jui-color-warning10`, `--jui-color-warning70`, `--jui-color-error10`, `--jui-color-error60`, `--jui-color-info10`, `--jui-color-info60` | semantic | | Tone colours. |
| `--jui-role-focus-ring` | semantic | | Focus ring. |

## Template

```html
<div class="opt">
  <jui-icon data-if="icon" name="{{icon}}"></jui-icon>
  <span class="label">{{label}}</span>
</div>
```

## Style

```css
:host { display: flex; flex-grow: 1; }
:host([tone="positive"]) { --jui-choice-selector-bg-selected: var(--jui-color-success10); --jui-choice-selector-text-selected: var(--jui-color-success70); }
:host([tone="caution"]) { --jui-choice-selector-bg-selected: var(--jui-color-warning10); --jui-choice-selector-text-selected: var(--jui-color-warning70); }
:host([tone="negative"]) { --jui-choice-selector-bg-selected: var(--jui-color-error10); --jui-choice-selector-text-selected: var(--jui-color-error60); }
:host([tone="info"]) { --jui-choice-selector-bg-selected: var(--jui-color-info10); --jui-choice-selector-text-selected: var(--jui-color-info60); }
.opt {
  flex-grow: 1; display: flex; align-items: center; justify-content: center; white-space: nowrap;
  padding: var(--jui-choice-selector-option-tb) var(--jui-choice-selector-option-lr);
  font-size: var(--jui-choice-selector-text-size); font-weight: var(--jui-choice-selector-text-weight);
  color: var(--jui-choice-selector-text); border-radius: var(--jui-choice-selector-option-radius);
}
jui-icon { margin-right: 0.5em; }
:host([active]:not([disabled])) .opt {
  background: var(--jui-choice-selector-bg-selected); color: var(--jui-choice-selector-text-selected);
  box-shadow: var(--jui-choice-selector-shadow-selected);
}
:host(:not([active]):not([disabled])) .opt:hover, :host([state~="hover"]:not([active]):not([disabled])) .opt {
  background: var(--jui-choice-selector-bg-hover); color: var(--jui-choice-selector-text-hover); cursor: pointer;
}
:host(:focus-visible) .opt, :host([state~="focus"]) .opt { outline: 2px solid var(--jui-role-focus-ring); outline-offset: -2px; }
:host([disabled]) .opt { cursor: no-drop; }
:host([disabled]) .label { opacity: var(--jui-choice-selector-opacity-disabled); }
```

## Example

```xml
<jui-choice-selector variant="inline">
  <jui-choice-selector-option label="Behind" icon="arrow-down" tone="negative" active=""/>
  <jui-choice-selector-option label="On track" icon="check" tone="positive"/>
  <jui-choice-selector-option label="Ahead" icon="arrow-up" tone="info" state="hover"/>
  <jui-choice-selector-option label="Paused" disabled=""/>
</jui-choice-selector>
```
