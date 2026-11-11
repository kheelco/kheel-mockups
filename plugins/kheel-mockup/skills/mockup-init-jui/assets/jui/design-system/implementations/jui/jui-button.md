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
| split | `cfg.split ()` | With options: the handler stays the button's action and the chevron opens the options. Without it the whole button opens the options and the handler isn't used. |

## Slots

| Slot | Maps to |
| --- | --- |
| options | One `cfg.option (label, text, code, handler)` or `cfg.iconOption (label, text, icon, handler)` per `jui-button-option`, in order (see its mapping). |

```java
ButtonCreator.$ (parent, cfg -> {
    cfg.label ("Add requirement").icon (FontAwesome.plus ()).split ();
    cfg.handler (() -> addRequirement ());
    cfg.option ("Rule", "A constraint on how it is done", "RULE", () -> addRule ());
    cfg.option ("Non-functional", "A quality the solution must have", "NFR", () -> addNfr ());
});
```

## States

Hover, focus and disabled come from `Button.css`. Waiting is driven by the handler callback; `cfg.behaviour
(Behaviour.DISABLE)` disables instead of waiting, `Behaviour.NORMAL` does neither. Focus styling is applied only
for keyboard focus. `open` is the menu of options, opened and closed by the button (`isOptionsOpen ()`); disabling
or detaching the button closes it, and a menu button shows no waiting state.

## Notes

- Theme with the `--cpt-btn-*` contract (`docs/css_component_contracts.md`) or the `--jui-comp-button-*` family.
- `cfg.width (Length)` fixes the width (the mockup's `width="full"` → `Length.pct (100)`).
- For a button drawn inside another component's DOM, map to `jui-btn` (the `Btn` fragment) instead.
- The options' styles are a stylesheet of their own (`Button.OptionsCSS`, `ButtonOptions.css`), so a configuration's
  own `styles (…)` keeps them; they sit on the `--cpt-btn-*` tokens and so follow the variants.
- Test ids with options: `<testId>-toggle` (a split button's chevron), `<testId>-menu`, `<testId>-option-<code or
  label>`.
- Options need jui-stack with juiproject/jui-stack#131 (merged into `develop`, in the release after 0.4.4).
