---
component: jui-file-attachment
component-version: 1
target: jui
---

# jui-file-attachment → JUI

## Maps to

Not a class of its own: one attachment row of **FileUploadControl**, rendered by its
`renderAttachment(ElementBuilder, FileAttachmentItem)` for each `FileUploadControl.FileAttachment` in the value.

```java
// Existing files are provided as the control's value:
uploadCtl.setValue(existingFiles); // FileAttachment instances with status EXISTING and an id
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| name | the attachment's file name | |
| info | size / error text | |
| status | `FileAttachment.Status` | `existing` → `EXISTING`; `uploaded` → `CREATED` (after a successful upload); `uploading` and `error` are transient states of the item during upload. |
| progress | upload progress | Driven by the uploader. |
| read-only | the control's read-only state | |

## Slots

None.

## States

Removal is handled by the control (`x` for new files, bin for existing ones).

## Notes

Never build these by hand; they come from the control's value and uploads.
