import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {css} from "@emotion/react"
import Message from '../containers/Utility/MsgComponent';
import LoadingOverlay from 'react-loading-overlay';
import RingLoader from 'react-spinners/RingLoader'
import CandidateRouter from './CandidateRouter'
import WelcomeRouter from './WelcomeRouter';
import CompanyRouter from './CompanyRouter';
import AdminRouter from './AdminRouter';
import {OAuthConnect} from  '../redux/Actions/Login';
/*extract the Usertype variable from the state.auth and check its value 
  User=null -> load Welcome page
  User=candidate -> load Canddiate section
  User=admin -> load admin section
  User= company -> load company section 
*/

const override = css`
  display: block;
  margin-bottom: 20%; 

`;


function VIEW(usertype){
  if(usertype==="candidate")
      return( 
        <CandidateRouter/>
      );
    else if(usertype==="company")
      return( 
        <CompanyRouter/>
      );
    else if(usertype==="admin")
      return( 
        <AdminRouter/>
      );
    else
      return( 
        <WelcomeRouter/>
      );
}

function Main(){
   var auth=useSelector(state=>state.auth);
   var status=useSelector(state=>state.status);
   const dispatch = useDispatch();  
  
   var url =new URL(document.URL);
   var oauth=url.searchParams.get("success"); //For OAuth Login , equals null if not used

   /**********For Google and Facebook Login*********/
   if(oauth!==null){ //OauthLogin was attempted
    dispatch(OAuthConnect(url));
    window.history.replaceState(null, "", "/") 
   }
   /*********************************/  

    return(
      <LoadingOverlay
             active={status.isLoading}     
             spinner = {<RingLoader color="white" css={override} size={100}/>} 
             styles={{
              content: (base) => ({
                ...base,
                position: 'fixed',
                left: '45%',
                top: '10%',
                color: 'rgb(169,169,169)'
              }),
              overlay: (base) => ({
                ...base,
                height: '100vh',
                position: 'fixed'
              })
             }}   
             text="Loading... "
      >
        <Message/>
        {VIEW(auth.usertype)}

      </LoadingOverlay>         
    );
 }
export default Main;