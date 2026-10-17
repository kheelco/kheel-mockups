---
component: jui-ftext
component-version: 1
target: jui
---

# jui-ftext → JUI

## Maps to

The **FText** fragment, `com.effacy.jui.text.ui.fragment.FText`, in the jui-text module (add the
`com.effacy.jui:jui-text` dependency and inherit `com.effacy.jui.text.Text`). It renders a `FormattedText` read-only
with the same renderer and `richtext` stylesheet as the editor.

```java
FText.$(parent, FormattedText.markdown(role.getDescription()))
    .contentStyle(ContentStyle.document());
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| content-style | `.contentStyle(ContentStyle.…)` | `compact` → `ContentStyle.compact()` (the default), `document` → `ContentStyle.document()`. A `ContentStyle` can also set any `--jui-richtext-*` token (`token(…)`, `lineHeight(…)` and the like). |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The `text` argument, a `FormattedText`: from Markdown with `FormattedText.markdown(…)`, or as stored. See `jui-formatted-text-editor` for how its blocks and formats correspond to the mockup's HTML. |

## States

| State | How in JUI |
| --- | --- |
| empty / filled | Follows the text. |

## Notes

`.topHeadingLevel(n)` renders the first heading at level `n` and shifts the rest to match, to fit the page's own
headings. `.linkHandler(…)` decides what a click on a link does (the default opens external links in a new tab and
scrolls to `#anchors`). `.skipStyle()` leaves the styling to the caller.
