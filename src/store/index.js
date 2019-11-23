import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

import reducers from './ducks';
import sagas from './sagas';

const middlewares = [];

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({sagaMonitor});

middlewares.push(sagaMiddleware);

const composer = composeWithDevTools(
  __DEV__
    ? compose(
        applyMiddleware(...middlewares),
        console.tron.createEnhancer(),
      )
    : applyMiddleware(...middlewares),
);
const store = createStore(reducers, composer);

sagaMiddleware.run(sagas);

export default store;
