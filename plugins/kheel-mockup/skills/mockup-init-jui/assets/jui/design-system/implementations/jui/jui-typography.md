---
component: jui-typography
component-version: 1
target: jui
---

# jui-typography → JUI

## Maps to

The **Typography** fragment, `com.effacy.jui.ui.client.fragments.Typography` (fragment class
`Typography.TypographyFragment`, a fragment with children), styled by the `juiTypography` rules in
`FragmentStyles.css`.

```java
Typography.$(parent).$(t -> {
    H4.$(t).text("Welcome to hiring");
    Typography.$(t).style(Typography.Style.SUBTITLE1).$(Text.$("Set up your first role"));
    P.$(t).text("Create a role, invite your team and start reviewing candidates in minutes.");
});
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| variant | `.style(Typography.Style.…)` | `container` → no `style(…)` (a `div.juiTypography`); `body1` → `BODY1`, `body2` → `BODY2`, `subtitle1` → `SUBTITLE1`, `subtitle2` → `SUBTITLE2` (a `p` with `juiBody1` … `juiSubtitle2`). |

## Slots

| Slot | Maps to |
| --- | --- |
| default | The fragment's children (`.$(…)`). |

## States

None.

## Notes

The styled variants' CSS is scoped under `.juiTypography` (`.juiTypography .juiSubtitle1`, `.juiTypography
p.juiBody1`), and a styled fragment does not carry that class itself — so a styled Typography only looks right
nested inside an unstyled one, as in the snippet. The container sets `font-size: 14px`; `--jui-typography-font-size`
is a mockup token for it.
