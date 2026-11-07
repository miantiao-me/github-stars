---
project: Tuvix-RSS
stars: 77
description: |-
    A self-hostable RSS aggregator for the masses
url: https://github.com/TechSquidTV/Tuvix-RSS
---

# Tuvix

**Take back your feed.**

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![codecov](https://codecov.io/gh/TechSquidTV/Tuvix-RSS/branch/main/graph/badge.svg)](https://codecov.io/gh/TechSquidTV/Tuvix-RSS)

Tuvix is a modern RSS aggregator that helps you follow all your favorite blogs, podcasts, and news sources in one place. It's not a social network, it's not an algorithmic feed, it's just old-fashioned RSS.

<div align="center">
  <video src="https://github.com/user-attachments/assets/2977b151-6a0f-4e9f-a0ee-6d039f935b5a" width="400" />
</div>

## Hosted

Head over to **[tuvix.app](https://tuvix.app)** to create your free account and start reading!

Immediately begin subscribing to your favorite feeds. Remember, you can always export your data to OPML and migrate to your own self-hosted instance, or any other RSS reader.

### Browser Extension

Install the **[Tuvix Tricorder Extension](https://github.com/TechSquidTV/Tuvix-Tricorder-Extension)** for Chrome and Firefox to easily discover and subscribe to RSS feeds on any website with one click.

---

## 🚀 Deployment

Tuvix supports two deployment methods:

- **🐳 Docker Compose** - Self-hosted with containers
- **☁️ Cloudflare** - Serverless edge deployment (Workers + Pages)

See the **[Deployment Guide](./docs/deployment.md)** for detailed instructions.

### Quick Start (Docker)

The docker-compose.yml works with both pre-built images and source builds:

**Option 1: Pre-built Images (Recommended - Fast)**

```bash
# Create directory and download files
mkdir Tuvix-RSS && cd Tuvix-RSS
curl -O https://raw.githubusercontent.com/TechSquidTV/Tuvix-RSS/main/docker-compose.yml
curl -O https://raw.githubusercontent.com/TechSquidTV/Tuvix-RSS/main/env.example
cp env.example .env

# Edit .env and configure:
# 1. BETTER_AUTH_SECRET (generate: openssl rand -base64 32)
# 2. Admin credentials (ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD)
nano .env

# Pin to specific version (optional)
export VERSION=v0.6.1  # Or use 'latest' for newest

# Create data directory with proper permissions
# The container runs as uid 1001, so the directory must be writable
mkdir data
chmod 777 data  # Or: chown 1001:1001 data

docker compose pull
docker compose up -d

# Access at http://localhost:5173
```

**Option 2: Build from Source**

> **⚠️ Use a Release:** The `main` branch contains active development and is not guaranteed to be stable. Always use the latest release for self-hosting.

Clone the repository and checkout the latest release:

```bash
git clone https://github.com/TechSquidTV/Tuvix-RSS.git
cd Tuvix-RSS
# Checkout the latest release tag (v*)
git checkout $(git tag -l 'v*' | sort -V | tail -n1)
```

Configure and run:

```bash
cp env.example .env
# Edit .env and configure:
# 1. BETTER_AUTH_SECRET (generate: openssl rand -base64 32)
# 2. ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD (for your admin user)
nano .env

# Build and start (includes git version in settings)
pnpm run docker:build
docker compose up -d

# Or build without version script
docker compose build
docker compose up -d
```

Visit `http://localhost:5173` and log in with your admin credentials.

### Development Setup

**Prerequisites:** Node.js 24+ (with pnpm), SQLite3

```bash
pnpm install
cp env.example .env
# Edit .env and set BETTER_AUTH_SECRET, ADMIN_* credentials
pnpm run db:migrate
pnpm run dev
```

App: `http://localhost:5173` | API: `http://localhost:3001`

---

## 👨‍💻 Development

### Git Workflow

Tuvix uses a **trunk-based development** workflow:

- **`main`** - Protected branch, all development happens here
- **Feature branches** - Created from `main`, merged back via PR

**Development Process:**

1. Create feature branches from `main`: `git checkout -b feature/my-feature`
2. Open PRs targeting `main` for review and CI checks
3. After approval, changes merge to `main` and auto-deploy to staging
4. Production deployments happen via manual promotion or release tags

### Configuration

**Required:**

- `BETTER_AUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `ADMIN_USERNAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` - Your admin credentials

**Optional:** `DATABASE_PATH`, `PORT`, `CORS_ORIGIN`, `ALLOW_FIRST_USER_ADMIN`

See `env.example` for all options and [Deployment Guide](./docs/deployment.md) for details.

---

## 📚 Documentation

- **[Documentation Index](./docs/README.md)** - Complete guide
- **[Deployment Guide](./docs/deployment.md)** - Docker & Cloudflare Workers
- **[tRPC API Architecture](./docs/developer/trpc-api-architecture.md)** - API reference
- **[Project Integration](./docs/developer/project-integration.md)** - Frontend-backend guide

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### Quick Start for Contributors

1. Fork the repository
2. Create your feature branch from `main`: `git checkout -b feature/amazing-feature`
3. Make your changes and test them
4. Commit using [conventional commits](https://www.conventionalcommits.org/): `git commit -m 'feat: add amazing feature'`
5. Push to your fork: `git push origin feature/amazing-feature`
6. Open a Pull Request targeting the `main` branch

### Before Contributing

- Read our [Contributing Guide](CONTRIBUTING.md) for detailed guidelines
- Check out our [Code of Conduct](CODE_OF_CONDUCT.md)
- Browse [existing issues](https://github.com/TechSquidTV/Tuvix-RSS/issues) or create a new one
- Join our community discussions

### Good First Issues

New to the project? Look for issues tagged with `good first issue` to get started!

### Development Setup

```bash
git clone https://github.com/YOUR_USERNAME/Tuvix-RSS.git
cd Tuvix-RSS
pnpm install
cp env.example .env
# Edit .env and configure BETTER_AUTH_SECRET and ADMIN_* credentials
pnpm run db:migrate
pnpm run dev
```

See the [Contributing Guide](CONTRIBUTING.md) and [developer documentation](./docs/developer/) for more details.

---

## 📄 License

AGPLv3 - see the [LICENSE](./LICENSE) file for details.

---

Made with ❤️ by the TechSquidTV community

