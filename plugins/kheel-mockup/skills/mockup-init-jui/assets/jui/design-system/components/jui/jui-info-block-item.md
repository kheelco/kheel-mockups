---
name: jui-info-block-item
version: 1.0.0
kind: composed
status: active
summary: InfoBlock item component — one icon-and-value fact in an info line, optionally a link.
---

# InfoBlock item (component)

## Purpose

One item of a `jui-info-block-line`, standing for an item of JUI's `InfoLine`: a small grey fact made of an
optional icon and a value, or a link (an email address, a website). It only exists inside an info line.

## Anatomy

An optional `jui-icon` followed by the value, 0.5em apart and aligned on the text baseline, in medium-weight grey
text; a link value is in the link colour.

## Properties

| Property | Controls | Values | Default | Description |
| --- | --- | --- | --- | --- |
| icon | content | icon | | Optional icon before the value. |
| label | content | text | | The value shown. |
| link | variant | boolean | | Show the value as a link (JUI's item link/action). |

## Variants

| Property | Value | Use |
| --- | --- | --- |
| link | present | Values that open something: an email address, a website, a related record. |

## States

| Dimension | State | Trigger | Appearance |
| --- | --- | --- | --- |
| Interaction | default | At rest | — |
| Interaction | hover | `:hover` (links only) | The link is underlined. |

## Behaviour

A link item runs its action when clicked; in a mockup give it `href`.

## Content rules

The value only, no label: the icon says what it is.

## Accessibility

The icon is decorative; a link must read sensibly on its own.

## Rules of use

- Use `link` only when the value does something when clicked.

## Tokens

| Token | Kind | Default | Used for |
| --- | --- | --- | --- |
| `--cpt-infoblock-item` | component | `#aaa` | Item colour (JUI's value). |
| `--jui-text-link` | semantic | | Link colour. |

## Template

```html
<span class="info_line_item">
  <jui-icon data-if="icon" name="{{icon}}"></jui-icon>
  <a data-if="link">{{label}}</a>
  <span data-if="!link">{{label}}</span>
</span>
```

## Style

```css
:host { display: inline-block; --cpt-infoblock-item: #aaa; }
.info_line_item { display: flex; gap: 0.5em; align-items: baseline; color: var(--cpt-infoblock-item); font-weight: 500; }
a { color: var(--jui-text-link); text-decoration: none; cursor: pointer; }
a:hover, :host([state~="hover"]) a { text-decoration: underline; }
```

## Example

```xml
<jui-info-block>
  <jui-info-block-line>
    <jui-info-block-item icon="mail" label="jane@example.com" link=""/>
    <jui-info-block-item icon="external-link" label="example.com" link="" state="hover"/>
    <jui-info-block-item icon="clock" label="Updated 2 hours ago"/>
    <jui-info-block-item label="No icon"/>
  </jui-info-block-line>
</jui-info-block>
```
