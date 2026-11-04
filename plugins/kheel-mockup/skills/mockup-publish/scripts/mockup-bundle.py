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
mockups and images of the named folders (relative to the project space, e.g. authentication). Files the staged
mockups need from elsewhere come too, file by file: sections they include, dialogs they open, state files and
root-relative images. Links (href) to mockups outside the folders are reported, not followed, unless
--follow-links stages their targets as well (one step, with what those need). The catalogue lists only the named
folders' mockups. Root-relative src paths in the mockups ("/authentication/img/logo.svg") are made relative,
because the host's root isn't the project space. Also writes <out dir>.files.json, mapping each published path to
its staged file, for the publish.

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
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

INCLUDE = ['*.md', 'components/*.md', 'components/*/*.md', 'extensions/*.md', 'assets/icons/*.svg']
SKIP = {'_guide.md'}
URL_RE = re.compile(r"""url\(\s*(['"]?)([^'")]+)\1\s*\)""")
SRC_RE = re.compile(r'\bsrc="/([^"]+)"')
SKIP_DIRS = {'.git', 'node_modules'}
SCHEME_RE = re.compile(r'^[a-z][a-z0-9+.-]*:|^//', re.I)
MAX_FILES = 255
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


def resolve(value, base, project):
    """The project file a reference points at, or None for an anchor, a URL or a template value."""
    value = value.split('#')[0].split('?')[0]
    if not value or SCHEME_RE.match(value) or '{{' in value:
        return None
    return (project / value.lstrip('/') if value.startswith('/') else base / value).resolve()


def references(path, project):
    """(kind, written value, target) for each file a mockup points at. Kinds: include, opens, state, image, link."""
    try:
        root = ET.parse(path).getroot()
    except ET.ParseError:
        return []  # the viewer reports it
    refs = [('state', s, path.with_name(f'{path.stem}.{s}.xml')) for s in root.get('states', '').split()]
    for el in root.iter():
        for name, value in el.attrib.items():
            if el.tag == 'include' and name == 'src':
                kind = 'include'
            elif name == 'opens':
                kind = 'opens'
            elif name == 'src' and value.startswith('/') and el.tag != 'mockup-asset':
                kind = 'image'  # other src paths resolve against the page, not the mockup, so only these are files
            elif name == 'href' or (name != 'src' and value.split('#')[0].endswith('.xml')):
                kind = 'link'  # href, or a component's path property
            else:
                continue
            target = resolve(value, path.parent, project)
            if target:
                refs.append((kind, value, target))
    return refs


def stage(ds, out, folders, title, follow_links=False):
    project = ds.parent
    rel = lambda p: p.relative_to(project).as_posix()

    files = {}  # project file -> why it's staged: None for the named folders, else (kind, staged file needing it)
    for folder in folders:
        src = (project / folder).resolve()
        if not src.is_dir() or project not in src.parents:
            raise SystemExit(f'{folder}: not a folder in {project}')
        for path in sorted(p for p in src.rglob('*') if p.is_file()):
            files[path] = None
    # The catalogue lists the named folders' mockups, leaving out folders starting with _ or ., as the viewer does.
    listed = [rel(p) for p, why in files.items()
              if why is None and p.suffix == '.xml' and not any(part[0] in '._' for part in rel(p).split('/')[:-1])]

    # Follow references. A mockup's budget is how many links may still be followed from it: includes, dialogs and
    # states are part of the mockup, so they keep its budget; a link spends one.
    budget = {p: int(follow_links) for p in files if p.suffix == '.xml'}
    queue = list(budget)
    outside, missing = [], []
    while queue:
        path = queue.pop(0)
        for kind, value, target in references(path, project):
            if project not in target.parents or not target.is_file():
                if kind != 'state':  # a listed state without its file is the viewer's to report
                    missing.append((rel(path), kind, value))
                continue
            left = budget[path] - (kind == 'link')
            if kind == 'link' and target not in files and left < 0:
                outside.append((rel(path), value, target))
                continue
            if target not in files:
                files[target] = (kind, rel(path))
            if target.suffix == '.xml' and left > budget.get(target, -1):
                budget[target] = left
                queue.append(target)
    outside = [(f, v) for f, v, t in outside if t not in files]

    if out.exists():
        shutil.rmtree(out)
    staged = {}  # published path -> staged file

    def put(rel, data):
        dest = out / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        (dest.write_text if isinstance(data, str) else dest.write_bytes)(data)
        staged[rel] = str(dest)

    ds_rel = rel(ds)
    put(f'{ds_rel}/_runtime.js', (ds / '_runtime.js').read_text(encoding='utf-8'))
    build_bundle(ds, out / ds_rel / '_bundle.json')
    staged[f'{ds_rel}/_bundle.json'] = str(out / ds_rel / '_bundle.json')

    for path in sorted(files):
        if path.suffix == '.xml':
            put(rel(path), SRC_RE.sub(lambda m: f'src="{m.group(1)}"' if (project / m.group(1)).is_file() else m.group(0),
                                      path.read_text(encoding='utf-8')))
        else:
            put(rel(path), path.read_bytes())

    # The runtime lists mockups by reading the server's directory listings. An artifact host has none, but the
    # runtime reads the project root too, which serves this page, so these hidden links stand in for a listing.
    links = '\n'.join(f'  <a href="{html.escape(m)}">{html.escape(m)}</a>' for m in listed)
    (out / 'index.html').write_text(
        f'<title>{html.escape(title)}</title>\n'
        f'<script type="module" src="{ds_rel}/_runtime.js"></script>\n'
        f'<nav hidden aria-hidden="true">\n{links}\n</nav>\n', encoding='utf-8')

    manifest = out.parent / f'{out.name}.files.json'
    manifest.write_text(json.dumps(staged, indent=1), encoding='utf-8')
    count = len(staged) + 1
    print(f'{out}: {count} files (index.html, the runtime, the bundle, {len(files)} project files); '
          f'{len(listed)} mockups listed; publish map in {manifest}')
    deps = sorted((rel(p), why) for p, why in files.items() if why)
    if deps:
        print(f'Brought in from outside {", ".join(folders)} ({len(deps)}):')
        for path, (kind, by) in deps:
            print(f'  {path}  ({kind}, from {by})')
    if outside:
        print(f'Links to mockups not staged ({len(outside)}; they will warn "no such mockup"; '
              '--follow-links stages them):')
        for by, value in sorted(set(outside)):
            print(f'  {by}: href="{value}"')
    if missing:
        print(f'Missing ({len(missing)}; broken in the project too):')
        for by, kind, value in sorted(set(missing)):
            print(f'  {by}: {kind} "{value}"')
    if count > MAX_FILES:
        print(f'{count} files is over the {MAX_FILES}-file limit of an artifact: stage fewer folders.', file=sys.stderr)
        sys.exit(1)


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
    ap.add_argument('--follow-links', action='store_true',
                    help='with --stage: also stage the mockups that links (href) lead to, one step')
    args = ap.parse_args()
    ds = args.ds.resolve() if args.ds else find_ds(Path.cwd())
    check_runtime(ds)

    if args.stage:
        if not args.folders:
            ap.error('--stage needs at least one folder of mockups')
        title = args.title or ' '.join(Path(f).name.replace('-', ' ').title() for f in args.folders) + ' Mockups'
        stage(ds, args.stage.resolve(), args.folders, title, args.follow_links)
    else:
        if args.folders or args.follow_links:
            ap.error('folders and --follow-links are only used with --stage')
        build_bundle(ds, (args.out or ds / '_bundle.json').resolve())


if __name__ == '__main__':
    main()
