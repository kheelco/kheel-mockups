---
name: jui-avatar-selector-control
version: 1.0.0
kind: composed
status: active
summary: AvatarSelectorControl control — shows the current avatar with change and remove actions, and a panel to pick a stock avatar or upload and crop an image.
---

# AvatarSelectorControl (control)

## Purpose

Represents JUI's **AvatarSelectorControl**: choose the picture for a person or an organisation. It shows the
current avatar (or a placeholder) with *Change* and *Remove* links; *Change* opens a panel offering a grid of
stock avatars and an upload drop zone, and an uploaded image is cropped to a circle before it is applied. The
value is the chosen image. Use it only for avatars and logos; use `jui-file-upload-control` for general files.
The label comes from the enclosing `jui-control-form-cell` or `jui-control-field`.

## Anatomy

- **Preview** (JUI `.preview`) — a 4em circle showing the image (JUI `.avatarImage`), or a grey user placeholder,
  and beside it the actions: *Change* in the link colour and *Remove* in grey (JUI `.changeLink`, `.removeLink`).
- **Panel** (JUI `.panel`, shown while open) — a light bordered panel with a section label and a grid of six stock
  avatars (JUI `.stockGrid`), then a second section label and a dashed upload drop zone (JUI `.dropZone`).
- **Crop** (while cropping) — instructions, the image on a canvas with the crop circle, and an *Apply* link.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| src | content | text | | URL of the current avatar image. Absent shows the placeholder. |
| change-label | content | text | Change | The change link. |
| remove-label | content | text | Remove | The remove link, shown when there is an image. |
| stock-label | content | text | Choose an avatar | Label above the stock avatars. |
| upload-label | content | text | Or upload an image | Label above the drop zone. |
| upload-prompt | content | text | Drop an image here or click to browse | Text in the drop zone. |
| disabled | state | boolean | | Disabled: no actions (JUI `disable()`). |
| read-only | state | boolean | | Read-only: no actions (JUI `readOnly`). |
| invalid | state | boolean | | Failed validation, such as a required avatar missing. |
| waiting | state | boolean | | Waiting for its value: the circle pulses. |

## Variants

None.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Preview and links. |
| Interaction | hover | `:hover` on a link, stock avatar or drop zone | Links underline (*Remove* turns red); stock avatars grow and outline; the drop zone tints. |
| Interaction | dragover | An image dragged over the drop zone, or `state="dragover"` | Drop zone outlined and tinted in the primary colour. |
| Disclosure | closed | Default | Preview only. |
| Disclosure | open | `state="open"` (in JUI: clicking *Change*) | The stock and upload panel beneath the preview. |
| Disclosure | crop | `state="crop"` (after an image is uploaded) | The crop step in the panel instead of the stock grid and drop zone. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Links hidden. |
| Availability | read-only | `read-only` property | Links hidden. |
| Validation | valid | Default | — |
| Validation | invalid | `invalid` property | The circle is outlined in the error colour. |
| Activity | idle | Default | — |
| Activity | waiting | `waiting` property | The circle pulses; links hidden. |
| Content | empty | No `src` | Grey circle with a user placeholder; no *Remove*. |
| Content | filled | `src` set | The image in the circle; *Remove* shown. |

## Behaviour

*Change* opens the panel. Clicking a stock avatar applies it and closes the panel. Dropping or choosing an image
opens the crop step; *Apply* crops, applies and closes it. *Remove* clears the avatar. Each change is reported
(**Control values**).

## Content rules

Link labels are single verbs (`Change`, `Remove`, `Apply`).

## Accessibility

The image has alternative text naming whose avatar it is. Links are buttons reachable by keyboard; stock avatars
are buttons with names; the drop zone also opens the file chooser on click or Enter.

## Rules of use

