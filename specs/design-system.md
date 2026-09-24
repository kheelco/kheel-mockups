# Design system

## Purpose

The design system is the vocabulary mockups are built from. It lives in `design-system/` in the project space as
a set of markdown files and assets, indexed by one manifest. Each file has one subject, so that a single
component, pattern or token set can be read, changed, versioned and (later) synchronised on its own.

## Files

| File | Required | Subject |
| --- | --- | --- |
| `README.md` | yes | The manifest: identity, version and an index of every other file. |
| `tokens.md` | yes | The token set ([tokens.md](tokens.md)). |
| `components/<tag>.md` | — | One component each ([components.md](components.md)). |
| `behaviours.md` | no | Shared behaviours. |
| `patterns/<name>.md` | no | One pattern each. |
| `assets/icons/<name>.svg` | — | Icons. |
| `implementations/<target>/<tag>.md` | no | Implementation mappings ([implementation-mapping.md](implementation-mapping.md)). |
| `index.html`, `_runtime.js`, `_guide.md` | yes | The viewer, renderer and guide ([rendering.md](rendering.md)). They belong to the mechanism, not the design system. |

A file that is not referenced from the manifest is not part of the design system, even if it sits in the folder.

**Reserved names.** Names in the folder that start with `_` belong to the mechanism, as does `index.html`. They
are not part of the design system's content: they are not versioned with it, a design system never defines a
file or folder with such a name, and synchronisation with a remote system leaves them alone. Keeping the viewer
inside the design system folder means that folder alone is enough to view mockups.

## The manifest

`design-system/README.md` starts with front matter, followed by fixed sections. It doubles as the page a person
sees when browsing the design system on GitHub or disk.

```markdown
---
name: Starter
version: 0.1.0
prefix: ui
source: local
---

# Starter design system

<prose: what this design system is for and the direction of its look and feel>

## Tokens

- [Tokens](tokens.md)

## Components

| Component | Version | Kind | Summary |
| --- | --- | --- | --- |
| [ui-button](components/ui-button.md) | 1.0.0 | elemental | Triggers an action. |

## Behaviours

- [Shared behaviours](behaviours.md)

## Patterns

| Pattern | Summary |
| --- | --- |
| [Data table](patterns/data-table.md) | Finding and acting on records in a table. |

## Icons

`search` `plus` `chevron-down` …
```

**Front matter.** Flat `key: value` lines only.

| Key | Meaning |
| --- | --- |
| `name` | Display name of the design system. |
| `version` | Version of the design system as a whole ([versioning.md](versioning.md)). |
| `prefix` | The tag prefix every component uses, without the hyphen. Component tags are `<prefix>-<name>`. |
| `source` | Where the design system's source of truth is: `local` for a design system that is not connected to anything ([versioning.md](versioning.md#source)). |

**Sections.**

- **Tokens** links to `tokens.md`.
- **Components** has one row per component. The link text is the tag, the link target its file, and `Version`
  and `Kind` **must** match the component's own front matter. The renderer loads exactly the components listed
  here. The table may have further columns — the JUI design system adds one naming the JUI class — which the
  renderer ignores.
- **Behaviours** and **Patterns** link to their files. Both are optional.
- **Icons** lists the name of every icon in `assets/icons/`, each in backticks. The renderer uses the list to
  show the icon set and to check icon names.

## Shared behaviours

A **shared behaviour** belongs to a category of components rather than to one: "controls that load their options
remotely", "form fields", "destructive actions". It is written once, in `behaviours.md`, and applies by default
to every component in its category. A component joins a category by naming the behaviour in its own
`## Behaviour` section; it departs from the default only by stating the exception and the reason.

Each behaviour in `behaviours.md` is a `##` section with these parts:

| Part | Covers |
| --- | --- |
| Applies to | The category it governs and how a component joins it. |
| Behaviour | What happens, step by step. |
| Overriding it | How a component or a particular use departs from it, and what it must state. |
| Accessibility | The access rules the behaviour keeps. |

The test for where a behaviour belongs is scope: true of one component → that component's file; true of a
category wherever it appears → a shared behaviour; arises only when several components are arranged together →
a pattern.

## Patterns

A **pattern** is a settled way of arranging components to solve a recurring problem, such as a data table with
filters and pagination, or a gallery with a filter bar. It is guidance, not a component: it standardises how
parts cooperate rather than shipping a single unit. One pattern per file in `patterns/`, with these sections:

| Section | Covers |
| --- | --- |
| Purpose and when to use it | The problem it solves and when to reach for it instead of another shape. |
| Components | The components it arranges, named from this design system. |
| Supported variations | What is optional or conditional, and what each variation depends on. |
| Arrangement rules | Where each part sits, in what order, and how they behave together. |
| States and data conditions | How the whole handles loading, empty (nothing yet / nothing matches), error and no permission. |
| Accessibility | Focus order through the arrangement, announcements, cues that do not rely on colour alone. |
| Rules of use | Do and don't, each with a reason. |
| Example | An `xml` block showing the pattern as mockup markup. |

When an arrangement becomes a single reusable unit with a stable set of properties, it is a component instead.

## Assets

Assets are files that components draw on. The only kind defined so far is **icons**: one SVG per icon in
`assets/icons/`, named `<name>.svg` in kebab-case. Icons **should** draw with `currentColor` so they take the
colour of their context, and **should** use a square `viewBox`. Components place icons through the icon
component; mockups do not reference asset files directly.

## Editing the design system

- Changing a component, token or pattern is done by editing its file. There is no build; the next render uses
  the change.
- Adding a component means adding its file **and** a row in the manifest.
- Every change to a component's file updates its `version` as [versioning.md](versioning.md) describes, and the
  manifest's version column with it.
