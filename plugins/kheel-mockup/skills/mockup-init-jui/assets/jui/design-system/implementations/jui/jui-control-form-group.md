---
component: jui-control-form-group
component-version: 1
target: jui
---

# jui-control-form-group → JUI

## Maps to

A nested group of a `ControlForm`: `IGroupBuilder` (implemented by `GroupBuilder`), created with `group(…)` and
its depth shortcuts `group2(…)` / `group3(…)`, with a header (`IHeaderBuilder`) and footer (`IFooterBuilder`).

```java
group(grp -> {
    grp.separator();
    grp.header(hdr -> hdr.title("Personal details").instruction("Only provide details …"));
    grp.footer(ftr -> ftr.guidance("Preferred name is an informal name …"));
    grp.row(row -> { /* cells */ });
});

// Mutually exclusive conditional groups:
group2(grp -> {
    grp.group(sub -> {
        sub.conditional(cond -> cond.active(true).group("UserType", "standard").behaviour(ConditionalBehaviour.HIDE));
        sub.header(hdr -> hdr.title("Standard user").instruction("…"));
        sub.control("email", "The users' email address", Controls.text(cfg -> {}), cell -> cell.grow(1));
    });
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| depth | nesting | `group(…)` in the form → 1; `group(…)` inside that, or `group2(…)` → 2; `group3(…)` → 3; up to 4. |
| title, icon, instruction | `header(h -> h.title(…).icon(…).instruction(…))` | |
| guidance | `footer(f -> f.guidance(…))` | |
| separator | `separator()` | |
| horizontal | `horizontal()` | |
| indent | `indent(Length…)` | The mockup uses the form's group indent; JUI takes any length (docs use `Length.em(2.5)`). |
| conditional | `conditional(cond -> …)` | `check`: a single conditional group; `radio`: `cond.group(name, discriminator)` shared by sibling groups. |
| active | `cond.active()` / `cond.active(true)` | The open state; also `set(name, discriminator)` on the form. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The group's body: `row(…)`, `control(…)`, nested `group(…)`, `insert(…)` / DOM helpers. |

## States

Open and closed are live: a conditional group's state is a form value (`value("extrainfo")`); groups can also be
given a reference with `by("…")` and shown or hidden with `show` / `hide`.

## Notes

`ConditionalBehaviour.HIDE` hides a closed group's body (the mockup's behaviour); check the other behaviours for
the JUI version in use. Boxed frames around depth-1/2 groups come from `ControlForm` variants (`BOXED_1`,
`BOXED_2`), not from the group.
