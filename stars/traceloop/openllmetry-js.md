---
project: openllmetry-js
stars: 406
description: |-
    Sister project to OpenLLMetry, but in Typescript. Open-source observability for your LLM application, based on OpenTelemetry
url: https://github.com/traceloop/openllmetry-js
---

<p align="center">
<a href="https://www.traceloop.com/openllmetry#gh-light-mode-only">
<img width="600" src="https://raw.githubusercontent.com/traceloop/openllmetry/main/img/logo-light.png">
</a>
<a href="https://www.traceloop.com/openllmetry#gh-dark-mode-only">
<img width="600" src="https://raw.githubusercontent.com/traceloop/openllmetry/main/img/logo-dark.png">
</a>
</p>
<h1 align="center">For Javascript / Typescript</h1>
<p align="center">
  <p align="center">Open-source observability for your LLM application</p>
</p>
<h4 align="center">
    Get started with <a href="https://traceloop.com/docs/openllmetry/getting-started-ts"><strong>Node.js </strong></a>
    or <a href="https://traceloop.com/docs/openllmetry/getting-started-nextjs"><strong>Next.js</strong></a> »
    <br />
    <br />
  <a href="https://traceloop.com/slack">Slack</a> |
  <a href="https://traceloop.com/docs/openllmetry/introduction">Docs</a> |
  <a href="https://www.traceloop.com/openllmetry">Website</a>
</h4>

<h4 align="center">
   <a href="https://www.npmjs.com/package/@traceloop/node-server-sdk">
    <img src="https://badge.fury.io/js/@traceloop%2Fnode-server-sdk.svg">
  </a>
   <a href="https://github.com/traceloop/openllmetry-js/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-Apache 2.0-blue.svg" alt="OpenLLMetry JS is released under the Apache-2.0 License">
  </a>
  <a href="https://github.com/traceloop/openllmetry-js/actions/workflows/ci.yml">
  <img src="https://github.com/traceloop/openllmetry-js/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://www.ycombinator.com/companies/traceloop"><img src="https://img.shields.io/website?color=%23f26522&down_message=Y%20Combinator&label=Backed&logo=ycombinator&style=flat-square&up_message=Y%20Combinator&url=https%3A%2F%2Fwww.ycombinator.com"></a>
  <a href="https://github.com/traceloop/openllmetry-js/blob/main/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen" alt="PRs welcome!" />
  </a>
  <a href="https://github.com/traceloop/openllmetry-js/issues">
    <img src="https://img.shields.io/github/commit-activity/m/traceloop/openllmetry-js" alt="git commit activity" />
  </a>
  <a href="https://traceloop.com/slack">
    <img src="https://img.shields.io/badge/chat-on%20Slack-blueviolet" alt="Slack community channel" />
  </a>
  <a href="https://twitter.com/traceloopdev">
    <img src="https://img.shields.io/badge/follow-%40traceloopdev-1DA1F2?logo=twitter&style=social" alt="Traceloop Twitter" />
  </a>
</h4>

