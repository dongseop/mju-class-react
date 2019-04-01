import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createPromise } from 'redux-promise-middleware';


import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';

const composeStoreWithMiddleware = applyMiddleware(
  createPromise({}),
)(createStore);

ReactDOM.render((
  <Provider store={composeStoreWithMiddleware(reducers)}>
    <App/>
  </Provider>
), document.getElementById('root'));
serviceWorker.unregister();

