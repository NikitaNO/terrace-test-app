import { createStore, applyMiddleware } from 'redux';
import reducer from './rootReducer';
import { storageMiddleware } from './clientMiddleware';

const store = createStore(
  reducer,
  applyMiddleware(storageMiddleware())
);

export default store;
