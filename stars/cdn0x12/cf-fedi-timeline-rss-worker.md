---
project: cf-fedi-timeline-rss-worker
stars: 5
description: |-
    Turn your home timeline in fediverse into a RSS feed in real-time. Powered by Cloudflare Workers.
url: https://github.com/cdn0x12/cf-fedi-timeline-rss-worker
---

# Fediverse Timeline RSS
Turn your home timeline in fediverse into a RSS feed in real-time. Powered by Cloudflare Workers.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/CDN18/cf-fedi-timeline-rss-worker)

## Note
1. Currently supports platforms compatible with Mastodon API (mastodon, gotosocial, pleroma, akkoma, hometown etc.) and Misskey API (misskey, firefish, iceshrimp, sharkey, catodon, foundkey etc.).
2. **The access_token is the credential for accessing your account. Any entity with the access_token can request the corresponding API on your behalf. It is strongly recommended that you deploy this project yourself, regularly check your account usage, and rotate your access_token periodically.**
3. Your RSS link contains your access_token, so do not share your RSS link with others. When using RSS reading applications, ensure that the application does not publicly disclose your RSS subscription link.

## Usage
1. Create an app in your instance settings and copy the access token. (Check the `read` scope)
2. Your RSS feed is:
   `https://<workers_url>/{software}/{instance_url}/{access_token}`
   or
   `https://<workers_url>/{instance_url}/{access_token}`

   Examples:
   - `https://<workers_url>/mastodon/mastodon.social/1234567890abcdef`
   - `https://<workers_url>/mastodon.social/1234567890abcdef`

