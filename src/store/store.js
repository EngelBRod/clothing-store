import { compose ,legacy_createStore as  createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import createSagaMiddleware  from 'redux-saga'

import { rootSaga } from './root-saga'


const loggerMiddleware = ( store ) => (next) => (action) => {
    if(!action.type){
        return next(action)
    }
    console.log('type', action.type);
    console.log('payload:', action.payload);
    console.log('currentState:', store.getState());
    next(action);

    console.log('next state: ', store.getState());
}


const sagaMiddleware = createSagaMiddleware();

const middleWares = [/*import.meta.env.DEV === 'development' &&*/ logger, sagaMiddleware]/*.filter(
    Boolean
  );*/
  
  const composeEnhancer =
    (import.meta.env.PROD !== 'production' &&
      window &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));
  
  export const store = createStore(
    persistedReducer,
    undefined,
    composedEnhancers
  );

  sagaMiddleware.run(rootSaga)
  
  export const persistor = persistStore(store);