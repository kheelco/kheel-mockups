---
component: jui-popup
component-version: 1
target: jui
---

# jui-popup → JUI

## Maps to

The **Popup** fragment, `com.effacy.jui.ui.client.fragments.Popup` (`Popup.PopupFragment`) — a fixed, full-window
overlay, hidden until shown through its handler.

```java
PopupFragment popup = Popup.$(parent).width(Length.px(600));
PopupHandler handler = popup.handler();
popup.$(
    H3.$().text("Quarterly report"),
    P.$().text("…")
);
// later, e.g. from a button:
handler.show();
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| popup-width | `.width(Length.px(…))` | Sets `--juiPopup-width-max`: `small` 400, `medium` 600, `large` 800 px; `auto` → leave unset. |

## Slots

| Slot | Maps to |
| --- | --- |
| default | Children passed to `.$(…)`, inserted into `.juiPopup-body`. |

## States

JUI popups start hidden (`hidden(true)` by default, class `juiPopup-hidden`); show with `handler().show()` and hide
with `handler().hide()`, or `.hidden(false)` to render shown. The built-in *close* button (a `Btn` with
`TEXT_COMPACT`) hides it. A mockup that shows a popup is showing it open.

## Notes

The mockup draws the popup inside its own box (min 24 em) instead of fixed over the window. JUI's CSS variables
are `--juiPopup-zindex`, `-bg`, `-border`, `-border-radius`, `-shadow`, `-padding-upper`, `-padding-body`,
`-width`, `-height`, `-width-max` and `-height-max`; the mockup's `--frag-popup-*` tokens correspond. The
`handler()` must be obtained before the fragment is built (it registers a `use(…)` callback). Check that the
`PopupFragment` accepts children through `.$(…)` in the JUI version in use (it extends
`BaseFragmentWithChildren`).
