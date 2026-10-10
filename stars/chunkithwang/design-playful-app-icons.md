---
project: design-playful-app-icons
stars: 174
description: |-
    null
url: https://github.com/chunkithwang/design-playful-app-icons
---

# Design Playful App Icons

> English version: [README.en.md](./README.en.md)

一个公开、纯文本的 Agent Skill，用于设计、生成、改进和评审大胆、有趣、适合上架的 App Icon。

它不携带参考图片，也不依赖特定艺术家、工作室或现有 App。Skill 通过可量化的构图规则、四套视觉配方、紧凑配色和小尺寸评审流程，让不同 Agent 获得相对稳定且原创的输出。

## 30 秒开始

```bash
npx skills add https://github.com/chunkithwang/design-playful-app-icons \
  --skill design-playful-app-icons
```

安装后直接对 Agent 说：

```text
用 $design-playful-app-icons 为一个专注计时器设计 3 个 App Icon 方向，并继续完善最强的一个。
```

也可以尝试：

```text
为我的记账 App 设计一个不使用文字、在 32 px 下仍然清晰的图标。
把这个图标改成更有性格的软 3D 方向，但保留原来的产品隐喻。
评审我提供的 App Icon，并给出可以直接用于重新生成的修改提示词。
为最终方案补充 iOS 和 Android 的生产交付规格。
```

## 能做什么

- 从产品功能提炼 `物体 + 动作 + 情绪` 的核心隐喻
- 生成 3 个在隐喻或轮廓上真正不同的概念方向
- 输出可复现的图像生成提示词、负面约束和配色方案
- 在图像工具可用时直接生成并迭代图标
- 按 1024、180、60 和 32 px 四个尺寸评审可读性
- 检查产品含义、轮廓、原创性、配色、材质和平台适配
- 输出 iOS 与 Android 的生产交付说明

## 四套视觉路线

| 路线 | 特征 | 适合场景 |
| --- | --- | --- |
| Flat outlined mascot | 扁平色块、清晰描边、强表情 | 轻工具、社区、教育、生活方式 |
| Soft 3D object-character | 柔和体积、圆润材质、统一光源 | 效率、健康、消费级 AI 产品 |
| Gradient silhouette mascot | 大轮廓、受控渐变、极少细节 | 音乐、创作、情绪与娱乐产品 |
| Minimal dimensional glyph | 几何符号、克制空间感、无角色依赖 | 专业工具、开发者产品、生产力 App |

每次任务只选择一条路线，不把四套风格混在同一个图标里。

## 安装

### 方式一：使用 Skills CLI（推荐）

```bash
npx skills add https://github.com/chunkithwang/design-playful-app-icons \
  --skill design-playful-app-icons
```

需要安装到用户级目录时：

```bash
npx skills add https://github.com/chunkithwang/design-playful-app-icons \
  --skill design-playful-app-icons \
  --global
```

### 方式二：直接交给 Agent 安装

把下面这段话发给有 shell 权限的 Codex、Claude Code、Cursor 或其他 Agent：

```text
帮我安装 design-playful-app-icons。请运行：
npx skills add https://github.com/chunkithwang/design-playful-app-icons --skill design-playful-app-icons
安装完成后，确认 SKILL.md、agents/openai.yaml 和 references/ 都已安装，并告诉我实际安装位置。
```

### 方式三：使用 Codex 内置安装器

只使用 Codex，或本机不方便运行 Node.js 时，可以使用：

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo chunkithwang/design-playful-app-icons \
  --path skills/design-playful-app-icons \
  --method git
```

Codex 会在下一轮对话中发现新安装的 Skill。

## 更新

更新项目级安装：

```bash
npx skills update design-playful-app-icons
```

更新用户级安装：

```bash
npx skills update design-playful-app-icons --global
```

## 使用流程

1. 把产品需求压缩为 `物体 + 动作 + 情绪`。
2. 选择一套视觉路线并创建 3 个不同概念。
3. 按产品含义、轮廓和原创性评分，选出最强方向。
4. 明确几何、构图、表情、配色、材质、光线和负面约束。
5. 生成图标，或在没有图像工具时交付完整提示词与构造规范。
6. 在 1024、180、60 和 32 px 下评审，只修正最弱维度。
7. 交付最终图标或提示词、配色、生产说明与质量报告。

## 平台支持

| 平台 | 说明 |
| --- | --- |
| Codex | 支持完整工作流；图像工具可用时可直接生成和迭代 |
| Claude Code / Cursor | 支持概念、提示词、评审和交付流程；实际生成能力取决于所接入的图像工具 |
| 其他 Agent | 需要能够安装并读取标准 Agent Skills |

## 目录结构

```text
skills/design-playful-app-icons/
|-- SKILL.md
|-- agents/
|   `-- openai.yaml
`-- references/
    |-- design-recipes.md
    |-- evaluation.md
    `-- style-profile.yaml
```

其中：

- `SKILL.md`：核心工作流、原创性规则和交付格式
- `style-profile.yaml`：可量化的视觉参数与不变量
- `design-recipes.md`：四套视觉路线、产品隐喻和提示词配方
- `evaluation.md`：评分标准、小尺寸检查和生产预检

