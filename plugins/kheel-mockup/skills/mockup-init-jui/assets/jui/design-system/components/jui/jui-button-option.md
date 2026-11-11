---
name: jui-button-option
version: 1.0.0
kind: composed
status: active
summary: Button.Config.Option — one option of a button with options, with a label, an optional code or icon and a line.
---

# Button.Config.Option (component)

## Purpose

One option of a `jui-button` with options, standing for an entry added with JUI's `Button.Config.option(label,
text, code, handler)` or `iconOption(label, text, icon, handler)`. It only exists inside a button, which lists its
options in a menu card while open. An option says what it does: its name, an optional short **code** before it
(`REQ`) or an icon in its place, and an optional line beneath that says what it is. Use it for variants of a
button's action or choices of one kind; for a menu of unrelated actions behind an icon use `jui-menu-item` in a
`jui-menu-activator`.

## Anatomy

A row: a code tag drawn in the button's own colours (or a `jui-icon`, when there is no code), then the label, with
the line in smaller, muted text beneath it.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The option's name (JUI `option(label, …)`). |
| text | content | text | | A line saying what it is, beneath the label (JUI `option(…, text, …)`). |
| code | content | text | | A short tag before the label, such as `REQ` (JUI `option(…, code, …)`). Takes the place of an icon. |
| icon | content | icon | | An icon before the label (JUI `iconOption(…, icon, …)`); ignored when there is a code. |

## Variants

None; the button decides the look of the code tag (its variant's colours).

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Plain row. |
| Interaction | active | `:hover`, or Down and Up from the keyboard | Muted surface behind the row: the option Enter would choose. |

## Behaviour

A click on the option (or Enter while it is active) closes the button's menu, then runs the option's handler. In a
mockup give it an `href` or `opens` to show what choosing it leads to.

## Content rules

The label is a noun or short verb phrase in sentence case (`Requirement`, `Add a rule`). The code is two to four
capitals. The line is one short sentence fragment without a full stop.

## Accessibility

Each option is a `menuitem` of the button's `menu`. The code is decorative; the label carries the meaning.

## Rules of use

- Give all a button's options codes, or all icons, or neither, so their labels line up.
- Keep the line to one row in the menu's width (24em at most).

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-btn-border`, `--cpt-btn-bg`, `--cpt-btn-text`, `--cpt-btn-border-radius` | inherited | | The code tag and the row's radius, from the enclosing `jui-button`. |
| `--jui-role-text-default`, `--jui-role-text-muted`, `--jui-role-surface-muted` | semantic | | Label, line and icon colours; the active row. |

## Template

```html
<div class="option" role="menuitem">
  <span class="code" data-if="code">{{code}}</span>
  <jui-icon class="icon" data-if="icon" name="{{icon}}"></jui-icon>
  <span class="body">
    <span class="label">{{label}}</span>
    <span class="text" data-if="text">{{text}}</span>
  </span>
</div>
```

## Style

```css
:host { display: block; }
.option {
  display: flex;
  align-items: flex-start;
  gap: 0.6em;
  padding: 0.45em 0.6em;
  border-radius: var(--cpt-btn-border-radius);
  color: var(--jui-role-text-default);
  cursor: pointer;
}
.option:hover, :host([state~="active"]) .option { background: var(--jui-role-surface-muted); }
.code {
  flex: 0 0 auto;
  box-sizing: border-box;
  min-width: 3.2em;
  margin-top: 0.15em;
  padding: 0.1em 0.45em;
  border: 1px solid var(--cpt-btn-border);
  border-radius: var(--cpt-btn-border-radius);
  background: var(--cpt-btn-bg);
  color: var(--cpt-btn-text);
  font-size: 0.7em;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.5;
  text-align: center;
}
.icon { flex: 0 0 auto; width: 1.25em; margin-top: 0.2em; text-align: center; color: var(--jui-role-text-muted); }
:host([code]) .icon { display: none; }
.body { display: flex; flex-direction: column; gap: 0.1em; min-width: 0; }
.label { font-weight: 500; line-height: 1.4; }
.text { font-size: 0.85em; line-height: 1.35; color: var(--jui-role-text-muted); }
```

## Example

```xml
<div layout="row" gap="6" align="start">
  <jui-button label="Add requirement" icon="plus" split="" state="open">
    <jui-button-option label="Requirement" code="REQ" text="Something the solution must do" state="active"/>
    <jui-button-option label="Rule" code="RULE" text="A constraint on how it is done"/>
  </jui-button>
  <jui-button label="Export" variant="outlined" state="open">
    <jui-button-option label="As PDF" icon="file-text" text="For printing and sharing"/>
    <jui-button-option label="As spreadsheet" icon="table"/>
  </jui-button>
  <div mt="12" mb="12"></div>
</div>
```
