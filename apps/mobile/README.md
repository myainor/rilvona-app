# Rilvona mobile

React Native CLI app for the Rilvona campus community. It talks to the Nest API at `/api/v1`.

## Run on Android

Start the API on port 3000 first. The Android emulator reaches the host machine at `10.0.2.2`.

```sh
npm install
npm start -- --port 8082
```

In another terminal, with an emulator or device connected:

```sh
npm run android -- --port 8082 --no-packager
```

Port 8081 is left alone if another Metro server is already using it. iOS builds need macOS and Xcode: `npm run ios`.

## Local config

By default the app talks to the hosted API. To run it against your own API, copy `src/config.local.example.ts` to `src/config.local.ts` and set `API_ORIGIN` there, for example `http://10.0.2.2:3000` for an API on your machine reached from the Android emulator. The same file holds the Google sign-in client IDs. `src/config.local.ts` is created by `npm install` and is never committed.

## What is on screen

Welcome, registration, login, email verification, password reset, home feed, hives, posts, anonymous questions, events, search, alerts, profile, college verification, blocks, bookmarks, and account deletion.
