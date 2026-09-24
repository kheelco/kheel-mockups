---
name: jui-control-form-group
version: 1.0.0
kind: composed
status: active
summary: ControlForm group layout — a nested section of a form with an optional header, footer, separator and conditional toggle.
---

# ControlForm group (layout)

## Purpose

Represents a nested **group** of a JUI `ControlForm` (`IGroupBuilder`, created with `group(…)`, `group2(…)` or
`group3(…)`): a section of the form with an optional header (icon, title, instruction — `IHeaderBuilder`) and
footer guidance (`IFooterBuilder`) around a body of rows, further groups and other content. Groups nest up to
four levels; each level tightens the heading size and body spacing. A group can be preceded by a separator line,
lay its content out side by side (horizontal), or be **conditional** — opened and closed by a checkbox, or chosen
among sibling groups by radio buttons, in its header. Use it for the sections of a form. Use
`jui-control-form-row` to put fields side by side within a section. It only appears inside `jui-control-form` (or
another group).

## Anatomy

- **Header** — the title as a heading (`h3`, sized by depth) with an optional icon, and instruction text below.
  When conditional, the title becomes the label of a checkbox or radio set in an indent column, and the
  instruction is indented to match.
- **Body** (default slot) — rows, nested groups and other content, stacked with the depth's spacing (or side by
  side when horizontal). Indented when conditional; hidden when a conditional group is closed.
