# Tokens

The JUI design tokens, taken from jui-ui's theme (`Theme.Reference.css`, `Theme.Scale.css`, `Theme.Role.css`,
`Theme.Component.css` and `Theme.Legacy.css`) so that mockups look like a JUI application and retheme the same way.
JUI declares these on its `.theme` class; here they are on `:root`.

JUI themes in this order, and so should a mockup design system that follows it:

1. Override **palette axes** (`--jui-palette-*`) or **role** tokens (`--jui-role-*`) for brand and palette.
2. Override **component-family** tokens (`--jui-comp-*`) for behaviour shared by a family (all controls, all buttons).
3. Override **component** tokens (`--cpt-*`, `--frag-*`, declared in each component's style) for one component.

## Primitives

### Reference palette

Every `--jui-color-*` token is derived from a few palette axes with `oklch()`. To change the palette, change the
axes — hues, chroma peaks — not the derived values.

```css
:root {
    /* =======================================================================
       Palette axes.

       A palette is defined by this compact set of values. Every
       --jui-color-* reference token below is derived from the axes via
       oklch() + calc(), so an alternate palette only needs to override the
       axes (see Theme.Reference.Editorial.css) — not all 80+ tokens.

       Two contracts apply to every palette:

         Lightness ladder (shared, non-negotiable):
           -05 L 0.98   -10 L 0.97   -20 L 0.88   -30 L 0.80   -40 L 0.70
           -50 L 0.58   -60 L 0.48   -70 L 0.38   -80 L 0.28   -90 L 0.20

         The compressed -05/-10 gap (1% vs 10% elsewhere) is deliberate:
         both sit at the very-light end where a single pair of surface
         tints is needed for page/strip/card layering against pure white.

         Chroma curve — bell around step -50, using these ratios of the
         family's chroma-peak axis:
           -05 0.12   -10 0.27   -20 0.46   -30 0.65   -40 0.85
           -50 1.00   -60 0.96   -70 0.81   -80 0.58   -90 0.38

       Neutral is the only exception: its chroma is constant across steps,
       driven by the --jui-palette-neutral-chroma axis. Setting neutral
       chroma to 0 (the default) gives pure gray surfaces; setting it >0
       tints the entire surface stack with the neutral hue.
       ======================================================================= */

    /* Hues (OKLCH degrees 0-360) */
    --jui-palette-primary-hue:   210;   /* teal */
    --jui-palette-secondary-hue: 170;   /* teal-green */
    --jui-palette-ink-hue:       255;   /* cool slate */
    --jui-palette-neutral-hue:     0;   /* any; irrelevant when chroma=0 */
    --jui-palette-error-hue:      25;   /* red */
    --jui-palette-warning-hue:    65;   /* amber */
    --jui-palette-success-hue:   145;   /* green */
    --jui-palette-info-hue:      240;   /* blue */

    /* Chroma peaks. Most families share --jui-palette-chroma-peak. Error
       has its own so destructive stays alarming even in muted palettes.
       Ink is always low. Neutral is a constant, not a bell. */
    --jui-palette-chroma-peak:       0.15;
    --jui-palette-ink-chroma-peak:   0.035;
    --jui-palette-error-chroma-peak: 0.18;
    --jui-palette-neutral-chroma:    0;

    /* =======================================================================
       Derived reference tokens.

       Do not edit values directly. To change a palette, override the axes
       above (globally) or at a scoped selector (per-palette). The formulae
       below are the same for every palette.
       ======================================================================= */

    /* Primary */
    --jui-color-primary05: oklch(0.98 calc(var(--jui-palette-chroma-peak) * 0.12) var(--jui-palette-primary-hue));
    --jui-color-primary10: oklch(0.97 calc(var(--jui-palette-chroma-peak) * 0.27) var(--jui-palette-primary-hue));
    --jui-color-primary20: oklch(0.88 calc(var(--jui-palette-chroma-peak) * 0.46) var(--jui-palette-primary-hue));
    --jui-color-primary30: oklch(0.80 calc(var(--jui-palette-chroma-peak) * 0.65) var(--jui-palette-primary-hue));
    --jui-color-primary40: oklch(0.70 calc(var(--jui-palette-chroma-peak) * 0.85) var(--jui-palette-primary-hue));
    --jui-color-primary50: oklch(0.58 calc(var(--jui-palette-chroma-peak) * 1.00) var(--jui-palette-primary-hue));
    --jui-color-primary60: oklch(0.48 calc(var(--jui-palette-chroma-peak) * 0.96) var(--jui-palette-primary-hue));
    --jui-color-primary70: oklch(0.38 calc(var(--jui-palette-chroma-peak) * 0.81) var(--jui-palette-primary-hue));
    --jui-color-primary80: oklch(0.28 calc(var(--jui-palette-chroma-peak) * 0.58) var(--jui-palette-primary-hue));
    --jui-color-primary90: oklch(0.20 calc(var(--jui-palette-chroma-peak) * 0.38) var(--jui-palette-primary-hue));

    /* Secondary */
    --jui-color-secondary05: oklch(0.98 calc(var(--jui-palette-chroma-peak) * 0.12) var(--jui-palette-secondary-hue));
    --jui-color-secondary10: oklch(0.97 calc(var(--jui-palette-chroma-peak) * 0.27) var(--jui-palette-secondary-hue));
    --jui-color-secondary20: oklch(0.88 calc(var(--jui-palette-chroma-peak) * 0.46) var(--jui-palette-secondary-hue));
    --jui-color-secondary30: oklch(0.80 calc(var(--jui-palette-chroma-peak) * 0.65) var(--jui-palette-secondary-hue));
    --jui-color-secondary40: oklch(0.70 calc(var(--jui-palette-chroma-peak) * 0.85) var(--jui-palette-secondary-hue));
    --jui-color-secondary50: oklch(0.58 calc(var(--jui-palette-chroma-peak) * 1.00) var(--jui-palette-secondary-hue));
    --jui-color-secondary60: oklch(0.48 calc(var(--jui-palette-chroma-peak) * 0.96) var(--jui-palette-secondary-hue));
    --jui-color-secondary70: oklch(0.38 calc(var(--jui-palette-chroma-peak) * 0.81) var(--jui-palette-secondary-hue));
    --jui-color-secondary80: oklch(0.28 calc(var(--jui-palette-chroma-peak) * 0.58) var(--jui-palette-secondary-hue));
    --jui-color-secondary90: oklch(0.20 calc(var(--jui-palette-chroma-peak) * 0.38) var(--jui-palette-secondary-hue));

    /* Ink — text and chrome (formerly "tertiary") */
    --jui-color-ink05: oklch(0.98 calc(var(--jui-palette-ink-chroma-peak) * 0.12) var(--jui-palette-ink-hue));
    --jui-color-ink10: oklch(0.97 calc(var(--jui-palette-ink-chroma-peak) * 0.27) var(--jui-palette-ink-hue));
    --jui-color-ink20: oklch(0.88 calc(var(--jui-palette-ink-chroma-peak) * 0.46) var(--jui-palette-ink-hue));
    --jui-color-ink30: oklch(0.80 calc(var(--jui-palette-ink-chroma-peak) * 0.65) var(--jui-palette-ink-hue));
    --jui-color-ink40: oklch(0.70 calc(var(--jui-palette-ink-chroma-peak) * 0.85) var(--jui-palette-ink-hue));
    --jui-color-ink50: oklch(0.58 calc(var(--jui-palette-ink-chroma-peak) * 1.00) var(--jui-palette-ink-hue));
    --jui-color-ink60: oklch(0.48 calc(var(--jui-palette-ink-chroma-peak) * 0.96) var(--jui-palette-ink-hue));
    --jui-color-ink70: oklch(0.38 calc(var(--jui-palette-ink-chroma-peak) * 0.81) var(--jui-palette-ink-hue));
    --jui-color-ink80: oklch(0.28 calc(var(--jui-palette-ink-chroma-peak) * 0.58) var(--jui-palette-ink-hue));
    --jui-color-ink90: oklch(0.20 calc(var(--jui-palette-ink-chroma-peak) * 0.38) var(--jui-palette-ink-hue));

    /* Neutral — constant chroma, not a bell. Pure gray when neutral-chroma=0. */
    --jui-color-neutral05: oklch(0.98 var(--jui-palette-neutral-chroma) var(--jui-palette-neutral-hue));
    --jui-color-neutral10: oklch(0.97 var(--jui-palette-neutral-chroma) var(--jui-palette-neutral-hue));
    --jui-color-neutral20: oklch(0.88 var(--jui-palette-neutral-chroma) var(--jui-palette-neutral-hue));
    --jui-color-neutral30: oklch(0.80 var(--jui-palette-neutral-chroma) var(--jui-palette-neutral-hue));
    --jui-color-neutral40: oklch(0.70 var(--jui-palette-neutral-chroma) var(--jui-palette-neutral-hue));
    --jui-color-neutral50: oklch(0.58 var(--jui-palette-neutral-chroma) var(--jui-palette-neutral-hue));
    --jui-color-neutral60: oklch(0.48 var(--jui-palette-neutral-chroma) var(--jui-palette-neutral-hue));
    --jui-color-neutral70: oklch(0.38 var(--jui-palette-neutral-chroma) var(--jui-palette-neutral-hue));
    --jui-color-neutral80: oklch(0.28 var(--jui-palette-neutral-chroma) var(--jui-palette-neutral-hue));
    --jui-color-neutral90: oklch(0.20 var(--jui-palette-neutral-chroma) var(--jui-palette-neutral-hue));

    /* Error — uses its own chroma-peak so it stays alarming in muted palettes */
    --jui-color-error05: oklch(0.98 calc(var(--jui-palette-error-chroma-peak) * 0.12) var(--jui-palette-error-hue));
    --jui-color-error10: oklch(0.97 calc(var(--jui-palette-error-chroma-peak) * 0.27) var(--jui-palette-error-hue));
    --jui-color-error20: oklch(0.88 calc(var(--jui-palette-error-chroma-peak) * 0.46) var(--jui-palette-error-hue));
    --jui-color-error30: oklch(0.80 calc(var(--jui-palette-error-chroma-peak) * 0.65) var(--jui-palette-error-hue));
    --jui-color-error40: oklch(0.70 calc(var(--jui-palette-error-chroma-peak) * 0.85) var(--jui-palette-error-hue));
    --jui-color-error50: oklch(0.58 calc(var(--jui-palette-error-chroma-peak) * 1.00) var(--jui-palette-error-hue));
    --jui-color-error60: oklch(0.48 calc(var(--jui-palette-error-chroma-peak) * 0.96) var(--jui-palette-error-hue));
    --jui-color-error70: oklch(0.38 calc(var(--jui-palette-error-chroma-peak) * 0.81) var(--jui-palette-error-hue));
    --jui-color-error80: oklch(0.28 calc(var(--jui-palette-error-chroma-peak) * 0.58) var(--jui-palette-error-hue));
    --jui-color-error90: oklch(0.20 calc(var(--jui-palette-error-chroma-peak) * 0.38) var(--jui-palette-error-hue));

    /* Warning */
    --jui-color-warning05: oklch(0.98 calc(var(--jui-palette-chroma-peak) * 0.12) var(--jui-palette-warning-hue));
    --jui-color-warning10: oklch(0.97 calc(var(--jui-palette-chroma-peak) * 0.27) var(--jui-palette-warning-hue));
    --jui-color-warning20: oklch(0.88 calc(var(--jui-palette-chroma-peak) * 0.46) var(--jui-palette-warning-hue));
    --jui-color-warning30: oklch(0.80 calc(var(--jui-palette-chroma-peak) * 0.65) var(--jui-palette-warning-hue));
    --jui-color-warning40: oklch(0.70 calc(var(--jui-palette-chroma-peak) * 0.85) var(--jui-palette-warning-hue));
    --jui-color-warning50: oklch(0.58 calc(var(--jui-palette-chroma-peak) * 1.00) var(--jui-palette-warning-hue));
    --jui-color-warning60: oklch(0.48 calc(var(--jui-palette-chroma-peak) * 0.96) var(--jui-palette-warning-hue));
    --jui-color-warning70: oklch(0.38 calc(var(--jui-palette-chroma-peak) * 0.81) var(--jui-palette-warning-hue));
    --jui-color-warning80: oklch(0.28 calc(var(--jui-palette-chroma-peak) * 0.58) var(--jui-palette-warning-hue));
    --jui-color-warning90: oklch(0.20 calc(var(--jui-palette-chroma-peak) * 0.38) var(--jui-palette-warning-hue));

    /* Success */
    --jui-color-success05: oklch(0.98 calc(var(--jui-palette-chroma-peak) * 0.12) var(--jui-palette-success-hue));
    --jui-color-success10: oklch(0.97 calc(var(--jui-palette-chroma-peak) * 0.27) var(--jui-palette-success-hue));
    --jui-color-success20: oklch(0.88 calc(var(--jui-palette-chroma-peak) * 0.46) var(--jui-palette-success-hue));
    --jui-color-success30: oklch(0.80 calc(var(--jui-palette-chroma-peak) * 0.65) var(--jui-palette-success-hue));
    --jui-color-success40: oklch(0.70 calc(var(--jui-palette-chroma-peak) * 0.85) var(--jui-palette-success-hue));
    --jui-color-success50: oklch(0.58 calc(var(--jui-palette-chroma-peak) * 1.00) var(--jui-palette-success-hue));
    --jui-color-success60: oklch(0.48 calc(var(--jui-palette-chroma-peak) * 0.96) var(--jui-palette-success-hue));
    --jui-color-success70: oklch(0.38 calc(var(--jui-palette-chroma-peak) * 0.81) var(--jui-palette-success-hue));
    --jui-color-success80: oklch(0.28 calc(var(--jui-palette-chroma-peak) * 0.58) var(--jui-palette-success-hue));
    --jui-color-success90: oklch(0.20 calc(var(--jui-palette-chroma-peak) * 0.38) var(--jui-palette-success-hue));

    /* Info */
    --jui-color-info05: oklch(0.98 calc(var(--jui-palette-chroma-peak) * 0.12) var(--jui-palette-info-hue));
    --jui-color-info10: oklch(0.97 calc(var(--jui-palette-chroma-peak) * 0.27) var(--jui-palette-info-hue));
    --jui-color-info20: oklch(0.88 calc(var(--jui-palette-chroma-peak) * 0.46) var(--jui-palette-info-hue));
    --jui-color-info30: oklch(0.80 calc(var(--jui-palette-chroma-peak) * 0.65) var(--jui-palette-info-hue));
    --jui-color-info40: oklch(0.70 calc(var(--jui-palette-chroma-peak) * 0.85) var(--jui-palette-info-hue));
    --jui-color-info50: oklch(0.58 calc(var(--jui-palette-chroma-peak) * 1.00) var(--jui-palette-info-hue));
    --jui-color-info60: oklch(0.48 calc(var(--jui-palette-chroma-peak) * 0.96) var(--jui-palette-info-hue));
    --jui-color-info70: oklch(0.38 calc(var(--jui-palette-chroma-peak) * 0.81) var(--jui-palette-info-hue));
    --jui-color-info80: oklch(0.28 calc(var(--jui-palette-chroma-peak) * 0.58) var(--jui-palette-info-hue));
    --jui-color-info90: oklch(0.20 calc(var(--jui-palette-chroma-peak) * 0.38) var(--jui-palette-info-hue));

    /* Aux — pure white and black. Palettes should not override these. */
    --jui-color-aux-white: oklch(1 0 0);
    --jui-color-aux-black: oklch(0 0 0);
}
```

### Scale

Spacing, type, radius, control height, elevation and motion.

```css
:root {
    /* Shared scale tokens */
    --jui-space-0: 0;
    --jui-space-1: 0.25rem;
    --jui-space-2: 0.5rem;
    --jui-space-3: 0.75rem;
    --jui-space-4: 1rem;
    --jui-space-5: 1.25rem;
    --jui-space-6: 1.5rem;
    --jui-space-7: 1.75rem;
    --jui-space-8: 2rem;
    --jui-space-10: 2.5rem;
    --jui-space-12: 3rem;

    /* Base font — the default for body and the fallback for every other */
    /* font slot. Override this alone to change the app's default face.   */
    --jui-font-family:         Avenir Next W02, Avenir Next, "Helvetica Neue", Helvetica, Arial, sans-serif;
    /* Heading / control slots fall back to the base unless overridden. */
    --jui-font-family-heading: var(--jui-font-family);
    --jui-font-family-control: var(--jui-font-family);
    /* Monospace stands alone — the one intentional exception. */
    --jui-font-family-mono:    ui-monospace, monospace;
    /* 2xs — micro-labels (uppercase eyebrows, kv-card heads). All-caps labels
       sit at cap height so they read visually larger than their nominal size;
       this tier exists to compensate without dropping below 11px. */
    --jui-font-size-2xs: 0.6875rem;
    --jui-font-size-xs: 0.75rem;
    --jui-font-size-sm: 0.875rem;
    --jui-font-size-md: 1rem;
    --jui-font-size-lg: 1.125rem;
    --jui-font-size-xl: 1.25rem;
    --jui-font-size-2xl: 1.5rem;
    --jui-font-weight-regular: 400;
    --jui-font-weight-medium: 500;
    --jui-font-weight-semibold: 600;
    --jui-font-weight-bold: 700;
    --jui-line-height-tight: 1.2;
    --jui-line-height-normal: 1.5;

    --jui-radius-none: 0;
    --jui-radius-xs: 2px;
    --jui-radius-sm: 4px;
    --jui-radius-md: 6px;
    --jui-radius-lg: 10px;
    --jui-radius-pill: 999px;

    --jui-control-height: 2.35em;

    --jui-elevation-0: none;
    --jui-elevation-1: 0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.1);
    --jui-elevation-2: 0 4px 6px rgba(0, 0, 0, 0.08), 0 8px 14px rgba(0, 0, 0, 0.1);
    --jui-elevation-3: 0 10px 20px rgba(0, 0, 0, 0.14), 0 6px 8px rgba(0, 0, 0, 0.1);

    --jui-duration-fast: 150ms;
    --jui-duration-standard: 240ms;
    --jui-duration-slow: 400ms;
    --jui-ease-standard: cubic-bezier(0.2, 0, 0, 1);
    --jui-ease-emphasis: cubic-bezier(0.4, 0, 0.1, 1);
}
```

## Semantic

### Roles

What each colour is for. Components refer to these rather than to the palette.

```css
:root {
    /* Semantic role tokens */
    --jui-role-surface-canvas: var(--jui-color-aux-white);
    --jui-role-surface-raised: var(--jui-color-neutral05);
    --jui-role-surface-muted: var(--jui-color-neutral10);
    --jui-role-surface-sunken: var(--jui-color-neutral20);
    --jui-role-surface-overlay: var(--jui-color-aux-white);
    --jui-role-surface-accent: var(--jui-color-primary05);
    --jui-role-surface-info: var(--jui-color-info05);
    --jui-role-surface-success: var(--jui-color-success05);
    --jui-role-surface-warning: var(--jui-color-warning05);
    --jui-role-surface-error: var(--jui-color-error05);

    --jui-role-border-subtle: var(--jui-color-neutral20);
    --jui-role-border-default: var(--jui-color-neutral30);
    --jui-role-border-strong: var(--jui-color-neutral40);
    --jui-role-border-contrast: var(--jui-color-neutral60);

    --jui-role-text-default: var(--jui-color-ink70);
    --jui-role-text-muted: var(--jui-color-ink30);
    --jui-role-text-heading: var(--jui-color-ink70);
    --jui-role-text-heading-subtle: var(--jui-color-ink60);
    --jui-role-text-disabled: var(--jui-color-neutral40);
    --jui-role-text-inverse: var(--jui-color-aux-white);
    --jui-role-text-link: var(--jui-color-primary50);
    --jui-role-text-link-hover: var(--jui-color-primary70);

    --jui-role-interactive-primary: var(--jui-color-primary50);
    --jui-role-interactive-primary-hover: var(--jui-color-primary60);
    --jui-role-interactive-primary-strong: var(--jui-color-primary70);
    --jui-role-interactive-primary-on: var(--jui-color-aux-white);
    --jui-role-interactive-secondary: var(--jui-color-secondary50);
    --jui-role-interactive-secondary-hover: var(--jui-color-secondary60);

    --jui-role-feedback-info: var(--jui-color-info50);
    --jui-role-feedback-success: var(--jui-color-success60);
    --jui-role-feedback-warning: var(--jui-color-warning70);
    --jui-role-feedback-error: var(--jui-color-error50);

    --jui-role-focus-ring: var(--jui-color-info40);
    --jui-role-focus-shadow: var(--jui-color-info20);
    --jui-role-disabled: var(--jui-color-neutral30);
    --jui-role-disabled-strong: var(--jui-color-neutral40);
    --jui-role-selection: var(--jui-color-ink70);
    --jui-role-selection-muted: var(--jui-color-ink20);
    --jui-role-selection-active: var(--jui-color-ink30);
}
```

### Component families

Defaults shared by a family of components — every control, every button, every dialog — so a family can be
retuned in one place.

```css
:root {
    /* Component-family defaults */
    --jui-comp-control-font-family: var(--jui-font-family-control);
    --jui-comp-control-height: var(--jui-control-height);
    --jui-comp-control-surface: var(--jui-role-surface-raised);
    --jui-comp-control-surface-disabled: var(--jui-role-surface-sunken);
    --jui-comp-control-surface-readonly: var(--jui-role-disabled);
    --jui-comp-control-surface-offset: var(--jui-role-border-strong);
    --jui-comp-control-surface-waiting: var(--jui-role-surface-muted);
    --jui-comp-control-border: var(--jui-role-border-default);
    --jui-comp-control-radius: var(--jui-radius-sm);
    --jui-comp-control-text: var(--jui-role-text-default);
    --jui-comp-control-text-placeholder: var(--jui-role-text-muted);
    --jui-comp-control-text-disabled: var(--jui-role-border-contrast);
    --jui-comp-control-text-readonly: var(--jui-role-border-contrast);
    --jui-comp-control-text-header: var(--jui-role-text-heading);
    --jui-comp-control-text-subtle: var(--jui-role-text-muted);
    --jui-comp-control-text-link: var(--jui-role-text-link);
    --jui-comp-control-text-offset: var(--jui-role-surface-muted);
    --jui-comp-control-action: var(--jui-role-border-contrast);
    --jui-comp-control-action-disabled: var(--jui-role-disabled);
    --jui-comp-control-action-readonly: var(--jui-role-border-contrast);
    --jui-comp-control-action-hover: var(--jui-role-text-default);
    --jui-comp-control-active: var(--jui-role-interactive-primary);
    --jui-comp-control-active-bg: var(--jui-role-surface-accent);
    --jui-comp-control-focus: var(--jui-role-focus-ring);
    --jui-comp-control-focus-offset: var(--jui-role-focus-shadow);
    --jui-comp-control-error-focus: var(--jui-role-feedback-error);
    --jui-comp-control-error-focus-offset: var(--jui-color-error30);
    --jui-comp-control-opacity-disabled: 0.5;
    --jui-comp-control-opacity-readonly: 0.5;

    --jui-comp-button-height: auto;
    --jui-comp-button-surface: var(--jui-role-interactive-primary);
    --jui-comp-button-surface-hover: var(--jui-role-interactive-primary-hover);
    --jui-comp-button-surface-disabled: transparent;
    --jui-comp-button-border: var(--jui-role-interactive-primary);
    --jui-comp-button-border-disabled: var(--jui-role-border-default);
    --jui-comp-button-radius: var(--jui-radius-sm);
    --jui-comp-button-text: var(--jui-role-interactive-primary-on);
    --jui-comp-button-text-disabled: var(--jui-role-text-disabled);
    --jui-comp-button-disabled-opacity: 1;
    --jui-comp-button-padding-block: 0.45em;
    --jui-comp-button-padding-inline: 0.75em;
    --jui-comp-button-font-size: inherit;
    --jui-comp-button-font-weight: 400;
    --jui-comp-button-text-lineheight: 1.4;
    --jui-comp-button-gap: 0.5em;
    --jui-comp-button-margin: 2px;
    --jui-comp-button-letter-spacing: 0.02em;
    --jui-comp-button-waiting-surface: var(--jui-role-surface-sunken);
    --jui-comp-button-waiting-border: var(--jui-role-disabled);
    --jui-comp-button-waiting-text: var(--jui-role-disabled-strong);
    --jui-comp-button-focus-border: var(--jui-role-focus-ring);
    --jui-comp-button-focus-shadow: var(--jui-role-focus-shadow);
    --jui-comp-button-danger-surface: var(--jui-role-feedback-error);
    --jui-comp-button-danger-surface-hover: var(--jui-color-error60);
    --jui-comp-button-danger-border: var(--jui-role-feedback-error);
    --jui-comp-button-warning-surface: var(--jui-color-warning50);
    --jui-comp-button-warning-surface-hover: var(--jui-color-warning60);
    --jui-comp-button-warning-border: var(--jui-color-warning50);
    --jui-comp-button-success-surface: var(--jui-color-success60);
    --jui-comp-button-success-surface-hover: var(--jui-color-success70);
    --jui-comp-button-success-border: var(--jui-color-success60);
    --jui-comp-button-outline-surface: var(--jui-role-surface-canvas);
    --jui-comp-button-outline-surface-hover: var(--jui-role-surface-accent);
    --jui-comp-button-outline-text: var(--jui-role-interactive-primary);
    --jui-comp-button-outline-border: var(--jui-role-interactive-primary);
    --jui-comp-button-link-text: var(--jui-role-text-link);
    --jui-comp-button-link-text-hover: var(--jui-role-text-link-hover);

    --jui-comp-tabset-surface: var(--jui-role-surface-muted);
    --jui-comp-tabset-surface-alt: var(--jui-role-surface-canvas);
    --jui-comp-tabset-surface-hover: var(--jui-role-surface-sunken);
    --jui-comp-tabset-surface-active: var(--jui-role-border-strong);
    --jui-comp-tabset-border: var(--jui-role-border-default);
    --jui-comp-tabset-text: var(--jui-role-text-default);
    --jui-comp-tabset-text-muted: var(--jui-role-border-contrast);
    --jui-comp-tabset-text-active: var(--jui-role-text-inverse);
    --jui-comp-tabset-warn: var(--jui-role-feedback-warning);
    --jui-comp-tabset-shadow: rgba(0, 0, 0, 0.2);

    --jui-comp-container-surface: var(--jui-role-surface-raised);
    --jui-comp-container-surface-offset: var(--jui-role-surface-muted);

    --jui-comp-dialog-surface: var(--jui-role-surface-overlay);
    --jui-comp-dialog-border: var(--jui-role-border-default);
    --jui-comp-dialog-radius: var(--jui-radius-lg);
    --jui-comp-dialog-shadow: var(--jui-elevation-2);
    --jui-comp-dialog-chrome: var(--jui-role-surface-muted);
    --jui-comp-dialog-header-surface: var(--jui-comp-dialog-chrome);
    --jui-comp-dialog-header-divider: var(--jui-comp-dialog-border);
    --jui-comp-dialog-footer-surface: var(--jui-comp-dialog-chrome);
    --jui-comp-dialog-footer-divider: var(--jui-comp-dialog-border);
    --jui-comp-dialog-heading: var(--jui-role-text-heading);
    --jui-comp-dialog-subheading: var(--jui-role-border-contrast);
    --jui-comp-dialog-icon: var(--jui-role-text-muted);
    --jui-comp-dialog-link: var(--jui-role-text-link);
    --jui-comp-dialog-close: var(--jui-role-text-default);

    --jui-comp-table-surface: transparent;
    --jui-comp-table-radius: var(--jui-radius-none);
    --jui-comp-table-shadow: var(--jui-elevation-0);
    --jui-comp-table-header-surface: var(--jui-role-surface-muted);
    --jui-comp-table-sticky-surface: var(--jui-role-surface-canvas);
    --jui-comp-table-border: var(--jui-role-border-default);
    --jui-comp-table-row-border: var(--jui-role-border-subtle);
    --jui-comp-table-row-hover: transparent;
    --jui-comp-table-row-hover-clickable: var(--jui-role-surface-muted);
    --jui-comp-table-heading-text: var(--jui-role-text-default);
    --jui-comp-table-heading-icon: var(--jui-role-text-muted);
    --jui-comp-table-cell-text: var(--jui-role-text-default);
    --jui-comp-table-sort-indicator: var(--jui-role-border-default);
    --jui-comp-table-mask-opacity: 0.5;
    --jui-comp-table-selector-width: 3.5em;

    --jui-comp-notification-radius: var(--jui-radius-xs);
    --jui-comp-notification-info-accent: var(--jui-role-feedback-info);
    --jui-comp-notification-info-border: var(--jui-color-info40);
    --jui-comp-notification-info-surface: var(--jui-role-surface-overlay);
    --jui-comp-notification-success-accent: var(--jui-role-feedback-success);
    --jui-comp-notification-success-border: var(--jui-color-success40);
    --jui-comp-notification-success-surface: var(--jui-role-surface-overlay);
    --jui-comp-notification-error-accent: var(--jui-role-feedback-error);
    --jui-comp-notification-error-border: var(--jui-color-error40);
    --jui-comp-notification-error-surface: var(--jui-role-surface-error);

    --jui-comp-form-header: var(--jui-role-text-heading);
    --jui-comp-form-instruction: var(--jui-role-border-contrast);
    --jui-comp-form-footer: var(--jui-role-text-muted);
    --jui-comp-form-text: var(--jui-role-text-default);
    --jui-comp-form-text-error: var(--jui-role-feedback-error);
    --jui-comp-form-text-disabled: var(--jui-role-text-disabled);
    --jui-comp-form-help-surface: var(--jui-role-text-default);
    --jui-comp-form-help-text: var(--jui-role-text-inverse);
    --jui-comp-form-help-radius: var(--jui-radius-sm);
    --jui-comp-form-error-surface: var(--jui-role-surface-error);
    --jui-comp-form-error-icon: var(--jui-color-error30);
    --jui-comp-form-error-text: var(--jui-role-border-contrast);
    --jui-comp-form-error-radius: var(--jui-radius-md);
    --jui-comp-form-separator: var(--jui-role-border-subtle);
}
```

### Compatibility

JUI's transitional layer, mapping retired token names onto the current ones. Some component styles still refer to
these names.

```css
:root {
    /* Transitional compatibility layer.
       Maps retired reference and global tokens onto the new structure so
       existing downstream code continues to resolve. Do not extend this file
       with new tokens — it is a shim, not a design surface. */

    /* Palette aliases — tertiary was renamed to ink, and the aux-focus /
       aux-blue one-offs were absorbed into a proper info ramp. */
    --jui-color-tertiary05: var(--jui-color-ink05);
    --jui-color-tertiary10: var(--jui-color-ink10);
    --jui-color-tertiary20: var(--jui-color-ink20);
    --jui-color-tertiary30: var(--jui-color-ink30);
    --jui-color-tertiary40: var(--jui-color-ink40);
    --jui-color-tertiary50: var(--jui-color-ink50);
    --jui-color-tertiary60: var(--jui-color-ink60);
    --jui-color-tertiary70: var(--jui-color-ink70);
    --jui-color-tertiary80: var(--jui-color-ink80);
    --jui-color-tertiary90: var(--jui-color-ink90);

    --jui-color-aux-focus1: var(--jui-color-info40);
    --jui-color-aux-focus2: var(--jui-color-info20);
    --jui-color-aux-blue: var(--jui-color-info50);

    --jui-border-radius: var(--jui-radius-sm);
    --jui-border-radius-soft: var(--jui-radius-xs);
    --jui-border-radius-hard: var(--jui-radius-md);

    --jui-state-focus: var(--jui-role-focus-ring);
    --jui-state-focus-offset: var(--jui-role-focus-shadow);
    --jui-state-disabled: var(--jui-role-disabled);
    --jui-state-disabled-bg: var(--jui-role-surface-sunken);
    --jui-state-disabled-offset: var(--jui-role-disabled-strong);
    --jui-state-error: var(--jui-role-feedback-error);
    --jui-state-error-bg: var(--jui-role-surface-error);
    --jui-state-error-offset: var(--jui-color-error30);
    --jui-state-waiting: var(--jui-role-border-default);
    --jui-state-waiting-bg: var(--jui-role-surface-muted);
    --jui-state-waiting-bg-offset: var(--jui-role-surface-raised);

    --jui-line: var(--jui-role-border-default);
    --jui-line-light: var(--jui-role-border-subtle);
    --jui-line-medium: var(--jui-role-surface-sunken);
    --jui-line-dark: var(--jui-role-border-contrast);

    --jui-text: var(--jui-role-text-default);
    --jui-text-offset: var(--jui-role-text-muted);
    --jui-text-header: var(--jui-role-text-heading);
    --jui-text-header-sub: var(--jui-role-text-heading-subtle);
    --jui-text-subtle: var(--jui-role-text-muted);
    --jui-text-link: var(--jui-role-text-link);
    --jui-text-link-hover: var(--jui-role-text-link-hover);
    --jui-text-error: var(--jui-role-feedback-error);
    --jui-text-disabled: var(--jui-role-text-disabled);

    --jui-selection: var(--jui-role-selection);
    --jui-selection-offset: var(--jui-role-selection-muted);
    --jui-selection-active: var(--jui-role-selection-active);

    /* Font slot renamed: -sans is now just "the base family". */
    --jui-font-family-sans: var(--jui-font-family);

    --jui-ctl-height: var(--jui-comp-control-height);
    --jui-ctl-font: var(--jui-comp-control-font-family);
    --jui-ctl-active: var(--jui-comp-control-active);
    --jui-ctl-active-bg: var(--jui-comp-control-active-bg);
    --jui-ctl-opacity-readonly: var(--jui-comp-control-opacity-readonly);
    --jui-ctl-opacity-disabled: var(--jui-comp-control-opacity-disabled);
    --jui-ctl-bg: var(--jui-comp-control-surface);
    --jui-ctl-bg-disabled: var(--jui-comp-control-surface-disabled);
    --jui-ctl-bg-readonly: var(--jui-comp-control-surface-readonly);
    --jui-ctl-bg-offset: var(--jui-comp-control-surface-offset);
    --jui-ctl-bg-wait: var(--jui-comp-control-surface-waiting);
    --jui-ctl-border: var(--jui-comp-control-border);
    --jui-ctl-border-radius: var(--jui-comp-control-radius);
    --jui-ctl-text: var(--jui-comp-control-text);
    --jui-ctl-text-placeholder: var(--jui-comp-control-text-placeholder);
    --jui-ctl-text-disabled: var(--jui-comp-control-text-disabled);
    --jui-ctl-text-readonly: var(--jui-comp-control-text-readonly);
    --jui-ctl-text-header: var(--jui-comp-control-text-header);
    --jui-ctl-text-subtle: var(--jui-comp-control-text-subtle);
    --jui-ctl-text-link: var(--jui-comp-control-text-link);
    --jui-ctl-text-offset: var(--jui-comp-control-text-offset);
    --jui-ctl-action: var(--jui-comp-control-action);
    --jui-ctl-action-disabled: var(--jui-comp-control-action-disabled);
    --jui-ctl-action-readonly: var(--jui-comp-control-action-readonly);
    --jui-ctl-action-hover: var(--jui-comp-control-action-hover);
    --jui-ctl-focus: var(--jui-comp-control-focus);
    --jui-ctl-focus-offset: var(--jui-comp-control-focus-offset);
    --jui-ctl-err-focus: var(--jui-comp-control-error-focus);
    --jui-ctl-err-focus-offset: var(--jui-comp-control-error-focus-offset);

    --jui-btn-bg: var(--jui-comp-button-surface);
    --jui-btn-bg-hover: var(--jui-comp-button-surface-hover);
    --jui-btn-bg-disabled: var(--jui-comp-button-surface-disabled);
    --jui-btn-bg-disabled-offset: var(--jui-comp-button-border-disabled);
    --jui-btn-border: var(--jui-comp-button-border);
    --jui-btn-border-radius: var(--jui-comp-button-radius);
    --jui-btn-text: var(--jui-comp-button-text);
    --jui-btn-danger-bg: var(--jui-comp-button-danger-surface);
    --jui-btn-danger-bg-hover: var(--jui-comp-button-danger-surface-hover);
    --jui-btn-danger-border: var(--jui-comp-button-danger-border);
    --jui-btn-warning-bg: var(--jui-comp-button-warning-surface);
    --jui-btn-warning-bg-hover: var(--jui-comp-button-warning-surface-hover);
    --jui-btn-warning-border: var(--jui-comp-button-warning-border);
    --jui-btn-success-bg: var(--jui-comp-button-success-surface);
    --jui-btn-success-bg-hover: var(--jui-comp-button-success-surface-hover);
    --jui-btn-success-border: var(--jui-comp-button-success-border);

    --jui-tabset-line: var(--jui-comp-tabset-border);
    --jui-tabset-line-light: var(--jui-role-border-subtle);
    --jui-tabset-text: var(--jui-comp-tabset-text);
    --jui-tabset-text-alt: var(--jui-comp-tabset-text-active);
    --jui-tabset-icon: var(--jui-comp-tabset-text);
    --jui-tabset-warn: var(--jui-comp-tabset-warn);
    --jui-tabset-bg-01: var(--jui-comp-tabset-surface-alt);
    --jui-tabset-bg-02: var(--jui-comp-tabset-surface);
    --jui-tabset-bg-03: var(--jui-comp-tabset-surface-hover);
    --jui-tabset-bg-04: var(--jui-role-border-strong);
    --jui-tabset-bg-05: var(--jui-comp-tabset-surface-active);
    --jui-tabset-shadow: var(--jui-comp-tabset-shadow);

    --jui-container-bg: var(--jui-comp-container-surface);
    --jui-container-bg-offset: var(--jui-comp-container-surface-offset);

    --jui-frag-card-outlined-bg: var(--jui-role-surface-overlay);
    --jui-frag-card-outlined-border: var(--jui-role-border-subtle);
    --jui-frag-card-outlined-border-radius: var(--jui-radius-sm);
}
```

## Mechanism

The tokens the mockup mechanism itself relies on — the spacing steps used by layout attributes and the colours the
viewer frames mockups with — mapped onto JUI's.

```css
:root {
  --space-0: var(--jui-space-0);
  --space-1: var(--jui-space-1);
  --space-2: var(--jui-space-2);
  --space-3: var(--jui-space-3);
  --space-4: var(--jui-space-4);
  --space-5: var(--jui-space-5);
  --space-6: var(--jui-space-6);
  --space-8: var(--jui-space-8);
  --space-10: var(--jui-space-10);
  --space-12: var(--jui-space-12);

  --color-bg: var(--jui-role-surface-raised);
  --color-surface: var(--jui-role-surface-canvas);
  --color-text: var(--jui-role-text-default);
  --color-text-muted: var(--jui-role-text-muted);
  --color-border: var(--jui-role-border-default);
  --color-scrim: rgb(0 0 0 / 0.35);
  --color-focus-ring: var(--jui-role-focus-ring);
  --font-body: var(--jui-font-family);
}
```

## Base

Plain HTML in a mockup takes these styles.

```css
body {
  background: var(--jui-role-surface-raised);
  color: var(--jui-role-text-default);
  font-family: var(--jui-font-family);
  font-size: var(--jui-font-size-sm);
  line-height: var(--jui-line-height-normal);
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4, h5, h6 { margin: 0; font-family: var(--jui-font-family-heading); color: var(--jui-role-text-heading); font-weight: var(--jui-font-weight-semibold); line-height: var(--jui-line-height-tight); }
h1 { font-size: var(--jui-font-size-2xl); }
h2 { font-size: var(--jui-font-size-xl); }
h3 { font-size: var(--jui-font-size-lg); }
h4 { font-size: var(--jui-font-size-md); }
p { margin: 0; }
small { font-size: var(--jui-font-size-xs); color: var(--jui-role-text-muted); }
a { color: var(--jui-role-text-link); text-decoration: none; }
a:hover { color: var(--jui-role-text-link-hover); text-decoration: underline; }
code { font-family: var(--jui-font-family-mono); font-size: 0.92em; background: var(--jui-role-surface-muted); padding: 1px 4px; border-radius: var(--jui-radius-xs); }
hr { border: 0; border-top: 1px solid var(--jui-role-border-subtle); margin: 0; }
ul, ol { margin: 0; padding-left: 1.25em; }
img { max-width: 100%; display: block; }
::placeholder { color: var(--jui-role-text-muted); }
:focus-visible { outline: 2px solid var(--jui-role-focus-ring); outline-offset: 2px; }
```
