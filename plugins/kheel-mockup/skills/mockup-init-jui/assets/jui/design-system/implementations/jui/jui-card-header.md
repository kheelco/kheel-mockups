---
component: jui-card-header
component-version: 1
target: jui
---

# jui-card-header → JUI

## Maps to

The **CardHeader** fragment, `com.effacy.jui.ui.client.fragments.CardHeader` (fragment class
`CardHeader.CardHeaderFragment`), normally the first child of a `Card`. A fragment: its title click is dispatched
by the enclosing component.

```java
CardHeader.$(card)
    .icon(FontAwesome.briefcase())
    .title("Senior designer")
    .subtitle("Melbourne · Full time")
    .onclick(() -> open(job));
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| title | `.title(…)` | Or `.titleBuilder(el -> …)` for rich content. |
| subtitle | `.subtitle(…)` | Or `.subtitleBuilder(el -> …)`. |
| icon | `.icon(FontAwesome.…())` | See the `jui-icon` mapping. `.iconCss("color: …")` colours it. |
| link | `.onclick(Invoker)` | Renders the title as an `a` (`juiCardHeader_title`); `.onclick(invoker, condition)` sets it conditionally. |

## Slots

None.

## States

Hover on a linked title is handled by the fragment's CSS. Nothing to wire.

## Notes

JUI has no CSS variables for the header; the mockup's `--jui-card-header-*` tokens stand in for values fixed in
`FragmentStyles.css` (`gap: 1em`, icon `font-size: 2em`, subtitle `0.9em`). Use `.titleCss(…)`/`.subtitleCss(…)`
to adjust one header. Note that JUI's rule for the non-linked title's weight has a selector typo
(`.juiCardHeader_innerinner`), so a non-linked title may render at normal weight; the mockup shows the intended
500.
