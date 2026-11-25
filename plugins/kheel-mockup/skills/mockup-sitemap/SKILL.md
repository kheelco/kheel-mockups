---
name: mockup-sitemap
description: Draws an application's pages as an interactive sitemap, grouped as people reach them, with status, access and links between pages. Use when asked for a sitemap or how the app hangs together.
---

# mockup-sitemap — how the application's pages hang together

Mockups show screens one at a time. A sitemap shows all of them at once: every page of the application, grouped as
people reach them, with what each is for, who can reach it, whether it exists yet, and the pages it leads to. Use it
when the user asks for a sitemap, a site map, an information architecture, or how the application "hangs together";
or before mocking up a new area, to agree where its pages go. To build a screen, use `mockup-create`.

The sitemap is one self-contained HTML file. [`assets/sitemap.html`](assets/sitemap.html) is its template: a block of
data (JSON) and the presentation. You write the data; you never change the presentation. Every sitemap looks the
same, clean and neutral, whatever the application's design: don't restyle it in the application's theme, colours or
fonts, so that sitemaps read alike from one project to the next.

## 1. Gather what the application has, and will have

1. Find the project space (the folder holding `design-system/` and the mockups), if there is one. The sitemap lives
   at its root as `sitemap.html` (or `sitemap-<name>.html` for a second application or an alternative structure).
   If there is no project space, save it where the user asks, or in a scratch folder.
2. If `sitemap.html` already exists, read its data block and change that, keeping its page ids; don't start again.
3. Find the pages that **exist today**, from the application's source where it is to hand rather than guessing: its
   navigation (side navigation, tabs, the menus of its top bar), its routes and pages, its dialogs large enough to count as places. The
   source is only where you find them: the map records the flow people follow, not how it is wired up. The mockups in the project space are pages too; note each page's mockup.
4. Find the pages **proposed**, from the specifications the user points to (capabilities, use cases, a brief): each
   area of the product usually becomes a navigation group; each main thing it manages, a list page with a detail
   page under it; each detail page's tabs, what that thing relates to. Note what each page serves (use case and
   requirement numbers) in the project's own terms.
5. Note anything named as coming **later**, and anything to be **removed**.
6. Note who can reach each page (signed out, any member, administrators, staff), from the application's access rules.

## 2. Shape the map

Arrange the pages as people travel the application, not as the code is organised:

- **Zones** are the parts reached in different ways, in rows in the order people meet them: the public pages before
  signing in, then the signed-in home, then the main workspace, then staff or administrators' sections.
- A zone's **groups** are its navigation headings (side-navigation groups, top-level tabs). Use `column` to stack
  groups that sit together, such as *Settings* under *Overview*, so the map has as few columns as the navigation.
- A group's **pages** are its places; pages opened from another (a record from its list) are its `kids`.
- **Links** are where a person can go from a page: a record's page to the records it shows from another area, a
  dashboard to what it summarises. They run one way, so record each on the page people start from, and only where
  they can actually go (a button, a link, a row to open); that two pages are related is not a link, and going back
  is not recorded. A parent leads to its kids without listing them. Check what is actually on a page: an item in
  a top bar or menu shown on every page is not a link from the page it happens to sit above, so record it as a
  **menu** instead. Links are what the map is for: the chosen page
  shows what it leads to and what it is reached from.
- Note the questions the structure raises (where something belongs, whether a list is a page or a view) for your
  report (step 5). They don't go in the file: the sitemap shows the structure as it stands, and changes when a
  question is answered.

## 3. Write the file

Copy `assets/sitemap.html` to the sitemap's location (or edit the existing sitemap), then:

1. **Data.** Replace the block marked `DATA` with the sitemap, in this shape:

   | Field | Holds |
   | --- | --- |
   | `product`, `title`, `intro`, `updated` | The application's name; the heading, saying what this sitemap covers (*How the application hangs together*, *Customer onboarding*, *Administration*; default *Sitemap*); one paragraph on what the map covers; and today's date (`yyyy-mm-dd`). |
   | `statuses` | In order, each `{ "id", "label", "tone" }`, tone one of `done`, `planned`, `future` (drawn dashed), `retired` (struck through). Usually *Exists today*, *Proposed*, *To follow*. |
   | `roles` | Optional: `{ "id": "who that is" }`. |
   | `viewer` | `"design-system/"` when the sitemap sits at the project space's root, so pages' mockups link to the viewer; `null` otherwise. |
   | `menus` | Optional: menus shown across pages (a top bar's organisation or account menu), each `{ "id", "name", "note", "items" }`: `note` where it is shown (*the top bar of every signed-in page*); `items` page ids, or `{ "page", "label" }` where the menu's wording differs (*Sign out* reaching *Sign in*). |
   | `zones` | Each `{ "id", "name", "row", "note", "groups" }`; a zone with one unnamed group lists its pages directly. |
   | groups | Each `{ "name", "note", "column", "pages" }`. |
   | pages | Each `{ "id", "name", "status", "who", "refs", "desc", "tabs", "mockup", "links", "kids" }`: `id` unique, of letters, digits and hyphens (never `settings`, `sidebar`, `customize`, `upgrade`, `downloads` or `comment-…`, which some hosts reserve); `refs` what it serves; `desc` one or two sentences; `tabs` its tabs; `mockup` a path, or a list of paths, relative to the project space; `links` the ids it leads to; `kids` the pages it opens. Only `id`, `name`, `status` and `desc` are needed. |

   Write real content throughout: real page names and descriptions, never placeholders. Describe each page by what
   people do there, in their words, and how they get there where that matters (*opened from the profile menu*).
   Leave out everything that is design: addresses and routes, server or client rendering, component, class and
   table names.
2. **Title.** Set the `<title>` in the head, the name hosts and browser tabs show: the product's name and *Sitemap*
   (`Acme Sitemap`), or for a second sitemap its name as well (`Acme Administration Sitemap`), so no two share one.
3. Leave everything else in the file as it is: its styles and script.

## 4. Check it

1. Run the check script: `node <this skill's folder>/scripts/sitemap-check.mjs <sitemap.html> --root <project
   space>`. It needs only Node. It exits non-zero on an error (a duplicate or reserved id, a link to a page that
   doesn't exist, an unknown status or role, a mockup that isn't there) and notes pages without a description and
   pages connected to nothing but their own parent and kids, which are usually missing links. Fix the errors;
   consider the notes.
2. Open the file in a browser (screenshots are enough). Look at it at desktop and phone width, with nothing chosen
   and with a busy page chosen (one with many links): names fit their cards, columns don't crowd, lines reach their
   pages, and the page has no horizontal scroll. Fix what you find once.

## 5. Share it

If your host can publish a page for the user (for example a claude.ai artifact), publish the file and give the
link; otherwise tell the user how to open it. A published copy is on its own, so set `viewer` to `null` in the copy
you publish (keep it in the project space's file) so its mockup names show as text rather than broken links. When the
sitemap changes, publish it again to the same place, and if the project keeps a record of what it has published,
add or update its entry there.

Then, briefly: how the map is laid out (its zones and groups), the pages where its areas meet (the ones with the
most links), and where the file is. End with the questions the structure raises, as a numbered list, each a short
title and one sentence, so the user can answer them by number; apply the answers to the data and share it again. The sitemap is part of the project space: commit it
with the mockups when the user asks for commits.
