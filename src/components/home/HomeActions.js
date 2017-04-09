import AxiosApi from '../../utils/AxiosApi';

export const SET_USER_DATA = 'SET_USER_DATA';

export const getUserData = ()=>{
  return (dispatch,getState)=>{
    AxiosApi.get('https://api.github.com/users/abhirathore2006',null,(response)=>{
      console.log("response from api",response);
      return dispatch({
        type:SET_USER_DATA,
        data:response.data
      })
    },(error)=>{
      console.log("error occured",error);
    })
  }
}
