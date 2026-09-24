---
component: jui-control-field
component-version: 1
target: jui
---

# jui-control-field → JUI

## Maps to

The **ControlField** fragment, `com.effacy.jui.ui.client.fragments.control.ControlField` — inserted into a DOM
builder inside a component's renderer; the control is added as its child, and the fragment listens to the
control's invalidation to show its messages.

```java
ControlField.$(parent)
    .label("Email address")
    .description("We'll never share it.")
    .required()
    .$(field -> Cpt.$(field, Controls.text(cfg -> cfg.validator(…))));
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| label | `.label(…)` | |
| description | `.description(…)` | Rendered under the label. |
| required | `.required()` | Presentation only. |
| error | — | Shown automatically from the control's invalidation (`handleInvalidation`); set `invalid` on the control in the mockup. |
| variant | `ControlField.Variant.SIDE_BY_SIDE` | Applied as a fragment variant (`.variant(…)` / `.use(…)`; check the method on `FragmentWithChildren`). |
| invert-required | `ControlField.Variant.INVERT_REQUIRED` | As above. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The fragment's children: the control (`Cpt.$(field, control)`). |

## States

Error: toggled by the control's invalidation (the fragment adds its `error` style and fills the messages list).

## Notes

`.styles(ILocalCSS)` swaps the stylesheet; tokens `--jui-frag-controlfield-*` retune it. Inside a `ControlForm`
use its cells (`jui-control-form-cell`) instead.
