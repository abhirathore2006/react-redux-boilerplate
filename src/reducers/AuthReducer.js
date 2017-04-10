import {cloneDeep} from 'lodash';
import { LOGIN_SUCCESS} from '../components/login/LoginActions'
export const initialState ={
  isAuthenticated: false
}
export default function authReducer(state=cloneDeep(initialState), action){
  switch(action.type){
    case LOGIN_SUCCESS:
        return {
          isAuthenticated:action.isAuthenticated
        }
    default: return state;
  }
}
