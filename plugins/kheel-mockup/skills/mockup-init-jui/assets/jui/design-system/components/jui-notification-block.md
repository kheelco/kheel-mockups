---
name: jui-notification-block
version: 1.0.0
kind: composed
status: active
summary: NotificationBlock component — an inline notice, success or error message with a coloured side bar.
---

# NotificationBlock (component)

## Purpose

Represents JUI's **NotificationBlock**: an inline message block on the page — a notice, a success or an error —
with an icon on a coloured bar, an optional title, a message and an optional list of lines (such as the errors
of a form). JUI uses it for form-level validation messages (a control panel's messages area) and for persistent
notices at the top of a page or dialog. Use `jui-notifier` for a passing confirmation and
`jui-notification-dialog` when the user must respond.

In JUI one block renders any number of notifications from a builder; in a mockup each `jui-notification-block`
is one notification — stack several in a column for more.

## Anatomy

A bordered box on the theme's surface. A coloured bar down the left edge holds the theme's icon (`jui-icon`) in
white. To its right: an optional title, the message, and an optional bulleted list of lines. The compact form
drops the title and uses a smaller size; the full form removes the side borders and radius so the block spans its
container edge to edge.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| theme | variant | notice, success, error | notice | The kind of message (JUI `NotificationBuilder.Theme`). |
| variant | variant | standard, compact, full | standard | The block's form (JUI `NotificationBlock.Config.Style` `STANDARD`, `STANDARD_COMPACT`, `FULL`). |
| title | content | text | | Optional title (JUI `title(String)`); not shown in the compact form. |
| content | content | text | | The message (JUI `content(String)`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| theme | notice | Information the user should read; info colours. |
| theme | success | Something completed; success colours. |
| theme | error | Something is wrong; error colours, and the text in the error colour. |
| variant | standard | The usual block. |
| variant | compact | Form messages: smaller, without the title (JUI `STANDARD_COMPACT`, as used by control panels). |
| variant | full | Edge to edge across a panel or dialog, without side borders or rounding (JUI `FULL`). |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Theme | notice | `theme="notice"` | Info border and bar, white surface. |
| Theme | success | `theme="success"` | Success border and bar, white surface. |
| Theme | error | `theme="error"` | Error border and bar, error surface, text in the error colour. |
| Content | with-lines | Lines present | A bulleted list below the message. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | li | li | A bulleted list. | The lines of the notification (JUI `line(String)`), one `li` each. |

## Behaviour

None; it stays until the page or the code clears it (JUI `clear()` hides the block).

## Content rules

Title: a few words (`Could not save`). Message: one sentence. Lines: one item each, such as each field in error
(`Name is required`).

## Accessibility

Errors should be announced: give the block `role="alert"` when it appears in response to an action. The icon is
decorative; the theme's meaning must be carried by the text too.

## Rules of use

- Use `error` only for problems the user must fix, `success` for completed work that is worth keeping on screen.
- Keep lines to the facts the user acts on; don't repeat the message.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-notification-accent` | component | `--jui-comp-notification-info-accent` | The theme's accent; the error theme's text colour. |
| `--cpt-notification-border` | component | `--jui-comp-notification-info-border` | Border and side bar colour. |
| `--cpt-notification-surface` | component | `--jui-comp-notification-info-surface` | Background. |
| `--cpt-notification-icon` | component | `--jui-role-text-inverse` | Icon colour on the bar. |
| `--cpt-notification-title` | component | `--jui-role-text-heading` | Title colour; the accent for error. |
| `--cpt-notification-text` | component | `--jui-role-border-contrast` | Message colour; the accent for error. |
| `--cpt-notification-item` | component | `--jui-role-text-muted` | Line colour; the accent for error. |
| `--cpt-notification-radius` | component | `--jui-comp-notification-radius` | Corner radius; `0` for full. |
| `--frag-icon-size` | component | `2em` | Icon size. |
| `--jui-comp-notification-info-accent`, `--jui-comp-notification-info-border`, `--jui-comp-notification-info-surface`, `--jui-comp-notification-success-accent`, `--jui-comp-notification-success-border`, `--jui-comp-notification-success-surface`, `--jui-comp-notification-error-accent`, `--jui-comp-notification-error-border`, `--jui-comp-notification-error-surface`, `--jui-comp-notification-radius` | semantic | | Theme colours and radius. |
| `--jui-role-text-inverse`, `--jui-role-text-heading`, `--jui-role-border-contrast`, `--jui-role-text-muted`, `--jui-font-weight-regular` | semantic | | Text colours and title weight. |
| `--jui-space-1`, `--jui-space-3`, `--jui-space-4`, `--jui-space-8` | semantic | | Insets. |

## Template

```html
<div class="notification">
  <div class="left">
    <jui-icon data-if="theme=notice" name="circle-alert"></jui-icon>
    <jui-icon data-if="theme=success" name="circle-check"></jui-icon>
    <jui-icon data-if="theme=error" name="circle-alert"></jui-icon>
  </div>
  <h3 data-if="title">{{title}}</h3>
  <p data-if="content"><span>{{content}}</span></p>
  <ul><slot></slot></ul>
</div>
```

## Style

```css
:host {
  display: block;
  --cpt-notification-accent: var(--jui-comp-notification-info-accent);
  --cpt-notification-border: var(--jui-comp-notification-info-border);
  --cpt-notification-surface: var(--jui-comp-notification-info-surface);
  --cpt-notification-icon: var(--jui-role-text-inverse);
  --cpt-notification-title: var(--jui-role-text-heading);
  --cpt-notification-text: var(--jui-role-border-contrast);
  --cpt-notification-item: var(--jui-role-text-muted);
  --cpt-notification-radius: var(--jui-comp-notification-radius);
}
:host([theme="success"]) {
  --cpt-notification-accent: var(--jui-comp-notification-success-accent);
  --cpt-notification-border: var(--jui-comp-notification-success-border);
  --cpt-notification-surface: var(--jui-comp-notification-success-surface);
}
:host([theme="error"]) {
  --cpt-notification-accent: var(--jui-comp-notification-error-accent);
  --cpt-notification-border: var(--jui-comp-notification-error-border);
  --cpt-notification-surface: var(--jui-comp-notification-error-surface);
  --cpt-notification-title: var(--jui-comp-notification-error-accent);
  --cpt-notification-text: var(--jui-comp-notification-error-accent);
  --cpt-notification-item: var(--jui-comp-notification-error-accent);
}
:host([variant="full"]) { --cpt-notification-radius: 0; }
.notification {
  position: relative; overflow: hidden;
  border: 1px solid var(--cpt-notification-border); background: var(--cpt-notification-surface);
  border-radius: var(--cpt-notification-radius); color: var(--cpt-notification-text);
  padding: var(--jui-space-3) var(--jui-space-4) var(--jui-space-4) var(--jui-space-8);
}
:host([variant="compact"]) .notification { font-size: 0.9em; }
:host([variant="full"]) .notification { border-left: none; border-right: none; }
h3 { padding-left: var(--jui-space-4); margin: 0 0 var(--jui-space-1) 0; color: var(--cpt-notification-title); font-weight: var(--jui-font-weight-regular); font-size: 1.4em; line-height: 1.3; }
:host([variant="compact"]) h3 { display: none; }
p { padding-left: var(--jui-space-4); margin: 0; }
.left {
  padding-top: var(--jui-space-3); position: absolute; left: 0; top: 0; bottom: 0; width: var(--jui-space-8);
  background: var(--cpt-notification-border); text-align: center;
}
.left jui-icon { --frag-icon-size: 2em; color: var(--cpt-notification-icon); }
:host([variant="compact"]) .left jui-icon { --frag-icon-size: 1.5em; }
ul { display: none; margin: var(--jui-space-3) 0 0; padding: 0 var(--jui-space-4); }
:host([data-filled~="default"]) ul { display: block; }
::slotted(li) { list-style: disc; margin-left: var(--jui-space-8); font-size: 0.9em; color: var(--cpt-notification-item); margin-bottom: var(--jui-space-1); }
::slotted(li:last-child) { margin-bottom: 0; }
```

## Example

```xml
<div layout="column" gap="4">
  <jui-notification-block title="Before you start" content="Projects are visible to everyone in your organisation."/>
  <jui-notification-block theme="success" title="All set" content="The project has been created."/>
  <jui-notification-block theme="error" title="Could not save" content="Please correct the following:">
    <li>Name is required</li>
    <li>The end date must be after the start date</li>
  </jui-notification-block>
  <jui-notification-block theme="error" variant="compact" content="There are errors in the form.">
    <li>Email is not a valid address</li>
  </jui-notification-block>
  <jui-notification-block variant="full" content="Full form: edge to edge, no side borders."/>
</div>
```
