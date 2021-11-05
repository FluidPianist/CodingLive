/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import {getapplicationlist} from '../../redux/Actions/Candidate';
import { Card, CardBody, CardText, CardTitle, CardSubtitle,CardHeader,CardFooter} from 'reactstrap';

function ApplicationView(appl){
  var vacancy=appl.vacancy;  
  return(
            <React.Fragment>
                <CardHeader className="h4 bgc-dark" >Job Application </CardHeader>     
                <CardBody className="p-4">
                        <CardTitle className="h5"> {vacancy.companyname}
                        </CardTitle> 
                        <CardSubtitle>Applied for the Role of {vacancy.position}<br/>
                          </CardSubtitle>
                        <CardText className="row mt-2 mt-md-4 font-short">
                            <div className="col-4 font-weight-bold">
                                Starts at <br/>Duration<br/> Applied on <br/>About Job
                            </div>
                            <div className="col-8 font-italic">
                                {new Intl.DateTimeFormat('en-US', {timeStyle:"medium",dateStyle:"medium"}).format(new Date(Date.parse(vacancy.commencement)))} <br/>
                                {vacancy.duration} minutes <br/>
                                {new Intl.DateTimeFormat('en-US', {timeStyle:"medium",dateStyle:"medium"}).format(new Date(Date.parse(appl.createdAt)))} <br/>
                                {vacancy.description}
                            </div>                                                      
                        </CardText>
                </CardBody>
                <CardFooter className="bg-white h5 text-uppercase font-weight-bold">
                      {appl.status}
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
                    <Card key={application._id} className="col-11 col-sm-8  col-md-7 col-lg-5 m-5 p-3" >  
                     {ApplicationView(application)}
                    </Card>       
            );
        })

        return(
            <div className="container">
                <div className="row frh"></div>
                <h1 className="my-5 p-2 border-bottom font-dark">
                    Past  Applications
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
                    You have not applied anywhere ....
                </h3>
            </div>
        </div>
     )
}

export default Applications;