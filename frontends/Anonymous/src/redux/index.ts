import { persistStore, persistReducer } from 'redux-persist'

import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducer.root'
import rootSaga from './saga.root'

const sagaMiddleware = createSagaMiddleware()
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: [sagaMiddleware],
    })

    const persistor = persistStore(store)
    sagaMiddleware.run(rootSaga)
    return { store, persistor }
}
