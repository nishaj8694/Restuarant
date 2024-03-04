
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Home from './HomePage';
import Food from './component/Body/addFood';
import Register from './component/Body/userRegister';
import LOGIN from './component/login'
import ADMINHOME from './adminHome'
import ADMINBODY from './component/adminBody/admnBody'
import USERHOME from './userHome'
import USERBODY from './component/Body/body'
import ORDER from './component/Body/order'
import CART from './component/Body/cart'
import MYORDER from './component/adminBody/myOrder'
import PROFILE from './component/adminBody/profile'
import PrivateRoute from './Process/PrivateRoute';


function App() {
  const user = useSelector(state => state.role);
  const role = user ? user.role : null; 
  return (
    <div>
      <Router>
       <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<ADMINHOME />} >
            <Route index element={<ADMINBODY />} />
            <Route path="food" element={role==='hoteluser'?<Food />:<LOGIN />} />
            <Route path="profile" element={role==='hoteluser'?<PROFILE />:<LOGIN />} />
            <Route path="order" element={role==='hoteluser'?<MYORDER />:<LOGIN />} />
          </Route>
          <Route path="/user" element={<USERHOME />} >
            <Route index element={<USERBODY />} />
            <Route path="cart" element={role==='normaluser'?<CART />:<LOGIN />} />
            <Route path="order" element={role==='normaluser'?<ORDER />:<LOGIN />} />
            
            {/* <Route path="profile" element={<PROFILE />} /> */}
          </Route>
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LOGIN />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
