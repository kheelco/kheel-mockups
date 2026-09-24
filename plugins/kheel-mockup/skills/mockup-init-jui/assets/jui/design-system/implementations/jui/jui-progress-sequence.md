---
component: jui-progress-sequence
component-version: 1
target: jui
---

# jui-progress-sequence → JUI

## Maps to

The **ProgressSequence** component, `com.effacy.jui.ui.client.modal.ProgressSequence`, built with
`ProgressSequenceCreator`. Steps are added to its configuration in order.

```java
ProgressSequence steps = ProgressSequenceCreator.build(cfg -> cfg
    .add("Details", ProgressSequence.Config.State.DONE)
    .add("Members", ProgressSequence.Config.State.ACTIVE)
    .add("Billing", ProgressSequence.Config.State.PENDING)
    .add("Confirm", ProgressSequence.Config.State.PENDING));
```

Inside a builder: `ProgressSequenceCreator.$(parent, cfg -> …)`.

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| compressed | `.compressed()` | |

## Slots

| Slot | Maps to |
| --- | --- |
| default | `.add(label, State)` per `jui-progress-sequence-step`, in order. |

## States

None. The configuration is fixed at build: to move to the next step, rebuild the sequence (or the component
holding it) with new states.

## Notes

`style(Style)` swaps the stylesheet and the three icons (`Style.create(styles, iconDone, iconActive,
iconPending)`); the standard icons are FontAwesome check, circle-dot (regular) and circle (regular). The
sequence is a component to place in a dialog's content; JUI has no built-in wizard dialog around it.
