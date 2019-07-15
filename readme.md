# Exchange rates sample API

Simple REST API to get rates from https://docs.openexchangerates.org/ and store in in-memory with 1 hour expiration.

## Installation

```npm install```

```cp env.example .env```

change `OPENEX_APPID` in `.env` to your App ID from https://docs.openexchangerates.org/

run `node app.js` or using nodemon `nodemon app.js`

open `http://localhost:8888` from browser

## Test