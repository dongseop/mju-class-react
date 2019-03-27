import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import reducers from './reducers';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

serviceWorker.unregister();
