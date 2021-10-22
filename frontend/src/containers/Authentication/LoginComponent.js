import React,{useState} from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';
import { loginUser } from '../../redux/Actions/Login';
import { Link } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import ClickNHold from 'react-click-n-hold';

function Login(){

    const dispatch = useDispatch();
    const[showPass,setPass] = useState("password");

    const auth = useSelector(state=>state.auth);
    
    const handleLogin=(event)=>{  
            dispatch(loginUser({ username: event.target.email.value, password: event.target.password.value}));      
            event.preventDefault();
    }

    return(
        
        <React.Fragment>
            {!auth.isAuthenticated?
                <div className="container mt-4 ">
                <div className="row justify-content-center">
                    <Form className="col-11 col-md-7 border m-4 p-5" onSubmit={handleLogin}>
                    <div className="row mb-4">
                        <h3>Login</h3>
                    </div>
                        <FormGroup className="row mb-4" >
                            <Label htmlFor="email">Email</Label>
                            <Input type="text" id="email" name="email"/>
                        </FormGroup>
                        <FormGroup className="row mb-4">
                            <Label htmlFor="password" className="col-12 p-0">Password</Label>
                            <Input type={showPass} id="password" name="password" className="col-10 col-lg-11"/>
                            <ClickNHold className="btn btn-light border col-2 col-lg-1" onStart={()=>setPass("text")} onEnd={()=>setPass("password")}>
                                            <i className="fa fa-eye "></i>
                            </ClickNHold>
                        </FormGroup>
                        <FormGroup className="row mb-4">
                            <Button className="col-4" type ="submit" value="submit">Login</Button>  
                            <Link className="col-8 text-right text-decoration-none" to={`/forgetpassword`}>
                                Forget Password
                            </Link>
                        </FormGroup>    
                    </Form>
                </div>
                </div>
                :
                <div>Login Success</div>
            }
       </React.Fragment>
    )        
}

export default Login;