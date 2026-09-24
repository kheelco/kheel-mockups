---
component: jui-paper
component-version: 1
target: jui
---

# jui-paper → JUI

## Maps to

The **Paper** fragment, `com.effacy.jui.ui.client.fragments.Paper` (fragment class `Paper.PaperFragment`, a
fragment with children), styled by the `juiPaper` rules in `FragmentStyles.css`.

```java
Paper.$(parent).$(paper -> {
    H3.$(paper).text("Interview guide");
    P.$(paper).text("Use these questions to structure the first-round call.");
});
```

## Properties

None.

## Slots

| Slot | Maps to |
| --- | --- |
| default | The paper's children: `.$(paper -> { … })`. Layout attributes on the mockup map to `.css("display: flex; flex-direction: column; gap: …")` on the fragment (check the adornment API in your version) or to a `Stack` inside. |

## States

None.

## Notes

JUI's CSS only styles the headings (`font-weight: 600; color: var(--jui-text-header)`); the catalogue's
"elevated surface" description is not borne out by the CSS, so the mockup draws no shadow.
`--jui-paper-heading-*` are mockup tokens. Card extends Paper (`APaperFragment`).
