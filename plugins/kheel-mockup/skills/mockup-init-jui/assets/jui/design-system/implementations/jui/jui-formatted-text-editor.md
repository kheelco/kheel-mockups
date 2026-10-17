---
component: jui-formatted-text-editor
component-version: 1
target: jui
---

# jui-formatted-text-editor → JUI

## Maps to

The **FormattedTextEditor** control, `com.effacy.jui.text.ui.editor.FormattedTextEditor` (value type
`com.effacy.jui.text.type.FormattedText`), in the **jui-text** module: add the `com.effacy.jui:jui-text` dependency
and inherit `com.effacy.jui.text.Text` in the application's GWT module. It composes an `Editor` (the editing area)
with an `EditorToolbar` (the tools, `Tools` in the same package). jui-text is marked experimental.

```java
FormattedTextEditor editor = new FormattedTextEditor(new FormattedTextEditor.Config()
    .position(Position.TOP)
    .height(Length.px(200))
    .placeholder("Describe the role")
    .toolbar(new EditorToolbar.Config()
        .tools(Tools.BOLD, Tools.ITALIC, Tools.STRIKETHROUGH,
               Tools.SEPARATOR,
               Tools.BULLET_LIST, Tools.NUMBERED_LIST,
               Tools.SEPARATOR,
               Tools.link(r -> Em.$(r).style(FontAwesome.link()), "Link", MyApp::filterLinks))));
editor.setValue(Value.of(FormattedText.markdown(role.getDescription())));
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| placeholder | `cfg.placeholder(…)` | |
| tools | `cfg.toolbar(new EditorToolbar.Config().tools(…))` | `all` → leave `tools(…)` unset (or `Tools.all()`). `markdown` → `Tools.BOLD, Tools.ITALIC, Tools.STRIKETHROUGH, Tools.SEPARATOR, Tools.BULLET_LIST, Tools.NUMBERED_LIST, Tools.SEPARATOR, Tools.link(…)`, as above; `Tools.link(…)` takes a function from what is typed to the `LinkPanel.AnchorItem`s to offer. |
| position | `cfg.position(Position.…)` | `top` → `TOP` (the default), `top-separate` → `TOP_SEPARATE`, `top-hover` → `TOP_HOVER`, `top-transparent` → `TOP_TRANSPARENT`, `bottom` → `BOTTOM`, `floating` → `FLOATING`. |
| height | `cfg.height(Length.px(…))` | A minimum height for the whole control; default 500px. `cfg.contentMinHeight(…)` instead puts the minimum on the editing area and lets the control size to its content. |
| seamless | `cfg.variant(FormattedTextEditor.Config.Variant.SEAMLESS)` | Also `cfg.noFocus()` alone to drop just the focus ring, or `cfg.borderless()` to show the area's border only on hover. |
| width | `width(Length.em(…))` or `width(Length.px(…))` on the control's config. | |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The value: `editor.setValue(Value.of(text))`, where `text` is a `FormattedText`. Build it from Markdown with `FormattedText.markdown(…)` (and back with `MarkdownSerializer.serialize(text)`), or keep the `FormattedText` itself, which serialises for JUI RPC and persistence. Paragraphs, `h1`–`h5`, lists, quotes and `pre` are its block types (`BlockType.PARA`, `H1`–`H5`, `NLIST`, `OLIST`, `QUOTE`, `CODE`); `strong`, `em`, `u`, `s`, `code`, `mark`, `sub`, `sup` are its formats (`FormatType.BLD`, `ITL`, `UL`, `STR`, `CODE`, `HL`, `SUB`, `SUP`), and `a` a link. |
| toolbar | `new EditorToolbar.Config().tools(…)`: one `ITool` per `jui-editor-tool`, in order (see its mapping). A toolbar placed elsewhere on the page: `cfg.detachedToolbar()` with `cfg.toolbar(() -> toolbar)`, and render `toolbar` where it goes. |

## States

| State | How in JUI |
| --- | --- |
| focus, hover | Handled by the control's stylesheet: it toggles its `focus` style as focus enters or leaves the editor or its toolbar. `cfg.onFocusLost(…)` is told when focus leaves altogether (to save on blur, say). |
| selection | With `Position.FLOATING`, the control shows the toolbar over the selection while a range is selected. |
| empty / filled | Follows the value: `setValue(…)` assigns it without dirtying; `value()` reads it. The placeholder shows while the document is a single empty paragraph. |

## Notes

Label it through a `ControlForm` cell or a `ControlField`. The editor has no read-only or disabled mode; show
content that can't be edited with `FText` (`jui-ftext`). Images pasted or dropped in need `Editor.Config.fileUpload(…)`
(through `cfg.editor(new Editor.Config()…)`), and a click on a link edits it unless `linkInteraction(…)` says
otherwise. Tokens: `--jui-formattededitor-*` on the control, `--jui-toolbar-*` on the toolbar and `--jui-richtext-*`
for the content (set on any ancestor, or through a `ContentStyle` with `Editor.Config.contentStyle(…)`).
