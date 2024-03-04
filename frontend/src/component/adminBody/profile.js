import React,{ useEffect, useState } from 'react';
import UseAxios from '../../Process/Axios';
import './profile.css';

function Profile() {
    const axiosRequest = UseAxios();
    const [data,setData]=useState('')
    useEffect(()=>{
        axiosRequest.get('hotel/profile',)      
        .then((response) => {
          console.log('res-data',response.data)  
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
    }, []);

  return (
    <div className='profile'>
        <div className='profileBox'>
            {data ? (
                <div className='profileset'>
                    <p id='pd'>Profile Detaile</p>
                  <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{data[0].first_name}</td>
                        </tr>
                        <tr>
                            <th>Email</th>                    
                            <td>{data[0].email}</td>
                        </tr>
                        <tr>
                            <th>Restaurant</th>
                            <td>{data[1].Name}</td>
                        </tr>
                        <tr>
                            <th>Location</th>                    
                            <td>{data[1].place}</td>
                        </tr>
                        <tr>
                            <th>Addres</th>
                            <td>{data[1].addres}</td>
                        </tr>
                        <tr>
                            <th>Contact</th>                    
                            <td>{data[1].number}</td>
                        </tr>
                    </tbody>
                  </table>  
                  <p id='pdlast'>Edit</p>  
                </div>
            ):
            <p>null</p>
            }
           

        </div>
    </div>
  )
}

export default Profile