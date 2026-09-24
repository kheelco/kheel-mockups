---
name: jui-control-form
version: 1.0.0
kind: composed
status: active
summary: ControlForm component — a form of labelled controls laid out in groups and rows, with a form-level error block.
---

# ControlForm (component)

## Purpose

Represents JUI's **ControlForm** (`…control.builder`): the standard way to lay out a form. A ControlForm holds a
top-level group whose optional header (icon, title, instruction) sits above a body of rows and nested groups, and
it presents a form-level error block when validation fails or the server returns errors that no control accepts.
Use it for every data-entry surface — create and edit forms, settings pages, the contents of form dialogs
(`ControlFormCreator.createForDialog()`). Use `jui-control-field` only for the odd labelled control outside a
form.

The mockup represents the form builder's parts as four tags:

| Tag | JUI concept |
| --- | --- |
| `jui-control-form` | The `ControlForm` component and its top-level group (depth 0): `header(…)`, `footer(…)`, the body, `bar(…)` and the error block. |
| `jui-control-form-group` | A nested group, `group(…)` / `group2(…)` / `group3(…)` (`IGroupBuilder`), with its header (`IHeaderBuilder`), footer (`IFooterBuilder`), separator, conditional and horizontal options. |
| `jui-control-form-row` | A row, `row(…)` (`IRowBuilder`): cells side by side. |
| `jui-control-form-cell` | A cell, `row.control(label, control, cell -> …)` (`IControlCell`): label, help, guidance and error messages around one control. |

`form.control(label, ctl)` — a row holding one cell — is written as a row with one cell.

## Anatomy

- **Error block** (JUI `.errors`) — shown when the form is invalid: a rounded, tinted panel with an alert icon and
  the message, above everything else.
- **Header** — optional icon and title (`h3`, the largest form heading) and instruction text beneath.
- **Body** (default slot) — rows (`jui-control-form-row`), nested groups (`jui-control-form-group`) and any other
  content (notices, text), stacked with the widest spacing.
- **Footer** — optional guidance text in a small muted type.
- **Bar** (`bar` slot) — an action bar of buttons after the body.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| title | content | text | | Header title (JUI `header(h -> h.title(…))`). |
| icon | content | icon | | Header icon before the title (JUI `header.icon(…)`). |
| instruction | content | text | | Header instruction text (JUI `header.instruction(…)`). |
| guidance | content | text | | Footer guidance (JUI `footer(f -> f.guidance(…))`). |
| error | content | text | | The form-level error message; puts the form in the invalid state (JUI: shown by `validate()` failing or `invalidate(…)`). |

## Variants

None in the mockup. JUI's `ControlForm.Config` also offers a maximum width, a dialog configuration
(`ControlFormCreator.createForDialog()`) and boxed variants that frame nested groups; the mockup frame and the
`width` attribute stand in for width.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Validation | valid | Default | No error block. |
| Validation | invalid | `error` property | Error block at the top; the failing cells show their own messages. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | | jui-control-form-row, jui-control-form-group | Column; widest spacing (the depth-0 gap) | The form body: rows, nested groups and other content (JUI `insert(…)`, e.g. a notice). |
| bar | | jui-btn | Row of actions | The form's action bar (JUI `bar(…)`). Omit in dialogs, whose buttons belong to the dialog. |

## Behaviour

`validate()` validates every visible, enabled control; when any fails, each failing cell shows its messages and
the form shows the error block. Errors from the server (`invalidate(…)`) go to the controls that accept their
paths and any left over are listed in the error block. Controls can show, hide, enable and disable one another
and whole groups through the form's modification context (`show`, `hide`, `enable`, `disable`, `set`), and
conditional groups open and close. Values load from the source object and are written to the command for dirty
controls only (**Control values**).

## Content rules

Title: a noun phrase for what is being edited (`Personal details`). Instruction: one sentence on what to do or
why. Error message: a general statement (`There was a problem, please see the messages below.`); the specifics
belong in the cells.

