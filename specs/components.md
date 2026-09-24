# Components

## Purpose

A **component** is a reusable part of the interface — a button, a text field, a card, a table — that a mockup
places by writing its tag. Its file is both its specification and its implementation for mockups: the prose and
tables say what it is and how it behaves; the template and style draw it.

A component is **elemental** when it is built directly from tokens, and **composed** when its template uses other
components. Both are specified the same way.

## File

One file per component: `design-system/components/<tag>.md`, where `<tag>` is the component's tag — the design
system's prefix, a hyphen and a kebab-case name (`ui-button`, `ui-table-row`). The tag is the component's
identity and is not changed in place; renaming is removing one component and adding another.

```markdown
---
name: ui-button
version: 1.0.0
kind: elemental
status: active
summary: Triggers an action.
---

# Button

## Purpose
## Anatomy
## Properties        ← read by the renderer
## Variants
## States            ← read by the renderer
## Slots             ← read by the renderer
## Behaviour
## Content rules
## Accessibility
## Rules of use
## Tokens            ← read by the renderer
## Template          ← read by the renderer
## Style             ← read by the renderer
## Example           ← read by the viewer's catalogue
```

Sections appear in this order. A section that has nothing to say says so in one line ("None — built from
tokens.") rather than being left out, except `Slots`, `Tokens`, `Style` and `Example`, which may be omitted —
`Tokens` only when there is no `Style`.

### Front matter

Flat `key: value` lines.

| Key | Meaning |
| --- | --- |
| `name` | The tag. Equals the file name without `.md`. |
| `version` | `major.minor.patch` ([versioning.md](versioning.md)). |
| `kind` | `elemental` or `composed`. |
| `status` | `draft`, `active` or `deprecated`. A deprecated component says in `Rules of use` what replaces it. |
| `summary` | One line: what the component is for. Matches the manifest row. |

### Prose sections

| Section | Covers |
| --- | --- |
| Purpose | What the component is for, when to use it and when to use something else instead. |
| Anatomy | Its parts, including any components it is composed from. |
| Variants | What each variant value means and when to choose it. Variants are declared in `Properties`; this section explains them. |
| Behaviour | How it responds to interaction over time, and any shared behaviours it follows or overrides. |
| Content rules | Wording and content inside it. |
| Accessibility | What must hold for it to be usable by everyone: element semantics, focus, labelling, target size. |
| Rules of use | Do and don't, each with its reason. |

Prose is for people and agents. Use tables where a section enumerates a finite set.

### Properties

The inputs a consumer sets on one instance, as attributes. One table with exactly these columns:

| Column | Meaning |
| --- | --- |
| Property | Attribute name, kebab-case. |
| Controls | `content`, `variant` or `state` — what the property drives. |
| Values | `text`, `number`, `boolean`, `icon` (an icon name), `path` (a mockup path), or the allowed values separated by commas. |
| Default | The value used when the attribute is absent. Blank means none. |
| Description | What it does. |

```markdown
| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The button's text. |
| variant | variant | primary, secondary, ghost, danger | secondary | Emphasis. |
| size | variant | small, medium | medium | Size. |
| icon | content | icon | | Optional leading icon. |
| disabled | state | boolean | | Puts the button in the disabled state. |
```

A variant is a property whose `Controls` is `variant`; a component may have several variant axes. A component
with no properties writes "None." in place of the table.

### States

The conditions the component can be in, grouped into **dimensions**. Within a dimension states exclude one
another; across dimensions they combine (a field can be *filled*, *focused* and *invalid* at once). One table
with exactly these columns:

| Column | Meaning |
| --- | --- |
| Dimension | The group, such as Interaction, Availability, Content, Validation, Selection. |
| State | The state's name, kebab-case. |
| Trigger | What puts the component in this state: an interaction (`:hover`), a property (`disabled`), or data (no rows). |
| Appearance | How it looks and behaves in this state. |

List the resting state of each dimension too (`default`, `enabled`, `filled`…), so the table is complete. The
states people forget — loading, error, empty, read-only, no permission — are where real screens break.

### Slots

The places a consumer puts other content. One table with exactly these columns:

| Column | Meaning |
| --- | --- |
| Slot | The slot name, or `default` for the unnamed slot. |
| Accepts | What may go in it: component tags separated by commas, `text` for text and inline HTML, or `any`. Blank means `any`. The renderer warns about anything else. |
| Suggests | Components that usually go in it. Advisory. |
| Layout | `configurable` when the consumer may set the slot's layout with layout attributes, otherwise a short description of its fixed layout. |
| Description | What the slot is for. |

A component with no slots omits the section.

### Tokens

The tokens the component's style uses, so that a reader can see what restyles it without reading its CSS, and a
theme knows which points of variation it has. One table with exactly these columns:

| Column | Meaning |
| --- | --- |
| Token | One token, or several of the same kind and purpose, each in backticks: `` `--space-2`, `--space-3` ``. |
| Kind | `component`, `semantic` or `inherited` (below). |
| Default | For a component token, what it is set to when no variant or state changes it. Blank otherwise. |
| Used for | What the token does in this component, including how variants and states change it. |

| Kind | Meaning |
| --- | --- |
| `component` | Set in this component's style: its own point of variation, such as `--button-bg`. Give it a row of its own, and say which variants or states repoint it. Setting a token that belongs to a component used inside this one (a badge setting its icon's `--icon-size`) is listed here too. |
| `semantic` | Defined in `tokens.md`. Group tokens that serve one purpose in one row — the type tokens for the label, the spacing steps for padding — rather than a row each. |
| `inherited` | Set by another component or by the viewer and read here, such as a table cell reading the padding its table's density sets. |

