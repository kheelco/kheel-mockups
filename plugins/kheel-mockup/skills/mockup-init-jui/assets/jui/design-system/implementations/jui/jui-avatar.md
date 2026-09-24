---
component: jui-avatar
component-version: 1
target: jui
---

# jui-avatar → JUI

## Maps to

The **Avatar** fragment, `com.effacy.jui.ui.client.fragments.Avatar` (fragment class `Avatar.AvatarFragment`),
styled by the `juiAvatar` rules in `FragmentStyles.css`. A fragment: its click is dispatched by the enclosing
component.

```java
Avatar.$(parent, user.getAvatarUrl())        // null when there is no image
    .initials(user.getName())                // "Jane Citizen" → "JC"
    .size(Length.em(2.5))
    .border(Avatar.BorderStyle.SOLID)
    .onclick(() -> openProfile(user));
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| image | `Avatar.$(parent, href)` | The image URL; pass `null` for none. Precedence: image, then initials, then icon. |
| initials | `.initials(…)` | Accepts a full name and reduces it to two letters (first letters of the first and last words). |
| icon | `.icon(FontAwesome.…())` | Default `FontAwesome.user()`; see the `jui-icon` mapping. |
| size | `.size(Length.em(…))` | `xsmall` 1.5, `small` 2, `medium` 2.5, `large` → leave unset (CSS `3.5em`), `xlarge` 5. |
| border | `.border(Avatar.BorderStyle.…)` | `NONE`, `SOLID` (default), `DASHED`. |

## Slots

None.

## States

`failed` is automatic: the image's `onerror` adds the `failed` class, which shows `FontAwesome.bug()` and, on
hover, the `loaderror(…)` message (default "Your avatar failed to load. This usually fixes itself after a little
while."; `loaderror(null)` removes it). The mockup draws `triangle-alert` because the icon set has no bug.

## Notes

JUI's variables are camel-cased: `--juiAvatar-color`, `--juiAvatar-text-color`, `--juiAvatar-text-bg`,
`--juiAvatar-border-color`, `--juiAvatar-border-th`, `--juiAvatar-img-border-color`, `--juiAvatar-img-border-th`;
the mockup's `--jui-avatar-*` tokens correspond. `--jui-avatar-size` and `--jui-avatar-img-bg` are mockup-only
(JUI sizes by font size and shows the real image).
