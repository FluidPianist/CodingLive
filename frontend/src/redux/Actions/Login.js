import * as ActionTypes from '../ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

//This is the action creator which sets the parameter as such
export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token,
        usertype: response.usertype 
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API;
    dispatch(requestLogin(creds.username));
    return fetch(baseUrl + 'user/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        }
    )
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            console.log(creds.username);
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds.username));
            localStorage.setItem('usertype',response.usertype);
            // Dispatch the success action
            dispatch(receiveLogin(response));
            console.log("Hello "+creds.username+", "+response.status);
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const OAuthConnect = (token,creds,usertype) => (dispatch) => {
            dispatch(requestLogin(creds));
            localStorage.setItem('token', token);
            localStorage.setItem('creds', JSON.stringify(creds));
            localStorage.setItem('usertype',usertype);
            var response={
                token: token,
                usertype: usertype
            }
            dispatch(receiveLogin(response));
            console.log("Hello "+creds+",You Logged In");
    // We dispatch requestLogin to kickoff the call to the API;   
}