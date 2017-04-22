[![Build Status](https://travis-ci.org/gretro/robs-fetch.svg?branch=master)](https://travis-ci.org/gretro/robs-fetch)
[![robs-fetch](https://img.shields.io/npm/v/robs-fetch.svg)](https://www.npmjs.com/package/robs-fetch)

# Redux-Observable fetch (robs-fetch)
Redux-observable fetch (*robs-fetch*) is a set of redux actions as well as an Epic to allow you to make REST requests easily in a *redux-observable* setup.

It standardise the approach one may use to make *fetch* requests in an elegant fashion.

## Building the project
1. Perform an `npm install` or `yarn install`
2. Run `npm run build` to build the project.
3. Enjoy!

All tests will be run as part of the build.

## Roadmap
 - [x] Setup tests using Jest.
 - [x] Create a basic `fetchEpic`.
 - [x] Create options for `fetchEpic`.
 - [ ] Introduce the concept of busy action. 
 - [ ] Allow to define options on a per-request basis.
 - [ ] Ability to define custom serializers.

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

### Advanced setup
The standard setup is quick and easy for simple cases. However, in real apps, you'll probably need more advanced options. These options can be set up at the epic construction for a global effect on all fetch requests. In a near future, you'll be able to set some options for a single request. Here is how to set it up.

```
import { createRestEpic } from 'robs-fetch';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

const fetchEpic = createRestEpic(options);

// Apply epic to the redux-observable middleware (see redux-observable documentation).
```

#### Options
 * `credentials`: Strategy for the credentials (cookies). See [fetch documentation](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) for possible values.
 * `headers`: An object containing the header values.

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

## Examples
Examples of usage for `robs-fetch` can be found under the *samples* folder.

## License
 MIT License. See LICENSE file for more details.
