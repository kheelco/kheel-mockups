# Project space

## Purpose

A **project space** is a folder of mockups. It can be anywhere — inside a code repository, beside a
specification set, on its own — and organised in whatever sub-folders suit the project. What makes it a project
space is the `design-system/` folder at its root: every mockup in the folder, at any depth, is built from that
design system, and the viewer inside it renders them.

## Layout

```
<project-space>/
├── design-system/                  # required — the design system and the viewer
│   ├── index.html                  # the viewer — open this in a browser
│   ├── _runtime.js                 # the renderer the viewer loads
│   ├── _guide.md                   # how to view and write mockups
│   ├── README.md                   # the manifest — indexes the design system
│   ├── tokens.md
│   ├── behaviours.md               # optional
│   ├── components/<tag>.md
│   ├── patterns/<name>.md          # optional
│   ├── assets/icons/<name>.svg
│   └── implementations/<target>/<tag>.md   # optional
├── <name>.xml                      # mockups, anywhere …
├── <folder>/…/<name>.xml           # … at any depth
└── examples/                       # the example mockups, when initialised with the starter set
```

| Path | Owner | Purpose |
| --- | --- | --- |
| `design-system/index.html`, `design-system/_runtime.js`, `design-system/_guide.md` | the mechanism | The viewer, renderer and guide ([rendering.md](rendering.md)). Replaced together when the mechanism is updated; not edited by hand. |
| `design-system/` (everything else) | the project | The project's design system ([design-system.md](design-system.md)). |
| everything outside `design-system/` | the project | Mockups ([mockups.md](mockups.md)) and anything else the project keeps there. |

`design-system/` is the only thing a project space must have. A directory is **initialised** when
`design-system/README.md` exists in it.

A project space has exactly one design system. A project space does not contain another project space.

## Initialisation

Implemented by the `mockup-init` skill, which carries three templates: the **viewer** (`index.html`,
`_runtime.js`, `_guide.md`), the **starter** set (a starter design system and example mockups) and the **empty**
set (an empty manifest).

**Input:**

- the location of the project space, supplied by the user. It may be absolute or relative to the agent's working
  directory, and is resolved to an absolute path before use;
- the **mode**:

  | Mode | Installs | For |
  | --- | --- | --- |
  | `starter` | The viewer, the starter design system (tokens, components, icons, behaviours, patterns) and example mockups in `examples/`. | Trying the mechanism, or starting a design system from something. |
  | `empty` | The viewer and an empty manifest: no tokens, components or icons. | A design system that will be synchronised in, or written from scratch. |

  When the user has not chosen and cannot be asked, the mode is `starter`.

**Behaviour:**

1. If the location does not exist, it **must** be created, including missing parent directories.
2. If the location is an existing file, initialisation **must** stop without changes.
3. For a location that is not initialised, every file of the mode's template and of the viewer that does not
   already exist **must** be copied, byte for byte, keeping its relative path (the viewer's files go into
   `design-system/`).
4. A file that already exists **must not** be overwritten, moved or removed — with one exception: when the
   viewer's files differ from the ones present, initialisation **may** replace them, together, and only after the
   user agrees.
5. For a location that is already initialised, only the viewer is considered, whatever the mode: nothing is added
   to the design system, and no examples are added, since the project's design system may differ from the
   starter set they are built on. A missing viewer file is added.
6. Initialisation **must not** create anything that is not in the templates.

**Result:** the absolute path of the project space; whether it was newly initialised (and in which mode) or
already so; what was added or updated; and how to view the mockups ([rendering.md](rendering.md#serving)).

A newly initialised design system is local, whichever the mode: its manifest has `source: local` and it is not
connected to any remote system ([versioning.md](versioning.md#source)). An empty one is ready to receive a design
system by synchronisation, which will be specified separately.

### The JUI design system

The `mockup-init-jui` skill initialises a project space with the JUI design system instead of the starter set, and
brings an existing JUI project space (one whose manifest has `prefix: jui`) up to date with the design system it
carries. Some of a JUI design system's files mirror JUI and are kept in step with the template; the rest belong to
the project:

| Mirrors JUI (kept in step) | Belongs to the project |
| --- | --- |
| `components/jui-*.md`, `implementations/jui/jui-*.md` | The project's own components (another prefix) and their mappings |
| `tokens.md`, `behaviours.md`, `CHANGELOG.md` | Further token files (such as a theme), patterns |
| The icons the template carries, in `assets/icons/` (with their licence files) | Icons the project adds, and other assets (brand, fonts) |
| | `extensions/`, and the manifest (`README.md`) as a whole |

Updating an existing JUI project space:

1. A mirrored file the project lacks **must** be added. A component or mapping added this way gets its row in the
   manifest's Components table, copied from the template's manifest; an icon added this way is added to the
   manifest's icon list.
2. A mirrored file that differs from the template **must** be listed with what tells the versions apart (a
   component's `version`; for `CHANGELOG.md`, the entries the template has that the project's lacks), and
   **may** be replaced, only after the user agrees. A replaced component's manifest row is updated to match.
3. A file that belongs to the project **must not** be added to, changed or removed, apart from the manifest rows
   and icon list above. In particular `extensions/` is never touched; after replacing components, any warning that
   an extension no longer fits its component is passed on to the user.
4. The viewer is handled as for any project space: missing files added, differing ones replaced together with the
   user's agreement.

Initialisation is idempotent: running it twice on the same location has the same effect as running it once.
