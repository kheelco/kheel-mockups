---
name: mockup-publish
description: Publishes mockups from a project space as a private claude.ai artifact, or updates one. Use when asked to publish, share, host or refresh mockups so they can be viewed without a local server.
---

# Publish mockups as an artifact

The mockup viewer (`design-system/index.html` + `_runtime.js`) normally runs from a local server over the whole
project space, the folder that holds `design-system/` and the mockups. An artifact can hold at most 255 files, and
a design system alone can be more than half of that, so publishing uses a staged copy: the runtime, the design
system packed into one `_bundle.json`, the mockup folders asked for, and the files from elsewhere that their
mockups need.

`scripts/mockup-bundle.py`, in this skill's folder, builds the staged copy. Below, `<script>` means that file's
path, and `<scratchpad>` the session's scratchpad directory (or another temporary folder).

## Steps

1. **Find the project space and the record.** The project space is the folder holding `design-system/`. The
   record of published artifacts is `PUBLISHED.md` in the project space; if it doesn't exist, create it when
   you publish the first set (a short intro and a table: Mockups | Folders | Artifact).

2. **Stage.** Stage the folders the user named (relative to the project space, e.g. `authentication`), and only
   those: don't add folders to fix what the script reports, as it already brings in what the mockups need. If
   the user named none, ask which, offering the project's folders. Run, from the repository root:

   ```sh
   python3 <script> --stage <scratchpad>/mockups-<name> authentication [more folders]
   ```

   The script finds the design system under the current directory (pass `--ds <path>` if there is more than
   one) and stops if the runtime can't read a bundle (see below). It writes `<scratchpad>/mockups-<name>/`
   (the start page `index.html`, `design-system/_runtime.js`, `design-system/_bundle.json`, the folders'
   mockups and images, and their dependencies) and `<scratchpad>/mockups-<name>.files.json`, a map from each
   published path to its staged file. `--title` sets the page title (default: "Authentication Mockups" and so
   on). It prints:
   - the file count. It stops if this is over 255; stage fewer folders, or ask the user which to leave out.
   - **Brought in from outside**: the dependencies it staged, each with the mockup that needs it.
   - **Links to mockups not staged**: `href`s leading out of the staged set. In the published page they warn
     "no such mockup" and go nowhere. Tell the user which they are; if they want them to work, run again with
     `--follow-links`, which stages those mockups too (with what they need, but not where *their* links lead).
   - **Missing**: references to files that don't exist. They are broken in the project space too; mention them.

3. **Publish.** Call the Artifact tool with `file_path` = the staged `index.html` and `files` = the contents of
   the `.files.json` map, exactly as written.
   - **New artifact:** also pass `icon: "layout"` and a one-sentence `description` naming the screens. Add a
     row for it to `PUBLISHED.md`.
   - **Update:** pass `url` from `PUBLISHED.md` (or find it with the Artifact tool's `list`), and read the
     artifact first as the tool requires. List its files (`scope: "files"`) and add `null` to `files` for every
     published path the new map no longer has, so removed mockups don't linger.

4. **Report** the link, and the links that lead out of the published set, if any. Mockups open from the catalogue, or directly with `?m=<folder>/<file>.xml` added to the
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
- **Dependencies.** The script reads every staged mockup and follows what it can't work without: sections it
  includes, dialogs it opens, its state files (`jobs.empty.xml` for `states="empty"`) and images given from the
  site root, and then what those need in turn. Each is staged as a single file, not with its folder. Links
  (`href`, and component properties that hold a mockup's path) are where a reader may go next, not part of the
  mockup, so they aren't followed unless `--follow-links` asks for one step of them; following them all would
  usually stage the whole project.
- **Catalogue.** The catalogue lists only the mockups in the named folders (leaving out subfolders whose names
  start with `_` or `.`, as the viewer does locally). Dependencies are staged but not listed, so the page stays
  about the folders asked for; they open from the mockups that use them, or with `?m=`.
- **Image paths.** Mockups may point at images from the site root (`src="/authentication/img/logo.svg"`). The
  staged copies make those relative, since an artifact isn't served from the host's root. Images given another
  way (`src="img/logo.svg"`) resolve against the viewer's page, not the mockup, so they aren't followed. The
  project's own mockups are never changed.
