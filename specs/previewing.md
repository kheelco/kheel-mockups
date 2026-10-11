# Previewing

## Purpose

Mockups are written in an editor and viewed in a browser ([rendering.md](rendering.md)). **Previewing** puts the
viewer beside the file being edited, so a change shows as soon as it is saved, without starting a server or
switching to a browser. It is offered as an editor extension; the first is for Visual Studio Code
(`extensions/vscode/`).

The previewer is a host for the viewer, not a second renderer. It serves the project space and shows the project
space's own `design-system/index.html`, so what it shows is exactly what a browser shows, with the viewer version
the project space has. It carries no copy of the viewer, and depends only on the addresses and serving rules in
[rendering.md](rendering.md).

## Finding the project space

A file belongs to the project space of the nearest folder above it (or the folder itself) that is initialised,
that is, that holds `design-system/README.md` ([project-space.md](project-space.md#layout)). A file with no such
folder above it is not in a project space and is not previewed.

A file is a **mockup** when it is an `.xml` file in a project space and not inside its `design-system/` folder. The
previewer does not open the file to check its root element; the viewer reports a file that is not a mockup.

A project space without `design-system/index.html` has no viewer; the previewer says so instead of showing a page.

## Serving

The previewer serves each project space it shows with a static file server of its own:

- bound to the loopback interface (`127.0.0.1`) on a free port, and refusing requests whose `Host` is not a
  loopback name (`127.0.0.1`, `localhost`, `[::1]`), so that a web page cannot reach it through DNS rebinding;
- serving only files inside the project space, after resolving symbolic links;
- answering `GET` and `HEAD` (the viewer checks that files exist with `HEAD`), with `Cache-Control: no-cache` so
  every load reads the files as they are on disk;
- with the content type of each file the viewer reads: `text/javascript` for `.js` (the runtime is an ES module),
  `application/xml` for `.xml`, `text/markdown` for `.md`, `image/svg+xml` for `.svg`, and so on;
- serving a folder's `index.html` for the folder's address, and otherwise a **directory listing**: an HTML page
  with one `<a href>` per entry, relative to the folder, folders ending in `/`. The catalogue finds mockups by
  walking these listings ([rendering.md](rendering.md#addresses)); without them it lists none. An address of a
  folder without its trailing `/` is redirected to the address with it.

A server starts when its project space is first shown and stops when the preview closes.

## Behaviour

| Action | Result |
| --- | --- |
| **Open Preview to the Side**, on a mockup | Opens the preview beside the editor at `design-system/?m=<path>`, `<path>` being the mockup's path from the project space. On a file inside `design-system/`, opens the catalogue. |
| **Open Catalogue** | Opens the preview at `design-system/` for the project space of the active file. |
| **Open in Browser** | Opens the preview's current address in the system browser. |
| Making another mockup the active editor, while the preview is open | The preview moves to that mockup, starting its project space's server if it is another project space. Other files leave the preview where it is. |
| Any file in the shown project space created, changed or deleted on disk | The preview reloads its address, once per burst of changes (debounced). Changes made outside the editor, by an agent for example, count too. |

There is one preview at a time. Moving within the viewer (following an `href`, a state tab, **Inspect**) happens
inside the preview; a reload returns to the address the previewer last set, since the preview cannot read the
viewer's address.

## Not in this version

- Showing unsaved changes. This needs the viewer to accept a mockup's source from its host, a change to the
  runtime.
- Keeping the viewer's own address (state tab, **Inspect**) across a reload. This needs the viewer to report its
  address to its host.

Both are additions to the viewer that would do nothing in a browser; the previewer would use them only when the
viewer announces that it has them.
