import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import allReducers from '../reducers/index';
import allSagas from '../sagas/index';

const storeMiddleWares = [];
storeMiddleWares.push(logger);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};
const persistedReducer = persistReducer(persistConfig, allReducers);
const configureStore = () => {
  // Saga MiddleWare
  const sagaMiddleware = createSagaMiddleware();
  storeMiddleWares.push(sagaMiddleware);

  // Apply all middleWares to Redux Store
  const allMiddleWares = applyMiddleware(...storeMiddleWares);

  // creating a store with reducers and middleWares
  const store = createStore(persistedReducer, allMiddleWares);
  const persiststore = persistStore(store);

  // Running all Worker Sagas
  sagaMiddleware.run(allSagas);

  return { store, persiststore };
};

export default configureStore;
