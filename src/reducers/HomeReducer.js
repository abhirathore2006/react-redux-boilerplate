import {cloneDeep} from 'lodash';

export const initialState ={
  title: "you are at home"
}
export default function homeReducer(state=cloneDeep(initialState), action){
  switch(action.type){
    default: return state;
  }
}
