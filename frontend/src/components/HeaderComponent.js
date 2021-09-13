import React,{Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, Jumbotron, NavItem, 
        Button, Modal, ModalHeader, ModalBody,
        Form, FormGroup, Input, Label} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import logo from '../shared/logo.PNG'

class Header extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        //this.handleLogin = this.handleLogin.bind(this);
        //this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    /*handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();

    }

    handleLogout() {
        this.props.logoutUser();
    }*/

    render(){
        return(
            <React.Fragment >
                <Navbar expand="md" className="navbar-light">
                    <div className="container-fluid">
                        <NavbarToggler color="primary" onClick={this.toggleNav} />
                        <NavbarBrand className="mr-5" href="/">
                        &nbsp;<img src={logo}  width="200" alt ="CodingLive"/>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to='/home'>
                                        <span class="font-weight-bold">Home</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}>
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
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal} >Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit ={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                        innerRef={(input) => this.username = input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="text" id="password" name="password"
                                innerRef={(input) => this.password= input}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember" 
                                    innerRef={(input) => this.remember = input}/>
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
}

export default Header;