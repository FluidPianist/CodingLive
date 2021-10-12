import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () =>{
  var user= useSelector(state=>state.auth.user)
  return (
      <div>Hello Candidate , {user}</div>
  )
}

export default Dashboard; 