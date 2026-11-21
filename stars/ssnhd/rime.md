---
project: rime
stars: 3530
description: |-
    Rime Squirrel 鼠须管配置文件（朙月拼音、小鹤双拼、自然码双拼）
url: https://github.com/ssnhd/rime
---

## Rime 鼠须管（Squirrel）朙月拼音、小鹤双拼、自然码双拼配置详解

- 欢迎加入 [Rime 鼠须管电报群](https://t.me/rimeim)（进群需私聊群内管理员，否则无法加入）

### 特点

* 朙月拼音（默认）、小鹤双拼、自然码双拼
* 词库不丢失，支持多平台同步
* 百万[搜狗](https://pinyin.sogou.com/dict/cate/index/167)词库
* Emoji
* 动态输入时间、日期、星期
* 速度快、开源、保护隐私、自定义强


### [出售英国、美国、新西兰实体 SIM 卡、GV、Gmail、Apple ID、礼品卡](https://github.com/ssnhd/sim)

[![](https://i.imgur.com/vFuRggb.jpg)](https://github.com/ssnhd/sim)


## 安装

下载 <a href="https://rime.im/" target="_blank">鼠须管</a>，安装后切换到 Rime 输入法，开始使用。\
默认繁体输出，通过组合键 `Control+｀` 或 `F4` 键切换输入方案，例如选择【朙月拼音·简化字】简体输出。

> 注：建议 Mac 打开 Squirrel 通知，之后部署会提示是否成功。

## 备份初始配置（可选）

防止操作不当配置无法恢复，可以为初始配置做个备份。在【终端】中输入以下命令，按回车键，会出现一个【Rime.bak】文件夹即备份。

```
cp -r ~/Library/Rime ~/Library/Rime.bak
```

![](https://i.imgur.com/1EFPjAK.png)

> 还原：初始配置【Rime】文件夹清空，将【Rime.bak】内的文件复制粘贴过去，点击菜单栏【ㄓ】-【重新部署】。

## 定制

1. 下载 [配置](https://github.com/ssnhd/rime/archive/refs/heads/master.zip) 解压得到【配置文件】和【花园明朝字体】，将字体安装到字体册，原因是 Mac 缺少部分生僻字。
2. 点击菜单栏【ㄓ】-【用户设定】，将【配置文件】里所有文件粘贴进去，并选择覆盖。
3. 点击菜单栏【ㄓ】-【重新部署】（快捷键 `Control+Option+｀`），至此完成定制配置，可以愉快的使用了。

![](https://i.imgur.com/3B0Aucj.png)

## 全局设置

全局设置文件 `default.custom.yaml`，包含输入方案、候选词个数、中英文切换、快捷键。

> 注：建议用 VSCode 软件打开文件，因分隔符问题还需要 <a href="https://ssnhd.com/2021/10/01/VSCode" target="_blank">修改 Tab 键</a>。

#### 输入方案

按 `Control+｀` 显示输入方案。如果你不用双拼或大写数字，可以将其连同配置里的文件一并删除；同理，你也可以添加其他方案，例如：[五笔、地球拼音、袖珍拼音](https://github.com/rime/plum#essentials)。

> 注：输入方案都是以 `.schema.yaml` 命名，例如 `luna_pinyin_simp.schema.yaml`，可以修改该文件进行定制，但是输入法一旦更新，这个文件也会跟着更新，定制就会丢失。\
> 解决办法是新建文件 `luna_pinyin_simp.custom.yaml`，然后在里面定制，所有方案对应的补丁名都是 `<方案名>.custom.yaml`。

```
schema_list:
  - schema: luna_pinyin_simp      # 朙月拼音
  - schema: double_pinyin_flypy   # 小鹤双拼
  - schema: double_pinyin         # 自然码双拼
  - schema: numbers               # 大写数字
```

#### 候选词个数

修改后面的数字更改候选词个数。

```
menu/page_size: 9
```

#### 中英文切换

下面代码表示使用 `Caps` 键切换大小写，使用 `Shift` 键切换中英文。

```
ascii_composer/good_old_caps_lock: true # 若为 true， Caps 只切换大小写
ascii_composer/switch_key:
  Caps_Lock: commit_code                # Caps 键
  Shift_L: commit_code                  # 左 Shift，切换中英文
  Shift_R: commit_code                  # 右 Shift，切换中英文
  Control_L: noop                       # 左 Control，屏蔽该切换键
  Control_R: noop                       # 右 Control，屏蔽该切换键
```

> 注：如果 Caps 键不能切换大小写，打开 Mac 系统偏好设置 > 键盘 > 输入法 > 取消【使用大写锁定键切换“美国”输入模式】。

其他切换策略：

- **inline_ascii**：在输入法的临时英文编辑区内输入字母、数字、符号、空格等，回车上屏后自动复位到中文
- **commit_text**：已输入的候选文字上屏并切换至英文输入模式

#### 翻页快捷键

- **when**：有几种状态 `composing`、`has_menu`、`paging`
- **accept**：控制接受的按键 `minus`、`equal`,、`period`、`comma`、`bracketleft`、`bracketright`
- **send**：控制动作 `Page_Up`、`Page_Down`、`Escape`(清空输入码)

```
# 翻页
- { when: has_menu, accept: Tab, send: Page_Down }            # "tab" 键翻页, 和下一条 "tab" 键分词只能二选一
- { when: composing, accept: Shift+Tab, send: Shift+Left }    # "Shift+Tab" 键向左选拼音分词
- { when: paging, accept: minus, send: Page_Up }              # "-" 上一页
- { when: has_menu, accept: equal, send: Page_Down }          # "=" 下一页
- { when: paging, accept: comma, send: Page_Up }              # "," 上一页
- { when: has_menu, accept: period, send: Page_Down }         # "." 下一页
- { when: paging, accept: bracketleft, send: Page_Up }        # "[" 上一页
- { when: has_menu, accept: bracketright, send: Page_Down }   # "]" 下一页

# 快捷键
- { when: has_menu, accept: semicolon, send: 2 }              # ":" (分号)选择第 2 个候选词
- { when: has_menu, accept: apostrophe, send: 3 }             # "'" (引号)选择第 3 个候选词
- { when: composing, accept: Shift+Tab, send: Shift+Left }    # "Shift+Tab" 键向左选拼音分词
- { when: composing, accept: Control+a, send: Home }          # "Control+a" 光标移至首
- { when: composing, accept: Control+e, send: End }           # "Control+e" 光标移至尾
- { when: composing, accept: Control+g, send: Escape }        # "Control+g" 清码
- { when: composing, accept: Return, send: Escape }           # "Return" 回车清码
- { when: always, accept: Control+Shift+1, select: .next }             # 切换输入方案
- { when: always, accept: Control+Shift+2, toggle: ascii_mode }        # 中/英文切换
- { when: always, accept: Control+Shift+3, toggle: full_shape }        # 全角/半角切换
- { when: always, accept: Control+Shift+4, toggle: simplification }    # 繁简体切换
- { when: always, accept: Control+Shift+5, toggle: extended_charset }  # 通用/增广切换（显示生僻字）
- { when: composing, accept: Control+b, send: Left }           # "Control+b" 移动光标
- { when: composing, accept: Control+f, send: Right }          # "Control+f" 向右选择候选词
- { when: composing, accept: Control+h, send: BackSpace }      # "Control+h" 删除输入码
```

## 词库格式

新建文件命名格式为 `<词库名>.dict.yaml`。

示例：朙月拼音 AV 女优词库 `luna_pinyin.av.dict.yaml`。

```
# 日本 AV 女优

name: luna_pinyin.av  # 要和文件名一致
version: "2021.12.21"
sort: by_weight
use_preset_vocabulary: false
...
                              # 此处空一行
三上悠亞  san shang you ya  1  # 汉字和编码用 Tab 键间隔，拼音之间用空格键
```

## 词库外挂

打开 `luna_pinyin.extended.dict.yaml`，将词库名添加。

示例：AV 女优词库 `luna_pinyin.av.dict.yaml` 即输入 `luna_pinyin.av`。

```
import_tables:
  - luna_pinyin
  - luna_pinyin.av
  - luna_pinyin.chat
  - luna_pinyin.sogou
```

## 词库载入

打开 `luna_pinyin_simp.custom.yaml`，载入中英文词库，还可以修改英文候选词位置、Emoji 显示注释等。

```
patch:
  # 启用罕见字過濾
  engine/filters:
    - simplifier
    - simplifier@emoji_conversion
    - uniquifier
    - charset_filter@gbk # (※3) GBK 过滤
    - single_char_filter

  emoji_conversion:
    opencc_config: emoji.json
    option_name: show_emoji
    tags: abc
    #tips: all    # Emoji 显示注释

  # 改写拼写运算，含英文的词汇（luna_pinyin.cn_en.dict.yaml）不影响简拼
  "speller/algebra/@before 0": xform/^([b-df-hj-np-tv-z])$/$1_/

  # 载入朙月拼音扩充词库
  "translator/dictionary": luna_pinyin.extended

  # 加载easy_en依赖
  "schema/dependencies/@1": easy_en
  # 载入翻译英文的码表翻译器，取名为 english
  "engine/translators/@4": table_translator@english
  # english翻译器的设定项
  english:
    dictionary: easy_en
    spelling_hints: 9
    enable_completion: false # 是否启用英文输入联想补全
    enable_sentence: false # 混输时不出现带有图案的英文
    initial_quality: -0.5 # 英文候选词的位置, 数值越大越靠前。
```

## 模式转换

打开 `luna_pinyin_simp.custom.yaml`，switches 列了：中文西文、全角半角、Emoji、简繁体、字节编码。

```
patch:
  switches:
    - name: ascii_mode                   # 0 中文，1 英文
      reset: 0
      states: ["中文", "西文"]
    - name: full_shape                   # 全角/半角符号开关
      states: ["半角", "全角"]
    - name: show_emoji                   # Emoji 开关
      reset: 1
      states: [ "🈚️️\uFE0E", "🈶️️\uFE0F" ]
    - name: zh_simp                      # (※1) 繁简转换
      reset: 1
      states: ["漢字", "汉字"]
    - options: ["utf8", "gbk", "gb2312"] # (※2)字符集选单
      reset: 0                           # 默认 UTF8
      states:
        - UTF-8
        - GBK
        - GB2312
```

## 搜狗词库转换

转换方法：[点击这里](https://ssnhd.com/2022/01/06/sogou-dict/)。本配置里的搜狗词库包含官网 12 个分类（城市、工程、农业、人文、社会、生活、艺术、医学、游戏、娱乐、运动、自然），满足绝大部份用户使用。

## Emoji

打开 opencc 文件夹内 `emoji_word.txt`，规则：字符用 Tab 键间隔，其他用空格键，简体和繁体都要加入。

![](/img/rime/emojikaixin.png)

```
开心  开心 😄 😃 😺
開心  開心 😄 😃 😺
```

按 `Control + ｀` 组合键，可以选择开启或关闭 Emoji。

![](/img/rime/emojioff.png)

## 快捷符号

以朙月拼音为例，打开 `luna_pinyin_simp.custom.yaml`，自行添加修改。

> 注：打开【用户设定】-【build 文件夹】- `luna_pinyin_simp.schema.yaml` 里有超多快捷符号，将需要修改的快捷符号添加到下面区域。

![](/img/rime/emojikuaijie.png)

```
"/fs": [½, ‰, ¼, ⅓, ⅔, ¾, ⅒ ]
"/xh": [ ＊, ×, ✱, ★, ☆, ✩, ✧, ❋, ❊, ❉, ❈, ❅, ✿, ✲]
"/dq": [🌍,🌎,🌏,🌐,🌑,🌒,🌓,🌔,🌕,🌖,🌗,🌘]
"/sg": [🍇,🍉,🍌,🍍,🍎,🍏,🍑,🍒,🍓,🍗,🍦,🎂,🍺,🍻]
"/dw": [🙈,🐵,🐈,🐷,🐨,🐼,🐾,🐔,🐬,🐠,🦋]
"/bq": [😀,😁,😂,😃,😄,😅,😆,😉,😊,😋,😎,😍,😘,😗]
"/ss": [💪,👈,👉,👆,👇,✋,👌,👍,👎,✊,👊,👋,👏,👐]
"#": "#"
"*": "*"
"`": "`"
"~": "~"
"@": "@"
"=": "="
'\': "、"
"%": "%"
"$": ["¥", "$"]
"|": ["|", "｜", "·"]
"/": ["/", "÷"]
"'": { pair: ["「", "」"] }  #表示一对
"[": "【"
"]": "】"
"<": "《"
">": "》"
```

## 模糊音纠错

打开 `luna_pinyin_simp.custom.yaml`，若关闭前面加 `#`。

```
# 需要哪組就刪去行首的 # 號，單雙向任選
- derive/^([zcs])h/$1/             # zh, ch, sh => z, c, s
- derive/^([zcs])([^h])/$1h$2/     # z, c, s => zh, ch, sh
- derive/^n/l/                     # n => l
- derive/^l/n/                     # l => n

# 這兩組一般是單向的
- derive/^r/l/                     # r => l
- derive/^ren/yin/                 # ren => yin, reng => ying
- derive/^r/y/                     # r => y

# 下面 hu <=> f 這組寫法複雜一些，分情況討論
- derive/^hu$/fu/                  # hu => fu
- derive/^hong$/feng/              # hong => feng
- derive/^hu([in])$/fe$1/          # hui => fei, hun => fen
- derive/^hu([ao])/f$1/            # hua => fa, ...
- derive/^fu$/hu/                  # fu => hu
- derive/^feng$/hong/              # feng => hong
- derive/^fe([in])$/hu$1/          # fei => hui, fen => hun
- derive/^f([ao])/hu$1/            # fa => hua, ...

# 韻母部份
- derive/^([bpmf])eng$/$1ong/      # meng = mong, ...
- derive/([ei])n$/$1ng/            # en => eng, in => ing
- derive/([ei])ng$/$1n/            # eng => en, ing => in

# 超级简拼
- abbrev/^([a-z]).+$/$1/           # 簡拼（首字母）
- abbrev/^([zcs]h).+$/$1/          # 簡拼（zh, ch, sh）

# 智能纠错
- derive/([aeiou])ng$/$1gn/        # dagn => dang
- derive/([dtngkhrzcs])o(u|ng)$/$1o/  # zho => zhong|zhou
- derive/ong$/on/                  # zhonguo => zhong guo
- derive/ao$/oa/                   # hoa => hao
- derive/([iu])a(o|ng?)$/a$1$2/    # tain => tian
```

## 动态时间日期

打开 `Rime.lua`，默认编码如下，双拼用户时间和星期无效，建议改为不冲突编码，例如时间 `sj` 改为 `time`。

- 【日期】`rq` = `2022-01-14`、`2022年01月14日`、`01-14`、`2022/01/14`
- 【时间】`sj` = `03:11`、`03:11:00`
- 【星期】`xq` = `周五`、`星期五`、`礼拜五`

```
function date_translator(input, seg)
    if (input == "rq") then
       Candidate(type, start, end, text, comment)
        yield(Candidate("date", seg.start, seg._end, os.date("%Y-%m-%d"), ""))
        yield(Candidate("date", seg.start, seg._end, os.date("%Y年%m月%d日"), ""))
        yield(Candidate("date", seg.start, seg._end, os.date("%m-%d"), ""))
        yield(Candidate("date", seg.start, seg._end, os.date("%Y/%m/%d"), ""))
    end
    if (input == "sj") then
       Candidate(type, start, end, text, comment)
        yield(Candidate("time", seg.start, seg._end, os.date("%H:%M"), ""))
        yield(Candidate("time", seg.start, seg._end, os.date("%H:%M:%S"), ""))
    end
    if (input == "xq") then
        local weakTab = {'日', '一', '二', '三', '四', '五', '六'}
        yield(Candidate("week", seg.start, seg._end, "周"..weakTab[tonumber(os.date("%w")+1)], ""))
        yield(Candidate("week", seg.start, seg._end, "星期"..weakTab[tonumber(os.date("%w")+1)], ""))
        yield(Candidate("week", seg.start, seg._end, "礼拜"..weakTab[tonumber(os.date("%w")+1)], ""))
    end
end
```

再将下面代码添加在对应的输入方案，例如：朙月拼音添加在 `luna_pinyin_simp.custom.yaml`。

```
"engine/translators/@6": lua_translator@date_translator
```

## 自定义短语

用文本编辑打开 `custom_phrase.txt`，规则：内容+编码+权重（可选），使用 Tab 键间隔。

示例：

```
Rime  rime	4
鼠须管	rime	3
https://rime.im/	rime	2
Squirrel	rime	1
```

![](/img/rime/zidingyiduanyu.png)

## 皮肤

打开 `squirrel.custom.yaml`，将皮肤代码添加进去，按照下图说明设置自己喜欢的皮肤。

* style/color_scheme: 浅色皮肤名称
* style/color_scheme_dark: 深色皮肤名称

![](https://i.imgur.com/caSIYQi.png)
延伸：皮肤效果[点击这里](https://ssnhd.com/2022/01/11/rime-skin)

**修改颜色**

- 每 8bit 一组，从低位到高位分别代表 Red、Green、Blue、Alpha，共 32bit。
- Alpha 值（如果界面支持）是可选的，默认为 `0xF` F 即不透明。
- 把颜色值写为十六进制数，即 `0xAABBGGRR` 或 `0xBBGGRR`。

![](https://i.imgur.com/EG9rFyi.jpg)

## 特定程序中英文

打开 `squirrel.custom.yaml`，将程序标识符添加进去，并输入对应模式开启默认中英文。

- `ascii_mode: true`：默认英文
- `ascii_mode: false`：默认中文
- `ascii_punct: true`：开启英文标点

示例：VSCode 默认英文输入，始终输出英文标点（半角）。

```
com.microsoft.VSCode:
    ascii_mode: true
    sacii_punct: true
```

**延伸：如何获取程序标识符？**

1. 打开 Mac 活动监视器，选中程序，点击上方 `···` 里**取样进程**。
2. 找到 `Identifier` 后面即为程序标识符。

![](/img/rime/app.png)

## 大写数字

配置文件是 `numbers.schema.yaml`。切换输入方案选择大写数字，使用方法参照下表。

<table>
<thead>
<tr>
<th>按键</th>
<th>输出</th>
<th>✂️</th>
<th>按键（按住Shift）</th>
<th>输出</th>
</tr>
</thead>
<tbody>
<tr>
<td>1234567890</td>
<td>壹贰叁肆伍陆柒捌玖零</td>
<td>✂️</td>
<td>1234567890</td>
<td>一二三四五六七八九〇</td>
</tr>
<tr>
<td>wqbsjfd.</td>
<td>万仟佰拾角分第点</td>
<td>✂️</td>
<td>wqbsjfd.</td>
<td>万千百十角分第点</td>
</tr>
<tr>
<td>z</td>
<td>整之</td>
<td>✂️</td>
<td>z</td>
<td>整之</td>
</tr>
<tr>
<td>y</td>
<td>元月亿</td>
<td>✂️</td>
<td>y</td>
<td>元月亿</td>
</tr>
</tbody>
</table>

![](https://i.imgur.com/RQdg63e.gif)

## 删除错词

将光标（`↑` `↓`或`←` `→`）移到要删除的词组上，按 `Shift+Fn+Delete` 键（第三方键盘按 `Control+Delete`）。只能从用户词典中删除词组，词库里词组只会取消其调频顺序。

## 同步

### 同步至 iCloud

1、配置文件里打开 `installation.yaml`，将 `id` 改为 Mac（支持自定义）。\
2、复制下面路径代码粘贴进去，将 `admin` 替换为 Mac 管理员名称（代码里 `RimeSync` 是同步后文件夹名称，支持自定义）。

```
sync_dir: "/Users/admin/Library/Mobile Documents/com~apple~CloudDocs/RimeSync"
```

![](https://i.imgur.com/QxLdF8m.png)
3、点击菜单栏【ㄓ】-【同步用户数据】，等待几秒提示同步成功。打开访达 iCloud 找到名为 RimeSync 的文件即是。

其他同步方案：[点击这里](https://github.com/rime/home/wiki/UserGuide#同步用戶資料)

### iCloud 词库同步至新配置

1. 配置文件里打开 `installation.yaml`，将 id 和路径改成与 iCloud 同步文件 `installation.yaml` 里的一至。
2. 点击菜单栏【ㄓ】-【同步用户数据】，此时你之前的个人词库已经同步到新配置里。

![](https://i.imgur.com/gnT0FiK.png)

## 报错日志

打开终端输入 `$TMPDIR/rime.Squirrel.INFO` 按回车键，复制路径地址在访达中打开。

![](https://i.imgur.com/t2YlmrY.jpg)

找到【rime.squirrel.INFO】文件，右击点选**显示原身**得到日志文件。

![](https://i.imgur.com/Ss0wEau.jpg)

## 关于词频

配置里搜狗词库已经附带词频，可以满足绝大部分用户需求，初次使用极少部分词频不完全在首位，稍微用几日即可。


