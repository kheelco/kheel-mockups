---
component: jui-accordion
component-version: 1
target: jui
---

# jui-accordion → JUI

## Maps to

The **Accordion** fragment, `com.effacy.jui.ui.client.fragments.Accordion` — a `<details>` element with a
`<summary>` header. Controls inside it belong to the enclosing component.

```java
Accordion.$(parent)
    .title("Reviewers")
    .icon(FontAwesome.users())
    .summary(s -> Span.$(s).text("Manager · Peer · 2 of 6"))
    .$(
        Para.$("Choose who reviews this submission and in what order.")
    );
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| title | `.title(…)` | |
| icon | `.icon(FontAwesome.…())` | See the `jui-icon` mapping for names. |
| collapsed | `.open(false)` | JUI defaults to open; can be changed after render. |
| fixed | `.collapsible(false)` | Holds it open and suppresses the caret and toggle. |
| no-header | `.header(false)` | |
| error | `.error(true)` | Can be changed after render. |

## Slots

| Slot | Maps to |
| --- | --- |
| summary | `.summary(Consumer<ElementBuilder>)` — build the summary content; capture the element with `.use(…)` to update it later. |
| default | Children passed to `.$(…)`; inserted into the body. |

## States

Open/closed is the native `details` toggle (`open` attribute), driven by the user or by `.open(…)`. `.visible(false)`
hides the whole accordion (`display: none`), useful when a form gates a section behind an earlier choice. Hover is
CSS.

## Notes

Theme with the `--cpt-accordion-*` variables, which the mockup uses under the same names.
