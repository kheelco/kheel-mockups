---
component: jui-info-block
component-version: 1
target: jui
---

# jui-info-block → JUI

## Maps to

The **InfoBlock** component, `com.effacy.jui.ui.client.InfoBlock<D>`, a template component over a data type `D`:
its content is described with an `InfoBlockCreator` and rendered from the data.

```java
InfoBlock<Person> info = new InfoBlock<Person>(b -> {
    b.header(ProviderBuilder.string("…"), h -> h.subtitle("Project lead, Melbourne office"));
    b.line(line -> { /* items: icon + value or link */ });
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| title | `header(title, h -> …)` | `title` may be a `String` or a `Provider<String, D>` reading the data. |
| subtitle | `Header.subtitle(…)` | String or provider. |
| padding | `new InfoBlock.Config<D>(builder).padding(Insets…)` | |

## Slots

| Slot | Maps to |
| --- | --- |
| default | `line(...)` per `jui-info-block-line`. |

## States

None; the block re-renders from its data.

## Notes

The item API lives on `InfoLine` (from `IInfoLineCSS` / the template builder), whose source was not in the
reference checkout: check its methods for icon, text and link items before implementing.
