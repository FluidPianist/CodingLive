import * as ActionTypes from '../ActionTypes';      
import { statusUpdate } from './StatusUpdate';

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

export const logoutUser = () =>async (dispatch) => {
    dispatch(statusUpdate(true,null,''))
    dispatch(requestLogout());
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    localStorage.removeItem('usertype');
    dispatch(receiveLogout());
    dispatch(statusUpdate(false,true,'Logout Successfull!!'));
}

