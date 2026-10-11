# kheel-mockups

Skills that let an AI agent — Claude, Codex and others that read `SKILL.md` — create and maintain mockups,
together with the specifications for the mockup mechanism they implement and a starter design system.

A project space is any folder of mockups, with the design system in `design-system/` at its root. Mockups are
XML files built from that design system written in markdown: tokens, components (each with its
properties, variants, states, slots, template and style), shared behaviours and patterns. A small browser runtime
renders them straight from those files — no build step — with click-through navigation, dialogs, an inspect mode
for specifications, and checks against the design system.

Copyright © 2026 Jeremy Buckley. Source-available under the [PolyForm Shield License 1.0.0](LICENSE.md): free
to use, including commercially, but not to build into a product that competes with it or with Kheel. See
[Licence](#licence).

## Repository layout

```
kheel-mockups/
├── .claude-plugin/
│   └── marketplace.json        # makes this repo installable as a Claude Code plugin marketplace
├── .github/workflows/
│   └── release.yml             # checks every push; releases VERSION when it has no tag yet
├── VERSION                     # the project's version, for the plugin, the skills and the extension alike
├── CHANGELOG.md                # what each release changed; a version's section is its release notes
├── LICENSE.md                  # PolyForm Shield 1.0.0; copied into each skill folder
├── plugins/
│   └── kheel-mockup/           # the plugin — the only part that is installed into an agent
│       ├── .claude-plugin/
│       │   └── plugin.json
│       ├── README.md
│       └── skills/
│           ├── mockup-init/
│           │   ├── SKILL.md
│           │   └── assets/     # the templates init copies into a project space:
│           │       ├── viewer/   #   index.html, _runtime.js, _guide.md → design-system/
│           │       ├── starter/  #   the starter design-system/ and examples/
│           │       └── empty/    #   an empty design-system/ manifest, ready to sync
│           ├── mockup-init-jui/
│           │   ├── SKILL.md
│           │   └── assets/
│           │       ├── viewer/   #   a copy of mockup-init's viewer
│           │       └── jui/      #   the JUI design-system/ (with implementations/jui/) and examples/
│           ├── mockup-explore/
│           │   └── SKILL.md  # pages of options for a design decision
│           └── mockup-publish/
│               ├── SKILL.md
│               └── scripts/
│                   └── mockup-bundle.py  # stages mockups and a design-system bundle for publishing
├── extensions/
│   └── vscode/                 # Kheel Mockup Preview: the viewer beside the editor in VS Code (not a skill)
├── specs/                      # how the mockup mechanism works — not shipped with the skills
└── scripts/
    ├── package-skills.sh       # builds uploadable skill zips into dist/
    ├── package-extension.sh    # builds the VS Code extension's .vsix into extensions/vscode/dist/
    ├── package-release.sh      # builds everything a release carries into dist/
    ├── set-version.sh          # sets the version in VERSION and every file that carries it
    ├── check-version.sh        # checks those files agree
    ├── init-target.sh          # fills target/ (git-ignored) as a project space, for trying it out
    ├── sync-viewer.sh          # copies mockup-init's viewer into the other skills
    └── jui-manifest.py         # regenerates the JUI design system's manifest
```

## Skills

| Skill | What it does |
| --- | --- |
| `mockup-init` | Initialises a folder as a mockup project space — with the starter design system and example mockups, or empty, ready for a design system to be synchronised in. |
| `mockup-create` | Creates or revises a mockup from the project's design system: components first, layout attributes, variants and states, page states, dialogs, specifications — and marked custom regions where the design system falls short. Carries the full mockup format in `reference.md`. |
| `mockup-init-jui` | Initialises a project space with a design system of the standard [JUI](https://github.com/juiproject/jui-stack) (`jui-ui`) controls, components and fragments, styled with JUI's tokens, each with an implementation mapping to its JUI class. |
| `mockup-explore` | Shows options for one design decision as a page of variants drawn in place in the product, for the user to compare and pick, then applies the pick (extensions for components the project doesn't own). |
| `mockup-publish` | Publishes chosen mockup folders as a private claude.ai artifact (or updates one), staging the viewer with the design system packed into a single `_bundle.json` so it fits the host's file limit. |

## Trying it without an agent

```
./scripts/init-target.sh --serve
```

fills `target/` (git-ignored) with a starter project space, the way `mockup-init` does, and serves it at
<http://localhost:8000/design-system/>. Add mockups anywhere in `target/` and reload. Re-running keeps your
edits and refreshes only the viewer; `--reset` starts again, `--empty` sets up an empty design system instead,
`--jui` the JUI design system, and `--help` lists the options.

then open <http://localhost:8000/design-system/>.

## Previewing in VS Code

The **Kheel Mockup Preview** extension ([`extensions/vscode/`](extensions/vscode/README.md)) shows a mockup beside
the editor, serving the project space itself, and reloads it as files change. Download the `.vsix` from
the [latest release](https://github.com/kheelco/kheel-mockups/releases/latest) (or build it with
`./scripts/package-extension.sh`) and install it with **Extensions: Install from VSIX…**.

## Installing

The skills live at <https://github.com/kheelco/kheel-mockups>. Pick the way of installing that suits your agent.

### Any agent, with `npx skills`

The open [`skills`](https://github.com/vercel-labs/skills) CLI installs skills into Claude Code, Codex, Cursor
and 70-odd other agents, detecting which ones you have:

```
npx skills add kheelco/kheel-mockups                        # choose from the list
npx skills add kheelco/kheel-mockups --skill mockup-create  # one skill
npx skills add kheelco/kheel-mockups -g                     # for all your projects, not just this one
npx skills add kheelco/kheel-mockups -a claude-code -a codex # only these agents
```

Each skill's whole folder is copied, templates included. These are copies: to pick up a newer version, run the
command again.

### Claude Code, as a plugin

Add this repository as a plugin marketplace, then install the plugin:

```
/plugin marketplace add kheelco/kheel-mockups
/plugin install kheel-mockup@kheel-mockup
```

Installed this way, `/plugin marketplace update kheel-mockup` picks up new versions. A local clone works too:
`/plugin marketplace add /path/to/kheel-mockups`.

While developing, load the plugin straight from the source folder instead:

```
claude --plugin-dir ./plugins/kheel-mockup
```

### Claude desktop app and claude.ai

Download the skill zips from the [latest release](https://github.com/kheelco/kheel-mockups/releases/latest), or
build them, then upload each one as a skill in the app's settings (**Settings → Capabilities → Skills**):

```
./scripts/package-skills.sh
# → dist/mockup-init.zip, dist/mockup-init-jui.zip, dist/mockup-create.zip, dist/mockup-explore.zip, dist/mockup-publish.zip
```

Each zip holds a single skill folder with its `SKILL.md` at the top, which is the shape the upload expects.

### By hand

Copy (or symlink) a skill folder into your agent's skills directory — for example `~/.claude/skills/` or
`~/.codex/skills/` — so that it ends up as `<skills-dir>/mockup-init/SKILL.md`:

```
cp -R plugins/kheel-mockup/skills/mockup-init ~/.codex/skills/
```

## Releasing

The project is versioned and released as one: the plugin, its skills and the VS Code extension share the version
in `VERSION`. A release is a GitHub release tagged `version/X.Y.Z` and titled **vX.Y.Z**, carrying the skill zips
and the extension's `.vsix`, with the version's section of [CHANGELOG.md](CHANGELOG.md) as its notes.

Releases are automatic. The *Release* workflow (`.github/workflows/release.yml`) checks and packages the project
on every pull request and every push to `main`; when a push to `main` carries a version that has no tag yet, it
creates the tag and the release. So changes can be merged without releasing, and released when wanted by setting
a new version:

```
./scripts/set-version.sh 0.14.0      # VERSION, plugin.json and the extension's package.json
```

then adding a `## 0.14.0` section to `CHANGELOG.md` and merging to `main`. `./scripts/package-release.sh` builds
the release's files into `dist/` locally. Don't create `version/*` tags or releases by hand.

The viewer runtime (`VERSION` in `_runtime.js`) and the design systems carry versions of their own, which
initialisation and the viewer compare for compatibility; they are not release numbers and change only when those
parts do.

## Specifications

[`specs/`](specs/) describes the mockup mechanism — the structures it creates and the rules operations follow.
The skills implement those specifications, but the specifications themselves are not part of any installed
skill. Start with [specs/introduction.md](specs/introduction.md).

## Licence

Copyright © 2026 Jeremy Buckley. All rights not granted by the licence are reserved.

This repository — the skills, their templates, the viewer runtime, the starter and JUI design systems, and the
specifications — is source-available under the **[PolyForm Shield License 1.0.0](LICENSE.md)**. It is not
open source, and it does not convert to an open-source licence later.

In short (the [licence text](LICENSE.md) is what governs):

- **You may** use it for any purpose that doesn't compete — creating mockups for your own products, internal
  use, work you do for clients, education and research — and change it and share it for those purposes. The
  mockups you create with the skills are yours.
- **You may not** use it to provide a product or service that competes with it, or with any product the
  licensor or its affiliates provides using it, such as Kheel. That includes bringing the skills, the viewer
  runtime, the design systems or the specifications, changed or not, into another product. A product competes
  even if it is free, runs on a different platform or is written in a different language.
- **Permission** for anything outside those terms, including use in another product, is by separate written
  agreement with the licensor — email [info@kheel.co](mailto:info@kheel.co) to ask.

If you pass on any part of it, include the licence (or its URL) and the `Required Notice:` line at the top of
[LICENSE.md](LICENSE.md). Each skill folder carries its own copy of `LICENSE.md`, so the terms travel with a
skill however it is installed.

### Third-party material

The icons in the starter and JUI design systems are from [Lucide](https://lucide.dev), under the ISC licence
(`…/design-system/assets/icons/LICENSE-lucide.txt`).

## Contributing

See [AGENTS.md](AGENTS.md) for the conventions that keep the skills portable across agents.
