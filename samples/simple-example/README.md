# Simple example for `robs-fetch`

This project allows you to see how to consume `robs-fetch`. It is quite straight forward as you will see.

## How to start project
You will need NodeJS installed on your machine for this project to work. This project was built using *Node 6.10.1*.

1. Open a terminal in the `simple-example` folder.
2. Run `npm install`
3. Run `npm start`

Your browser will open on `http://localhost:3000` and you will be able to check out the example.

In order to be able to monitor what is going on when an action is dispatched, it is suggested you download and install the [*Redux DevTools for Chrome*](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Areas to check in the project.
 - `src/store/createStore.js`: This file shows you how to add `robs-fetch` to `redux-observable`
 - `src/App/App.js`: This file shows you how to dispatch a REST action (GET in this case).
 - `src/store/reducer.js`: This file shows you how to handle a response coming back from `robs-fetch`.

I hope you enjoy!