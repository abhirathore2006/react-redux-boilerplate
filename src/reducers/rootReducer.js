import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import homeReducer from './HomeReducer'
import authReducer from './AuthReducer'

const rootReducer = combineReducers({
  routing: routerReducer,
  home: homeReducer,
  authReducer: authReducer
});
export default rootReducer;
