---
project: Tsuki
stars: 32
description: |-
    🌙 TypeScript on Hono: NestJS-style decorators, DI, modules. Tsuki (moon) ↔ Hono (flame).
url: https://github.com/Innei/Tsuki
---

<div align="center">

# 🌙 Tsuki

A collection of TypeScript libraries for building enterprise-grade server applications.

</div>

## Why “Tsuki”

**Hono** (_hi_, **火**, fire; the framework’s name plays on **炎**, _flame_) and **Tsuki** (_tsuki_, **月**, moon) mirror each other: **火 ↔ 月** — a fast, fiery edge runtime with a calm, reflective layer on top. [Hono](https://hono.dev) stays lean at HTTP; Tsuki adds modules, decorators, and DI without dulling that core.

## Inspired by NestJS

Tsuki borrows proven ideas from the [NestJS](https://nestjs.com) ecosystem so teams can reuse familiar mental models without committing to a full Nest stack on Hono:

- **Modules & controllers** — `@Module`, `@Controller`, and route decorators for structure and discovery.
- **Dependency injection** — constructor injection via [tsyringe](https://github.com/microsoft/tsyringe), with singleton providers and explicit registration.
- **Cross-cutting concerns** — guards, pipes, interceptors, exception filters, and middleware hooks arranged in a predictable request pipeline.
- **Metadata-driven behavior** — decorators carry OpenAPI and routing hints, similar to Nest’s decorator-first configuration style.

NestJS remains the reference for many of these patterns; Tsuki adapts them for Hono-first apps that want the same ergonomics in a smaller footprint.

## Packages

| Package                                                 | Description                                                            |
| ------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`@tsuki-hono/common`](./packages/common)               | Decorators, interfaces, exceptions, pipes, logger, and request context |
| [`@tsuki-hono/core`](./packages/core)                   | Application runtime, DI container utils, route registration            |
| [`@tsuki-hono/event-emitter`](./packages/event-emitter) | Redis pub/sub event system with `@OnEvent` / `@EmitEvent`              |
| [`@tsuki-hono/openapi`](./packages/openapi)             | OpenAPI 3.1 document generation from decorator metadata                |
| [`create-tsuki-app`](./packages/create-tsuki-app)       | Scaffolder CLI for new Tsuki apps                                      |

## Built with Tsuki

Projects that ship on this stack:

- **[Afilmory](https://github.com/Afilmory/afilmory)** — a personal photography site with a nostalgic, film-inspired presentation layer and a Tsuki/Hono backend.

## Quick Start

### Scaffold a new project

```bash
pnpm create tsuki-app my-app
cd my-app
pnpm install
docker compose up -d # postgres + redis
cp .env.example .env
pnpm db:generate && pnpm db:migrate
pnpm dev
```

This bootstraps the [`examples/starter`](./examples/starter) template — a production-shaped Hono app with all four `@tsuki-hono/*` packages wired together: postgres + drizzle, ioredis, decorator-based modules, OpenAPI docs at `/internal/docs`, typed `AppException` error envelope, and a release-phase Dockerfile that migrates with a `pg_advisory_lock`.

### Work on the monorepo

```bash
git clone https://github.com/innei/tsuki.git
cd tsuki
pnpm install
pnpm test
```

## Minimal usage

The Node example requires Node.js 20 or later and `@hono/node-server` 2.1.5 or later.

```ts
import 'reflect-metadata';
import { serve } from '@hono/node-server';
import { Module, Controller, Get } from '@tsuki-hono/common';
import { createApplication } from '@tsuki-hono/core';

@Controller('hello')
class HelloController {
  @Get('/')
  greet() {
    return { message: 'Hello from Tsuki!' };
  }
}

@Module({ controllers: [HelloController] })
class AppModule {}

async function bootstrap() {
  const app = await createApplication(AppModule);
  serve({ fetch: app.getInstance().fetch, port: 3000 });
}

bootstrap();
```

See individual package READMEs for detailed documentation, and [`examples/starter`](./examples/starter) for a fuller production-shaped reference (DB, Redis, events, OpenAPI, error envelope, Docker).

## AI assistants and agents

Automated tools work best when they share the same constraints as the framework. **[`LLM.txt`](./LLM.txt)** is the repo’s agent-oriented guide: package graph, request pipeline, bootstrap steps, DI and TypeScript rules that are easy to get wrong, and how to run tests and typecheck before claiming a change is done. Point your coding agent at that file (or paste it into context) when implementing features in Tsuki or when building an app on `@tsuki-hono/*`.

[Claude Code](https://claude.ai/code) users also have **[`AGENTS.md`](./AGENTS.md)** at the repo root with overlapping maintainer-focused notes.

## Development

- **Package Manager**: pnpm 12.x
- **Language**: TypeScript (ESNext)
- **Test**: Vitest

```bash
pnpm install # Install all dependencies
pnpm test    # Run all tests across packages
pnpm bench   # Compare Tsuki and plain Hono over local HTTP
```

See [benchmark methodology and results](./benchmarks/README.md) and the [security audit](./docs/security-audit.md).

## License

MIT

