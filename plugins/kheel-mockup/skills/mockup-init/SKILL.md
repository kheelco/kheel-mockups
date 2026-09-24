---
name: mockup-init
description: Set up a folder as a mockup project space — with a starter design system and examples, or empty, ready to sync. Use when the user asks to set up, initialise or start mockups somewhere.
---

# mockup-init — initialise a mockup project space

A **project space** is any folder of mockups: `.xml` files anywhere in it, in whatever sub-folders suit the
project, all built from the one design system in `<location>/design-system/`. Initialising puts that folder in
place with the viewer that renders the mockups. It is safe to run more than once and never overwrites the user's
work.

`<skill>` below means the folder this `SKILL.md` sits in. It carries three templates under `<skill>/assets/`:

| Template | Contents | Copied to |
| --- | --- | --- |
| `viewer/` | `index.html`, `_runtime.js`, `_guide.md` — the viewer and its guide | `<location>/design-system/` |
| `starter/` | `design-system/` (a starter design system: tokens, components, icons, behaviours, patterns) and `examples/` (example mockups) | `<location>/` |
| `empty/` | `design-system/README.md` — an empty manifest | `<location>/` |

## 1. Get the location and the mode

Ask the user where the project space is, unless they have already said. Accept an absolute path or one relative
to the current working directory, and resolve it to an absolute path.

- If the location does not exist, create it (including missing parent directories).
- If the location is an existing file rather than a directory, stop and tell the user.

Then settle the **mode**, unless the user has already made it clear:

- **starter** — the starter design system and the example mockups. For trying the mechanism, or starting a new
  product's design system from something.
- **empty** — only the viewer and an empty design system, ready for a design system to be synchronised in or
  written from scratch.

If you cannot ask, use **starter** and say so.

## 2. Check what is already there

Look for `<location>/design-system/README.md`.

- **Absent** → a new project space. Go to step 3.
- **Present** → already initialised. The design system there belongs to the project, so add nothing to it but the
  viewer, whatever mode was asked for; if the user asked for the starter set, tell them it was not added because
  a design system already exists. Go to step 4.

## 3. Copy the templates

Copy, keeping relative paths and **skipping any file that already exists** — never overwrite, move or delete
anything in the location:

1. the chosen mode's template (`starter/` or `empty/`) into `<location>/`;
2. `viewer/` into `<location>/design-system/`.

With a shell, on macOS and Linux:

```
cp -Rn "<skill>/assets/<mode>/." "<location>/"
cp -Rn "<skill>/assets/viewer/." "<location>/design-system/"
```

GNU `cp` may warn that `-n` is non-portable; the warning is harmless.

Without a shell, copy the files one by one, byte for byte — do not retype or regenerate them. The icon SVGs,
`_runtime.js` and the component files must be exact copies.

Then go to step 5.

## 4. Update the viewer, if needed

For an already-initialised location, only the viewer files are considered: `index.html`, `_runtime.js` and
`_guide.md` in `<location>/design-system/`. They belong to the mechanism, not the project — as does anything in
`design-system/` whose name starts with `_`.

- If any is missing, copy it from `<skill>/assets/viewer/`.
- If any differs from the template, tell the user which runtime version they have and which the template carries
  (the `VERSION` line near the top of `_runtime.js`) and **ask** before replacing them. Replace them together,
  and only with their agreement.
- If all are the same, nothing changes.
- A project space from an earlier version may have `index.html`, `runtime/mockup.js` or `README.md` at its root
  and its mockups under `mockups/`. The first two are no longer used: tell the user they can be deleted, and
  delete them only if they agree. Mockups under `mockups/` still work where they are.

## 5. Confirm

Tell the user, briefly:

- the absolute path of the project space; whether it was newly initialised (and in which mode), already
  initialised, or had its viewer updated; and anything skipped because it already existed;
- that the design system is local — not connected to anything — and theirs to change; with **empty**, that it
  has no tokens or components yet, so it is ready to be synchronised or filled in;
- that mockups can go anywhere in the project space outside `design-system/`, and that
  `design-system/_guide.md` explains how to write them;
- how to view them — serve the project space, not `design-system/`:

  ```
  cd <location>
  python3 -m http.server 8000
  ```

  then open <http://localhost:8000/design-system/>. With **starter**, the examples are in `examples/` and can be
  deleted once they have served their purpose.

If you can run commands and the user wants you to, you may start the server for them in the background; opening
the page is theirs to do.
