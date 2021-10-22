import React , {useState} from 'react';
import {Form,FormGroup,Label,Button} from "reactstrap";
import {useForm} from "react-hook-form";
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {resetPassword} from '../../redux/Actions/PasswordChange'
import ClickNHold from 'react-click-n-hold';


function ResetPassword(){
    const {register,formState: { errors},watch,handleSubmit} = useForm();
    const watchPassword = watch("password", "");
    
    const[showPass,setPass] = useState("password");

    let {token,userId}=useParams();
    const dispatch= useDispatch();
      
    const handledata = (data)=>{
        console.log(data);       
        var response=dispatch(resetPassword(token,userId,data.password));
        console.log(response);
    }
    
    return(
            // eslint-disable-next-line react/jsx-no-comment-textnodes
            <div className="container ">
                <div className="row justify-content-center">
                    <Form className="col-11 col-md-7 border m-4 p-5" onSubmit={handleSubmit(handledata)}>
                        <div className="row mb-4">
                            <h3>Reset Password</h3>
                        </div>

                        <FormGroup className="form-group row mb-4" >
                           <Label htmlFor="password">Enter New Password :</Label>
                           <input type={showPass} className="form-control col-10 col-lg-11" id="password" 
                            {...register("password", {
                             required: "Required",
                             minLength: {
                                value: 8,
                                message: "Should be 8 characters long"
                             }         
                            })} />
                            {errors.password && <li className="text-danger small">{errors.password.message}</li>}
                            <ClickNHold className="btn btn-light border col-2 col-lg-1" onStart={()=>setPass("text")} onEnd={()=>setPass("password")}>
                                            <i className="fa fa-eye "></i>
                            </ClickNHold>
                        </FormGroup>

                        <FormGroup className="form-group row mb-4" >
                           <Label htmlFor="c_password">Confirm New Password :</Label>
                           <input type="password" className="form-control" id="c_password" 
                           {...register("c_password",{
                             required: "Required",
                             validate: value =>
                                value === watchPassword || "Passwords do not match"
                           })} />
                           {errors.c_password && <li className="text-danger small">{errors.c_password.message}</li>}
                        </FormGroup>

                        <FormGroup className=" row mb-4">
                            <Button type="submit" className="col-4">Confirm</Button> 
                        </FormGroup>                            
                    </Form>
                </div>
        </div>   
    )
}

export default ResetPassword;
