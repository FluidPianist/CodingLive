import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from '../containers/Admin/Dashboard';
import Header from '../containers/Admin/Header';

function AdminRouter(){

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

export default AdminRouter;