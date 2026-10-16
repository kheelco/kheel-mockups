---
name: jui-avatar
version: 1.0.0
kind: composed
status: active
summary: Avatar fragment — a circular picture of a person, from an image, initials or a placeholder icon.
---

# Avatar (fragment)

## Purpose

Represents JUI's **Avatar** fragment: a circle that stands for a person — their image when there is one, otherwise
their initials over a faint person icon, otherwise just the icon. Use it beside names in lists, cards, headers and
comments. Being a fragment, a clickable avatar's click is handled by the enclosing component (see **Fragment
events**). Use the **AvatarSelectorControl** in a form where the user chooses or uploads their avatar.

## Anatomy

A round frame (with a solid or dashed ring, or none) holding one of: the image, inside a thin white border; the
initials in bold uppercase, laid semi-transparently over a light person icon; or the icon alone. If the image
fails to load, an alert icon replaces it and hovering shows JUI's explanation.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| image | content | boolean | | Shows a placeholder for the person's image (JUI `Avatar.$(parent, href)` with a URL). |
| initials | content | text | | One or two letters (JUI `initials(…)`, which derives them from a full name). Shown when there is no image. |
| icon | content | icon | user | The fallback icon (JUI `icon(…)`, default `FontAwesome.user()`). |
| size | variant | xsmall, small, medium, large, xlarge | large | Diameter relative to the surrounding text (JUI `size(Length)`): `1.5em`, `2em`, `2.5em`, `3.5em` (JUI's default) or `5em`. |
| border | variant | none, solid, dashed | solid | The ring round the avatar (JUI `border(Avatar.BorderStyle)`). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| size | xsmall, small | Inline with text, in table rows and comment threads. |
| size | medium | Cards and list items. |
| size | large, xlarge | Profile headers. |
| border | solid | The default light ring. |
| border | dashed | An empty or "add a person" slot. |
| border | none | Tight clusters and overlapping groups. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Image | loaded | `image` property | The image fills the circle. |
| Image | failed | Image fails to load | Alert icon in place of the image; hovering shows "Your avatar failed to load…". |
| Interaction | default | At rest | — |
| Interaction | hover | `:hover` when clickable | Pointer cursor. |

## Behaviour

With an action (JUI `onclick`, in a mockup `href` or `opens`) the avatar is clickable; its click is handled by the
enclosing component (**Fragment events**). A broken image is replaced by the failed state automatically.

## Content rules

Initials are the first letters of the first and last names, uppercase: `JC` for Jane Citizen. Don't put other text
in an avatar.

## Accessibility

The avatar is decorative when the person's name is beside it. Where it stands alone, give it `aria-label` with the
person's name. A clickable avatar needs a name that says what it opens.

## Rules of use

- Always show the person's name nearby, or in a tooltip, unless the context makes it obvious.
- Use one size per list so rows line up.
- Use `dashed` only for an empty slot someone can fill.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-avatar-size` | component | `3.5em` | Diameter; `size` repoints it. |
| `--jui-avatar-color` | component | `#ddd` | The fallback icon's colour. |
| `--jui-avatar-text-color` | component | `#999` | Initials colour. |
| `--jui-avatar-text-bg` | component | `#fff` | Wash behind the initials (at 50% opacity). |
| `--jui-avatar-border-color` | component | `#eee` | Ring colour. |
| `--jui-avatar-border-th` | component | `2px` | Ring thickness. |
| `--jui-avatar-img-border-color` | component | `#fff` | Border inside the ring, round the image. |
| `--jui-avatar-img-border-th` | component | `2px` | Thickness of that border. |
| `--jui-avatar-img-bg` | component | `--jui-color-neutral20` | Placeholder image fill (mockup only). |
| `--jui-color-neutral20`, `--jui-color-neutral40`, `--jui-color-aux-white` | semantic | | Placeholder image fill and figure. |
| `--jui-color-warning50` | semantic | | Failed-image icon. |

## Template

```html
<span class="avatar">
  <span class="img" data-if="image"><jui-icon name="user"></jui-icon></span>
  <span class="failed" data-if="image"><jui-icon name="triangle-alert"></jui-icon></span>
  <span class="ico" data-if="!image">
    <i data-if="initials">{{initials}}</i>
    <jui-icon name="{{icon}}"></jui-icon>
  </span>
</span>
```

## Style

```css
:host {
  display: inline-flex;
  vertical-align: middle;
  flex: none;
  --jui-avatar-size: 3.5em;
  --jui-avatar-color: #ddd;
  --jui-avatar-text-color: #999;
  --jui-avatar-text-bg: #fff;
  --jui-avatar-border-color: #eee;
  --jui-avatar-border-th: 2px;
  --jui-avatar-img-border-color: #fff;
  --jui-avatar-img-border-th: 2px;
  --jui-avatar-img-bg: var(--jui-color-neutral20);
}
:host([size="xsmall"]) { --jui-avatar-size: 1.5em; }
:host([size="small"]) { --jui-avatar-size: 2em; }
:host([size="medium"]) { --jui-avatar-size: 2.5em; }
:host([size="xlarge"]) { --jui-avatar-size: 5em; }
.avatar {
  position: relative; display: flex; justify-content: center; align-items: center;
  font-size: var(--jui-avatar-size); width: 1em; min-width: 1em; height: 1em; min-height: 1em;
  border-radius: 100%;
}
:host([border="solid"]) .avatar { border: var(--jui-avatar-border-th) solid var(--jui-avatar-border-color); }
:host([border="dashed"]) .avatar { border: var(--jui-avatar-border-th) dashed var(--jui-avatar-border-color); }
:host([href]) .avatar, :host([opens]) .avatar { cursor: pointer; }
:host(:hover[href]) .avatar, :host([state~="hover"]) .avatar { cursor: pointer; }
.img {
  display: flex; align-items: flex-end; justify-content: center; overflow: hidden;
  width: 100%; height: 100%; border-radius: 100%;
  border: var(--jui-avatar-img-border-th) solid var(--jui-avatar-img-border-color);
  background: var(--jui-avatar-img-bg); color: var(--jui-color-aux-white);
}
.img jui-icon { font-size: 0.85em; margin-bottom: -0.08em; color: var(--jui-color-neutral40); }
.ico {
  position: relative; display: flex; justify-content: center; align-items: center; overflow: hidden;
  width: 100%; height: 100%; border-radius: 100%; border: 0.1em solid transparent;
}
.ico jui-icon { font-size: 0.8em; color: var(--jui-avatar-color); }
i {
  position: absolute; inset: 0; display: flex; justify-content: center; align-items: center;
  font-size: 0.36em; font-style: normal; font-weight: 700; text-transform: uppercase;
  color: var(--jui-avatar-text-color); background: var(--jui-avatar-text-bg); opacity: 0.5; z-index: 1;
}
.failed { display: none; }
:host([state~="failed"]) .img { display: none; }
:host([state~="failed"]) .failed { display: flex; justify-content: center; align-items: center; font-size: 0.5em; color: var(--jui-color-warning50); }
```

## Example

```xml
<div layout="column" gap="4">
  <div layout="row" gap="4" align="center">
    <jui-avatar image="" size="xsmall"/>
    <jui-avatar image="" size="small"/>
    <jui-avatar image="" size="medium"/>
    <jui-avatar image=""/>
    <jui-avatar image="" size="xlarge"/>
  </div>
  <div layout="row" gap="4" align="center">
    <jui-avatar initials="JC"/>
    <jui-avatar initials="AL" size="medium"/>
    <jui-avatar/>
    <jui-avatar icon="users" size="medium"/>
    <jui-avatar icon="plus" border="dashed"/>
    <jui-avatar initials="MB" border="none"/>
    <jui-avatar image="" state="failed"/>
  </div>
</div>
```
