import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createReduxStore } from './store';
import { App } from './App';
import './index.css';

const store = createReduxStore();

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

const appElement = document.getElementById('root');

ReactDOM.render(app, appElement);
