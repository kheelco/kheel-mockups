import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { findProjectSpace, hasViewer, inDesignSystem, viewerPath } from '../src/projectSpace';

const top = mkdtempSync(join(tmpdir(), 'km-space-'));
const space = join(top, 'specs', 'design');
mkdirSync(join(space, 'design-system', 'components'), { recursive: true });
mkdirSync(join(space, 'organisation'), { recursive: true });
writeFileSync(join(space, 'design-system', 'README.md'), '# Design system');
mkdirSync(join(top, 'other'), { recursive: true });

afterAll(() => rmSync(top, { recursive: true, force: true }));

describe('findProjectSpace', () => {
  it('finds the nearest initialised folder above a mockup', () => {
    expect(findProjectSpace(join(space, 'organisation'))).toBe(space);
  });

  it('finds the project space from inside the design system', () => {
    expect(findProjectSpace(join(space, 'design-system', 'components'))).toBe(space);
  });

  it('finds none outside a project space', () => {
    expect(findProjectSpace(join(top, 'other'))).toBeUndefined();
  });
});

describe('hasViewer', () => {
  it('needs design-system/index.html', () => {
    expect(hasViewer(space)).toBe(false);
    writeFileSync(join(space, 'design-system', 'index.html'), '<!doctype html>');
    expect(hasViewer(space)).toBe(true);
  });
});

describe('viewerPath', () => {
  it('addresses a mockup by its path from the project space', () => {
    expect(viewerPath(space, join(space, 'organisation', 'users.xml'))).toBe('design-system/?m=organisation/users.xml');
  });

  it('keeps a page-state file as it is, for the viewer to resolve', () => {
    expect(viewerPath(space, join(space, 'organisation', 'users.no-results.xml')))
      .toBe('design-system/?m=organisation/users.no-results.xml');
  });

  it('encodes each segment', () => {
    expect(viewerPath(space, join(space, 'a b', 'c&d.xml'))).toBe('design-system/?m=a%20b/c%26d.xml');
  });

  it('opens the catalogue for design-system files, other files and no file', () => {
    expect(viewerPath(space, join(space, 'design-system', 'components', 'ui-card.md'))).toBe('design-system/');
    expect(viewerPath(space, join(space, 'design-system', 'x.xml'))).toBe('design-system/');
    expect(viewerPath(space, join(space, 'README.md'))).toBe('design-system/');
    expect(viewerPath(space)).toBe('design-system/');
  });

  it('does not take a folder that merely starts with design-system for the design system', () => {
    expect(inDesignSystem(space, join(space, 'design-system-old', 'a.xml'))).toBe(false);
    expect(viewerPath(space, join(space, 'design-system-old', 'a.xml'))).toBe('design-system/?m=design-system-old/a.xml');
  });
});
