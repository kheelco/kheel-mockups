import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { request } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { MockupServer, startServer } from '../src/server';

const top = mkdtempSync(join(tmpdir(), 'km-server-'));
const space = join(top, 'space');
mkdirSync(join(space, 'design-system', 'assets'), { recursive: true });
mkdirSync(join(space, 'organisation'), { recursive: true });
mkdirSync(join(space, 'a b'), { recursive: true });
writeFileSync(join(space, 'design-system', 'index.html'), '<!doctype html><title>viewer</title>');
writeFileSync(join(space, 'design-system', '_runtime.js'), 'export const VERSION = "0";');
writeFileSync(join(space, 'design-system', 'assets', 'x.svg'), '<svg/>');
writeFileSync(join(space, 'organisation', 'users.xml'), '<mockup/>');
writeFileSync(join(space, 'a b', 'c&d.xml'), '<mockup/>');
writeFileSync(join(top, 'secret.txt'), 'secret');
symlinkSync(join(top, 'secret.txt'), join(space, 'link.txt'));

let server: MockupServer;
beforeAll(async () => { server = await startServer(space); });
afterAll(async () => {
  await server.close();
  rmSync(top, { recursive: true, force: true });
});

interface Reply { status: number; headers: Record<string, string | string[] | undefined>; body: string }

/** A raw request, so paths reach the server exactly as written (fetch would normalise `..`). */
function get(path: string, options: { method?: string; host?: string } = {}): Promise<Reply> {
  const { port } = new URL(server.origin);
  return new Promise((resolve, reject) => {
    const req = request({ host: '127.0.0.1', port, path, method: options.method || 'GET',
      headers: { host: options.host || `127.0.0.1:${port}` } }, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode!, headers: res.headers, body }));
    });
    req.on('error', reject);
    req.end();
  });
}

describe('server', () => {
  it('listens on loopback', () => {
    expect(server.origin).toMatch(/^http:\/\/127\.0\.0\.1:\d+$/);
  });

  it("serves a folder's index.html", async () => {
    const r = await get('/design-system/?m=organisation/users.xml');
    expect(r.status).toBe(200);
    expect(r.headers['content-type']).toMatch(/^text\/html/);
    expect(r.body).toContain('viewer');
  });

  it('redirects a folder without its trailing slash, keeping the query', async () => {
    const r = await get('/design-system?m=x.xml');
    expect(r.status).toBe(301);
    expect(r.headers.location).toBe('/design-system/?m=x.xml');
  });

  it('serves files with the types the viewer needs, uncached', async () => {
    const js = await get('/design-system/_runtime.js');
    expect(js.headers['content-type']).toMatch(/^text\/javascript/);
    expect(js.headers['cache-control']).toBe('no-cache');
    expect((await get('/organisation/users.xml')).headers['content-type']).toMatch(/^application\/xml/);
    expect((await get('/design-system/assets/x.svg')).headers['content-type']).toBe('image/svg+xml');
  });

  it('lists a folder without index.html, folders ending in a slash', async () => {
    const r = await get('/');
    expect(r.status).toBe(200);
    expect(r.body).toContain('<a href="design-system/">design-system/</a>');
    expect(r.body).toContain('<a href="organisation/">organisation/</a>');
    expect(r.body).toContain('<a href="a%20b/">a b/</a>');
  });

  it('encodes and escapes names in a listing', async () => {
    const r = await get('/a%20b/');
    expect(r.body).toContain('<a href="c%26d.xml">c&amp;d.xml</a>');
  });

  it('answers HEAD without a body, and 404 for a missing file', async () => {
    const r = await get('/organisation/users.xml', { method: 'HEAD' });
    expect(r.status).toBe(200);
    expect(r.body).toBe('');
    expect((await get('/organisation/missing.xml', { method: 'HEAD' })).status).toBe(404);
  });

  it('refuses other methods', async () => {
    expect((await get('/organisation/users.xml', { method: 'POST' })).status).toBe(405);
  });

  it('serves nothing outside the project space', async () => {
    expect((await get('/../secret.txt')).status).toBe(404);
    expect((await get('/%2e%2e/secret.txt')).status).toBe(404);
    expect((await get('/link.txt')).status).toBe(404);
  });

  it('refuses a Host that is not loopback', async () => {
    expect((await get('/', { host: 'evil.example:80' })).status).toBe(403);
    expect((await get('/', { host: 'localhost:1234' })).status).toBe(200);
  });
});