- Show the panel with `state="open"`, and the crop step with `state="open crop"`.
- Don't use for anything other than a person's or organisation's picture.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-role-interactive-primary`, `--jui-color-primary50` | semantic | | Change and Apply links; hover and drag outlines (JUI reads `--jui-color-primary`, falling back to its own blue `#0066cc`; the nearest defined token is used). |
| `--jui-color-neutral60`, `--jui-color-error60` | semantic | | Remove link, and its hover colour. |
| `--jui-color-neutral05`, `--jui-color-neutral10`, `--jui-color-neutral20`, `--jui-color-neutral30`, `--jui-color-neutral50`, `--jui-color-neutral70`, `--jui-color-aux-white` | semantic | | Placeholder circle (`#f0f0f0`), placeholder icon (`#bbb`), panel (`#fafafa`, `#e0e0e0`), drop zone (`#ccc`), labels (`#666`, `#888`), stock surface. |
| `--jui-color-primary05`, `--jui-color-primary10` | semantic | | Drop zone tint on hover and drag (JUI `#f5f5ff`, `#eef0ff`). |
| `--jui-color-primary20`, `--jui-color-secondary20`, `--jui-color-tertiary20`, `--jui-color-info20`, `--jui-color-success20`, `--jui-color-warning20` | semantic | | Stand-in colours for the six stock avatar images. |
| `--jui-ctl-err-focus`, `--jui-role-surface-muted`, `--jui-role-surface-raised` | semantic | | Invalid outline; waiting pulse. |

## Template

```html
<div class="control">
  <div class="preview">
    <div class="avatarImage">
      <img data-if="src" src="{{src}}" alt="">
      <jui-icon data-if="!src" name="user"></jui-icon>
    </div>
    <div class="actions">
      <span class="changeLink">{{change-label}}</span>
      <span class="removeLink" data-if="src">{{remove-label}}</span>
    </div>
  </div>
  <div class="panel">
    <div class="choose">
      <div><span class="sectionLabel">{{stock-label}}</span>
        <div class="stockGrid">
          <span class="stockItem s1"><jui-icon name="user"></jui-icon></span>
          <span class="stockItem s2"><jui-icon name="user"></jui-icon></span>
          <span class="stockItem s3"><jui-icon name="user"></jui-icon></span>
          <span class="stockItem s4"><jui-icon name="user"></jui-icon></span>
          <span class="stockItem s5"><jui-icon name="user"></jui-icon></span>
          <span class="stockItem s6"><jui-icon name="user"></jui-icon></span>
        </div>
      </div>
      <div><span class="sectionLabel">{{upload-label}}</span>
        <div class="dropZone"><jui-icon name="upload"></jui-icon><span>{{upload-prompt}}</span></div>
      </div>
    </div>
    <div class="crop">
      <p class="cropInstructions">Drag to position the circle over the part of the image to use.</p>
      <div class="cropCanvasWrap"><div class="canvas"><div class="circle"></div></div></div>
      <div class="cropActions"><span class="removeLink">Cancel</span><span class="cropApplyLink">Apply</span></div>
    </div>
  </div>
</div>
```

## Style

