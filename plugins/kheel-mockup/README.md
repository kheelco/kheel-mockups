# kheel-mockup plugin

Agent skills for creating and maintaining mockups built from a design system, rendered in the browser without a
build step.

## Skills

| Skill | What it does |
| --- | --- |
| `mockup-init` | Initialises a folder as a mockup project space, either with a starter design system (tokens, 23 components, icons, patterns, shared behaviours) and example mockups, or empty, ready for a design system to be synchronised in. Both get the viewer. |
| `mockup-create` | Creates or revises a mockup from the project's design system — components first, marked custom regions where it falls short — and checks it in the viewer. |
| `mockup-init-jui` | Initialises a project space with a JUI design system: 74 mockup components for the standard `jui-ui` controls, components and fragments, in JUI's tokens, each with an implementation mapping to its JUI class. |
| `mockup-publish` | Publishes chosen mockup folders as a private claude.ai artifact, or updates one, with the design system packed into a single bundle the viewer reads. |

## Using it

Ask your agent to set up mockups somewhere, for example:

> Initialise a mockup space in `~/work/acme/mockups` with the starter set

or, to receive a design system later:

> Initialise an empty mockup space in `~/work/acme/mockups`

then serve the folder (`python3 -m http.server 8000`) and open <http://localhost:8000/design-system/>.

then ask for a screen:

> Mock up the invoice page: customer, line items, status, and actions to send or record a payment

In Claude Code the skills are namespaced as `kheel-mockup:mockup-init`, `kheel-mockup:mockup-create` and so on.

Install from <https://github.com/kheelco/kheel-mockups> — for example `npx skills add kheelco/kheel-mockups` for any agent, or `/plugin marketplace add kheelco/kheel-mockups` in Claude Code. The repository [README](../../README.md) has the details.

## Licence

Copyright © 2026 Jeremy Buckley. Source-available under the [PolyForm Shield License 1.0.0](../../LICENSE.md):
free to use, including commercially, but not to build into a product that competes with it or with Kheel. Each
skill folder includes a copy as `LICENSE.md`.
