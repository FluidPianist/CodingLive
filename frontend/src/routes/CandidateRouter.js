import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from '../containers/Candidate/Dashboard';
import Header from '../containers/Candidate/Header';

function CandidateRouter(){

  console.log("Inside candidate");
    return(
        <div>
          <Header/>
          <Switch>
                <Route exact path='/' component={() => <Dashboard/>} />
                <Redirect to="/" />
          </Switch>
        </div>
    )
}

export default CandidateRouter;