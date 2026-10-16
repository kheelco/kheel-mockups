# Changelog

Each release of kheel-mockups, newest first. The release workflow uses a version's section as its release notes
(see [README.md](README.md#releasing)).

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
- **Shared page frames through includes.** `mockup-create` (and the format, [specs/mockups.md](specs/mockups.md#includes))
  now suggest putting a frame several pages share — an app shell's header, a side navigation — in `<include>`d
  sections rather than copying it into each page or generating pages by script.

## 0.13.0

- **Kheel Mockup Preview**, a VS Code extension that shows a mockup beside the editor and reloads it as files in
  the project space change, whether saved in the editor or written by an agent. It serves the project space itself
  and shows the project space's own viewer ([specs/previewing.md](specs/previewing.md)).
- One version for the whole project, in `VERSION`, released as a GitHub release carrying the skill zips and the
  extension.
