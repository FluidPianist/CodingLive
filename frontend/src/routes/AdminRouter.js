import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from '../containers/Admin/Dashboard';
import Header from '../containers/Admin/Header';
import Applications from '../containers/Admin/Applications';
import Users from '../containers/Admin/Users';

function AdminRouter(){

    return(
        <div>
          <Header/>
          <Switch>
                <Route exact path='/' component={() => <Dashboard/>} />
                <Route exact path='/applications' component={() => <Applications/>} />
                <Route exact path='/users' component={() => <Users/>} />
                <Redirect to="/" />
          </Switch>
        </div>
    )
}

export default AdminRouter;