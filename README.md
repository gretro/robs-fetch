[![Build Status](https://travis-ci.org/gretro/robs-fetch.svg?branch=master)](https://travis-ci.org/gretro/robs-fetch)

# Redux-Observable fetch (robs-fetch)
Redux-Observable fetch (*robs-fetch*) is a set of redux actions as well as an Epic to allow you to make REST requests easily in a *redux-observable* setup.

It standardise the approach one may use to make *fetch* requests in an elegant fashion.

## Building the project
1. Perform an `npm install` or `yarn install`
2. Run `npm run build` to build the project.
3. Enjoy!

All tests will be run as part of the build.

## Roadmap
 - [x] Setup tests using Jest.
 - [x] Create a basic `fetchEpic`.
 - [ ] Introduce the concept of busy action. 
 - [ ] Create options for `fetchEpic`.

## How to install in your project
```
npm install robs-fetch --save
```
or
```
yarn add robs-fetch
```

## How to setup
1. Follow the [`redux-observable` documentation](https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html) for setting up the middleware.
2. Import the `restEpic` from the `robs-fetch` package.
```
var restEpic = require('robs-fetch').restEpic;
```
ES6 Modules
```
import { restEpic } from 'robs-fetch';
```
3. Insert the `restEpic` in the `rootEpic`.
```
const rootEpic = combineEpics(
  pingEpic,
  restEpic
);
```

### Typescript typings
The Typescript typings are included inside the module. No need for external typings.

## How to dispatch an action
1. Import the `restActions` from the `robs-fetch` module.
```
var restActions = require('robs-fetch').restActions;
```
ES6 Modules
```
import { restActions } from 'robs-fetch';
```
2. Create an action using the `restActions`.
```
const action = restActions.fetchPost({
  url: 'path/to/resource',
  onCompleteAction: 'ACTION_TO_DISPATCH_WHEN_COMPLETE',
  body: {
    // Object to send in the body of the Request (when available).
  }
});
```
3. Dispatch the action in the redux store.
```
store.dispatch(action);
```
4. Setup a reducer to handle the response.
```
const reducer = (state, action) => {
  if (action.type === 'ACTION_TO_DISPATCH_WHEN_COMPLETE') {
    // Alter state here.
    return newState;
  }

  return state;
};
```

## License
 MIT License. See LICENSE file for more details.
