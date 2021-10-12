import { baseUrl } from "../../shared/baseUrl";
import { loginUser } from "./Login";
import { statusUpdate } from "./StatusUpdate";
import { actions } from "react-redux-form";


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
};


export const Signup = (SignUpInfo) => (dispatch) => { 
    dispatch(statusUpdate(true,null,''));
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
          var msg =response.json().errmsg
          var error = new Error('Error ' + response.status + ': ' + ((msg)?msg:(response.statusText)));
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
     })
    .then(response=>response.json())  
    .then(response => {
      if(response.success)
        dispatch(actions.reset('SignUpInfo'));
        dispatch(statusUpdate(true,true,"Account Creation Successful!! Now Logging In"))
        setTimeout(()=>{dispatch(loginUser( {username: SignUpInfo.username,password: SignUpInfo.password}))},2000); 
      } 
    )
    .catch(error => dispatch(statusUpdate(false,false,error.message)));
};

