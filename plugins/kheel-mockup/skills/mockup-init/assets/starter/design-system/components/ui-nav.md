---
name: ui-nav
version: 1.0.0
kind: composed
status: active
summary: The product's main navigation, as a vertical list of items and groups.
---

# Navigation

## Purpose

Lists the main places in the product so people can move between them and always see where they are. It sits in
the shell's sidebar. For moving between views of one item, use tabs; for steps of a task, a stepper.

## Anatomy

A vertical list of navigation items (`ui-nav-item`), optionally gathered into labelled groups (`ui-nav-group`).

## Properties

None.

## Variants

None.

## States

None of its own; each item carries its own.

## Slots

| Slot | Accepts | Suggests | Layout | Description |
| --- | --- | --- | --- | --- |
| default | ui-nav-group, ui-nav-item | | Vertical list | Top-level items first, then groups. |

## Behaviour

Exactly one item is current: the place the user is in, or its nearest ancestor in the navigation.

## Content rules

Label places with nouns ("Jobs", "Customers"), not verbs. Seven or fewer top-level items.

## Accessibility

A `nav` landmark labelled "Main". The current item carries `aria-current="page"`.

## Rules of use

- Only places belong here, not actions: "New job" is a button on the Jobs page.

## Tokens

The tokens the style uses: its own component tokens (points of variation a theme can set), semantic tokens from
`tokens.md`, and tokens inherited from another component or the viewer.

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--space-1` | semantic |  | Gap between items. |

## Template

```html
<nav class="nav" aria-label="Main"><slot></slot></nav>
```

## Style

```css
:host { display: block; }
.nav { display: flex; flex-direction: column; gap: var(--space-1); }
```

## Example

```xml
<ui-box width="fit" padding="3" surface="raised" border="" radius="medium">
  <ui-nav>
    <ui-nav-item icon="house" label="Home"/>
    <ui-nav-item icon="briefcase" label="Jobs" current="" count="12"/>
    <ui-nav-group label="Records">
      <ui-nav-item icon="users" label="Customers"/>
      <ui-nav-item icon="file-text" label="Invoices"/>
    </ui-nav-group>
  </ui-nav>
</ui-box>
```
