---
project: github-action-nixpacks
stars: 42
description: |-
    Build and push images with nixpacks
url: https://github.com/iloveitaly/github-action-nixpacks
---

# Nixpacks Build and Push Action

This GitHub Action utilizes [Nixpacks](https://nixpacks.com) to build a Docker image for your application and (optionally) push the image to a Docker registry. Nixpacks generates an OCI-compliant container image from your application source without the need for a Dockerfile.

It's very opinionated out the box (as software should be!) but allows you to customize much of the functionality if you want.

## Features

- **Multi-architecture builds**: this is explained more in detail below.
- **Default tags**: a unix timestamp, sha, and `latest` tag are automatically generated for each build.
- **Default labels**: revision, author, build date, github repo, etc are all added automatically.
- **Nixpacks options**: you add pass most (all?) nixpacks cli arguments to the action to customize your build as you would locally.

## Inputs

- `context`: The build's context, specifying the set of files located at the provided PATH or URL. It is required to point to your application source code.
- `tags`: A comma-separated list of tags to apply to the built image. Defaults to unix timestamp, git SHA, and `latest`.
- `labels`: An optional, comma-separated list of metadata labels to add to the image.
- `platforms`: An optional, comma-separated list of target platforms for the build.
- `pkgs`: Optional additional Nix packages to install in the environment.
- `apt`: Optional additional Apt packages to install in the environment.
- `push`: A boolean flag to indicate whether to push the built image to the registry. Default is `false`. Required for multi-architecture builds.
- `cache`: A boolean flag to indicate whether to use the build cache. 
  Cache speeds up the CI by reusing docker layers from previous builds.
  Default is `false`.
  (NOTE: The cache is shared between all builds in the repository. Some cache metadata will be inlined in the final image.)
  See the [Nixpacks documentation](https://nixpacks.com/docs/configuration/caching) for more information.
- `cache_tag`: A single tag to use for the cache image. Required if `cache` is `true`.
  Defaults to `ghcr.io/org/app:latest` where `org/app` is the repository the workflow runs into.
- `env`: Optional environment variables to set during the build.

## Usage

[Here's an example of this workflow in a live project:](https://github.com/iloveitaly/github-overlord/blob/master/.github/workflows/build_and_publish.yml)

```yaml
  - name: Build and push Docker images
    uses: iloveitaly/github-action-nixpacks@main
    with:
      push: true
```

Multi-architecture builds are easy:

```yaml
- name: Build and push Docker images
  uses: iloveitaly/github-action-nixpacks@main
  with:
    platforms: "linux/amd64,linux/arm64"
    push: true
```

Ensure that your GitHub Actions runner has Docker installed and configured correctly, especially if you're pushing to a private registry. Here's a full example which also
shows how to override the default tags:

```yaml
name: Build & Publish

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

env:
  IMAGE_NAME: ghcr.io/${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      # create a unique tag for each build for debugging
      - name: Set Docker tag
        id: date
        run: echo "DATE_STAMP=$(date +%s)" > "$GITHUB_ENV"

      - name: Build and push Docker images
        uses: iloveitaly/github-action-nixpacks@main
        with:
          push: true
          tags: |
            ${{ env.IMAGE_NAME }}:custom-${{ env.DATE_STAMP }}
            ${{ env.IMAGE_NAME }}:awesome-latest
```

### Multi-architecture builds

These are tricky and not supported by nixpacks by default. This action makes it easy to create multi-architecture builds with nixpacks.

<!-- TODO add blog post when complete -->

Some things to keep in mind:

* `push` is required when building for multiple architectures.
* For each platform, an auto-generated tag is generated and pushed.
* There are some [TODOs](/TODO) that I won't get to until I need them.

