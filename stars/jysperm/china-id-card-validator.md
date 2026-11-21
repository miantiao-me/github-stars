---
project: china-id-card-validator
stars: 14
description: |-
    Validator for China's ID Card.
url: https://github.com/jysperm/china-id-card-validator
---

## china-id-card-validator
中华人民共和国公民身份号码验证工具。

References:

* [GB 11643 公民身份号码](http://zh.wikisource.org/wiki/GB_11643-1999_%E5%85%AC%E6%B0%91%E8%BA%AB%E4%BB%BD%E5%8F%B7%E7%A0%81)
* [GB/T 2260 中华人民共和国行政区划代码](http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/201401/t20140116_501070.html)
* [维基百科：最长寿者](http://zh.wikipedia.org/wiki/%E6%9C%80%E5%B9%B4%E9%95%B7%E8%80%85)

Example:

    validator = require 'china-id-card-validator'

    assert.equal validator('11010519491231002X'), true
    assert.equal validator('11010519491231ABCD'), false

