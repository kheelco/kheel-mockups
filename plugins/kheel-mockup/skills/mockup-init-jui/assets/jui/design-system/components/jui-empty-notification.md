---
name: jui-empty-notification
version: 1.0.0
kind: elemental
status: active
summary: EmptyNotification component — the notice a Gallery or Table shows when it has no records or its store is in error.
---

# EmptyNotification (component)

## Purpose

Represents JUI's **EmptyNotification** (`…client.gallery.EmptyNotification`): the panel a `Gallery` or `Table`
shows in place of its records when the store is empty (unfiltered), when a filter matches nothing (filtered), or
when the store reports an error. It is built into the collection with `EmptyNotification.buildPanel(…)` from the
collection's `emptyUnfiltered`, `emptyFiltered` and `emptyError` configuration; JUI's defaults are "Sorry, no
results found" and "Sorry, there was a problem". Place it in the `empty` slot of `jui-table` or `jui-gallery` to
replace their defaults. For a notice inside a page or form (not an empty collection), use a notification block
instead.

## Anatomy

A centred column (with generous top padding) holding a white, rounded, outlined panel: a title (`h3`), one or
more paragraphs, and optionally a row of actions. JUI renders actions as links styled as buttons; the mockup uses
`jui-btn`.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| heading | content | text | | The panel's title (`panel.title(…)`). |
| actions-right-aligned | variant | boolean | | Pushes the actions to the right of the panel (`actionsRightAligned(true)`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| actions-right-aligned | off | Actions start at the left, under the text. |
| actions-right-aligned | on | Actions sit at the right edge, like dialog actions. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Content | default | At rest | Title, paragraphs, and actions when any are placed. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | | Stacked paragraphs | The explanation (`panel.paragraph(…)`): text, or one `p` per paragraph. |
| actions | jui-btn | jui-btn | Row, 2em apart | The actions (`panel.action(label, handler)`), such as "Clear filters" or "Add the first member". |

## Behaviour

An action runs its handler when clicked; the enclosing gallery or table dispatches the click. In a mockup, give
the `jui-btn` `href` or `opens`.

## Content rules

- Title: what happened, briefly — "No members yet", "No results match your filters".
- Paragraph: why, and what to do next.
- Action: a verb phrase — "Clear filters", "Invite a member", "Try again".

## Accessibility

The title is a heading (`h3`), so the notice is found by heading navigation. Actions are links in JUI; give them
text that makes sense on its own.

## Rules of use

- Always show the empty and error states of a collection in mockups.
- Offer the way out for a filtered-empty result ("Clear filters").
- Keep one panel per state; stack several notifications only for genuinely separate messages.

## Tokens

The tokens the style uses. JUI's stylesheet has no `--cpt-*` layer for this component; its panel background is
white and its border the waiting background.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--frag-btn-padding-tb`, `--frag-btn-padding-lr` | component | `0.25em`, `1.25em` | Set on slotted `jui-btn` actions to match JUI's action links. |
| `--jui-color-aux-white` | semantic | | Panel background. |
| `--jui-state-waiting-bg` | semantic | | Panel border. |

## Template

```html
<div class="panel">
  <h3 data-if="heading">{{heading}}</h3>
  <div class="text"><slot></slot></div>
  <div class="actions"><slot name="actions"></slot></div>
</div>
```

## Style

```css
:host { display: flex; flex-direction: column; gap: 2em; align-items: center; padding: 4em 4em 0 4em; }
.panel { border-radius: 1.5em; padding: 2em; background: var(--jui-color-aux-white); border: 1px solid var(--jui-state-waiting-bg); }
h3 { margin-block-start: 0; }
.text { margin: 0 0 1em 0; }
.text ::slotted(p) { margin: 0 0 1em 0; }
.actions { display: none; align-items: center; gap: 2em; }
:host([data-filled~="actions"]) .actions { display: flex; }
:host([actions-right-aligned]) .actions { justify-content: flex-end; }
::slotted(jui-btn) { --frag-btn-padding-tb: 0.25em; --frag-btn-padding-lr: 1.25em; }
```

## Example

```xml
<div layout="row" gap="4" wrap="" align="start">
  <jui-empty-notification heading="Sorry, no results found">We were not able to find anything to display.</jui-empty-notification>
  <jui-empty-notification heading="No results match your filters">
    <p>Try removing a filter or searching for something else.</p>
    <jui-btn slot="actions" label="Clear filters"/>
  </jui-empty-notification>
  <jui-empty-notification heading="Sorry, there was a problem" actions-right-aligned="">
    The service is currently unavailable.
    <jui-btn slot="actions" label="Try again" icon="refresh-cw"/>
  </jui-empty-notification>
</div>
```
