---
name: jui-modal-dialog
version: 1.0.0
kind: composed
status: active
summary: ModalDialog component — the dialog frame with a titled header, a body and a footer of actions.
---

# ModalDialog (component)

## Purpose

Represents JUI's **ModalDialog** component (usually created with `ModalDialogCreator`): a modal window with a
header (title, optional subtitle and description, and a close control), a body holding one component (a form, a
message, a list) and a footer of action buttons. It is what a `dialog` mockup contains: place one
`jui-modal-dialog` as the mockup's content and the viewer draws it centred over a scrim. Use
`jui-notification-dialog` for a standard confirm, alert, error or save prompt, and a `jui-progress-sequence` in
the body for a multi-step dialog.

## Anatomy

- **Header** on the dialog chrome colour with a divider beneath: the title (`h1`), an optional subtitle line with
  an optional icon, an optional description paragraph, and a close control (`jui-icon` "x") at the top right.
- **Body**: the content, scrolling when it is taller than the dialog.
- **Footer** on the chrome colour with a divider above, 55 px high: an action bar with a left zone and a right
  zone of buttons (`jui-btn`). It is not drawn when the dialog has no actions.

The dialog has a 1 px border, large rounded corners and a raised shadow.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| title | content | text | | The dialog title (JUI `title(String)`). |
| subtitle | content | text | | A line under the title (JUI `subtitle(String)`). Without it the header is compact. |
| subtitle-icon | content | icon | | Icon before the subtitle (JUI `subtitleIcon(String)`). |
| description | content | text | | A paragraph under the title and subtitle (JUI `description(String)`). |
| closable | content | true, false | true | Show the close control (JUI `closable(boolean)`; on by default). |
| title-wrap | variant | boolean | | Let a long title wrap instead of being cut short with an ellipsis (JUI `titleWrap()`). |
| variant | variant | standard, separated, uniform | standard | The header and footer treatment (JUI `ModalDialog.Config.Variant`). |
| type | variant | center, top, slider | center | A centred dialog, one placed near the top of the page, or a full-height panel sliding in from the right (JUI `type(Modal.Type)`). |
| padding | variant | 0, 1, 2, 3, 4, 6, 8 | 4 | Padding around the body's content (JUI `padding(Insets)`); `4` is 1em. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | standard | Header and footer on the chrome colour, each divided from the body by a line (JUI `STANDARD`). |
| variant | separated | White header and footer, larger insets around the title (JUI `SEPARATED`). |
| variant | uniform | As separated with a larger title and no footer line: the dialog reads as one surface (JUI `UNIFORM`). |
| type | center | The usual dialog. |
| type | top | As center, but held near the top of the page so it does not move as its content grows (JUI `TOP`). Drawn the same in a mockup. |
| type | slider | A side panel: square corners, full height, a slightly larger title (JUI `SLIDER`). Use a `large` dialog mockup. |
| title-wrap | present | For titles that carry a long name. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Header | compact | No `subtitle` | Title only, with space beneath and to the right for the close control. |
| Header | full | `subtitle` set | Title, then the subtitle line. |
| Interaction | default | At rest | — |
| Interaction | close-hover | `:hover` on the close control | The close control turns a quarter turn. |
| Footer | shown | Actions present | Footer drawn. |
| Footer | hidden | No actions | No footer; the body runs to the bottom edge. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | | configurable | The dialog's content (the component JUI wraps). Its default layout is a single-column grid. |
| actions | jui-btn | jui-btn | A right-aligned row, 0.5em apart. | The dialog's actions (JUI `action(...)`), primary last. `jui-btn` children are placed here without `slot`. |
| actions-left | any | jui-btn | A left-aligned row, 0.5em apart. | Actions shown on the left (JUI `action(a -> a.left(true))`), such as a link-style secondary action. |

## Behaviour

The dialog opens over the page (in a mockup, with `opens="dialog.xml"`) and closes on the close control, on an
action that completes (JUI's handler calls `success()`; `fail()` keeps it open, for example on a validation
error), or on Escape. Actions show a waiting spinner while their handler runs. Put `closes` on a footer button in
a mockup to close the dialog.

## Content rules

Title: what the dialog does, in sentence case (`Create a project`). Subtitle and description: one sentence of
context. Action labels are verbs; the confirming action names the outcome (`Create`, `Delete member`), the other
is `Cancel`.

## Accessibility

The title is the dialog's heading and should label it (`aria-labelledby`); the dialog is `role="dialog"` with
`aria-modal="true"`. Focus moves into the dialog when it opens and returns to the opener when it closes. The close
control needs an accessible name (`Close`).

## Rules of use

