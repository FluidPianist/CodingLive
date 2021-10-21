import React,{useState} from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse,NavItem, 
        Button } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import { logoutUser} from '../../redux/Actions/Logout'
import {useDispatch} from 'react-redux';
import logo from '../../shared/logo.PNG';




const Header = () => {


    const dispatch = useDispatch()

    const [isNavOpen,toggleNav]= useState(false);
    const setToggleNav=()=>{
        toggleNav(!isNavOpen);
    }
    
    const handleLogout=()=>{
        dispatch(logoutUser());
    }
    
    return(
        <React.Fragment >
            <Navbar expand="md" className="navbar-light">
                <div className="container-fluid">
                    <NavbarToggler color="primary" onClick={setToggleNav} />
                    <NavbarBrand className="mr-5" href="/">
                    &nbsp;<img src={logo}  width="200" alt ="CodingLive"/>
                    </NavbarBrand>
                    <Collapse isOpen={isNavOpen} navbar>
                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <NavLink className="nav-link" to='/home'>
                                    <span className="font-weight-bold">Dashboard</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <Button  onClick={handleLogout}>
                                    <span className="font-weight-bold">LogOut</span>
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </React.Fragment>
    );
} 

export default Header;