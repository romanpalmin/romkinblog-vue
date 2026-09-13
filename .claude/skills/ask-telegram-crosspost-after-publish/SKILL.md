---
name: ask-telegram-crosspost-after-publish
description: >
  Use right after a post on this blog goes live on origin/main (a new
  `content/post/<slug>.md` is pushed/deployed) — always ask Roman whether to
  cross-post it to the @romkin_blog Telegram channel, even if he didn't
  mention Telegram. If he says yes, publish it there with an image attached,
  not a bare link.
license: MIT
metadata:
  author: claude
  version: "1.0"
---

# Ask about Telegram cross-post after publishing a blog post

Roman's standing instruction (2026-09-14): every time a post is added to
romkin.blog and actually published, ask him whether to also post it to the
`@romkin_blog` Telegram channel — don't wait to be asked, don't skip it
because it seems obvious either way.

## Procedure

1. After a post's commit is pushed to `origin/main` (site will redeploy),
   ask Roman: "Продублировать в Telegram?" (or equivalent) — a plain
   yes/no, not a longer discussion.
2. If yes, publish it as a **photo message with a caption**, not a bare
   text message relying on Telegram's link-preview crawler:
   ```
   send_file(chat_id="romkin_blog",
             file_path="public/images/posts/<slug>/cover.png",
             caption="<title>\n\n<excerpt>\n\n<canonical post URL>")
   ```
   This is required, not a style choice — see `diagnose-telegram-link-preview`
   for why: this domain's RU hosting fails Telegram's own crawler
   (`WebPageEmpty` even with correct OG tags), so a bare link posts with no
   image at all unless the photo is attached directly.
3. After sending, get the permanent message link
   (`get_message_link(chat_id="romkin_blog", message_id=<id>)`) and ask
   whether to add it to the end of the post's markdown (a short line like
   "Обсудить статью — в [посте канала](<t.me link>)"), matching the pattern
   used in `event-loop-browser.md`. If yes, that's a normal small commit +
   push on top (see repo's own commit/squash/push conventions — don't push
   unrelated in-progress work from the other post along with it).

## Gotchas

- Don't send the text-only version first "just to check" — it leaves a
  bare, image-less post in the real channel that then has to be manually
  deleted by Roman (this MCP toolset has no delete-message tool). Go
  straight to the photo+caption version.
- If testing a URL for cache-busting or any other diagnostic purpose, never
  send it to the real `romkin_blog` chat — use a private test chat instead.
