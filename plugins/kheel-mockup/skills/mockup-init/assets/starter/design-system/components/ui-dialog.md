---
name: ui-dialog
version: 1.0.0
kind: composed
status: active
summary: A modal surface for a short task or a confirmation.
---

# Dialog

## Purpose

Asks for a decision or a short piece of input without leaving the page: confirming a deletion, creating a record
with a few fields. It is the content of a `dialog` mockup. Longer tasks deserve their own page.

## Anatomy

A raised surface with a header (title, optional description, close button), a body, and a footer of actions,
right-aligned with the primary action last.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| title | content | text | | What the dialog is for, as a question or a verb phrase. |
| description | content | text | | One or two sentences of context. |
| tone | variant | default, danger | default | `danger` for destructive confirmations: shows a warning icon. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| tone | default | Forms and neutral questions. |
| tone | danger | Confirming something that cannot be undone. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Activity | idle | Default | — |
| Activity | submitting | The primary action is running | The primary button shows loading; other actions disabled. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | any | ui-text-field, ui-select, ui-checkbox | configurable | The body. Defaults to a column with `gap` 4. |
| actions | ui-button | ui-button | Row, right-aligned | The actions. Placed automatically. |

## Behaviour

Opens over a scrim and takes focus. Escape, the close button, clicking the scrim or a cancel action close it
without change. The primary action closes it on success; on failure, the dialog stays open and shows the error.
In a mockup, give cancel buttons the `closes` attribute.

## Content rules

The title says what will happen ("Delete this job?"). The primary action repeats the verb ("Delete job"), never
"OK" or "Yes".

## Accessibility

`role="dialog"`, `aria-modal`, labelled by the title. Focus moves into the dialog on open, stays inside while open,
and returns to what opened it on close.

## Rules of use

- Don't open a dialog from a dialog.
- Don't use a dialog for information the user doesn't have to act on; use an inline message.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--color-surface`, `--shadow-lg`, `--radius-xl` | semantic |  | Dialog surface, elevation and corners. |
| `--color-danger`, `--color-danger-subtle`, `--radius-full` | semantic |  | Warning icon circle in the danger tone. |
| `--color-text`, `--color-text-muted` | semantic |  | Title; description. |
| `--color-bg`, `--color-border` | semantic |  | Footer background and divider. |
| `--font-body`, `--text-xl`, `--text-md`, `--weight-semibold`, `--leading-tight` | semantic |  | Title and description type. |
| `--space-2`, `--space-3`, `--space-4`, `--space-5` | semantic |  | Padding and gaps. |

## Template

```html
<div class="dialog" role="dialog" aria-modal="true" aria-label="{{title}}">
  <header>
    <span class="warn" data-if="tone=danger"><ui-icon name="triangle-alert"></ui-icon></span>
    <div class="titles">
      <h2 class="title">{{title}}</h2>
      <p class="desc" data-if="description">{{description}}</p>
    </div>
    <ui-button class="close" variant="ghost" size="small" icon="x" aria-label="Close" closes=""></ui-button>
  </header>
  <div class="body" data-layout><slot></slot></div>
  <footer><slot name="actions"></slot></footer>
</div>
```

## Style

```css
:host { display: block; }
.dialog { background: var(--color-surface); border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); overflow: hidden; }
header { display: flex; align-items: flex-start; gap: var(--space-3); padding: var(--space-5) var(--space-5) var(--space-3); }
.warn { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--color-danger-subtle); color: var(--color-danger); flex: none; }
.titles { flex: 1; }
.title { margin: 0; font: var(--weight-semibold) var(--text-xl) / var(--leading-tight) var(--font-body); color: var(--color-text); }
.desc { margin: var(--space-2) 0 0; color: var(--color-text-muted); font-size: var(--text-md); }
.body { display: flex; flex-direction: column; gap: var(--space-4); padding: var(--space-2) var(--space-5) var(--space-5); }
:host(:not([data-filled~="default"])) .body { display: none; }
footer { display: flex; justify-content: flex-end; gap: var(--space-2); padding: var(--space-4) var(--space-5); background: var(--color-bg); border-top: 1px solid var(--color-border); }
```

## Example

```xml
<ui-dialog title="Delete this job?" description="Blocked drain at 12 Kauri St will be removed for everyone. This can't be undone." tone="danger">
  <ui-button label="Cancel"/>
  <ui-button variant="danger" label="Delete job"/>
</ui-dialog>
```
