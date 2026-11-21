---
project: cloudflare-partner-cli
stars: 72
description: |-
    Set CNAME to use Cloudflare using the partner program
url: https://github.com/fffonion/cloudflare-partner-cli
---

# Cloudflare Partner CLI

This is a CLI program that let you set CNAME to use Cloudflare using the partner program.

Both Python2.x and Python3.x is supported. No extra library is needed.

To use Chinese menu, set environment variable `LANG` to use **UTF-8** (for example, **zh_CN.UTF-8**).

### Usage

1. Apply for partner program at https://www.cloudflare.com/partners/.
2. Clone this repository or [download script](https://github.com/fffonion/cloudflare-partner-cli/raw/master/cloudflare-partner-cli.py).
3. Run `python ./cloudflare-partner-cli.py`.
4. Enter your `host_key`. You can get it [here](https://partners.cloudflare.com/api-management).
5. Enter the account you use to manage domains (your personal account, not partner login account). User key is stored in `.cfhost`.
6. Follow the instructions on screen.

### Note

- Value of `resolve_to` has to be DNS record (for example: **google.com**) instead of IP address.
- You may still need to wait some time after running `ssl_verification`.

# Cloudflare Partner CLI

使用Cloudflare partner功能用CNAME方式接入cloudflare。

你可以使用Python2.x或者Python3.x。无需安装任何依赖。

如需使用中文菜单，请将环境变量的`LANG`设置为使用**UTF-8** (比如**zh_CN.UTF-8**)。

### 使用方法

1. 申请Cloudflare partner计划 https://www.cloudflare.com/partners/ 。
2. clone本项目或者[直接下载脚本](https://github.com/fffonion/cloudflare-partner-cli/raw/master/cloudflare-partner-cli.py)。
3. 运行 `python ./cloudflare-partner-cli.py`。
4. 输入 `host_key`。可以从[这里](https://partners.cloudflare.com/api-management)获得。
5. 输入要用来管理域名的账号 (你的个人账号，不是partner账号)。账户信息保存在`.cfhost`文件中。
6. 按照屏幕提示操作。

### 注意

- `源站地址`必须为DNS记录，如**google.com**，不能填写IP地址。
- 域名生效且运行`开通SSL`之后，仍需要等一段时间SSL证书才会生效

