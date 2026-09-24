---
component: jui-button
component-version: 1
target: jui
---

# jui-button → JUI

## Maps to

The **Button** component, `com.effacy.jui.ui.client.button.Button`, created with
`com.effacy.jui.ui.client.button.ButtonCreator` — a component with its own handler (`IButtonHandler`), completed
asynchronously.

```java
ButtonCreator.$ (parent, cfg -> {
    cfg.label ("Add member");
    cfg.icon (FontAwesome.plus ());
    cfg.variant (Button.Config.Variant.OUTLINED);
    cfg.handler (cb -> { save (); cb.complete (); });
});

Button btn = ButtonCreator.build (cfg -> cfg.label ("Save").handler (() -> save ()));
```

## Properties

| Property | Maps to | Notes |
| --- | --- | --- |
| label | `cfg.label (…)` | `updateLabel (…)` changes it after rendering. |
| icon | `cfg.icon (…)` | FontAwesome class; see the `jui-icon` mapping. |
| icon-position | `cfg.iconOnRight ()` / `cfg.iconOnLeft ()` | |
| variant | `cfg.variant (Button.Config.Variant.STANDARD / OUTLINED / LINK)` | `STANDARD` is the default. |
| nature | `cfg.variant (Variant.STANDARD, Variant.SUCCESS)` etc. | `SUCCESS`, `WARNING`, `DANGER` are variants applied after `STANDARD`. `normal` → none. |
| disabled | `button.disable ()` | Component API (`enable ()` to undo). |
| waiting | `button.waiting (true)` | Normally automatic: with `Behaviour.WAIT` (the default) the button waits until the handler calls `cb.complete ()`. |

## Slots

None.

## States

Hover, focus and disabled come from `Button.css`. Waiting is driven by the handler callback; `cfg.behaviour
(Behaviour.DISABLE)` disables instead of waiting, `Behaviour.NORMAL` does neither. Focus styling is applied only
for keyboard focus.

## Notes

- Theme with the `--cpt-btn-*` contract (`docs/css_component_contracts.md`) or the `--jui-comp-button-*` family.
- `cfg.width (Length)` fixes the width (the mockup's `width="full"` → `Length.pct (100)`).
- For a button drawn inside another component's DOM, map to `jui-btn` (the `Btn` fragment) instead.
