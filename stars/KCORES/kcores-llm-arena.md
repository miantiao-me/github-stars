---
project: kcores-llm-arena
stars: 953
description: |-
    LLM Arena by KCORES team
url: https://github.com/KCORES/kcores-llm-arena
---

KCORES LLM Arena - KCORES 大模型竞技场
-------------------------------------


![KCORES LLM Arena](./assets/images/kcores-LLM-arena-banner.png)

## Desc

现有的大模型评测大多数都是做选择题, 导致十分容易针对测试进行优化, 进而结果失真.

所以本测试专注于现实世界场景, 并采用人工评分和基准测试的方式进行评测, 力争还原大模型在现实世界中的表现.




## 真实世界编程能力测试 

- version: **2025-04-29**
- Winner: **👑Gemini-2.5-Pro-Experimental-03-25**

### 评测内容

本评测包含4个测试大项, 66个小项 (题目), 测试内容包含 Python, Javascript, HTML, CSS, Canvas, WebWorker, 计算机图形学, 性能优化, 需求还原, 字符串处理, 数学, 物理, 创意等等

### 结论

目前最好的编程大模型是什么？**👑Gemini-2.5-Pro-Experimental-03-25** 

那么除了 Gemini-2.5-Pro, 最好的选择是什么？答案是 **Claude** 全家桶, 无论是 **Claude-3.7** 还是 **Claude-3.5** 都是非常好的选择

开源模型最强是哪一个? 当然是 **Qwen3-235B-A22B-Thinking**

DeepSeek 系列呢? 答案是 **DeepSeek-V3-0324** 当然 **DeepSeek-R1** 也是非常好的选择

OpenAI 系列呢？答案是 **OpenAI-o1**

Grok 嘛...开心那就好

![Coding Benchmark](./scripts/llm_benchmark_results_normalized.png)


### 测试子项

**[Ball Bouncing Inside Spinning Heptagon](./benchmark-ball-bouncing-inside-spinning-heptagon/README.md)**  
**[Mandelbrot Set Meet LiBai Benchmark](./benchmark-mandelbrot-set-meet-libai/README.md)**  
**[Mars Mission Benchmark](./benchmark-mars-mission/README.md)**  
**[Solar System Benchmark](./benchmark-solar-system/README.md)**  

![Ball Bouncing Inside Spinning Heptagon](./assets/images/ball-bouncing-gif.gif)




## 贡献代码

开源项目离不开众人拾柴火焰高, 这也是开源项目的魅力所在. 欢迎各位贡献本项目!

**PR Tips**

- 每个项目测试三次, 将输出命名为 ```{benchmark_name}-{model_name}-{turn-n} ```
- 选取得分最高的输出, 将测试输出后缀增加 ```-high-score```, 例如: ```benchmark-ball-bouncing-inside-spinning-hexagon-Claude-3.7-Sonnet-Thinking-turn-3-high-score.py```
- 在项目目录运行 ```make all``` 生成得分图片, 生成环境需要有 python-3.10.
- 提交 PR 即可. 

**贡献者**  

<a href="https://github.com/KCORES/kcores-LLM-Arena/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=KCORES/kcores-LLM-Arena" />
</a>



## License

[KCORES License Version 1.0](./LICENSE_zh-CN)

