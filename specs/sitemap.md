# Sitemap

## Purpose

Mockups show screens one at a time. A **sitemap** shows how they hang together: every page of the application,
grouped as people reach them, with what each page is for, who can reach it, and the pages it leads to. It is where
the shape of an application is discussed before (and while) its screens are mocked up: which section a page belongs
in, what opens from what, what exists today and what is proposed.

A sitemap shows the application as people move through it, not as it is built: where a page sits, how it is
reached and where it leads, in the words people use. Addresses, routes, server or client rendering, component and
class names are design and stay out of it; how a page is opened, where that matters to the flow (*a dialog from the
profile menu*), is said in its description.

A sitemap is one page of the project space's own content, kept with the mockups and changed as they change. It is
not a mockup: the viewer does not render or list it.

## The sitemap file

One self-contained HTML file, `sitemap.html` at the root of the project space (a project may keep more than one,
named `sitemap-<name>.html`, for separate applications or alternative structures). It has two parts:

| Part | Holds |
| --- | --- |
| Data | The sitemap itself, as one JSON block (`<script type="application/json" id="sitemap">`). Changing the sitemap means changing this block only. |
| Presentation | The styles and script that draw the data, identical in every sitemap. |

The page **must not** depend on anything but itself (it uses the system's fonts), so that it can be shared as a
single file or published.

### Data

| Field | Holds |
| --- | --- |
| `product` | The application's name. |
| `title` | The page's heading, saying what this sitemap covers, since a project may keep several (*The application*, *Customer onboarding*, *Administration*); defaults to *Sitemap*. The page's own title (in browser tabs and hosts' listings) is the product's name and *Sitemap*, with the sitemap's name for a second one (*Acme Administration Sitemap*). |
| `intro` | One paragraph: what the map covers and how to read it. |
| `updated` | The date of the last change, `yyyy-mm-dd`. |
| `statuses` | The statuses a page can have, in order, each with an `id`, a `label` and a `tone`: `done` (exists), `planned` (proposed), `future` (to follow later) or `retired` (to be removed). Typically *Exists today*, *Proposed*, *To follow*. |
| `roles` | Optional: who can reach pages, as `id` → description (*Anyone*, *Members*, *Administrators*). |
| `viewer` | Optional: the path from the sitemap to the design system's viewer (`design-system/`), so that pages naming a mockup link to it. Absent or `null` where the mockups are not beside the sitemap (a published copy). |
| `menus` | Optional: menus available across pages, outside any one page (a top bar's menus), each with an `id`, a `name`, a `note` saying where it is shown, and its `items`: the pages it reaches, each a page id or `{ "page", "label" }` where the menu's wording differs from the page's name (*Sign out* reaching *Sign in*). |
| `zones` | The parts of the application, in rows. |

A **zone** is a part of the application people reach in one way: the public pages before signing in, the signed-in
home, the workspace with its side navigation, an administrators' section.

| Field | Holds |
| --- | --- |
| `id`, `name` | Its identity and name. |
| `row` | Which row of the map it sits in; zones in one row sit side by side. Rows run in the order people travel: signing in, then home, then the workspace, then staff sections. |
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
| `status` | One of `statuses`. |
| `who` | Optional: one of `roles`. |
| `refs` | Optional: what it serves, in the project's terms (use cases, requirements, tickets). |
| `desc` | One or two sentences: what the page is for and what it shows. |
| `tabs` | Optional: the page's tabs, drawn as chips on its card. |
| `mockup` | Optional: the mockup or mockups it is built to, as paths relative to the project space. |
| `links` | The ids of the pages a person can go to from it: the cross-links between parts of the application. |
| `kids` | Pages opened from it (the detail pages of a list), drawn indented below it. |

Links run one way, in the direction people move: a page **leads to** the pages in its `links` and to its kids, and
each of those is **reached from** it. A link is recorded on the page people start from, and only where they can
actually go from one to the other; that two pages are related is not a link. Going back (from a record to its list)
is not recorded. Where a page is reached from a menu shown across pages, the menu records it, not every page the menu
appears on.

### Presentation

- Zones are cards in their rows; a zone's groups are columns; a group's pages are cards with their kids indented
  below them. Each page card shows its name, its status and its tabs.
- Menus, if any, are a card above the zones, each listing its items; choosing an item chooses its page.
- A legend shows the statuses; each status can be shown or hidden.
- Choosing a page shows a panel with where it sits, who can reach it, what it serves, its tabs, its mockups, the
  pages it leads to and the pages and menus it is reached from, and draws arrows to the pages it leads to and dashed arrows
  from the pages it is reached from, dimming the rest. Links are drawn only for the chosen page, so that the map
  stays readable however many there are.
- The chosen page is kept in the address's hash (`#<id>`), so a link can open the map at a page.
- The sitemap has a look of its own, neutral and the same in every project: it does **not** take the application's
  design system, so that sitemaps read alike from one project to the next and stay apart from the screens they map.
  It follows the reader's light or dark setting.

## Open questions

Questions the structure raises (where a page belongs, whether a list is a page or a view of another) are not part of
the sitemap. They are reported to the person who asked for it, alongside it, and once answered the sitemap changes to
match. The sitemap shows the structure as it stands, not the discussion about it.

## Checks

A sitemap **must** have: unique page ids of letters, digits and hyphens (and none of the names a host reserves for
its own use, such as `settings`); every link naming a page that exists; every status one of `statuses`; every `who`
one of `roles`; and every `mockup` an existing file of the project space. A page connected to nothing but its parent
is reported, since a page nobody reaches is usually a gap in the map. A page or zone carrying a route or address is
reported, since those are design. A sitemap carrying open questions in its data is
reported too, since they belong in the report, not the map.
