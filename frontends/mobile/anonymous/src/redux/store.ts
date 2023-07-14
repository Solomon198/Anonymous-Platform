import {persistStore, persistReducer} from 'redux-persist';

import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {MMKVLoader} from 'react-native-mmkv-storage';
import rootReducer from './root.reducer';
import rootSaga from './root.saga';

const storage = new MMKVLoader().initialize();

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware],
  });

  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
};
