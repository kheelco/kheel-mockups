// The preview: a webview holding the project space's viewer in an iframe (specs/previewing.md, "Behaviour").
import { randomBytes } from 'node:crypto';
import { basename } from 'node:path';
import * as vscode from 'vscode';
import { hasViewer, viewerPath } from './projectSpace';
import { MockupServer, startServer } from './server';

const RELOAD_DELAY_MS = 200;

export class PreviewPanel {
  private static current: PreviewPanel | undefined;

  private readonly servers = new Map<string, Promise<MockupServer>>();
  private watcher: vscode.FileSystemWatcher | undefined;
  private reloadTimer: NodeJS.Timeout | undefined;
  private root: string | undefined;
  private path: string | undefined;
  private address: vscode.Uri | undefined;
  private renders = 0;

  /** Shows `file` (a mockup, or anything else for the catalogue) of the project space at `root`. */
  static async show(root: string, file: string | undefined): Promise<void> {
    if (!PreviewPanel.current) {
      const panel = vscode.window.createWebviewPanel('kheelMockups.preview', 'Mockup preview',
        { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
        { enableScripts: true, retainContextWhenHidden: true });
      PreviewPanel.current = new PreviewPanel(panel);
    }
    await PreviewPanel.current.navigate(root, file);
  }

  /** Moves an open preview to `file`; does nothing when no preview is open. */
  static async follow(root: string, file: string): Promise<void> {
    if (PreviewPanel.current)
      await PreviewPanel.current.navigate(root, file, true);
  }

  static openInBrowser(): void {
    if (PreviewPanel.current?.address)
      vscode.env.openExternal(PreviewPanel.current.address);
  }

  private constructor(private readonly panel: vscode.WebviewPanel) {
    panel.onDidDispose(() => this.dispose());
  }

  private async navigate(root: string, file: string | undefined, onlyIfMoved = false): Promise<void> {
    const path = viewerPath(root, file);
    if (onlyIfMoved && (this.root === root) && (this.path === path))
      return;
    this.path = path;
    this.panel.reveal(undefined, true);
    this.panel.title = file && file.endsWith('.xml') ? `Preview ${basename(file)}` : 'Mockup catalogue';
    if (!hasViewer(root)) {
      this.root = undefined;
      this.address = undefined;
      this.watch(undefined);
      this.panel.webview.html = message(`${root} is a project space without a viewer: design-system/index.html is missing.`);
      return;
    }
    let server: MockupServer;
    try {
      server = await this.server(root);
    } catch (e) {
      this.panel.webview.html = message(`Could not start a server for ${root}: ${e}`);
      return;
    }
    const local = vscode.Uri.parse(`${server.origin}/${path}`);
    this.address = await vscode.env.asExternalUri(local);
    if (this.root !== root) {
      this.root = root;
      this.watch(root);
    }
    this.render();
  }

  private server(root: string): Promise<MockupServer> {
    let server = this.servers.get(root);
    if (!server) {
      server = startServer(root);
      this.servers.set(root, server);
      server.catch(() => this.servers.delete(root));
    }
    return server;
  }

  /** Reloads the preview whenever anything in the project space changes on disk. */
  private watch(root: string | undefined): void {
    this.watcher?.dispose();
    this.watcher = undefined;
    if (!root)
      return;
    this.watcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(vscode.Uri.file(root), '**/*'));
    const changed = (uri: vscode.Uri) => {
      if (/[\\/](\.git|node_modules)[\\/]/.test(uri.fsPath))
        return;
      clearTimeout(this.reloadTimer);
      this.reloadTimer = setTimeout(() => this.render(), RELOAD_DELAY_MS);
    };
    this.watcher.onDidChange(changed);
    this.watcher.onDidCreate(changed);
    this.watcher.onDidDelete(changed);
  }

  /** Loads the current address afresh (the count makes the HTML differ, so the webview always reloads it). */
  private render(): void {
    if (!this.address)
      return;
    const url = this.address.toString(true);
    const origin = `${this.address.scheme}://${this.address.authority}`;
    const nonce = randomBytes(16).toString('base64');
    this.panel.webview.html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src ${origin}; style-src 'nonce-${nonce}';">
<style nonce="${nonce}">html, body, iframe { margin: 0; padding: 0; border: 0; width: 100%; height: 100%; overflow: hidden; display: block; } body { background: #fff; }</style>
</head>
<body>
<iframe src="${escape(url)}" title="Mockup preview"></iframe>
<!-- ${++this.renders} -->
</body>
</html>`;
  }

  private dispose(): void {
    PreviewPanel.current = undefined;
    clearTimeout(this.reloadTimer);
    this.watcher?.dispose();
    for (const server of this.servers.values())
      server.then((s) => s.close(), () => undefined);
    this.servers.clear();
  }
}

function message(text: string): string {
  return `<!doctype html><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline';">
<p style="font: 14px/1.5 system-ui, sans-serif; margin: 24px; color: var(--vscode-foreground)">${escape(text)}</p>`;
}

function escape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
