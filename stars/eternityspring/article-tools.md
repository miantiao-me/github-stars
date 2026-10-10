---
project: article-tools
stars: 825
description: |-
    一套封面制作和x、微信公众号排版工具
url: https://github.com/eternityspring/article-tools
---

# Article Tools

你只需要按照 `draft.md` 的格式规范写作，其他的交给工具。

封面自动读取配置，排版工具自动加载正文，三个工具打开即用，只需要点击鼠标。

**在线预览：** https://eternityspring.github.io/article-tools/

## 工具列表

- **封面生成** (`cover.html`) — 生成公众号封面图，支持多种配色方案、装饰风格、字体，可添加素材图片，支持导出 PNG / 复制图片
- **二维码生成** (`qrcode.html`) — 生成带 Logo 的二维码
- **MD → 微信排版** (`md-to-wechat.html`) — Markdown 转微信公众号富文本格式
- **MD → X 排版** (`md-to-x.html`) — Markdown 转适合 X（Twitter）发布的格式

## 使用方式

直接用浏览器打开对应 HTML 文件即可，无需安装任何依赖。

## 发布到公众号草稿（可选）

`md-to-wechat.html` 右上角有「发布到草稿」按钮，可把排好版的文章一键推送到公众号**草稿箱**（只建草稿、不群发，误点也安全）。它需要一个本地小服务（`server/`）来调用微信接口，其余工具仍然零依赖、纯前端。

**前提条件**

1. 普通订阅号即可（**个人、未认证的号也能用** `draft/add` 草稿接口）——在「设置与开发 → 基本配置」拿到 AppID / AppSecret。
2. 把本机**公网出口 IP** 加进「设置与开发 → 基本配置 → IP 白名单」，否则拿不到 access_token（报错 `40164`）。这一步才是真正必须做的。

**配置与启动**

```bash
cd tools/server
cp .env.example .env      # 填 WECHAT_APPID / WECHAT_APPSECRET / 封面
npm start                 # 需 Node ≥ 18，零依赖
```

启动后**通过本地服务打开工具**（同源请求，避免跨域 / 混合内容）：
`http://127.0.0.1:3007/md-to-wechat.html` → 粘 Markdown → 点「发布到草稿」→ 去公众号后台草稿箱查看。

`.env` 主要配置项：

| 变量 | 必填 | 说明 |
|------|------|------|
| `WECHAT_APPID` / `WECHAT_APPSECRET` | ✅ | 公众号开发者 ID / 密码 |
| `WECHAT_THUMB_MEDIA_ID` 或 `WECHAT_DEFAULT_COVER` | 二选一 | 封面（`draft/add` 必填）：永久素材 media_id，或本地封面图路径（首次自动上传缓存） |
| `WECHAT_AUTHOR` | 可选 | 默认作者名（≤8 字） |
| `PORT` | 可选 | 服务端口，默认 3007 |

服务会自动：换取并缓存 `access_token` → 把正文里的图片逐张上传到微信并替换链接 → 解析封面 → 调 `draft/add` 建草稿。完整说明与错误码对照见 [`server/README.md`](server/README.md)。

## 烁皓 AI 交流群

我是烁皓，一个天天用 AI 做产品、搞钱的独立开发者，建了一个「付费 AI 交流群」。

- 💰 入群早鸟价 **￥29**
- 群每满 10 人涨 10 元：29 → 39 → 49…… 封顶 **129**，越早进越便宜

想进的 👉 加我微信 **hao_dev**（备注「入群」），我拉你进群：

<table>
  <tr>
    <td align="center">
      <strong>微信：hao_dev</strong><br>
      <img src="images/wechat-qr.png" alt="烁皓微信二维码" width="240">
    </td>
  </tr>
</table>

## License

[Apache 2.0](LICENSE)

