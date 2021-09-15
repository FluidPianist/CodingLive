import React,{useState} from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, Jumbotron, NavItem, 
        Button, Modal, ModalHeader, ModalBody,
        Form, FormGroup, Input, Label} from 'reactstrap';
import { NavLink} from 'react-router-dom';
import logo from '../../shared/logo.PNG';
import { loginUser } from '../../redux/Actions/Login';
import { useDispatch, useSelector } from 'react-redux';
//import { useDispatch,useSelector } from 'react-redux';



const Header = () => {

    
    const dispatch = useDispatch();
    const auth = useSelector(state=>state.auth);
    const [isNavOpen,toggleNav]= useState(false);
    const [isModalOpen,toggleModal]= useState(false);

    const setToggleNav=()=>{
        toggleNav(!isNavOpen);
    }

    const setToggleModal=()=>{
        toggleModal(!isModalOpen);
    }

    const handleLogin=(event)=>{
        event.preventDefault();
        setToggleModal();
        dispatch(loginUser({username: event.target.username.value, password: event.target.password.value}));
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
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to='/home'>
                                    <span class="font-weight-bold">Home</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button outline onClick={setToggleModal}>
                                    <span className="fa fa-sign-in fa-lg"></span> Login
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
            <Jumbotron>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-sm-6 text-center">
                            <span class="h2">Lets Code And Get Hired</span><br/>
                            <Button>Get Started</Button>
                        </div>
                        <div className="col-12 col-sm-6 text-center">
                            <p>some image</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <Modal isOpen={isModalOpen} toggle={setToggleModal}>
                <ModalHeader toggle={setToggleModal} >Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleLogin}>
                        <FormGroup >
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username"/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="text" id="password" name="password"/>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="remember" />
                                Remember me
                            </Label>
                        </FormGroup>
                        <Button type ="submit" value="submit">Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
} 

export default Header;