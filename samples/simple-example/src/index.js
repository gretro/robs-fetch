import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createReduxStore } from './store';
import { AppConnected } from './App';
import 'rxjs';
import './index.css';

const store = createReduxStore();

const app = (
  <Provider store={store}>
    <AppConnected />
  </Provider>
);

const appElement = document.getElementById('root');

ReactDOM.render(app, appElement);
