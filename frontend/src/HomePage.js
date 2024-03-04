import React,{useEffect} from 'react'
import USERPAGE from './userHome';
import ADMINPAGE from './adminHome';
import LOGIN from './component/login'
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './App.css';
// import './HomePage.css'

export default function HomePage() {

  const navigate=useNavigate()
 
  const user = useSelector(state => state.role);
  const role = user ? user.role : null;

  useEffect(() => {
    // Navigate based on the role when the component mounts
    if(role === 'hoteluser') {
      navigate('/admin');
    }
    
    if(role === 'normaluser'){
      navigate('/user');
    }

    if(role === null){
      navigate('/login')      
    }

  }, [role, navigate]);



  return (
    <div className="App">

      {/* {role==='normaluser' && <USERPAGE />}
      {role==='hoteluser' && {(navigate('/admin'))}}
      {role===null && {(navigate('/admin'))}} */}

    </div>
  )
}
