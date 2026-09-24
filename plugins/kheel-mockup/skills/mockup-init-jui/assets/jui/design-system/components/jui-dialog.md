---
name: jui-dialog
version: 1.0.0
kind: composed
status: active
summary: Dialog fragment — an inline, non-modal dialog panel with a header, contents and a footer of actions.
---

# Dialog (fragment)

## Purpose

Represents JUI's **Dialog** fragment: a dialog-shaped panel drawn inline in the page — a grey header with a title
and an optional close icon, the contents, and a footer of buttons split left and right. It is not modal and does
not float: use it inside dropdowns and popovers (a filter panel with *Clear* and *Apply*), in side areas, or
anywhere a dialog's framing helps without blocking the page. Being a fragment, it has no events of its own: its
close icon and action buttons are handled by the enclosing component (see **Fragment events**). For a real modal
dialog over a scrim use JUI's modal dialog (a `dialog` mockup); for a full-screen overlay use `jui-popup`.

## Anatomy

- **Header** — grey band with the title (`h4`) on the left and, when `closable`, a close icon (`jui-icon` x) on
  the right that turns on hover. Always present, even without a title.
- **Contents** — the body; JUI adds no padding, so the content supplies its own.
- **Footer** — shown when there are actions: left-hand buttons, a gap, then right-hand buttons (`jui-btn`).

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| title | content | text | | The header title (JUI `title(…)`). |
| closable | content | boolean | | Shows the close icon (JUI `onclose(…)`). |
| variant | variant | plain, plain-no-shadow | plain | `plain` has a soft drop shadow; `plain-no-shadow` has none (JUI `Dialog.Variant`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | plain | Floating contexts — dropdowns, popovers — where the shadow lifts it off the page. |
| variant | plain-no-shadow | Placed flat in the page, among cards. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | As the variant. |
| Interaction | close-hover | `:hover` on the close icon | The close icon rotates 90°. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | | | configurable | The dialog's contents. Give them their own padding (`m`). |
| left-actions | jui-btn | jui-btn | A row at the left of the footer, 0.5 em apart. | Secondary actions (JUI `Action.left(…)`), e.g. *Clear*. |
| actions | jui-btn | jui-btn | A row at the right of the footer, 0.5 em apart. | Main actions (JUI `Action.right(…)`), e.g. *Cancel*, *Apply*. |

## Behaviour

The close icon and the footer buttons run their handlers through the enclosing component (**Fragment events**);
closing means whatever that component does (usually hiding the dropdown or panel holding the dialog). The dialog
itself never closes on its own.

## Content rules

The title names the task in a few words (`Filter jobs`). Actions are verbs; the main action on the right.

## Accessibility

The title is a heading. The close icon needs an accessible name ("Close") in the real screen. Focus should move
into the dialog when it is shown in a dropdown.

## Rules of use

- Put buttons in the footer through `left-actions` and `actions`, not in the contents.
- One `standard` button, on the right; the rest `outlined`, `text` or `grey`.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--frag-dialog-border-radius-shadow` | component | `10px` | Drop shadow blur (`plain`). |
| `--frag-dialog-border-radius` | component | `10px` | Corner radius. |
| `--frag-dialog-border-color` | component | `--jui-color-neutral20` | Border, header and footer rules, and the shadow colour. |
| `--frag-dialog-header-bg` | component | `--jui-color-neutral05` | Header background. |
| `--frag-dialog-header-color` | component | `--jui-color-neutral60` | Header title and close icon colour. |
| `--jui-color-neutral05`, `--jui-color-neutral20`, `--jui-color-neutral60` | semantic | | Dialog colours. |
| `--jui-color-aux-white` | semantic | | Background. |

## Template

```html
<div class="dialog">
  <div class="header">
    <h4 data-if="title">{{title}}</h4>
    <span class="expander"></span>
    <span class="close" data-if="closable"><jui-icon name="x"></jui-icon></span>
  </div>
  <div class="contents" data-layout=""><slot></slot></div>
  <div class="footer">
    <slot name="left-actions"></slot>
    <span class="expander"></span>
    <slot name="actions"></slot>
  </div>
</div>
```

## Style

```css
:host {
  display: block;
  --frag-dialog-border-radius-shadow: 10px;
  --frag-dialog-border-radius: 10px;
  --frag-dialog-border-color: var(--jui-color-neutral20);
  --frag-dialog-header-bg: var(--jui-color-neutral05);
  --frag-dialog-header-color: var(--jui-color-neutral60);
}
.dialog {
  background: var(--jui-color-aux-white);
  border: 1px solid var(--frag-dialog-border-color);
  border-radius: var(--frag-dialog-border-radius);
}
:host([variant="plain"]) .dialog { box-shadow: 0 0 var(--frag-dialog-border-radius-shadow) var(--frag-dialog-border-color); }
.header {
  display: flex;
  align-items: center;
  min-height: 3em;
  padding: 0 1em;
  background: var(--frag-dialog-header-bg);
  overflow: hidden;
  border-radius: var(--frag-dialog-border-radius) var(--frag-dialog-border-radius) 0 0;
  border-bottom: 1px solid var(--frag-dialog-border-color);
  color: var(--frag-dialog-header-color);
}
.header h4 { margin: 0; font-size: 1.1em; font-weight: 400; }
.expander { flex-grow: 1; }
.close {
  cursor: pointer;
  width: 1em;
  height: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}
.close:hover, :host([state~="close-hover"]) .close { transform: rotate(90deg); }
.contents { display: block; min-height: 3em; }
.footer {
  display: none;
  align-items: center;
  gap: 0.5em;
  min-height: 3em;
  padding: 0.5em 1em;
  box-sizing: border-box;
  border-radius: 0 0 var(--frag-dialog-border-radius) var(--frag-dialog-border-radius);
  overflow: hidden;
  border-top: 1px solid var(--frag-dialog-border-color);
}
:host([data-filled~="actions"]) .footer, :host([data-filled~="left-actions"]) .footer { display: flex; }
```

## Example

```xml
<div layout="grid" cols="2" gap="6" align="start">
  <jui-dialog title="A simple dialog" closable="">
    <p mx="6" my="2">This is a simple dialog with some simple contents, not much else.</p>
    <jui-btn slot="left-actions" label="Clear" variant="outlined" nature="grey"/>
    <jui-btn slot="actions" label="Apply" expanded=""/>
  </jui-dialog>
  <jui-dialog title="Filter jobs" variant="plain-no-shadow" closable="" state="close-hover">
    <p mx="6" my="2">No shadow, laid flat in the page.</p>
    <jui-btn slot="actions" label="Cancel" variant="outlined" nature="grey"/>
    <jui-btn slot="actions" label="Apply"/>
  </jui-dialog>
  <jui-dialog title="Contents only">
    <p mx="6" my="2">Without actions there is no footer.</p>
  </jui-dialog>
</div>
```
