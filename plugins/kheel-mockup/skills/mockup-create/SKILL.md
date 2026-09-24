---
name: mockup-create
description: Create or revise a mockup — an XML screen, section or dialog built from a project's design system, with states, variants and specifications. Use when asked to mock up, design or sketch a screen.
---

# mockup-create — create a mockup from a design system

A mockup shows one surface of a product — a page, a part of a page, or a dialog — built from the project's design
system, together with the specifications that say what it means. It is an XML file that a browser viewer renders
directly, and that an agent later implements from.

`<skill>` below means the folder this `SKILL.md` sits in. **Read `<skill>/reference.md` before writing any XML** —
it is the complete mockup format: root attributes, frames, layout and spacing attributes, states, specifications,
includes, interaction, custom regions and the checks the viewer runs.

## Why mockups are built this way

A mockup has two jobs, and they pull in different directions:

1. **Hold the product to its design system.** Every screen built from the same components, tokens and patterns
   looks and behaves consistently, and stays that way as the product grows. A button re-made in HTML is a second
   button: slightly different now, more different after the next change. The mockup is where that drift is
   stopped, so reach for the design system first, every time.
2. **Show what the designer actually means.** Sometimes the design system does not cover what a screen needs — a
   scrollable, draggable canvas, a diagram, an unusual visualisation. Then the mockup is free to build that part
   from HTML and CSS, as a marked **custom region**, rather than bend the idea to fit components that do not suit
   it.

The rule that reconciles them: **custom only where the design system cannot express it, and components for
everything inside a custom region that they can do.** A bespoke board of jobs is custom; the buttons, selects,
badges, icons and text fields on and around it are the design system's. Mark each custom region with its reason,
so reviewers can see where the product departs from the design system and decide whether it should gain a
component.

## 1. Find the project space

A project space is a folder with `design-system/README.md` at its root; every mockup in it, at any depth, is built
from that design system. Find it from where the user is working (walk up from the target folder), or ask. If there
is none, stop and suggest initialising one (the `mockup-init` skill, if installed).

Mockups go anywhere in the project space **outside** `design-system/` — organise by feature or area
(`billing/invoices.xml`). File names are kebab-case.

## 2. Understand the screen

Before writing, be clear on:

- **What it is for** and who uses it; what they must be able to do and see.
- **The frame:** a whole `page`, a `section` of a page (designed alone or included in pages), or a `dialog`.
- **Its states:** loading, empty (nothing yet / nothing matches), error, no permission, and any others that
  change the whole screen; and the states individual parts must show (a field in error, a row selected).
- **Where it goes to:** the screens and dialogs it links to or opens.

Use what the user gives you — a description, a specification, a sketch, an existing screen. Ask only about what
would change the structure; otherwise decide, and say what you assumed in the mockup's `<specification>`.

## 3. Read the design system

1. Read `design-system/README.md`: the component list with summaries, the patterns, the shared behaviours.
2. For each component you are likely to use, read its file in `design-system/components/`: **Purpose** (when to
   use it and when not), **Properties** (the attributes, their values and defaults), **Variants**, **States**,
   **Slots** (what may go where) and **Rules of use**. Its **Example** shows typical markup.
3. If a **pattern** in `design-system/patterns/` fits the screen (a data table, a gallery with filters, a form in
   a dialog), follow its arrangement rules and its handling of loading, empty and error.
4. Note the **shared behaviours** components follow, so the specification can name them rather than restate them.

Use only what the design system defines: a tag it does not list, a property a component does not have, or a
value outside a property's list is an error, not an extension.

## 4. Compose

Write the XML as described in `reference.md`. In order of preference:

1. **A component** for anything the design system has a component for — including inside custom regions.
2. **Layout and spacing attributes** (`layout`, `gap`, `align`, `justify`, `cols`, `m…`, `width`, `grow`,
   `span`) on plain elements and configurable components to arrange things — never CSS for ordinary layout.
3. **Plain HTML** for text and simple wrappers (`div`, `p`, `strong`, `small`, `h1`–`h4`, `a`, `ul`, `hr`).
4. **A custom region** — HTML plus a `<style>` block written with the design system's tokens — only for the part
   the design system cannot express, marked `custom="<what it is and why>"`.

**A missing piece is not automatically custom.** When the design system lacks something ordinary — an alert
banner, a key–value list, a badge beside a panel title — first compose it from components and layout attributes
(a box with an icon, a badge and text; a grid of label and value). Go custom only when composition cannot express
the idea (a draggable board, a timeline track, a diagram). Either way, report it as a gap.

**Variants are choices; states are conditions.** Choose each component's variants for their meaning (the one
primary action is `variant="primary"`; a destructive one is `danger`), following its Rules of use. Show the states
the screen needs: interaction states with `state="hover"` / `state="focus"`, property-driven states with the
property (`disabled=""`, `error="…"`, `selected=""`), container conditions with `state="empty"` or `state="loading"`
where a component defines them. Show states where they help the reader understand the design, not everywhere.

**Whole-screen states are separate files.** `jobs.empty.xml`, `jobs.loading.xml` beside `jobs.xml`, each a
complete mockup, listed in the base mockup's `states`. These include business states when they change the whole
screen — an invoice that is `overdue` or `paid`, with different banners and actions — not only loading and empty.
When only one part differs (a status badge's tone), show one version and name the others in a specification. Dialogs are their own `dialog` mockups, opened with
`opens="…"`; give Cancel `closes=""`, and give the primary action `closes=""` too (or an `href` to the screen that
follows) so clicking through simulates success. Reusable parts of pages are `section` mockups placed with
`<include src="…"/>`.

## 5. Specify

Pictures show layout; specifications carry meaning. Add a `<specification>` at the top of every mockup (what the
screen is for, who sees it, what you assumed) and on the parts whose meaning is not visible:

- where data comes from, and how it is sorted, filtered or limited;
- what an action does, and what happens after it (success, failure);
- when something appears, is disabled or changes;
- which pattern or shared behaviour applies, by name;
- for a custom region, how it behaves (drag, scroll, zoom) — this is what an implementer cannot guess.

Use `spec="…"` for one line on an element. Keep specifications about behaviour and rules, not about how it looks.

## 6. Check

- If you can run a browser against the project space (serve it with `python3 -m http.server` from the project
  space and open `/design-system/?m=<path to the base mockup>`), do: the viewer lists warnings in its bar and in
  the browser console, each prefixed `[mockup]`. Fix every warning except deliberate ones you can explain. Page
  states appear as tabs in the bar (or add `&state=<state>` to the address). Click through links and dialogs.
- **Look at it.** The viewer checks structure, not appearance. Take screenshots (or look in the browser) and check
  for text cut off in narrow fields, open menus covering other content, misaligned custom elements, and anything
  that does not read the way the design intends.
- Whether or not you can render it, go through the checklist in `reference.md` ("Before you finish").

## 7. Report

Tell the user, briefly: the files you created or changed, how to view them, the assumptions you made, and any
**custom regions** with their reasons. Where a custom region or a recurring arrangement looks like a gap in the
design system, say so — it is a candidate for a new component or pattern, which is how the design system grows
without drifting.

## Revising a mockup

Read the mockup and the design system files for the components it uses first. Keep what is right; change what
was asked. When the design system has changed since the mockup was made (its `design-system` attribute records the
version it was checked against), fix what no longer fits and update the attribute.
