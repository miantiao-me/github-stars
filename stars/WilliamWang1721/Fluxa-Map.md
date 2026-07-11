---
project: Fluxa-Map
stars: 57
description: |-
    Payments-Maps is a payment method browsing map created for credit card enthusiasts. Anyone can add a marked location on the map, and all users can view it.
url: https://github.com/WilliamWang1721/Fluxa-Map
---

# Fluxa Map

Fluxa Map 是一个给内部运营、数据维护人员和 AI agent 共同使用的支付地点工作台。它把支付地点地图、品牌目录、支付尝试记录、个人卡册、浏览历史和 MCP 授权接到同一套 Supabase 数据上，目标是更快地补点、核点、查覆盖、授权 AI 代操作。

这份 README 只做入口地图，不代替完整说明。详细开发文档见 [docs/development-guide.md](./docs/development-guide.md)，批量品牌导入专项流程见 [docs/bulk-brand-import.md](./docs/bulk-brand-import.md)。

## 这个仓库包含什么

- Web 前端：Vite + React 单页应用，入口在 `src/main.tsx` 和 `src/root-app.tsx`
- Serverless API：`api/` 下的 Vercel 路由，包含 `/health`、`/api/amap/js`、`/api/mcp/*`
- MCP 服务：`mcp-server/`，既可本地独立运行，也可被 Vercel API 直接复用
- Supabase 资产：`supabase/migrations/` 和 `supabase/functions/`

不属于本系统边界的内容：

- 工作区中的兄弟目录 `Payments-Maps`、`payments-fluxa-worktree.CqAAfJ`
- AMap、高德 JS 服务本身
- OpenRouter / 上游大模型服务本身
- Supabase 控制台里的 OAuth Provider 配置、远程历史表结构本体

## 核心业务流

1. 用户通过 Supabase OAuth 登录。
2. 前端从 Supabase 读取地图点位、品牌、卡册和个人信息。
3. 用户新增地点时，可走手工录入、AI 辅助录入，或管理员批量地图导入。
4. 已验证地点写入 `pos_machines` + `pos_attempts`，壳数据写入 `fluxa_locations`。
5. 用户可创建 MCP 会话，把当前账号授权给 Claude、Cherry Studio、Codex 等客户端。

## 快速开始

```bash
npm install
npm --prefix ./mcp-server install
cp .env.example .env
cp supabase/functions/.env.example supabase/functions/.env
npm run dev
```

常用附加命令：

```bash
npm run mcp:dev
npm run typecheck
npm run mcp:typecheck
npm run build
```

当前仓库没有 `npm test` 脚本。现有最小质量门是：

- `npm run typecheck`
- `npm run mcp:typecheck`
- `npm run build`

## 环境变量

前端 `.env`：

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_MCP_SERVER_URL`
- `VITE_AMAP_KEY`
- `VITE_AMAP_SECURITY_JS_CODE`

Supabase Edge Functions `supabase/functions/.env`：

- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL*`

MCP 服务端环境变量见 [docs/development-guide.md](./docs/development-guide.md) 的“部署与环境”章节。

## 当前已验证命令

2026-03-22 在当前仓库上已验证通过：

- `npm run typecheck`
- `npm run mcp:typecheck`
- `npm run build`

构建产物存在单包较大告警，属于当前已知状态，不阻塞构建。

## 文档导航

- [docs/development-guide.md](./docs/development-guide.md): 完整开发说明、架构、数据模型、接口契约、部署和 FAQ
- [docs/bulk-brand-import.md](./docs/bulk-brand-import.md): 批量品牌导入的专项操作规范