```css
:host { display: block; }
.control { display: flex; flex-direction: column; gap: 0.75em; }
.preview { display: flex; align-items: center; gap: 1em; }
.avatarImage {
  width: 4em; height: 4em; border-radius: 50%; overflow: hidden; flex: none;
  display: flex; align-items: center; justify-content: center; background: var(--jui-color-neutral10);
}
.avatarImage img { width: 100%; height: 100%; object-fit: cover; }
.avatarImage jui-icon { font-size: 1.8em; color: var(--jui-color-neutral30); }
.actions { display: flex; gap: 1em; }
.changeLink, .cropApplyLink { color: var(--jui-role-interactive-primary); cursor: pointer; font-size: 0.9em; }
.cropApplyLink { font-weight: 600; }
.removeLink { color: var(--jui-color-neutral60); cursor: pointer; font-size: 0.9em; }
.changeLink:hover, .cropApplyLink:hover { text-decoration: underline; }
.removeLink:hover { text-decoration: underline; color: var(--jui-color-error60); }
:host([state~="hover"]) .changeLink { text-decoration: underline; }
.panel {
  display: none; flex-direction: column; gap: 1em; padding: 1em;
  border: 1px solid var(--jui-color-neutral20); border-radius: 0.5em; background: var(--jui-color-neutral05);
}
:host([state~="open"]) .panel { display: flex; }
.choose { display: flex; flex-direction: column; gap: 1em; }
.crop { display: none; }
:host([state~="crop"]) .choose { display: none; }
:host([state~="crop"]) .crop { display: block; }
.sectionLabel { display: block; font-size: 0.85em; font-weight: 600; color: var(--jui-color-neutral70); margin-bottom: 0.5em; }
.stockGrid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.5em; }
.stockItem {
  width: 100%; aspect-ratio: 1; border-radius: 50%; box-sizing: border-box; border: 2px solid transparent; cursor: pointer;
  display: flex; align-items: center; justify-content: center; font-size: 1.4em; color: var(--jui-color-aux-white);
  transition: border-color 0.15s, transform 0.15s;
}
.s1 { background: var(--jui-color-primary20); } .s2 { background: var(--jui-color-secondary20); } .s3 { background: var(--jui-color-tertiary20); }
.s4 { background: var(--jui-color-info20); } .s5 { background: var(--jui-color-success20); } .s6 { background: var(--jui-color-warning20); }
.stockItem:hover, :host([state~="hover"]) .s1 { border-color: var(--jui-color-primary50); transform: scale(1.1); }
.dropZone {
  display: flex; flex-direction: column; align-items: center; gap: 0.5em; padding: 1.5em; text-align: center; cursor: pointer;
  border: 2px dashed var(--jui-color-neutral30); border-radius: 0.5em; color: var(--jui-color-neutral50);
  transition: border-color 0.15s, background 0.15s;
}
.dropZone:hover { border-color: var(--jui-color-primary50); background: var(--jui-color-primary05); }
:host([state~="dragover"]) .dropZone { border-color: var(--jui-color-primary50); background: var(--jui-color-primary10); }
.cropInstructions { font-size: 0.85em; color: var(--jui-color-neutral50); margin: 0 0 0.5em 0; }
.cropCanvasWrap { display: flex; justify-content: center; }
.canvas {
  position: relative; width: 12em; height: 9em; border-radius: 0.25em; cursor: crosshair;
  background: linear-gradient(135deg, var(--jui-color-info20), var(--jui-color-success20));
}
.circle { position: absolute; left: 3.25em; top: 1.25em; width: 6.5em; height: 6.5em; border-radius: 50%; border: 2px dashed var(--jui-color-aux-white); }
.cropActions { display: flex; justify-content: flex-end; gap: 1em; margin-top: 0.5em; }
:host([disabled]) .actions, :host([read-only]) .actions, :host([waiting]) .actions { display: none; }
:host([disabled]) .panel, :host([read-only]) .panel { display: none; }
:host([invalid]) .avatarImage { box-shadow: 0 0 0 2px var(--jui-ctl-err-focus); }
:host([waiting]) .avatarImage { animation: jui-waiting 1s infinite; }
:host([waiting]) .avatarImage > * { visibility: hidden; }
@keyframes jui-waiting { from { background-color: var(--jui-role-surface-muted); } to { background-color: var(--jui-role-surface-raised); } }
```

## Example

```xml
<div layout="grid" cols="2" gap="6" align="start">
  <div layout="column" gap="5">
    <jui-avatar-selector-control/>
    <jui-avatar-selector-control src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23c9d8e8'/%3E%3Ccircle cx='32' cy='26' r='12' fill='%237a93ad'/%3E%3Cellipse cx='32' cy='62' rx='22' ry='18' fill='%237a93ad'/%3E%3C/svg%3E" state="hover"/>
    <jui-avatar-selector-control invalid=""/>
    <jui-avatar-selector-control src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23c9d8e8'/%3E%3Ccircle cx='32' cy='26' r='12' fill='%237a93ad'/%3E%3Cellipse cx='32' cy='62' rx='22' ry='18' fill='%237a93ad'/%3E%3C/svg%3E" read-only=""/>
    <jui-avatar-selector-control waiting=""/>
  </div>
  <div layout="column" gap="5">
    <jui-control-field label="Profile picture">
      <jui-avatar-selector-control state="open"/>
    </jui-control-field>
    <jui-avatar-selector-control state="open crop"/>
  </div>
</div>
```
