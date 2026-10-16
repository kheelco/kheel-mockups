---
name: mockup-init-jui
description: Set up a mockup project space with a design system of the standard JUI (jui-ui) components, fragments and controls. Use when the user wants to mock up a JUI application.
---

# mockup-init-jui — a mockup project space for JUI applications

Set up a **project space** — a folder of mockups with `design-system/` at its root — whose design system
represents the standard building blocks of [JUI](https://github.com/juiproject/jui-stack)'s `jui-ui` module, styled
with JUI's own tokens. Mockups built from it look like the JUI application they describe, and each component
carries an implementation mapping to its JUI class, so an agent can build the real screens from them.

`<skill>` below means the folder this `SKILL.md` sits in. It carries two templates under `<skill>/assets/`:

| Template | Contents | Copied to |
| --- | --- | --- |
| `viewer/` | `index.html`, `_runtime.js`, `_guide.md` — the viewer and its guide | `<location>/design-system/` |
| `jui/` | `design-system/` (the JUI design system: tokens, components, implementation mappings, icons, behaviours) and `examples/` (example mockups) | `<location>/` |

## What the design system holds

Tags are named after the JUI class they represent: `jui-btn` is the **Btn** fragment, `jui-button` the **Button**
component, `jui-text-control` the **TextControl**, `jui-title-panel` the **TitlePanel**. The manifest
(`design-system/README.md`) lists each with its kind in JUI:

- **components** own their DOM and dispatch their own events;
- **fragments** contribute DOM to the component they are placed in, which handles their events;
- **controls** are components that hold a value, with validation.

`design-system/implementations/jui/<tag>.md` maps each mockup component to its JUI class, creator and methods.
Applications add their own custom and inline components on top; they are added to this design system the same way.

## 1. Get the location and whether to include examples

Ask the user where the project space is, unless they have already said, and resolve it to an absolute path.
Create it if it does not exist; stop if it is a file.

Ask whether to include the example mockups (a projects gallery, a members table and two dialogs), unless the user
has said. If you cannot ask, include them.

## 2. Check what is already there

Read `<location>/design-system/README.md`, if it exists, and decide:

| Found | Do |
| --- | --- |
| No `design-system/README.md` | A new project space: go to step 3. |
| A manifest with `prefix: jui` | Already a JUI project space: go to step 4. |
| A manifest listing no components and with no `tokens.md` beside it (an empty design system, as `mockup-init` creates in empty mode) | Replace that empty manifest with the JUI design system: go to step 3, and in it overwrite `design-system/README.md` only. |
| Any other design system | Stop. Tell the user this folder already has a different design system, and that the JUI design system needs a project space of its own (a new folder, or one initialised empty). Change nothing. |

## 3. Copy the templates

Copy, keeping relative paths and **skipping any file that already exists** (apart from the empty manifest in the
case above) — never move or delete anything:

1. `<skill>/assets/jui/design-system/` into `<location>/design-system/`;
2. `<skill>/assets/jui/examples/` into `<location>/examples/`, if examples were wanted;
3. `<skill>/assets/viewer/` into `<location>/design-system/`.

With a shell, on macOS and Linux:

```
mkdir -p "<location>/design-system"
cp -Rn "<skill>/assets/jui/design-system/." "<location>/design-system/"
cp -Rn "<skill>/assets/jui/examples" "<location>/"          # only if examples are wanted
cp -Rn "<skill>/assets/viewer/." "<location>/design-system/"
```

To replace an empty manifest, copy `<skill>/assets/jui/design-system/README.md` over it with a plain `cp` after the
commands above. GNU `cp` may warn that `-n` is non-portable; the warning is harmless.

Without a shell, copy the files one by one, byte for byte — do not retype or regenerate them.

Then go to step 5.

## 4. Update an existing JUI project space

Some of the design system's files mirror JUI and are kept in step with the template; the rest belong to the
project, which may have changed, added or removed them. Never overwrite anything without the user's agreement.

| Mirrors JUI: compare with the template | Belongs to the project: leave alone |
| --- | --- |
| `components/jui-*.md`, `implementations/jui/jui-*.md` | The project's own components (another prefix) and mappings |
| `tokens.md`, `behaviours.md`, `CHANGELOG.md` | Further token files (such as a theme), `patterns/` |
| The icons in `<skill>/assets/jui/design-system/assets/icons/` (and their licence files) | Icons the project added, and other assets (brand, fonts) |
| | `extensions/`, and the manifest (`README.md`) apart from the rows and icon names below |

Compare each mirrored file in the template with the project's copy, byte for byte (with a shell, `cmp` or
`diff -q`), then:

- **Missing in the project:** add it. For a component or mapping, add its row to the manifest's Components table
  (copy the row from the template's manifest); for an icon, add its name to the manifest's icon list, in
  alphabetical order. Tell the user what was added.
- **Different from the template:** list each with what tells the two apart — a component's `version` (the
  project's and the template's); for `CHANGELOG.md`, the headings of the entries the template has and the
  project's copy lacks; for `tokens.md`, `behaviours.md`, a mapping or an icon, that it differs. Offer to replace
  them, which brings them back in step with JUI, and replace only those the user agrees to. Update a replaced
  component's manifest row to match the template's.
- Replacing never touches `design-system/extensions/`, where the project keeps the looks it added to the `jui-*`
  components, nor any file the project owns. Afterwards, open the catalogue (or run `mockup-create`'s check script
  with `--catalogue`, if installed) and pass on any warning that an extension no longer fits its component.
- For the viewer files (`index.html`, `_runtime.js`, `_guide.md`): copy any that are missing. If they differ from
  the template, tell the user the runtime version they have and the one the template carries (the `VERSION` line
  near the top of `_runtime.js`) and ask before replacing them, together.
- Examples are added only when the user asks and `examples/` does not exist.

## 5. Confirm

Tell the user, briefly:

- the absolute path of the project space and what was added (or that it was already up to date);
- that the design system is local and theirs to change: its manifest is `design-system/README.md`, and
  `design-system/implementations/jui/` says how each component maps to JUI;
- that the `jui-*` components mirror JUI and are best left as they are, so that they can be brought up to date
  from this skill: looks the project needs that JUI doesn't have go in an extension, `design-system/extensions/<tag>.md`,
  which `design-system/_guide.md` describes;
- that mockups can go anywhere in the project space outside `design-system/`, and `design-system/_guide.md`
  explains how to write them;
- how to view them — serve the project space, not `design-system/`:

  ```
  cd <location>
  python3 -m http.server 8000
  ```

  then open <http://localhost:8000/design-system/>. The examples, if included, are in `examples/`.
- how to check them: the viewer prints each problem as a warning (in its bar, and in the browser console prefixed
  `[mockup]`) and marks a finished page with `<html data-mockup="ready">`; the `mockup-create` skill's check script
  (`scripts/mockup-check.mjs`) checks every mockup that way and saves screenshots. Agents should use it rather than
  reading the page's text, which is in shadow DOM and looks empty to a script.

If you can run commands and the user wants you to, you may start the server for them in the background; opening
the page is theirs to do.
