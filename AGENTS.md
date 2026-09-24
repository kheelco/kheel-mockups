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
- `plugins/kheel-mockup/skills/mockup-init/assets/` — the templates init copies: `viewer/` (`index.html`,
  `_runtime.js`, `_guide.md`), `starter/` (the starter design system and example mockups) and `empty/` (an empty
  manifest). Together they are the reference implementation of the specifications, so a change to a
  specification usually changes something here too. `_guide.md` restates the mockup format for people and agents
  in a project space; keep it in step with `specs/mockups.md`.

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
4. Bump `version` in `plugins/kheel-mockup/.claude-plugin/plugin.json`.
5. Run `./scripts/package-skills.sh` to check it packages and passes the frontmatter checks.
