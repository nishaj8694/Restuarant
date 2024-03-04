import React from 'react'
import Header from './component/header/header';
import Body from './component/Body/body';
import Footer from './component/footer/footer';
import './userHome.css';
import { Outlet } from 'react-router';

export default function userHome() {
  return (
    < div className='userHome'>
     <Header />
     <Outlet />
    </div>
     
    
  )
}