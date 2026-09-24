---
component: jui-file-upload-control
component-version: 1
target: jui
---

# jui-file-upload-control → JUI

## Maps to

The **FileUploadControl** control, `com.effacy.jui.ui.client.control.FileUploadControl` (value type
`List<FileUploadControl.FileAttachment>`; see JUI's `cpt_files.md`).

```java
Controls.fileUpload(cfg -> {
    cfg.style(FileUploadControl.Config.Style.COMPACT);
    cfg.uploader(new GCPSignedUrlFileUploader("app/uploader", 3000));
    cfg.limit(5);
    cfg.fileValidator(f -> f.size > 104855760L ? Optional.of("Cannot exceed 10Mb") : Optional.empty());
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| compact | `cfg.style(FileUploadControl.Config.Style.COMPACT)` | |
| limit-reached | `cfg.limit(n)` | The region switches to its limit form when `n` files are attached. |
| hide-region | `cfg.limit(1)` with a file attached | JUI replaces the region by the file. |
| message | `cfg.fileValidator(…)` | The validator's message for a rejected file. |
| prompt, browse-label, limit-message | — | JUI's own texts; check whether they are configurable. |
| (default slot) | the value | Existing files via `ctl.setValue(List.of(…))` (status `EXISTING`); uploads become `CREATED` with the uploader's `reference`. |
| disabled, read-only, invalid, waiting | as for `jui-text-control` | |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The attachments; each `jui-file-attachment` is one `FileAttachment` rendered by `renderAttachment(…)`. |

## States

| State | How in JUI |
| --- | --- |
| focus, hover | Handled by the control's stylesheet (JUI toggles the `focus` style class as the input gains focus). |
| disabled | `ctl.disable()` / `ctl.enable()`, or `disable("ref")` / `enable("ref")` on a `ControlForm`. |
| read-only | Configuration `readOnly()` (verified in docs for `TextControl`); at runtime check `readOnly(boolean)` on the control. |
| invalid | Set by validation: `cfg.validator(…)` then `validate()`, or externally via `ctl.invalidator().invalidate(…)` / `accept(errors)` for server errors (paths matched by `name(…)` / `acceptor(…)`). The messages are displayed by the enclosing `ControlForm` cell or `ControlField`, not by the control. |
| waiting | `ctl.waiting(true)` while its value loads, `waiting(false)` after `setValue(…)`; `controls().waiting(…)` on a component does it for all its controls. |
| empty / filled | Follows the value: `setValue(…)` assigns it without dirtying; `value()` reads it. |
| drag | Applied while files are dragged over the region (`drag` style). |

## Notes

Every control needs an `IFileUploader` (AWS and GCP implementations exist); consider a project helper that
pre-configures it. `includeRemoved` keeps removed existing files in the value with status `DELETED`. Override
`renderAttachment(ElementBuilder, FileAttachmentItem)` for a different attachment rendering.
