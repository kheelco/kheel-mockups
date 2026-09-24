# kheel-mockups

Skills that let an AI agent — Claude, Codex and others that read `SKILL.md` — create and maintain mockups,
together with the specifications for the mockup mechanism they implement and a starter design system.

A project space is any folder of mockups, with the design system in `design-system/` at its root. Mockups are
XML files built from that design system written in markdown: tokens, components (each with its
properties, variants, states, slots, template and style), shared behaviours and patterns. A small browser runtime
renders them straight from those files — no build step — with click-through navigation, dialogs, an inspect mode
for specifications, and checks against the design system.

## Repository layout

```
kheel-mockups/
├── .claude-plugin/
│   └── marketplace.json        # makes this repo installable as a Claude Code plugin marketplace
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
│           └── mockup-init-jui/
│               ├── SKILL.md
│               └── assets/
│                   ├── viewer/   #   a copy of mockup-init's viewer
│                   └── jui/      #   the JUI design-system/ (with implementations/jui/) and examples/
├── specs/                      # how the mockup mechanism works — not shipped with the skills
└── scripts/
    ├── package-skills.sh       # builds uploadable skill zips into dist/
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

## Trying it without an agent

```
./scripts/init-target.sh --serve
```

fills `target/` (git-ignored) with a starter project space, the way `mockup-init` does, and serves it at
<http://localhost:8000/design-system/>. Add mockups anywhere in `target/` and reload. Re-running keeps your
edits and refreshes only the viewer; `--reset` starts again, `--empty` sets up an empty design system instead,
`--jui` the JUI design system, and `--help` lists the options.

then open <http://localhost:8000/design-system/>.

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

Build the skill zips, then upload each one as a skill in the app's settings (**Settings → Capabilities →
Skills**):

```
./scripts/package-skills.sh
# → dist/mockup-init.zip, dist/mockup-init-jui.zip, dist/mockup-create.zip
```

Each zip holds a single skill folder with its `SKILL.md` at the top, which is the shape the upload expects.

### By hand

Copy (or symlink) a skill folder into your agent's skills directory — for example `~/.claude/skills/` or
`~/.codex/skills/` — so that it ends up as `<skills-dir>/mockup-init/SKILL.md`:

```
cp -R plugins/kheel-mockup/skills/mockup-init ~/.codex/skills/
```

## Specifications

[`specs/`](specs/) describes the mockup mechanism — the structures it creates and the rules operations follow.
The skills implement those specifications, but the specifications themselves are not part of any installed
skill. Start with [specs/introduction.md](specs/introduction.md).

## Licence

The icons in the starter design system are from [Lucide](https://lucide.dev), under the ISC licence
(`…/design-system/assets/icons/LICENSE-lucide.txt`).

## Contributing

See [AGENTS.md](AGENTS.md) for the conventions that keep the skills portable across agents.
