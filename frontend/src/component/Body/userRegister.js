import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { createUser } from '../../Process/action';
import './userRegister.css'

function UserRegister() {

    const[ name,setName]=useState('')
    const[ email,setEmail]=useState('')
    const[ Password,setPasswod]=useState('')
    const[ Conf,setConf]=useState('')
 
    const dispatch=useDispatch();
    const {user,loading,error}=useSelector(state=>state.food)

    const handleSub=(e)=>{
        e.preventDefault();
        if(name==''){
            alert('nothing selected')
        }
        // console.log(formData)
        if(Password === Conf){
            const formData=new FormData();
            formData.append('first_name',name)
            formData.append('email',email)
            formData.append('password',Password)
            
            dispatch(createUser(formData));

            
          }
        }
    return (
        <div className='register'>
           <div className='registerBox' >
                <p>Registration</p>   
                <input type='text' name='name' placeholder='Name' 
                value={name} onChange={(e)=>setName(e.target.value)} />
                <input type='email' name='email' placeholder='Email' 
                value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type='password' name='password' placeholder='Password'
                value={Password} onChange={(e)=>setPasswod(e.target.value)} />
                <input type='password' name='confpassword' placeholder='Conform Password' 
                value={Conf} onChange={(e)=>setConf(e.target.value)} />
                <button type='submit' onClick={handleSub}>submit</button>
           </div>

        </div>
    )
}

export default UserRegister