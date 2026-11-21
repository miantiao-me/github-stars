---
project: NOIR
stars: 3674
description: |-
    手机隐私审计：用 adb 扫出 Android 应用的权限、上报端点与数据流向，并给出可回滚的处置。Desktop Android leak audit: permissions, endpoints, data flows, reversible fixes.
url: https://github.com/Verlintas/NOIR
---

```
  ███╗   ██╗ ██████╗ ██╗██████╗
  ████╗  ██║██╔═══██╗██║██╔══██╗
  ██╔██╗ ██║██║   ██║██║██████╔╝
  ██║╚██╗██║██║   ██║██║██╔══██╗
  ██║ ╚████║╚██████╔╝██║██║  ██║
  ╚═╝  ╚═══╝ ╚═════╝ ╚═╝╚═╝  ╚═╝
```

# NOIR

[![build](https://github.com/Verlintas/NOIR/actions/workflows/build.yml/badge.svg)](https://github.com/Verlintas/NOIR/actions/workflows/build.yml)
[![release](https://img.shields.io/github/v/release/Verlintas/NOIR)](https://github.com/Verlintas/NOIR/releases)
[![license](https://img.shields.io/github/license/Verlintas/NOIR)](LICENSE)
![platforms](https://img.shields.io/badge/platforms-macOS%20%7C%20Windows%20%7C%20Linux-2ea44f)

[![AtomGit G-Star](https://atomgit.com/Verlintas/NOIR/star/new_badge.svg)](https://atomgit.com/Verlintas/NOIR)<br>
<a href="https://trendshift.io/repositories/330705?utm_source=trendshift-badge&amp;utm_medium=badge&amp;utm_campaign=badge-trendshift-330705" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/trendshift/repositories/330705/weekly?language=Kotlin" alt="Verlintas/NOIR | Trendshift — #1 Kotlin repository of the week" width="250" height="55"></a>
<a href="https://trendshift.io/repositories/330705?utm_source=trendshift-badge&amp;utm_medium=badge&amp;utm_campaign=badge-trendshift-330705" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/trendshift/repositories/330705/daily" alt="Verlintas/NOIR | Trendshift — #9 repository of the day" width="250" height="55"></a>
<a href="https://trendshift.io/repositories/330705?utm_source=trendshift-badge&amp;utm_medium=badge&amp;utm_campaign=badge-trendshift-330705" target="_blank" rel="noopener noreferrer"><img src="https://trendshift.io/api/badge/trendshift/repositories/330705/daily?language=Kotlin" alt="Verlintas/NOIR | Trendshift — #1 Kotlin repository of the day" width="250" height="55"></a><br>
<a href="https://upstar.dev/r/Verlintas/NOIR"><picture><source media="(prefers-color-scheme: dark)" srcset="https://upstar.dev/badge/Verlintas/NOIR/award/privacy-dark.svg"><img alt="Upstar: #1 Riser Of The Week in Privacy, November 2026" src="https://upstar.dev/badge/Verlintas/NOIR/award/privacy.svg" width="250" height="55"></picture></a>
<a href="https://upstar.dev/r/Verlintas/NOIR"><picture><source media="(prefers-color-scheme: dark)" srcset="https://upstar.dev/badge/Verlintas/NOIR/award/android-dark.svg"><img alt="Upstar: #1 Riser Of The Week in Android, November 2026" src="https://upstar.dev/badge/Verlintas/NOIR/award/android.svg" width="250" height="55"></picture></a>
<a href="https://upstar.dev/r/Verlintas/NOIR"><picture><source media="(prefers-color-scheme: dark)" srcset="https://upstar.dev/badge/Verlintas/NOIR/spotted-card-dark.svg"><img alt="Upstar: spotted early at 122 stars" src="https://upstar.dev/badge/Verlintas/NOIR/spotted-card.svg" width="250" height="55"></picture></a>

**把「这台手机到底能泄露什么」变成一份可复现的报告。**

NOIR 是一个跑在电脑上的审计工具，通过 `adb` 读取已连接 Android 设备的应用清单、权限和 APK 里的网络端点，给出分类、风险评分和可执行的处置建议。它也可以在需要时调用 `jadx` 对单个应用做反编译和关键字检索。

> 定位：**审计与自我防护**。面向自己的设备、自己的应用、已授权的安全研究。

**官网 / Website:** https://verlintas.dev/noir/ · [中文](https://verlintas.dev/noir/zh/)

**AtomGit G-Star 项目 / Mirror:** https://atomgit.com/Verlintas/NOIR

---

## 它做什么

1. **盘点**：列出所有「有网络权限 + 敏感权限」的应用，以及它们各自拿到了什么。
2. **抽取端点**：在设备端用 `unzip + strings` 从每个 APK 的 dex 里提取 URL，只回传几 KB，不把整包拉回电脑。
3. **分类与打分**：按包名和域名识别厂商（Xiaomi / Google / 腾讯 / 高德 …）与类别（遥测、广告、定位、输入法 …），结合权限和上报端点计算风险分。
4. **数据关联**：把权限翻译成"能拿到什么数据"（位置/通讯录/短信/通话/麦克风/相机/屏幕/应用列表/设备标识/文件/日历/账号），再和上报域名配对，得出"哪类数据可能流向哪里"。
5. **共享 UID**：识别 `android.uid.system` 这类共享用户，列出哪些包实际上共享同一套权限并集。
6. **清单层**：解析 `AndroidManifest.xml` 二进制 AXML，找出没有权限保护的导出组件、明文流量、备份、debuggable、targetSdk。
7. **给建议**：区分「可安全自动执行」「需人工确认」「不建议动」，并为每条动作生成回滚命令。
8. **必要时深挖**：`deep` 会把一个应用的基础 APK 和 split APK 拉到本地，用 `jadx` 反编译后检索 `Runtime.getRuntime().exec`、`setApplicationEnabledSetting`、`DexClassLoader`、`MediaProjection` 等高风险调用。

## 它不做什么

- 不联网、不上传任何数据、不需要账号。
- 不修改系统分区，不需要 root。
- 默认不会卸载任何东西；只有 `noir deepscan --purge` 会逐个确认卸载高风险用户应用。

---

## 第一次运行

```bash
noir
```

不带参数会进入向导：

1. 检查 `adb`，没有就**问你要不要自动下载**（`~/.noir/tools`）
2. 检查设备，没有就打印**开发者模式 / USB 调试的开通步骤**，然后**等你插线**（最多 180 秒）
3. 问一句「开始扫描?」，扫完直接出仪表盘
4. 问一句「执行安全处置?」，`y` 就执行，并写好回滚文件

全程只会问两三个 y/n，其余都是自动的。

## 环境自检

```bash
noir doctor
```

```
NOIR doctor
  platform  Mac OS X aarch64
  java      17.0.19
  docker    /usr/local/bin/docker
            客户端 29.9.2 · 守护进程 29.9.2 运行中
  adb       /opt/homebrew/.../platform-tools/adb
            Version 37.0.1-15733141
  device    178b0d2f  device  2509FPN0BC
  jadx      /opt/homebrew/bin/jadx
```

```bash
noir setup          # 缺什么下什么
noir setup --yes    # 不询问，适合脚本
noir doctor --json  # 机器可读的环境 / 工具 / 设备状态
```

`doctor --json` 会输出 `platform`、`java`、`container`、`docker`、`adb`、
`jadx`、`devices` 和 `ok`，适合 CI 和 bug report；没有可用设备时退出码仍为 1。

### Docker 安装 / 运行检测

`docker` 一行回答两个问题：Docker 装了没有，守护进程在不在跑。Docker 是可选项
（只有想在容器里运行 NOIR 才需要），所以这一行只报告，不影响 `doctor` 的退出码：

| 情况 | `doctor` 显示 |
|---|---|
| 没装 | `未安装（可选：…）` |
| 装了，守护进程在跑 | `客户端 29.9.2 · 守护进程 29.9.2 运行中` |
| 装了，没启动 | `守护进程未运行`，下一行是启动方法 |
| 装了，当前用户没权限 | `守护进程拒绝访问`，下一行是解决方法 |
| 其他错误（例如 TLS 证书校验失败），或 10 秒内没有应答 | `守护进程状态未知`，下一行是原因：Docker 的原始报错，或超时提示 |

检测只调用本机的 `docker --version` 和 `docker version`，不拉镜像，也不启动容器。

NOIR 自己跑在容器里时（Docker / Podman / Kubernetes / LXC），`doctor` 会多一行
`container docker`。这时找不到设备，提示会换成 USB 透传的做法，而不是让你换数据线。

## 出现问题时

所有错误都会带「怎么办」，而不是抛异常栈：

```
╭─ ERROR ──────────────────────────────────────────────────────────╮
│ 指定的 adb 不存在：/nonexistent/adb                              │
├──────────────────────────────────────────────────────────────────┤
│ 检查路径，或运行 noir setup 自动安装。                           │
╰──────────────────────────────────────────────────────────────────╯
```

没有设备时给出的是可执行步骤：

```
╭─ 没有检测到设备 ──────────────────────────────────────────────╮
│  1. 打开开发者模式                                           │
│     小米 / HyperOS：设置 → 我的设备 → 全部参数 → 连点「MIUI 版本」7 次
│  2. 开启 USB 调试：设置 → 系统 → 开发者选项 → USB 调试        │
│  3. 插线后手机弹「允许 USB 调试吗？」→ 勾选「一律允许」        │
│  4. 还不行就换一根数据线（很多线只能充电）                    │
╰──────────────────────────────────────────────────────────────╯
```

已连接但没授权时，会单独提示「撤销 USB 调试授权后重插」。

## 支持平台

| 系统 | 状态 |
|---|---|
| macOS (Intel / Apple Silicon) | ✅ |
| Windows 10 / 11 | ✅ |
| Debian / Ubuntu | ✅ |

依赖：

- **JDK 17+**
- **Android platform-tools**（`adb`）
- **jadx**（仅 `deep` 命令需要）

程序会自动在常见安装位置查找 `adb` 和 `jadx`；找不到时可以用 `--adb` / `--jadx` 指定。

```bash
# macOS
brew install --cask android-platform-tools jadx

# Debian / Ubuntu
sudo apt install adb
# jadx: https://github.com/skylot/jadx/releases

# Windows (scoop)
scoop install adb jadx
```

---

## 安装

**方式一：下载即用（推荐）**

到 [Releases](https://github.com/Verlintas/NOIR/releases) 下载对应平台的 portable 包：

```
noir-vX.Y.Z-macOS-arm64-portable.zip
noir-vX.Y.Z-macOS-x86_64-portable.zip
noir-vX.Y.Z-Windows-portable.zip
noir-vX.Y.Z-Linux-portable.zip
SHA256SUMS.txt
```

解压后**双击启动器**即可，包内自带运行时，**不需要安装 Java**：

| 系统 | 双击这个 | 如果被拦 |
|---|---|---|
| macOS | `Start NOIR.command` | 右键 → 打开；或 `xattr -dr com.apple.quarantine "Start NOIR.command" NOIR.app` |
| Windows | `Start NOIR.bat` | SmartScreen → 更多信息 → 仍要运行（批处理会切到 UTF-8 并调用包内 JRE） |
| Linux | `Start-NOIR.sh` | 先 `chmod +x Start-NOIR.sh`，或在终端执行 |

启动器会打开一个终端窗口跑完向导，并在结束时停住（不会一闪而过）。

`adb` 和 `jadx` 不在包里——首次运行会询问是否自动下载到 `~/.noir/tools`。

**方式二：从源码构建**

```bash
git clone https://github.com/Verlintas/NOIR
cd NOIR
./gradlew :cli:installDist
./cli/build/install/noir/bin/noir --about
```

**方式三：Docker（Linux 宿主机）**

镜像里带 JRE、adb 和 NOIR 本身，宿主机只需要 Docker。在仓库根目录构建
（首次会下载 Gradle 和依赖，需要几分钟）：

```bash
docker build -t noir .
```

```bash
docker run --rm -it \
  --device-cgroup-rule='c 189:* rmw' -v /dev/bus/usb:/dev/bus/usb \
  -v noir-home:/root -v "$PWD:/work" \
  noir
```

| 参数 | 作用 |
|---|---|
| `--device-cgroup-rule='c 189:* rmw'`<br>`-v /dev/bus/usb:/dev/bus/usb` | 把 USB 设备透传进容器，重新插拔也有效 |
| `-v noir-home:/root` | 保存 adb 授权密钥和扫描缓存；不加的话，每次运行手机都要重新点「允许」 |
| `-v "$PWD:/work"` | 报告写到当前目录的 `noir-out/` |

- 宿主机上如果也装了 adb，先执行 `adb kill-server`，否则它会占住手机。
- 命令末尾可以接任何子命令，例如 `… noir doctor`、`… noir ui`。
- `deep` / `deepscan` 需要的 jadx 不在镜像里：执行一次 `… noir setup --yes`，它会下载到 `noir-home`。
- 在容器里找不到设备时，NOIR 会直接提示上面的透传参数。

> **权限说明**：容器内的 NOIR 和 adb 以 root 运行，这样才能打开透传进来的 USB 设备节点。
> 上面两个 USB 参数给出的是宿主机上**全部** USB 设备的访问权，不只是手机，所以只运行你自己构建的镜像。
> 副作用是 `noir-out/` 里的文件属主也是 root。

macOS / Windows 的 Docker Desktop 不能把 USB 设备透传进容器，这两个系统请用方式一的便携包。

不要改成让容器去连宿主机的 adb server：它默认只监听 `127.0.0.1:5037`，容器通常连不上；
而用 `adb -a` 让它监听所有网卡，会把一个没有认证的端口暴露给整个局域网，任何人都能借它控制手机。

**方式四：Scoop（Windows）**

```powershell
scoop bucket add verlintas https://github.com/Verlintas/scoop-bucket
scoop install noir
```

`noir` 会从官方 GitHub Release 安装，升级用 `scoop update noir`。adb 和 jadx 仍需单独安装：

```powershell
scoop install adb jadx
```

## 构建

```bash
git clone <repo> && cd NOIR
./gradlew :cli:installDist
```

产物：

```
cli/build/install/noir/bin/noir        # macOS / Linux
cli/build/install/noir/bin/noir.bat    # Windows
```

也可以直接：

```bash
./gradlew :cli:run --args="devices"
```

---

## 界面

![NOIR dashboard on a Xiaomi 17 Pro Max](docs/screenshot.png)

真机输出（macOS Terminal）：渐变 logo、CJK 对齐的表格、按风险着色的分数、
每处理完一个 APK 就刷新一次的进度条。

`noir ui` 会把结果渲染成一块等宽仪表盘；颜色和边框都会按终端能力自动降级：

- `--ascii`：纯 ASCII 边框，给旧版 Windows 控制台
- `--no-color` / `--color`：关闭或强制 ANSI 颜色（默认按是否为 TTY 自动判断）
- `--quiet`：只留仪表盘，不打印扫描过程
- `--no-clear`：不清屏（方便把输出重定向到文件）
- `--lang <auto|zh|en>`：界面语言。默认按手机系统语言切换；没有设备时按电脑系统语言；`NOIR_LANG` 环境变量也可以指定

## 用法

```bash
noir --about              # 它是什么、会写什么、许可
noir --version
noir devices              # 列出设备；加 --json 输出机器可读结果
noir scan                 # 全量扫描，输出 JSON / Markdown / HTML / CSV / 域名清单
noir apk app.apk          # 不连手机，直接审计 APK 文件
noir report noir-out      # 从已有 report.json 重新生成 MD / HTML / CSV
noir explain com.example.app  # 从报告解释某个应用为什么被标记
noir diff old/report.json new/report.json   # 对比两次扫描
noir ui                   # 扫描并渲染仪表盘
noir auto                 # 扫描 + 分类 + 生成处置计划（dry-run）
noir auto --apply         # 执行安全的 appops 动作（可回滚）
noir deepscan --apply --purge    # 额外卸载高风险用户应用（逐个确认）
noir deep com.example.app # 拉包 + jadx + 关键字检索
noir block com.example.app        # 打印处置命令
noir block com.example.app --apply
```

常用参数：

| 参数 | 说明 |
|---|---|
| `--lang <auto\|zh\|en>` | 界面语言（默认跟随设备语言） |
| `--serial <id>` | 指定设备 |
| `--out <dir>` | 输出目录（默认 `noir-out`） |
| `--min <score>` | 只保留分数 ≥ N 的应用 |
| `--limit <n>` | 最多输出 N 条 |
| `--only <regex>` | 只扫描匹配的包名，例如 `--only 'com\.miui\.'` |
| `--ignore <file>` | 忽略文件中的包名和上报域名 |
| `--user-only` | 只保留用户安装的应用，跳过系统应用 |
| `--format <md,html,csv>` | `report` 命令的输出格式 |
| `--adb <path>` / `--jadx <path>` | 手动指定工具路径 |
| `--yes` | 自动化场景下跳过确认 |

### 离线 APK 审计

没有手机，或者想在安装前先看一个 APK：

```bash
noir apk app.apk --out apk-report
noir apk ./downloads --out apk-report
noir apk ./downloads --out apk-report --ignore noir.ignore
```

- 读取 `AndroidManifest.xml` 的包名、版本、权限、exported 组件、debuggable、targetSdk
- 直接从 `classes*.dex` 提取端点，不运行应用
- split APK 按包名合并
- 生成同样的 `report.json` / `.md` / `.html` / `.csv` 和域名清单
- 不执行任何 appops 或卸载；只做静态审计

离线模式没有设备的 `uid`、系统应用标记和运行时权限状态，结果会比真机扫描保守。

### 忽略已知项

对已经确认安全和已知上报域名，可以写一个忽略文件，减少重复噪音：

```text
# noir.ignore
# 包名也可以不加 package 前缀
com.example.known
package com.example.old

# 匹配该域名及其子域
host example.com
```

```bash
noir scan --ignore noir.ignore
```

被忽略的包不会扫描；命中的上报端点会在评分和报告生成前移除。
输出目录会保存一份规范化后的 `ignore.txt`，方便复现这次报告使用的过滤规则。
`auto`、`ui`、`deepscan` 同样支持 `--ignore`。

### 重新生成报告

`noir report` 直接读取已有的 `report.json`，不需要手机或重新扫描：

```bash
noir report noir-out
noir report noir-out --format md,html,csv
noir report old/report.json --out shared-report --format html
```

默认重写输入目录里的 `report.md` / `report.html` / `report.csv`。适合升级 NOIR 后重新渲染，或把 JSON 分享给别人后再生成 HTML。

### 解释单个应用

```bash
noir explain                       # 默认前 10 个被标记应用
noir explain --top 20              # 前 20 个
noir explain --all                 # 全部被标记应用
noir explain com.a com.b           # 指定多个包
noir explain com.example.app --json
```

会从已有 `report.json` 展示应用的分数、类别、厂商、可读数据、上报路径、权限、端点和建议动作。
单个应用显示完整证据；批量模式默认显示精简摘要，加 `--full` 可展开完整内容。适合扫描后追问“它们为什么被标红”。

## 对比两次扫描

`noir diff` 读取两份 `report.json`，比较应用、分数、权限和端点：

```bash
noir diff noir-out-before noir-out-after
noir diff old/report.json new/report.json --json
noir diff old/report.json new/report.json --fail-on-regression
```

输出会分成 `added` / `removed` / `changed`，并标出新增权限和新增端点。
`--fail-on-regression` 会在出现新应用、分数上升、新增权限或新增端点时返回退出码 1，
适合放进 CI 或定期审计脚本。

## DeepScan：一条命令反编译 + 处置

```bash
noir deepscan                  # 反编译风险最高的 15 个应用
noir deepscan --top 30         # 更多
noir deepscan --all            # 全部被标记应用（慢，占磁盘）
noir deepscan --jobs 4         # 并行 jadx 数量
```

流程是：扫描 → 按风险排序 → 逐个 `adb pull` + `jadx` → 统计代码级信号
（`Runtime.getRuntime().exec`、`DexClassLoader`、`setApplicationEnabledSetting`、
`enabled_accessibility_services`、`MediaProjection`、`SystemProperties.set`、
短信/设备标识、WebView 桥、无障碍/通知监听/设备管理员 …）→ 解析清单
（导出组件、明文流量、备份、debuggable）→ 识别 SDK（Umeng/Firebase/AppsFlyer…）
→ 输出 `deepscan.md` / `deepscan.tsv` → 询问是否清理。

```bash
noir deepscan --apply          # 分析后执行安全 appops
noir deepscan --apply --purge  # 再逐个确认卸载高风险用户应用
```

反编译结果按 `包名 + APK 路径` 缓存，第二次跑同一个应用会直接复用。

## 输出

```
noir-out/
├── report.json               # 结构化结果（应用、权限、端点、建议）
├── report.md                 # 人类可读报告
├── report.html               # 离线单文件报告，可直接用浏览器打开
├── report.csv                # 表格导出（每行一个应用，适合 Excel）
├── ignore.txt                # 本次使用的忽略规则（使用 --ignore 时生成）
├── domains-trackers.txt      # 统计/广告/崩溃上报，可整份导入
├── domains-other.txt         # 用途不明，导入前逐条判断
├── domains-functional.txt    # 推送/登录/更新/支付/商店/云同步，禁止拦截
├── domains.txt               # 等于 trackers（兼容旧脚本）
├── plan.txt                  # 本次可执行的 appops
├── applied.txt               # 实际执行的命令、退出码、完整 stdout/stderr
└── rollback.txt              # 回滚命令（成功后写入修改前的 AppOps 模式）
```

## 隐私

- 工具本身**不联网**：没有遥测、没有版本检查、没有崩溃上报
- 扫描结果只写在你指定的 `--out` 目录
- 唯一的外部请求发生在 `noir setup`（下载 adb/jadx）和 `noir deep`（jadx 是本地进程）
- 报告里可能包含你设备上的包名和端点，分享前自行检查

## 缓存

扫描结果按 `设备/构建指纹 + 包名 + APK 路径` 缓存在 `~/.noir/endpoints-v3.tsv`。应用更新后路径变化会自动重新分析，失败/半截扫描不会写入缓存。

---

## 架构

```
adb ──▶ pm / dumpsys ──▶ Dumpsys parser ──┐
                                          ├─▶ cache (pkg + apk path)
adb ──▶ unzip/strings ──▶ endpoints ──────┘        │
                                                   ▼
                                          Classifier ─▶ score ─▶ Advisor
                                                   │              │
                                                   ▼              ▼
                                              report.json    plan.txt
                                              report.md      rollback.txt
                                                   │
                                                   ▼
                                                 Tui / CLI
```

`deep` 走另一条支线：`adb pull` → `jadx` → 源码 grep。

## 设计取舍

- **端点抽取在设备端完成**：`adb shell` 内跑 `unzip | strings | grep`，避免把几百个 APK 拉回电脑。设备缺少 `unzip`/`strings` 时自动退化为本地解析。
- **共享 UID 特殊处理**：Android 上 `android.uid.system` 下的应用（常见 50+ 个）权限记录在 `dumpsys package` 尾部的 `Shared users` 段。解析器会把这些权限合并回每个包，否则最该被看见的应用反而会消失。
- **建议分级**：只有 appops 级别的动作标记为可自动执行；卸载必须显式开启。
- **无遥测**：程序不包含任何上报逻辑。

## 常见问题

**需要 root 吗？**
不需要。全部通过 `adb` 的 shell 权限完成；卸载只是 `--user 0` 级别，APK 仍在系统分区。

**会改坏手机吗？**
默认完全只读。`--apply` 只改 app-ops；执行前会查询原模式，成功执行的动作会写入
`rollback.txt`，按记录恢复。完整 stdout/stderr 和退出码写入 `applied.txt`。
`noir block` 的卸载也会先打印 `pm install-existing` 的恢复命令。

**为什么有些应用只给"人工复核"？**
系统应用不能真正卸载（`--user 0` 卸载也会被 OTA 或恢复出厂装回来），所以只建议
app-ops 或 DNS 层拦截。

**DNS 拦截为什么只导出不执行？**
跨平台改 DNS 很容易把设备网断掉（我们在开发中踩过），所以只导出清单：

- `domains-trackers.txt` —— 统计/广告/崩溃上报，可以整份导入
- `domains-other.txt` —— 用途不明，导入前逐条判断
- `domains-functional.txt` —— 推送、登录、更新、支付、应用商店、云同步，**拦了会掉功能**
- `domains.txt` —— 现在只包含 trackers，兼容旧脚本

IP、`localhost` 和带 `test`/`staging` 的域名会被自动剔除。

**支持 iOS 吗？**
不支持。`core` 是按 Kotlin Multiplatform 组织的，但审计逻辑依赖 Android 的
`dumpsys` 和 APK 格式。

## 参与

- [CONTRIBUTING.md](CONTRIBUTING.md) — 构建、测试、规则放在哪
- [SECURITY.md](SECURITY.md) — 漏洞报告方式（请不要开公开 issue）
- [Issues](https://github.com/Verlintas/NOIR/issues) — bug 请附上 `noir doctor` 输出

## 路线图

- [x] 等宽仪表盘（`noir ui`）
- [x] DeepScan（批量反编译 + 代码级信号）
- [x] 自带运行时的双击即用包（jpackage）
- [ ] 图形界面（Compose Multiplatform）
- [ ] 规则文件可配置（YAML），支持社区规则包
- [ ] 与 `apktool` / `jadx` 的批量流水线
- [ ] 设备端 DNS/VPN 拦截方案导出
- [x] 扫描结果版本对比（`noir diff`）
- [ ] 扫描结果签名

## 免责声明

NOIR 只应用于**你自己的设备**，或你获得明确授权的设备。它给出的是静态证据
（"这个应用具备这个能力，并且代码里有这个端点"），**不能证明**某次具体传输发生过。
请结合网络层证据自行判断。

## 许可

MIT © 2026 Verlintas

