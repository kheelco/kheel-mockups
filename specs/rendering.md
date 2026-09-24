# Rendering

## Purpose

Mockups are viewed in a web browser, rendered directly from their XML and the design system's markdown. There is
no build step and nothing to install beyond a browser and a way to serve files. The same renderer can be served
by a remote system, so there is one implementation of rendering, not one per host.

## Parts

| File | Role |
| --- | --- |
| `design-system/index.html` | The viewer page. Loads the runtime and nothing else. |
| `design-system/_runtime.js` | The renderer and viewer, as one JavaScript module with no dependencies. |
| `design-system/_guide.md` | How to view and write mockups, for people and agents opening the folder. |

All three are copied into the project space by initialisation and belong to the mechanism, not the project. They
live inside the design system folder so that folder is all a project space needs; the leading `_` marks them as
the mechanism's ([design-system.md](design-system.md#files)). The runtime finds the design system as the folder
it is in, and the project space as the folder above.

## Serving

Browsers do not let a page opened from disk (`file://`) read other files, so the project space is served over
HTTP. Serve the **project space**, not the design system folder, since mockups sit beside the design system.
Any static file server works; one that is always available on macOS and most Linux systems:

```
cd <project-space>
python3 -m http.server 8000
```

Then open `http://localhost:8000/design-system/`. Opened from disk, the viewer shows these instructions instead
of a mockup.

## Addresses

| Address | Shows |
| --- | --- |
| `design-system/` | The catalogue: the design system's components (each rendered from its `Example`), icons, colour tokens, and the mockups in the project space. |
| `design-system/?m=<path>` | The mockup at `<path>`, relative to the project space — `?m=examples/jobs.xml`. |
| `…&state=<state>` | That page state of the mockup (`jobs.<state>.xml`). Opening a state file directly (`?m=jobs.empty.xml`) goes to its base mockup with that state selected, so the state tabs show. |
| `…&inspect` | The mockup in inspect mode. |

The catalogue finds mockups by walking the server's directory listings from the project space's root, up to four
folders deep. It skips `design-system/`, folders whose names start with `.` or `_`, and `node_modules`, and it
lists only `.xml` files whose root element is `<mockup>`. A server without directory listings shows the catalogue
without that list. Page-state siblings
are listed under their base mockup rather than on their own.

## Rendering a mockup

1. Load the manifest, the token file's `css` blocks, and every component listed in the manifest.
2. Register each component as a custom element ([components.md](components.md#rendering)).
3. Fetch and parse the mockup as XML. A parse error is shown with its line and column, and nothing is rendered.
4. Resolve `<include>` elements.
5. Take out `<specification>` elements, attaching each to the element it describes.
6. Build the page from the result, applying layout and spacing attributes.
7. Frame it by its type ([mockups.md](mockups.md#frames)).
8. Check it, and list any warnings.

## The viewer

Around the rendered mockup, the viewer adds a thin bar with:

- the mockup's title and type, and the design system's name and version;
- a tab for each page state, when the mockup has any;
- an **Inspect** toggle;
- the number of warnings, opening the list;
- a link back to the catalogue.

The bar and its panels are isolated from the mockup's styles and do not affect its layout.

**Navigation.** `href` moves to another mockup and updates the address, so the browser's back button works.
`opens` loads a dialog mockup into an overlay; `closes`, the scrim or the Escape key close it.

**Inspect mode** outlines every component and labels it with its tag on hover, outlines custom regions
([mockups.md](mockups.md#custom-regions)) in a second colour, marks every element that has a specification with a
numbered badge, and opens a side panel listing the mockup's own specification, each numbered specification, the
custom regions with their reasons, and the warnings.

A mockup's `<style>` element is applied while the mockup (or dialog) is shown, and removed with it.

## Checks

The renderer warns about the following, rendering what it can regardless:

| Check | Example |
| --- | --- |
| Unknown component | A tag with the design system's prefix that is not in the manifest. |
| Unknown property | An attribute that is neither a property of the component nor a mockup attribute. |
| Value out of range | `variant="primry"` where the values are `primary, secondary, ghost, danger`. |
| Unknown state | `state="pressed"` on a component with no `pressed` state. |
| Slot does not accept | A `ui-card` placed directly in a `ui-nav`. |
| Missing target | `href` or `opens` pointing at a mockup that does not exist; a `states` entry without its sibling file. |
| Not a spacing step | A margin or `gap` value that is not one of `0, 1, 2, 3, 4, 5, 6, 8, 10, 12` (or `auto` for margins). |
| Missing icon | An icon name not in the manifest's icon list. |
| Inline style | A `style` attribute outside a custom region. |
| Custom region without a reason | `custom=""`. |
| Misplaced style | A `<style>` element that is not a direct child of `<mockup>`. |
| Token table out of step | A token a component's style uses that its `Tokens` table doesn't list, a listed token the style doesn't use, a semantic token `tokens.md` doesn't define. |
| Version mismatch | A manifest row whose version differs from the component's file; a mockup whose `design-system` major version differs from the manifest's. |
| Missing root attributes | A mockup without `type` or `title`. |

Warnings appear in the viewer and in the browser console, prefixed `[mockup]`, so an agent driving a browser can
read them. The catalogue also checks every component's `Example`, which makes it the quickest check of the design
system itself.

## Compatibility

The runtime uses standard browser features only: ES modules, custom elements, shadow DOM, `DOMParser`, `fetch`.
It supports current versions of Chrome, Edge, Firefox and Safari.
