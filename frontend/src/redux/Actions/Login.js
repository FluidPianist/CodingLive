import * as ActionTypes from '../ActionTypes';
import {statusUpdate} from './StatusUpdate';
import { baseUrl } from '../../shared/baseUrl';

//This is the action creator which sets the parameter as such
export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
    }
}
  
export const receiveLogin = (response,creds) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token,
        usertype: response.usertype, 
        creds
    }
}
  
export const loginError = () => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
    }
}


export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API;
    dispatch(requestLogin());
    dispatch(statusUpdate(true,null,''));
    return fetch(baseUrl + 'user/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            console.log(creds.username);
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds.username));
            localStorage.setItem('usertype',response.usertype);
            // Dispatch the success action
            dispatch(receiveLogin(response,creds.username));
            dispatch(statusUpdate(false,true,"Login Successful"));
        } else {
            var error = new Error('Error ' + response.errmsg);
            throw error;
        }
        },
        error => {
            throw error;
        }
    )
    .catch(error => {
        dispatch(loginError());
        dispatch(statusUpdate(false,false,error.message))
    });
};



export const OAuthConnect = (url) => (dispatch) => {
            dispatch(statusUpdate(true,null,''));
            var success=url.searchParams.get("success");            
            dispatch(requestLogin());
            if(success==="true"){
                var token=url.searchParams.get("token");
                var creds=url.searchParams.get("username");
                var usertype=url.searchParams.get("usertype");
                localStorage.setItem('token', token);
                localStorage.setItem('creds', JSON.stringify(creds));
                localStorage.setItem('usertype',usertype);
                var response={
                    token: token,
                    usertype: usertype
                }
                dispatch(receiveLogin(response,creds));
                dispatch(statusUpdate(false,true,'Login Success!!'));
            }
            else{
                var errmsg=url.searchParams.get("errmsg");
                dispatch(loginError());
                dispatch(statusUpdate(false,false,errmsg))
            }
            // We dispatch requestLogin to kickoff the call to the API;   
}