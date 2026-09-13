---
name: diagnose-telegram-link-preview
description: >
  Use when publishing a romkin.blog post link to the @romkin_blog Telegram
  channel and the link preview card (image/title) doesn't show up, even
  though the page's OG tags look correct. Also use for any future "why
  doesn't Telegram show a preview for my link" question on this domain —
  even if the user doesn't mention Telegram explicitly, just "the post link
  looks bare" or "no picture under the link".
license: MIT
metadata:
  author: claude
  version: "1.0"
---

# Diagnose a missing Telegram link preview for a romkin.blog post

**Verified by:** 2026-09-14, publishing `event-loop-browser` to
`@romkin_blog`. `og:title`/`og:description`/`og:image` were all present,
absolute, and fetched fine via `curl` (200, correct content-type, ~0.4s
TTFB) — yet Telegram's `get_media_info` on the sent message kept returning
`MessageMediaWebPage(webpage=WebPageEmpty(...))`. Root cause found via
`@WebpageBot`, confirmed to be **not** a caching artifact, and traced to
this site's RU hosting.

## Procedure

1. **Rule out the page itself first** (fast, all client-side):
   ```
   curl -s https://romkin.blog/post/<slug> | grep -oE '<meta[^>]*(og:|twitter:)[^>]*>'
   curl -sI https://romkin.blog/images/posts/<slug>/cover.png   # 200 + image/*
   ```
   Also check the OG tags land within the first ~40KB of raw HTML (some
   crawlers only read a byte-limited prefix) and that TTFB is fast
   (`curl -w "%{time_starttransfer}\n"`). If any of this is broken, fix the
   post/frontmatter — that's a real bug, not this issue.
2. **If the page checks out, send the link and inspect the message media**
   via the telegram MCP: `send_message` the URL, then
   `get_media_info(chat_id, message_id)`. `WebPageEmpty` (not a populated
   `WebPage` with a photo) means Telegram's crawler itself failed to render
   it — different from "not previewed yet".
3. **Rule out caching** before concluding it's a real failure: resend with a
   throwaway query string (`?x=1`) to force an unseen URL, check
   `get_media_info` again. If still `WebPageEmpty` on a URL Telegram has
   never seen before, it's not a stale cache — it's a real fetch failure on
   Telegram's end.
4. **Use `@WebpageBot`** (Telegram's own preview debugger) as the
   authoritative check: `send_message(chat_id="WebpageBot", message=<url>)`.
   It replies "Link previews was updated successfully" either way (not very
   informative via the MCP text reply — the useful detail, if any, only
   shows in-app on its **"Update with content"** inline button, which this
   MCP toolset cannot press; ask the user to tap it in the app if you need
   the verbose error).
5. **Root cause on this domain: RU-hosting asymmetric filtering.** Telegram's
   crawler request reaches the (Russian-hosted, nic.ru) server fine, but the
   *response* back out to Telegram's infra gets dropped in transit — a known
   pattern for RU-hosted sites and foreign crawlers (Telegram/Meta/etc.),
   unrelated to OG tags, TLS, or DNS (all of which checked out fine here via
   plain `curl`, since that traffic path doesn't hit the same filtering).
   The general fix is a GeoDNS split with a non-RU reverse proxy — see
   `dev/personal-cloud-agent/NOTES.md` for why **not** to reuse the personal
   VLESS+Reality VPN VDS for this (deanonymizes/exposes it), and always
   verify a candidate "foreign" VPS's real location with
   `curl -s https://ipinfo.io/<ip>/json` before assuming it's outside Russia
   — don't trust it by name or original purpose (the `kazan-test-task` demo
   VPS turned out to be Timeweb/Moscow, not foreign, despite being a
   "second, unrelated server").
6. **Practical fallback that works today, no infra change**: post the
   article as a photo with the article text + link in the caption instead
   of relying on the auto-preview —
   `send_file(chat_id, file_path=<local path to the post's cover.png>,
   caption=<title + excerpt + url>)`. This renders a real image card in the
   channel regardless of whether Telegram's crawler can reach the site.

## Gotchas

- Don't spend time re-checking OG tags/TLS/DNS a second time once
  `@WebpageBot` still shows `WebPageEmpty` on a fresh cache-busted URL —
  that combination already rules out both "page is broken" and "just needs
  time to crawl/cache".
- A test message sent to force cache-busting (step 3) goes to the **real
  channel** if sent there — send it to a private test chat or be ready to
  delete it immediately (this MCP has no delete-message tool; deletion must
  be done by the human in the Telegram app).
- Don't propose "just add a reverse proxy on our other VPS" without first
  running the `ipinfo.io` geolocation check — the obvious-seeming "we have a
  second server" answer was wrong here.

## What didn't work

- Assumed it was a Telegram-side cache of a previously-empty preview (e.g.
  from an earlier dev/test fetch) — tested by cache-busting with a query
  string on a URL Telegram had certainly never seen before publish day;
  still `WebPageEmpty`, ruling this out.
- Considered pointing a GeoDNS proxy at the existing personal VLESS+Reality
  VPN VPS (it's already "another" server) — rejected: it would publicly tie
  that VPN server's IP to a named personal blog, which is a deanonymization/
  collateral-blocking risk to the VPN itself, not just a bad idea in theory.
- Considered the `kazan-test-task` demo VPS as the foreign proxy candidate
  purely because it's "a second, separate server" — checked its actual
  location via `ipinfo.io`, found it's hosted in Moscow (Timeweb), which
  defeats the entire point of a GeoDNS split. Lesson: always verify
  geolocation directly, never infer it from a server's name or intended use.