- One primary action, on the right and last; `Cancel` before it as an outlined or grey button.
- Destructive confirmations use `nature="danger"` on the confirming action.
- Wrap body content in a container (a form, a `jui-panel`) rather than placing a lone `jui-btn` in the body, which
  would be taken as an action.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-modaldialog-surface` | component | `--jui-comp-dialog-surface` | Dialog background. |
| `--cpt-modaldialog-border`, `--cpt-modaldialog-border-width` | component | `--jui-comp-dialog-border`, `1px` | Dialog border. |
| `--cpt-modaldialog-radius` | component | `--jui-comp-dialog-radius` | Corner radius; `0` for the slider. |
| `--cpt-modaldialog-shadow` | component | `--jui-comp-dialog-shadow` | Dialog shadow. |
| `--cpt-modaldialog-header-bg` | component | `--jui-comp-dialog-header-surface` | Header background; the dialog surface for separated and uniform. |
| `--cpt-modaldialog-header-divider`, `--cpt-modaldialog-header-divider-width` | component | `--jui-comp-dialog-header-divider`, `1px` | Line under the header. |
| `--cpt-modaldialog-header-padding-inline` | component | `--jui-space-3` | Header side padding. |
| `--cpt-modaldialog-footer-bg` | component | `--jui-comp-dialog-footer-surface` | Footer background; the dialog surface for separated and uniform. |
| `--cpt-modaldialog-footer-divider`, `--cpt-modaldialog-footer-divider-width` | component | `--jui-comp-dialog-footer-divider`, `1px` | Line above the footer; `0` for uniform. |
| `--cpt-modaldialog-footer-padding-inline`, `--cpt-modaldialog-footer-height` | component | `--jui-space-5`, `55px` | Footer insets and height. |
| `--cpt-modaldialog-heading`, `--cpt-modaldialog-heading-size`, `--cpt-modaldialog-heading-weight` | component | `--jui-comp-dialog-heading`, `1.3em`, `--jui-font-weight-semibold` | Title colour, size (`--jui-font-size-2xl` for uniform, `1.4em` slider) and weight. |
| `--cpt-modaldialog-heading-margin-left`, `--cpt-modaldialog-heading-margin-top` | component | `--jui-space-3` | Title position; `--jui-space-4` for separated, uniform and slider. |
| `--cpt-modaldialog-heading-margin-bottom-compact`, `--cpt-modaldialog-heading-margin-right-compact` | component | `--jui-space-3`, `--jui-space-8` | Space around the title in the compact header. |
| `--cpt-modaldialog-subheading`, `--cpt-modaldialog-subheading-margin-inline` | component | `--jui-comp-dialog-subheading`, the heading's left margin | Subtitle colour and inset. |
| `--cpt-modaldialog-subheading-padding-block-start`, `--cpt-modaldialog-subheading-padding-block-end` | component | `--jui-space-1`, `--jui-space-2` | Space above and below the subtitle; `--jui-space-5` and `--jui-space-4` for separated and uniform. |
| `--cpt-modaldialog-description`, `--cpt-modaldialog-description-size`, `--cpt-modaldialog-description-margin-inline` | component | the subheading colour, `--jui-font-size-sm`, the heading's left margin | Description paragraph. |
| `--cpt-modaldialog-icon`, `--cpt-modaldialog-icon-gap` | component | `--jui-comp-dialog-icon`, `--jui-space-3` | Subtitle icon. |
| `--cpt-modaldialog-close`, `--cpt-modaldialog-close-top`, `--cpt-modaldialog-close-right` | component | `--jui-comp-dialog-close`, `14px`, `14px` | Close control. |
| `--cpt-modaldialog-body-padding` | component | `--jui-space-4` | Padding around the body's content; `padding` sets it. |
| `--jui-comp-dialog-surface`, `--jui-comp-dialog-border`, `--jui-comp-dialog-radius`, `--jui-comp-dialog-shadow`, `--jui-comp-dialog-header-surface`, `--jui-comp-dialog-header-divider`, `--jui-comp-dialog-footer-surface`, `--jui-comp-dialog-footer-divider`, `--jui-comp-dialog-heading`, `--jui-comp-dialog-subheading`, `--jui-comp-dialog-icon`, `--jui-comp-dialog-close` | semantic | | The dialog family tokens the component tokens start from. |
| `--jui-font-weight-semibold`, `--jui-font-size-sm`, `--jui-font-size-2xl` | semantic | | Title weight; description and uniform title sizes. |
| `--jui-space-1`, `--jui-space-2`, `--jui-space-3`, `--jui-space-4`, `--jui-space-5`, `--jui-space-6`, `--jui-space-8` | semantic | | Insets and body padding steps. |

## Template

```html
<div class="dialog">
  <div class="header">
    <h1>{{title}}</h1>
    <h2 data-if="subtitle"><jui-icon data-if="subtitle-icon" name="{{subtitle-icon}}"></jui-icon><span>{{subtitle}}</span></h2>
    <p class="description" data-if="description">{{description}}</p>
    <a class="close" data-if="closable=true" aria-label="Close"><jui-icon name="x"></jui-icon></a>
  </div>
  <div class="body"><div class="contents" data-layout><slot></slot></div></div>
  <div class="footer">
    <div class="zone left"><slot name="actions-left"></slot></div>
    <div class="zone right"><slot name="actions"></slot></div>
  </div>
