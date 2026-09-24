# Tokens

The foundations of the starter design system: colour, type, spacing, radius, elevation and motion. Values are
decided here once; everything else refers to them by name.

The look is deliberately neutral — a quiet grey scale, one blue for action, and four status colours — so that
mockups read as structure first. Restyle the product by changing values in **Primitives** or repointing tokens in
**Semantic**; components never need to change for that.

## Primitives

Raw values with plain names. Only the semantic layer refers to these.

```css
:root {
  /* neutrals */
  --grey-0: #ffffff;
  --grey-25: #fcfcfd;
  --grey-50: #f8fafc;
  --grey-100: #f1f4f8;
  --grey-200: #e4e8ee;
  --grey-300: #cfd6df;
  --grey-400: #9aa5b4;
  --grey-500: #6b7686;
  --grey-600: #4b5565;
  --grey-700: #364152;
  --grey-800: #202939;
  --grey-900: #121926;

  /* action */
  --blue-50: #eef4ff;
  --blue-100: #dbe7fe;
  --blue-500: #3b6ef5;
  --blue-600: #2554d9;
  --blue-700: #1d43b0;

  /* status */
  --green-50: #ecfdf3;
  --green-600: #16a34a;
  --green-700: #15803d;
  --amber-50: #fffaeb;
  --amber-500: #f59e0b;
  --amber-700: #b45309;
  --red-50: #fef3f2;
  --red-600: #dc2626;
  --red-700: #b91c1c;
  --sky-50: #f0f9ff;
  --sky-700: #0369a1;

  /* type */
  --family-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --family-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --size-100: 12px;
  --size-200: 13px;
  --size-300: 14px;
  --size-400: 16px;
  --size-500: 18px;
  --size-600: 22px;
  --size-700: 28px;

  /* spacing, a 4-point scale */
  --scale-1: 4px;
  --scale-2: 8px;
  --scale-3: 12px;
  --scale-4: 16px;
  --scale-5: 20px;
  --scale-6: 24px;
  --scale-8: 32px;
  --scale-10: 40px;
  --scale-12: 48px;
}
```

## Semantic

Purposes, each pointing at a primitive. Components and mockups use these.

**Colour.** `--color-action` is the colour of the thing you click to make something happen; the four status
families each have a strong colour for text and icons and a subtle one for backgrounds.

```css
:root {
  --color-bg: var(--grey-50);
  --color-surface: var(--grey-0);
  --color-surface-sunken: var(--grey-100);
  --color-surface-hover: var(--grey-100);
  --color-border: var(--grey-200);
  --color-border-strong: var(--grey-300);
  --color-text: var(--grey-900);
  --color-text-muted: var(--grey-600);
  --color-text-subtle: var(--grey-500);
  --color-text-disabled: var(--grey-400);

  --color-action: var(--blue-600);
  --color-action-hover: var(--blue-700);
  --color-action-subtle: var(--blue-50);
  --color-action-subtle-hover: var(--blue-100);
  --color-on-action: var(--grey-0);
  --color-link: var(--blue-600);
  --color-focus-ring: var(--blue-500);
  --color-scrim: rgb(18 25 38 / 0.45);

  --color-neutral: var(--grey-700);
  --color-neutral-subtle: var(--grey-100);
  --color-info: var(--sky-700);
  --color-info-subtle: var(--sky-50);
  --color-success: var(--green-700);
  --color-success-subtle: var(--green-50);
  --color-warning: var(--amber-700);
  --color-warning-subtle: var(--amber-50);
  --color-danger: var(--red-600);
  --color-danger-hover: var(--red-700);
  --color-danger-subtle: var(--red-50);
}
```

**Type.** One family for everything, a size scale named by use, and three weights.

```css
:root {
  --font-body: var(--family-sans);
  --font-mono: var(--family-mono);
  --text-xs: var(--size-100);
  --text-sm: var(--size-200);
  --text-md: var(--size-300);
  --text-lg: var(--size-400);
  --text-xl: var(--size-500);
  --text-2xl: var(--size-600);
  --text-3xl: var(--size-700);
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --leading-tight: 1.25;
  --leading-normal: 1.5;
}
```

**Spacing.** The steps the layout and spacing attributes use (`gap="3"` is `--space-3`).

```css
:root {
  --space-0: 0;
  --space-1: var(--scale-1);
  --space-2: var(--scale-2);
  --space-3: var(--scale-3);
  --space-4: var(--scale-4);
  --space-5: var(--scale-5);
  --space-6: var(--scale-6);
  --space-8: var(--scale-8);
  --space-10: var(--scale-10);
  --space-12: var(--scale-12);
}
```

**Shape, elevation, size and motion.**

```css
:root {
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 10px;
  --radius-xl: 14px;
  --radius-full: 999px;

  --shadow-sm: 0 1px 2px rgb(18 25 38 / 0.06);
  --shadow-md: 0 2px 4px rgb(18 25 38 / 0.06), 0 4px 12px rgb(18 25 38 / 0.06);
  --shadow-lg: 0 12px 32px rgb(18 25 38 / 0.18);

  --control-height-sm: 30px;
  --control-height-md: 36px;
  --icon-sm: 14px;
  --icon-md: 16px;
  --icon-lg: 20px;

  --duration-fast: 120ms;
  --duration-normal: 200ms;
}
```

## Base

Plain HTML in a mockup — headings, paragraphs, links — takes these styles.

```css
body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--text-md);
  line-height: var(--leading-normal);
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4 { margin: 0; line-height: var(--leading-tight); font-weight: var(--weight-semibold); }
h1 { font-size: var(--text-3xl); }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-xl); }
h4 { font-size: var(--text-lg); }
p { margin: 0; }
small { font-size: var(--text-sm); color: var(--color-text-muted); }
a { color: var(--color-link); text-decoration: none; }
a:hover { text-decoration: underline; }
code { font-family: var(--font-mono); font-size: 0.92em; background: var(--color-surface-sunken); padding: 1px 4px; border-radius: var(--radius-sm); }
hr { border: 0; border-top: 1px solid var(--color-border); margin: 0; }
ul, ol { margin: 0; padding-left: 1.25em; }
img { max-width: 100%; display: block; }
:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; }
```
