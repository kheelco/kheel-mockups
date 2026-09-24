---
component: jui-expander
component-version: 1
target: jui
---

# jui-expander → JUI

## Maps to

The **Expander** fragment, `com.effacy.jui.ui.client.fragments.Expander` (`Expander.ExpanderFragment`) — renders an
empty `div` with `flex-grow: 1`.

```java
Div.$(parent).css("display: flex; align-items: center;").$(row -> {
    Btn.$(row, "Back").variant(Btn.Variant.OUTLINED).nature(Btn.Nature.GREY);
    Expander.$(row);
    Btn.$(row, "Save");
});
```

## Properties

None.

## Slots

None.

## States

None.

## Notes

Only meaningful inside a flex container. A mockup row using `justify="between"` or a `grow` child needs no
Expander; use one where the mockup places `jui-expander` explicitly. The catalogue describes Expander as a
"disclosure expander", but the source is a flex spacer; for a collapsible section use `Accordion`.
