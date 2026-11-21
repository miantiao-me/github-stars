---
project: openai-to-cloudflare-ai
stars: 42
description: |-
    This is example of using Workers AI. This Cloudflare Worker provides a Base URL which allows you to make AI calls to the @cf/meta/llama-3-8b-instruct model using an OpenAI client.
url: https://github.com/jackculpan/openai-to-cloudflare-ai
---

# OpenAI to Llama 3 AI

This is example of using [Workers AI](https://developers.cloudflare.com/workers-ai/). This Cloudflare Worker provides a Base URL which allows you to make AI calls to the @cf/meta/llama-3-8b-instruct model using an OpenAI client.

## Usage

```txt
npm install 
npm run dev
npm run deploy
```

[Example (Ruby using the ruby-openai gem)](https://github.com/alexrudall/ruby-openai)

```ruby
require 'openai'

client = OpenAI::Client.new(
  api_key: ENV['OPENAI_API_KEY'],
  uri_base: ENV['CLOUDFLARE_WORKER_URL']
)

response = client.chat(
  parameters: {
    model: 'gpt-4-turbo', #This is ignored in this example
    messages: [
      {
        role: 'system', content: 'You are a helpful assistant'
      },
      {
        role: 'user', content: 'What is 3 * 10?'
      }
    ]
  }
)

puts response.dig('choices', 0, 'message', 'content')
```


## Author

Jack Culpan <https://github.com/jackculpan>.

## License

MIT
# openai-to-cloudflare-ai

