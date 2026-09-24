---
name: jui-file-upload-control
version: 1.0.0
kind: composed
status: active
summary: FileUploadControl control — a drag-and-drop region for uploading files, with the attached files listed beneath it.
---

# FileUploadControl (control)

## Purpose

Represents JUI's **FileUploadControl**: attach files by dropping them on a region or browsing for them; each file
uploads straight away (through the configured uploader) and is listed beneath the region with its progress or
outcome. Existing attachments can be shown and removed too. The value is the list of attachments
(`List<FileAttachment>`). Use it for documents, images and other files attached to a record. Use
`jui-avatar-selector-control` for a profile picture. The label and errors come from the enclosing
`jui-control-form-cell` or `jui-control-field`.

## Anatomy

- **Drop region** (JUI `.dropRegion`) — a tinted, dashed, rounded region with an upload icon in a circle and the
  prompt with a *browse* link. Compact, it is a single row. When the file limit is reached it is replaced by a
  limit message.
- **Message** — a file validation message (size, type) under the region.
- **Attachments** (JUI `.list`) — one `jui-file-attachment` per file (default slot).

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| prompt | content | text | Drag and drop files here or | Text in the drop region before the browse link. |
| browse-label | content | text | browse | The browse link. |
| compact | variant | boolean | | A single-row drop region (JUI `Config.Style.COMPACT`). |
| limit-reached | state | boolean | | The file limit (JUI `limit`) is reached: the drop region shows the limit message instead. |
| limit-message | content | text | Maximum number of files reached | Shown in place of the prompt at the limit. |
| message | content | text | | A file validation message under the region (JUI `fileValidator` result), such as `Cannot exceed 10Mb`. |
| hide-region | variant | boolean | | Hides the drop region: a limit of one with its file attached, where JUI replaces the region by the file. |
| disabled | state | boolean | | Disabled (JUI `disable()`). |
| read-only | state | boolean | | Read-only: no drop region; attachments without remove actions (JUI `readOnly`). |
| invalid | state | boolean | | Failed control validation (such as a required attachment): region outlined in the error colour. |
| waiting | state | boolean | | Waiting for its value: region pulses, contents hidden. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| compact | absent | The standard, roomy region: the main attachment area of a form. |
| compact | present | A single row: secondary attachments, dialogs, tight layouts. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | Tinted dashed region. |
| Interaction | drag | Files dragged over, or `state="drag"` | A glow around the region. |
| Interaction | focus | `:focus-within` | Soft focus ring around the region. |
| Capacity | open | Default | The prompt and browse link. |
| Capacity | limit-reached | `limit-reached` property | The limit message; the region no longer accepts files. |
| Availability | enabled | Default | — |
| Availability | disabled | `disabled` property | Half opacity; not-allowed cursor. |
| Availability | read-only | `read-only` property | Drop region hidden; attachments listed without remove actions. |
| Validation | valid | Default | — |
| Validation | invalid | `invalid` property | Region border in the error colour. |
| Activity | idle | Default | — |
| Activity | waiting | `waiting` property | Contents hidden; the region pulses. |

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | jui-file-attachment | jui-file-attachment | Stacked beneath the region | The attached files. |

## Behaviour

Dropping files on the region, or choosing them through the browse link, validates each (the file validator) and
uploads it, listing it with a progress bar; when the upload finishes it shows as uploaded, or with its error.
Removing an uploaded file drops it from the value; removing an existing one marks it deleted (JUI
`includeRemoved`) or drops it. Each change is reported (**Control values**). At the limit, further files are
refused.

## Content rules

Say what may be attached in the field's guidance (`PDF or images, up to 10 MB`), not in the prompt.

## Accessibility

The browse link opens the system file chooser and is reachable by keyboard; drop is never the only way to add a
file. Each attachment's remove action needs an accessible name (`Remove report.pdf`).

## Rules of use

