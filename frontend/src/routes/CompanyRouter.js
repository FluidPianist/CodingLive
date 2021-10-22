import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from '../containers/Company/Dashboard';
import Header from '../containers/Company/Header';
import CopyRightFooter from '../containers/Utility/CopyRightFooter';

function CompanyRouter(){

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

export default CompanyRouter;