- **Footer** — optional guidance in small muted type.
- **Separator** — optional rule above the group.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| depth | variant | 1, 2, 3, 4 | 1 | Nesting depth (JUI `group` = 1, `group2` = 2, `group3` = 3): heading size and body spacing. |
| title | content | text | | Header title (JUI `header.title(…)`). |
| icon | content | icon | | Header icon (JUI `header.icon(…)`). |
| instruction | content | text | | Header instruction (JUI `header.instruction(…)`). |
| guidance | content | text | | Footer guidance (JUI `footer.guidance(…)`). |
| separator | variant | boolean | | A rule above the group (JUI `separator()`). |
| horizontal | variant | boolean | | Lays the body's items side by side in equal columns (JUI `horizontal()`). |
| indent | variant | boolean | | Shifts the group right, for example to align under a check control's label (JUI `indent(…)`). |
| conditional | variant | check, radio | | Makes the group conditional: a checkbox (single) or radio button (one of a named set of groups) before the title (JUI `conditional(…)`, with `group(name, discriminator)` for radio). |
| active | state | boolean | | A conditional group is open (ticked or selected), showing its body (JUI `cond.active()`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| depth | 1 | Main sections of a form. |
| depth | 2, 3 | Sub-sections and conditional groups, which read better smaller. |
| separator | present | Divide a section from the one before it. |
| horizontal | present | Columns of fields, each column a nested group. |
| conditional | check | An optional section the user opts into. |
| conditional | radio | Mutually exclusive sections (for example user type), one open at a time; give each sibling the same depth. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Condition | unconditional | No `conditional` | Plain header; body shown. |
| Condition | closed | `conditional` without `active` | Empty checkbox or radio; body and footer hidden. |
| Condition | open | `conditional` with `active` | Ticked checkbox or selected radio; body shown, indented. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | | jui-control-form-row, jui-control-form-group | Column with the depth's spacing; equal columns when horizontal | The group body: rows, nested groups and other content (a notice, a paragraph). |

## Behaviour

A conditional group opens when its checkbox is ticked (or its radio selected, which closes its siblings) and
closes when unticked; its open state acts as a value in the form (JUI `value(name)`). Groups can also be shown and
hidden by reference (`by("…")`, then `show` / `hide`), hiding everything in them. Hidden and closed groups'
controls are not validated.

## Content rules

Group titles are short noun phrases (`Personal details`). Instructions are one sentence. For conditional groups
the title is the statement being opted into (`I have some additional information to add`).

## Accessibility

Headings nest with the depth. A conditional group's checkbox or radio is labelled by its title; the group body
follows it in reading order.

## Rules of use

- Nest by one depth at a time; don't jump from 1 to 3 without reason.
- Give every radio conditional group a title; they read as a set of options.
- Prefer a depth of 2 or 3 for conditional groups — full-size headings dominate.

## Tokens

The group reads the `--cpt-form-*` tokens set by `jui-control-form`, with JUI's values as fallbacks.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-form-group-depth1-gap`, `--cpt-form-group-depth2-gap`, `--cpt-form-group-depth3-gap`, `--cpt-form-group-depth4-gap` | inherited | | Body spacing by depth. |
| `--cpt-form-header-depth1-size`, `--cpt-form-header-depth2-size`, `--cpt-form-header-depth3-size`, `--cpt-form-header-depth4-size` | inherited | | Heading size by depth. |
| `--cpt-form-header`, `--cpt-form-header-instruction`, `--cpt-form-header-icon-gap`, `--cpt-form-header-rule-gap`, `--cpt-form-header-rule-border` | inherited | | Heading and instruction colours; icon gap; trailing rule. |
| `--cpt-form-group-indent`, `--cpt-form-row-gap` | inherited | | Conditional indent; space after an open conditional group. |
| `--cpt-form-separator`, `--cpt-form-separator-gap` | inherited | | Separator rule and the space below it. |
| `--cpt-form-footer-guidance`, `--cpt-form-footer-guidance-size` | inherited | | Footer guidance. |
| `--jui-space-2`, `--jui-space-1`, `--jui-space-3`, `--jui-space-4`, `--jui-space-5`, `--jui-space-6`, `--jui-space-12` | semantic | | Group spacing and the fallbacks. |
| `--jui-comp-form-header`, `--jui-comp-form-instruction`, `--jui-comp-form-separator`, `--jui-comp-form-footer` | semantic | | Colour fallbacks. |
| `--jui-font-weight-semibold`, `--jui-font-weight-medium` | semantic | | Heading and conditional label weights. |
| `--jui-role-border-strong`, `--jui-color-aux-white`, `--jui-ctl-active` | semantic | | The conditional checkbox or radio. |

## Template

```html
<div class="group">
  <div class="header">
    <div class="cond" data-if="conditional"><div class="indent"><span class="input"></span></div><label>{{title}}</label></div>
    <h3 data-if="!conditional"><jui-icon data-if="icon" name="{{icon}}"></jui-icon><span>{{title}}</span><div class="rule"></div></h3>
    <p data-if="instruction">{{instruction}}</p>
  </div>
  <div class="body"><slot></slot></div>
  <div class="footer" data-if="guidance"><p>{{guidance}}</p></div>
</div>
```

## Style

```css
:host { display: block; }
:host([indent]) { margin-left: var(--cpt-form-group-indent, var(--jui-space-12)); }
.group { display: flex; flex-direction: column; gap: var(--jui-space-6); }
:host([separator]) .group { border-top: 1px solid var(--cpt-form-separator, var(--jui-comp-form-separator)); padding-top: var(--cpt-form-separator-gap, var(--jui-space-6)); }
:host(:not([title]):not([instruction])) .header { display: none; }
:host(:not([title])) h3 { display: none; }
h3 {
  margin: 0; display: flex; align-items: center; gap: var(--cpt-form-header-rule-gap, var(--jui-space-3));
  font-weight: var(--jui-font-weight-semibold); color: var(--cpt-form-header, var(--jui-comp-form-header));
}
h3 jui-icon { margin-right: calc(var(--cpt-form-header-icon-gap, var(--jui-space-3)) - var(--cpt-form-header-rule-gap, var(--jui-space-3))); }
.rule { flex: 1; height: 0; border-top: var(--cpt-form-header-rule-border, none); }
.header p { margin: 0; color: var(--cpt-form-header-instruction, var(--jui-comp-form-instruction)); }
h3 + p, .cond + p { margin-top: var(--jui-space-2); }
:host([depth="4"]) .header p { margin-top: var(--jui-space-1); }
:host([depth="1"]) h3, :host([depth="1"]) label { font-size: var(--cpt-form-header-depth1-size, 1.3em); }
:host([depth="2"]) h3, :host([depth="2"]) label { font-size: var(--cpt-form-header-depth2-size, 1.1em); }
:host([depth="3"]) h3, :host([depth="3"]) label { font-size: var(--cpt-form-header-depth3-size, 1em); }
:host([depth="4"]) h3, :host([depth="4"]) label { font-size: var(--cpt-form-header-depth4-size, 1em); }
.body { display: flex; flex-direction: column; flex-grow: 1; }
:host([depth="1"]) .body { gap: var(--cpt-form-group-depth1-gap, var(--jui-space-6)); }
:host([depth="2"]) .body { gap: var(--cpt-form-group-depth2-gap, var(--jui-space-6)); }
:host([depth="3"]) .body { gap: var(--cpt-form-group-depth3-gap, var(--jui-space-5)); }
:host([depth="4"]) .body { gap: var(--cpt-form-group-depth4-gap, var(--jui-space-4)); }
:host([horizontal]) .body { flex-direction: row; }
:host([horizontal]) ::slotted(*) { flex-basis: 100%; flex-grow: 1; min-width: 0; }
.footer p { margin: 0; color: var(--cpt-form-footer-guidance, var(--jui-comp-form-footer)); font-size: var(--cpt-form-footer-guidance-size, 0.9em); }
/* Conditional groups. */
.cond { display: flex; align-items: center; }
.indent { display: flex; flex: none; width: var(--cpt-form-group-indent, var(--jui-space-12)); }
label { font-weight: var(--jui-font-weight-medium); color: var(--cpt-form-header, var(--jui-comp-form-header)); cursor: pointer; }
.input {
  display: inline-flex; align-items: center; justify-content: center; width: 1.1em; height: 1.1em; box-sizing: border-box;
  border: 1px solid var(--jui-role-border-strong); border-radius: 3px; background: var(--jui-color-aux-white);
  color: var(--jui-color-aux-white); font-size: 0.9em; font-weight: 600; cursor: pointer;
}
:host([conditional="radio"]) .input { border-radius: 50%; }
:host([conditional="check"][active]) .input { background: var(--jui-ctl-active); border-color: var(--jui-ctl-active); }
:host([conditional="check"][active]) .input::after { content: "\2713"; }
:host([conditional="radio"][active]) .input { border-color: var(--jui-ctl-active); background: radial-gradient(circle, var(--jui-ctl-active) 0 36%, var(--jui-color-aux-white) 40%); }
:host([conditional]) .header p { margin-left: var(--cpt-form-group-indent, var(--jui-space-12)); }
:host([conditional]) .body { margin-left: var(--cpt-form-group-indent, var(--jui-space-12)); margin-bottom: var(--cpt-form-row-gap, var(--jui-space-6)); }
:host([conditional]:not([active])) .body, :host([conditional]:not([active])) .footer { display: none; }
```

## Example

```xml
<jui-control-form>
  <jui-control-form-group title="Personal details" instruction="Only provide details that you are happy others will see." guidance="Preferred name is an informal name that you would like others to use.">
    <jui-control-form-row>
      <jui-control-form-cell label="First name" required="" grow=""><jui-text-control/></jui-control-form-cell>
      <jui-control-form-cell label="Preferred name" grow=""><jui-text-control/></jui-control-form-cell>
    </jui-control-form-row>
  </jui-control-form-group>
  <jui-control-form-group title="This group has a separator" instruction="Separators divide a group from the one before it." separator="" depth="2"/>
  <jui-control-form-group depth="2" horizontal="" separator="">
    <jui-control-form-group depth="3" title="Postal address">
      <jui-control-form-row><jui-control-form-cell label="Street" grow=""><jui-text-control/></jui-control-form-cell></jui-control-form-row>
    </jui-control-form-group>
    <jui-control-form-group depth="3" title="Billing address">
      <jui-control-form-row><jui-control-form-cell label="Street" grow=""><jui-text-control/></jui-control-form-cell></jui-control-form-row>
    </jui-control-form-group>
  </jui-control-form-group>
  <jui-control-form-group depth="2">
    <jui-control-form-group depth="3" conditional="radio" active="" title="Standard user" instruction="A real person who can be invited to access this account.">
      <jui-control-form-row>
        <jui-control-form-cell label="The user's email address" grow=""><jui-text-control/></jui-control-form-cell>
      </jui-control-form-row>
    </jui-control-form-group>
    <jui-control-form-group depth="3" conditional="radio" title="API user" instruction="Allows a third party application to access this account via the API."/>
  </jui-control-form-group>
  <jui-control-form-group depth="3" conditional="check" title="I have some additional information to add"/>
</jui-control-form>
```
