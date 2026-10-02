# Exploring

## Purpose

Some design decisions are easier to make by looking than by describing: the look of a page header, the cells of a
table, an empty state. **Exploring** puts a handful of options for one decision side by side, each drawn in place in
the product, so that the person deciding can compare them, pick one, and say exactly which. Only the chosen option
then goes into the design system and the mockups.

An exploration is a working file, not part of the project space's content: it is not a mockup, the viewer does not
list it, and it is thrown away (or kept aside) once the choice is made.

## The exploration page

One self-contained HTML file, with these parts in order:

| Part | Holds |
| --- | --- |
| Introduction | A short title and one paragraph: what is being decided, and anything that constrains it. |
| Switches | Settings that apply to every option and are not themselves the decision: the state shown (filtered, empty, error), optional content (with or without an action), the content variant (one page or another). |
| Options | Three to six, each a distinct direction. Each has a letter (`A`, `B`, …), a short name, one sentence saying what it is, a **Choose** control, and its rendering. When the decision changes something that exists, option `A` is what exists today. |
| Builder | Optional: controls for a continuous choice (two colours and an angle, a size), rendering a custom option live. |
| Choice | A one-line summary of the chosen option and the switches, with anything needed to apply it exactly (a colour, a CSS value), and a control to copy it. |

Each option is drawn **in place**: a slice of the real screen around the thing being decided (the bar above it, the
content beside and below it), with the design system's real tokens and the mockup's real content, so it is judged
in context rather than alone. Icons come from the design system's icon set.

The page **must not** depend on anything but itself and the fonts the design system uses, so that it can be
shared as a single file or published. It **may** remember the viewer's choice and switches in the browser.

## From choice to design system

The chosen option is applied as a change to the design system and the mockups, following the design system's own
rules ([components.md](components.md), [design-system.md](design-system.md)):

- A component the project owns is changed in its own file, with a version bump.
- A component the project does not own (one that mirrors a library or another design system and is kept in step
  with it from there, such as the JUI design system's `jui-*` components) **must not** be edited. The look goes in
  an extension ([components.md](components.md#extensions)): values it `adds`, or values it `overrides`.
- What an extension cannot give (a new slot, property or template) is either a new component the project owns, or
  a change needed at the component's source, which is reported rather than made.
- Each new variant or component says how to build it in the application (an extension's `Implementation` section,
  a component's implementation mapping).
