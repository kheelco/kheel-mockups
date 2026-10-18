# Changelog

Each release of kheel-mockups, newest first. The release workflow uses a version's section as its release notes
(see [README.md](README.md#releasing)).

## 0.15.0

- **An action link in a selector.** `jui-selection-control` (1.2.0) takes an `action` slot: the action link JUI
  shows at the foot of a selector's menu, below a rule, for an act on the list such as `+ Add customer`. Bring it in
  with `mockup-init-jui`'s update.
- **Side-panel dialogs.** A dialog mockup takes `placement="right"` to be drawn as a side panel: against the
  window's right edge at its full height, over the scrim, at its `width`, whether opened from another mockup or
  shown on its own. The viewer (0.11.0) warns about any other value, or about `placement` on a page or section. In
  the JUI design system a `slider` `jui-modal-dialog` (1.2.0) is drawn this way, its content filling the panel. Bring the viewer in with
  `mockup-init`'s or `mockup-init-jui`'s update.
- **JUI tables and galleries scroll within the screen.** `jui-table` and `jui-gallery` (1.2.0) page by
  infinite scrolling, as in JUI, which only works when their height is bounded: unbounded, JUI loads every page of
  the store at once. They now take the height of their container, or with `grow` the height left in a column, and
  scroll within it under a fixed header. They also gain a fixed `height` and `scrollable="false"`.
  `jui-tab-navigator` (2.0.0) gains `root`, to fill the window, and fits the active tab's content to its body, and
  `jui-title-panel` (2.0.0) passes its height on to its content; both are major versions because a long title
  panel in a tab navigator is now cut to the body unless `scrollable`, as in JUI. The JUI design system's version
  moves to 0.2.0. The examples show the arrangement. Bring them in
  with `mockup-init-jui`'s update.
- **A rich text editor in the JUI design system.** `jui-formatted-text-editor` represents jui-text's
  `FormattedTextEditor`: an editing area with a toolbar, whose tools come from a preset (`all`, JUI's default set,
  or `markdown`: bold, italic, strikethrough, the two lists and link) or from the `toolbar` slot, one
  `jui-editor-tool` each. It shows JUI's toolbar positions (above, apart, on focus, below, floating over a
  selection) and its seamless variant. `jui-ftext` represents the `FText` fragment, which shows formatted text
  read-only in compact or document spacing. The content of both is plain HTML (`p`, headings, lists, quotes, code,
  links). These are the first components from jui-text rather than jui-ui; the mappings say how to add the module.
  Nine icons were added for the editor's tools. Bring them in with `mockup-init-jui`'s update.

## 0.14.0

- **Floating dropdown menus in the JUI design system.** `jui-selection-control`, `jui-multi-selection-control`,
  `jui-calendar-control` and `jui-text-search-control` (1.1.1) float their open menu over the page beneath the
  control, at least as wide as it, as JUI does, instead of drawing it in the flow: opening one in a toolbar no
  longer makes the toolbar taller or moves the other controls. Bring them in with `mockup-init-jui`'s update.
- **A "done" signal in the viewer** (runtime 0.10.0). When a page has rendered — includes, components, icons and
  link checks all finished — the viewer sets `<html data-mockup="ready">` and lists its warnings in
  `window.mockup.warnings`, beside the `[mockup]` console lines, so a script can check mockups without fixed
  waits ([specs/rendering.md](specs/rendering.md#checking-from-a-script)). Update the viewer with `mockup-init`.
- **A check script in `mockup-create`**, `scripts/mockup-check.mjs`: serves the project space (or uses a given
  address), opens every mockup in one Playwright browser, waits for the done signal, prints each mockup's warnings,
  saves screenshots and exits non-zero on any warning. It gives the viewer the design system as one in-memory
  `_bundle.json`, so a page load is a handful of requests rather than a hundred. `mockup-create`'s *Check* step,
  its checklist, `mockup-explore`'s check and the initialisation skills' confirmation now point to it, and warn
  that a rendered mockup's text is in shadow DOM, so it looks empty to a script.
- **`mockup-init-jui` updates the whole JUI part of a design system.** Its update step now compares `tokens.md`,
  `behaviours.md`, `CHANGELOG.md` and the template's icons with the project's copies, as well as the `jui-*`
  components and mappings: it adds what is missing (with manifest rows and icon names) and offers to replace what
  differs, never touching the project's own files or `extensions/`
  ([specs/project-space.md](specs/project-space.md#the-jui-design-system)).
- **Components may be grouped in folders.** A design system's components may sit one folder down in
  `components/` (`components/<group>/<tag>.md`), found through the manifest's links; tags stay unique across
  folders, and the viewer warns about a tag listed twice. The JUI design system's components are now in
  `components/jui/`, and `mockup-init-jui`'s update offers to move an existing project's there; a project's own
  components stay directly in `components/` ([specs/components.md](specs/components.md#file)).
- **Shared page frames through includes.** `mockup-create` (and the format, [specs/mockups.md](specs/mockups.md#includes))
  now suggest putting a frame several pages share — an app shell's header, a side navigation — in `<include>`d
  sections rather than copying it into each page or generating pages by script.

## 0.13.0

- **Kheel Mockup Preview**, a VS Code extension that shows a mockup beside the editor and reloads it as files in
  the project space change, whether saved in the editor or written by an agent. It serves the project space itself
  and shows the project space's own viewer ([specs/previewing.md](specs/previewing.md)).
- One version for the whole project, in `VERSION`, released as a GitHub release carrying the skill zips and the
  extension.
