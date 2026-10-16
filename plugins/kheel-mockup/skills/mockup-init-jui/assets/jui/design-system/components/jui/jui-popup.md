---
name: jui-popup
version: 1.0.0
kind: composed
status: active
summary: Popup fragment — a simple overlay panel over a grey mask, with a close button and a scrolling body.
---

# Popup (fragment)

## Purpose

Represents JUI's **Popup** fragment: a lightweight overlay — a light grey mask over the page and, centred on it, a
large white panel (80 % of the width and height by default) with a *close* link at the top right and a scrolling
body. Use it to show a large piece of read-only content in place — a preview, a document, an image — without
building a modal dialog. Being a fragment, it has no events of its own: JUI shows and hides it through a handler
held by the enclosing component, and anything in the body is handled by that component (see **Fragment
events**). For a task with a title and actions use a modal dialog (a `dialog` mockup); for a dialog-shaped panel
inside the page use `jui-dialog`.

## Anatomy

- **Mask** — a translucent grey layer covering the area behind the panel.
- **Panel** — white, bordered, rounded, with a strong shadow.
- **Upper bar** — the *close* button (`jui-btn`, text style) at the right.
- **Body** — the content, padded and scrolling when too tall.

In JUI the popup covers the whole window (`position: fixed`). In a mockup it covers its own box, which is at least
24 em tall: place it last in a section, or at the top of a `page` mockup with the content it covers alongside.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| popup-width | variant | auto, small, medium, large | auto | Maximum panel width (JUI `width(Length)`): `auto` is 80 % of the area; the others cap it at 400, 600 and 800 px. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| popup-width | auto | Documents and previews that should use the space. |
| popup-width | small, medium, large | Narrower content, such as a short text or a form-like layout. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Visibility | shown | Placed in the mockup | Mask and panel drawn. JUI popups start hidden and are shown by `handler().show()`. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | | | configurable | The body's content. |

## Behaviour

Shown and hidden by the enclosing component through the popup's handler; the *close* button hides it. Clicking
the mask does nothing. Content taller than the panel scrolls inside the body.

## Content rules

The popup has no title; if the content needs one, put a heading at the top of the body.

## Accessibility

The popup does not trap focus or respond to Escape on its own; in the real screen prefer a modal dialog when the
content is interactive.

## Rules of use

- Use it for large read-only content; use a modal dialog for tasks.
- In a mockup, show a popup in its own `page` or `section` state rather than over a crowded layout.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer. The mask colour `#666` is JUI's own.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--frag-popup-zindex` | component | `10000` | Stacking order. |
| `--frag-popup-bg` | component | `--jui-color-aux-white` | Panel background. |
| `--frag-popup-border` | component | `--jui-line-light` | Panel border. |
| `--frag-popup-border-radius` | component | `--jui-border-radius` | Panel radius. |
| `--frag-popup-shadow` | component | `0 0 15px --jui-color-neutral60` | Panel shadow. |
| `--frag-popup-padding-upper` | component | `1em` | Padding round the close button. |
| `--frag-popup-padding-body` | component | `1em` | Body padding. |
| `--frag-popup-width` | component | `80%` | Panel width. |
| `--frag-popup-height` | component | `80%` | Panel height. |
| `--frag-popup-width-max` | component | `unset` | Maximum panel width; `popup-width` sets 400, 600 or 800 px. |
| `--frag-popup-height-max` | component | `unset` | Maximum panel height. |
| `--jui-color-aux-white`, `--jui-line-light`, `--jui-border-radius`, `--jui-color-neutral60` | semantic | | Panel surface, border, radius and shadow colour. |

## Template

```html
<div class="popup">
  <div class="mask"></div>
  <div class="inner">
    <div class="upper"><jui-btn label="close" variant="text" compact=""></jui-btn></div>
    <div class="body" data-layout=""><slot></slot></div>
  </div>
</div>
```

## Style

```css
:host {
  display: block;
  position: relative;
  min-height: 24em;
  --frag-popup-zindex: 10000;
  --frag-popup-bg: var(--jui-color-aux-white);
  --frag-popup-border: var(--jui-line-light);
  --frag-popup-border-radius: var(--jui-border-radius);
  --frag-popup-shadow: 0 0 15px var(--jui-color-neutral60);
  --frag-popup-padding-upper: 1em;
  --frag-popup-padding-body: 1em;
  --frag-popup-width: 80%;
  --frag-popup-height: 80%;
  --frag-popup-width-max: unset;
  --frag-popup-height-max: unset;
}
:host([popup-width="small"]) { --frag-popup-width-max: 400px; }
:host([popup-width="medium"]) { --frag-popup-width-max: 600px; }
:host([popup-width="large"]) { --frag-popup-width-max: 800px; }
.popup {
  position: absolute;
  z-index: var(--frag-popup-zindex);
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mask { position: absolute; z-index: 1; inset: 0; background: #666; opacity: 0.2; }
.inner {
  border: 1px solid var(--frag-popup-border);
  border-radius: var(--frag-popup-border-radius);
  background-color: var(--frag-popup-bg);
  box-shadow: var(--frag-popup-shadow);
  z-index: 2;
  margin: auto;
  width: var(--frag-popup-width);
  max-width: var(--frag-popup-width-max);
  height: var(--frag-popup-height);
  max-height: var(--frag-popup-height-max);
  display: flex;
  flex-direction: column;
}
.upper { display: flex; justify-content: flex-end; padding: var(--frag-popup-padding-upper); }
.body { display: block; flex-grow: 1; overflow: auto; padding: var(--frag-popup-padding-body); }
```

## Example

```xml
<div layout="column" gap="4">
  <jui-popup>
    <h3>Quarterly report</h3>
    <p>The popup holds large read-only content — a preview, a document or an image — over a light mask.</p>
    <p>Content taller than the panel scrolls inside the body.</p>
  </jui-popup>
  <jui-popup popup-width="small">
    <p>With popup-width="small" the panel is at most 400 px wide.</p>
  </jui-popup>
</div>
```
