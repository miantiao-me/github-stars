---
project: html2any
stars: 95
description: |-
    🌀 convert html to anything
url: https://github.com/huozhi/html2any
---

# html2any

[![npm version](https://img.shields.io/npm/v/html2any?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/html2any)

> Compile messy HTML into compact context for AI agents.

## Library

While building websites, people may need to render rich text into different formats.
For example, I've got an `<video>` tag, but I wanna render it with my own React video component.
But I also want to render the whole html easily rather than parse it manually.

`html2any` helps you render an HTML string. It parses HTML and gives you the ability to transform it from the source format into your target format.

### API

html2any provides the following APIs:

- `AST(Object) parse(String source)`
- `void transform(AST ast, function rule)`
- `void html2any(html, function rule)`

- parse
> Build an AST from HTML/XML source.

- transform
> Convert the AST to a final form with a custom rule.

- html2any
> Convert the html/xml to the final form directly.

### Usage

```
npm i -S html2any
```

```js
import html2any, { parse, transform } from 'html2any'

const html = escapeHTMLEntity(`<div>123</div>`)

const ast = parse(html)[0]

function rule(node, children) {
  if (typeof node === 'string') {
    return node
  } else {
    return <div>{node}</div>
  }
}

const vdom = transform(ast, rule)
// JSX vdom form of html
// { type: 'div', props: {...}, children: '...' }

```

Or you can just call html2any directly

```js
const vdom = html2any(html, rule)
```

### Streaming parser: `html2any/stream`

A browser-compatible HTML parser for markup that is still arriving, such as an LLM response.
Every prefix of the input gives a tree that is safe to render, and the final tree does not
depend on how the input was split.

```js
import { parse, html, content, fill, outline, apply } from 'html2any/stream'

// The text received so far; calls that extend earlier text continue incrementally.
const tree = parse(message.content)
const final = parse(message.content, { done: true })

// Or a stream (AsyncIterable, ReadableStream or Response).
for await (const tree of parse(response)) render(tree)

// Content as typed JSON, separate from the template, and back.
const { schema, data } = content(final)
data.hero.title = 'New title'
html(fill(final, data), { document: true })

// The block structure as an editable text file.
const { root } = apply(final, editedOutline)
```

- **Spec compliant**: tree construction follows the WHATWG algorithm (adoption agency, foster
  parenting, tables, select, template, SVG/MathML). It passes 1620 of 1629 html5lib tree
  construction tests from web-platform-tests, with identical results for any chunk size.
- **Streaming friendly**: nodes have stable ids and an `open` flag; once a node is closed it never
  changes, and unchanged subtrees keep their identity between updates.
- **Zero dependencies**, runs in browsers, Node, Bun and edge runtimes.

### CLI

Convert a local file, URL, or stdin into compact Markdown:

```bash
html2any md <file|url|->

# Short alias
html2 md <file|url|->
```

Examples:

```bash
html2 md page.html > page.context.md
cat page.html | html2 md - --url https://example.com/page
```

The Markdown output keeps docs-friendly structure: title, description, headings, paragraphs, lists, tables, code blocks, and links.

The extractor is deterministic and token-size friendly. It drops scripts, styles, hidden content, and layout chrome while preserving semantically useful docs content.

### How It Works

Use `html2any` to construct an AST from an HTML string, then convert each node recursively with the `rule` passed to the transform function.

For example, translate a `<p>` tag into a React Native component like `<Text style={styles.paragraph}>` with prepared styles, then decode the paragraph content to avoid HTML entity issues.

