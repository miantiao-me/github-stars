---
project: botkit
stars: 106
description: |-
    A framework for creating ActivityPub bots
url: https://github.com/fedify-dev/botkit
---

<img src="./logo.svg" alt="BotKit by Fedify" width="203" height="165">

[BotKit] by Fedify
==================

[![JSR][JSR badge]][JSR]
[![npm][npm badge]][npm]
[![GitHub Actions][GitHub Actions badge]][GitHub Actions]
[![Codecov][Codecov badge]][Codecov]
[![Fediverse][Fediverse badge]][Fediverse]

[BotKit] is a framework for creating [ActivityPub] bots.  It is powered by
[Fedify], a lower-level library for creating ActivityPub server applications.
Unlike Mastodon bots, BotKit is designed to create a standalone ActivityPub bot,
which is a complete ActivityPub server in itself and not limited to Mastodon's
capabilities (such as the 500-character limit per post).

BotKit's API is so simple and easy to use that you can create a complete bot in
a single TypeScript file.  Here's an example of a simple bot that just greets:

~~~~ typescript
import { createBot, mention, text } from "@fedify/botkit";
import { RedisKvStore } from "@fedify/redis";
import { Redis } from "ioredis";

// Create a bot instance:
const bot = createBot<void>({
  // The bot will have fediverse handle "@greetbot@mydomain":
  username: "greetbot",
  // Set the display name:
  name: "Greet Bot",
  // Set the profile icon (avatar):
  icon: new URL("https://mydomain/icon.png"),
  // Set the bio:
  summary: text`Hi, there! I'm a simple fediverse bot created by ${
    mention("@hongminhee@hollo.social")}.`,
  // Use Redis as a key-value store:
  kv: new RedisKvStore(new Redis()),
  // Use Redis as a message queue:
  queue: new RedisMessageQueue(() => new Redis()),
});

// A bot can respond to a mention:
bot.onMention = async (session, message) => {
  await message.reply(text`Hi, ${message.actor}!`);
};

// Or, a bot also can actively publish a post:
const session = bot.getSession("https://mydomain/");
setInterval(async () => {
  await session.publish(text`Hi, folks! It's an hourly greeting.`);
}, 1000 * 60 * 60);

export default bot;
~~~~

For more information, see the [BotKit docs][BotKit].

[BotKit]: https://botkit.fedify.dev/
[JSR badge]: https://jsr.io/badges/@fedify/botkit
[JSR]: https://jsr.io/@fedify/botkit
[npm badge]: https://img.shields.io/npm/v/@fedify/botkit?logo=npm
[npm]: https://www.npmjs.com/package/@fedify/botkit
[GitHub Actions badge]: https://github.com/fedify-dev/botkit/actions/workflows/main.yaml/badge.svg
[GitHub Actions]: https://github.com/fedify-dev/botkit/actions/workflows/main.yaml
[Codecov badge]: https://codecov.io/gh/fedify-dev/botkit/graph/badge.svg?token=1KVVER1626
[Codecov]: https://codecov.io/gh/fedify-dev/botkit
[Fediverse badge]: https://fedi-badge.minhee.org/@botkit@hackers.pub/followers.svg
[Fediverse]: https://hackers.pub/@botkit
[ActivityPub]: https://activitypub.rocks/
[Fedify]: https://fedify.dev/

<!-- cSpell: ignore greetbot mydomain -->

