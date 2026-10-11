// A static file server for one project space (specs/previewing.md, "Serving").
// No dependency on VS Code, so it can be tested on its own.
import { createReadStream } from 'node:fs';
import { readdir, realpath, stat } from 'node:fs/promises';
import { createServer, IncomingMessage, Server, ServerResponse } from 'node:http';
import { AddressInfo } from 'node:net';
import { extname, join, sep } from 'node:path';

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
};

const LOOPBACK = new Set(['127.0.0.1', 'localhost', '[::1]']);

export interface MockupServer {
  /** The server's origin, for example http://127.0.0.1:53124. */
  readonly origin: string;
  close(): Promise<void>;
}

export async function startServer(root: string): Promise<MockupServer> {
  const base = await realpath(root);
  const server = createServer((req, res) => {
    handle(base, req, res).catch(() => send(res, 500, 'Internal error'));
  });
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const { port } = server.address() as AddressInfo;
  return { origin: `http://127.0.0.1:${port}`, close: () => close(server) };
}

function close(server: Server): Promise<void> {
  return new Promise((resolve) => {
    server.close(() => resolve());
    server.closeAllConnections();
  });
}

async function handle(base: string, req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (!LOOPBACK.has(hostname(req.headers.host)))
    return send(res, 403, 'Forbidden');
  if ((req.method !== 'GET') && (req.method !== 'HEAD')) {
    res.setHeader('Allow', 'GET, HEAD');
    return send(res, 405, 'Method not allowed');
  }

  const url = new URL(req.url || '/', 'http://localhost');
  let pathname: string;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    return send(res, 400, 'Bad request');
  }
  if (pathname.includes('\0'))
    return send(res, 400, 'Bad request');

  const target = await resolveInside(base, join(base, pathname));
  if (!target)
    return send(res, 404, 'Not found');
  const info = await stat(target);

  if (info.isDirectory()) {
    if (!url.pathname.endsWith('/')) {
      res.setHeader('Location', url.pathname + '/' + url.search);
      return send(res, 301, 'Moved');
    }
    const index = await resolveInside(base, join(target, 'index.html'));
    if (index)
      return sendFile(req, res, index);
    return sendListing(req, res, target, pathname);
  }
  if (!info.isFile())
    return send(res, 404, 'Not found');
  return sendFile(req, res, target);
}

/** The real path of `path` if it exists and lies inside `base`, following symbolic links. */
async function resolveInside(base: string, path: string): Promise<string | undefined> {
  let real: string;
  try {
    real = await realpath(path);
  } catch {
    return undefined;
  }
  if ((real !== base) && !real.startsWith(base + sep))
    return undefined;
  return real;
}

function hostname(host: string | undefined): string {
  if (!host)
    return '';
  if (host.startsWith('['))
    return host.slice(0, host.indexOf(']') + 1);
  return host.split(':')[0].toLowerCase();
}

function headers(res: ServerResponse, type: string): void {
  res.setHeader('Content-Type', type);
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Content-Type-Options', 'nosniff');
}

function send(res: ServerResponse, status: number, message: string): void {
  if (res.headersSent) {
    res.destroy();
    return;
  }
  res.statusCode = status;
  headers(res, 'text/plain; charset=utf-8');
  res.end(message);
}

function sendFile(req: IncomingMessage, res: ServerResponse, path: string): void {
  headers(res, TYPES[extname(path).toLowerCase()] || 'application/octet-stream');
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  const stream = createReadStream(path);
  stream.on('error', () => send(res, 500, 'Internal error'));
  stream.pipe(res);
}

async function sendListing(req: IncomingMessage, res: ServerResponse, dir: string, pathname: string): Promise<void> {
  const entries = await readdir(dir, { withFileTypes: true });
  const links = entries
    .map((e) => (e.isDirectory() ? e.name + '/' : e.name))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => `<li><a href="${escape(encodeURIComponent(name.replace(/\/$/, '')) + (name.endsWith('/') ? '/' : ''))}">${escape(name)}</a></li>`);
  headers(res, 'text/html; charset=utf-8');
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  res.end(`<!doctype html>\n<meta charset="utf-8">\n<title>${escape(pathname)}</title>\n<ul>\n${links.join('\n')}\n</ul>\n`);
}

function escape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
