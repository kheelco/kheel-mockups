---
component: jui-progress-sequence-step
component-version: 1
target: jui
---

# jui-progress-sequence-step → JUI

## Maps to

A step of a **ProgressSequence**: `ProgressSequence.Config.add(label, ProgressSequence.Config.State)`. Not a
component of its own.

```java
cfg.add("Members", ProgressSequence.Config.State.ACTIVE);
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| label | `add(label, …)` | |
| status | `add(…, State.…)` | `pending` → `PENDING` (also the default for `null`), `active` → `ACTIVE`, `done` → `DONE`. |

## Slots

None.

## States

Fixed at configuration; see the sequence mapping.

## Notes

First, inner and last positions are handled by JUI's rendering (`expand` and `line` elements, `center` class).
