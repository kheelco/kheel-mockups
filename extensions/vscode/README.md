# Kheel Mockup Preview

A Visual Studio Code extension that shows a mockup project space's viewer beside the mockup you are editing, and
reloads it whenever a file in the project space changes, whether you saved it or an agent wrote it.

It serves the project space itself and shows the project space's own `design-system/index.html`, so the preview
is exactly what a browser shows, with that project space's viewer. There is nothing to start. See
[specs/previewing.md](../../specs/previewing.md) for how it behaves.

## Using it

Open a mockup (an `.xml` file in a folder whose `design-system/` holds a `README.md`) and click the preview icon
in the editor's title bar, or run **Mockups: Open Preview to the Side**.

| Command | Does |
| --- | --- |
| **Mockups: Open Preview to the Side** | Opens the preview beside the editor on the active mockup (also in the Explorer's context menu for `.xml` files). |
| **Mockups: Open Catalogue** | Opens the catalogue of the active file's project space. |
| **Mockups: Open Preview in Browser** | Opens what the preview shows in your browser, for a full-width look. |

While the preview is open it follows the active editor from mockup to mockup. Links, dialogs, state tabs and
**Inspect** work inside it as in a browser; a reload goes back to the mockup the editor last showed.

Not yet: previewing unsaved changes, and keeping the state tab or **Inspect** across a reload.

## Installing

Build the package from the repository root:

```
./scripts/package-extension.sh        # → extensions/vscode/dist/kheel-mockup-preview-<version>.vsix
```

then install it with **Extensions: Install from VSIX…** in VS Code, or from a terminal with
`code --install-extension extensions/vscode/dist/kheel-mockup-preview-<version>.vsix`. Reload the window
afterwards. Install a newer `.vsix` over it to update; uninstall from the Extensions view.

## Developing

```
cd extensions/vscode
npm install
npm test           # unit tests: the server and finding the project space
npm run check      # type-check
```

Open `extensions/vscode` in VS Code and press **F5** (*Run extension on target/*) to start an Extension
Development Host on the repository's `target/` (fill it first with `./scripts/init-target.sh`); *Run extension on
a folder…* asks for another folder. Keep `npm run watch` running and reload the host window (**Developer: Reload
Window**) to pick up changes.

The source is in `src/`: `extension.ts` (commands and following the editor), `previewPanel.ts` (the webview),
`server.ts` (the static server) and `projectSpace.ts` (finding the project space). The last two do not depend on
VS Code and are what the tests cover.
