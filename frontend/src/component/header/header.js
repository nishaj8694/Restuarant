import React, { useEffect, useState } from 'react'
import './header.css'
import '@fortawesome/fontawesome-free/css/all.css'; // Import the Font Awesome CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; 
import { Link,useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import { LogoutUser,ADMINORDER_ADD } from '../../Process/action'
import swal from 'sweetalert';


export default function Header() {
  const dispatch=useDispatch()
  const user = useSelector(state => state.role);
  const adorder = useSelector(state => state.adminorder);

  const role = user ? user.role : null; 
  const id = user ? user.user_id : null;
  const orderCount = adorder ? adorder.count : null; 
  
  const logout=()=>{
   dispatch(LogoutUser())
   .then(()=>{
    // history('/', { replace: true });
    window.location.reload(); 

   })
   .catch((error) => {
    console.error('Logout failed:', error);
  });    
  }

  useEffect(() => {
    if (!id) return; 

    const socket = new WebSocket('ws://localhost:8000/ws/chat/' + id+'/');
    
    socket.onopen = () => {
      console.log('Socket is open');
    };

    socket.onmessage = event => {
      const messageData = JSON.parse(event.data);
      dispatch({ type: ADMINORDER_ADD, payload: messageData });
      swal({
        title: 'ORDER is Placed Take a look',
        Button: false,
        timer: 8000 
      });

    };

    socket.onclose = () => {
      console.log('Socket is closed');
    };

    return () => {
      socket.close();
    };
  }, [id]);


  return (
      <div className='Header'>
        <div className='hdicon'>
          {role==='hoteluser' && <Link to={'/admin/'} className='hdP'
              style={{fontSize:'50px',opacity:'0'}}>*</Link>}
          {role==='normaluser' && <Link to={'/user/'} className='hdP'
              style={{fontSize:'50px',opacity:'0'}}>*</Link>}
                  

        </div>
        <div className='hdcontent'>
        
          <p><Link to={'/admin/food'} className='hdP'>Food</Link></p>
          {/* <p><Link to={'/Register'} className='hdP'>Dine</Link></p> */}
          {(role==='normaluser')?<p><Link to={'/user/cart'} className='hdP'>Cart</Link></p>:null}
          <p><Link to={'/admin/profile'} className='hdP'>Profile</Link></p>
          
          {/* <p  className='hdP'>Orders</p> */}
          {(role==='normaluser')?<p><Link to={'/user/order'} className='hdP' >Order</Link></p>:
                     <p><Link to={'/admin/order'} className='hdP' id='loin'>
                      Order{orderCount?(<span id='orderspan'>{orderCount}</span>):null}</Link></p>}
          <p id='login' onClick={logout}>LogOut</p>
          <FontAwesomeIcon  icon={faBars} className='baricon' />
        </div>
      </div>
  )
}
