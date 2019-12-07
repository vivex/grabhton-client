import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './store/Store';
import Routes from './Routes';
import Theme from './Theme';
import AlertMessageSnackBar from './modules/Commons/containers/AlertMessageSnackBar';
import Header from './modules/Commons/containers/Header';

const storeObject = configureStore();
const { store, persiststore } = storeObject;

const APP_CONFIG = {
  name: 'Grabathon',
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persiststore}>
      <AlertMessageSnackBar />
      <Theme>
        <Header/>
        <Routes appConfig={APP_CONFIG} />
      </Theme>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
