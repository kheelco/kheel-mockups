# Mockup format — reference

The complete format of a mockup file, for writing one. Read it once before writing; come back to the section you
need while writing.

## The file

```xml
<mockup type="page" title="Jobs" design-system="0.1.0" states="empty loading">
  <specification>
    Every job the dispatcher can see, soonest due first. Follows the **Data table** pattern.
  </specification>

  <ui-shell product="Fieldwork">
    <ui-panel title="Jobs" padding="none">
      <ui-button slot="actions" variant="primary" icon="plus" label="New job" opens="new-job.xml"/>
      <ui-table> … </ui-table>
    </ui-panel>
  </ui-shell>
</mockup>
```

- **Well-formed XML.** Every element closed (`<ui-icon name="x"/>`), every attribute quoted and given a value.
  Only the five XML entities exist (`&amp; &lt; &gt; &quot; &apos;`): write other characters directly — the file is
  UTF-8 — or as numeric references (`&#160;`, never `&nbsp;`).
- **Booleans** are on when present with an empty value, `disabled=""`, and off when absent. `disabled="false"` is
  also off.
- **Location:** anywhere in the project space except inside `design-system/`, and not in folders whose names start
  with `.` or `_`. File names are kebab-case: `new-job.xml`.
- **Paths** in `href`, `opens` and `<include src>` are relative to the mockup's own file.

### Root attributes

| Attribute | Required | Meaning |
| --- | --- | --- |
| `type` | yes | `page`, `section` or `dialog`. |
| `title` | yes | A short human name. |
| `design-system` | no | The design system version (from `design-system/README.md`) this mockup was written against. Set it. |
| `states` | no | Whole-page states that exist as sibling files, space-separated: `states="empty error"`. |
| `width` | no | For `section` and `dialog`: `small`, `medium` (default) or `large`. |

### Frames

| Type | Use for | Renders |
| --- | --- | --- |
| `page` | A whole screen. Usually starts with the design system's shell component, if it has one. | Filling the viewport. |
| `section` | A part of a page designed on its own, or reused across pages with `<include>`. | On the page background, at its `width`. |
| `dialog` | A modal surface opened from another mockup. Its content is normally the design system's dialog component. | Centred over a scrim; as an overlay when opened. |

## Components

Components are written by tag, with their properties as attributes:

```xml
<ui-button variant="primary" icon="plus" label="New job"/>
<ui-badge tone="danger" label="Overdue"/>
```

Everything about a component is in `design-system/components/<tag>.md`:

| Section | Tells you |
| --- | --- |
| Purpose | What it is for, when to use it, and what to use instead. |
| Properties | Each attribute: what it controls (`content`, `variant`, `state`), its values (`text`, `number`, `boolean`, `icon`, `path`, or a list), and its default. |
| Variants | What each variant value means. |
| States | The states it can show, grouped into dimensions, and what triggers each. |
| Slots | Where children go (`default` or a named slot), what each slot **accepts**, and whether its layout is `configurable`. |
| Rules of use | Do and don't. Follow them. |
| Example | Typical markup. |

**Slots.** Children go in the default slot unless they carry `slot="name"`. A child whose tag is accepted by
exactly one named slot is placed there automatically (a `ui-pagination` inside a `ui-table` goes to its footer),
so `slot` is only needed where the choice is ambiguous. A child a slot does not accept is a warning.

**Properties you leave out take their default.** Set only what differs.

## Plain HTML

`div`, `span`, `p`, `h1`–`h6`, `strong`, `em`, `small`, `a`, `ul`, `ol`, `li`, `img`, `hr`, `code`, `br` are allowed and
take the design system's base styles. Use them for text and simple wrappers. Never use HTML for something the
design system has a component for — no `<button>`, `<input>`, `<select>` or `<table>` where it has a button, field,
select or table.

## Layout and spacing

