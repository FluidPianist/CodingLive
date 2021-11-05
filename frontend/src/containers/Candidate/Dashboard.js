import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {getProfile} from '../../redux/Actions/Profile';

const Dashboard = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state=>state.profile);  
  useEffect(()=>{
    dispatch(getProfile());
  },[dispatch])
  
  return (
        <div className="container">
          <div className ="row frh"></div>
          { !profile?
             <div className="vh-height"></div>
             :
             <div className="row m-5">
               Welcome,  {profile.firstname} {profile.lastname}
             </div>
          }
        </div>         
  )
}

export default Dashboard; 