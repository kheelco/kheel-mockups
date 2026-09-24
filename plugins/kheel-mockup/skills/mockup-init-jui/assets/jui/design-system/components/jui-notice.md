---
name: jui-notice
version: 1.0.0
kind: composed
status: active
summary: Notice fragment — an inline callout with an icon and a message, in four tones and three styles.
---

# Notice (fragment)

## Purpose

Represents JUI's **Notice** fragment: a callout placed in the flow of a page, form or dialog to tell the user
something — information, a warning, an error summary, a success. It stays until the content changes; it is not a
transient toast. Being a fragment, it has no events of its own: links or buttons inside it are handled by the
enclosing component (see **Fragment events**). Use a field's own error message for a problem with one control, and
a notification for something that happened in the background.

## Anatomy

- **Icon** — a large icon in the tone's colour; each variant has a default (JUI: flag, bug, warning, circle-check).
- **Message** — one or more paragraphs; `bold`, `message` and `italic` each add one, in that order (JUI adds
  them in the order they are called).
- **Content** — optional extra content in the default slot: a list, links, a button. Below the icon and message,
  or aligned with the message when `content-aligned`.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| message | content | text | | A paragraph of message text (JUI `message(String)`). |
| bold | content | text | | A paragraph in bold, before `message` — a headline (JUI `bold(String)`). |
| italic | content | text | | A paragraph in italics, after `message` (JUI `italic(String)`). |
| icon | content | icon | | Replaces the variant's default icon. |
| no-icon | variant | boolean | | Shows no icon (JUI `icon(false)`). |
| notice-style | variant | standard, border, inline | standard | The shape (JUI `Notice.Style`). |
| variant | variant | standard, danger, warning, success | standard | The tone (JUI `Notice.Variant`). |
| size | variant | small, medium, large | medium | Font size (JUI `size(Length)`): 0.85, 1 and 1.15 em. |
| content-aligned | variant | boolean | | Places the slotted content in the message column rather than below (JUI `contentAligned()`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| notice-style | standard | A thick coloured bar on the left edge: the everyday callout. |
| notice-style | border | A full thin border: a boxed callout that stands apart from surrounding cards. |
| notice-style | inline | A compact pill with a small icon, sized to its text: a one-line note beside other content. |
| variant | standard | Information, in the primary colour. |
| variant | danger | Errors and blocking problems, in red; lists of validation errors. |
| variant | warning | Something that needs care before continuing, in amber. |
| variant | success | Confirmation that something worked, in green. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Visibility | shown | Default | As the style and variant. The notice has no interactive states of its own. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | | jui-btn | configurable | Extra content: a list of errors, links, an action. |

## Behaviour

Static. Links and buttons inside are handled by the enclosing component (**Fragment events**). JUI's
`Notice.error(message, errors)` builds a danger notice with a message and a bulleted list of the errors.

## Content rules

Lead with what happened or what to do, in a sentence: `Two fields need attention.` Use `bold` for a short
headline and `message` for the detail. Keep inline notices to one line.

## Accessibility

The icon is decorative; the text must carry the meaning without the colour. Danger notices that appear after an
action should be announced (an alert role) in the real screen.

## Rules of use

- Use `danger` for errors, `warning` for caution, `success` for confirmation, `standard` for information — never
  for decoration.
- One notice per concern; don't stack several of the same tone.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--frag-notice-border` | component | `--jui-color-primary40` | Border and icon colour; `error40`, `warning40`, `success40` for the variants. |
| `--frag-notice-border-width` | component | `1px` | Border width; `5px` (left edge only) for `standard`. |
| `--frag-notice-border-radius` | component | `--jui-border-radius` | Corner radius; `6px` for `standard`, `2em` for `inline`. |
| `--frag-notice-text` | component | `--jui-color-primary80` | Text colour; `error80`, `warning80`, `success80` for the variants. |
| `--frag-notice-text-padding` | component | `1em 1.25em` | Padding; `0.5em 1.25em` for `inline`. |
| `--frag-notice-bg` | component | `--jui-color-primary05` | Background; `error05`, `warning05`, `success05` for the variants. |
| `--frag-notice-font-size` | component | `1em` | Font size; `size` sets 0.85 or 1.15 em. |
| `--jui-color-primary05`, `--jui-color-primary40`, `--jui-color-primary80`, `--jui-color-error05`, `--jui-color-error40`, `--jui-color-error80`, `--jui-color-warning05`, `--jui-color-warning40`, `--jui-color-warning80`, `--jui-color-success05`, `--jui-color-success40`, `--jui-color-success80` | semantic | | Tone colours. |
| `--jui-border-radius` | semantic | | Radius for `border`. |

## Template

```html
<div class="notice">
  <div class="main">
    <span class="icon" data-if="!no-icon">
      <jui-icon data-if="icon" name="{{icon}}"></jui-icon>
      <span class="default" data-if="!icon">
        <jui-icon data-if="variant=standard" name="info"></jui-icon>
        <jui-icon data-if="variant=danger" name="circle-alert"></jui-icon>
        <jui-icon data-if="variant=warning" name="triangle-alert"></jui-icon>
        <jui-icon data-if="variant=success" name="circle-check"></jui-icon>
      </span>
    </span>
    <div class="content">
      <p data-if="bold"><strong>{{bold}}</strong></p>
      <p data-if="message">{{message}}</p>
      <p data-if="italic"><em>{{italic}}</em></p>
      <div class="extra" data-if="content-aligned" data-layout=""><slot></slot></div>
    </div>
  </div>
  <div class="extra below" data-if="!content-aligned" data-layout=""><slot></slot></div>
</div>
```

## Style

```css
:host {
  display: block;
  --frag-notice-border: var(--jui-color-primary40);
  --frag-notice-border-width: 1px;
  --frag-notice-border-radius: var(--jui-border-radius);
  --frag-notice-text: var(--jui-color-primary80);
  --frag-notice-text-padding: 1em 1.25em;
  --frag-notice-bg: var(--jui-color-primary05);
  --frag-notice-font-size: 1em;
}
:host([variant="danger"]) { --frag-notice-border: var(--jui-color-error40); --frag-notice-text: var(--jui-color-error80); --frag-notice-bg: var(--jui-color-error05); }
:host([variant="warning"]) { --frag-notice-border: var(--jui-color-warning40); --frag-notice-text: var(--jui-color-warning80); --frag-notice-bg: var(--jui-color-warning05); }
:host([variant="success"]) { --frag-notice-border: var(--jui-color-success40); --frag-notice-text: var(--jui-color-success80); --frag-notice-bg: var(--jui-color-success05); }
:host([notice-style="standard"]) { --frag-notice-border-radius: 6px; --frag-notice-border-width: 5px; }
:host([notice-style="inline"]) { display: inline-block; --frag-notice-text-padding: 0.5em 1.25em; --frag-notice-border-radius: 2em; }
:host([size="small"]) { --frag-notice-font-size: 0.85em; }
:host([size="large"]) { --frag-notice-font-size: 1.15em; }
.notice {
  font-size: var(--frag-notice-font-size);
  border: var(--frag-notice-border-width) solid var(--frag-notice-border);
  border-radius: var(--frag-notice-border-radius);
  background-color: var(--frag-notice-bg);
  padding: var(--frag-notice-text-padding);
  color: var(--frag-notice-text);
}
:host([notice-style="standard"]) .notice { border-top: none; border-right: none; border-bottom: none; }
:host([notice-style="inline"]) .notice { border: none; }
.main { display: flex; align-items: center; gap: 1.25em; }
:host([notice-style="inline"]) .main { gap: 0.75em; }
.icon, .default { display: inline-flex; }
.icon { font-size: 1.6em; color: var(--frag-notice-border); }
:host([notice-style="inline"]) .icon { font-size: 1em; }
.content { display: flex; flex-direction: column; gap: 1em; font-weight: 500; font-size: 0.95em; }
.content p { margin: 0; }
:host([notice-style="inline"]) .content p { white-space: nowrap; }
.extra { display: none; }
:host([data-filled~="default"]) .extra { display: block; }
:host([data-filled~="default"]) .below { margin-top: 1em; }
::slotted(ul) { margin: 0; }
::slotted(a) { cursor: pointer; text-decoration: underline; }
```

## Example

```xml
<div layout="column" gap="3">
  <jui-notice message="Reviews open on 1 March and close two weeks later."/>
  <jui-notice variant="warning" bold="Unsaved changes" message="Save before leaving this page or your edits will be lost."/>
  <jui-notice variant="danger" message="Two fields need attention:" content-aligned="">
    <ul>
      <li>Name is required.</li>
      <li>Email is not a valid address.</li>
    </ul>
  </jui-notice>
  <jui-notice variant="success" notice-style="border" message="The report was sent to 12 recipients."/>
  <jui-notice notice-style="border" no-icon="" size="small" italic="Changes apply from the next billing period."/>
  <div layout="row" gap="2" wrap="">
    <jui-notice notice-style="inline" message="Draft"/>
    <jui-notice notice-style="inline" variant="warning" message="Due tomorrow"/>
    <jui-notice notice-style="inline" variant="danger" message="Overdue"/>
    <jui-notice notice-style="inline" variant="success" icon="check" message="Approved"/>
  </div>
</div>
```
