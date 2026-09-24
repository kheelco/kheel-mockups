---
component: jui-choice-selector
component-version: 1
target: jui
---

# jui-choice-selector → JUI

## Maps to

The **ChoiceSelector** fragment, `com.effacy.jui.ui.client.fragments.ChoiceSelector` (fragment class
`ChoiceSelector.ChoiceSelectorFragment`), styled by `fragments/ChoiceSelector.css`. A fragment: each option's
handler runs through the enclosing component, which keeps the chosen value and re-renders.

```java
ChoiceSelector.$(parent)
    .variant(ChoiceSelector.Variant.INLINE)
    .option(Option.of("Behind", FontAwesome.arrowTrendDown(), "behind".equals(status), () -> set("behind")).tone(Tone.NEGATIVE))
    .option(Option.of("On track", FontAwesome.check(), "ontrack".equals(status), () -> set("ontrack")).tone(Tone.POSITIVE))
    .option(Option.of("Ahead", FontAwesome.arrowTrendUp(), "ahead".equals(status), () -> set("ahead")).tone(Tone.INFO));
```

(`Option` and `Tone` are the nested `ChoiceSelector.Option` and `ChoiceSelector.Tone`.)

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| variant | `.variant(ChoiceSelector.Variant.…)` | `STANDARD` (default), `CONTROL`, `COMPACT`, `INLINE`, `SEGMENTED`. |
| disabled | `.disable(true)` | Every option gets the `disabled` class and no handler. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | One `.option(Option.of(…))` per `jui-choice-selector-option`, in order; `.option(condition, option)` adds one conditionally. See the `jui-choice-selector-option` mapping. |

## States

Hover is CSS. The chosen option is whatever `State.of(true)` was given at build time: re-render (or rebuild the
fragment) after the handler changes the value.

## Notes

JUI's variables are camel-cased `--juiChoiceSelector-*` (`-relief-border`, `-relief`, `-radius`, `-shadow`,
`-shadow-selected`, `-bg`, `-bg-hover`, `-bg-selected`, `-text`, `-text-hover`, `-text-selected`, `-text-weight`,
`-text-size`, `-option-lr`, `-option-tb`, `-option-radius`, `-option-divider`, `-opacity-disabled`); the mockup's
`--jui-choice-selector-*` tokens correspond one to one. The variants are applied as inline CSS on the fragment
(`fragment.css(…)`), so a custom look is `.css("--juiChoiceSelector-…: …")`.
