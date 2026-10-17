---
name: jui-editor-tool
version: 1.0.0
kind: elemental
status: active
summary: ITool fragment — one button (or separator) in the formatted text editor's toolbar, shown applied while its format or block type is active.
---

# ITool (fragment)

## Purpose

Represents one **tool** in the toolbar of `jui-formatted-text-editor` (JUI's `ITool`, made by the factories and
constants on `Tools` in jui-text): a format such as bold, a block type such as a heading or a list, an insert such
as a table, a picker such as a link, or a separator between groups. Place tools in the editor's `toolbar` slot to
give it a toolbar of your own; the editor's `tools` presets are made of the same tools.

## Anatomy

A borderless button holding an icon or a short text label (`H1`, `{}`), which takes a tinted background on hover and
a blue one while applied. A separator is a short vertical rule.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| icon | content | icon | | The tool's icon. The standard tools use `bold`, `italic`, `underline`, `strikethrough`, `subscript`, `superscript`, `code`, `highlighter`, `pilcrow`, `list`, `list-ordered`, `text-quote`, `table`, `sigma`, `workflow`, `link-2`, `image`. |
| label | content | text | | A text label in place of an icon: `H1`–`H5` for the headings, `{}` for variables. |
| tooltip | content | text | | The button's tooltip, such as `Bold (Ctrl+B)`. |
| active | state | boolean | | Applied: the format is on, or the block type is the current one, where the caret is. |
| separator | variant | boolean | | A separator between groups of tools instead of a button. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| separator | present | Between groups of related tools: inline formats, block types, lists, inserts. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | No background. |
| Interaction | hover | `:hover` | Light grey background. |
| Selection | inactive | Default | Grey icon or label. |
| Selection | active | `active` property | Light blue background, blue icon or label. |

## Interactions

Clicking a tool switches it, as the editor does when it applies or removes the format.

| Trigger | Target | When | Effect | Value |
| --- | --- | --- | --- | --- |
| click | `.tbtn` | !separator | toggle | active |

## Behaviour

In JUI a tool acts on mousedown, so the editor keeps its selection: a format tool toggles its format over the
selection (or for the text about to be typed), a block tool changes the current block's type, an insert tool inserts
its block at the caret, and a picker tool opens its panel (links, images, variables) beside the button. The toolbar
keeps each tool's applied state in step with the caret as it moves.

## Content rules

Prefer an icon; use a text label only where JUI does (headings, variables). Give every tool a tooltip naming it, with
its keyboard shortcut where it has one.

## Accessibility

A real `button` with its tooltip as its title. An icon-only tool relies on the tooltip for its name.

## Rules of use

- Use inside the `toolbar` slot of `jui-formatted-text-editor`, not on its own.
- Group related tools and put a separator between the groups.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-toolbar-btn-color` | component | `#444` | Icon and label colour. |
| `--jui-toolbar-btn-size` | component | `0.85em` | Label size. |
| `--jui-toolbar-btn-lineheight` | component | `1.4` | Button line height. |
| `--jui-toolbar-btn-padding` | component | `4px 8px` | Button padding. |
| `--jui-toolbar-btn-border-radius` | component | `4px` | Button corner radius. |
| `--jui-toolbar-btn-hover-bg` | component | `#e8e8e8` | Background on hover. |
| `--jui-toolbar-btn-active-bg` | component | `#dbeafe` | Background while applied. |
| `--jui-toolbar-btn-active-color` | component | `#1d4ed8` | Icon and label colour while applied. |
| `--jui-toolbar-sep-color` | component | `#ccc` | Separator colour. |
| `--frag-icon-size` | component | `1.35em` | Sets the icon's size, so that it matches JUI's FontAwesome glyph beside the labels. |

## Template

```html
<span class="sep" data-if="separator"></span>
<button class="tbtn" type="button" title="{{tooltip}}" data-if="!separator">
  <jui-icon data-if="icon" name="{{icon}}"></jui-icon>
  <span class="label" data-if="label">{{label}}</span>
</button>
```

## Style

```css
:host {
  display: inline-flex; align-items: center;
  --jui-toolbar-btn-color: #444;
  --jui-toolbar-btn-size: 0.85em;
  --jui-toolbar-btn-lineheight: 1.4;
  --jui-toolbar-btn-padding: 4px 8px;
  --jui-toolbar-btn-border-radius: 4px;
  --jui-toolbar-btn-hover-bg: #e8e8e8;
  --jui-toolbar-btn-active-bg: #dbeafe;
  --jui-toolbar-btn-active-color: #1d4ed8;
  --jui-toolbar-sep-color: #ccc;
}
.tbtn {
  display: inline-flex; align-items: center; justify-content: center; min-height: 2em;
  border: none; background: none; cursor: pointer; font: inherit;
  padding: var(--jui-toolbar-btn-padding); border-radius: var(--jui-toolbar-btn-border-radius);
  font-size: var(--jui-toolbar-btn-size); font-weight: 500; line-height: var(--jui-toolbar-btn-lineheight);
  color: var(--jui-toolbar-btn-color);
}
jui-icon { --frag-icon-size: 1.35em; }
.tbtn:hover, :host([state~="hover"]) .tbtn { background: var(--jui-toolbar-btn-hover-bg); }
:host([active]) .tbtn, :host([state~="active"]) .tbtn { background: var(--jui-toolbar-btn-active-bg); color: var(--jui-toolbar-btn-active-color); }
.sep { display: block; width: 1px; height: 1.2em; margin: 0 4px; background: var(--jui-toolbar-sep-color); }
```

## Example

```xml
<div layout="row" gap="1" align="center">
  <jui-editor-tool icon="bold" tooltip="Bold (Ctrl+B)" active=""/>
  <jui-editor-tool icon="italic" tooltip="Italic (Ctrl+I)"/>
  <jui-editor-tool icon="underline" tooltip="Underline (Ctrl+U)" state="hover"/>
  <jui-editor-tool separator=""/>
  <jui-editor-tool label="H1" tooltip="Heading 1"/>
  <jui-editor-tool label="H2" tooltip="Heading 2" active=""/>
  <jui-editor-tool icon="pilcrow" tooltip="Paragraph"/>
  <jui-editor-tool separator=""/>
  <jui-editor-tool icon="link-2" tooltip="Link"/>
  <jui-editor-tool label="{}" tooltip="Variable"/>
</div>
```
