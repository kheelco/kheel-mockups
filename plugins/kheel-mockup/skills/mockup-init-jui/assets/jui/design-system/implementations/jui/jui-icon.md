---
component: jui-icon
component-version: 1
target: jui
---

# jui-icon → JUI

## Maps to

The **Icon** fragment, `com.effacy.jui.ui.client.fragments.Icon`, with a FontAwesome icon from
`com.effacy.jui.ui.client.icon.FontAwesome`.

```java
Icon.$(parent, FontAwesome.circleCheck()).color(Color.raw("var(--jui-role-feedback-success)"));
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| name | `Icon.$(parent, FontAwesome.…())` | See the icon names below. |
| size | `.size(Length.px(…))` | `inherit` → leave unset; `small` 12 px, `medium` 16 px, `large` 20 px. |
| tone | `.color(Color.raw("var(--jui-role-…)"))` | `muted` → `--jui-role-text-muted`, `primary` → `--jui-role-interactive-primary`, feedback tones → `--jui-role-feedback-*`. |
| label | `.attr("aria-label", …)` | |

## Icon names

The mockup icons are Lucide glyphs; implement with the FontAwesome equivalent. The method name is the FontAwesome
name in camel case — check it exists in `FontAwesome` for the JUI version in use.

| Mockup icon | FontAwesome |
| --- | --- |
| `arrow-down` | `FontAwesome.arrowDown()` (`fa-arrow-down`) |
| `arrow-left` | `FontAwesome.arrowLeft()` (`fa-arrow-left`) |
| `arrow-up` | `FontAwesome.arrowUp()` (`fa-arrow-up`) |
| `bell` | `FontAwesome.bell()` (`fa-bell`) |
| `briefcase` | `FontAwesome.briefcase()` (`fa-briefcase`) |
| `calendar` | `FontAwesome.calendar()` (`fa-calendar`) |
| `check` | `FontAwesome.check()` (`fa-check`) |
| `chevron-down` | `FontAwesome.chevronDown()` (`fa-chevron-down`) |
| `chevron-left` | `FontAwesome.chevronLeft()` (`fa-chevron-left`) |
| `chevron-right` | `FontAwesome.chevronRight()` (`fa-chevron-right`) |
| `chevron-up` | `FontAwesome.chevronUp()` (`fa-chevron-up`) |
| `chevrons-left` | `FontAwesome.anglesLeft()` (`fa-angles-left`) |
| `chevrons-right` | `FontAwesome.anglesRight()` (`fa-angles-right`) |
| `chevrons-up-down` | `FontAwesome.sort()` (`fa-sort`) |
| `circle-alert` | `FontAwesome.circleExclamation()` (`fa-circle-exclamation`) |
| `circle-check` | `FontAwesome.circleCheck()` (`fa-circle-check`) |
| `circle-dot` | `FontAwesome.circleDot()` (`fa-circle-dot`) |
| `circle-help` | `FontAwesome.circleQuestion()` (`fa-circle-question`) |
| `circle-x` | `FontAwesome.circleXmark()` (`fa-circle-xmark`) |
| `clock` | `FontAwesome.clock()` (`fa-clock`) |
| `copy` | `FontAwesome.copy()` (`fa-copy`) |
| `download` | `FontAwesome.download()` (`fa-download`) |
| `ellipsis` | `FontAwesome.ellipsis()` (`fa-ellipsis`) |
| `external-link` | `FontAwesome.arrowUpRightFromSquare()` (`fa-arrow-up-right-from-square`) |
| `eye` | `FontAwesome.eye()` (`fa-eye`) |
| `file-text` | `FontAwesome.fileLines()` (`fa-file-lines`) |
| `filter` | `FontAwesome.filter()` (`fa-filter`) |
| `folder` | `FontAwesome.folder()` (`fa-folder`) |
| `grip-vertical` | `FontAwesome.gripVertical()` (`fa-grip-vertical`) |
| `history` | `FontAwesome.clockRotateLeft()` (`fa-clock-rotate-left`) |
| `house` | `FontAwesome.house()` (`fa-house`) |
| `image` | `FontAwesome.image()` (`fa-image`) |
| `inbox` | `FontAwesome.inbox()` (`fa-inbox`) |
| `info` | `FontAwesome.circleInfo()` (`fa-circle-info`) |
| `layout-grid` | `FontAwesome.tableCellsLarge()` (`fa-table-cells-large`) |
| `list` | `FontAwesome.list()` (`fa-list`) |
| `loader-circle` | `FontAwesome.spinner()` (`fa-spinner`) |
| `lock` | `FontAwesome.lock()` (`fa-lock`) |
| `log-out` | `FontAwesome.rightFromBracket()` (`fa-right-from-bracket`) |
| `mail` | `FontAwesome.envelope()` (`fa-envelope`) |
| `map-pin` | `FontAwesome.locationDot()` (`fa-location-dot`) |
| `maximize-2` | `FontAwesome.maximize()` (`fa-maximize`) |
| `menu` | `FontAwesome.bars()` (`fa-bars`) |
| `minus` | `FontAwesome.minus()` (`fa-minus`) |
| `minus-circle` | `FontAwesome.circleMinus()` (`fa-circle-minus`) |
| `paperclip` | `FontAwesome.paperclip()` (`fa-paperclip`) |
| `pencil` | `FontAwesome.pencil()` (`fa-pencil`) |
| `phone` | `FontAwesome.phone()` (`fa-phone`) |
| `plus` | `FontAwesome.plus()` (`fa-plus`) |
| `refresh-cw` | `FontAwesome.arrowsRotate()` (`fa-arrows-rotate`) |
| `save` | `FontAwesome.floppyDisk()` (`fa-floppy-disk`) |
| `search` | `FontAwesome.magnifyingGlass()` (`fa-magnifying-glass`) |
| `send` | `FontAwesome.paperPlane()` (`fa-paper-plane`) |
| `settings` | `FontAwesome.gear()` (`fa-gear`) |
| `square-check-big` | `FontAwesome.squareCheck()` (`fa-square-check`) |
| `star` | `FontAwesome.star()` (`fa-star`) |
| `tag` | `FontAwesome.tag()` (`fa-tag`) |
| `trash-2` | `FontAwesome.trashCan()` (`fa-trash-can`) |
| `triangle-alert` | `FontAwesome.triangleExclamation()` (`fa-triangle-exclamation`) |
| `upload` | `FontAwesome.upload()` (`fa-upload`) |
| `user` | `FontAwesome.user()` (`fa-user`) |
| `users` | `FontAwesome.users()` (`fa-users`) |
| `x` | `FontAwesome.xmark()` (`fa-xmark`) |
| `zoom-in` | `FontAwesome.magnifyingGlassPlus()` (`fa-magnifying-glass-plus`) |

## Notes

An icon with an action is clickable through `.onclick(…)`, dispatched by the enclosing component; for a
clickable icon with a proper target prefer `IconBtn` (`jui-icon-btn`).
