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
| `archive` | `FontAwesome.boxArchive()` (`fa-box-archive`) |
| `arrow-down` | `FontAwesome.arrowDown()` (`fa-arrow-down`) |
| `arrow-left` | `FontAwesome.arrowLeft()` (`fa-arrow-left`) |
| `arrow-right-left` | `FontAwesome.arrowRightArrowLeft()` (`fa-arrow-right-arrow-left`) |
| `arrow-up` | `FontAwesome.arrowUp()` (`fa-arrow-up`) |
| `arrow-up-right` | `FontAwesome.arrowUpRightFromSquare()` (`fa-arrow-up-right-from-square`) — no bare up-right arrow in FontAwesome Free; check the version in use |
| `bell` | `FontAwesome.bell()` (`fa-bell`) |
| `bold` | `FontAwesome.bold()` (`fa-bold`) |
| `book` | `FontAwesome.book()` (`fa-book`) |
| `briefcase` | `FontAwesome.briefcase()` (`fa-briefcase`) |
| `building` | `FontAwesome.building()` (`fa-building`) |
| `building-2` | `FontAwesome.building()` (`fa-building`) — FontAwesome has one building glyph |
| `calendar` | `FontAwesome.calendar()` (`fa-calendar`) |
| `calendar-check` | `FontAwesome.calendarCheck()` (`fa-calendar-check`) |
| `chart-candlestick` | `FontAwesome.chartLine()` (`fa-chart-line`) — no candlestick in FontAwesome Free |
| `chart-pie` | `FontAwesome.chartPie()` (`fa-chart-pie`) |
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
| `circle-user-round` | `FontAwesome.circleUser()` (`fa-circle-user`) |
| `circle-x` | `FontAwesome.circleXmark()` (`fa-circle-xmark`) |
| `clock` | `FontAwesome.clock()` (`fa-clock`) |
| `copy` | `FontAwesome.copy()` (`fa-copy`) |
| `download` | `FontAwesome.download()` (`fa-download`) |
| `ellipsis` | `FontAwesome.ellipsis()` (`fa-ellipsis`) |
| `external-link` | `FontAwesome.arrowUpRightFromSquare()` (`fa-arrow-up-right-from-square`) |
| `eye` | `FontAwesome.eye()` (`fa-eye`) |
| `eye-off` | `FontAwesome.eyeSlash()` (`fa-eye-slash`) |
| `feather` | `FontAwesome.feather()` (`fa-feather`) |
| `file-pen-line` | `FontAwesome.fileSignature()` (`fa-file-signature`) |
| `file-text` | `FontAwesome.fileLines()` (`fa-file-lines`) |
| `filter` | `FontAwesome.filter()` (`fa-filter`) |
| `folder` | `FontAwesome.folder()` (`fa-folder`) |
| `git-branch` | `FontAwesome.codeBranch()` (`fa-code-branch`) |
| `google` | `FontAwesome.google()` (`fa-brands fa-google`) |
| `grip-vertical` | `FontAwesome.gripVertical()` (`fa-grip-vertical`) |
| `hand` | `FontAwesome.hand()` (`fa-hand`) |
| `heading-2` | `FontAwesome.heading()` (`fa-heading`) — no level-specific heading glyph |
| `heading-3` | `FontAwesome.heading()` (`fa-heading`) — no level-specific heading glyph |
| `history` | `FontAwesome.clockRotateLeft()` (`fa-clock-rotate-left`) |
| `hourglass` | `FontAwesome.hourglass()` (`fa-hourglass`) |
| `house` | `FontAwesome.house()` (`fa-house`) |
| `image` | `FontAwesome.image()` (`fa-image`) |
| `inbox` | `FontAwesome.inbox()` (`fa-inbox`) |
| `info` | `FontAwesome.circleInfo()` (`fa-circle-info`) |
| `italic` | `FontAwesome.italic()` (`fa-italic`) |
| `key` | `FontAwesome.key()` (`fa-key`) |
| `key-round` | `FontAwesome.key()` (`fa-key`) — FontAwesome has one key glyph |
| `layout-grid` | `FontAwesome.tableCellsLarge()` (`fa-table-cells-large`) |
| `life-buoy` | `FontAwesome.lifeRing()` (`fa-life-ring`) |
| `link-2` | `FontAwesome.link()` (`fa-link`) |
| `list` | `FontAwesome.list()` (`fa-list`) |
| `list-checks` | `FontAwesome.listCheck()` (`fa-list-check`) |
| `list-ordered` | `FontAwesome.listOl()` (`fa-list-ol`) |
| `loader-circle` | `FontAwesome.spinner()` (`fa-spinner`) |
| `lock` | `FontAwesome.lock()` (`fa-lock`) |
| `lock-open` | `FontAwesome.lockOpen()` (`fa-lock-open`) |
| `log-out` | `FontAwesome.rightFromBracket()` (`fa-right-from-bracket`) |
| `mail` | `FontAwesome.envelope()` (`fa-envelope`) |
| `mail-check` | `FontAwesome.envelopeCircleCheck()` (`fa-envelope-circle-check`) |
| `map-pin` | `FontAwesome.locationDot()` (`fa-location-dot`) |
| `maximize-2` | `FontAwesome.maximize()` (`fa-maximize`) |
| `menu` | `FontAwesome.bars()` (`fa-bars`) |
| `microsoft` | `FontAwesome.microsoft()` (`fa-brands fa-microsoft`) |
| `minus` | `FontAwesome.minus()` (`fa-minus`) |
| `minus-circle` | `FontAwesome.circleMinus()` (`fa-circle-minus`) |
| `paperclip` | `FontAwesome.paperclip()` (`fa-paperclip`) |
| `pencil` | `FontAwesome.pencil()` (`fa-pencil`) |
| `phone` | `FontAwesome.phone()` (`fa-phone`) |
| `pilcrow` | `FontAwesome.paragraph()` (`fa-paragraph`) |
| `plug` | `FontAwesome.plug()` (`fa-plug`) |
| `plus` | `FontAwesome.plus()` (`fa-plus`) |
| `qr-code` | `FontAwesome.qrcode()` (`fa-qrcode`) |
| `refresh-cw` | `FontAwesome.arrowsRotate()` (`fa-arrows-rotate`) |
| `save` | `FontAwesome.floppyDisk()` (`fa-floppy-disk`) |
| `search` | `FontAwesome.magnifyingGlass()` (`fa-magnifying-glass`) |
| `send` | `FontAwesome.paperPlane()` (`fa-paper-plane`) |
| `settings` | `FontAwesome.gear()` (`fa-gear`) |
| `share-2` | `FontAwesome.shareNodes()` (`fa-share-nodes`) |
| `shield` | `FontAwesome.shield()` (`fa-shield`) |
| `shield-check` | `FontAwesome.shieldHalved()` (`fa-shield-halved`) — no shield-with-check in FontAwesome Free |
| `smartphone` | `FontAwesome.mobileScreenButton()` (`fa-mobile-screen-button`) |
| `sparkles` | `FontAwesome.wandMagicSparkles()` (`fa-wand-magic-sparkles`) — no bare sparkles in FontAwesome Free |
| `square-check-big` | `FontAwesome.squareCheck()` (`fa-square-check`) |
| `square-pen` | `FontAwesome.penToSquare()` (`fa-pen-to-square`) |
| `star` | `FontAwesome.star()` (`fa-star`) |
| `strikethrough` | `FontAwesome.strikethrough()` (`fa-strikethrough`) |
| `tag` | `FontAwesome.tag()` (`fa-tag`) |
| `trash-2` | `FontAwesome.trashCan()` (`fa-trash-can`) |
| `triangle-alert` | `FontAwesome.triangleExclamation()` (`fa-triangle-exclamation`) |
| `undo-2` | `FontAwesome.arrowRotateLeft()` (`fa-arrow-rotate-left`) |
| `upload` | `FontAwesome.upload()` (`fa-upload`) |
| `user` | `FontAwesome.user()` (`fa-user`) |
| `user-check` | `FontAwesome.userCheck()` (`fa-user-check`) |
| `user-pen` | `FontAwesome.userPen()` (`fa-user-pen`) |
| `user-plus` | `FontAwesome.userPlus()` (`fa-user-plus`) |
| `user-round` | `FontAwesome.user()` (`fa-user`) |
| `user-star` | `FontAwesome.userTie()` (`fa-user-tie`) — no user-star in FontAwesome |
| `user-x` | `FontAwesome.userXmark()` (`fa-user-xmark`) |
| `users` | `FontAwesome.users()` (`fa-users`) |
| `x` | `FontAwesome.xmark()` (`fa-xmark`) |
| `zoom-in` | `FontAwesome.magnifyingGlassPlus()` (`fa-magnifying-glass-plus`) |

## Notes

An icon with an action is clickable through `.onclick(…)`, dispatched by the enclosing component; for a
clickable icon with a proper target prefer `IconBtn` (`jui-icon-btn`).
