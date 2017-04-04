import {routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';

export default function configureStore(baseHistory, initialState) {
  const routingMiddleware = routerMiddleware(baseHistory);
  let middlewares = [
    routingMiddleware,
    thunk
  ];

  const composeEnhancers = process.env.NODE_ENV !== 'production' &&
                           window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
  ));
}
