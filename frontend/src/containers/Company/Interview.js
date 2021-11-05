import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button} from 'reactstrap';
import { getinterviewlist } from '../../redux/Actions/User';

function InterviewView(intrv){
  return(
          <React.Fragment>     
              <div className="col-12 row m-0 p-3 col-md-10">
                    <h2 className="col-12 m-0 "> INTERVIEW</h2>
                    <h3 className="col-12 mt-1 mb-4">{intrv.vacancy.companyname}</h3>
                   
                   <div className="col-3 font-weight-bold">
                       For <br/> With <br/>Email <br/><br/><br/> On <br/> Duration 
                    </div>
                    <div className="col-9 font-italic">
                        {intrv.vacancy.position} Role <br/>
                        {intrv.candidate.firstname} {intrv.candidate.lastname}<br/>
                        {intrv.candidate.username} <br/><br/><br/>
                        {new Intl.DateTimeFormat('en-US', {timeStyle:"medium",dateStyle:"medium"}).format(new Date(Date.parse(intrv.vacancy.commencement)))} <br/>
                        {intrv.vacancy.duration} minutes
                    </div>
              </div>
              <div className="col-12 m-0 p-3 bg-white col-md-2 align-self-center">
                  <Button className="btn-primary " onClick={()=>{window.location=intrv.meetinglink}}>Join on {new Intl.DateTimeFormat('en-US', {dateStyle:"medium"}).format(new Date(Date.parse(intrv.vacancy.commencement)))}</Button>
              </div>
          </React.Fragment>  
  );
}


function Interview(){
   
   const interview_list= useSelector(state=>state.interview_list);
   const dispatch = useDispatch();


   useEffect(()=>{
     dispatch(getinterviewlist());
   },[dispatch])

   if(interview_list.length!==0){
    const listview = interview_list.map((interview)=>{
        return(
                <div key={interview._id} className="m-5 bgc-dark row shadow" >  
                    {InterviewView(interview)}
                </div>       
        );
    })

    return(
        <div className="container">
            <div className="row frh"></div>
            <h1 className="mt-5 p-2 border-bottom font-dark">
                Scheduled Interviews
            </h1>
            {listview}
               
        </div>      
    )
}
else
 return(
    <div className="container vh-height">
        <div className="row frh"></div>
        <div className="row justify-content-center">
            <h3 className="my-5 col-10 p-4 text-center bgc-light">
                There are no scheduled Interviews ....
            </h3>
        </div>
    </div>
 )
}

export default Interview; 