import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/Home';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createOnStorage } from './redux/clientMiddleware';

const onStorage = createOnStorage(store);

window.addEventListener('storage', onStorage);

ReactDOM.render((
  <Provider store={store}>
    <Home />
  </Provider>
), document.getElementById('root'));
