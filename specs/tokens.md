# Tokens

## Purpose

A **token** is a named value the design system decides once and everything else refers to: a colour, a type
size, a spacing step, a radius, a shadow, a duration. Referring to the name instead of the value is what keeps a
product consistent, and what makes a change — a rebrand, a tighter spacing scale — a matter of editing one line.

Tokens are CSS custom properties. The token file is markdown so it can explain the decisions; the values are in
`css` code blocks the renderer applies as they are.

## Layers

| Layer | Names | Refers to | Example |
| --- | --- | --- | --- |
| Primitive | What a value *is* | A raw value | `--blue-600: #2554d9;` |
| Semantic | What a value is *for* | A primitive | `--color-action: var(--blue-600);` |
| Component | A part of one component | A semantic token | `--button-bg: var(--color-action);` |

- Components and mockups **should** refer to semantic tokens, never primitives. Only the primitive layer knows
  the actual values.
- Component tokens are declared inside the component's own style and listed in its `Tokens` table
  ([components.md](components.md#tokens)), not defined in `tokens.md`. They give one place to vary a single
  component without disturbing the shared layer. `tokens.md` may set them to theme a component, with an element
  selector: `ui-button[variant="primary"] { --button-bg: var(--brand-600); }`.

## The token file

`design-system/tokens.md` is prose with `css` code blocks, under these sections:

| Section | Contains |
| --- | --- |
| `## Primitives` | Primitive tokens, declared on `:root`. |
| `## Semantic` | Semantic tokens, declared on `:root`, each pointing at a primitive. |
| `## Base` | Styles for plain HTML elements a mockup may use (`body`, headings, paragraphs, links, `hr`, `code`), written with semantic tokens. |

Every `css` block in the file is applied, in order, to every mockup. Prose between blocks explains decisions and
is not read by the renderer. A design system may add sections and sub-sections where its token architecture has
more layers — the JUI design system, for example, adds component-family tokens and a compatibility layer, and maps
the mechanism's required tokens onto its own in a `## Mechanism` section. Token names are case-sensitive, as in
CSS.

## Required semantic tokens

The mechanism itself relies on two families, so every design system **must** define them.

**Spacing scale** — the steps the layout and spacing attributes use ([mockups.md](mockups.md#layout-and-spacing)):

| Token | Step |
| --- | --- |
| `--space-0` … `--space-12` | Steps `0, 1, 2, 3, 4, 5, 6, 8, 10, 12`. Values are the design system's choice; a 4-point scale is typical (`--space-1: 4px` … `--space-12: 48px`). |

**Viewer surface** — used by the viewer to frame mockups:

| Token | Use |
| --- | --- |
| `--color-bg` | The page background. |
| `--color-surface` | Raised surfaces such as cards and dialogs. |
| `--color-text` | Default text colour. |
| `--color-border` | Default border colour. |
| `--color-scrim` | The overlay behind a dialog. |
| `--color-focus-ring` | Keyboard focus rings. |
| `--font-body` | The default font stack. |

Beyond these, a design system names its semantic tokens as it sees fit. The starter design system uses the
families `--color-*`, `--font-*`, `--text-*` (sizes), `--weight-*`, `--leading-*`, `--space-*`, `--radius-*`,
`--shadow-*` and `--duration-*`.

## Fallbacks

A component style **may** give a fallback with the token, `var(--color-action, #2554d9)`, so it still renders
if the token is missing. Raw values without a token are allowed but are a sign that a token is missing: if
restyling the product seems to require editing a component's CSS, add or widen a token instead.
