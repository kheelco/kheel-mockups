---
name: jui-tab-navigator-tab
version: 1.0.0
kind: composed
status: active
summary: TabNavigator tab component — one tab of a tab navigator, with a label, an icon, a count and an indicator.
---

# TabNavigator tab (component)

## Purpose

One tab of a `jui-tab-navigator`, standing for JUI's `TabNavigator.tab(reference, label, component)` and the
`ITabConfig` it returns (`icon`, `count`, `indicator`). It only exists inside a tab navigator, which draws it in
the look of its variant. The tab's page is not inside the tab: the navigator's body shows the active tab's
content, and the other tabs link (`href`) to their own mockups. A tab can also open a group in vertical
navigators (JUI `group(label)`), drawn as a small heading above it.

## Anatomy

An optional group heading, then the tab: an optional `jui-icon`, the label, an optional count badge (a small
pill) and an optional indicator (a small tag in the tab's top-right corner). Its box, colours and which parts
show come from the enclosing navigator's variant.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| label | content | text | | The tab's label (JUI `tab(reference, label, …)`). |
| icon | content | icon | | Optional icon before the label (JUI `icon(…)`); required for icon-only variants. |
| active | state | boolean | | This is the tab showing (JUI's active tab, from navigation). |
| count | content | number | | A count in a badge after the label (JUI `count(int)`); `0` is shown. |
| indicator | content | text | | A short tag in the corner, such as `New` (JUI `indicator(String)`). |
| group | content | text | | Starts a group with this heading above the tab (JUI `group(label)`); shown by vertical variants only. |

## Variants

None of its own; the navigator's `variant` decides the look.

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | As the navigator's variant. |
| Interaction | hover | `:hover` | Hover background, label and icon colour, or underline, per variant. |
| Selection | inactive | Default | — |
| Selection | active | `active` property | Highlighted per variant: joined folder tab, primary underline, filled pill, shaded menu row, or right-edge bar. |

## Behaviour

A click activates the tab through the navigator (a navigation event). In a mockup set `href` to the page the tab
shows.

## Content rules

A short noun in sentence case. Group headings are one or two words; the navigator shows them in capitals.

## Accessibility

In the application each tab is `role="tab"` with `aria-selected` on the active one. Icon-only variants use the
label as the accessible name.

## Rules of use

- Mark exactly one tab of a navigator `active`.
- Give every tab an icon when the navigator is `vertical-icon` or `vertical-compact`.
- Use `group` on the first tab of each group only.

## Tokens

All tokens are set by the enclosing `jui-tab-navigator` for its variant.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-tabnavigator-tab-display`, `--cpt-tabnavigator-tab-top`, `--cpt-tabnavigator-tab-padding`, `--cpt-tabnavigator-tab-margin`, `--cpt-tabnavigator-tab-radius` | inherited | | The tab's box. |
| `--cpt-tabnavigator-tab-border`, `--cpt-tabnavigator-tab-border-bottom`, `--cpt-tabnavigator-tab-border-right` | inherited | | Borders at rest. |
| `--cpt-tabnavigator-tab-border-bottom-hover`, `--cpt-tabnavigator-tab-border-bottom-active`, `--cpt-tabnavigator-tab-border-right-active` | inherited | | Borders on hover and when active. |
| `--cpt-tabnavigator-tab-bg`, `--cpt-tabnavigator-tab-bg-hover`, `--cpt-tabnavigator-tab-bg-active` | inherited | | Background. |
| `--cpt-tabnavigator-tab-text`, `--cpt-tabnavigator-tab-text-hover`, `--cpt-tabnavigator-tab-text-active` | inherited | | Label colour. |
| `--cpt-tabnavigator-tab-icon`, `--cpt-tabnavigator-tab-icon-hover`, `--cpt-tabnavigator-tab-icon-active` | inherited | | Icon colour. |
| `--cpt-tabnavigator-tab-weight`, `--cpt-tabnavigator-tab-gap`, `--cpt-tabnavigator-tab-indent` | inherited | | Label weight and spacing. |
| `--cpt-tabnavigator-tab-label-display`, `--cpt-tabnavigator-tab-justify`, `--cpt-tabnavigator-tab-icon-width` | inherited | | Icon-only presentation. |
| `--cpt-tabnavigator-tab-shadow-active`, `--cpt-tabnavigator-tab-count-position` | inherited | | Active shadow; count placement. |
| `--cpt-tabnavigator-group-display`, `--cpt-tabnavigator-group-text` | inherited | | Group heading. |
| `--cpt-tabnavigator-count-bg`, `--cpt-tabnavigator-count-color`, `--cpt-tabnavigator-indicator-top`, `--cpt-tabnavigator-indicator-right` | inherited | | Count badge and indicator. |

## Template

```html
<h6 class="group" data-if="group">{{group}}</h6>
<div class="tab">
  <div class="inner">
    <jui-icon data-if="icon" name="{{icon}}"></jui-icon>
    <span class="label">{{label}}</span>
    <i class="count" data-if="count">{{count}}</i>
  </div>
  <strong class="indicator" data-if="indicator">{{indicator}}</strong>
</div>
```

## Style

```css
:host { display: var(--cpt-tabnavigator-tab-display, block); position: relative; }
.group {
  display: var(--cpt-tabnavigator-group-display, none);
  padding: 1em 0 0.5em 0; margin: 0 1em 0 1.25em;
  color: var(--cpt-tabnavigator-group-text, inherit);
  font-size: 0.8em; font-weight: 500; text-transform: uppercase; line-height: 1.2;
}
.tab {
  position: relative; top: var(--cpt-tabnavigator-tab-top, 0);
  padding: var(--cpt-tabnavigator-tab-padding, 0.5em 1em);
  margin: var(--cpt-tabnavigator-tab-margin, 0);
  border: var(--cpt-tabnavigator-tab-border, none);
  border-bottom: var(--cpt-tabnavigator-tab-border-bottom, var(--cpt-tabnavigator-tab-border, none));
  border-right: var(--cpt-tabnavigator-tab-border-right, var(--cpt-tabnavigator-tab-border, none));
  border-radius: var(--cpt-tabnavigator-tab-radius, 0);
  background: var(--cpt-tabnavigator-tab-bg, transparent);
  color: var(--cpt-tabnavigator-tab-text, inherit);
  font-weight: var(--cpt-tabnavigator-tab-weight, 600);
  cursor: pointer; user-select: none; white-space: nowrap; line-height: 1.4;
  transition: color 0.15s ease, border-bottom-color 0.15s ease;
}
.inner {
  display: flex; align-items: center; justify-content: var(--cpt-tabnavigator-tab-justify, flex-start);
  gap: var(--cpt-tabnavigator-tab-gap, 0.75em); padding-left: var(--cpt-tabnavigator-tab-indent, 0);
}
.label { display: var(--cpt-tabnavigator-tab-label-display, inline); padding-right: 0; }
jui-icon { color: var(--cpt-tabnavigator-tab-icon, inherit); width: var(--cpt-tabnavigator-tab-icon-width, auto); justify-content: center; }
.count {
  position: var(--cpt-tabnavigator-tab-count-position, static); right: 0.5em; top: 0.55em;
  display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box;
  min-width: 1.7em; height: 1.7em; padding: 0 0.45em;
  font-style: normal; font-weight: 600; line-height: 1; font-size: 0.7em;
  color: var(--cpt-tabnavigator-count-color, inherit); background: var(--cpt-tabnavigator-count-bg, transparent);
  border-radius: 999px;
}
.indicator {
  position: absolute; right: var(--cpt-tabnavigator-indicator-right, 4px); top: var(--cpt-tabnavigator-indicator-top, 4px);
  font-size: 0.8em; font-weight: 500; padding: 0 4px; border-radius: 4px; line-height: 1.4;
  background-color: var(--cpt-tabnavigator-count-bg, transparent); color: var(--cpt-tabnavigator-count-color, inherit);
}
:host(:not([active]):hover) .tab, :host([state~="hover"]:not([active])) .tab {
  background: var(--cpt-tabnavigator-tab-bg-hover, var(--cpt-tabnavigator-tab-bg, transparent));
  color: var(--cpt-tabnavigator-tab-text-hover, var(--cpt-tabnavigator-tab-text, inherit));
  border-bottom: var(--cpt-tabnavigator-tab-border-bottom-hover, var(--cpt-tabnavigator-tab-border-bottom, var(--cpt-tabnavigator-tab-border, none)));
}
:host(:not([active]):hover) jui-icon, :host([state~="hover"]:not([active])) jui-icon { color: var(--cpt-tabnavigator-tab-icon-hover, inherit); }
:host([active]) .tab {
  z-index: 1;
  background: var(--cpt-tabnavigator-tab-bg-active, var(--cpt-tabnavigator-tab-bg, transparent));
  color: var(--cpt-tabnavigator-tab-text-active, var(--cpt-tabnavigator-tab-text, inherit));
  border-bottom: var(--cpt-tabnavigator-tab-border-bottom-active, var(--cpt-tabnavigator-tab-border-bottom, var(--cpt-tabnavigator-tab-border, none)));
  border-right: var(--cpt-tabnavigator-tab-border-right-active, var(--cpt-tabnavigator-tab-border-right, var(--cpt-tabnavigator-tab-border, none)));
  box-shadow: var(--cpt-tabnavigator-tab-shadow-active, none);
}
:host([active]) jui-icon { color: var(--cpt-tabnavigator-tab-icon-active, inherit); }
```

## Example

```xml
<jui-tab-navigator variant="horizontal-underline">
  <jui-tab-navigator-tab label="Overview" icon="house" active=""/>
  <jui-tab-navigator-tab label="Members" icon="users" count="12"/>
  <jui-tab-navigator-tab label="Invites" icon="mail" count="0" state="hover"/>
  <jui-tab-navigator-tab label="Billing" icon="file-text" indicator="New"/>
  <jui-panel padding="4">The Overview page.</jui-panel>
</jui-tab-navigator>
```
