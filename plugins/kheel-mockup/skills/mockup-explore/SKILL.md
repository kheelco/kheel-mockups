---
name: mockup-explore
description: Shows options for a design decision as a page of variants drawn in place, for the user to compare and pick, then applies the pick. Use when asked for options or variants to choose from.
---

# mockup-explore — show options, let the user choose, then apply

Some decisions are easier to make by looking: the look of a header, the cells of a table, an empty state, a
background. This skill puts a few options for **one** decision side by side, each drawn in place in the product,
lets the user pick one and say exactly which, and then applies only that one to the design system and the mockups.

Use it when the user asks for options, variants, alternatives or "something to choose from", or when you are about
to make a visual change with more than one reasonable answer. To build or revise a whole screen, use
`mockup-create`.

## 1. Understand the decision

1. Find the project space (the folder holding `design-system/` and the mockups) and the mockup or mockups where the
   decision shows.
2. Say in one sentence what is being decided, and what is not. Keep everything else as it is.
3. Read what the options must fit:
   - the design system's token files (`design-system/tokens*.md`, as listed in `design-system/README.md`) for its
     colours, type and spacing;
   - the files of the components involved (`design-system/components/<tag>.md`) and any extensions of them
     (`design-system/extensions/<tag>.md`);
   - the mockup itself, for its real content.
4. If the application's source is to hand, check the rules the options must follow there (what is shown when, what
   the actions do), rather than guessing.

## 2. Plan the options

- **Three to six options**, each a distinct direction rather than small steps of one. When the decision changes
  something that exists, option **A** is what exists today, so the others are compared with it.
- Give each a letter, a short name and one sentence saying what it is.
- **Switches** are settings that apply to every option and are not the decision itself: the state shown (filtered,
  empty, error), optional content (with or without an action), one page or another. Keep them apart from the
  options.
- For a continuous choice (colours, an angle, a size) add a small **builder** that renders a custom option live.
- Use the mockup's real content, never placeholder text.

## 3. Build the page

One self-contained HTML file, in this order:

1. **Introduction:** a short title and one paragraph saying what is being decided.
2. **Switches**, as segmented buttons.
3. **Options**, one after another. Each shows its letter, name and sentence, a **Choose** button, and its rendering.
4. **Builder**, if there is one.
5. **Choice:** a one-line summary of the chosen option and the switches, with anything needed to apply it exactly
   (a colour, a CSS value), and a **Copy** button.

Draw each option **in place**: a slice of the real screen around the thing being decided (the bar above it, the
content beside and below it), so it is judged in context rather than alone.

- Use the design system's real token values, copied into the page, and its fonts. The slices always show the
  product's own theme; the page around them may follow the viewer's light or dark setting.
- Take icons from `design-system/assets/icons/` (copy the SVG paths in) rather than drawing new ones.
- Depend on nothing but the file itself and the design system's web fonts, so it can be shared or published as one
  file. Remember the viewer's choice and switches in the browser if you like (guard storage access: it can fail).

Save it outside `design-system/` and outside the mockup folders: in a scratch folder, or a folder of the project
space whose name starts with `_` (the viewer doesn't list those). It is a working file; don't commit it unless the
user asks.

## 4. Check it

Open the page in a browser and look at every option under every switch (screenshots are enough). Check that text
fits (labels in chips and buttons, long lines), nothing is clipped or overlaps, and each option reads as intended.
Fix what you find once.

## 5. Share it

If your host can publish a page for the user (for example a claude.ai artifact), publish it and give the link;
otherwise tell the user how to open the file. Then, briefly:

- a table of the options: letter, name, and what makes it different;
- what the switches do;
- ask for the summary line back, plus any changes ("A, but with a lighter background").

When the user asks for changes to the options, update the page and share it again at the same place.

## 6. Apply the choice

Apply only what was chosen, following the design system's own rules:

- **A component the project owns** (its own prefix, such as `ui-`) is changed in its own file: bump its `version`
  and its row in `design-system/README.md`. A new reusable piece becomes a new component of the project's.
- **A component the project doesn't own** (one that mirrors a library or another design system, such as the JUI
  design system's `jui-*` components; `design-system/README.md` says which) is **never edited**, not even to fix
  it. Put the look in an **extension**, `design-system/extensions/<tag>.md`, listed in the manifest's Extensions
  table: values it `adds`, or values it `overrides` to restyle (see "Extensions" in `design-system/_guide.md`).
  If the choice needs what an extension cannot give (a new slot, property or template), make it a new component of
  the project's, or tell the user it is a change for the component's source.
- Give every new variant or component a note on how to build it in the application (an extension's
  `Implementation` section, a component's mapping in `design-system/implementations/` if the design system has
  them).
- Update the mockups that should show the choice, and their specifications where the change affects what an
  implementer reads.
- Check the changed mockups in the viewer (serve the project space, open `/design-system/?m=<mockup>`): no warnings
  (each is printed to the browser console prefixed `[mockup]`), and screenshots that look as chosen.

Report what changed, where to see it, and anything the application will need.
