---
name: jui-file-attachment
version: 1.0.0
kind: composed
status: active
summary: FileAttachment fragment — one file listed in a FileUploadControl, with its upload progress, outcome and remove action.
---

# FileAttachment (fragment)

## Purpose

Represents one entry in a JUI **FileUploadControl**'s attachment list: the row the control renders for each
`FileUploadControl.FileAttachment` in its value (JUI's `renderAttachment(…)`). It shows the file's name, its
status — uploading with progress, uploaded, failed, or an existing file — and the action to remove it. It only
appears inside `jui-file-upload-control`; its remove action is handled by that control (**Fragment events**), and
removing it changes the control's value (**Control values**).

## Anatomy

A bordered, lightly shaded row: a file icon in a white circle (in the error colour when the upload failed); the
file name in semibold over a details line (size and a green tick when uploaded; size and a progress bar while
uploading; the error in the error colour when failed); and the remove action at the end — a cross for a new file,
a bin for an existing one.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| name | content | text | | The file name. |
| info | content | text | | The details line: the file size, or the error message when `status="error"`. |
| status | variant | uploading, uploaded, error, existing | uploaded | The attachment's state (JUI `FileAttachment.Status`: new uploads become `CREATED`, pre-existing files are `EXISTING`). |
| progress | content | 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 | 0 | Upload progress in percent, while `status="uploading"`. |
| read-only | state | boolean | | No remove action (the control is read-only). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| status | uploading | Just added; the upload is in progress. |
| status | uploaded | Uploaded in this session; will be saved with the form. |
| status | error | The upload or file validation failed; `info` says why. |
| status | existing | A file already attached to the record; removed with a bin. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | — |
| Interaction | hover | `:hover` on the remove action | The cross turns a quarter; the bin darkens. |
| Availability | removable | Default | Remove action shown. |
| Availability | read-only | `read-only` property | No remove action. |

## Behaviour

The remove action removes the file from the control's value (an existing file may instead be kept and marked
deleted, JUI `includeRemoved`). The control updates progress and status as the upload proceeds.

## Content rules

Show the file name as uploaded and the size in a short unit (`2.4 MB`). Error text says what is wrong
(`Cannot exceed 10Mb`).

## Accessibility

The remove action is a button named for the file (`Remove report.pdf`). Progress is announced as a percentage.

## Rules of use

- Place only inside `jui-file-upload-control`.
- Use `existing` for files loaded with the record, and `uploaded` for files added in this session.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--jui-filectl-item-padding`, `--jui-filectl-item-color`, `--jui-filectl-item-color-subtle`, `--jui-filectl-item-color-border`, `--jui-filectl-item-color-bg`, `--jui-filectl-item-color-error`, `--jui-filectl-icon-scale`, `--jui-filectl-color` | inherited | | Set by `jui-file-upload-control`: row padding, title, details, border, surface, error colour, icon size and icon colour (with JUI's values as fallbacks). |
| `--frag-icon-size` | component | `0.6em` | Size of the file icon (`jui-icon`) in its circle. |
| `--jui-color-aux-white`, `--jui-color-success70`, `--jui-color-error70` | semantic | | Circle and bar surfaces; uploaded tick; error fallback. |

## Template

```html
<div class="row">
  <div class="icon"><jui-icon name="file-text"></jui-icon></div>
  <div class="content">
    <div class="title">{{name}}</div>
    <div class="info">
      <jui-icon data-if="status=uploaded" class="done" name="circle-check"></jui-icon>
      <span>{{info}}</span>
      <div class="bar" data-if="status=uploading"><div></div></div>
    </div>
  </div>
  <jui-icon data-if="!read-only" class="remove" name="x"></jui-icon>
  <jui-icon data-if="!read-only" class="delete" name="trash-2"></jui-icon>
</div>
```

## Style

```css
:host { display: block; margin-top: 0.5em; }
.row {
  display: flex; align-items: center; gap: 0.5em; border-radius: 6px;
  padding: var(--jui-filectl-item-padding, 0.75em);
  border: 1px solid var(--jui-filectl-item-color-border, #eee); background-color: var(--jui-filectl-item-color-bg, #fafafa);
}
.icon {
  display: flex; justify-content: center; align-items: center; flex: none; width: 2em; height: 2em; border-radius: 100%;
  background-color: var(--jui-color-aux-white); border: 1px solid var(--jui-filectl-item-color-border, #eee);
  font-size: var(--jui-filectl-icon-scale, 1.5em); color: var(--jui-filectl-color, #a9bdfd);
}
.icon jui-icon { --frag-icon-size: 0.6em; }
:host([status="error"]) .icon { color: var(--jui-filectl-item-color-error, var(--jui-color-error70)); }
.content { flex-grow: 1; display: flex; flex-direction: column; gap: 0.1em; min-width: 0; }
.title { font-weight: 600; font-size: 0.95em; color: var(--jui-filectl-item-color, #666); overflow-wrap: anywhere; }
.info { display: flex; align-items: center; gap: 0.5em; font-size: 0.85em; color: var(--jui-filectl-item-color-subtle, #999); }
:host([status="error"]) .info { color: var(--jui-filectl-item-color-error, var(--jui-color-error70)); }
.done { color: var(--jui-color-success70); }
.bar {
  flex-grow: 1; height: 10px; box-sizing: border-box; border-radius: 5px; overflow: hidden;
  border: 1px solid var(--jui-filectl-item-color-border, #eee); background-color: var(--jui-color-aux-white);
}
.bar > div { height: 100%; min-width: 1px; width: 0; background-color: var(--jui-filectl-item-color-subtle, #999); }
:host([progress="0"]) .bar > div { width: 0%; }
:host([progress="10"]) .bar > div { width: 10%; }
:host([progress="20"]) .bar > div { width: 20%; }
:host([progress="30"]) .bar > div { width: 30%; }
:host([progress="40"]) .bar > div { width: 40%; }
:host([progress="50"]) .bar > div { width: 50%; }
:host([progress="60"]) .bar > div { width: 60%; }
:host([progress="70"]) .bar > div { width: 70%; }
:host([progress="80"]) .bar > div { width: 80%; }
:host([progress="90"]) .bar > div { width: 90%; }
:host([progress="100"]) .bar > div { width: 100%; }
.remove, .delete { flex: none; cursor: pointer; margin-right: 0.75em; }
.remove { transition: transform 0.1s ease-in; color: var(--jui-filectl-item-color, #666); }
.remove:hover, :host([state~="hover"]) .remove { transform: rotate(90deg); }
.delete { display: none; color: var(--jui-filectl-item-color-subtle, #999); }
.delete:hover, :host([state~="hover"]) .delete { color: var(--jui-filectl-item-color, #666); }
:host([status="existing"]) .delete { display: inline-flex; }
:host([status="existing"]) .remove { display: none; }
```

## Example

```xml
<jui-file-upload-control compact="">
  <jui-file-attachment name="quarterly-report.pdf" info="2.4 MB" status="uploaded"/>
  <jui-file-attachment name="site-photo.jpg" info="4.1 MB" status="uploading" progress="30"/>
  <jui-file-attachment name="scan.tiff" info="Cannot exceed 10Mb" status="error"/>
  <jui-file-attachment name="contract-signed.pdf" info="1.2 MB" status="existing" state="hover"/>
  <jui-file-attachment name="terms.pdf" info="0.3 MB" status="existing" read-only=""/>
</jui-file-upload-control>
```
