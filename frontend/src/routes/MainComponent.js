import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Home from '../containers/Homepage/HomeComponent';
import Header from '../containers/Homepage/HeaderComponent';
import Footer from '../containers/Homepage/FooterComponent';

 

function Main() {

        return (
            <div>
               <Header/>
               <Switch>
                    <Route exact path='/' component={() => <Home/>} />
                    <Redirect to="/" />
               </Switch>
               <Footer/>
            </div>
        );
}

export default Main;