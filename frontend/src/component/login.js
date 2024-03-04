import React, { useEffect, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Link} from 'react-router-dom';
import { loginUser } from '../Process/action'
import { useNavigate } from 'react-router-dom';
import './login.css'


function Login() {
  const[email,setEmail]= useState('');
  const[password,setPassword]= useState('');
  const history=useNavigate()

  const dispatch=useDispatch();
  const {Person,loading,loginPerson,error}=useSelector(state=>state.login)

  useEffect(() => {
    if (loginPerson) {
      history('/'); // Redirect to home page if user is already logged in
    }
  }, [loginPerson, history]);

  const handleSubmit=(e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    dispatch(loginUser(formData))
    .then(() => {
      history('/');
    })
    .catch((error) => {
      console.error('Login failed:', error);
    });
  
  }
   
  return (
    <div className='logPage' >
     {(console.log(loginPerson))}

        <div className='log'>
            <div className='loginBox'>
                <p id='loginTitle'>LOGIN PAGE</p>
                 <div id='loginBike'></div>
                <input type='text'  placeholder='username/email' name='username'
                 className='loginput' value={email}  onChange={(e)=>setEmail(e.target.value)} />
                <input type='Password' placeholder='Password' name='Password'
                 className='loginput' value={password}  onChange={(e)=>setPassword(e.target.value)} />
                <button id='loginbutton' onClick={handleSubmit}>LOGIN</button>
                <div id='loginforgot'>
                  <Link to={'/Register'}>Forgot Password</Link>
                  <Link to={'/Register'}>Registration</Link>
                </div>
            </div>
        </div>
        <div id='logside'></div>
    </div>
    
  );
}

export default Login;