# Versioning

## Purpose

A design system changes, and mockups built on it must survive the change or say clearly that they no longer
fit. Design systems and mockups are also expected to move to a remote source of truth, reached over MCP, where
components are published as immutable versions. Versioning is defined now so that local work already has the
information that move will need.

## What is versioned

| Thing | Version | Where it is recorded |
| --- | --- | --- |
| Design system | `major.minor.patch` | `version` in the manifest's front matter. |
| Component | `major.minor.patch` | `version` in the component's front matter, repeated in the manifest row. |
| Mockup | — | Mockups are not versioned by the mechanism. They record which design system version they were last checked against. |

Tokens, behaviours and patterns are versioned through the design system's version. The viewer and runtime
(`index.html`, `_runtime.js`, `_guide.md`) are not part of the design system and are not versioned with it; the runtime carries
its own `VERSION`.

## Component versions

A component's version describes its **interface** — what a mockup that uses it depends on — not its looks.

| Change | Bump | Examples |
| --- | --- | --- |
| Breaking the interface | major | Removing or renaming a property, a property value, a state or a slot; narrowing a slot's `Accepts`; changing a default so existing uses look or mean something different. |
| Extending the interface | minor | Adding a property, a value, a state or a slot; widening `Accepts`. |
| Anything else | patch | Changing the style, template structure, prose, example or accessibility notes without changing the interface. |

A component is **deprecated** before it is removed: `status: deprecated`, with its replacement named in
`Rules of use`. Removing a component is a major change to the design system.

## Design system versions

The design system's version moves with its contents:

- **major** when any component takes a major bump or is removed, or a token that components or mockups refer to
  is removed or renamed;
- **minor** when a component, token, behaviour or pattern is added, or a component takes a minor bump;
- **patch** otherwise.

## On disk

A project space holds exactly one version of each component: the current one. Earlier versions live in version
control or, once connected, in the remote system. There is no local history and no way for a mockup to use an
older version of a component.

## Mockups

A mockup's `design-system` attribute records the design system version it was last checked against. When the
design system's major version is different, the viewer warns, and the mockup should be reviewed and its attribute
updated. The renderer's checks (unknown properties, values, states and slots) show exactly what no longer fits.

## Source

The manifest's `source` says where the design system's source of truth is.

| Value | Meaning |
| --- | --- |
| `local` | The files on disk are the design system. Nothing else holds a copy. This is how a project space starts. |

Connecting a design system to a remote system, the values `source` takes then, and how local and remote
versions are reconciled will be specified with synchronisation. Until then, a design system is `local`.
