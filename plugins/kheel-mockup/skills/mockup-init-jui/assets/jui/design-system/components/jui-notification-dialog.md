---
name: jui-notification-dialog
version: 1.0.1
kind: composed
status: active
summary: NotificationDialog component — a ready-made confirm, alert, error or save-changes dialog.
---

# NotificationDialog (component)

## Purpose

Represents JUI's **NotificationDialog**: helper-built dialogs for the standard prompts — **confirm** an action
(with the option to back out), **alert** the user to something, report an **error**, or ask whether to **save**
changes before leaving a form. Each is a `jui-modal-dialog` with a large icon beside a message and a fixed set of
buttons for its type. Use it as the content of a `dialog` mockup for these prompts; build anything with its own
content (a form, a list, a choice) as a `jui-modal-dialog`. For a passing confirmation that needs no response,
use `jui-notifier`.

## Anatomy

A `jui-modal-dialog` (title, close control, footer) whose body holds a large `jui-icon` on the left and the
message beside it. The footer's buttons (`jui-btn`) depend on the type:

| Type | Buttons (left to right) | Outcomes |
| --- | --- | --- |
| confirm | Cancel, OK | `DISMISS`, `OK` |
| alert | Dismiss | `DISMISS` |
| error | Dismiss | `DISMISS` (icon in the error colour) |
| save | Cancel, Discard changes, Save | `DISMISS`, `DISCARD`, `OK` |

The close control always gives `DISMISS`.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| type | variant | confirm, alert, error, save | confirm | Which prompt (JUI `NotificationDialog.confirm`, `alert`, `error`, `save`). |
| title | content | text | | The dialog title (the first argument, e.g. `confirm("Delete project")`). |
| message | content | text | | The message (JUI `notice(…)` / the message argument). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| type | confirm | Before an action the user may want to back out of, especially a destructive one. |
| type | alert | To make sure the user has seen something; nothing follows but dismissing. |
| type | error | When something failed and the user must know. |
| type | save | When leaving a modified form: save, discard or stay. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Type | confirm | `type="confirm"` | Question icon; Cancel and OK. |
| Type | alert | `type="alert"` | Alert icon; Dismiss. |
| Type | error | `type="error"` | Alert icon in the error colour; Dismiss. |
| Type | save | `type="save"` | Save icon; Cancel, Discard changes and Save. |

## Behaviour

The dialog opens over the page and each button closes it, passing its outcome to the handler; the handler may
hold the dialog open (showing the button waiting) until its work completes. In a mockup, put `closes` on the
mockup's dialog or link the outcome in a `specification`.

## Content rules

Title: the action or subject (`Delete project`, `Unsaved changes`). Message: one or two sentences saying what will
happen or what went wrong, ending with a question for confirm and save (`Are you sure you want to delete this
project?`).

## Accessibility

As `jui-modal-dialog`. Use `role="alertdialog"` for confirm, error and save. The icon is decorative; the message
carries the meaning.

## Rules of use

- Confirm destructive actions only; don't confirm routine ones.
- Don't put controls or long text in a notification dialog; use `jui-modal-dialog`.
- Say what happens in the message rather than relying on the button labels.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-notificationdialog-icon` | component | `--jui-color-neutral60` | Icon colour; `--jui-state-error` for the error type. |
| `--cpt-notificationdialog-text` | component | `--jui-color-neutral80` | Message colour. |
| `--frag-icon-size` | component | `2.5em` | Size of the icon. |
| `--jui-color-neutral60`, `--jui-color-neutral80`, `--jui-state-error` | semantic | | Icon, message and error colours (JUI's `NotificationDialog.css`). |

## Template

```html
<jui-modal-dialog title="{{title}}">
  <div class="outer">
    <jui-icon class="icon" data-if="type=confirm" name="circle-help"></jui-icon>
    <jui-icon class="icon" data-if="type=alert" name="circle-alert"></jui-icon>
    <jui-icon class="icon" data-if="type=error" name="circle-alert"></jui-icon>
    <jui-icon class="icon" data-if="type=save" name="save"></jui-icon>
    <p>{{message}}</p>
  </div>
  <jui-btn slot="actions" data-if="type=confirm" label="Cancel" variant="outlined" nature="grey" closes=""></jui-btn>
  <jui-btn slot="actions" data-if="type=confirm" label="OK" closes=""></jui-btn>
  <jui-btn slot="actions" data-if="type=alert" label="Dismiss" closes=""></jui-btn>
  <jui-btn slot="actions" data-if="type=error" label="Dismiss" closes=""></jui-btn>
  <jui-btn slot="actions" data-if="type=save" label="Cancel" variant="outlined" nature="grey" closes=""></jui-btn>
  <jui-btn slot="actions" data-if="type=save" label="Discard changes" variant="outlined" nature="danger" closes=""></jui-btn>
  <jui-btn slot="actions" data-if="type=save" label="Save" closes=""></jui-btn>
</jui-modal-dialog>
```

## Style

```css
:host { display: block; --cpt-notificationdialog-icon: var(--jui-color-neutral60); --cpt-notificationdialog-text: var(--jui-color-neutral80); }
:host([type="error"]) { --cpt-notificationdialog-icon: var(--jui-state-error); }
.outer { position: relative; padding-left: 52px; min-height: 33px; }
.icon { position: absolute; left: 0; top: 0; --frag-icon-size: 2.5em; color: var(--cpt-notificationdialog-icon); }
p { font-size: 1.1em; color: var(--cpt-notificationdialog-text); margin: 5px 0; }
```

## Example

```xml
<div layout="grid" cols="2" gap="6">
  <jui-notification-dialog title="Delete project" message="Are you sure you want to delete this project? This cannot be undone."/>
  <jui-notification-dialog type="alert" title="Saving information" message="The information has been saved."/>
  <jui-notification-dialog type="error" title="Could not save" message="The server did not respond. Try again in a moment."/>
  <jui-notification-dialog type="save" title="Unsaved changes" message="You have changes that have not been saved. Save them before leaving?"/>
</div>
```
