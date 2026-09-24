---
component: jui-choice-selector-option
component-version: 1
target: jui
---

# jui-choice-selector-option → JUI

## Maps to

A `ChoiceSelector.Option` record (`com.effacy.jui.ui.client.fragments.ChoiceSelector.Option`) passed to the
selector's `.option(…)`. It is not a fragment of its own: the selector renders each option as a `div` holding an
optional `em` icon and a `span` label.

```java
Option.of("On track", FontAwesome.check(), ChoiceSelector.State.of(active, false), () -> set("ontrack"))
    .tone(ChoiceSelector.Tone.POSITIVE)
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| label | `Option.of(label, …)` | |
| icon | `Option.of(label, icon, …)` | A FontAwesome class; see the `jui-icon` mapping. |
| active | `Option.of(…, boolean active, handler)` or `State.of(active)` | |
| disabled | `State.of(active, true)` | A disabled option gets no handler and is never shown active. |
| tone | `.tone(ChoiceSelector.Tone.…)` | `POSITIVE`, `CAUTION`, `NEGATIVE`, `INFO`; `none` → no call. Tones are CSS strings setting `--juiChoiceSelector-bg-selected` and `--juiChoiceSelector-text-selected` on the option. |

`Option.of(label, Colors/Color, …)` paints a fixed colour whatever the state; the mockup has no equivalent (prefer
tones).

## Slots

None.

## States

`chosen` and `disabled` are fixed at build time from the `State`; hover is CSS.

## Notes

The handler is an `Invoker`; it runs through the enclosing component, which must re-render the selector to move
the choice.
