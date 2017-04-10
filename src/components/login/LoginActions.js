import AxiosApi from '../../utils/AxiosApi';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const authenticate = (loginData)=>{
  return (dispatch,getState)=>{
    AxiosApi.post('/fakeapi/authenticate',loginData,(response)=>{
      console.log("response from api",response);
      return dispatch({
        type:LOGIN_SUCCESS,
        data:response.data,
        isAuthenticated:true
      })
    },(error)=>{
      console.log("error occured",error);
    })
  }
}