## Accessibility

Headings follow the group nesting. The error block is announced when it appears, and focus moves to the first
invalid control. Each control is labelled by its cell.

## Rules of use

- Build the whole form from rows and cells; don't place controls directly in the body without a row.
- Use nested groups (with `depth`) for sections, rather than extra spacing or rules.
- Show errors in three places together: `error` on the form, `error` on the failing cells and `invalid` on their
  controls.

## Tokens

The form sets JUI's `--cpt-form-*` tokens; groups, rows and cells read them.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-form-row-gap` | component | `--jui-space-6` | Gap between the cells of a row (read by rows) and after an open conditional group. |
| `--cpt-form-group-depth0-gap` | component | `--jui-space-12` | Gap between the form body's items and below the error block. |
| `--cpt-form-group-depth1-gap`, `--cpt-form-group-depth2-gap`, `--cpt-form-group-depth3-gap`, `--cpt-form-group-depth4-gap` | component | `--jui-space-6`, `--jui-space-6`, `--jui-space-5`, `--jui-space-4` | Gap between a nested group's body items, by depth (read by groups). |
| `--cpt-form-group-indent` | component | `--jui-space-12` | Indent of conditional groups (read by groups). |
| `--cpt-form-header` | component | `--jui-comp-form-header` | Heading colour. |
| `--cpt-form-header-instruction` | component | `--jui-comp-form-instruction` | Instruction colour. |
| `--cpt-form-header-icon-gap` | component | `--jui-space-3` | Gap after the header icon. |
| `--cpt-form-header-depth0-size`, `--cpt-form-header-depth1-size`, `--cpt-form-header-depth2-size`, `--cpt-form-header-depth3-size`, `--cpt-form-header-depth4-size` | component | `1.4em`, `1.3em`, `1.1em`, `1em`, `1em` | Heading size by depth. |
| `--cpt-form-header-rule-gap` | component | `--jui-space-3` | Gap before the heading's trailing rule. |
| `--cpt-form-header-rule-border` | component | `none` | The heading's trailing rule (a border such as `1px solid …` shows it). |
| `--cpt-form-footer-guidance` | component | `--jui-comp-form-footer` | Footer and cell guidance colour. |
| `--cpt-form-footer-guidance-size` | component | `0.9em` | Footer and cell guidance size. |
| `--cpt-form-text` | component | `--jui-comp-form-text` | Cell label colour. |
| `--cpt-form-text-error` | component | `--jui-comp-form-text-error` | Cell label and message colour in error. |
| `--cpt-form-text-disabled` | component | `--jui-comp-form-text-disabled` | Cell label colour when disabled. |
| `--cpt-form-label-size`, `--cpt-form-label-min-height`, `--cpt-form-label-margin-bottom` | component | `0.95em`, `1.35em`, `--jui-space-2` | Cell label size, minimum height and spacing. |
| `--cpt-form-help-bg`, `--cpt-form-help`, `--cpt-form-help-radius` | component | `--jui-comp-form-help-surface`, `--jui-comp-form-help-text`, `--jui-comp-form-help-radius` | Help bubble surface, text and radius. |
| `--cpt-form-help-bubble-width`, `--cpt-form-help-icon-size`, `--cpt-form-help-icon-opacity` | component | `15em`, `0.8em`, `0.75` | Help bubble width and the help icon. |
| `--cpt-form-error-bg` | component | `--jui-comp-form-error-surface` | Error block surface. |
| `--cpt-form-error-icon` | component | `--jui-comp-form-error-icon` | Error block icon colour. |
| `--cpt-form-error-icon-size` | component | `2em` | Error block icon size. |
| `--cpt-form-error-text` | component | `--jui-comp-form-error-text` | Error block text colour. |
| `--cpt-form-error-text-size` | component | `1.05em` | Error block text size. |
| `--cpt-form-error-radius` | component | `--jui-comp-form-error-radius` | Error block radius. |
| `--cpt-form-error-margin-v`, `--cpt-form-error-margin-h` | component | `--jui-space-6`, `1.75em` | Error block padding. |
| `--cpt-form-error-item-gap` | component | `--jui-space-6` | Gap between error icon and text. |
| `--cpt-form-separator` | component | `--jui-comp-form-separator` | Group separator colour (read by groups). |
| `--cpt-form-separator-gap` | component | `--jui-space-6` | Space below a group separator (read by groups). |
| `--jui-space-2`, `--jui-space-3`, `--jui-space-4`, `--jui-space-5`, `--jui-space-6`, `--jui-space-12` | semantic | | Spacing defaults above. |
| `--jui-comp-form-header`, `--jui-comp-form-instruction`, `--jui-comp-form-footer`, `--jui-comp-form-text`, `--jui-comp-form-text-error`, `--jui-comp-form-text-disabled`, `--jui-comp-form-help-surface`, `--jui-comp-form-help-text`, `--jui-comp-form-help-radius`, `--jui-comp-form-error-surface`, `--jui-comp-form-error-icon`, `--jui-comp-form-error-text`, `--jui-comp-form-error-radius`, `--jui-comp-form-separator` | semantic | | The form family defaults. |
| `--jui-font-weight-medium`, `--jui-font-weight-semibold` | semantic | | Error text and heading weights. |

