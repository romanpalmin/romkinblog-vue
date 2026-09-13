---
name: verify-post-links-before-generate
description: >
  Use before publishing or editing a post that links to another post in this
  Nuxt Content blog (romkin.blog) — especially a multi-part series (e.g. "часть
  1"/"часть 2" cross-links). Explains why an internal markdown link to a post
  that isn't yet in `content/post/` (still in `post-drafts/`, or simply not
  written yet) breaks the ENTIRE `npm run generate` build, not just that one
  page — and how to check for this before it surprises you at deploy time.
license: MIT
metadata:
  author: claude
  version: "1.0"
---

# Verify internal post links resolve before `npm run generate`

This blog's build (`npm run generate`) uses Nitro's crawler-based
prerenderer: it starts from known routes, then follows every internal link it
finds and prerenders whatever it discovers. A link to a route that doesn't
exist yet isn't a soft 404 on one page — it's a **hard build failure** for
the whole site.

**Failure pattern:** a post links to a sibling post (e.g. "see the first part
of this series") that is still a draft in `post-drafts/` and hasn't been run
through `npm run generate-post` yet. The crawler follows the link during
`npm run generate`, gets a 404, and aborts the entire build with
`ERROR Exiting due to prerender errors` — even though every OTHER page would
have built fine.
**Verified by:** reproduced live in this repo — linking `event-loop-nodejs.md`
(published) to `/post/event-loop-browser` while that post was still only in
`post-drafts/` (not yet generated) caused `npm run generate` to fail with
exactly this error, citing "Linked from /post/event-loop-nodejs". Removing
the link (replacing it with plain text) made the build pass again; adding the
link back after generating the target post also passed.

## When to use this

- Writing/editing a post that cross-links another post in this blog (series,
  "see also", related posts) — before you consider the edit done.
- Before running `npm run generate` for a real deploy, whenever the working
  tree touched more than one post file in the same session.
- Any time a post references a slug you're not 100% sure is already in
  `content/post/` (not just `post-drafts/`).

## Procedure

- [ ] 1. Before adding a real `[text](/post/some-slug)` link to another post,
      check whether that slug already exists as a file in `content/post/`
      (not `post-drafts/` — drafts aren't part of the built site at all).
      `ls content/post/some-slug.md`
- [ ] 2. If the target isn't published yet: don't add a real link. Use plain
      text instead (e.g. "первая часть — про браузер (готовлю к
      публикации)") until the target is generated via `npm run generate-post
      <slug>` and lands in `content/post/`.
- [ ] 3. Once the target exists in `content/post/`, swap the plain-text
      mention for the real markdown link.
- [ ] 4. Verify with a real build before trusting it:
      `source ~/.nvm/nvm.sh && nvm use 24 && npm run generate` (Node 24+
      required — see repo `.nvmrc`/`CLAUDE.md`; Node 20 is the system
      default and will itself fail differently). A clean run ends with
      `✔ Generated public .output/public`. If it instead prints
      `Errors prerendering:` followed by `├─ /post/<slug> [404]` and
      `└─ Linked from /post/<other-slug>`, that's this exact failure —
      go back to step 2 for that link.

## Gotchas

- The error is easy to misread as "just one broken page" — it's not; the
  whole `npm run generate` command exits non-zero and produces no
  `.output/public` at all. Don't ship a partial build past this.
- This bites specifically when a post already **live** in `content/post/`
  links forward to one still in `post-drafts/` — the crawler only discovers
  routes reachable from already-built pages, so a draft linking to another
  draft won't trigger it (neither is built yet), but a published post linking
  to a draft will.
- Two-way links in a planned series (part 1 ↔ part 2) are fine once BOTH
  posts are generated into `content/post/` — the failure is purely about
  build-time ordering, not about the link being wrong in the end state.

## What didn't work

- Assumed a link to a not-yet-published post would just be a harmless dead
  link (404 on click) until the target went live — reasonable assumption,
  wrong in this specific static-site setup. The crawler-based prerenderer in
  Nitro treats any followed 404 as a build error, not a warning, so the link
  has to be added only after its target already exists in `content/post/`.
