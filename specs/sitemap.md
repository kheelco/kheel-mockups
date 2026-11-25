# Sitemap

## Purpose

Mockups show screens one at a time. A **sitemap** shows how they hang together: every page of the application,
grouped as people reach them, with what each page is for, who can reach it, and the pages it leads to. It is where
the shape of an application is discussed before (and while) its screens are mocked up: which section a page belongs
in, what opens from what, what exists today and what is proposed.

A sitemap is one page of the project space's own content, kept with the mockups and changed as they change. It is
not a mockup: the viewer does not render or list it.

## The sitemap file

One self-contained HTML file, `sitemap.html` at the root of the project space (a project may keep more than one,
named `sitemap-<name>.html`, for separate applications or alternative structures). It has two parts:

| Part | Holds |
| --- | --- |
| Data | The sitemap itself, as one JSON block (`<script type="application/json" id="sitemap">`). Changing the sitemap means changing this block only. |
| Presentation | The styles and script that draw the data, identical in every sitemap, with a block of theme values taken from the design system's tokens. |

The page **must not** depend on anything but itself and the fonts the design system uses, so that it can be shared
as a single file or published.

### Data

| Field | Holds |
| --- | --- |
| `product` | The application's name. |
| `title` | The page's heading; defaults to *Sitemap*. |
| `intro` | One paragraph: what the map covers and how to read it. |
| `updated` | The date of the last change, `yyyy-mm-dd`. |
| `statuses` | The statuses a page can have, in order, each with an `id`, a `label` and a `tone`: `done` (exists), `planned` (proposed), `future` (to follow later) or `retired` (to be removed). Typically *Exists today*, *Proposed*, *To follow*. |
| `roles` | Optional: who can reach pages, as `id` → description (*Anyone*, *Members*, *Administrators*). |
| `viewer` | Optional: the path from the sitemap to the design system's viewer (`design-system/`), so that pages naming a mockup link to it. Absent or `null` where the mockups are not beside the sitemap (a published copy). |
| `zones` | The parts of the application, in rows. |
| `questions` | Optional: open questions about the structure, each a `title` and `text`. |

A **zone** is a part of the application people reach in one way: the public pages before signing in, the signed-in
home, the workspace with its side navigation, an administrators' section.

| Field | Holds |
| --- | --- |
| `id`, `name` | Its identity and name. |
| `row` | Which row of the map it sits in; zones in one row sit side by side. Rows run in the order people travel: signing in, then home, then the workspace, then staff sections. |
| `route` | Optional: the address pattern its pages share (`/app#/{workspace}/…`). |
| `note` | Optional: one line saying what it is. |
| `groups` | Its groups of pages. A zone with one unnamed group lists its pages directly. |

A **group** is a heading of the zone's navigation (a side-navigation group, a set of tabs). It has a `name`, an
optional `note`, its `pages`, and optionally a `column`: groups with the same column are stacked in one column, so
that, say, *Settings* sits under *Overview* as it does at the foot of a side navigation.

A **page** is somewhere a person can be: a list, a detail page, a dashboard, a dialog large enough to count as a
place.

| Field | Holds |
| --- | --- |
| `id` | Unique in the sitemap: ASCII letters, digits and hyphens. |
| `name` | Its name as people see it. |
| `route` | Optional: its address, or how it is opened (*dialog from the profile menu*). |
| `status` | One of `statuses`. |
| `who` | Optional: one of `roles`. |
| `refs` | Optional: what it serves, in the project's terms (use cases, requirements, tickets). |
| `desc` | One or two sentences: what the page is for and what it shows. |
| `tabs` | Optional: the page's tabs, drawn as chips on its card. |
| `mockup` | Optional: the mockup or mockups it is built to, as paths relative to the project space. |
| `links` | The ids of the pages it leads to: the cross-links between parts of the application. |
| `kids` | Pages opened from it (the detail pages of a list), drawn indented below it. |

A page's parent and kids are connected to it without being listed in `links`, and every link is shown from both
ends.

### Presentation

- Zones are cards in their rows; a zone's groups are columns; a group's pages are cards with their kids indented
  below them. Each page card shows its name, its status and its tabs.
- A legend shows the statuses; each status can be shown or hidden.
- Choosing a page shows a panel with its route, where it sits, who can reach it, what it serves, its tabs, its
  mockups and its connections, and draws a line from it to each page it connects with, dimming the rest.
  Connections are drawn only for the chosen page, so that the map stays readable however many there are.
- The chosen page is kept in the address's hash (`#<id>`), so a link can open the map at a page.
- The open questions, if any, are listed below the map.
- Theme values (colours and fonts) are taken from the design system's tokens; the page may follow the viewer's
  light or dark setting.

## Checks

A sitemap **must** have: unique page ids of letters, digits and hyphens (and none of the names a host reserves for
its own use, such as `settings`); every link naming a page that exists; every status one of `statuses`; every `who`
one of `roles`; and every `mockup` an existing file of the project space. A page connected to nothing but its parent
is reported, since a page nobody reaches is usually a gap in the map.
