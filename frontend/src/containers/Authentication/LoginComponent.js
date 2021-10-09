import React from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';
import { loginUser } from '../../redux/Actions/Login';
import {useSelector,useDispatch} from 'react-redux';


function Login(){

    const dispatch = useDispatch();
    
    const auth = useSelector(state=>state.auth);
    
    const handleLogin=(event)=>{  
            dispatch(loginUser({ username: event.target.email.value, password: event.target.password.value}));      
            event.preventDefault();
    }

    return(
        
        <React.Fragment>
            {!auth.isAuthenticated?
                <div className="container ">
                <div className="row justify-content-center">
                    <Form className="col-12 col-md-8 border m-4 p-4" onSubmit={handleLogin}>
                    <div className="col-12 mb-4">
                        <h3>Login</h3>
                    </div>
                        <FormGroup >
                            <Label htmlFor="email">Email</Label>
                            <Input type="text" id="email" name="email"/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="text" id="password" name="password"/>
                        </FormGroup>
                        <Button type ="submit" value="submit">Login</Button>  
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