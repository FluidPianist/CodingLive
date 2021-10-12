/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, Form, Errors,} from 'react-redux-form';
import { Signup } from '../../redux/Actions/Signup';
import { CheckAvailability } from '../../redux/Actions/Signup';
import {useDispatch} from 'react-redux';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));





function SignUpCandidate(){
   
   const dispatch = useDispatch();       
   function handleSignUp(values){
        dispatch(Signup(values));   
    }

    return(
        
       <div className="container">
           <div className="row justify-content-center ">
               <div className="col-12 text-center m-4">
                   <h3>Candidate SignUp</h3>
               </div>
               <div className="col-12 col-md-8 border">
                   <Form model="SignUpInfo" 
                        onSubmit={(values) => handleSignUp(values)}
                        validators={{
                           '':{ 
                            passwordsMatch: (vals)=>!(vals.c_password)||(vals.password === vals.c_password),
                            required:(vals) => vals.username && vals.username.length,
                            validEmail:(vals) => !(vals.username) || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(vals.username)
                          },
                        }}
                        //asyncValidateOn="change"
                    >
                           
                        <Row className="form-group mt-4 frh">
                            <Label htmlFor="firstname" md={4}>First Name</Label>
                            <Col md={8}>
                                <Control.text model=".firstname" id="firstname" name="firstname"
                                    placeholder="First Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger small"
                                    model=".firstname"
                                    show={{ focus: false}}                               
                                    component="li"
                                    messages={{
                                        required: 'Required ',
                                        minLength: 'Must be greater than 2 characters ',
                                        maxLength: 'Must be 15 characters or less '
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group frh">
                                <Label htmlFor="lastname" md={4}>Last Name</Label>
                                <Col md={8}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger small"
                                        model=".lastname"
                                        show={{ focus: false}}
                                        component="li"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters ',
                                            maxLength: 'Must be 15 characters or less '
                                        }}
                                     />
                                </Col>
                        </Row>
                        <Row className="form-group frh">
                                <Label htmlFor="phone" md={4}>Phone</Label>
                                <Col md={8}>
                                    <Control.text model=".phone" id="phone" name="phone"
                                        placeholder="Phone Number"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(10), maxLength: maxLength(10), isNumber,
                                        }}
                                         />
                                    <Errors
                                        className="text-danger small"
                                        model=".phone"
                                        component="li"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Should have 10 digits',
                                            maxLength: 'Should have 10 digits',
                                            isNumber: 'Must be a number '
                                        }}
                                     />
                                </Col>
                        </Row> 
                        <Row className="form-group frh">
                                <Label htmlFor="username" md={4}>Email</Label>
                                <Col md={8}>
                                    <Control.text model=".username" id="username" name="username"
                                        placeholder="Email"
                                        className="form-control"                                      
                                        asyncValidators={
                                            {
                                                available: (val,done)=> dispatch(CheckAvailability(val))
                                                           .then(response=>done(response.available)),                                                          
                                            }
                                        }  
                                        asyncValidateOn="change"     
                                    />                        
                                    <Errors
                                        className="text-danger small"
                                        model="SignUpInfo"
                                        component="li"
                                        messages={{
                                            validEmail: 'Invalid Email Format ',
                                            required: 'Required '
                                        }}
                                    />
                                    <Errors
                                        className="text-danger small"
                                        model=".username"
                                        component="li"
                                        messages={{                                           
                                            available: 'Email already exists ',                                            
                                        }}
                                    />    
                                </Col>
                            </Row>
                            <Row className="form-group frh">
                                <Label htmlFor="password" md={4}>Create Password</Label>
                                <Col md={8}>
                                    <Control.text model=".password" type="password" id="password" name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(8)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger small"
                                        model=".password"
                                        component="li"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must contain atleast 8 Letters '
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group frh">
                                <Label htmlFor="c_password" md={4}>Confirm Password</Label>
                                <Col md={8}>
                                    <Control.text model=".c_password" type="password" id="c_password" name="c_password"
                                        placeholder="Confirm Password"
                                        className="form-control"
                                        validators={{
                                            required, 
                                        }}
                                         />
                                    <Errors
                                        className="text-danger small"
                                        model=".c_password"
                                        show={{focus: false}}

                                        component="li"
                                        messages={{
                                            required: 'Required ',
                                        }}
                                     />
                                     <Errors model="SignUpInfo"
                                        className="text-danger small"
                                        show={{touched: true, focus: false}}
                                        component="li"
                                        messages={{
                                            passwordsMatch: 'Passwords Must Match'
                                        }}
                                     />  
                                </Col>
                            </Row>             
                            <Row className="form-group text-center">
                                <Col>
                                    <Button type="submit" className="col-6">
                                         Sign In
                                    </Button>
                                </Col>
                            </Row>     
                   </Form>
                     
               </div>
           </div>
       </div>
    )        
}

export default SignUpCandidate;