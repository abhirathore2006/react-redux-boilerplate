import {cloneDeep} from 'lodash';
import {SET_USER_DATA} from '../components/home/HomeActions'
export const initialState ={
  data: null
}
export default function homeReducer(state=cloneDeep(initialState), action){
  switch(action.type){
    case SET_USER_DATA:
        return {
          data:action.data
        }
    default: return state;
  }
}
