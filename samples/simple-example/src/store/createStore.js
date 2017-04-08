import { createStore, applyMiddleware, compose } from 'redux';
import { reducer } from './reducer';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { testEpic } from './testEpic';
import { restEpic } from 'robs-fetch';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function createReduxStore() {
  const rootEpic = combineEpics(testEpic, restEpic);
  const epicMiddleware = createEpicMiddleware(rootEpic);

  const enhancers = composeEnhancers(applyMiddleware(epicMiddleware));

  return createStore(reducer, enhancers);
}

