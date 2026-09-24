# Specifications

This folder describes how the mockup mechanism works: the structures it creates, what each part is for, and
the rules that operations on them must follow. It is the source of truth that the skills implement.

The specifications are **not shipped with the skills**. Only `plugins/kheel-mockup/` is installed into an
agent, so nothing under `skills/` may link to or depend on a file here. When a skill needs something a
specification defines, the skill states it itself (or carries it as an asset) and the specification remains
the reference for what the skill should say.

## Documents

Read the introduction first.

| Document | Covers |
| --- | --- |
| [introduction.md](introduction.md) | Background, principles, the elements of the mechanism and how they relate. |
| [project-space.md](project-space.md) | The project space and how it is initialised. |
| [design-system.md](design-system.md) | The design system's files, the manifest, shared behaviours, patterns and assets. |
| [tokens.md](tokens.md) | Token layers, the token file and the tokens the mechanism requires. |
| [components.md](components.md) | The component file: specification sections, properties, states, slots, template and style. |
| [mockups.md](mockups.md) | The mockup file: frames, content, layout and spacing, states, specifications, includes, interaction. |
| [rendering.md](rendering.md) | Serving, the viewer, how a mockup is rendered, and the checks. |
| [versioning.md](versioning.md) | Versions of design systems and components, breaking changes, and the design system's source. |
| [implementation-mapping.md](implementation-mapping.md) | Per-target guidance for turning components into real code. |

## Conventions

- One document per concept. Name files after the concept, in kebab-case.
- Describe behaviour and structure, not agent instructions. The skills turn these into instructions.
- Use **must**, **must not** and **may** for rules that a skill or an agent is expected to follow.
- When a specification changes, update the skills and the starter project space that implement it in the same
  change.
