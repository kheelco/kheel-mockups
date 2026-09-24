# Shared behaviours

Behaviours that belong to a category of JUI building blocks rather than to one. Each applies by default to every
member of its category; a component file names the behaviour, and says so if it departs from it.

## Fragment events

**Applies to.** Every JUI fragment: all components whose title ends in "(fragment)" — `jui-btn`, `jui-icon`,
`jui-pill`, `jui-card`, `jui-menu-item`, `jui-control-field` and the rest.

**Behaviour.**

1. A fragment has no events or lifecycle of its own. It contributes DOM to the component it is placed in, and that
   component — a Panel, a custom component, an inline component in the application — dispatches its events.
2. A fragment's action (JUI `onclick`) is therefore written in the enclosing component's renderer, and runs in that
   component's context: it can update that component's state and re-render it.
3. A fragment is re-created whenever the enclosing component re-renders; it keeps no state between renders except
   what the component gives it.
4. In a mockup, a fragment's action is shown with `href` or `opens` on the fragment like anything else. When the
   action's effect belongs to the enclosing component (a list refreshes, a panel changes), say so in a `spec` on the
   fragment or a `<specification>` on the component.

**Overriding it.** When a piece of UI needs its own events or lifecycle — to be driven independently, reused
across components with its own state, or placed directly in a layout — it is a component instead: use the
component counterpart where JUI has one (`jui-button` for `jui-btn`), or specify a custom component.

**Accessibility.** Unaffected: fragments render real, focusable elements where interactive.

## Control values

**Applies to.** Every JUI control: all components whose title ends in "(control)".

**Behaviour.**

1. A control holds a value. It reports a change when the user alters it, and knows whether it is **dirty** —
   different from the value it was last given.
2. A control may carry **validators**. Validation runs when the value changes or the form is validated; an invalid
   control shows its invalid state, and the message is shown by the field or form cell around it (`jui-control-field`,
   `jui-control-form-cell`), not by the control.
3. Controls can be **disabled** (not interactive, dimmed), **read-only** (value shown, not editable) and
   **waiting** (while something it depends on loads).
4. Controls draw no label of their own; a label, guidance and error come from the field or form around them. In a
   mockup, set `invalid` on the control and `error` on its field or cell to show a validation failure.

**Overriding it.** A control that validates differently (on every keystroke, or only on submit) says so.

**Accessibility.** The field's label is associated with the control; errors are announced, never shown by colour
alone.

## Store-backed loading

**Applies to.** Components that show records from a store: `jui-table`, `jui-gallery`, and selectors whose options
come from a store (`jui-selection-control`, `jui-multi-selection-control`, `jui-text-search-control`).

**Behaviour.**

1. While the store loads, the component shows its loading state; while it loads a further page, it shows the quiet
   form (content dimmed, no loader) where it has one.
2. When the store returns nothing, the component shows its empty state — distinguishing **nothing exists**
   (unfiltered) from **nothing matches** the current filter or search (filtered).
3. When the store fails, the component shows its error state with the reason.
4. Changing a filter, search or sort reloads the store from the first page.

**Overriding it.** A component bound to a fixed, local list has no loading or error states, and says so.

**Accessibility.** Loading, empty and error conditions are announced.
