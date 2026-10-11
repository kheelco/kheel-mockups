// Kheel Mockup Preview: shows a project space's viewer beside the mockup being edited (specs/previewing.md).
import { dirname } from 'node:path';
import * as vscode from 'vscode';
import { PreviewPanel } from './previewPanel';
import { findProjectSpace, inDesignSystem } from './projectSpace';

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand('kheelMockups.openPreview', (uri?: vscode.Uri) => open(uri, false)),
    vscode.commands.registerCommand('kheelMockups.openCatalogue', (uri?: vscode.Uri) => open(uri, true)),
    vscode.commands.registerCommand('kheelMockups.openInBrowser', () => PreviewPanel.openInBrowser()),
    vscode.window.onDidChangeActiveTextEditor((editor) => activeChanged(editor)),
  );
  activeChanged(vscode.window.activeTextEditor);
}

export function deactivate(): void {}

/** The file of `uri`, or of the active editor, with its project space. */
function locate(uri?: vscode.Uri): { file: string; root: string | undefined } | undefined {
  const target = uri ?? vscode.window.activeTextEditor?.document.uri;
  if (!target || (target.scheme !== 'file'))
    return undefined;
  return { file: target.fsPath, root: findProjectSpace(dirname(target.fsPath)) };
}

async function open(uri: vscode.Uri | undefined, catalogue: boolean): Promise<void> {
  const located = locate(uri);
  if (!located?.root) {
    vscode.window.showWarningMessage('Open a file in a mockup project space (a folder with design-system/README.md) first.');
    return;
  }
  await PreviewPanel.show(located.root, catalogue ? undefined : located.file);
}

function isMockup(root: string | undefined, file: string): boolean {
  return !!root && file.endsWith('.xml') && !inDesignSystem(root, file);
}

/** Keeps the menu conditions up to date, and moves an open preview to the active mockup. */
function activeChanged(editor: vscode.TextEditor | undefined): void {
  const located = editor ? locate(editor.document.uri) : undefined;
  const mockup = !!located && isMockup(located.root, located.file);
  vscode.commands.executeCommand('setContext', 'kheelMockups.inProjectSpace', !!located?.root);
  vscode.commands.executeCommand('setContext', 'kheelMockups.isMockup', mockup);
  if (mockup)
    PreviewPanel.follow(located!.root!, located!.file);
}