</div>
```

## Style

```css
:host {
  display: block;
  --cpt-modaldialog-surface: var(--jui-comp-dialog-surface);
  --cpt-modaldialog-border: var(--jui-comp-dialog-border);
  --cpt-modaldialog-border-width: 1px;
  --cpt-modaldialog-radius: var(--jui-comp-dialog-radius);
  --cpt-modaldialog-shadow: var(--jui-comp-dialog-shadow);
  --cpt-modaldialog-header-bg: var(--jui-comp-dialog-header-surface);
  --cpt-modaldialog-header-divider: var(--jui-comp-dialog-header-divider);
  --cpt-modaldialog-header-divider-width: 1px;
  --cpt-modaldialog-header-padding-inline: var(--jui-space-3);
  --cpt-modaldialog-footer-bg: var(--jui-comp-dialog-footer-surface);
  --cpt-modaldialog-footer-divider: var(--jui-comp-dialog-footer-divider);
  --cpt-modaldialog-footer-divider-width: 1px;
  --cpt-modaldialog-footer-padding-inline: var(--jui-space-5);
  --cpt-modaldialog-footer-height: 55px;
  --cpt-modaldialog-heading: var(--jui-comp-dialog-heading);
  --cpt-modaldialog-heading-size: 1.3em;
  --cpt-modaldialog-heading-weight: var(--jui-font-weight-semibold);
  --cpt-modaldialog-heading-margin-left: var(--jui-space-3);
  --cpt-modaldialog-heading-margin-top: var(--jui-space-3);
  --cpt-modaldialog-heading-margin-bottom-compact: var(--jui-space-3);
  --cpt-modaldialog-heading-margin-right-compact: var(--jui-space-8);
  --cpt-modaldialog-subheading: var(--jui-comp-dialog-subheading);
  --cpt-modaldialog-subheading-padding-block-start: var(--jui-space-1);
  --cpt-modaldialog-subheading-padding-block-end: var(--jui-space-2);
  --cpt-modaldialog-subheading-margin-inline: var(--cpt-modaldialog-heading-margin-left);
  --cpt-modaldialog-description: var(--cpt-modaldialog-subheading);
  --cpt-modaldialog-description-size: var(--jui-font-size-sm);
  --cpt-modaldialog-description-margin-inline: var(--cpt-modaldialog-heading-margin-left);
  --cpt-modaldialog-icon: var(--jui-comp-dialog-icon);
  --cpt-modaldialog-icon-gap: var(--jui-space-3);
  --cpt-modaldialog-close: var(--jui-comp-dialog-close);
  --cpt-modaldialog-close-top: 14px;
  --cpt-modaldialog-close-right: 14px;
  --cpt-modaldialog-body-padding: var(--jui-space-4);
}
:host([padding="0"]) { --cpt-modaldialog-body-padding: 0; }
:host([padding="1"]) { --cpt-modaldialog-body-padding: var(--jui-space-1); }
:host([padding="2"]) { --cpt-modaldialog-body-padding: var(--jui-space-2); }
:host([padding="3"]) { --cpt-modaldialog-body-padding: var(--jui-space-3); }
:host([padding="6"]) { --cpt-modaldialog-body-padding: var(--jui-space-6); }
:host([padding="8"]) { --cpt-modaldialog-body-padding: var(--jui-space-8); }
:host([variant="separated"]), :host([variant="uniform"]) {
  --cpt-modaldialog-header-bg: var(--jui-comp-dialog-surface);
  --cpt-modaldialog-heading-margin-left: var(--jui-space-4);
  --cpt-modaldialog-heading-margin-top: var(--jui-space-4);
  --cpt-modaldialog-subheading-margin-inline: var(--jui-space-4);
  --cpt-modaldialog-subheading-padding-block-start: var(--jui-space-5);
  --cpt-modaldialog-subheading-padding-block-end: var(--jui-space-4);
  --cpt-modaldialog-footer-bg: var(--jui-comp-dialog-surface);
}
:host([variant="uniform"]) { --cpt-modaldialog-heading-size: var(--jui-font-size-2xl); --cpt-modaldialog-footer-divider-width: 0; }
:host([type="slider"]) { --cpt-modaldialog-radius: 0; --cpt-modaldialog-heading-size: 1.4em; --cpt-modaldialog-heading-margin-left: var(--jui-space-4); --cpt-modaldialog-heading-margin-top: 12px; }

