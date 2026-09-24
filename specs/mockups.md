# Mockups

## Purpose

A **mockup** shows one surface of the product — a page, a part of a page, or a dialog — built from the design
system's components, together with the specifications that say what it means. It is an XML file in the project
space — anywhere in the folder except `design-system/`, at any depth. It is written by hand or by an agent, rendered by the viewer without a build step, and
read by an agent that implements the real screen.

## File

```xml
<mockup type="page" title="Jobs" design-system="0.1.0" states="empty">
  <specification>
    The list of all jobs the dispatcher can see, newest first.
  </specification>

  <ui-shell>
    <ui-nav slot="nav"> … </ui-nav>
    <ui-panel title="Jobs">
      <ui-button slot="actions" variant="primary" icon="plus" label="New job" opens="new-job.xml"/>
      <ui-table> … </ui-table>
    </ui-panel>
  </ui-shell>
</mockup>
```

- The file **must** be well-formed XML. Only the five XML entities exist: write characters directly (the file is
  UTF-8) or use numeric references — `&#160;` rather than `&nbsp;`.
- XML attributes always have a value. Write a boolean property as present with an empty value to turn it on —
  `disabled=""` — and leave it out to turn it off. `disabled="true"` also works; `disabled="false"` is off.
- Names are kebab-case: `jobs.xml`, `new-job.xml`. Organise them in any folders; nothing about the mechanism
  depends on where a mockup sits, other than that paths in it are relative to its own file. Keep them out of
  `design-system/` and out of folders whose names start with `.` or `_`, which the viewer's catalogue skips.
- The root element is `<mockup>`.

### Root attributes

