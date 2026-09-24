---
name: JUI
version: 0.1.0
prefix: jui
source: local
---

# JUI design system

Mockup components that represent the standard controls, components and fragments of
[JUI](https://github.com/juiproject/jui-stack)'s `jui-ui` module, styled with JUI's own tokens so that a mockup looks
like the JUI application it describes and can be implemented from directly. Each tag is named after the JUI class
it stands for — `jui-btn` is the Btn fragment, `jui-button` the Button component, `jui-text-control` the
TextControl — and each component's implementation mapping, in `implementations/jui/`, says how to build it.

JUI distinguishes three kinds of building block, shown in the **JUI** column below:

- **Components** own their DOM, have a lifecycle and dispatch their own events.
- **Fragments** are reusable pieces of DOM that contribute to the component they are placed in; that component
  handles their events (see **Fragment events** in the shared behaviours).
- **Controls** are components that hold a value, with dirty detection, validation and focus.

Applications add their own custom and inline components on top of these; add mockup components for them here in
the same way.

This file is the manifest: it lists everything the design system contains. `index.html`, `_runtime.js` and
`_guide.md` in this folder are the viewer and its guide — part of the mockup mechanism, not of the design system.

## Tokens

- [Tokens](tokens.md) — JUI's reference palette, scale, role and component-family tokens.

## Components

| Component | Version | Kind | JUI | Summary |
| --- | --- | --- | --- | --- |
| [jui-avatar-selector-control](components/jui-avatar-selector-control.md) | 1.0.0 | composed | control `AvatarSelectorControl` | AvatarSelectorControl control — shows the current avatar with change and remove actions, and a panel to pick a stock avatar or upload and crop an image. |
| [jui-calendar-control](components/jui-calendar-control.md) | 1.0.0 | composed | control `CalendarControl` | CalendarControl control — a date field that opens a month calendar to pick a date. |
| [jui-check-control](components/jui-check-control.md) | 1.0.0 | composed | control `CheckControl` | CheckControl control — a single checkbox (or toggle slider) with its own label and description, holding a boolean. |
| [jui-file-upload-control](components/jui-file-upload-control.md) | 1.0.0 | composed | control `FileUploadControl` | FileUploadControl control — a drag-and-drop region for uploading files, with the attached files listed beneath it. |
| [jui-multi-check-control](components/jui-multi-check-control.md) | 1.0.0 | elemental | control `MultiCheckControl` | MultiCheckControl control — a compact pill of options, any of which can be switched on, yielding a set of values. |
| [jui-multi-selection-control](components/jui-multi-selection-control.md) | 1.0.0 | composed | control `MultiSelectionControl` | MultiSelectionControl control — a dropdown for picking several values, shown as text or as chips, with a checkbox list menu. |
| [jui-number-control](components/jui-number-control.md) | 1.0.0 | composed | control `NumberControl` | NumberControl control — a numeric input with decrement and increment steppers. |
| [jui-panel-selection-control](components/jui-panel-selection-control.md) | 1.0.0 | elemental | control `PanelSelectionControl` | PanelSelectionControl control — a multi-selection drawn as a grid of selectable tiles. |
| [jui-selection-control](components/jui-selection-control.md) | 1.0.0 | composed | control `SelectionControl` | SelectionControl control — a single-select dropdown over a fixed or store-backed list, with keyword search in its menu. |
| [jui-selection-group-control](components/jui-selection-group-control.md) | 1.0.0 | elemental | control `SelectionGroupControl` | SelectionGroupControl control — a laid-out group of checkbox or radio options, each with a label and optional description. |
| [jui-text-area-control](components/jui-text-area-control.md) | 1.0.0 | composed | control `TextAreaControl` | TextAreaControl control — a multi-line text input with a configurable number of rows and an optional character counter. |
| [jui-text-control](components/jui-text-control.md) | 1.0.0 | composed | control `TextControl` | TextControl control — a single-line text input with optional icons, clear action and the standard control states. |
| [jui-text-search-control](components/jui-text-search-control.md) | 1.0.0 | composed | control `TextSearchControl` | TextSearchControl control — a text input that offers matching values from a list or store as you type. |
| [jui-button](components/jui-button.md) | 1.0.0 | composed | component `Button` | Button component — a stand-alone button component with a label, an icon, a variant and an asynchronous click handler. |
| [jui-card-navigator](components/jui-card-navigator.md) | 1.0.0 | composed | component `CardNavigator` | CardNavigator component — a grid of cards leading to sections, each shown under a breadcrumb back to the grid. |
| [jui-card-navigator-card](components/jui-card-navigator-card.md) | 1.0.0 | elemental | component `CardNavigator card` | CardNavigator card component — one card in a card navigator's top level, with a label and a description. |
| [jui-control-form](components/jui-control-form.md) | 1.0.0 | composed | component `ControlForm` | ControlForm component — a form of labelled controls laid out in groups and rows, with a form-level error block. |
| [jui-empty-notification](components/jui-empty-notification.md) | 1.0.0 | elemental | component `EmptyNotification` | EmptyNotification component — the notice a Gallery or Table shows when it has no records or its store is in error. |
| [jui-gallery](components/jui-gallery.md) | 1.0.0 | composed | component `Gallery` | Gallery component — a store-backed collection of items in a grid or rows, with infinite paging and loading, empty and error states. |
| [jui-info-block](components/jui-info-block.md) | 1.0.0 | elemental | component `InfoBlock` | InfoBlock component — a heading with a subtitle over lines of small icon-and-text facts. |
| [jui-info-block-item](components/jui-info-block-item.md) | 1.0.0 | composed | component `InfoBlock item` | InfoBlock item component — one icon-and-value fact in an info line, optionally a link. |
| [jui-info-block-line](components/jui-info-block-line.md) | 1.0.0 | elemental | component `InfoBlock line` | InfoBlock line component — one row of items in an info block. |
| [jui-modal-dialog](components/jui-modal-dialog.md) | 1.0.0 | composed | component `ModalDialog` | ModalDialog component — the dialog frame with a titled header, a body and a footer of actions. |
| [jui-notification-block](components/jui-notification-block.md) | 1.0.0 | composed | component `NotificationBlock` | NotificationBlock component — an inline notice, success or error message with a coloured side bar. |
| [jui-notification-dialog](components/jui-notification-dialog.md) | 1.0.1 | composed | component `NotificationDialog` | NotificationDialog component — a ready-made confirm, alert, error or save-changes dialog. |
| [jui-notifier](components/jui-notifier.md) | 1.0.0 | elemental | component `Notifier` | Notifier component — a transient toast message in the bottom-left corner of the screen. |
| [jui-panel](components/jui-panel.md) | 1.0.0 | elemental | component `Panel` | Panel component — a plain container that lays out the components added to it. |
| [jui-panel-gallery-item](components/jui-panel-gallery-item.md) | 1.0.0 | composed | component `PanelGalleryItem` | PanelGalleryItem component — the standard gallery item, a bordered panel with an icon or avatar, a title, a subtitle and a menu. |
| [jui-progress-sequence](components/jui-progress-sequence.md) | 1.0.0 | elemental | component `ProgressSequence` | ProgressSequence component — a row of labelled steps joined by a line, showing progress through a multi-step flow. |
| [jui-progress-sequence-step](components/jui-progress-sequence-step.md) | 1.0.0 | composed | component `ProgressSequence step` | ProgressSequence step component — one labelled step of a progress sequence, done, active or pending. |
| [jui-split-panel](components/jui-split-panel.md) | 1.0.0 | elemental | component `SplitPanel` | SplitPanel component — a main content area beside or below a secondary area, such as a toolbar. |
| [jui-tab-navigator](components/jui-tab-navigator.md) | 1.0.0 | elemental | component `TabNavigator` | TabNavigator component — tabs (horizontal or vertical) that switch the page shown in its body. |
| [jui-tab-navigator-tab](components/jui-tab-navigator-tab.md) | 1.0.0 | composed | component `TabNavigator tab` | TabNavigator tab component — one tab of a tab navigator, with a label, an icon, a count and an indicator. |
| [jui-table](components/jui-table.md) | 1.0.0 | composed | component `Table` | Table component — a store-backed data table with declared columns, sorting, row selection, and loading, empty and error states. |
| [jui-table-cell](components/jui-table-cell.md) | 1.0.0 | elemental | component `Table cell` | Table cell component — one cell of a Table row, as drawn by its column's cell renderer. |
| [jui-table-column](components/jui-table-column.md) | 1.0.0 | composed | component `Table column` | Table column component — one column header of a Table, with its title, icon, width and sort indicator. |
| [jui-table-row](components/jui-table-row.md) | 1.0.0 | elemental | component `Table row` | Table row component — one record of a Table, holding its cells and, when the table is selectable, a selection checkbox. |
| [jui-title-panel](components/jui-title-panel.md) | 1.0.0 | composed | component `TitlePanel` | TitlePanel component — a panel with a title bar (icon, title and subtitle) above its content. |
| [jui-tri-split-panel](components/jui-tri-split-panel.md) | 1.0.0 | elemental | component `TriSplitPanel` | TriSplitPanel component — a top bar, a central content area and a bottom bar, stacked. |
| [jui-action-bar-layout](components/jui-action-bar-layout.md) | 1.0.0 | elemental | layout `ActionBarLayout` | ActionBarLayout layout — a horizontal bar of left, centre and right zones, generally holding buttons. |
| [jui-control-form-cell](components/jui-control-form-cell.md) | 1.0.0 | composed | layout `ControlForm cell` | ControlForm cell layout — one control in a form row with its label, help, guidance and error messages. |
| [jui-control-form-group](components/jui-control-form-group.md) | 1.0.0 | composed | layout `ControlForm group` | ControlForm group layout — a nested section of a form with an optional header, footer, separator and conditional toggle. |
| [jui-control-form-row](components/jui-control-form-row.md) | 1.0.0 | elemental | layout `ControlForm row` | ControlForm row layout — lays a form's cells out side by side, top-aligned. |
| [jui-vert-layout](components/jui-vert-layout.md) | 1.0.0 | elemental | layout `VertLayout` | VertLayout layout — children stacked down the page with spacing and an optional separator line between them. |
| [jui-accordion](components/jui-accordion.md) | 1.0.0 | composed | fragment `Accordion` | Accordion fragment — a collapsible section card with a caret, optional icon, title and summary over a body. |
| [jui-avatar](components/jui-avatar.md) | 1.0.0 | composed | fragment `Avatar` | Avatar fragment — a circular picture of a person, from an image, initials or a placeholder icon. |
| [jui-box](components/jui-box.md) | 1.0.0 | elemental | fragment `Box` | Box fragment — a simple flex box that stacks its children in a column or a row with a gap. |
| [jui-btn](components/jui-btn.md) | 1.0.0 | composed | fragment `Btn` | Btn fragment — a lightweight inline button with a label, an icon and a click action. |
| [jui-card](components/jui-card.md) | 1.0.0 | elemental | fragment `Card` | Card fragment — an outlined surface that groups related content, optionally clickable with a hover lift. |
| [jui-card-header](components/jui-card-header.md) | 1.0.0 | composed | fragment `CardHeader` | CardHeader fragment — a card's heading row with a large icon, a title and a subtitle. |
| [jui-choice-selector](components/jui-choice-selector.md) | 1.0.0 | composed | fragment `ChoiceSelector` | ChoiceSelector fragment — a segmented row of options, one of which is chosen. |
| [jui-choice-selector-option](components/jui-choice-selector-option.md) | 1.0.0 | composed | fragment `ChoiceSelector.Option` | ChoiceSelector.Option fragment — one option in a choice selector, with a label, an icon and a tone. |
| [jui-control-field](components/jui-control-field.md) | 1.0.0 | elemental | fragment `ControlField` | ControlField fragment — wraps a control with its label, description and validation messages. |
| [jui-dialog](components/jui-dialog.md) | 1.0.0 | composed | fragment `Dialog` | Dialog fragment — an inline, non-modal dialog panel with a header, contents and a footer of actions. |
| [jui-divider](components/jui-divider.md) | 1.0.0 | elemental | fragment `Divider` | Divider fragment — a horizontal rule separating groups of content. |
| [jui-expander](components/jui-expander.md) | 1.0.0 | elemental | fragment `Expander` | Expander fragment — an invisible spacer that takes up the remaining space in a row. |
| [jui-file-attachment](components/jui-file-attachment.md) | 1.0.0 | composed | fragment `FileAttachment` | FileAttachment fragment — one file listed in a FileUploadControl, with its upload progress, outcome and remove action. |
| [jui-icon](components/jui-icon.md) | 1.0.0 | elemental | fragment `Icon` | Icon fragment — one icon, sized to the text around it. |
| [jui-icon-btn](components/jui-icon-btn.md) | 1.0.0 | composed | fragment `IconBtn` | IconBtn fragment — a round, borderless button showing only an icon. |
| [jui-loading](components/jui-loading.md) | 1.0.0 | elemental | fragment `Loading` | Loading fragment — a pulsing grey placeholder bar shown where content is still loading. |
| [jui-menu](components/jui-menu.md) | 1.0.0 | elemental | fragment `Menu` | Menu fragment — a floating list of menu items with an outlined, shadowed surface. |
| [jui-menu-activator](components/jui-menu-activator.md) | 1.0.0 | composed | fragment `MenuActivator` | MenuActivator fragment — a vertical-ellipsis trigger that opens a menu on hover or click. |
| [jui-menu-item](components/jui-menu-item.md) | 1.0.0 | composed | fragment `MenuItem` | MenuItem fragment — one action in a menu, with an optional icon and a label. |
| [jui-notice](components/jui-notice.md) | 1.0.0 | composed | fragment `Notice` | Notice fragment — an inline callout with an icon and a message, in four tones and three styles. |
| [jui-paper](components/jui-paper.md) | 1.0.0 | elemental | fragment `Paper` | Paper fragment — an unframed content block that gives the headings inside it JUI's heading style. |
| [jui-para](components/jui-para.md) | 1.0.0 | elemental | fragment `Para` | Para fragment — renders a block of plain text as paragraphs, keeping its line breaks. |
| [jui-percentage-gauge](components/jui-percentage-gauge.md) | 1.0.0 | composed | fragment `PercentageGuage` | PercentageGuage fragment — a circular dial filled to a percentage, with the percentage or an icon at its centre. |
| [jui-percentage-line](components/jui-percentage-line.md) | 1.0.0 | elemental | fragment `PercentageLine` | PercentageLine fragment — a compact rounded percentage bar, with an optional label above. |
| [jui-pill](components/jui-pill.md) | 1.0.0 | composed | fragment `Pill` | Pill fragment — a small rounded status or tag label with an optional leading icon. |
| [jui-popup](components/jui-popup.md) | 1.0.0 | composed | fragment `Popup` | Popup fragment — a simple overlay panel over a grey mask, with a close button and a scrolling body. |
| [jui-progress-bar](components/jui-progress-bar.md) | 1.0.0 | elemental | fragment `ProgressBar` | ProgressBar fragment — a bar filled to a percentage, with the percentage and optional commentary. |
| [jui-stack](components/jui-stack.md) | 1.0.0 | elemental | fragment `Stack` | Stack fragment — lays its children out in a column or a row with a gap, alignment and wrapping. |
| [jui-toggle-btn](components/jui-toggle-btn.md) | 1.0.0 | elemental | fragment `ToggleBtn` | ToggleBtn fragment — a small on/off switch with an optional label, toggled by the enclosing component. |
| [jui-typography](components/jui-typography.md) | 1.0.0 | elemental | fragment `Typography` | Typography fragment — applies JUI's Material-style type scale to headings and text. |

## Behaviours

- [Shared behaviours](behaviours.md) — fragment events, control values and validation, store-backed loading.

## Patterns

None yet. Add patterns for arrangements your application repeats — a gallery with its filter bar, a form in a dialog.

## Implementations

- `implementations/jui/` — one mapping per component, from the mockup component to its JUI class.

## Icons

From [Lucide](https://lucide.dev) (ISC licence, see assets/icons/LICENSE-lucide.txt). JUI uses FontAwesome; the
implementation mapping for the icon fragment gives the FontAwesome equivalent of each.

`arrow-down` `arrow-left` `arrow-up` `bell` `briefcase` `calendar` `check` `chevron-down` `chevron-left` `chevron-right` `chevron-up` `chevrons-left` `chevrons-right` `chevrons-up-down` `circle-alert` `circle-check` `circle-dot` `circle-help` `circle-x` `clock` `copy` `download` `ellipsis` `external-link` `eye` `file-text` `filter` `folder` `grip-vertical` `history` `house` `image` `inbox` `info` `layout-grid` `list` `loader-circle` `lock` `log-out` `mail` `map-pin` `maximize-2` `menu` `minus` `minus-circle` `paperclip` `pencil` `phone` `plus` `refresh-cw` `save` `search` `send` `settings` `square-check-big` `star` `tag` `trash-2` `triangle-alert` `upload` `user` `users` `x` `zoom-in`
