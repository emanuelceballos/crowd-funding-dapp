# Crowd Funding Dapp

A decentralized Crowd Funding dApp that allows users to donate to causes proposed by users themselves. While the deadline has not been reached yet, people can donate becomoming donators. This allows them to vote later when someone opens a request for fund.

![cover.png](/git/repo_images/cover.png)

This project was bootstrapped with:
* `create-react-app`
* `truffle init`

## Restore packages

In the project root's directory, run:

* `npm install`

## Deploy the Smart Contracts

You need to be connected to any EVM compatible blockchain in order to deploy the contracts. For development purposes, it's fine to use Ganache so, install Ganache (not covered in this project) and run either the CLI or the UI.

In the `truffle-config.js` configuration file, update the *development* network with your Ganache settings. Then run:

* `truffle compile`
* `truffle migrate`
* `truffle exec .\scripts\issue-token.js # will issue dummy tokens to the users`

## Run the project

* `npm start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Other commands

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