**🎉 New**:
Our semantic conventions are now part of OpenTelemetry! Join the [discussion](https://github.com/open-telemetry/community/blob/1c71595874e5d125ca92ec3b0e948c4325161c8a/projects/llm-semconv.md) and help us shape the future of LLM observability.

OpenLLMetry-JS is a set of extensions built on top of [OpenTelemetry](https://opentelemetry.io/) that gives you complete observability over your LLM application. Because it uses OpenTelemetry under the hood, it can be connected to your existing observability solutions - Datadog, Honeycomb, and others.

It's built and maintained by Traceloop under the Apache 2.0 license.

The repo contains standard OpenTelemetry instrumentations for LLM providers and Vector DBs, as well as a Traceloop SDK that makes it easy to get started with OpenLLMetry-JS, while still outputting standard OpenTelemetry data that can be connected to your observability stack.
If you already have OpenTelemetry instrumented, you can just add any of our instrumentations directly.

## 🚀 Getting Started

The easiest way to get started is to use our SDK.
For a complete guide, go to our [docs](https://traceloop.com/docs/openllmetry/getting-started-ts).

Install the SDK:

```shell
npm install --save @traceloop/node-server-sdk
```

Then, to start instrumenting your code, just add these 2 lines to your code:

```js
import * as traceloop from "@traceloop/node-server-sdk";

traceloop.initialize();
```

Make sure to `import` the SDK before importing any LLM module.

That's it. You're now tracing your code with OpenLLMetry-JS!
If you're running this locally, you may want to disable batch sending, so you can see the traces immediately:

```js
traceloop.initialize({ disableBatch: true });
```

Now, you need to decide where to export the traces to.

## ⏫ Supported (and tested) destinations

- ✅ [Traceloop](https://www.traceloop.com/docs/openllmetry/integrations/traceloop)
- ✅ [Dynatrace](https://www.traceloop.com/docs/openllmetry/integrations/dynatrace)
- ✅ [Datadog](https://www.traceloop.com/docs/openllmetry/integrations/datadog)
- ✅ [New Relic](https://www.traceloop.com/docs/openllmetry/integrations/newrelic)
- ✅ [Honeycomb](https://www.traceloop.com/docs/openllmetry/integrations/honeycomb)
- ✅ [Grafana Tempo](https://www.traceloop.com/docs/openllmetry/integrations/grafana)
- ✅ [HyperDX](https://www.traceloop.com/docs/openllmetry/integrations/hyperdx)
- ✅ [SigNoz](https://www.traceloop.com/docs/openllmetry/integrations/signoz)
- ✅ [Splunk](https://www.traceloop.com/docs/openllmetry/integrations/splunk)
- ✅ [OpenTelemetry Collector](https://www.traceloop.com/docs/openllmetry/integrations/otel-collector)

See [our docs](https://traceloop.com/docs/openllmetry/integrations/exporting) for instructions on connecting to each one.

## 🪗 What do we instrument?

OpenLLMetry-JS can instrument everything that [OpenTelemetry already instruments](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/plugins/node) - so things like your DB, API calls, and more. On top of that, we built a set of custom extensions that instrument things like your calls to OpenAI or Anthropic, or your Vector DB like Pinecone, Chroma, or Weaviate.

### LLM Providers

- ✅ OpenAI
- ✅ Azure OpenAI
- ✅ Anthropic
- ✅ Cohere
- ⏳ Replicate
- ⏳ HuggingFace
- ✅ Vertex AI (GCP)
- ✅ Bedrock (AWS)

### Vector DBs

- ✅ Pinecone
- ✅ Chroma
- ✅ Qdrant
- ⏳ Weaviate
- ⏳ Milvus

### Frameworks

- ✅ LangChain
- ✅ LlamaIndex

## 🔎 Telemetry

We no longer log or collect any telemetry in the SDK or in the instrumentations. Make sure to bump to v0.21.1 and above.

## 🌱 Contributing

Whether it's big or small, we love contributions ❤️ Check out our guide to see how to [get started](https://traceloop.com/docs/openllmetry/contributing/overview).

Not sure where to get started? You can:

- [Book a free pairing session with one of our teammates](mailto:nir@traceloop.com?subject=Pairing%20session&body=I'd%20like%20to%20do%20a%20pairing%20session!)!
- Join our <a href="https://traceloop.com/slack">Slack</a>, and ask us any questions there.

## 💚 Community & Support

- [Slack](https://traceloop.com/slack) (For live discussion with the community and the Traceloop team)
- [GitHub Discussions](https://github.com/traceloop/openllmetry-js/discussions) (For help with building and deeper conversations about features)
- [GitHub Issues](https://github.com/traceloop/openllmetry-js/issues) (For any bugs and errors you encounter using OpenLLMetry)
- [Twitter](https://twitter.com/traceloopdev) (Get news fast)

