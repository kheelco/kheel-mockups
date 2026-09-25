#!/usr/bin/env python3
"""Package the mockup viewer for hosts that serve few files, such as a claude.ai artifact.

Works on any mockup project space: a folder holding design-system/ (with the viewer's _runtime.js) and the
mockups. The design system is found under the current directory unless --ds names it, and the runtime must be one
that reads _bundle.json.

Bundle only: writes design-system/_bundle.json, the design system's text files in one file. The runtime uses the
bundle when it's present and the separate files otherwise. Fonts and other files that CSS points to with url(...)
are inlined as data URIs.

    python3 mockup-bundle.py

Stage: builds a folder ready to publish, holding a start page (index.html), the runtime, the bundle, and the
mockups and images of the named folders (relative to the project space, e.g. authentication). Root-relative
src paths in the mockups ("/authentication/img/logo.svg") are made relative, because the host's root isn't the
project space. Also writes <out dir>.files.json, mapping each published path to its staged file, for the publish.

    python3 mockup-bundle.py --stage <out dir> authentication [more folders]

The bundle is a snapshot: rebuild it after changing the design system, and don't commit it.
"""
import argparse
import base64
import html
import json
import mimetypes
import re
import shutil
from pathlib import Path

INCLUDE = ['*.md', 'components/*.md', 'assets/icons/*.svg']
SKIP = {'_guide.md'}
URL_RE = re.compile(r"""url\(\s*(['"]?)([^'")]+)\1\s*\)""")
SRC_RE = re.compile(r'\bsrc="/([^"]+)"')
SKIP_DIRS = {'.git', 'node_modules'}
MIME = {'.woff2': 'font/woff2', '.woff': 'font/woff', '.svg': 'image/svg+xml'}


def inline_urls(text, ds):
    def sub(m):
        ref = m.group(2)
        path = (ds / ref).resolve()
        if re.match(r'^[a-z]+:|^/|^#', ref) or not path.is_file():
            return m.group(0)
        mime = MIME.get(path.suffix) or mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
        return f"url('data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}')"
    return URL_RE.sub(sub, text)


def build_bundle(ds, out):
    files = {}
    for pattern in INCLUDE:
        for path in sorted(ds.glob(pattern)):
            if path.name in SKIP:
                continue
            text = path.read_text(encoding='utf-8')
            files[path.relative_to(ds).as_posix()] = inline_urls(text, ds) if path.suffix == '.md' else text
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps({'files': files}, ensure_ascii=False), encoding='utf-8')
    print(f'{out}: {len(files)} files, {out.stat().st_size // 1024} KB')


def stage(ds, out, folders, title):
    project = ds.parent
    if out.exists():
        shutil.rmtree(out)
    staged = {}  # published path -> staged file

    def put(rel, data):
        dest = out / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        (dest.write_text if isinstance(data, str) else dest.write_bytes)(data)
        staged[rel] = str(dest)

    ds_rel = ds.relative_to(project).as_posix()
    put(f'{ds_rel}/_runtime.js', (ds / '_runtime.js').read_text(encoding='utf-8'))
    build_bundle(ds, out / ds_rel / '_bundle.json')
    staged[f'{ds_rel}/_bundle.json'] = str(out / ds_rel / '_bundle.json')

    mockups = []
    for folder in folders:
        src = (project / folder).resolve()
        if not src.is_dir() or project not in src.parents:
            raise SystemExit(f'{folder}: not a folder in {project}')
        for path in sorted(p for p in src.rglob('*') if p.is_file()):
            rel = path.relative_to(project).as_posix()
            if path.suffix == '.xml':
                text = SRC_RE.sub(lambda m: f'src="{m.group(1)}"' if (project / m.group(1)).is_file() else m.group(0),
                                  path.read_text(encoding='utf-8'))
                put(rel, text)
                mockups.append(rel)
            else:
                put(rel, path.read_bytes())

    # The runtime lists mockups by reading the server's directory listings. An artifact host has none, but the
    # runtime reads the project root too, which serves this page, so these hidden links stand in for a listing.
    links = '\n'.join(f'  <a href="{html.escape(m)}">{html.escape(m)}</a>' for m in mockups)
    (out / 'index.html').write_text(
        f'<title>{html.escape(title)}</title>\n'
        f'<script type="module" src="{ds_rel}/_runtime.js"></script>\n'
        f'<nav hidden aria-hidden="true">\n{links}\n</nav>\n', encoding='utf-8')

    manifest = out.parent / f'{out.name}.files.json'
    manifest.write_text(json.dumps(staged, indent=1), encoding='utf-8')
    print(f'{out}: index.html + {len(staged)} files ({len(mockups)} mockups); publish map in {manifest}')


def find_ds(start):
    # A design system has its manifest beside the runtime; a staged copy (runtime and bundle only) doesn't.
    found = [p.parent for p in start.rglob('design-system/_runtime.js')
             if not SKIP_DIRS & set(p.parts) and (p.parent / 'README.md').is_file()]
    if len(found) == 1:
        return found[0]
    where = ', '.join(str(p) for p in found) if found else 'none'
    raise SystemExit(f'Found {len(found)} design systems under {start} ({where}): name one with --ds')


def check_runtime(ds):
    runtime = ds / '_runtime.js'
    if not runtime.is_file() or not (ds / 'README.md').is_file():
        raise SystemExit(f'{ds} needs _runtime.js and README.md: --ds must name the design-system folder')
    if '_bundle.json' not in runtime.read_text(encoding='utf-8'):
        raise SystemExit(f'{runtime} does not read _bundle.json, so a bundle would be ignored and the published '
                         'viewer would fail to load the design system. Use a runtime with bundle support.')


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    ap.add_argument('folders', nargs='*', help='with --stage: folders of mockups to include, relative to the project space')
    ap.add_argument('--ds', type=Path, help='design-system folder (default: the one found under the current directory)')
    ap.add_argument('-o', '--out', type=Path, help='bundle output file (default: <ds>/_bundle.json)')
    ap.add_argument('--stage', type=Path, metavar='DIR', help='build a publishable folder in DIR (replaced if it exists)')
    ap.add_argument('--title', help='with --stage: the start page title (default: "<Folder> Mockups")')
    args = ap.parse_args()
    ds = args.ds.resolve() if args.ds else find_ds(Path.cwd())
    check_runtime(ds)

    if args.stage:
        if not args.folders:
            ap.error('--stage needs at least one folder of mockups')
        title = args.title or ' '.join(Path(f).name.replace('-', ' ').title() for f in args.folders) + ' Mockups'
        stage(ds, args.stage.resolve(), args.folders, title)
    else:
        if args.folders:
            ap.error('folders are only used with --stage')
        build_bundle(ds, (args.out or ds / '_bundle.json').resolve())


if __name__ == '__main__':
    main()
