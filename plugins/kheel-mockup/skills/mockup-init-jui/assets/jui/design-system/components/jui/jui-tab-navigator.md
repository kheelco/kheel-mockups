---
name: jui-tab-navigator
version: 1.0.0
kind: elemental
status: active
summary: TabNavigator component — tabs (horizontal or vertical) that switch the page shown in its body.
---

# TabNavigator (component)

## Purpose

Represents JUI's **TabNavigator** component: a set of tabs, each bound to a component, with the active tab's
component shown in the navigator's body. It takes part in JUI navigation (each tab has a reference, so the
active tab follows the URL path and tab navigators nest), which makes it the usual frame for an application's
sections, a record's sub-pages or a settings area with a vertical menu. Use `jui-card-navigator` when sections
are chosen from a grid of cards and entered with a breadcrumb back, and plain buttons or a toggle group when the
choice filters one view rather than switching pages.

In a mockup the tabs are `jui-tab-navigator-tab` children (placed in the tab strip for you) and the body holds
only the **active tab's content** — the other tabs' pages are separate mockups, reached through each tab's
`href`.

## Anatomy

A tab strip and a body. Horizontal variants put the strip above the body; vertical variants put it to the left
as a menu, where tabs can be grouped under small uppercase headings. Each tab (`jui-tab-navigator-tab`) has an
optional icon, a label, and optionally a count badge or a corner indicator.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| variant | variant | horizontal, horizontal-underline, horizontal-bar, vertical, vertical-icon, vertical-alt, vertical-compact | horizontal | The tab set's presentation (JUI `TabNavigator.Config.Variant`). |
| padding | variant | 0, 1, 2, 3, 4, 6, 8 | 0 | Space around the body's content (JUI `padding(Insets)`); `4` is 1em. |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| variant | horizontal | Classic folder tabs joined to the content (JUI `HORIZONTAL`, the default). |
| variant | horizontal-underline | Text tabs over a line, the active one underlined in the primary colour (`HORIZONTAL_UNDERLINE`). The usual choice for a record's sub-pages. |
| variant | horizontal-bar | Tabs as pills in a rounded, shaded bar; the active one filled (`HORIZONTAL_BAR`). |
| variant | vertical | A left-hand menu of tabs with optional group headings (`VERTICAL`); settings and admin areas. |
| variant | vertical-alt | As `vertical`, with the active tab marked by a bar on its right edge (`VERTICAL_ALT`). |
| variant | vertical-icon | A narrow icon-only menu; the label shows as a tooltip on hover in JUI (`VERTICAL_ICON`). |
| variant | vertical-compact | A slim icon-only menu that slides out to show labels on hover (`VERTICAL_COMPACT`). |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Menu | collapsed | Default | `vertical-compact` shows icons only. |
| Menu | expanded | `:hover` on the strip (`vertical-compact` only) | The strip widens to 15em and shows the labels. |

The active tab is set on the tab (`active` on a `jui-tab-navigator-tab`).

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| tabs | jui-tab-navigator-tab | jui-tab-navigator-tab | A row (horizontal variants) or a column (vertical variants) of tabs, in order. | The tabs (JUI `tab(reference, label, component)`). Tabs are placed here without `slot`. |
| default | any | jui-panel | configurable | The active tab's content — the component of the tab marked `active`. |

## Behaviour

Clicking a tab activates it: the tab is highlighted and its component shown in the body, and a navigation event
updates the path. A component can block leaving its tab (unsaved changes) through JUI's `INavigationAware`. In a
mockup give each tab an `href` to the mockup of its page, and mark the current one `active`.

## Content rules

Tab labels are short nouns in sentence case (`Overview`, `Members`, `Billing`). Group headings are one or two
words. Use counts for quantities the user acts on (`Invites 3`), not for totals.

## Accessibility

The strip is a list of tabs; in the application each tab should expose `role="tab"` with `aria-selected`, and
the body `role="tabpanel"`. Icon-only variants rely on the label as the accessible name.

## Rules of use

