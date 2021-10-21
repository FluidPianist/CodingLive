/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import {getapplicationlist,send_appl_status} from '../../redux/Actions/Admin';
import { Card, CardBody, CardText, CardTitle, CardSubtitle,CardHeader,CardFooter, Button} from 'reactstrap';

function ApplicationView(appl){
    const dispatch =useDispatch();
    return(
            <React.Fragment>
                <CardHeader className="h4" >Company Application</CardHeader>     
                <CardBody >
                        <CardTitle className="h5">{appl.firstname} {appl.lastname}</CardTitle>
                        <CardSubtitle>{appl.username}</CardSubtitle>
                        <CardText className="mt-3">
                            Company   &nbsp;&nbsp;: <strong>{appl.companyname}</strong><br/>
                            Position  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <strong>{appl.position}</strong><br/>
                            Phone No  &nbsp;: <strong> {appl.phone} </strong>
                        </CardText>
                </CardBody>
                <CardFooter className="">
                    <Button className="btn-success mr-4" onClick={()=>dispatch(send_appl_status(appl._id,true))} >Accept</Button>
                    <Button className="btn-danger" onClick={()=>dispatch(send_appl_status(appl._id,false))}>Reject </Button>
                </CardFooter>
            </React.Fragment>  
    );
}

function Applications(){
    const dispatch =useDispatch();
    const application_list = useSelector(state=>state.application_list);

    useEffect(()=>{
         dispatch(getapplicationlist());        
    },[])

    if(application_list.length!==0){
        const listview = application_list.map((application)=>{
            return(
                    <Card key={application._id} className="col-11 col-sm-8 p-3 col-md-7 col-lg-5 m-3 " >  
                     {ApplicationView(application)}
                    </Card>       
            );
        })

        return(
            <div className="container">
                <h3 className="my-5 border-bottom">
                    Pending  Applications
                </h3>
                <div className="row justify-content-around">
                  {listview}
                </div>    
            </div>      
        )
    }
    else
     return(
         <h3 className="m-5">List is Empty</h3>
     )
}

export default Applications;