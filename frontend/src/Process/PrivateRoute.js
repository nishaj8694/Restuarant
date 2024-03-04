import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import {useSelector} from 'react-redux';

const PrivateRoute = () => {
  const user=useSelector(state=>state.login.loginPerson)
  return( user ? <Outlet/> :<Navigate to='/login'/>)
};

export default PrivateRoute;