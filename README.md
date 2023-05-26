# App Idea Generator by AI

## Features

- Generate idea
  - OpenAI API, using stream
- Rate limit by IP address

## Develop memo

- [OpenAI API](https://platform.openai.com/docs/introduction)
- [Google TypeScript Style Guide: Interfaces vs Type Aliases](https://google.github.io/styleguide/tsguide.html#interfaces-vs-type-aliases)
  - オブジェクトを表す場合は interface を利用する
- Vercel の hobby プランだと、severless funciton は 10 秒でタイムアウトする。
  - https://vercel.com/docs/concepts/limits/overview
  - edge functions にすればまだ性能よくなる+タイムアウトが 30 秒なのでいいかも？
    - https://vercel.com/docs/concepts/functions/edge-functions
  - edge function + stream で対応した https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions
