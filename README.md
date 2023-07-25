# Proof of Concept (Electron + React + Trust Wallet Core)

> Tested on a Linux Ubuntu machine

The Trustwallet project recently added beta support for WASM (WebAssembly) to its wallet-core implementation.
- the source code can be found on github: https://github.com/trustwallet/wallet-core
- the compiled `@trustwallet/wallet-core` package is available on npm: https://www.npmjs.com/package/@trustwallet/wallet-core

Based on the electron forge template found here: https://www.electronforge.io/templates/typescript-+-webpack-template

The goal is to quickly explore the support of the WASM Trustwallet core in electron apps in combination with react js.

## Setup

Install dependencies.

```shell
yarn install
```

## Run

Launch the electron app.

```shell
yarn run start
```

## Build

Detailed build instructions can be found here: https://www.electronforge.io/

Compile the app:
```shell
yarn run package
```

Build distribution packages depending on platform (e.g. *.deb, *.exe, etc.)
```shell
yarn run make
```

## Publish

Create a new release (triggered by pushing a new tag)
```shell
yarn version
git push -u origin master --follow-tags
```
