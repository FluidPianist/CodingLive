import React,{useState} from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse,NavItem, 
        } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import logo from '../../shared/logo.png';


const Header = () => {

    const [isNavOpen,toggleNav]= useState(false);
    const setToggleNav=()=>{
        toggleNav(!isNavOpen);
    }
    

    
    return(
        <React.Fragment >
            <Navbar expand="md" className="navbar-light bgc-alt sticky-top">
                <div className="container-fluid">
                    <NavbarToggler color="primary" onClick={setToggleNav} />
                    <NavbarBrand className="mr-5" href="/">
                    &nbsp;<img src={logo}  width="200" alt ="CodingLive"/>
                    </NavbarBrand>
                    <Collapse isOpen={isNavOpen} onClick={setToggleNav} navbar>
                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <NavLink className="nav-link" to='/home'>
                                    <span className="font-weight-bold">Home</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/login'>
                                    <span className="font-weight-bold">Login</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/signup'>
                                    <span className="font-weight-bold">SignUp</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>   
        </React.Fragment>
    );
} 

export default Header;