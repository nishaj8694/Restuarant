import React from 'react'
import Header from './component/header/header';
import Body from './component/adminBody/admnBody';
import Footer from './component/footer/footer';
import { Link, Outlet } from 'react-router-dom';
import './adminHome.css';

export default function adminHome() {
  return (
    <div className='adminPage'>
     <Header />  
     <Outlet />
    </div>
     
    
  )
}