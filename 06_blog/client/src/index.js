import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import {BrowserRouter} from 'react-router-dom';
import { createPromise } from 'redux-promise-middleware'

import reducers from './reducers';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const composeStoreWithMiddleware = applyMiddleware(
  createPromise(),
)(createStore)

ReactDOM.render((
  <Provider store={composeStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
serviceWorker.unregister();