- One tab is always active.
- Put only the active tab's content in the body; other pages are their own mockups.
- Use icon-only variants (`vertical-icon`, `vertical-compact`) only where every tab has a distinct icon.
- Nest a horizontal navigator inside a vertical one for sub-pages, not the reverse.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-navigator-bg` | component | `transparent` | Strip background; `--jui-comp-tabset-surface` for `horizontal-bar`, white for `vertical-compact`. |
| `--cpt-tabbedpanel-outline` | component | `--jui-tabset-line` | Lines of the strip and the folder tabs; `--jui-comp-tabset-border` for underline and bar. |
| `--cpt-navigator-line-color` | component | `--jui-role-border-default` | The vertical strip's right-hand line; `#e1e1e1` for `vertical-compact`. |
| `--cpt-tabbedpanel-width` | component | `13em` | Width of a vertical strip; `4.5em` icon, `4em` compact (`15em` expanded). |
| `--cpt-tabnavigator-body-padding` | component | `0` | Space around the body's content; `padding` sets it. |
| `--cpt-tabnavigator-tab-display` | component | `block` | How each tab sits in the strip. |
| `--cpt-tabnavigator-tab-top` | component | `1px` | Nudges horizontal tabs over the strip's line; `0` for bar and vertical. |
| `--cpt-tabnavigator-tab-padding`, `--cpt-tabnavigator-tab-margin`, `--cpt-tabnavigator-tab-radius` | component | `0.5em 1em`, `0 2px 0 0`, `--jui-border-radius` top corners | A tab's box, per variant. |
| `--cpt-tabnavigator-tab-border`, `--cpt-tabnavigator-tab-border-bottom`, `--cpt-tabnavigator-tab-border-right` | component | `1px solid` outline; unset; unset | A tab's borders: the folder outline, the underline (`horizontal-underline`) or the right-edge bar (`vertical-alt`, `vertical-compact`). |
| `--cpt-tabnavigator-tab-border-bottom-hover`, `--cpt-tabnavigator-tab-border-bottom-active`, `--cpt-tabnavigator-tab-border-right-active` | component | unset; light line; unset | The borders on hover and when active: the underline colour, the active folder tab's open foot, the active bar. |
| `--cpt-tabnavigator-tab-bg`, `--cpt-tabnavigator-tab-bg-hover`, `--cpt-tabnavigator-tab-bg-active` | component | `--jui-tabset-bg-03`, same, `--jui-tabset-bg-01` | A tab's background at rest, on hover and when active. |
| `--cpt-tabnavigator-tab-text`, `--cpt-tabnavigator-tab-text-hover`, `--cpt-tabnavigator-tab-text-active` | component | `--jui-tabset-text` | A tab's label colour at rest, on hover and when active. |
| `--cpt-tabnavigator-tab-icon`, `--cpt-tabnavigator-tab-icon-hover`, `--cpt-tabnavigator-tab-icon-active` | component | `--jui-tabset-icon` | A tab's icon colour at rest, on hover and when active. |
| `--cpt-tabnavigator-tab-weight` | component | `600` | Label weight; `500` in vertical variants. |
| `--cpt-tabnavigator-tab-gap`, `--cpt-tabnavigator-tab-indent` | component | `0.75em`, `0` | Space between icon and label, and before the first of them (vertical). |
| `--cpt-tabnavigator-tab-label-display`, `--cpt-tabnavigator-tab-justify`, `--cpt-tabnavigator-tab-icon-width` | component | `inline`, `flex-start`, `auto` | Icon-only variants hide the label and centre the icon. |
| `--cpt-tabnavigator-tab-shadow-active` | component | `0 0 4px` shadow | The active folder tab's shadow. |
| `--cpt-tabnavigator-tab-count-position` | component | `static` | The count badge sits after the label, or at the right edge in vertical variants. |
| `--cpt-tabnavigator-group-display`, `--cpt-tabnavigator-group-text` | component | `none`, `--jui-role-text-muted` | Group headings show only in vertical variants. |
| `--cpt-tabnavigator-count-bg`, `--cpt-tabnavigator-count-color` | component | `--jui-color-secondary30`, `--jui-role-text-inverse` | The count badge (JUI's own tokens). |
| `--cpt-tabnavigator-indicator-top`, `--cpt-tabnavigator-indicator-right` | component | `4px`, `4px` | Corner indicator position; `-6px`, `-16px` for underline. |
| `--jui-tabset-line`, `--jui-tabset-line-light`, `--jui-tabset-text`, `--jui-tabset-icon`, `--jui-tabset-bg-01`, `--jui-tabset-bg-03`, `--jui-tabset-bg-05`, `--jui-tabset-shadow`, `--jui-border-radius` | semantic | | The folder tabs (JUI's legacy tab-set tokens). |
| `--jui-comp-tabset-surface`, `--jui-comp-tabset-surface-hover`, `--jui-comp-tabset-surface-active`, `--jui-comp-tabset-border`, `--jui-comp-tabset-text`, `--jui-comp-tabset-text-muted`, `--jui-comp-tabset-text-active` | semantic | | Underline and bar tabs. |
| `--jui-role-interactive-primary`, `--jui-role-border-default`, `--jui-role-text-default`, `--jui-role-text-muted`, `--jui-role-text-inverse`, `--jui-color-secondary30`, `--jui-color-aux-white` | semantic | | Active underline, lines, text and badges. |
| `--jui-radius-sm`, `--jui-radius-lg`, `--jui-space-1`, `--jui-space-2`, `--jui-space-3`, `--jui-space-4`, `--jui-space-6`, `--jui-space-8` | semantic | | Radii, tab spacing and body padding. |

## Template

```html
<div class="wrap">
  <header class="tabs"><div class="list"><slot name="tabs"></slot></div></header>
  <div class="body" data-layout><slot></slot></div>
</div>
```

## Style

```css
:host {
  display: block; height: 100%;
  --cpt-navigator-bg: transparent;
  --cpt-tabbedpanel-outline: var(--jui-tabset-line);
  --cpt-navigator-line-color: var(--jui-role-border-default);
  --cpt-tabbedpanel-width: 13em;
  --cpt-tabnavigator-body-padding: 0;
  --cpt-tabnavigator-count-bg: var(--jui-color-secondary30);
  --cpt-tabnavigator-count-color: var(--jui-role-text-inverse);
  --cpt-tabnavigator-indicator-top: 4px;
  --cpt-tabnavigator-indicator-right: 4px;
  --cpt-tabnavigator-group-display: none;
  --cpt-tabnavigator-group-text: var(--jui-role-text-muted);
  /* HORIZONTAL: folder tabs. */
  --cpt-tabnavigator-tab-display: block;
  --cpt-tabnavigator-tab-top: 1px;
  --cpt-tabnavigator-tab-padding: 0.5em 1em;
  --cpt-tabnavigator-tab-margin: 0 2px 0 0;
  --cpt-tabnavigator-tab-radius: var(--jui-border-radius) var(--jui-border-radius) 0 0;
  --cpt-tabnavigator-tab-border: 1px solid var(--cpt-tabbedpanel-outline);
  --cpt-tabnavigator-tab-border-bottom-active: 1px solid var(--jui-tabset-line-light);
  --cpt-tabnavigator-tab-bg: var(--jui-tabset-bg-03);
  --cpt-tabnavigator-tab-bg-hover: var(--jui-tabset-bg-03);
  --cpt-tabnavigator-tab-bg-active: var(--jui-tabset-bg-01);
  --cpt-tabnavigator-tab-text: var(--jui-tabset-text);
  --cpt-tabnavigator-tab-text-hover: var(--jui-tabset-text);
  --cpt-tabnavigator-tab-text-active: var(--jui-tabset-text);
  --cpt-tabnavigator-tab-icon: var(--jui-tabset-icon);
  --cpt-tabnavigator-tab-icon-hover: var(--jui-tabset-icon);
  --cpt-tabnavigator-tab-icon-active: var(--jui-tabset-icon);
  --cpt-tabnavigator-tab-weight: 600;
  --cpt-tabnavigator-tab-gap: 0.75em;
  --cpt-tabnavigator-tab-indent: 0;
  --cpt-tabnavigator-tab-label-display: inline;
  --cpt-tabnavigator-tab-justify: flex-start;
  --cpt-tabnavigator-tab-icon-width: auto;
  --cpt-tabnavigator-tab-shadow-active: 0 0 4px var(--jui-tabset-shadow);
  --cpt-tabnavigator-tab-count-position: static;
}
:host([padding="1"]) { --cpt-tabnavigator-body-padding: var(--jui-space-1); }
:host([padding="2"]) { --cpt-tabnavigator-body-padding: var(--jui-space-2); }
:host([padding="3"]) { --cpt-tabnavigator-body-padding: var(--jui-space-3); }
:host([padding="4"]) { --cpt-tabnavigator-body-padding: var(--jui-space-4); }
:host([padding="6"]) { --cpt-tabnavigator-body-padding: var(--jui-space-6); }
:host([padding="8"]) { --cpt-tabnavigator-body-padding: var(--jui-space-8); }

.wrap { display: flex; flex-direction: column; align-items: stretch; height: 100%; }
.tabs { position: relative; background: var(--cpt-navigator-bg); box-sizing: border-box; flex: none; }
.list { display: flex; flex-direction: row; align-items: flex-end; }
.body { flex-grow: 1; min-width: 0; overflow-y: auto; margin: var(--cpt-tabnavigator-body-padding); }

/* HORIZONTAL */
:host([variant="horizontal"]) .tabs { padding-top: 1em; }
:host([variant="horizontal"]) .list { padding-left: 1.5em; border-bottom: 1px solid var(--cpt-tabbedpanel-outline); }

/* HORIZONTAL_UNDERLINE */
:host([variant="horizontal-underline"]) {
  --cpt-tabbedpanel-outline: var(--jui-comp-tabset-border);
  --cpt-tabnavigator-indicator-top: -6px;
  --cpt-tabnavigator-indicator-right: -16px;
  --cpt-tabnavigator-tab-padding: var(--jui-space-3) var(--jui-space-3) var(--jui-space-4) var(--jui-space-3);
  --cpt-tabnavigator-tab-margin: 0 var(--jui-space-4) 0 0;
  --cpt-tabnavigator-tab-radius: 0;
  --cpt-tabnavigator-tab-border: none;
  --cpt-tabnavigator-tab-border-bottom: 3px solid transparent;
  --cpt-tabnavigator-tab-border-bottom-hover: 3px solid var(--jui-role-border-default);
  --cpt-tabnavigator-tab-border-bottom-active: 3px solid var(--jui-role-interactive-primary);
  --cpt-tabnavigator-tab-bg: transparent;
  --cpt-tabnavigator-tab-bg-hover: transparent;
  --cpt-tabnavigator-tab-bg-active: transparent;
  --cpt-tabnavigator-tab-text: var(--jui-comp-tabset-text-muted);
  --cpt-tabnavigator-tab-text-hover: var(--jui-comp-tabset-text);
  --cpt-tabnavigator-tab-text-active: var(--jui-role-interactive-primary);
  --cpt-tabnavigator-tab-icon: var(--jui-comp-tabset-text-muted);
  --cpt-tabnavigator-tab-icon-hover: var(--jui-comp-tabset-text);
  --cpt-tabnavigator-tab-icon-active: var(--jui-role-interactive-primary);
  --cpt-tabnavigator-tab-gap: var(--jui-space-3);
  --cpt-tabnavigator-tab-shadow-active: none;
}
:host([variant="horizontal-underline"]) .tabs { height: 4em; overflow: hidden; }
:host([variant="horizontal-underline"]) .list { position: absolute; left: 0; right: 0; bottom: 0; padding-left: var(--jui-space-6); border-bottom: 1px solid var(--cpt-tabbedpanel-outline); }

/* HORIZONTAL_BAR */
:host([variant="horizontal-bar"]) {
  --cpt-navigator-bg: var(--jui-comp-tabset-surface);
  --cpt-tabbedpanel-outline: var(--jui-comp-tabset-border);
  --cpt-tabnavigator-tab-top: 0;
  --cpt-tabnavigator-tab-padding: var(--jui-space-2) var(--jui-space-4);
  --cpt-tabnavigator-tab-margin: 4px;
  --cpt-tabnavigator-tab-radius: var(--jui-radius-sm);
  --cpt-tabnavigator-tab-border: none;
  --cpt-tabnavigator-tab-border-bottom-active: none;
  --cpt-tabnavigator-tab-bg: transparent;
  --cpt-tabnavigator-tab-bg-hover: var(--jui-comp-tabset-surface-hover);
  --cpt-tabnavigator-tab-bg-active: var(--jui-comp-tabset-surface-active);
  --cpt-tabnavigator-tab-text: var(--jui-comp-tabset-text-muted);
  --cpt-tabnavigator-tab-text-hover: var(--jui-comp-tabset-text);
  --cpt-tabnavigator-tab-text-active: var(--jui-comp-tabset-text-active);
  --cpt-tabnavigator-tab-gap: var(--jui-space-3);
  --cpt-tabnavigator-tab-shadow-active: none;
}
:host([variant="horizontal-bar"]) .tabs { border: 1px solid var(--cpt-tabbedpanel-outline); border-radius: var(--jui-radius-lg); margin: var(--jui-space-4); }
:host([variant="horizontal-bar"]) .list { flex-wrap: wrap; align-items: center; }

/* VERTICAL family */
:host([variant^="vertical"]) {
  --cpt-tabnavigator-group-display: block;
  --cpt-tabnavigator-tab-top: 0;
  --cpt-tabnavigator-tab-padding: 0.55em;
  --cpt-tabnavigator-tab-margin: 0 0 3px 0;
  --cpt-tabnavigator-tab-radius: var(--jui-border-radius);
  --cpt-tabnavigator-tab-border: none;
  --cpt-tabnavigator-tab-border-bottom-active: none;
  --cpt-tabnavigator-tab-bg: transparent;
  --cpt-tabnavigator-tab-bg-hover: #f6f6f6;
  --cpt-tabnavigator-tab-bg-active: #f1f1f1;
  --cpt-tabnavigator-tab-text: var(--jui-role-text-default);
  --cpt-tabnavigator-tab-text-hover: var(--jui-role-text-default);
  --cpt-tabnavigator-tab-text-active: var(--jui-role-text-default);
  --cpt-tabnavigator-tab-icon: var(--jui-role-text-muted);
  --cpt-tabnavigator-tab-icon-hover: var(--jui-role-text-muted);
  --cpt-tabnavigator-tab-icon-active: var(--jui-role-text-default);
  --cpt-tabnavigator-tab-weight: 500;
  --cpt-tabnavigator-tab-gap: 1em;
  --cpt-tabnavigator-tab-indent: calc(1em - 2px);
  --cpt-tabnavigator-tab-shadow-active: none;
  --cpt-tabnavigator-tab-count-position: absolute;
}
:host([variant^="vertical"]) .wrap { flex-direction: row; }
:host([variant^="vertical"]) .tabs { width: var(--cpt-tabbedpanel-width); border-right: 1px solid var(--cpt-navigator-line-color); padding: 1em 0.5em; overflow-y: auto; }
:host([variant^="vertical"]) .list { flex-direction: column; align-items: stretch; padding-top: 0.5em; }

:host([variant="vertical-alt"]) {
  --cpt-tabnavigator-tab-radius: var(--jui-border-radius) 0 0 var(--jui-border-radius);
  --cpt-tabnavigator-tab-border-right: 3px solid transparent;
  --cpt-tabnavigator-tab-border-right-active: 3px solid var(--jui-tabset-bg-05);
}
:host([variant="vertical-alt"]) .tabs { padding: 1em 0 0 1em; }

:host([variant="vertical-icon"]) {
  --cpt-tabbedpanel-width: 4.5em;
  --cpt-tabnavigator-group-display: none;
  --cpt-tabnavigator-tab-label-display: none;
  --cpt-tabnavigator-tab-justify: center;
  --cpt-tabnavigator-tab-indent: 0;
}

:host([variant="vertical-compact"]) {
  --cpt-tabbedpanel-width: 4em;
  --cpt-navigator-bg: var(--jui-color-aux-white);
  --cpt-navigator-line-color: #e1e1e1;
  --cpt-tabnavigator-group-display: none;
  --cpt-tabnavigator-tab-padding: 1em 0;
  --cpt-tabnavigator-tab-margin: 0 0 8px 8px;
  --cpt-tabnavigator-tab-radius: 8px 0 0 8px;
  --cpt-tabnavigator-tab-border-right: 4px solid transparent;
  --cpt-tabnavigator-tab-border-right-active: 4px solid #757575;
  --cpt-tabnavigator-tab-text: #1a2f45;
  --cpt-tabnavigator-tab-text-hover: #1a2f45;
  --cpt-tabnavigator-tab-text-active: #1a2f45;
  --cpt-tabnavigator-tab-icon: #1a2f45;
  --cpt-tabnavigator-tab-icon-hover: #1a2f45;
  --cpt-tabnavigator-tab-icon-active: #1a2f45;
  --cpt-tabnavigator-tab-weight: 400;
  --cpt-tabnavigator-tab-gap: 0;
  --cpt-tabnavigator-tab-indent: 0;
  --cpt-tabnavigator-tab-icon-width: calc(4em - 8px);
  --cpt-tabnavigator-tab-label-display: none;
}
:host([variant="vertical-compact"]) .tabs { padding: 0.5em 0 0 0; transition: width 0.2s; }
:host([variant="vertical-compact"]) .tabs:hover,
:host([variant="vertical-compact"][state~="expanded"]) .tabs {
  --cpt-tabbedpanel-width: 15em;
  --cpt-tabnavigator-tab-label-display: inline;
  width: 15em;
}
```

## Example

```xml
<div layout="column" gap="6">
  <jui-tab-navigator>
    <jui-tab-navigator-tab label="Overview" active=""/>
    <jui-tab-navigator-tab label="Members" icon="users"/>
    <jui-tab-navigator-tab label="Settings" icon="settings"/>
    <jui-panel padding="4">The active tab's page (HORIZONTAL).</jui-panel>
  </jui-tab-navigator>
  <jui-tab-navigator variant="horizontal-underline">
    <jui-tab-navigator-tab label="Overview" active=""/>
    <jui-tab-navigator-tab label="Members" count="12"/>
    <jui-tab-navigator-tab label="Invites" state="hover"/>
    <jui-tab-navigator-tab label="Billing" indicator="New"/>
    <jui-panel padding="4">HORIZONTAL_UNDERLINE.</jui-panel>
  </jui-tab-navigator>
  <jui-tab-navigator variant="horizontal-bar">
    <jui-tab-navigator-tab label="Day"/>
    <jui-tab-navigator-tab label="Week" active=""/>
    <jui-tab-navigator-tab label="Month" state="hover"/>
    <jui-panel padding="4">HORIZONTAL_BAR.</jui-panel>
  </jui-tab-navigator>
  <div layout="row" gap="4" align="stretch">
    <jui-tab-navigator variant="vertical" grow="">
      <jui-tab-navigator-tab group="Account" label="Profile" icon="user" active=""/>
      <jui-tab-navigator-tab label="Notifications" icon="bell" count="3"/>
      <jui-tab-navigator-tab group="Organisation" label="Members" icon="users" state="hover"/>
      <jui-tab-navigator-tab label="Billing" icon="file-text"/>
      <jui-panel padding="4">VERTICAL, with groups.</jui-panel>
    </jui-tab-navigator>
    <jui-tab-navigator variant="vertical-alt" grow="">
      <jui-tab-navigator-tab label="Profile" icon="user" active=""/>
      <jui-tab-navigator-tab label="Members" icon="users"/>
      <jui-panel padding="4">VERTICAL_ALT.</jui-panel>
    </jui-tab-navigator>
  </div>
  <div layout="row" gap="4" align="stretch">
    <jui-tab-navigator variant="vertical-icon" grow="">
      <jui-tab-navigator-tab label="Home" icon="house" active=""/>
      <jui-tab-navigator-tab label="Inbox" icon="inbox"/>
      <jui-tab-navigator-tab label="Settings" icon="settings"/>
      <jui-panel padding="4">VERTICAL_ICON.</jui-panel>
    </jui-tab-navigator>
    <jui-tab-navigator variant="vertical-compact" grow="">
      <jui-tab-navigator-tab label="Home" icon="house" active=""/>
      <jui-tab-navigator-tab label="Inbox" icon="inbox"/>
      <jui-tab-navigator-tab label="Settings" icon="settings"/>
      <jui-panel padding="4">VERTICAL_COMPACT.</jui-panel>
    </jui-tab-navigator>
    <jui-tab-navigator variant="vertical-compact" state="expanded" grow="">
      <jui-tab-navigator-tab label="Home" icon="house" active=""/>
      <jui-tab-navigator-tab label="Inbox" icon="inbox"/>
      <jui-tab-navigator-tab label="Settings" icon="settings"/>
      <jui-panel padding="4">Compact, expanded.</jui-panel>
    </jui-tab-navigator>
  </div>
</div>
```
