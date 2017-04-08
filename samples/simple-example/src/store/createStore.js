import { createStore } from 'redux';
import { reducer } from './reducer';

export function createReduxStore() {
  return createStore(reducer);
}
