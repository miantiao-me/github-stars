---
project: site
stars: 66
description: |-
    🔭 My cozy corner in the wide expanse of the internet
url: https://github.com/boehs/site
---

# My main website!

![](https://wakapi.dev/api/badge/evan/interval:any/project:site) ![](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fboehs.org) ![](https://img.shields.io/website?url=https%3A%2F%2Fboehs.org)

This is the site wherein I push 11ty to it's absolute limits and then some. It works on some 11ty versions but not all of them. I'm pretty sure I'm winning among 11ty sites in terms of the sheer amount of crimes against humanity committed in the name of web development.

This website is my `indieweb`-enabled `digital garden` with `dynamic taxonomies`, `aliases`, ~~`gemini`~~, `scss`, `ts`, and lots of love.

## Some notes for developers

I like to think this website is pretty cool, I've taken great care to design
it in such a way that it is _very_ flexible (although mind that the stylesheets are heavily customized)

No taxonomies, be that tags, dates, or "in" properties, are hardcoded. Tbh I think I got lazy and started hard coding my social media in places but thats easy to change.

### Architecture

-   11ty is responsible for using templates and markdown files to create pages, as well as building other files needed for cosmetics (it's a static site generator). It also is used as infrastructure for things like pagination and wikilinks
-   Cloudflare serves the site, and certain cosmetics are done server side, for instance, changing the greeting on the home page
-   Satori generates OpenGraph SVGs for each page, and ReSVG renders those to PNGs.

```
                             ┌────┐                                    ┌──────────┐
              ┌──────────────┤11ty├─────────────┐                ┌─────┤Cloudflare├────┐
              │              └────┘┌──────┐     │                │     └──────────┘    │
              │                ┌───┤Minify├───┐ │                │                     │
              │                │   └──────┘   │ │                │                     │
 ┌─────────┐  │ ┌────────────┐ │┌────────────┐│ │ ┌────────────┐ │ ┌─────────────────┐ │
 │   TS    ├──┼─▶    TSC     ├─┼▶   Terser   ├┼─┼─▶     JS     ├─┼─▶      Cache      │ │
 └─────────┘  │ └────────────┘ │└────────────┘│ │ └────────────┘ │ └─────────────────┘ │
 ┌─────────┐  │ ┌────────────┐ │┌────────────┐│ │ ┌────────────┐ │ ┌─────────────────┐ │
 │  SCSS   ├──┼─▶    SASS    ├─┼▶    CSSO    ├┼─┼─▶    CSS     ├─┼─▶      Cache      │ │
 └─────────┘  │ └────────────┘ │└────────────┘│ │ └────────────┘ │ └─────────────────┘ │
 ┌─────────┐  │ ┌────────────┐ │┌────────────┐│ │ ┌────────────┐ │ ┌─────────────────┐ │
 │Templates├─┬┼─▶  Nunjucks  ├─┼▶  HTMLMin   ├┼─┼─▶    HTML    ├─┼─▶Workers Transform│ │
 └─────────┘ ││ └────────────┘ │└────────────┘│ │ └────────────┘ │ └─────────────────┘ │
 ┌─────────┐ ││                └──────────────┘ │                │                     │
 │Markdown ├─┤│ ┌────────────┐  ┌────────────┐  │ ┌────────────┐ │ ┌─────────────────┐ │
 └─────────┘ └┼─▶   Satori   ├──▶   ReSVG    ├──┼─▶    PNG     ├─┼─▶      Cache      │ │
              │ └────────────┘  └────────────┘  │ └────────────┘ │ └─────────────────┘ │
              │    (og img)                     │                │                     │
              └─────────────────────────────────┘                └─────────────────────┘
```

### Building

When you clone this repository, you should run `git clone --recurse-submodules https://github.com/boehs/site`, as my content [lives](https://git.sr.ht/~boehs/oasis) on sourcehut. Please note this content is not licensed under AGPL. It is not licensed, unless otherwise noted. If you already cloned it, run the following commands:

```
git submodule update --init --recursive
git pull --recurse-submodules
```

Next, you can run `pnpm install` and `pnpm run start` to get a dev server up and running.

### Contributing

Feel free to do whatever the heck you want, provided you abide by the
included LICENSE.md file. This includes adding pages, squashing bugs, and
tiny improvements. Anything really.

If you want, submit a PR adding a line to

-   `/shared/_data/deets/greatings.json` (Hi, Hello, Hola, etc) **or**
-   `/functions/api/is.ts` (Evan Boehs is (verb|adjective))

Be creative, everything is welcome (probably).

### Derivatives

Some sites have made use of this code in various capacities, as is permitted by the AGPL. A list is included here, please note that it is not extensive.

| site                                   | git                                               |
| -------------------------------------- | ------------------------------------------------- |
| [ariscript.org](https://ariscript.org) | [ariscript/www](https://github.com/ariscript/www) |
| [amey.dev](https://amey.dev/)          | [whyamey/www](https://github.com/whyamey/www)     |

