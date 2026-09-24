---
component: jui-card
component-version: 1
target: jui
---

# jui-card → JUI

## Maps to

The **Card** fragment, `com.effacy.jui.ui.client.fragments.Card` (fragment class `Card.CardFragment`, which extends
the Paper fragment's `APaperFragment` and so takes children). A fragment: it is built inside a component's
renderer, and its click is dispatched by that component.

```java
Card.$(parent)
    .padding(Insets.em(1))
    .gap(Length.em(0.75))
    .onclick(() -> navigateTo(job))
    .$(card -> {
        CardHeader.$(card).icon(FontAwesome.briefcase()).title("Senior designer").subtitle("Melbourne");
        P.$(card).text("Lead the design of our hiring tools.");
    });
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| variant | `.variant(Card.Variant.OUTLINED)` | `outlined` is the default. `plain` → `.variant(Card.Variant.create(""))` (check: any custom variant style works; an empty class gives no chrome). |
| horizontal | `.horizontal()` | |
| padding | `.padding(Insets.…)` | Spacing step → length: 1 = 0.25rem, 2 = 0.5rem, 3 = 0.75rem, 4 = 1rem, 5 = 1.25rem, 6 = 1.5rem, 8 = 2rem. E.g. `Insets.em(1)` or `Insets.rem(…)` (check the factory exists). |
| gap | `.gap(Length.em(…))` | Same steps as padding (1 rem ≈ 1 em at the default font size). |
| clickable | `.onclick(…)` | Adds the `clickable` class (pointer cursor). |
| hover-lift | the `juiFragments-hover-shadow` class | A utility class in `FragmentStyles.css` (`:hover` → `box-shadow: 0 0 10px #ccc`). Check how your JUI version adds a class to a fragment's root; failing that, wrap the card in `Div.$(parent).style("juiFragments-hover-shadow")`. |
| selected | `.css("--juiCard-outlined-border: var(--jui-color-primary50)")` | No built-in selected state; the enclosing component sets it. |

Also available: `.width(Length)`, `.height(Length)`, `.minHeight(Length)`.

## Slots

| Slot | Maps to |
| --- | --- |
| default | The card's children: `.$(card -> { … })` or `Card.$(parent).$(child1, child2)`. |

## States

Hover lift is pure CSS. Selection is not built in: the enclosing component repoints the border token.

## Notes

JUI's CSS variables are camel-cased: `--juiCard-outlined-bg`, `--juiCard-outlined-border`,
`--juiCard-outlined-border-radius`, `--juiCard-outlined-shadow-color`, `--juiCard-outlined-shadow-size`; the
mockup's `--jui-card-outlined-*` tokens correspond. In JUI they default to `--jui-color-aux-white`,
`--jui-line-light` and `--jui-border-radius`; the mockup starts them from the theme's `--jui-frag-card-*` tokens,
which resolve to the same look. `--jui-card-padding`, `--jui-card-gap` and `--jui-card-hover-shadow` have no JUI
variable (inline `padding`/`gap` and the utility class).