- Set a limit that makes sense; show `limit-reached` when the mockup is at it.
- Put size and type rules in the cell's guidance and show violations with `message`.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-filectl-padding` | component | `1.5em` | Region padding (`0.75em 1.5em` compact). |
| `--jui-filectl-minwidth` | component | `100px` | Region minimum width. |
| `--jui-filectl-minheight` | component | `40px` | Region minimum height. |
| `--jui-filectl-text-size` | component | `1em` | Prompt size. |
| `--jui-filectl-color-text` | component | `#5e7fe8` | Browse link colour (JUI's own value). |
| `--jui-filectl-color` | component | `#a9bdfd` | Region border, icon and glow (JUI's own value). |
| `--jui-filectl-color-bg` | component | `#eef3ff` | Region tint (JUI's own value). |
| `--jui-filectl-item-padding` | component | `0.75em` | Attachment padding (read by `jui-file-attachment`). |
| `--jui-filectl-item-color` | component | `#666` | Attachment title colour. |
| `--jui-filectl-item-color-subtle` | component | `#999` | Attachment details, progress and remove colour. |
| `--jui-filectl-item-color-border` | component | `#eee` | Attachment border. |
| `--jui-filectl-item-color-bg` | component | `#fafafa` | Attachment surface. |
| `--jui-filectl-item-color-error` | component | `--jui-color-error70` | Attachment error colour. |
| `--jui-filectl-border-radius` | component | `6px` | Region radius. |
| `--jui-filectl-icon-scale` | component | `1.5em` | Icon size in the circles. |
| `--jui-filectl-icon-bg` | component | `--jui-color-aux-white` | Icon circle surface. |
| `--jui-filectl-icon-dimension` | component | `2em` | Icon circle size. |
| `--frag-icon-size` | component | `0.6em` | Size of the upload icon (`jui-icon`) in its circle. |
| `--jui-color-error70`, `--jui-color-aux-white` | semantic | | Defaults above. |
| `--jui-ctl-focus-offset`, `--jui-ctl-err-focus`, `--jui-ctl-opacity-disabled`, `--jui-ctl-text-subtle` | semantic | | Focus ring, invalid border, disabled opacity, limit message. |
| `--jui-role-surface-muted`, `--jui-role-surface-raised` | semantic | | Waiting pulse. |

## Template

```html
<div class="control">
  <div class="dropRegion" tabindex="0">
    <div class="icon"><jui-icon name="upload"></jui-icon></div>
    <div class="title"><span class="prompt">{{prompt}}</span> <a>{{browse-label}}</a></div>
    <div class="title limit">{{limit-message}}</div>
  </div>
  <p class="message" data-if="message">{{message}}</p>
  <div class="list"><slot></slot></div>
</div>
```

## Style

```css
:host {
  display: block;
  --jui-filectl-padding: 1.5em;
  --jui-filectl-minwidth: 100px;
  --jui-filectl-minheight: 40px;
  --jui-filectl-text-size: 1em;
  --jui-filectl-color-text: #5e7fe8;
  --jui-filectl-color: #a9bdfd;
  --jui-filectl-color-bg: #eef3ff;
  --jui-filectl-item-padding: 0.75em;
  --jui-filectl-item-color: #666;
  --jui-filectl-item-color-subtle: #999;
  --jui-filectl-item-color-border: #eee;
  --jui-filectl-item-color-bg: #fafafa;
  --jui-filectl-item-color-error: var(--jui-color-error70);
  --jui-filectl-border-radius: 6px;
  --jui-filectl-icon-scale: 1.5em;
  --jui-filectl-icon-bg: var(--jui-color-aux-white);
  --jui-filectl-icon-dimension: 2em;
}
.dropRegion {
  position: relative; overflow: hidden; outline: none;
  display: flex; flex-direction: column; align-items: center; gap: 0.75em;
  padding: var(--jui-filectl-padding); min-width: var(--jui-filectl-minwidth); min-height: var(--jui-filectl-minheight); box-sizing: border-box;
  border: 1px dashed var(--jui-filectl-color); border-radius: var(--jui-filectl-border-radius); background-color: var(--jui-filectl-color-bg);
}
:host([compact]) .dropRegion { flex-direction: row; padding: 0.75em 1.5em; }
.icon {
  display: flex; justify-content: center; align-items: center; flex: none;
  width: var(--jui-filectl-icon-dimension); height: var(--jui-filectl-icon-dimension); border-radius: 100%;
  border: 1px solid var(--jui-filectl-color); background: var(--jui-filectl-icon-bg);
  font-size: var(--jui-filectl-icon-scale); color: var(--jui-filectl-color);
}
.icon jui-icon { --frag-icon-size: 0.6em; }
.title { font-size: var(--jui-filectl-text-size); flex-grow: 1; text-align: center; }
.title a { font-weight: 500; text-decoration: none; color: var(--jui-filectl-color-text); cursor: pointer; }
.title a:hover { text-decoration: underline; }
.title.limit { display: none; color: var(--jui-ctl-text-subtle); }
:host([limit-reached]) .title:not(.limit), :host([state~="limit-reached"]) .title:not(.limit) { display: none; }
:host([limit-reached]) .title.limit, :host([state~="limit-reached"]) .title.limit { display: block; }
:host([state~="drag"]) .dropRegion { box-shadow: 0 0 8px var(--jui-filectl-color); }
:host(:focus-within) .dropRegion, :host([state~="focus"]) .dropRegion { box-shadow: 0 0 0 2px var(--jui-ctl-focus-offset); }
.message { font-size: 0.9em; font-weight: 600; margin: 0.5em 0 0 0; color: var(--jui-filectl-item-color-error); }
.list { display: flex; flex-direction: column; }
:host([hide-region]) .dropRegion, :host([read-only]) .dropRegion { display: none; }
:host([invalid]) .dropRegion { border-color: var(--jui-ctl-err-focus); }
:host([disabled]) .control { opacity: var(--jui-ctl-opacity-disabled); cursor: not-allowed; pointer-events: none; }
:host([waiting]) .dropRegion { animation: jui-waiting 1s infinite; border-color: transparent; }
:host([waiting]) .dropRegion > *, :host([waiting]) .list { visibility: hidden; }
@keyframes jui-waiting { from { background-color: var(--jui-role-surface-muted); } to { background-color: var(--jui-role-surface-raised); } }
```

## Example

```xml
<div layout="grid" cols="2" gap="6" align="start">
  <jui-file-upload-control>
    <jui-file-attachment name="quarterly-report.pdf" info="2.4 MB" status="uploaded"/>
    <jui-file-attachment name="site-photo.jpg" info="4.1 MB" status="uploading" progress="60"/>
    <jui-file-attachment name="scan.tiff" info="Cannot exceed 10Mb" status="error"/>
  </jui-file-upload-control>
  <div layout="column" gap="4">
    <jui-file-upload-control compact="" message="Cannot exceed 10Mb" state="drag"/>
    <jui-file-upload-control compact="" limit-reached="">
      <jui-file-attachment name="contract-signed.pdf" info="Existing file" status="existing"/>
    </jui-file-upload-control>
    <jui-file-upload-control compact="" invalid=""/>
    <jui-file-upload-control compact="" disabled=""/>
  </div>
  <jui-control-field label="Signed contract" description="PDF, up to 10 MB.">
    <jui-file-upload-control hide-region="">
      <jui-file-attachment name="contract-signed.pdf" info="1.2 MB" status="uploaded"/>
    </jui-file-upload-control>
  </jui-control-field>
  <jui-control-field label="Attachments (read-only)">
    <jui-file-upload-control read-only="">
      <jui-file-attachment name="contract-signed.pdf" info="1.2 MB" status="existing" read-only=""/>
    </jui-file-upload-control>
  </jui-control-field>
</div>
```
