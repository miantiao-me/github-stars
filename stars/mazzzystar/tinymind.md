---
project: tinymind
stars: 806
description: |-
    Tinymind - Write and sync your blog & thoughts with GitHub
url: https://github.com/mazzzystar/tinymind
---

<a href="https://tinymind.me/">
  <img src="https://raw.githubusercontent.com/mazzzystar/tinymind/main/public/Tinymind-banner.png" alt="Tinymind Blog Banner">
</a>

<a href="https://chromewebstore.google.com/detail/tinymind-quick-thoughts/gpfojneflmaoemniapdcgikfehpiocag">
  <img src="https://img.shields.io/chrome-web-store/v/gpfojneflmaoemniapdcgikfehpiocag?label=Chrome%20Extension&logo=googlechrome&logoColor=white&style=for-the-badge" alt="Chrome Web Store">
</a>

Turn your GitHub into a blog & memo data storage place with one-click Sign in. No server needed - every input automatically syncs to your GitHub repository.
https://tinymind.me

https://github.com/user-attachments/assets/4c9f590e-dd1e-4e9f-95a0-45b236752494

## Demo Page
[tinymind.me/mazzzystar](https://tinymind.me/mazzzystar)

<img width="1188" alt="image" src="https://github.com/user-attachments/assets/2a74609d-da01-4085-ad9d-73b7825c4528">

## Usage
https://tinymind.me

MacOS version packaged using [Pake](https://github.com/tw93/Pake):

[<img width="128" alt="icon_512x512" src="https://github.com/user-attachments/assets/a6f82868-2d30-480c-b439-f158b5b389c9">](https://github.com/mazzzystar/tinymind/blob/main/public/Tinymind.dmg)

### Chrome Extension

Capture thoughts and quotes from anywhere in your browser.

[<img src="https://img.shields.io/chrome-web-store/v/gpfojneflmaoemniapdcgikfehpiocag?label=Install%20from%20Chrome%20Web%20Store&logo=googlechrome&logoColor=white&style=for-the-badge" alt="Install from Chrome Web Store">](https://chromewebstore.google.com/detail/tinymind-quick-thoughts/gpfojneflmaoemniapdcgikfehpiocag)

Features:
- Quick popup editor with Markdown support
- Right-click any selected text → "Add to TinyMind thoughts"
- Drag & drop or paste images
- Supports 20 languages

### Command Line

Publish from any local terminal without cloning, running, or deploying the
TinyMind website. The CLI uses your existing GitHub CLI authentication and
commits each successful command directly to your own `tinymind-blog`
repository.

```bash
npm install --global tinymind-cli
gh auth login

tm "A quick thought"
tinymind -t "Article title" -c "Article body"
tm -t "Long article" -f /path/to/article.md
```

For a one-off command without a global installation:

```bash
npx --yes tinymind-cli "A quick thought"
```

`tinymind-cli`, `tinymind`, and the shorter `tm` run the same CLI. Set
`TINYMIND_REPO=owner/repo` to override the default
`<authenticated-user>/tinymind-blog` repository.

### AI Agent Skill (Optional)

The npm package also contains a TinyMind skill for AI agents. Regular terminal
users do not need it. To make it available to Codex, link the installed package
into the local skills directory and start a new Codex task:

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
ln -s "$(npm root --global)/tinymind-cli" \
  "${CODEX_HOME:-$HOME/.codex}/skills/tinymind"
```

## How It Works

1. You authorize Tinymind to read/write your public GitHub repositories.
2. Tinymind immediately creates a public repository named `tinymind-blog` in your GitHub account.
3. When you write anything on Tinymind, it automatically commits to your `yourname/tinymind-blog` repository.

Your data is stored on your GitHub repository, separate from Tinymind.

## Data Privacy & Permissions

Your data remains secure:

- Stored directly in your GitHub repository
- Only write access to public repositories
- Full control via your GitHub account

## Features

- [x] Blog and Thoughts support Markdown
- [x] Add a feature to let writers manage their own blogs (add, delete, edit posts)
- [x] Supports user drag-and-drop image uploads
- [x] Shareable user main pages (e.g., [tinymind.me/mazzzystar](https://www.tinymind.me/mazzzystar))
- [x] Chrome Extension to capture thoughts & quotes from anywhere

## Creator List
If you use Tinymind for blogging or writing thoughts, feel free to comment below this issue(https://github.com/mazzzystar/tinymind/issues/18) to share your homepage URL for others to discover your work! 🎉

## Tech Stack

Built with cutting-edge technologies:

- Next.js
- React
- TypeScript
- NextAuth.js
- Tailwind CSS
- Cloudflare Workers via OpenNext

## Deployment

Production runs on the `tinymind` Cloudflare Worker. Pushes to `main` are built
and deployed automatically by Cloudflare Workers Builds using the commands
below:

```bash
npx opennextjs-cloudflare build
npx opennextjs-cloudflare deploy
```

For a manual deployment, use `npm run deploy`. Runtime secrets are managed in
Cloudflare and must not be committed to the repository. OpenNext's incremental
cache is persisted in the `tinymind-opennext-cache` R2 bucket.

## Contribute

We welcome contributions! Feel free to submit a Pull Request or open an issue for discussion.

## Support

Report issues or suggestions: [New Issue](https://github.com/mazzzystar/tinymind/issues/new).

## LICENSE

MIT License

