---
project: masonry-flow
stars: 31
description: |-
    A React/Vue component to render masonry layout
url: https://github.com/CatsJuice/masonry-flow
---

# Playground

[masonry.oooo.so](https://masonry.oooo.so)

# Install

```
npm install masonry-flow
```

# Usage

## React

```tsx
import MasonryFlow from "masonry-flow/react";

<MasonryFlow.Root width="200,300" gap={8}>
  <MasonryFlow.Item style={{ background: "#f00" }} height={150}>
    1
  </MasonryFlow.Item>
  <MasonryFlow.Item style={{ background: "#0f0" }} height={120}>
    2
  </MasonryFlow.Item>
  <MasonryFlow.Item style={{ background: "#00f" }} height={140}>
    3
  </MasonryFlow.Item>
</MasonryFlow.Root>;
```

## Vue

```vue
<script setup>
import { MasonryFlowRoot, MasonryFlowItem } from "masonry-flow/vue";
</script>

<template>
  <masonry-flow-root :width="[200, 300]" :gap="8">
    <masonry-flow-item style="background: #f00" :height="150">
      1
    </masonry-flow-item>
    <masonry-flow-item style="background: #0f0" :height="120">
      2
    </masonry-flow-item>
    <masonry-flow-item style="background: #00f" :height="140">
      3
    </masonry-flow-item>
  </masonry-flow-root>
</template>
```

