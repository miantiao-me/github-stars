---
project: WebRTC-Screen-Mirror
stars: 276
description: |-
    一个基于 WebRTC 和 Cloudflare Durable Objects 实现的简单高效的屏幕共享工具。通过 WebSocket 实现实时信令服务，配合 WebRTC 技术，实现低延迟的屏幕共享功能。只需输入投屏码，即可实现跨设备的屏幕分享。
url: https://github.com/akazwz/WebRTC-Screen-Mirror
---

# WebRTC Screen Mirror

一个基于 WebRTC 和 Cloudflare Durable Objects 实现的简单高效的屏幕共享工具。通过 WebSocket 实现实时信令服务，配合 WebRTC 技术，实现低延迟的屏幕共享功能。只需输入投屏码，即可实现跨设备的屏幕分享。

## 🌟 特性

- 🚀 基于 WebRTC 的低延迟屏幕共享
- 🔌 使用 WebSocket 实现实时信令通信
- 🔒 基于 Cloudflare Durable Objects 实现可靠的 WebSocket 信令服务器
- 📱 支持跨平台、跨设备访问
- 🎯 简单易用，无需安装，输入投屏码即可观看
- 🆓 完全免费开源

## 🖥️ 在线体验

访问 [https://mirror.doveliao.com/](https://mirror.doveliao.com/) 即可体验。

> 💡 **最佳使用环境**: 在同一局域网内使用效果最佳，可以获得最低的延迟和最流畅的体验。

## ⚠️ 使用注意事项

- **网络环境**: 
  - 同一局域网内使用效果最佳
  - 不同网络环境下可能无法建立连接，这是由于 NAT 穿透失败导致的
  - 某些 VPN 工具会屏蔽 UDP 连接，可能导致 WebRTC 连接失败
  - 如果连接失败，建议尝试关闭 VPN 或切换到同一网络环境

- **浏览器支持**:
  - 推荐使用最新版本的 Chrome、Firefox、Edge 等现代浏览器
  - 需要允许浏览器的屏幕共享权限

## 🛠️ 技术栈

- WebRTC - 实现端对端的屏幕共享
- WebSocket - 实现实时信令通信
- Cloudflare Workers - 提供边缘计算能力
- Cloudflare Durable Objects - 维护 WebSocket 连接状态
- TypeScript - 提供类型安全的代码实现

## 💡 工作原理

1. 打开网页, 系统会生成唯一的投屏码
2. 观看方输入投屏码后，通过 WebSocket 连接到对应的 Durable Object
3. Durable Object 作为信令服务器，帮助双方建立 WebRTC 连接
4. 建立 P2P 连接后，屏幕画面通过 WebRTC 直接传输，实现低延迟共享