A fixed set of attributes lays things out without CSS. Values are **spacing steps**: `0, 1, 2, 3, 4, 5, 6, 8, 10,
12` (the design system's `--space-<n>` tokens) — never pixels.

**On any element or component:**

| Attribute | Values | Effect |
| --- | --- | --- |
| `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my` | a step, or `auto` | Margin: all sides, one side, or an axis. `ml="auto"` pushes to the right in a row. |
| `width` | `full`, `fit` | Fill the container, or shrink to content. |
| `grow` | boolean | Take the remaining space in a row or column. |
| `span` | a number, or `full` | Columns to span in a grid. |

**On plain elements, and on components whose default slot has `configurable` layout:**

| Attribute | Values | Effect |
| --- | --- | --- |
| `layout` | `row`, `column`, `grid` | Arrange the children. |
| `gap` | a step | Space between children. |
| `align` | `start`, `center`, `end`, `stretch`, `baseline` | Cross-axis alignment. |
| `justify` | `start`, `center`, `end`, `between`, `around` | Main-axis distribution. |
| `wrap` | boolean | Let a row wrap. |
| `cols` | a number, or `auto` | Grid columns: a fixed count, or as many as fit. |

```xml
<div layout="grid" cols="2" gap="4">
  <ui-text-field label="First name"/>
  <ui-text-field label="Last name"/>
  <ui-text-field label="Address" span="full"/>
</div>
```

Borders, padding, backgrounds and radius are not attributes: they come from container components (a box, panel or
card in the design system).

## Variants and states

- **Variants** are chosen: `variant="primary"`, `size="small"`, `tone="danger"`. Choose by meaning, following the
  component's Variants and Rules of use — one primary action per view, danger only for destructive actions.
- **States** are conditions a component enters. To show one in a still mockup:
  - interaction and container states from the component's States table: `state="hover"`, `state="focus"`,
    `state="open"`, `state="empty"`, `state="loading"` — several at once, space-separated;
  - states driven by a property, with the property: `disabled=""`, `loading=""`, `selected=""`, `error="…"`.
- **Whole-page states** — empty, loading, error, no results — are sibling files named `<name>.<state>.xml` beside
  `<name>.xml`, each a complete mockup of the same `type` and `title` with a `<specification>` saying when it
  occurs, and listed in the base mockup's `states`. The viewer shows them as tabs. Use a component's own `state`
  for a part of a page; use a sibling file when the whole screen changes.

## Specifications

- `<specification>` directly under `<mockup>` describes the whole mockup. Inside any other element it describes
  that element. Text may use paragraphs, `- ` bullets, `**bold**` and `` `code` ``. It is never rendered as content.
- `spec="…"` is the one-line form on any element.

Say what the picture cannot: data sources and ordering, what actions do and what follows them, when things
appear or are disabled, which pattern or shared behaviour applies, and how custom regions behave.

## Includes

`<include src="summary.xml"/>` inserts the content of a `section` mockup in its place. Links inside the section stay
relative to the section's own file. Includes may nest; a cycle is an error.

## Interaction

| Attribute | On | Effect |
| --- | --- | --- |
| `href="other.xml"` | any element | Go to another mockup. |
| `href="#id"` | any element | Scroll to the element with that `id`. |
| `href="https://…"` | any element | Open the URL in a new tab. |
| `opens="dialog.xml"` | any element | Open a `dialog` mockup over this one. |
| `closes=""` | any element inside a dialog | Close the dialog (typically Cancel). |

Components whose properties include a `path` (a navigation item's `href`, a card's `href`) use the same
mechanism. Every target must exist.

## Custom regions

For a part of the screen the design system cannot express:

```xml
<mockup type="page" title="Schedule board" design-system="0.1.0">
  <style>
    .board { overflow: auto; border-top: 1px solid var(--color-border); }
    .board-lane { position: relative; height: 64px; border-bottom: 1px solid var(--color-border); }
    .board-job { position: absolute; top: 8px; bottom: 8px; border-radius: var(--radius-md);
      background: var(--color-action-subtle); padding: var(--space-1) var(--space-2); }
  </style>
  …
  <div class="board" custom="Draggable schedule board — no component for this yet">
    <div class="board-lane">
      <div class="board-job" style="left: 240px; width: 230px" spec="Drag to reschedule; snaps to 15 minutes.">
        <strong>Blocked drain</strong>
        <ui-badge tone="info" label="Scheduled"/>
      </div>
    </div>
    <ui-button size="small" variant="ghost" icon="plus" label="Assign a job"/>
  </div>
</mockup>
```

- `custom="…"` on the region's outermost element, saying **what it is and why** the design system does not cover
  it. An empty reason is a warning.
- CSS in **one** `<style>` element, directly under `<mockup>` — put it first, before the content. Prefix class
  names by region (`board-…`); the style applies to the whole mockup. Ordinary CSS works: pseudo-elements
  (`::before` for a connecting line), `position`, `overflow`, grid.
- Use the design system's **tokens** in that CSS — colours, spacing, radius, type, shadows — never raw values where a
  token exists, so the custom part matches the product and follows its theme. The tokens are in
  `design-system/tokens.md`. Geometry particular to the region (a dot's diameter, a line's width, a lane's height)
  has no token; plain pixels are fine for that.
- Any HTML element may be used inside a custom region, and `spec` works on any of them.
- Inline `style` is fine inside a custom region (positions, sizes) and a warning outside one.
- **Components inside custom regions** for everything they can do: buttons, fields, selects, badges, icons,
  avatars, menus. Only the structure the design system lacks is hand-made.
- Keep custom regions as small as the need. A whole page is almost never custom.

## What the viewer checks

Each of these is a warning in the viewer's bar and the browser console (prefixed `[mockup]`):

| Warning | Fix |
| --- | --- |
| Unknown component | Use a tag listed in `design-system/README.md`. |
| Unknown property | Use a property from the component's Properties table (or a mockup attribute: layout, spacing, `state`, `spec`, `href`, `opens`, `closes`, `custom`, `id`, `slot`, `aria-*`). |
| Value out of range | Use one of the property's values. |
| Unknown state | Use a state from the component's States table. |
| Slot does not accept | Put the child where it is accepted, or wrap it as the component expects. |
| Layout attributes on a component that does not accept them | Wrap the children in a `div` with the layout attributes. |
| Not a spacing step | Use `0, 1, 2, 3, 4, 5, 6, 8, 10, 12`. |
| Missing target | Create the mockup the `href` / `opens` points to, or fix the path. |
| Missing icon | Use an icon listed in the manifest's Icons section. |
| Inline style outside a custom region | Use a component, a property or layout attributes — or mark the region custom, with its reason. |
| Custom region without a reason | Say what it is and why the design system does not cover it. |
| `<style>` belongs directly under `<mockup>` | Move the `<style>` element to be a child of the root. |
| Not well-formed XML | Fix the syntax (often an unescaped `&` or `<`, an unclosed tag, or `&nbsp;`). |

## Before you finish

- [ ] Root has `type`, `title` and `design-system`; the file is well-formed XML.
- [ ] Every tag is in the manifest; every property and value is in the component's tables.
- [ ] Nothing hand-made that the design system has a component for — including inside custom regions.
- [ ] Layout uses layout and spacing attributes, not CSS; no inline `style` outside custom regions.
- [ ] Each custom region says why; its CSS uses tokens; it is no bigger than the need.
- [ ] Variants are chosen by meaning and follow the Rules of use (one primary action per view).
- [ ] The states that matter are shown — per component with `state` or properties, per page as sibling files listed
      in `states`.
- [ ] Every `href` and `opens` target exists; dialogs have a way to close.
- [ ] A top-level `<specification>`, and specifications wherever meaning isn't visible.
- [ ] Rendered with no warnings (or each remaining one explained).
