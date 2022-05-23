Mock Chat Api
=============

## Run

You can use `npm` or `yarn` to start the server.

```shell
npm install # or yarn install
```

then run

```shell
npm start # or yarn start
```

This will start the server under port 8888 by default.

You can set the PORT, if you need to:

```shell
PORT=666 yarn start
```

## Use

First call `POST /v1/auth` to receive an access token and the first question with options:
```shell
curl -XPOST -H 'Content-Type: application/json' localhost:8888/v1/auth | jq .
{
  "sessionId": "jRO5Xf0DbVolO1vu",
  "question": {
    "greeting": [
      "Hello and good morning!",
      "I am your coach."
    ],
    "question": "How are you?",
    "answers": {
      "soso": {
        "label": "soso"
      },
      "good": {
        "label": "good"
      },
      "great": {
        "label": "great"
      }
    }
  }
}
```

With the received _sessionId_, you can respond to the question:
```shell
curl -XPOST -H 'Content-Type: application/json' -H 'Authorization: Bearer jRO5Xf0DbVolO1vu' -d'{"responseId": "soso"}' localhost:8888/v1/responses | jq .
{
  "response": "Oh, no...",
  "question": "What does that mean to you?",
  "answers": {
    "hu?": {
      "label": "hu?"
    },
    "mmh": {
      "label": "mmh"
    }
  }
}
```
