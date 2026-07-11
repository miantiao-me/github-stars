---
project: One-Handed-Keyboard
stars: 1327
description: |-
    null
url: https://github.com/htx-studio/One-Handed-Keyboard
---

# **One-Handed Keyboard**

> 我们收到了一封特殊的邮件。来信者的女儿在上学途中不幸遭到重型卡车碾压，右手永久失去了功能，用电脑的时候手得在键盘和鼠标之间频繁切换，打字很慢，很累。他想让我们帮他女儿做一个单手键盘。

![左手小键盘](/Docs/Image/左手小键盘右侧面.jpg "左手小键盘")

![左手大键盘](/Docs/Image/左手大键盘右侧.jpg "左手大键盘")

这是一把单模且集成了轨迹球的机械键盘，固件使用[QMK](https://github.com/qmk/qmk_firmware)，感谢所有为 QMK 社区做出贡献的开发者。

键盘制作参考：[【何同学】我们做了个特别的键盘…](https://www.bilibili.com/video/BV1DtjAzUEb9)

硬件开源：[HTXStudio单手键盘](https://oshwhub.com/htx-studio/One-Handed_Keyboard)

[GitHub repository](https://github.com/htx-studio/One-Handed-Keyboard)

[Gitee repository](https://gitee.com/htxstudio/one-handed-keyboard)

开发环境与搭建参考[这里](https://docs.qmk.fm/newbs_getting_started "设置您的QMK环境")，固件源码在[这里](https://github.com/htx-studio/qmk_firmware/tree/master/keyboards/htx_studio)。

本仓库的资料内容包括：

* 左右手一共三款键盘的8块PCB，提供立创EDA工程。
* VIA改键配置文件，以及编译完成的固件。
* 模型设计文件。

---

## 仓库目录结构

#### Docs（文档）

芯片的数据手册与图片。

#### Firmware（固件）

三款不同型号键盘的QMK固件，以及用于VIA改键的JSON文件。

#### Hardware（硬件）

嘉立创EDA的项目文件。

#### Model（模型）

每个型号键盘使用到的模型文件，加工文件。

---

## 制作指南

### PCB：

1-右手键盘-热插拔(大)：板材FR-4，板厚1.6mm，四层板，层压结构JLC04161H-3313，阻抗管控+/-20%。

1-左手键盘-焊板(小)：板材FR-4，板厚1.6mm，双层板，ALPS黄轴插入时需稍用力安装到位。

1-左手键盘-热插拔(大)：板材FR-4，板厚1.6mm，四层板，层压结构JLC04161H-3313，阻抗管控+/-20%。

2-TypeC：板材FR-4，板厚1.6mm，双层板，标识CON1（仅适用于大键盘）。

3-轨迹球：板材FR-4，板厚1.6mm，双层板，模块需注意焊接方向，标识CON3。

4-鼠标滚轮：板材FR-4，板厚1.6mm，双层板，建议使用7mm高编码器，6mm高按键，按键触发压力≤180g，标识CON2。

5-方向按键：板材FR-4，板厚1.6mm，双层板，ALPS黄轴插入时需稍用力安装到位，标识CON4。

6-主控板-左手(小)：板材FR-4，板厚1.6mm，双层板。

> * 其中3款为键盘控制公用小板 `《3-轨迹球》《4-鼠标滚轮》《5-方向按键》`。
> * `《5-方向按键》`和 `《1-左手键盘-焊板(小)》`，按键轴使用ALPS黄轴。
> * 注意左右手大键盘并非完全镜像。
> * 轨迹球控制使用SPI1通道，滚轮有单独两条信号线，这可以使得替换其它控制设备而不需要较大的调整。
> * 主控使用 STM32G431CBU6。
> * 兼容A to C 或 C to C 数据线。

### 打印件：

键帽：树脂、PLA等。

轨迹球座：树脂、PLA等。

鼠标左右键：树脂、PLA等。

外壳：树脂、PLA等。

底座：树脂、PLA等。

### 加工：

定位板：推荐材料pom，厚1.5mm。

定位板棉条：单面留胶。

夹心棉：推荐材料poron，厚3.5mm。

轴座棉：厚2mm。

底棉：推荐材料poron，厚4mm。

硅胶垫（仅小键盘使用）：厚5mm，硬度Shore 00-10。

### 五金：

|                    | 大键盘用量（颗） | 小键盘用量（颗） |
| :----------------- | :--------------: | :--------------: |
| M3×3×4热熔铜螺母 |        8        |        8        |
| M2×2×3热熔铜螺母 |        2        |        -        |
| M2×3×3热熔铜螺母 |        17        |        12        |
| M3×6沉头螺丝      |        2        |        6        |
| M3×15沉头螺丝     |        -        |        4        |
| M3×22沉头螺丝     |        6        |        -        |
| M2×8杯头螺丝      |        4        |        4        |
| M2×3杯头螺丝      |        2        |        -        |
| M2×5杯头螺丝      |        13        |        8        |
| M3×16扁头螺丝     |        -        |        2        |

### 其它：

轨迹球：直径25mm，材质PTFE。

润滑球：直径2mm，材质PTFE，安装于打印件轨迹球座中，数量6颗。

滚轮：推荐直径19mm-20mm之间，厚4mm-5mm之间，材质金属。

卫星轴：2U钢板卫星轴。

按键轴：小键盘57颗超小ALPS黄轴，大键盘57颗常见机械轴。

排线：间距0.5mm，8P反向，10cm2条，15cm2条。

> * 控制板和小板的FPC座均有CON标识，对应接口相接。
> * 文件内使用可上下接FPC排线座，需要注意排线座均下接的情况下，使用反向排线连接。

### 模型结构：

![左手小键盘爆炸](/Docs/Image/左手小键盘爆炸图.jpg "左手小键盘爆炸图")

![左手大键盘爆炸](/Docs/Image/左手大键盘爆炸图.jpg "左手大键盘爆炸图")

### 安装顺序：

> 以大键盘为例

**装配前的前置工作**

* 先将4块小PCB使用排线连接至键盘本体PCB，烧录程序。
* 安装3-5个轴体，滚轮和轨迹球。装配前确保功能是正常的。
* 在打印的外壳与底座对应位置，安装正确的热熔铜螺母。
* 键帽印字。
* 将棉条贴在定位板突出部分（正反面都有）。

> 第一次烧录固件时，可以按住PCB背面标有 "B" 的按钮，再插入USB线进行固件烧录。
>
> 若更新固件可以按住键盘上的 "ESC" 键，再插入USB线进行固件烧录。
>
> 更多可以参考 [Flashing Your Keyboard (QMK)](https://docs.qmk.fm/newbs_flashing)

**接下来开始装配**

1. 将4块小板使用螺丝安装到底座对应位置（注意排线和安装方向），轨迹球座在下方安装螺丝。
2. 将左右键使用螺丝固定在键盘PCB上。
3. 从下到上以底棉、轴座棉、键盘PCB、夹心棉、定位板顺序放入底座扇形区域。
4. 插入按键轴体。
5. 放入外壳，在下方使用螺丝固定。
6. 安装键帽，完成装配。

> 螺丝螺母安装指南可以参考[这里](https://github.com/htx-studio/One-Handed-Keyboard/tree/main/Model)

最后，这是我们第一次开源项目，如果有什么不足欢迎大家批评指正，感谢大家。

---

## 引用

[Quantum Mechanical Keyboard Firmware](https://docs.qmk.fm/)

mrjohnk. ADNS-9800. [GitHub repository](https://github.com/mrjohnk/ADNS-9800/)

