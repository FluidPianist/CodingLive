import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import CandidateRouter from './CandidateRouter'
import WelcomeRouter from './WelcomeRouter';
import CompanyRouter from './CompanyRouter';
import AdminRouter from './AdminRouter';
import {OAuthConnect} from  '../redux/Actions/Login'
/*extract the Usertype variable from the state.auth and check its value 
  User=null -> load Welcome page
  User=candidate -> load Canddiate section
  User=admin -> load admin section
  User= company -> load company section 
*/


function Main(){
   var auth=useSelector(state=>state.auth);
   const dispatch = useDispatch();

   /**********For Google and Facebook Login*********/
   var x =new URL(document.URL);
   var token=x.searchParams.get("token");
   if(token!==null){ //candidate has logged in using facebook or google
    var username=x.searchParams.get("username");
    var usertype="candidate";
    console.log(token,username,usertype);
    dispatch(OAuthConnect(token,username,usertype));
    window.location="http://localhost:3000"; 
   }
   /*********************************/

   if(auth.usertype==="candidate")
      return( 
        <CandidateRouter/>
      );
    else if(auth.usertype==="company")
      return( 
        <CompanyRouter/>
      );
    else if(auth.usertype==="admin")
      return( 
        <AdminRouter/>
      );
    else
      return( 
        <WelcomeRouter/>
      );   
 }
export default Main;