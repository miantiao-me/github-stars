---
project: mcp
stars: 746
description: |-
    Connect AI agents to real iPhones and Androids
url: https://github.com/phone-harness/mcp
---

# Phone Harness MCP 🔌

**Give any MCP agent a real iPhone or an Android emulator in the cloud.**

Add Phone Harness as a custom connector in Claude, Cursor, ChatGPT, Codex, or any MCP client, and your agent can see the screen, tap, type, swipe, and open apps on a real iPhone or an Android emulator.

## Setup

### General

Streamable HTTP. Sign-in is OAuth and asks for the `phone:drive` scope. An API key can be sent as a bearer token instead; see the FAQ.

    https://mcp.phone-harness.com/mcp

[<img src="https://img.shields.io/badge/Add_to-Claude-000000?style=flat-square&logo=claude&logoColor=white" alt="Add to Claude">](https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=Phone%20Harness&connectorUrl=https%3A%2F%2Fmcp.phone-harness.com%2Fmcp)
[<img src="https://img.shields.io/badge/Add_to-Cursor-000000?style=flat-square&logo=cursor" alt="Add to Cursor">](cursor://anysphere.cursor-deeplink/mcp/install?name=phone-harness&config=eyJ1cmwiOiJodHRwczovL21jcC5waG9uZS1oYXJuZXNzLmNvbS9tY3AifQ==)
[<img src="https://img.shields.io/badge/Add_to-VS_Code-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Add to VS Code">](https://vscode.dev/redirect/mcp/install?name=phone-harness&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.phone-harness.com%2Fmcp%22%7D)

- **Works in any MCP client.** Claude, Cursor, ChatGPT, Codex, VS Code, and more.
- **Nothing to set up.** No Mac, no adb, no pairing. Just a URL and a sign-in.
- **Real iPhones.** Dedicated cloud iPhones, and Android emulators, driven the way a person uses them.

### Claude

Use the Add to Claude button above, or open **Customize → Connectors** and add a custom connector (**Add → Custom → Web**, or **Add custom connector**). Name it Phone Harness, paste `https://mcp.phone-harness.com/mcp`, choose sign-in rather than No sign in, and add it. On Team and Enterprise, an Owner adds it under **Organization settings → Connectors**; members then connect.

### Cursor

Use the Add to Cursor button above, or add this to `~/.cursor/mcp.json` (all projects) or `.cursor/mcp.json` (one project), then restart Cursor. Cursor signs in with OAuth when the server asks.

```json
{
  "mcpServers": {
    "phone-harness": {
      "url": "https://mcp.phone-harness.com/mcp"
    }
  }
}
```

### ChatGPT

On ChatGPT web, open **Plugins → + → Add custom MCP server**. Name it, paste `https://mcp.phone-harness.com/mcp`, choose sign-in, acknowledge the warning, and select **Create as a plugin**. Install the plugin, then @ mention it in a chat.

Custom MCP servers on ChatGPT web are for Business, Enterprise, and Edu workspaces. An admin creates the plugin. Pro accounts can connect a custom server for read and fetch tools only, so driving the phone needs Business, Enterprise, or Edu.

### Grok

On [grok.com/connectors](https://grok.com/connectors), choose **New Connector → Custom**, paste `https://mcp.phone-harness.com/mcp`, and complete the sign-in. The server has to be reachable on the public internet.

In the Grok CLI, OAuth runs on first use:

```bash
grok mcp add --transport http phone-harness https://mcp.phone-harness.com/mcp
```

### Claude Code

```bash
claude mcp add --transport http phone-harness https://mcp.phone-harness.com/mcp
```

Then run `/mcp` and sign in. That saves the server for the current project; add `--scope user` to keep it in every project.

### Codex

```bash
codex mcp add phone-harness --url https://mcp.phone-harness.com/mcp
codex mcp login phone-harness
```

In the Codex IDE extension (gear menu → MCP servers) or the ChatGPT desktop app (Settings → MCP servers): **Add server → Streamable HTTP**, paste the URL, save, restart, and select **Authenticate**.

### VS Code

Use the Add to VS Code button above. Or open the Command Palette, run **MCP: Add Server**, choose **HTTP**, and paste `https://mcp.phone-harness.com/mcp`. Sign in when asked.

The same server in the VS Code `mcp.json` format:

```json
{
  "servers": {
    "phone-harness": {
      "type": "http",
      "url": "https://mcp.phone-harness.com/mcp"
    }
  }
}
```

### Windsurf

**Settings → Tools → Windsurf Settings → Add Server**, or open the MCP config file from Cascade's MCP menu and add:

```json
{
  "mcpServers": {
    "phone-harness": {
      "serverUrl": "https://mcp.phone-harness.com/mcp"
    }
  }
}
```

Cascade signs in with OAuth for a streamable HTTP server when no header is set. Press refresh after adding it.

### Devin

In Devin, open **Customize → MCPs → Add MCP → Add custom MCP**. Set the transport to HTTP, the server URL to `https://mcp.phone-harness.com/mcp`, and authentication to OAuth. Save, then choose **Connect**. Adding a custom server needs the Manage MCP Servers permission.

In the Devin CLI:

```bash
devin mcp add phone-harness https://mcp.phone-harness.com/mcp
devin mcp login phone-harness
```

### Gemini CLI

```bash
gemini mcp add --transport http phone-harness https://mcp.phone-harness.com/mcp
```

Gemini CLI discovers OAuth from the server. In a session, `/mcp auth phone-harness` starts the sign-in.

### GitHub Copilot

```bash
copilot mcp add --transport http phone-harness https://mcp.phone-harness.com/mcp
```

That writes a streamable HTTP server to `~/.copilot/mcp-config.json`. The default OAuth grant is the browser authorization-code flow.

### Perplexity

Open **Plugins → Add custom → Add MCP connector**, and choose **Remote**. Name it, set the MCP server URL to `https://mcp.phone-harness.com/mcp`, and choose OAuth. For an organization, an admin adds it under **Organization settings → Connectors**.

### Warp

**Warp Drive → MCP Servers → + Add**, choose Streamable HTTP, and set the URL to `https://mcp.phone-harness.com/mcp` with no headers. Warp’s docs show that a URL-only remote server opens a browser sign-in when it uses OAuth.

### Raycast

Run **Install MCP Server**. Set the transport to HTTP, the URL to `https://mcp.phone-harness.com/mcp`, and OAuth to Dynamic. HTTP servers that use OAuth ask you to sign in before their tools are available.

### Manus

Open **Connectors → Create → Add MCP by URL**. Enter a name and `https://mcp.phone-harness.com/mcp`.

### OpenClaw

```bash
openclaw mcp add phone-harness --url https://mcp.phone-harness.com/mcp --transport streamable-http --auth oauth
openclaw mcp login phone-harness
```

Or in the Control UI: **Settings → MCP → Add server**, transport Streamable HTTP, then **Sign in**.

### Muse Code

Add this to the `mcp_servers` block of the Muse Code settings file, then sign in:

```json
{
  "mcp_servers": {
    "phone-harness": {
      "transport": "streamable_http",
      "url": "https://mcp.phone-harness.com/mcp"
    }
  }
}
```

```bash
muse mcp login phone-harness
```

### Zed

**Settings → AI → MCP Servers → Add Server → Add Remote Server**, or add this to `settings.json`. With no `Authorization` header, Zed starts the MCP OAuth sign-in.

```json
{
  "context_servers": {
    "phone-harness": {
      "url": "https://mcp.phone-harness.com/mcp"
    }
  }
}
```

### Others

Any other client that can add a remote streamable HTTP server uses the URL above and the sign-in. Local stdio, Docker, and Vercel are in [docs/self-hosting.md](docs/self-hosting.md).

## Tools

The hosted server registers these tools. Every tool except the first two takes `device`, an id from `phone_list_available_devices`.

Cloud Android emulators are free to start, then 5¢ per phone-minute, pay as you go. A Cloud iPhone is a flat monthly subscription, not billed by the minute: $80/mo, or $100/mo with an eSIM, with 20% off billed annually ($64/mo, or $80/mo with an eSIM). `minutes` on `phone_start_device` is how long the session runs (default 30), not a billing unit. See [phone-harness.com/pricing](https://phone-harness.com/pricing) for current rates.

| Tool | Does |
| --- | --- |
| `phone_list_available_devices` | Running phones and their ids, the phones the account can start, and the account balance when the API reports one. |
| `phone_start_device` | Start a phone and wait until it is ready. With nothing named, a temporary Android emulator starts. `platform` and `kind` go together (`android`/`emulator`, or `ios`/`device` for the account's iPhone). `device_id` picks a particular iPhone or a saved Android phone (apps and logins kept). |
| `phone_stop_device` | End the session. Anything not saved on the phone is lost. Stopping cloud Android stops the per-minute charge. |
| `phone_get_screen_size` | Screen size in the coordinate space taps and swipes use. |
| `phone_take_screenshot` | JPEG of the screen. Long side at most `max_size` (default 1024), or `scale`. The text before the image converts a point in the image to screen coordinates. |
| `phone_list_elements_on_screen` | Visible text with tap-ready centers (`text` or `json`). Accessibility tree on Android; text recognition on iPhone. |
| `phone_click_on_screen_at_coordinates` | Tap `x`, `y`. |
| `phone_long_press_on_screen_at_coordinates` | Press and hold `x`, `y` for `duration` milliseconds (default 800, clamped to 100–10000). |
| `phone_swipe_on_screen` | Swipe. `direction` is the way the finger moves (`up` reveals what is below). From `x`, `y` or the center, for `distance` pixels or 40% of the screen. |
| `phone_type_keys` | Type `text` into the focused field. `submit` presses Enter. |
| `phone_press_button` | `HOME`, `BACK` (Android only), `APP_SWITCHER`, or `ENTER`. |
| `phone_list_apps` | Installed apps: package ids on Android, bundle ids on an iPhone, when the phone can list them. |
| `phone_launch_app` | Open an app by the name on its icon, or on Android by package id. |
| `phone_get_foreground_app` | Which app is in front, when the phone reports it. |

There is no tool that opens a URL. A local stdio server also registers `phone_save_screenshot` (write a PNG or JPEG on that machine). Tool names follow [mobile-mcp](https://github.com/mobile-next/mobile-mcp).

## FAQ

### Can I use an API key instead of signing in?

Yes. Send `Authorization: Bearer pck_…` instead of going through OAuth. The buttons above do not include a key.

```json
{
  "mcpServers": {
    "phone-harness": {
      "url": "https://mcp.phone-harness.com/mcp",
      "headers": { "Authorization": "Bearer pck_…" }
    }
  }
}
```

Codex reads the key from the environment:

```toml
[mcp_servers.phone-harness]
url = "https://mcp.phone-harness.com/mcp"
bearer_token_env_var = "PHONE_HARNESS_API_KEY"
```

Other API-key configs are in [docs/self-hosting.md](docs/self-hosting.md).

## Development

```bash
uv sync
uv run pytest
uv run phone-harness-mcp --help
```

Report vulnerabilities per [SECURITY.md](SECURITY.md).

## License

MIT

