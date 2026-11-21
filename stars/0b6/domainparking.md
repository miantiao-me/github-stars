---
project: domainparking
stars: 17
description: |-
    null
url: https://github.com/0b6/domainparking
---

# 项目简介

该项目是一个域名停放工具。
不依赖任何其他第三方组件,一台服务器即可作为权威DNS服务器和Parking服务器。   

基于Docker架构，包含两个主要服务：

- **Parking服务**：负责域名解析和前端展示。
- **Nginx服务**：作为反向代理过滤一些不合规矩的请求,建议保留。

## 项目优势

- **自动化停放**：新域名直接设置NS即可完成停放。
- **可扩展性**：支持自定义域名模式和解析记录类型（如CNAME和TXT记录）例如入库到阿里云需要设置一个txt记录来验证。
- **轻量化部署**：Docker部署，配置简单。
## 配置文件
本文中相关子域名皆为示例，如果你不懂，那就按照我的指示来，如果你懂，那就爱怎么来怎么来。
### 事先准备
1. 想要用作NS的域名，用来提供CNAME目标和NS服务器的记录，建议使用稳定性较高的三方权威DNS，例如DNSPOD、CLOUDFLARE等。我以`404.local`为例。
2. 有公网IP的服务器。我以`10.10.233.1`为例。


做好以下的解析：
```
ns1.404.local.	1	IN	A	10.10.233.1
ns2.404.local.	1	IN	A	10.10.233.1
park.404.local.	1	IN	A	10.10.233.1
```

### Parking 服务
- **environment**:
  - `CONTACT_EMAIL`: 售卖域名联系邮箱，展示在首页，`sell@404.local`
  - `CNAME_TARGET`: CNAME目标，`park.404.local`
  - `NS_RECORDS`: NS服务器地址，`ns1.404.local,ns2.404.local`
  - `SOA_EMAIL`: SOA记录管理邮箱，`admin@404.local`
  - `SOA_PRIMARY`: 主NS服务器地址，`ns1.404.local`
  - `DOMAIN_BLACKLIST`: 黑名单域名，不需要提供HTTP页面的域名，`404.local`，以这个HOST访问会403
  - `DOMAIN_PATTERNS`: 自定义域名模式及解析规则，当给第三方平台验证的时候会使用。`^f95b72\..+:CNAME:domainov.aliyun.com,^txttest\..+:TXT:some-text-value`
- **volumes**: 自定义前端模版使用，`- ${PWD}/template.html:/app/template.html`，模版变量 {{.Domain}} 、{{.Email}}


## 使用指南

1. **准备环境**：确保安装Docker并配置域名DNS记录。
2. **修改配置**：编辑`compose.yml`，按照说明进行调整配置内容。
3. **启动项目**：在项目根目录运行：

   ```bash
   docker compose up -d
4. **开始停放**: 把想要停放的域名的NS设置成`ns1.404.local,ns2.404.local`即可
