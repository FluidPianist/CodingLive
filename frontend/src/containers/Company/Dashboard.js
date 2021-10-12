import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () =>{
  var user= useSelector(state=>state.auth.user)
  return (
      <div>Hello Company, {user}</div>
  )
}

export default Dashboard; 