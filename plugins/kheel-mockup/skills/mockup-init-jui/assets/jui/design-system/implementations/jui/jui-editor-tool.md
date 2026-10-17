---
component: jui-editor-tool
component-version: 1
target: jui
---

# jui-editor-tool → JUI

## Maps to

An **ITool**, `com.effacy.jui.text.ui.editor.ITool`, in the jui-text module: one entry in
`EditorToolbar.Config.tools(…)`, the toolbar of a `FormattedTextEditor` (`jui-formatted-text-editor`). Use the
constants and factories on `com.effacy.jui.text.ui.editor.Tools`; the toolbar renders each tool and keeps its applied
state up to date.

```java
new EditorToolbar.Config().tools(
    Tools.BOLD, Tools.ITALIC, Tools.SEPARATOR,
    Tools.H2, Tools.H3, Tools.SEPARATOR,
    Tools.variable("{}", "Variable", MyApp::filterVariables))
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| icon, label | the tool | By icon: `bold` → `Tools.BOLD`, `italic` → `ITALIC`, `underline` → `UNDERLINE`, `strikethrough` → `STRIKETHROUGH`, `subscript` → `SUBSCRIPT`, `superscript` → `SUPERSCRIPT`, `code` → `CODE`, `highlighter` → `HIGHLIGHT`, `pilcrow` → `PARAGRAPH`, `list` → `BULLET_LIST`, `list-ordered` → `NUMBERED_LIST`, `text-quote` → `QUOTE`, `table` → `TABLE`, `sigma` → `EQUATION`, `workflow` → `DIAGRAM`, `link-2` → `Tools.link(…)`, `image` → `Tools.image(…)`. By label: `H1`–`H5` → `Tools.H1`–`H5`, `{}` → `Tools.variable(…)`. Anything else is a tool of the application's own: `Tools.format(…)`, `block(…)`, `toggleBlock(…)`, `action(…)` or `fence(…)` with the icon (see `jui-icon` for its FontAwesome name) or label as its content. |
| tooltip | the tooltip argument | The standard tools carry their own (`Bold (Ctrl+B)`). |
| active | — | Kept by the toolbar from where the caret is; nothing to set. |
| separator | `Tools.SEPARATOR` | |

## Slots

None.

## States

| State | How in JUI |
| --- | --- |
| hover | The toolbar's stylesheet. |
| active | The tool's handle adds the toolbar's `tbtnActive` style while its format applies at the caret (or its block type is the current one). |

## Notes

Tokens: `--jui-toolbar-*`, set on the `EditorToolbar`; a different look altogether is
`EditorToolbar.Config.style(Style.create(…))` with a stylesheet of its own.