.dialog {
  display: flex; flex-direction: column; max-height: 100%; width: 100%; position: relative; overflow: hidden;
  background: var(--cpt-modaldialog-surface);
  border: var(--cpt-modaldialog-border-width) solid var(--cpt-modaldialog-border);
  border-radius: var(--cpt-modaldialog-radius);
  box-shadow: var(--cpt-modaldialog-shadow);
}
:host([type="slider"]) .dialog { border-top: none; border-right: none; border-bottom: none; min-height: 100%; }
.header {
  position: relative; flex: none;
  background: var(--cpt-modaldialog-header-bg);
  border-bottom: var(--cpt-modaldialog-header-divider-width) solid var(--cpt-modaldialog-header-divider);
  padding: 0 var(--cpt-modaldialog-header-padding-inline);
}
h1 {
  margin: var(--cpt-modaldialog-heading-margin-top) 0 0 var(--cpt-modaldialog-heading-margin-left);
  font-size: var(--cpt-modaldialog-heading-size); font-weight: var(--cpt-modaldialog-heading-weight);
  color: var(--cpt-modaldialog-heading); line-height: 1.3;
}
:host(:not([subtitle])) h1 {
  margin-bottom: var(--cpt-modaldialog-heading-margin-bottom-compact);
  margin-right: var(--cpt-modaldialog-heading-margin-right-compact);
  text-overflow: ellipsis; overflow: hidden; white-space: nowrap;
}
:host([title-wrap]) h1 { white-space: normal; }
h2 {
  display: flex; gap: var(--cpt-modaldialog-icon-gap); align-items: baseline; margin: 0 var(--cpt-modaldialog-subheading-margin-inline);
  padding: var(--cpt-modaldialog-subheading-padding-block-start) 0 var(--cpt-modaldialog-subheading-padding-block-end) 0;
  color: var(--cpt-modaldialog-subheading); font-size: 1em; font-weight: 400; line-height: 1.5;
}
h2 jui-icon { color: var(--cpt-modaldialog-icon); position: relative; top: 0.2em; }
.description {
  margin: var(--jui-space-1) var(--cpt-modaldialog-description-margin-inline) var(--jui-space-3);
  max-width: 90%; color: var(--cpt-modaldialog-description);
  font-size: var(--cpt-modaldialog-description-size); line-height: 1.5;
}
.close {
  position: absolute; right: var(--cpt-modaldialog-close-right); top: var(--cpt-modaldialog-close-top);
  width: 1em; height: 1em; padding: 1px; border-radius: 100%; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--cpt-modaldialog-close); transition: transform 0.2s ease-in-out;
}
.close:hover, :host([state~="close-hover"]) .close { transform: rotate(90deg); }
.body { flex: 1; overflow: auto; position: relative; }
.contents { display: grid; padding: var(--cpt-modaldialog-body-padding); }
.footer {
  display: none; align-items: center; flex: none; box-sizing: border-box;
  height: var(--cpt-modaldialog-footer-height); padding: 0 var(--cpt-modaldialog-footer-padding-inline);
  background: var(--cpt-modaldialog-footer-bg);
  border-top: var(--cpt-modaldialog-footer-divider-width) solid var(--cpt-modaldialog-footer-divider);
}
:host([data-filled~="actions"]) .footer, :host([data-filled~="actions-left"]) .footer { display: flex; }
.zone { display: flex; flex-grow: 1; flex-wrap: wrap; align-items: center; gap: 0.5em; }
.zone.left { justify-content: flex-start; }
.zone.right { justify-content: flex-end; }
```

## Example

```xml
<div layout="row" gap="6" align="start" wrap="">
  <jui-modal-dialog title="Create a project" width="fit">
    <p>Give the project a name to get started.</p>
    <jui-btn label="Cancel" variant="outlined" nature="grey"/>
    <jui-btn label="Create"/>
  </jui-modal-dialog>
  <jui-modal-dialog title="Invite members" subtitle="People you invite can see every project." subtitle-icon="info" description="Invitations expire after seven days." state="close-hover" width="fit">
    <p>Body content, such as a form.</p>
    <jui-btn slot="actions-left" label="Copy invite link" variant="text"/>
    <jui-btn label="Send invites"/>
  </jui-modal-dialog>
  <jui-modal-dialog title="Uniform dialog" variant="uniform" width="fit">
    <p>Header, body and footer read as one surface.</p>
    <jui-btn label="Done"/>
  </jui-modal-dialog>
  <jui-modal-dialog title="No actions" closable="false" width="fit">
    <p>Without actions there is no footer.</p>
  </jui-modal-dialog>
</div>
```
