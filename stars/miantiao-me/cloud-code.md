---
project: cloud-code
stars: 554
description: |-
    Cloud Code (Cloudflare + OpenCode), running OpenCode on Cloudflare to build a dedicated cloud Agent for you.
url: https://github.com/miantiao-me/cloud-code
---

# Cloud Code (Cloudflare + OpenCode)

**Cloud Code** is a containerized Agent solution that combines Cloudflare's powerful infrastructure with OpenCode's intelligent capabilities.

This is a TypeScript project based on Cloudflare Workers and Cloudflare Containers. It leverages Cloudflare's infrastructure to run and manage containerized workloads.

English | [简体中文](README.zh-CN.md)

## 🚀 Quick Start

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/miantiao-me/cloud-code)

### Prerequisites

- pnpm (recommended)
- Node.js (v20+ recommended)
- Wrangler CLI (`pnpm add -g wrangler`)

### Install Dependencies

```bash
pnpm install
```

### Local Development

Start the local development server:

```bash
pnpm dev
# or
pnpm start
```

This command will start `wrangler dev`, simulating the Cloudflare Workers environment.

### Generate Type Definitions

If you modify the bindings in `wrangler.jsonc`, you need to regenerate the type files:

```bash
pnpm cf-typegen
```

## 📦 Deployment

Deploy your code to Cloudflare's global network:

```bash
pnpm deploy
```

## 📂 Project Structure

```
.
├── src/
│   ├── index.ts        # Workers entry file (ExportedHandler)
│   ├── container.ts    # AgentContainer class definition (extends Container)
│   └── sse.ts          # SSE (Server-Sent Events) stream processing logic
├── worker-configuration.d.ts # Auto-generated environment bindings types
├── wrangler.jsonc      # Wrangler configuration file
├── tsconfig.json       # TypeScript configuration
└── package.json
```

## 🔐 Secure Access (Basic Auth)

To protect your Agent from unauthorized access, this project supports standard HTTP Basic Auth authentication.

### Configuration

Set the following variables in `wrangler.jsonc` or in the Cloudflare Dashboard environment variables:

| Variable Name     | Description                                           | Default |
| ----------------- | ----------------------------------------------------- | ------- |
| `SERVER_PASSWORD` | Access password. If not set, authentication is **disabled**. | (empty) |
| `SERVER_USERNAME` | Access username.                                      | (empty) |

### Verification Logic

1. Authentication is only enabled when the `SERVER_PASSWORD` environment variable is set.
2. Client requests must include an `Authorization: Basic <credentials>` header.
3. If authentication fails, the server returns a `401 Unauthorized` status code.

## 💾 Data Persistence (S3/R2)

Cloud Code containers have built-in support for S3-compatible storage (such as Cloudflare R2, AWS S3), using `TigrisFS` to mount object storage as a local filesystem for persistent data storage.

### Environment Variable Configuration

To enable data persistence, configure the following environment variables in the container runtime:

| Variable Name          | Description                                  | Required | Default  |
| ---------------------- | -------------------------------------------- | -------- | -------- |
| `S3_ENDPOINT`          | S3 API endpoint address                      | ✅ Yes   | -        |
| `S3_BUCKET`            | Bucket name                                  | ✅ Yes   | -        |
| `S3_ACCESS_KEY_ID`     | Access key ID                                | ✅ Yes   | -        |
| `S3_SECRET_ACCESS_KEY` | Access key secret                            | ✅ Yes   | -        |
| `S3_REGION`            | Storage region                               | ❌ No    | `auto`   |
| `S3_PATH_STYLE`        | Whether to use Path Style access             | ❌ No    | `false`  |
| `S3_PREFIX`            | Path prefix (subdirectory) within the bucket | ❌ No    | (root)   |
| `TIGRISFS_ARGS`        | Additional mount arguments for TigrisFS      | ❌ No    | -        |

### How It Works

1. **Mount Point**: When the container starts, the S3 bucket is mounted at `/root/s3`.
2. **Working Directory**: The actual workspace is located at `/root/s3/workspace`.
3. **OpenCode Configuration**: OpenCode's configuration files (XDG directory) are also stored in `/root/s3/.opencode`, ensuring editor state persistence.
4. **Initialization**:
   - If the S3 bucket (or specified prefix path) is empty, the container will automatically copy the preset `workspace` directory contents into it.
   - If S3 configuration is missing, the container will fall back to non-persistent local directory mode.

## 🌐 Tunnel Exposure (Cloudflared)

The container comes pre-installed with the `cloudflared` CLI, which can be used to expose services running inside the container (such as development servers, web applications) to the public internet via Cloudflare Tunnel.

This is useful in the following scenarios:

- Debugging web services running inside the container
- Temporarily sharing development environments
- Configuring SSH access

Usage example (in the container terminal):

```bash
# Expose port 8080 inside the container to the public internet
cloudflared tunnel --url http://localhost:8080
```

## 🛠 Tech Stack

- **Runtime**: Cloudflare Workers
- **Language**: TypeScript
- **Core Libraries**:
  - `cloudflare:workers`: Workers standard library
  - `@cloudflare/containers`: Container management and interaction
- **Tools**: Wrangler
- **Container Environment**:
  - `nikolaik/python-nodejs`: Python 3.12 + Node.js 22
  - `tigrisfs`: S3 filesystem mount
  - `cloudflared`: Cloudflare Tunnel client
  - `opencode`: Intelligent coding Agent

## 📝 Development Guidelines

The official language for this project is **English** (code, comments, and commit messages are in English). This README is the English version. For detailed development guidelines, code style, and Agent behavior rules, please refer to [AGENTS.md](./AGENTS.md).