| Attribute | Required | Meaning |
| --- | --- | --- |
| `type` | yes | The frame: `page`, `section` or `dialog`. |
| `title` | yes | A short human name. |
| `design-system` | no | The design system version this mockup was last checked against ([versioning.md](versioning.md#mockups)). |
| `states` | no | Page states this mockup has as sibling files, separated by spaces ([Page states](#page-states)). |
| `width` | no | For `section` and `dialog`: `small`, `medium` (default) or `large`. |

### Frames

| Type | What it is | How it renders |
| --- | --- | --- |
| `page` | A whole screen. | Fills the viewport. The custom property `--viewport-height` holds the height available, for shells that fill it. |
| `section` | A part of a page, to design in isolation or to include in pages. | On the page background, at its `width`. |
| `dialog` | A modal surface opened from another mockup. Its content is normally a dialog component. | Centred over a scrim, at its `width`. |

## Content

A mockup's content is components and, where no component fits, plain HTML.

- **Components** are written by tag with their properties as attributes: `<ui-badge tone="success"
  label="Paid"/>`. Unknown properties, values outside a property's `Values`, and children a slot does not accept
  produce warnings.
- **Plain HTML** — `div`, `span`, `p`, `h1`–`h6`, `strong`, `em`, `small`, `a`, `ul`, `ol`, `li`, `img`, `hr`,
  `code`, `br` — is styled by the design system's base styles. Prefer a component whenever one exists; plain HTML
  is for text and the occasional wrapper.
- **`style` attributes** outside a custom region produce a warning: each one is a sign the design system is
  missing a component, a property or a token.

## Custom regions

One purpose of mockups is to hold a product to its design system and stop it drifting. But a design system never
covers everything: a screen may need something it has no component for — a scrollable, draggable board, a
diagram, an unusual visualisation. A mockup may then build that part from HTML and CSS, as a **custom region**.

- Mark the region with `custom="…"` on its outermost element. The value says what the region is and why the design
  system does not cover it: `<div class="board" custom="Draggable schedule board — no component for this yet">`.
  An empty reason is a warning.
- Inside a custom region, `style` attributes do not produce warnings.
- CSS the region needs goes in one `<style>` element, a direct child of `<mockup>`. It applies to the whole
  mockup, so prefix its class names by region. It **should** use the design system's tokens
  (`var(--color-border)`, `var(--space-3)`), so the custom part still looks like the product and follows its
  theme.
- **Components still come first inside a custom region.** Only the part the design system cannot express is
  custom: buttons, controls, badges, icons and text inside it are still the design system's components, and are
  checked as usual. A custom board of jobs uses `ui-button` for its buttons and `ui-badge` for a status, not
  hand-made ones.
- A custom region that recurs, or becomes a settled part of the product, is a candidate for a new component or
  pattern. The reason in `custom` is the note that makes that visible.

The viewer's inspect mode outlines custom regions and lists them with their reasons.

## Layout and spacing

A small, fixed set of attributes handles layout and spacing without CSS. Values are steps on the design system's
spacing scale (`0, 1, 2, 3, 4, 5, 6, 8, 10, 12` → `--space-<n>`), never pixels.

**Spacing and sizing** — on any element, component or HTML:

| Attribute | Values | Effect |
| --- | --- | --- |
| `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my` | a step, or `auto` | Margin on all sides, one side, or an axis. |
| `width` | `full`, `fit`, `auto` | Fill the container, shrink to content, or default. |
| `grow` | boolean | Take the remaining space in a row or column. |
| `span` | a number, or `full` | Columns to span in a grid. |

**Layout** — on plain HTML elements, and on components whose default slot's `Layout` is `configurable`:

| Attribute | Values | Effect |
| --- | --- | --- |
| `layout` | `row`, `column`, `grid` | Lay out the children in a row, a column, or a grid. |
| `gap` | a step | Space between children. |
| `align` | `start`, `center`, `end`, `stretch`, `baseline` | Cross-axis alignment of the children (not text alignment, whatever the legacy HTML attribute of the same name does). |
| `justify` | `start`, `center`, `end`, `between`, `around` | Main-axis distribution. |
| `wrap` | boolean | Let a row wrap. |
| `cols` | a number, or `auto` | Grid columns: a fixed count, or as many as fit. |

Borders, padding, backgrounds and radius are not attributes. They belong to container components (the starter
design system's `ui-box`), so that surfaces stay consistent.

## Showing a state

Most states are entered through interaction, which a still mockup cannot do. Any component accepts
`state="…"` — one or more state names from its `States` table, separated by spaces — to show it in those
states: `<ui-button label="Save" state="hover"/>`, `<ui-text-field label="Email" state="focus"/>`. States
driven by a property are set with the property instead: `disabled`, `loading`, `invalid`.

## Specifications

Specifications carry the meaning a picture cannot: what data a part shows and where it comes from, what an
action does, when something appears, which rule applies. They are what an implementing agent reads.

- **`<specification>` element.** As a child of `<mockup>` it describes the whole mockup. Inside any other
  element it describes that element. Its text may use simple markdown: paragraphs, `- ` bullets, `**bold**` and
  `` `code` ``. It is never rendered as content.
- **`spec` attribute.** A short form for one line: `<ui-badge tone="warning" label="Overdue" spec="Shown when
  the due date has passed and the job is not complete."/>`.

The viewer's inspect mode shows every specification against the element it describes.

## Includes

`<include src="…"/>` inserts the content of another mockup of type `section` in its place. The path is relative
to the including file. Links (`href`, `opens`) inside the included section stay relative to the section's own
file. Includes may nest; a cycle is an error. A `<specification>` at the top of the included section describes
the element that holds the `<include>`.

## Interaction

Mockups are clickable, within limits: enough to walk a flow, not to simulate the product.

| Attribute | On | Effect |
| --- | --- | --- |
| `href="other.xml"` | any element | Navigate to another mockup. The path is relative to the current mockup. |
| `href="#id"` | any element | Scroll to the element with that `id` in the current mockup. |
| `href="https://…"` | any element | Open the URL in a new tab. |
| `opens="dialog.xml"` | any element | Open a `dialog` mockup over the current one. |
| `closes` | any element inside a dialog | Close the dialog. |

`href` and `opens` targets that do not exist produce warnings. A component whose properties include a `path`
value (such as a navigation item's `href`) uses the same mechanism.

## Page states

A page often has states that change its whole content: empty, loading, error, a search with no results — or a
business state that changes the whole screen, such as an invoice that is overdue or paid. Each is a
sibling file named `<name>.<state>.xml` — `jobs.empty.xml` beside `jobs.xml` — and the base mockup lists them in
its `states` attribute. The viewer offers each listed state as a tab. A state file is a complete mockup with the
same `type` and `title`, and a `<specification>` saying when the state occurs.

States of a single component are shown with the `state` attribute instead; separate files are for whole-page
states only.
