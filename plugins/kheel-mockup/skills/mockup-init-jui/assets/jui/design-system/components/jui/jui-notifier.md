---
name: jui-notifier
version: 1.0.0
kind: elemental
status: active
summary: Notifier component — a transient toast message in the bottom-left corner of the screen.
---

# Notifier (component)

## Purpose

Represents JUI's **Notifier**: a transient toast, created with `Notifier.create().text("…").show(millis)`,
that appears in the bottom-left corner of the screen and fades away after the given time. Use it to confirm that
something the user did has happened (`Successfully created`). Use `jui-notification-block` for a message that
must stay on the page (validation errors, warnings), and `jui-notification-dialog` when the user must respond.

## Anatomy

A small card, 18em wide, on a light grey surface with a thick grey bar on its left edge, rounded corners and a
soft shadow, holding one line or short paragraph of text. Several notifiers stack upwards from the corner.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| text | content | text | | The message (JUI `text(String)`). |
| placement | variant | fixed, inline | fixed | `fixed` draws it in the bottom-left corner of the screen, as JUI does; `inline` draws it where it is placed, for showing it beside other content. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| placement | fixed | In page mockups: the toast sits over the page in the corner. |
| placement | inline | In sections, catalogues and flows where the toast is shown next to what caused it. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Visibility | shown | Default | The toast, fading in. |
| Visibility | hiding | JUI after the display time; `state="hiding"` | Faded and collapsing. |

## Behaviour

Appears with a short fade and disappears by itself after the time given to `show(...)` (typically 2 seconds),
fading and collapsing. It does not take focus and has no actions.

## Content rules

One short sentence, past tense, saying what happened: `Successfully created`, `Invitation sent`. No full stop
needed.

## Accessibility

The container should be a live region (`role="status"`) so the message is announced. Don't put information in a
toast that the user cannot find again elsewhere.

## Rules of use

- Only for confirmations of the user's own actions; errors that need attention go in a notification block or
  dialog.
- One toast per action.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-cpt-notifier-color` | component | `--jui-color-neutral60` | Text colour. |
| `--jui-cpt-notifier-color-bg` | component | `--jui-color-neutral05` | Background. |
| `--jui-cpt-notifier-color-bdr` | component | `--jui-color-neutral40` | Left bar and shadow colour. |
| `--jui-color-neutral05`, `--jui-color-neutral40`, `--jui-color-neutral60` | semantic | | Notifier colours (JUI's `Notifier.css`). |

## Template

```html
<div class="notifier" role="status"><p>{{text}}</p></div>
```

## Style

```css
:host {
  display: block; position: fixed; bottom: 0; left: 0; padding: 2em 1em; z-index: 1000;
  --jui-cpt-notifier-color: var(--jui-color-neutral60);
  --jui-cpt-notifier-color-bg: var(--jui-color-neutral05);
  --jui-cpt-notifier-color-bdr: var(--jui-color-neutral40);
}
:host([placement="inline"]) { position: static; padding: 0; z-index: auto; }
.notifier {
  display: flow-root; color: var(--jui-cpt-notifier-color); width: 18em; background: var(--jui-cpt-notifier-color-bg);
  border-left: 6px solid var(--jui-cpt-notifier-color-bdr); border-radius: 4px;
  box-shadow: 0 0 5px var(--jui-cpt-notifier-color-bdr); animation: notifier-show 0.2s ease-in;
}
:host([state~="hiding"]) .notifier { opacity: 0.3; max-height: 2em; overflow: hidden; }
p { padding: 0 1em; margin: 1em 0; }
@keyframes notifier-show { 0% { opacity: 0; } 100% { opacity: 1; } }
```

## Example

```xml
<div layout="row" gap="4" align="start">
  <jui-notifier placement="inline" text="Successfully created"/>
  <jui-notifier placement="inline" text="The invitation has been sent to jane@example.com"/>
  <jui-notifier placement="inline" text="Successfully updated" state="hiding"/>
</div>
```
