import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getFood,CART_ADD,ADDFOOD_SUCCESS,
  UPDATE_MEALS,SORTED_MEALS,ADDFOOD_FAIL } from '../../Process/action';
import UseAxios from '../../Process/Axios'
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import './body.css';

 function Body() {
  const [data, setData] = useState(null);
  const [Buydata, setBuyData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [vegnon, setVegnon] = useState(true);

  const [count, setCount] = useState(1);

  const inputElement = useRef();

  const basePhotoUrl = 'http://127.0.0.1:8000';
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.food);
  const food = useSelector(state => state.food.food);
  const axiosRequest = UseAxios();

  useEffect(() => {
    axiosRequest.get('hotel/showmenu',)
      .then((response) => {
        setData(response.data);
        dispatch({type:ADDFOOD_SUCCESS,payload:response.data})

      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
  }, [dispatch]);
  const addedCart=(item)=>{
      let cart=JSON.parse(localStorage.getItem('cart'))||[]
      const itemAdd= cart.some(element => element.id === item.id);
      // if (cart.lenght>0){
      //   itemAdd= cart.some(element => element.id === item.id);
      // } 

      if (itemAdd) {
          const itemExist = cart.find(element => element.id === item.id);
          itemExist.itemNo+=1;
          localStorage.setItem('cart', JSON.stringify(cart));
          let crt=JSON.parse(localStorage.getItem('cart'))
          dispatch({type:CART_ADD,payload:item})
          swal(`Food item ${itemExist.Name} again added to cart`)
                      
      }else {
        item['itemNo']=1
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        let crt=JSON.parse(localStorage.getItem('cart'))
        dispatch({type:CART_ADD,payload:item})
        swal(`Food item ${item.Name} added to cart`)
        // dispatch({type:CART_ADD,payload:item})
    }     
  }

  
  const handleSortChange = (selectedOption) => {
    if (selectedOption === 'Price') {
      dispatch({ type: SORTED_MEALS });
    } 
  };

  const vegtype=()=>{
    setVegnon(!vegnon)
    dispatch({type:UPDATE_MEALS, payload:vegnon})
         
  }

  const Purchase=(buy)=>{
    setBuyData(buy)
    setVisible(true)
   
  }
  const lastPurchase=(buy,count)=>{
    buy['itemNo']=count
    console.log(buy)
    axiosRequest.post('hotel/order',{buy,'option':'buy'})
    .then(response=>{
        setVisible(false)
    })
    .catch(
        setVisible(false)
        // console.log('failded server')
    )
    
  }

 let userLatitude
 let userLongitude

 let closestLocation = null;
 let minDistance = Infinity;

 const handlelocation=()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
      userLatitude = position.coords.latitude;
      userLongitude = position.coords.longitude;
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLatitude},${userLongitude}&key=AIzaSyDQQlQT0ejtLCj0cpQTZbF3B5ejziVjeYI`)
      .then(response => response.json())
      .then(data => {
          console.log(data); 
          var locationName = data.results[0].formatted_address;
      

          var locationElement = document.getElementById("location");
          locationElement.textContent = "Location: " + locationName;
      })
      .catch(error => {
          console.error('Error:', error);
          var locationElement = document.getElementById("location");
          locationElement.textContent = "Error-location";
      });
      


      
      // const locations = [
      //   { name: "Location A", latitude: 21.8781, longitude: 60.6298 },
      //   { name: "Location B", latitude: 25.0522, longitude: 54.2437 },
      //   { name: "Location C", latitude: 40.7749, longitude: 122.4194 }
      // ];
      
      // locations.forEach(location => {
      //   const distance = getKm(userLatitude, userLongitude, location.latitude, location.longitude);
      //   if (distance < minDistance) {
      //       minDistance = distance;
      //       closestLocation = location;
      //   }
      // });

      // var locationElement = document.getElementById("location");
  })
}

function getKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in kilometers
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}



  return (
    // <>  
      <div className="Bodycontent">
      {visible  
           &&<div className='dialogdiv' ref={inputElement}>
                  <div className='dialogbox'>
                    {Buydata ?<div>
                      <table id='tablecont'>
                        <tbody>
                          <tr>
                            <td>
                             <img src={`${basePhotoUrl}${Buydata.Image}`}alt={`Im-${Buydata.Name}`}
                              style={{height:'250px',paddingTop:'15%'}}/>

                              {/* <label>Name{Buydata.Name}</label> */}
                            </td>
                            <td style={{marginTop:'15%',height:'100%'}}>
                              <div className='alogbox'>
                                <tr>
                                  <th>Name</th>
                                  <td>{Buydata.Name}</td>
                                </tr>
                                <tr>
                                  <th>Price</th>
                                  <td>{Buydata.Price}</td>
                                </tr>  
                                <tr style={{borderBottom:'1px solid black',paddingBottom:'10px'}}>
                                  <th>Quantity</th>
                                  <td>
                                    <div className='qnty'>
                                      <button  onClick={()=>{
                                        count>1?setCount(count-1):setCount(count)}
                                        }>-</button>{count} 
                                      <button onClick={()=>setCount(count+1)}>+</button>
                                    </div>
                                    
                                  </td>
                                </tr>
                                <tr>  
                                  <th>Amount</th>
                                  <td>{Buydata.Price*count}</td>
                                </tr>
                                <tr>
                                  <button style={{marginRight:'10px'}}  onClick={()=>{setVisible(false)}}>Cancel</button>
                                  <button onClick={()=>lastPurchase(Buydata,count)}>BUY</button>
                                </tr>
                              </div>
                            </td>

                          </tr>
                        </tbody>
                      </table> 
                    </div>:(
                    <p>No select data</p>)
                    }  
                  </div>        
              </div>
        } 
        {food  ? (
          <div className='BodyBox'>
            <div className='locationDiv'>
              <FontAwesomeIcon icon={faMapMarkerAlt} size="x" color="black" onClick={()=>handlelocation()}/>
              <span id='location'>Location</span>
            </div>
            <div className='Bodyheadbar'>
              <p>Discription</p>
              <div>
                <label className="sitch">
                  <input type="checkbox" onClick={() => vegtype()} />
                  <span className="slder rond"></span>
                </label>
                <select onChange={(event) => handleSortChange(event.target.value)}>
                  <option >Sortby</option>
                  <option value='Name'>Name</option>
                  <option value='Location'>Location</option>
                  <option value='Price'>Price</option>
                </select>
              </div>
            </div>
            <div className='boxContent'>
          {food.map((info, index) => (
            <div className="cadItem" key={index}>
              {info.Offer? <div className="offerstar">{info.Offer}%</div>:null}
              <div className="cardimage">
                <img
                  src={`${basePhotoUrl}${info.Image}`}
                  alt={`Image for ${info.Name}`}
                />
              </div>
              <div className="cardTitle">
                <p>{info.Name}</p>
                <p>
                {info.Offer?
                  ( 
                  <span> ₹{info.Price-(info.Offer/100*info.Price)}  
                     <span style={{ marginLeft: '5px', textDecorationLine: 'line-through' }}>
                     ₹{info.Price}                        
                      </span>
                  </span>
                ):<span>₹{info.Price}</span> }
                </p>
                <button className="bt1" onClick={()=>addedCart(info)} >Add cart</button>
                <button className="bt2" onClick={()=>Purchase(info)}>Buy</button>
              </div>
            </div>
          ))}
          </div>
        </div>) : (
          <h3>Loading</h3>
        )}
      
      </div>
      // <div className="footer">
      //   <p>footer</p>
      // </div>
    // </>
  );
}

export default Body



