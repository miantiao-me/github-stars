---
project: dotabout
stars: 109
description: |-
    Your open-source bio page.
url: https://github.com/remvze/dotabout
---

<div align="center">
  <h2>Dotabout</h2>
  <p>Your open-source bio page.</p>
  <a href="https://dotabout.me">Visit <strong>Dotabout</strong></a> | <a href="https://github.com/remvze/dotabout/tree/main/docs">Docs</a> | <a href="https://github.com/remvze/dotabout/tree/main/template">Template</a> 
</div>

---

### What Is Dotabout?

**Dotabout** is an open-source bio platform that reads your profile data directly from a GitHub repository.

All you need is:

- A **public repo** named `.about`
- An `about.json` file inside it

Your bio page becomes instantly available at:

```
https://dotabout.me/@<your-github-username>
```

Because your data lives entirely in your own repo, you **fully own and control it**. If you delete the repo, your profile disappears: no accounts, no lock-in.

---

### How It Works

1. Create a new public repository named `.about`
2. Add an `about.json` file inside it (you can copy it from [here](https://github.com/remvze/dotabout/blob/main/template/about.json))
3. Fill in your data according to the [schema](https://github.com/remvze/dotabout/blob/main/docs/schema.md)

Then visit your profile at:

```
https://dotabout.me/@<your-github-username>
```

---

### Example

- **Page:** [dotabout.me/@remvze](https://dotabout.me/@remvze)
- **Source:** [github.com/remvze/.about](https://github.com/remvze/.about)