The renderer checks the table against the style: every token the style sets or reads **must** be listed, every
listed token **must** be used, component tokens **must** be set in the style, and semantic tokens **must** be
defined in `tokens.md`. Differences are warnings ([rendering.md](rendering.md#checks)).

A component token is how a design system restyles one component without editing it. Because styles outside a
component take precedence over its own `:host` rules, `tokens.md` can set one for all instances or for a variant:
`ui-button[variant="primary"] { --button-bg: var(--brand-600); }`.

### Template

One `html` code block: the markup of the component's inside. The renderer places it in the component's shadow
root, so its structure and styles are private to the component. The template language is small:

| Form | Meaning |
| --- | --- |
| `{{prop}}` | The property's value (or its default), HTML-escaped. Usable in text and attribute values. |
| `data-if="prop"` | Keep the element only when the property is present and not `false`. |
| `data-if="!prop"` | Keep the element only when the property is absent or `false`. |
| `data-if="prop=value"` | Keep the element only when the property equals the value. |
| `<slot>`, `<slot name="x">` | Where the consumer's children go (native slots). |
| `data-layout` | Marks the element that receives the consumer's layout attributes. At most one; it **should** contain the default slot. |
| `<mockup-asset src="icons/{{icon}}.svg">` | Inlines an asset from the design system's `assets/` folder. Used by the icon component. |

Templates may use other components; that is how a component is composed. There are no loops and no other
expressions: repetition is the consumer's job, through slots.

### Style

One `css` code block, scoped to the component by its shadow root.

- `:host` is the component's own element; `:host([variant="primary"])` styles a variant;
  `::slotted(<selector>)` styles top-level slotted children.
- Values **should** come from semantic tokens, through component tokens where a component benefits from a named
  point of variation: `:host { --button-bg: var(--color-surface); }`.
- The renderer sets absent properties to their defaults on the element, so every variant can be styled by its
  attribute, default included.
- **Every state is styled in two forms**: its natural trigger and the `state` attribute that lets a mockup show
  it without interaction ([mockups.md](mockups.md#showing-a-state)). For example
  `:host(:hover), :host([state~="hover"])`. Property-driven states are styled by their property:
  `:host([disabled])`.
- `display` on `:host` is set by the component; custom elements otherwise default to inline.
- To hide a region when nothing is placed in its slot, style on `data-filled`, which the renderer keeps set to
  the names of the slots that hold content (`default` for the unnamed slot):
  `footer { display: none; } :host([data-filled~="footer"]) footer { display: flex; }`. Don't rely on
  `:host(:has(…))`; not every browser supports it.

### Example

One `xml` code block showing typical use, written as mockup markup. The viewer's catalogue renders it, so it is
also the component's visual check. Show the main variants and states side by side where that fits. Omit it only
for components that cannot be shown in isolation, such as a full-page shell, and point to an example mockup
instead.

## Rendering

Each component listed in the manifest becomes a custom element named by its tag. When one appears on a page, the
renderer:

1. applies property defaults to absent attributes;
2. renders the template with the element's attributes into its shadow root, with the component's style;
3. routes any child without a `slot` attribute whose tag appears in exactly one named slot's `Accepts` (and not in
   the default slot's) to that slot, so authors rarely have to write `slot="…"`;
4. applies the element's layout attributes to the template's `data-layout` element, and its spacing attributes to
   the element itself ([mockups.md](mockups.md#layout-and-spacing));
5. sets `data-filled` on the element to the names of the slots that hold content;
6. re-renders when one of its properties changes.

Because tokens are custom properties, they reach into every shadow root, so a token change restyles every
component.
