# AGENTS.md

Guidance for agents and people working **on** this repository.

## What lives where

- `specs/` — the source of truth for how the mockup mechanism works. Read the relevant specification before
  changing a skill, and update the specification first when behaviour changes.
- `plugins/kheel-mockup/skills/` — the skills that implement the specifications. This is the only part of the
  repository that reaches users' agents.
- `plugins/kheel-mockup/skills/mockup-init-jui/assets/` — the JUI design system (`jui/design-system/`, with
  implementation mappings in `implementations/jui/`), its examples, and a copy of the viewer. Component titles
  read `# <JUI class> (control|component|fragment|layout)`; after adding or re-versioning a JUI component, run
  `scripts/jui-manifest.py` to regenerate its manifest. Check it with `./scripts/init-target.sh --reset --jui
  --serve`.
- Record every change to the JUI design system (a `jui-*` component or its mapping, `tokens.md`, the icons) in
  `mockup-init-jui/assets/jui/design-system/CHANGELOG.md`, saying whether it mirrors JUI or is for jui-stack (and
  then what jui-stack needs), so it can be carried into [jui-stack](https://github.com/juiproject/jui-stack).
- `plugins/kheel-mockup/skills/mockup-init/assets/` — the templates init copies: `viewer/` (`index.html`,
  `_runtime.js`, `_guide.md`), `starter/` (the starter design system and example mockups) and `empty/` (an empty
  manifest). Together they are the reference implementation of the specifications, so a change to a
  specification usually changes something here too. `_guide.md` restates the mockup format for people and agents
  in a project space; keep it in step with `specs/mockups.md`.

- `extensions/vscode/` — the VS Code previewer ([specs/previewing.md](specs/previewing.md)). It is not a skill, so
  the rules for skills don't apply to it, but it carries its own copy of `LICENSE.md`. It holds no copy of the
  viewer: it serves a project space and shows that project space's `design-system/index.html`, so a change to the
  viewer needs no change here unless it changes the addresses or the serving rules in `specs/rendering.md`.

## Checking the starter project space

Run `./scripts/init-target.sh --reset --serve` and open <http://localhost:8000/design-system/>. The catalogue renders every component's `Example` and
lists the examples under `examples/`; the catalogue and every example should show **0 warnings**. After changing the
runtime, click through the examples: a row opens `job.xml`, the delete icon opens a dialog, Escape closes it,
the **empty** tab shows `jobs.empty.xml`, and **Inspect** shows numbered specifications.

When changing the viewer (`_runtime.js`, `index.html`, `_guide.md`), edit it in `mockup-init/assets/viewer/` only,
never in `target/` or another skill, then run `./scripts/sync-viewer.sh` to copy it into the other skills;
`package-skills.sh` refuses to package if the copies differ. Re-running `./scripts/init-target.sh` copies it into
`target/`. Bump its `VERSION` so initialisation can tell an existing project space
that a newer viewer is available.

## Checking in a browser

The viewer prints every warning to the browser console prefixed `[mockup]`, sets `<html data-mockup="ready">` when a
page is rendered and lists its warnings in `window.mockup.warnings`, so a check can be scripted. `mockup-create`
carries the script: `node plugins/kheel-mockup/skills/mockup-create/scripts/mockup-check.mjs --root target
--catalogue --shots <scratch>` checks the catalogue and every mockup in one browser (it serves the project space
itself), prints the warnings and exits non-zero on any; the target is zero. It needs Playwright (installed
globally in cloud sessions). Look at the screenshots: warnings check structure, not appearance. The mockups render
in shadow DOM, so the page's text looks empty to a script; don't judge a page by it.

- `init-target.sh --reset` deletes and recreates `target/`, so a server started inside it must be restarted.
- Interactions can be exercised from script: click a component's part in its shadow root
  (`el.shadowRoot.querySelector('.trigger').click()`) and read its `state` attribute back.

## Checking the previewer

In `extensions/vscode/`, run `npm test` (the server and finding the project space) and `npm run check`. Then press
F5 in VS Code with that folder open, which opens `target/` (fill it with `./scripts/init-target.sh`) in an
Extension Development Host: open `examples/jobs.xml`, click the preview icon in the editor's title bar, and check
that the mockup shows; that switching to another example moves the preview; that saving a mockup or a
design-system file reloads it; and that **Mockups: Open Catalogue** lists the examples. Build the package with
`./scripts/package-extension.sh`.

## Versions and releases

The project has one version, in `VERSION`, carried by `plugin.json` and the extension's `package.json`. Set it
only with `./scripts/set-version.sh X.Y.Z`; `scripts/check-version.sh` (run by the *Release* workflow on every
pull request) fails if the files disagree. A version reaching `main` without a `version/X.Y.Z` tag is released
automatically (README.md, *Releasing*), so set a new version, with a `## X.Y.Z` section in `CHANGELOG.md`, only
when the work should be released; leave it alone otherwise. Record what each change does for users in
`CHANGELOG.md` under the next version as you go. Never create `version/*` tags or releases by hand.

## Rules for skills

Skills are installed on their own (as a Claude Code plugin, as uploaded zips, or copied into another agent's
skills folder), so each skill folder must stand alone:

- **Never reference `specs/`**, the repository README, or anything outside the skill's own folder. If a skill
  needs a rule from a specification, restate it in the skill.
- Files a skill needs (templates, assets, scripts) live inside that skill's folder and are referred to relative
  to its `SKILL.md`.
- The folder name and the `name` in the frontmatter are the same: lowercase, hyphenated, prefixed `mockup-` so
  they don't clash when installed alongside other skills.
- Frontmatter holds only `name` and `description`. Keep `description` to **200 characters or fewer** — the
  Claude app's upload limit — and make it say both what the skill does and when to use it.
- Write instructions that any agent with file access can follow; don't depend on tools specific to one agent.
- Every skill folder carries `LICENSE.md`, an exact copy of the one at the repository root, so the licence
  travels with the skill. Copy it into a new skill; `package-skills.sh` refuses to package if a copy is missing
  or differs.

## Adding a skill

1. Write or extend the specification in `specs/`.
2. Create `plugins/kheel-mockup/skills/mockup-<name>/SKILL.md` (plus any assets), and copy the root
   `LICENSE.md` into it.
3. Add it to the skill tables in `README.md` and `plugins/kheel-mockup/README.md`.
4. Add it to `CHANGELOG.md` under the next version (see *Versions and releases*).
5. Run `./scripts/package-skills.sh` to check it packages and passes the frontmatter checks.
