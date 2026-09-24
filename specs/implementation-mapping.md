# Implementation mapping

## Purpose

Mockups are turned into working code by an agent that reads them and builds the real screens. The mockup says
what to build; an **implementation mapping** says how a component of the design system corresponds to what
exists in the target codebase — which component to use, how properties translate, what to watch for. Without it
an agent guesses, and a wrong guess spreads to every screen.

A mapping is guidance for an agent, not a code generator. It is kept accurate or left out: a wrong mapping is
worse than none.

## Files

One file per component per target, under the design system:

```
design-system/implementations/<target>/<tag>.md
```

`<target>` names the codebase or framework the mapping is for: `react`, `vue`, or a more specific name such as
`acme-web` when a product maps onto its own component library. A design system may have mappings for several
targets, and need not map every component. Mappings are optional and not listed in the manifest.

## Format

```markdown
---
component: ui-button
component-version: 1
target: react
---

# ui-button → React

## Maps to

`<Button>` from `@acme/ui`.

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| label | children | |
| variant | `variant` | `ghost` is `variant="text"` in the library. |
| icon | `startIcon={<Icon name=… />}` | |
| disabled | `disabled` | |

## Slots

| Slot | Maps to |
| --- | --- |

## States

How states the library handles itself differ from the component's States table, and which must be wired by hand
(for example, loading).

## Notes

Anything else an implementer must know: wrappers, required providers, known gaps.
```

| Front matter | Meaning |
| --- | --- |
| `component` | The tag this mapping is for. |
| `component-version` | The component's major version the mapping was written against. When the component's major version moves past it, the mapping must be reviewed. |
| `target` | The target, matching the folder name. |

## Use

An agent implementing a mockup reads, for each component the mockup uses, the mapping for its target if one
exists. A missing mapping means "no established equivalent": the agent builds from the component's
specification and says so. A mapping whose `component-version` is behind the component's major version is
treated as a hint to verify, not as fact.
