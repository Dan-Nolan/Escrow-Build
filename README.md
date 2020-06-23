# Decentralized Escrow Application

This is an Escrow Dapp built in the ChainShot Zero to Blockchain Curriculum found on [ChainShot](https://www.chainshot.com/).

## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract

## Setup

Install dependencies with `npm install`.

There are three npm scripts to run this application:

1. `npm run test` - tests contracts in `/contracts` with the tests in `/tests`
2. `npm run start` - compiles contracts and starts the front-end application
3. `npm run compile` - compiles contracts and stores an artifact in `/app`

This application using [Parcel](https://parceljs.org/) to bundle assets and run.

It uses [Buidler](https://buidler.dev/) to compile and test solidity contracts.
