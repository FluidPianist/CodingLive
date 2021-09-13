import React, {Component} from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { connect } from 'react-redux';
 

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => ({

});

class Main extends Component {

    render(){
        return (
            <div>
               <Header/>
               <Switch>
                    <Route exact path='/home' component={() => <Home/>} />
                    <Redirect to="/home" />
               </Switch>
               <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));