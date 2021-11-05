import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import { getapplicantlist } from '../../redux/Actions/Company';
import { Card, CardBody, CardText, CardTitle, CardSubtitle,CardHeader,CardFooter, Button} from 'reactstrap';
import {send_appl_status} from '../../redux/Actions/Company';

function ApplicantView(appl){
  const dispatch =useDispatch();
  const {id}=useParams();
  return(
          <React.Fragment>
              <CardHeader className="h4 bgc-dark" >Candidate Resume</CardHeader>     
              <CardBody >
                      <CardTitle className="h4">{appl.firstname} {appl.lastname}</CardTitle>
                      <CardSubtitle>{appl.username}<br/>{appl.phone}</CardSubtitle>
                      
                      <CardText className="mt-3">   
                          <div className="row border-bottom my-4">
                             <h4 className="col-11">
                                Education
                              </h4>
                          </div>
                          <div className="row border-bottom my-4">
                             <h4 className="col-11">
                                Skills
                              </h4>
                          </div>
                          <div className="row border-bottom my-4">
                             <h4 className="col-11">
                                Projects
                              </h4>
                          </div>
                          <div className="row border-bottom my-4">
                             <h4 className="col-11">
                                Experience
                              </h4>
                          </div>
                          <div className="row border-bottom my-4">
                             <h4 className="col-11">
                                Achievements
                              </h4>
                          </div>
                          <div className="row border-bottom my-4">
                             <h4 className="col-11">
                                About
                              </h4>
                          </div>
                      </CardText>
              </CardBody>
              <CardFooter className="bg-white">
                  <Button className="btn-primary mr-4" onClick={()=>dispatch(send_appl_status(id,appl._id,true))} >Accept</Button>
                  <Button className="btn-primary " onClick={()=>dispatch(send_appl_status(id,appl._id,false))}>Reject </Button>
              </CardFooter>
          </React.Fragment>  
  );
}


function Applicants(){
   
   const applicants_list= useSelector(state=>state.user_list);
   const dispatch = useDispatch();
   const {id}=useParams();

   useEffect(()=>{
     dispatch(getapplicantlist(id));
   },[dispatch, id])

   if(applicants_list.length!==0){
    const listview = applicants_list.map((applicant)=>{
        return(
                <Card key={applicant._id} className="col-11 m-5 p-3" >  
                 {ApplicantView(applicant)}
                </Card>       
        );
    })

    return(
        <div className="container">
            <div className="row frh"></div>
            <h1 className="mt-5 p-2 border-bottom font-dark">
                Short List Applicants
            </h1>
            <div className="row justify-content-around">
              {listview}
            </div>    
        </div>      
    )
}
else
 return(
    <div className="container vh-height">
        <div className="row frh"></div>
        <div className="row justify-content-center">
            <h3 className="my-5 col-10 p-4 text-center bgc-light">
                There are no pending applications ....
            </h3>
        </div>
    </div>
 )
}

export default Applicants; 