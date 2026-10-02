# Changelog

Changes to the JUI design system: its `jui-*` components, their implementation mappings, its tokens and its
icons. The design system mirrors [JUI](https://github.com/juiproject/jui-stack), and sometimes gets ahead of it,
standardising something in the mockups before JUI has it. Each entry says which it is:

- **Mirrors JUI** — the design system now matches what JUI already does. Nothing to do in jui-stack.
- **For jui-stack** — the design system does something JUI doesn't (yet). The entry says what jui-stack needs;
  until it has it, the component's implementation mapping says how to get the same result in an application.

Newest first. When jui-stack picks an entry up, note it under the entry (`Done in jui-stack <version>`) rather than
removing it.

## Unreleased

### Empty slot takes any content — Mirrors JUI

`jui-table` 1.1.0 and `jui-gallery` 1.1.0: the `empty` slot accepts any content, not only `jui-empty-notification`.
JUI's `emptyUnfiltered`, `emptyFiltered` and `emptyError` renderers build whatever the application puts in the
element, so an application can use its own empty-state design.

### Card navigator header slot — Mirrors JUI

`jui-card-navigator` 1.1.0: an optional `header` slot replaces the standard header (crumb trail, back button and
title) with the application's own top, at the top level and for an open card. JUI allows the same by subclassing
`CardNavigator` and overriding `buildBreadcrumb(…)`; the mapping says how.

### Interactions — Mirrors JUI

Components can now carry an `Interactions` table the viewer (0.9.0) acts out, so mockups respond as JUI does
without any script. These describe behaviour JUI already has (patch versions):

- `jui-menu-activator`: with `click-to-activate`, the dots open and close the menu; choosing an item, clicking
  elsewhere or Escape closes it.
- `jui-choice-selector-option`: clicking an enabled option chooses it.
- `jui-check-control`: clicking ticks or unticks it, unless disabled or read-only.
- `jui-toggle-btn`: clicking switches it.
- `jui-avatar-selector-control`: *Change* opens and closes the panel; choosing a stock avatar closes it.

### Heading typeface — Mirrors JUI

JUI sets every `h1`–`h6` in `--jui-font-family-heading` (`Theme.Component.css`), but the mockup components draw their
headings inside their own shadow DOM, where that page-wide rule doesn't reach, so a heading typeface different from
the body's never showed in a mockup.

- The headings of `jui-card-navigator`, `jui-card-navigator-card`, `jui-dialog`, `jui-empty-notification`,
  `jui-info-block`, `jui-modal-dialog`, `jui-notification-block`, `jui-panel-gallery-item` and `jui-title-panel` use
  `--jui-font-family-heading` (patch versions).
- `jui-tab-navigator-tab`: tabs and group headings use `--cpt-tabbedpanel-font-family`, the heading family, as JUI's
  `TabNavigator`.
- `jui-control-form` and `jui-control-form-group`: section headings use `--cpt-form-header-font-family`, `inherit` by
  default, as JUI's `ControlForm`; so they stay in the body's typeface unless that token is set.

### Menu activator shape — Mirrors JUI

`jui-menu-activator` 1.0.1: the hover and open background is a circle, as in JUI, not an oval. JUI's trigger is
FontAwesome's `ellipsisV` glyph, about 0.25em wide, so its `6px 11px` padding makes a near-square box that the 30px
radius rounds into a circle; the mockup's rotated Lucide `ellipsis` took a full 1em of width. The trigger is now laid
out 0.25em wide, as JUI's glyph.

### Control label size: `--jui-comp-control-label-size` — For jui-stack

A control's own option label (not the field label from a form cell) was sized differently by each control: the
check control at `1rem` (`--cpt-checkctl-size`), the toggle at `0.95em`, and the multi-check control's inline label
and the selection group's option labels by inheriting the surrounding text. Side by side in a form they could
differ, and changing the application's base or body text size moved them apart.

- New control-family token `--jui-comp-control-label-size` in `tokens.md`, default `--jui-font-size-md`.
- `jui-check-control` 1.1.0: `--cpt-checkctl-size` defaults to it (was `--jui-font-size-md`, so no visible change).
- `jui-multi-check-control` 1.1.0: new `--jui-multicheckctl-label-size` for the inline label, defaulting to it.
- `jui-toggle-btn` 1.1.0: `--jui-toggle-btn-label-size` defaults to it (was `0.95em`).
- `jui-selection-group-control` 1.1.0: new `--jui-selectiongroup-label-size` for the option labels, defaulting to it.

jui-stack needs: `--jui-comp-control-label-size` in `Theme.Component.css` (control family); `CheckControl.css`
`--cpt-checkctl-size` falling back to it; a label-size token for `MultiCheckControl`'s label and for
`SelectionGroupControl`'s option labels, falling back to it; `FragmentStyles.css` `--juiToggleBtn-label-size`
falling back to it.

### Dialog forms: `jui-control-form` `variant="dialog"` — Mirrors JUI

`jui-control-form` 1.1.0: `variant="dialog"` is the form as `ControlFormCreator.createForDialog()` builds it
(`DIALOG_CONFIG`: `COMPACT`, `startingDepth(1)`, `padding(Insets.em(2.5, 2))` — 2em top and bottom, 2.5em at the
sides). Mockups had drawn every form as a page form.

### Dialog body padding — Mirrors JUI

- `jui-modal-dialog` 1.1.0: no body padding by default, as JUI's `ModalDialog.Config.padding(…)` (was 1em); padding
  step `5` added.
- `jui-notification-dialog` 1.0.2: pads its content by 20px, as `NotificationDialog` does (`.padding(Length.px(20))`).

### Control widths — Mirrors JUI

`width` (a CSS length, JUI `width(Length)` on the control's config) on `jui-text-control`, `jui-text-area-control`,
`jui-number-control`, `jui-selection-control`, `jui-multi-selection-control`, `jui-calendar-control` and
`jui-text-search-control` (1.1.0).

### Full-width buttons — Mirrors JUI

`jui-btn` 1.0.1: fills its width with `width="full"` or `grow`, as the fragment's button does with
`.css("width: 100%")`.

### Icons — Mirrors JUI

45 Lucide icons and the Google and Microsoft logos (Remix Icon) added, each with its FontAwesome equivalent in the
`jui-icon` mapping (checked against JUI 0.4.0's `FontAwesome`).
