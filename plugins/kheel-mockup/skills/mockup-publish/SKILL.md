---
name: mockup-publish
description: Publishes mockups from a project space as a private claude.ai artifact, or updates one. Use when asked to publish, share, host or refresh mockups so they can be viewed without a local server.
---

# Publish mockups as an artifact

The mockup viewer (`design-system/index.html` + `_runtime.js`) normally runs from a local server over the whole
project space, the folder that holds `design-system/` and the mockups. An artifact can hold at most 255 files, and
a design system alone can be more than half of that, so publishing uses a staged copy: the runtime, the design
system packed into one `_bundle.json`, and only the mockup folders asked for.

`scripts/mockup-bundle.py`, in this skill's folder, builds the staged copy. Below, `<script>` means that file's
path, and `<scratchpad>` the session's scratchpad directory (or another temporary folder).

## Steps

1. **Find the project space and the record.** The project space is the folder holding `design-system/`. The
   record of published artifacts is `PUBLISHED.md` in the project space; if it doesn't exist, create it when
   you publish the first set (a short intro and a table: Mockups | Folders | Artifact).

2. **Stage.** Pick the mockup folders (relative to the project space, e.g. `authentication`) and run, from the
   repository root:

   ```sh
   python3 <script> --stage <scratchpad>/mockups-<name> authentication [more folders]
   ```

   The script finds the design system under the current directory (pass `--ds <path>` if there is more than
   one) and stops if the runtime can't read a bundle (see below). It writes `<scratchpad>/mockups-<name>/`
   (the start page `index.html`, `design-system/_runtime.js`, `design-system/_bundle.json`, the folders'
   mockups and images) and `<scratchpad>/mockups-<name>.files.json`, a map from each published path to its
   staged file. It prints the file count; keep it under 255. `--title` sets the page title (default:
   "Authentication Mockups" and so on).

3. **Publish.** Call the Artifact tool with `file_path` = the staged `index.html` and `files` = the contents of
   the `.files.json` map, exactly as written.
   - **New artifact:** also pass `icon: "layout"` and a one-sentence `description` naming the screens. Add a
     row for it to `PUBLISHED.md`.
   - **Update:** pass `url` from `PUBLISHED.md` (or find it with the Artifact tool's `list`), and read the
     artifact first as the tool requires. List its files (`scope: "files"`) and add `null` to `files` for every
     published path the new map no longer has, so removed mockups don't linger.

4. **Report** the link. Mockups open from the catalogue, or directly with `?m=<folder>/<file>.xml` added to the
   page address. If `PUBLISHED.md` changed, it needs committing like any other change.

To check a staged copy before publishing, serve the staged folder (`python3 -m http.server` inside it) and open
it in a browser: it behaves like the published page.

## How it works, and what breaks it

- **Bundle.** When `design-system/_bundle.json` is present, the runtime reads the manifest, tokens, components
  and icons from it, not from the separate files. The script inlines fonts as data URIs. The bundle is a
  snapshot, so always re-stage after the design system changes, and never commit it.
- **Runtime support.** Only a runtime that looks for `_bundle.json` (viewer 0.6.0 or later) can use the bundle;
  the script checks for this and stops if it's missing. A project space set up with an older viewer needs its
  viewer updated before publishing.
- **Mockup list.** The runtime finds mockups by reading the server's directory listings, which an artifact host
  doesn't have. The start page carries hidden links to every staged mockup, which the runtime reads in their
  place.
- **Image paths.** Mockups may point at images from the site root (`src="/authentication/img/logo.svg"`). The
  staged copies make those relative, since an artifact isn't served from the host's root. An image outside the
  staged folders stays broken: stage its folder too. The project's own mockups are never changed.
