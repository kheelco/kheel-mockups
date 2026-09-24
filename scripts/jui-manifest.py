#!/usr/bin/env python3
"""Regenerate the JUI design system manifest (README.md) from the component files present.

usage: scripts/jui-manifest.py [design-system-dir]
Run after adding, removing or re-versioning a JUI mockup component. Component titles must read
"# <JUI name> (control|component|fragment|layout)".
"""
import os, re, sys
D = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'plugins/kheel-mockup/skills/mockup-init-jui/assets/jui/design-system')
ORDER = {'control': 0, 'component': 1, 'layout': 2, 'fragment': 3}
rows = []
for f in sorted(os.listdir(f'{D}/components')):
    if not f.endswith('.md'): continue
    s = open(f'{D}/components/{f}').read()
    fm = dict(l.split(': ', 1) for l in s.split('---')[1].strip().splitlines())
    m = re.search(r'^# (.+?) \((control|component|fragment|layout)\)\s*$', s, re.M)
    jui, typ = (m.group(1), m.group(2)) if m else ('?', 'component')
    rows.append((ORDER[typ], typ, jui, fm['name'], fm['version'], fm['kind'], fm['summary']))
rows.sort()
icons = sorted(f[:-4] for f in os.listdir(f'{D}/assets/icons') if f.endswith('.svg'))
table = '\n'.join(f'| [{t}](components/{t}.md) | {v} | {k} | {typ} `{j}` | {s} |' for _, typ, j, t, v, k, s in rows)
patterns = sorted(f for f in os.listdir(f'{D}/patterns') if f.endswith('.md')) if os.path.isdir(f'{D}/patterns') else []
pat_rows = []
for p in patterns:
    s = open(f'{D}/patterns/{p}').read()
    title = re.search(r'^# (.+)$', s, re.M).group(1)
    summ = re.search(r'## Purpose and when to use it\s+(.+?)(?:\.|\n\n)', s, re.S)
    pat_rows.append(f'| [{title}](patterns/{p}) | {summ.group(1).strip().replace(chr(10)," ") + "." if summ else ""} |')
out = f"""---
name: JUI
version: 0.1.0
prefix: jui
source: local
---

# JUI design system

Mockup components that represent the standard controls, components and fragments of
[JUI](https://github.com/juiproject/jui-stack)'s `jui-ui` module, styled with JUI's own tokens so that a mockup looks
like the JUI application it describes and can be implemented from directly. Each tag is named after the JUI class
it stands for — `jui-btn` is the Btn fragment, `jui-button` the Button component, `jui-text-control` the
TextControl — and each component's implementation mapping, in `implementations/jui/`, says how to build it.

JUI distinguishes three kinds of building block, shown in the **JUI** column below:

- **Components** own their DOM, have a lifecycle and dispatch their own events.
- **Fragments** are reusable pieces of DOM that contribute to the component they are placed in; that component
  handles their events (see **Fragment events** in the shared behaviours).
- **Controls** are components that hold a value, with dirty detection, validation and focus.

Applications add their own custom and inline components on top of these; add mockup components for them here in
the same way.

This file is the manifest: it lists everything the design system contains. `index.html`, `_runtime.js` and
`_guide.md` in this folder are the viewer and its guide — part of the mockup mechanism, not of the design system.

## Tokens

- [Tokens](tokens.md) — JUI's reference palette, scale, role and component-family tokens.

## Components

| Component | Version | Kind | JUI | Summary |
| --- | --- | --- | --- | --- |
{table}

## Behaviours

- [Shared behaviours](behaviours.md) — fragment events, control values and validation, store-backed loading.

## Patterns

{('| Pattern | Summary |' + chr(10) + '| --- | --- |' + chr(10) + chr(10).join(pat_rows)) if pat_rows else 'None yet. Add patterns for arrangements your application repeats — a gallery with its filter bar, a form in a dialog.'}

## Implementations

- `implementations/jui/` — one mapping per component, from the mockup component to its JUI class.

## Icons

From [Lucide](https://lucide.dev) (ISC licence, see assets/icons/LICENSE-lucide.txt). JUI uses FontAwesome; the
implementation mapping for the icon fragment gives the FontAwesome equivalent of each.

""" + ' '.join(f'`{i}`' for i in icons) + '\n'
open(f'{D}/README.md', 'w').write(out)
print(f'{len(rows)} components')
