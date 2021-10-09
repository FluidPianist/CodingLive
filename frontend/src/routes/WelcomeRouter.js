import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Home from '../containers/Welcome/HomeComponent';
import Header from '../containers/Welcome/HeaderComponent';
import Login from '../containers/Authentication/LoginComponent';
import Footer from '../containers/Welcome/FooterComponent';
import SignUp from '../containers/Authentication/SignUpComponent';
import SignUpCandidate from '../containers/Authentication/SignUpCandidate';
import SignUpCompany from '../containers/Authentication/SignUpCompany';
import OAuth from '../containers/Authentication/OAuth';
function WelcomeRouter(){

    return(
        <div>
          <Header/>
          <Switch>
                <Route exact path='/' component={() => <Home/>} /> 
                <Route exact path='/login' component={()=><React.Fragment><Login/><OAuth/></React.Fragment>}/>
                <Route exact path="/signup" component={()=><SignUp/>}/> 
                <Route exact path="/signup/company" component={()=><React.Fragment><SignUpCompany/><OAuth/></React.Fragment>}/>
                <Route exact path="/signup/candidate" component={()=><React.Fragment><SignUpCandidate/><OAuth/></React.Fragment>}/>
                <Redirect to="/" />             
          </Switch>
          <Footer/>
        </div>
    )
}

export default WelcomeRouter;