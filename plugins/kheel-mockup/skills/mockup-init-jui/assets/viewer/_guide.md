# Mockups — guide

This folder is a design system, and the viewer that renders mockups built from it. The folder that contains it is
a **mockup project space**: every `.xml` mockup anywhere in that folder, at any depth, is built from this design
system. This guide belongs to the mockup mechanism and is replaced when the viewer is updated; don't edit it.

## Viewing

Serve the **project space** — the folder that contains `design-system/`, not this folder — over HTTP:

```
cd <project space>
python3 -m http.server 8000
```

then open <http://localhost:8000/design-system/>. The first page is the catalogue: every component, icon and
colour token, and every mockup in the project space. Open a mockup to click through it; use **Inspect** to see
the components, the specifications and any warnings.

## What's here

| Path | What it is |
| --- | --- |
| `README.md` | The design system's manifest. Start here. |
| `tokens.md` | Colour, type, spacing, radius, elevation and motion tokens. |
| `components/` | One file per component: its specification, template and style. |
| `behaviours.md` | Behaviours shared by categories of components. |
| `patterns/` | How components are arranged to solve recurring problems. |
| `assets/icons/` | The icon set. |
| `index.html`, `_runtime.js`, `_guide.md` | The viewer and this guide. Anything here whose name starts with `_`, and `index.html`, belongs to the mechanism: don't edit it, don't name design-system files that way. |

Change the design system by editing its files — the next page load uses the change.

## Writing mockups

A mockup is an XML file anywhere in the project space outside `design-system/`, organised in whatever folders
suit the project:

```xml
<mockup type="page" title="Jobs" design-system="0.1.0" states="empty">
  <specification>What this screen is for, and the rules behind it.</specification>
  <ui-shell product="Fieldwork">
    <ui-panel title="Jobs">
      <ui-button slot="actions" variant="primary" label="New job" opens="new-job.xml"/>
      <ui-table> … </ui-table>
    </ui-panel>
  </ui-shell>
</mockup>
```

- **Frames.** `type` is `page`, `section` (a part of a page; can be included with `<include src="…"/>`) or
  `dialog` (opened from another mockup with `opens="…"`).
- **Components first.** Use the design system's components by tag, with their properties as attributes. Each
  component file lists its properties, the values they take, its states and its slots. Plain HTML (`div`, `p`,
  `strong`, `small`, `a`, `hr` …) is for text and simple wrappers only.
- **Booleans** are written `disabled=""` to turn on, and left out to turn off.
- **Custom regions.** When the design system has nothing for a part of the screen (a draggable board, a
  diagram), build that part from HTML: mark its outer element `custom="<what it is and why>"`, put its CSS in one
  `<style>` directly under `<mockup>` using the design system's tokens (`var(--space-3)`), and still use
  components for every button, control, badge and icon inside it. Inline `style` is only quiet inside a custom
  region.
- **Layout without CSS.** On plain elements and on components whose slot layout is `configurable`: `layout="row |
  column | grid"`, `gap`, `align`, `justify`, `wrap`, `cols`. On anything: `m`, `mt`, `mr`, `mb`, `ml`, `mx`,
  `my`, `width="full | fit"`, `grow`, `span`. Values are spacing steps (0, 1, 2, 3, 4, 5, 6, 8, 10, 12), never
  pixels. Borders, padding and backgrounds come from container components, not attributes.
- **States.** Show a component in a state with `state="hover"` (any state from its States table). Whole-page
  states are sibling files, `jobs.empty.xml`, listed in the base mockup's `states`.
- **Specifications.** A `<specification>` element describes the mockup (at the top) or the element it sits in;
  `spec="…"` is the one-line form. They are what an implementer reads — say where data comes from, what actions
  do, and when things appear.
- **Interaction.** `href="other.xml"` navigates, `opens="dialog.xml"` opens a dialog, `closes=""` closes it.
  Paths are relative to the mockup's own file.
- The file must be well-formed XML: use characters directly or numeric references (`&#160;`), not `&nbsp;`.

The viewer lists anything that doesn't fit the design system — unknown components or properties, values out of
range, children a slot doesn't accept, links to mockups that don't exist — under **warnings**.
