import { baseUrl } from "../../shared/baseUrl";
import * as ActionTypes from '../ActionTypes';
import { loginUser } from "./Login";
export const requestSignup = () => {
  return {
      type: ActionTypes.SIGNUP_REQUEST,
  }
}

export const receiveSignup = () => {
  return {
      type: ActionTypes.SIGNUP_SUCCESS,
  }
}

export const SignupError = () => {
  return {
      type: ActionTypes.SIGNUP_FAILURE,
  }
}

export const Availability = (available) => {
  return {
      type: ActionTypes.EMAIL_STATUS_UPDATE,
      available  
  }
}

export const CheckAvailability = (username) => (dispatch) => { 
  return fetch(baseUrl + 'user/signup/searchemail', {
      method: "POST",
      body: JSON.stringify({username:username}),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
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
   })
  .then(response => response.json())
  .then(response => { 
    console.log("From thunk "+username+" "+response.available);
     dispatch(Availability(response.available))
  })
  .catch(error =>  { alert(error) });
};


export const Signup = (SignUpInfo) => (dispatch) => { 
    dispatch(requestSignup());
    return fetch(baseUrl + 'user/signup/candidate', {
        method: "POST",
        body: JSON.stringify(SignUpInfo),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
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
     })
    .then(response => response.json())
    .then(response => {
      dispatch(receiveSignup()); 
      console.log(response.status);
      dispatch(loginUser( {username: SignUpInfo.username,password: SignUpInfo.password})); 
      } 
    )
    .catch(error =>  { dispatch(SignupError()); alert('Account Could not be Created\nError: '+error.message); });
};

