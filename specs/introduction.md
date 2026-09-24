# Introduction

This document explains why the mockup mechanism exists, the ideas it rests on, and the parts it is made of. Read
it first; the other specifications take one part each and define it precisely.

## Background

Mockups sit between a specification and working software. A specification says what a screen must let someone
do; a mockup shows one way of doing it, concretely enough that people can react to it and an agent can build
from it. When an agent writes mockups, two things decide whether they are worth having:

- **They are built from a design system.** A mockup assembled from agreed components and tokens shows the real
  product. One assembled from ad-hoc HTML and CSS shows a guess, and the guess drifts further from the product
  with every screen.
- **They carry meaning, not only pictures.** A mockup that records what each part is for — which data it shows,
  what happens when it is clicked, which states it has — is a specification an agent can implement. A picture
  alone leaves the agent to invent the rest.

An earlier mechanism (the "system of design" in the ReqSpace tooling) established both of these and proved them
workable. It also showed where the cost was: a compile and resolve step before anything could be viewed; design
systems layered across levels that each extended the one above; two engines (Node and Java) that had to agree on
every detail; several expansion modes and a template language with its own scoping rules. Each of these made
sense on its own, and together they made the system slow to use and hard for an agent to get right first time.

This mechanism keeps what worked and removes that overhead. It does not aim to be compatible with the earlier
one.

## Principles

1. **Markdown and XML are the source.** A design system is a set of markdown files; a mockup is an XML file.
   People, agents and the renderer all read the same files. There is no generated form to keep in step.
2. **No build.** A mockup is viewed by opening it in a browser. The renderer reads the source files directly.
3. **One design system per project space.** There is no layering or inheritance between design systems. A
   project changes its design system by editing it.
4. **Follow established design-system practice.** Tokens have primitive, semantic and component layers.
   Components are specified by purpose, anatomy, variants, states (grouped into dimensions), properties, slots,
   behaviour, content rules, accessibility and rules of use. Shared behaviours and patterns sit above single
   components. A *variant* is chosen by whoever builds the screen; a *state* is a condition a component enters.
5. **Components first, HTML second.** A mockup should be mostly components — that is what holds a product to its
   design system and stops it drifting. Plain HTML is allowed for the small things no component covers, and a
   fixed set of layout and spacing attributes removes most reasons to write CSS. Where a screen needs something
   the design system cannot express, a mockup may build it as a marked **custom region**, still using components
   for everything inside it that they can do.
6. **Structured where a machine needs it, prose everywhere else.** The parts the renderer reads — properties,
   states, slots, template, style — have fixed shapes. The rest of a component file is written for people and
   agents.
7. **Lenient.** The renderer shows problems as warnings; it renders what it can rather than refusing.
8. **Designed for a remote source of truth.** A design system and its mockups are expected, in time, to live in a
   remote system reached over MCP, with the files on disk as a working copy. Versioning is defined with that in
   mind, though a project space works entirely on its own until it is connected.

## The elements

| Element | What it is | Specification |
| --- | --- | --- |
| Project space | A folder of mockups, in any sub-folders, with the design system (and its viewer) at its root. | [project-space.md](project-space.md) |
| Design system | The set of files describing what mockups are built from, indexed by a manifest. | [design-system.md](design-system.md) |
| Tokens | Named values — colour, type, spacing, radius, elevation, motion — that everything else refers to. | [tokens.md](tokens.md) |
| Component | A reusable part with properties, variants, states, slots, a template and a style. | [components.md](components.md) |
| Shared behaviour | A behaviour that a category of components follows by default. | [design-system.md](design-system.md#shared-behaviours) |
| Pattern | Guidance on how components are arranged and cooperate to solve a recurring problem. | [design-system.md](design-system.md#patterns) |
| Asset | A file components draw on, such as an SVG icon. | [design-system.md](design-system.md#assets) |
| Mockup | An XML file of components (and a little HTML), typed as a page, section or dialog, carrying specifications. | [mockups.md](mockups.md) |
| Renderer and viewer | A browser runtime that renders mockups straight from source, with navigation, dialogs, inspection and checks. | [rendering.md](rendering.md) |
| Versioning | How design systems, components and mockups record versions and what counts as a breaking change. | [versioning.md](versioning.md) |
| Implementation mapping | Per-component guidance on how a component maps to a target codebase (React, Vue, …). | [implementation-mapping.md](implementation-mapping.md) |

How they relate:

```
project space
├── design system ── manifest ──┬── tokens ◄──────────────── referred to by component styles
│                               ├── components ── may use other components in their templates
│                               ├── shared behaviours ◄───── named by components
│                               ├── patterns ─────────────── arrange components
│                               ├── assets ◄──────────────── used by components (icons)
│                               ├── implementation mappings ─ one per component per target
│                               └── viewer ────────────────── renders mockups, in the browser, without a build
└── mockups ── anywhere in the folder; built from components, link to and open one another
```

## How it is used

1. **Initialise** a project space, in one of two modes: with a working starter design system and example
   mockups, or empty — just the viewer and an empty design system, ready to be synchronised or written. Either
   way it is not connected to anything yet.
2. **Shape the design system.** Adjust tokens to the product's look; add, change or remove components; write
   patterns for arrangements that recur.
3. **Author mockups** from the components, recording specifications as you go.
4. **View** them in a browser, click through them, and inspect them for problems.
5. **Implement** from them: an agent reads a mockup, its specifications and the implementation mappings for the
   target codebase, and builds the real screen.

Connecting a project space to a remote system, and keeping the two in step, will be specified separately.

## Terms

| Term | Meaning |
| --- | --- |
| Consumer | Whoever places a component on a screen — here, usually the author of a mockup. |
| Variant | A version of a component the consumer chooses, such as a primary or danger button. |
| State | A condition a component enters, such as hover, disabled, loading or empty. States are grouped into dimensions; one state from each dimension can hold at once. |
| Property | An input the consumer sets on one component instance. Each property controls content, a variant or a state. |
| Slot | A named place in a component where the consumer puts other content. |
| Elemental component | A component built directly from tokens. |
| Composed component | A component built from other components. |
| Frame | What kind of surface a mockup is: a page, a section or a dialog. |
| Custom region | A part of a mockup deliberately built from HTML and CSS because the design system does not cover it, marked with `custom="<reason>"`. |
