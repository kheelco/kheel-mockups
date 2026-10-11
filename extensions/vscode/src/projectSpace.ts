// Finding the project space a file belongs to (specs/previewing.md, "Finding the project space").
// No dependency on VS Code, so it can be tested on its own.
import { existsSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';

export const DESIGN_SYSTEM = 'design-system';

/** The nearest folder at or above `path` that holds design-system/README.md, or undefined. */
export function findProjectSpace(path: string): string | undefined {
  let dir = path;
  for (;;) {
    if (existsSync(join(dir, DESIGN_SYSTEM, 'README.md'))) return dir;
    const parent = dirname(dir);
    if (parent === dir) return undefined;
    dir = parent;
  }
}

/** Whether the project space has a viewer to show. */
export function hasViewer(root: string): boolean {
  return existsSync(join(root, DESIGN_SYSTEM, 'index.html'));
}

/** The file's path from the project space, with forward slashes. */
export function relativePath(root: string, file: string): string {
  return relative(root, file).split(sep).join('/');
}

/** Whether `file` (inside `root`) is in the design system rather than a mockup. */
export function inDesignSystem(root: string, file: string): boolean {
  const rel = relativePath(root, file);
  return (rel === DESIGN_SYSTEM) || rel.startsWith(DESIGN_SYSTEM + '/');
}

/** The viewer address, from the project space's root, for a file: the mockup, or the catalogue. */
export function viewerPath(root: string, file?: string): string {
  if (!file || !file.endsWith('.xml') || inDesignSystem(root, file)) return `${DESIGN_SYSTEM}/`;
  const rel = relativePath(root, file).split('/').map(encodeURIComponent).join('/');
  return `${DESIGN_SYSTEM}/?m=${rel}`;
}
