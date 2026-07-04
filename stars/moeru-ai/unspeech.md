---
project: unspeech
stars: 100
description: |-
    🗣️🔊 Your Text-to-Speech Services, All-in-One.
url: https://github.com/moeru-ai/unspeech
---

# unSpeech `0.1.16`

> Your Text-to-Speech Services, All-in-One.

## Features

unSpeech lets you use various online TTS with OpenAI-compatible API.

- [OpenAI](https://platform.openai.com/docs/api-reference/audio/createSpeech)
- [Microsoft / Azure AI Speech service](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/text-to-speech)
- [Deepgram](https://developers.deepgram.com/docs/tts-rest)
- [Alibaba Cloud Model Studio / 阿里云百炼 / CosyVoice](https://www.alibabacloud.com/en/product/modelstudio)
- [Volcano Engine / 火山引擎语音技术](https://www.volcengine.com/product/voice-tech)
- [ElevenLabs](https://elevenlabs.io/docs/api-reference/text-to-speech/convert)
- [Koemotion (by Rinna)](https://koemotion.rinna.co.jp/)

## Getting Started

### Client

You can use unSpeech with most OpenAI clients.

The `model` parameter should be provider + model, e.g. `openai/tts-1-hd`, `elevenlabs/eleven_multilingual_v2`.

The `Authorization` header is auto-converted to the vendor's corresponding auth method, such as `xi-api-key`.

###### `curl`

```bash
curl http://localhost:5933/v1/audio/speech \
  -H "Authorization: Bearer $XI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "elevenlabs/eleven_multilingual_v2",
    "input": "Hello, World!",
    "voice": "9BWtsMINqrJLrRacOk9x",
  }' \
  --output speech.mp3
```

###### [`@xsai/generate-speech`](https://github.com/moeru-ai/xsai) (TypeScript)

```ts
import { generateSpeech } from '@xsai/generate-speech'

const speech = await generateSpeech({
  apiKey: 'YOUR_API_KEY',
  baseURL: 'http://localhost:5933/v1/',
  input: 'Hello, World!',
  model: 'elevenlabs/eleven_multilingual_v2',
  voice: '9BWtsMINqrJLrRacOk9x',
})
```

### Build

> require `go` 1.24+

```bash
git clone https://github.com/moeru-ai/unspeech.git
cd unspeech
go build -o ./result/unspeech ./cmd/unspeech
```

### Run

```bash
# http server started on [::]:5933
./result/unspeech
```

## Related Projects

Looking for something like unSpeech, but for local TTS? check it out:

- [erew123/alltalk_tts/alltalkbeta](https://github.com/erew123/alltalk_tts/tree/alltalkbeta)
- [astramind-ai/Auralis](https://github.com/astramind-ai/Auralis)
- [matatonic/openedai-speech](https://github.com/matatonic/openedai-speech)

Or to use free Edge TTS:

- [travisvn/openai-edge-tts](https://github.com/travisvn/openai-edge-tts)

## Similar Projects

- [orate](https://github.com/haydenbleasel/orate)

## License

[AGPL-3.0](./LICENSE)

