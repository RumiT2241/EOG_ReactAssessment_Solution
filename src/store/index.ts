import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import sagas from './sagas';
import reducer from './reducers';

// Provides the global redux state through out the project
// TODO: keep this in reducers.ts file as it makes more sense over there
export type IState = ReturnType<typeof reducer>;

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(sagas);
  return store;
};