## Template

```html
<div class="form">
  <div class="errors" data-if="error">
    <div class="errors_inner"><div><jui-icon name="circle-alert"></jui-icon><p>{{error}}</p></div></div>
  </div>
  <div class="group depth0">
    <div class="header">
      <h3 data-if="title"><jui-icon data-if="icon" name="{{icon}}"></jui-icon><span>{{title}}</span><div class="rule"></div></h3>
      <p data-if="instruction">{{instruction}}</p>
    </div>
    <div class="body"><slot></slot></div>
    <div class="footer" data-if="guidance"><p>{{guidance}}</p></div>
  </div>
  <div class="bar"><slot name="bar"></slot></div>
</div>
```

## Style

```css
:host {
  display: block;
  --cpt-form-row-gap: var(--jui-space-6);
  --cpt-form-group-depth0-gap: var(--jui-space-12);
  --cpt-form-group-depth1-gap: var(--jui-space-6);
  --cpt-form-group-depth2-gap: var(--jui-space-6);
  --cpt-form-group-depth3-gap: var(--jui-space-5);
  --cpt-form-group-depth4-gap: var(--jui-space-4);
  --cpt-form-group-indent: var(--jui-space-12);
  --cpt-form-header: var(--jui-comp-form-header);
  --cpt-form-header-instruction: var(--jui-comp-form-instruction);
  --cpt-form-header-icon-gap: var(--jui-space-3);
  --cpt-form-header-depth0-size: 1.4em;
  --cpt-form-header-depth1-size: 1.3em;
  --cpt-form-header-depth2-size: 1.1em;
  --cpt-form-header-depth3-size: 1em;
  --cpt-form-header-depth4-size: 1em;
  --cpt-form-header-rule-gap: var(--jui-space-3);
  --cpt-form-header-rule-border: none;
  --cpt-form-footer-guidance: var(--jui-comp-form-footer);
  --cpt-form-footer-guidance-size: 0.9em;
  --cpt-form-text: var(--jui-comp-form-text);
  --cpt-form-text-error: var(--jui-comp-form-text-error);
  --cpt-form-text-disabled: var(--jui-comp-form-text-disabled);
  --cpt-form-label-size: 0.95em;
  --cpt-form-label-min-height: 1.35em;
  --cpt-form-label-margin-bottom: var(--jui-space-2);
  --cpt-form-help-bg: var(--jui-comp-form-help-surface);
  --cpt-form-help: var(--jui-comp-form-help-text);
  --cpt-form-help-radius: var(--jui-comp-form-help-radius);
  --cpt-form-help-bubble-width: 15em;
  --cpt-form-help-icon-size: 0.8em;
  --cpt-form-help-icon-opacity: 0.75;
  --cpt-form-error-bg: var(--jui-comp-form-error-surface);
  --cpt-form-error-icon: var(--jui-comp-form-error-icon);
  --cpt-form-error-icon-size: 2em;
  --cpt-form-error-text: var(--jui-comp-form-error-text);
  --cpt-form-error-text-size: 1.05em;
  --cpt-form-error-radius: var(--jui-comp-form-error-radius);
  --cpt-form-error-margin-v: var(--jui-space-6);
  --cpt-form-error-margin-h: 1.75em;
  --cpt-form-error-item-gap: var(--jui-space-6);
  --cpt-form-separator: var(--jui-comp-form-separator);
  --cpt-form-separator-gap: var(--jui-space-6);
}
.errors_inner {
  background: var(--cpt-form-error-bg); border-radius: var(--cpt-form-error-radius);
  padding: var(--cpt-form-error-margin-v) var(--cpt-form-error-margin-h); margin-bottom: var(--cpt-form-group-depth0-gap);
}
.errors_inner > div { display: flex; flex-direction: row; align-items: center; gap: var(--cpt-form-error-item-gap); }
.errors_inner p { margin: 0; padding: 0; font-size: var(--cpt-form-error-text-size); color: var(--cpt-form-error-text); font-weight: var(--jui-font-weight-medium); }
.errors_inner jui-icon { flex: none; color: var(--cpt-form-error-icon); font-size: var(--cpt-form-error-icon-size); }
.group { display: flex; flex-direction: column; gap: var(--jui-space-6); }
:host(:not([title]):not([instruction])) .header { display: none; }
h3 {
  margin: 0; display: flex; align-items: center; gap: var(--cpt-form-header-rule-gap);
  font-size: var(--cpt-form-header-depth0-size); font-weight: var(--jui-font-weight-semibold); color: var(--cpt-form-header);
}
h3 jui-icon { margin-right: calc(var(--cpt-form-header-icon-gap) - var(--cpt-form-header-rule-gap)); }
.rule { flex: 1; height: 0; border-top: var(--cpt-form-header-rule-border); }
.header p { margin: 0; color: var(--cpt-form-header-instruction); }
h3 + p { margin-top: var(--jui-space-2); }
.body { display: flex; flex-direction: column; flex-grow: 1; gap: var(--cpt-form-group-depth0-gap); }
.footer p { margin: 0; color: var(--cpt-form-footer-guidance); font-size: var(--cpt-form-footer-guidance-size); }
.bar { display: none; flex-direction: row; align-items: center; gap: var(--jui-space-3); margin-top: var(--jui-space-6); }
:host([data-filled~="bar"]) .bar { display: flex; }
```

## Example

```xml
<jui-control-form title="A simple form" icon="user" instruction="This is a simple form for demonstration purposes." error="There was a problem, please see the messages below.">
  <jui-control-form-row>
    <jui-control-form-cell label="Your first name" required="" grow="" error="please enter your first name">
      <jui-text-control placeholder="Enter your first name" invalid=""/>
    </jui-control-form-cell>
    <jui-control-form-cell label="Your last name" required="" grow="">
      <jui-text-control value="Jones"/>
    </jui-control-form-cell>
  </jui-control-form-row>
  <jui-control-form-row>
    <jui-control-form-cell label="A description of yourself" grow="" guidance="Shown on your public profile.">
      <jui-text-area-control rows="4"/>
    </jui-control-form-cell>
  </jui-control-form-row>
  <jui-control-form-group depth="2" title="Additional information" conditional="check" active="">
    <jui-control-form-row>
      <jui-control-form-cell label="First extra bit of information" grow="">
        <jui-text-control/>
      </jui-control-form-cell>
    </jui-control-form-row>
  </jui-control-form-group>
  <jui-btn slot="bar" label="Submit"/>
  <jui-btn slot="bar" label="Cancel" variant="outlined" nature="grey"/>
</jui-control-form>
```
