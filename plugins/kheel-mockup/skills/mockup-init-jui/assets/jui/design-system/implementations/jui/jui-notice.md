---
component: jui-notice
component-version: 1
target: jui
---

# jui-notice → JUI

## Maps to

The **Notice** fragment, `com.effacy.jui.ui.client.fragments.Notice` (`Notice.NoticeFragment`), with messages
built by `NoticeBuilder`.

```java
Notice.$(parent)
    .variant(Notice.Variant.WARNING)
    .style(Notice.Style.STANDARD)
    .bold("Unsaved changes")
    .message("Save before leaving this page or your edits will be lost.");

// A danger notice listing errors:
Notice.errorAsString(parent, "Two fields need attention:", List.of("Name is required.", "Email is not a valid address."));
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| message | `.message(String)` | Each call adds a paragraph (`p`), in call order. |
| bold | `.bold(String)` | A paragraph in `strong`. The mockup always shows it first; call it first. |
| italic | `.italic(String)` | A paragraph in `em`. |
| icon | `.icon(FontAwesome.…())` | See the `jui-icon` mapping. |
| no-icon | `.icon(false)` | |
| notice-style | `.style(Notice.Style.…)` | `STANDARD`, `BORDER`, `INLINE`. |
| variant | `.variant(Notice.Variant.…)` | `STANDARD`, `DANGER`, `WARNING`, `SUCCESS`. |
| size | `.size(Length.em(…))` | `small` 0.85 em, `medium` leave unset, `large` 1.15 em. |
| content-aligned | `.contentAligned()` | |

## Slots

| Slot | Maps to |
| --- | --- |
| default | Children passed to `.$(…)`; below the message, or in the message column with `.contentAligned()`. A bulleted list is better built with `.build(n -> n.block().list().add(…))`. |

## States

None.

## Notes

Default icons differ: JUI uses `Notice.ICON_STANDARD` (flag), `ICON_DANGER` (bug), `ICON_WARNING` (warning) and
`ICON_SUCCESS` (circle-check); the mockup's icon set has no flag or bug, so it shows `info` and `circle-alert` for
the first two. Use the JUI defaults in the implementation unless the mockup sets `icon`. JUI's CSS variables are
`--juiNotice-border`, `-border-width`, `-border-radius`, `-text`, `-text-padding` and `-bg`; the mockup's
`--frag-notice-*` tokens correspond. `.width(Length)` sets a width; in the mockup use layout attributes.
