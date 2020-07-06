import {createStore, compose, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {AsyncStorage} from 'react-native';

import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(reduxThunk)),
);

export const persistor = persistStore(store);
