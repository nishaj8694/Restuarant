// import React, { useState, useEffect } from 'react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFood,updateoffer } from '../../Process/action';
import UseAxios from '../../Process/Axios';
import { ADDFOOD_SUCCESS,DELETE_FOOD } from '../../Process/action';
import swal from 'sweetalert';
import './admnBody.css';

function AdmnBody() {
    const [data, setData] = useState(null);
    const [offer, setOffer] = useState({});
    const [dataId,setDataid]=useState('')
    const basePhotoUrl = 'http://127.0.0.1:8000';
    const dispatch = useDispatch();
    // const { food, loading, error } = useSelector(state => state.food);
    const food = useSelector(state => state.food.food);
    const axiosRequest = UseAxios();
  
    useEffect(() => {
      axiosRequest.get('hotel/adminmenu',)      
        .then((response) => {
          setData(response.data);
          dispatch({type:ADDFOOD_SUCCESS,payload:response.data})
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
    }, [dispatch]);  

    const upavailble=(id)=>{
        axiosRequest.post('hotel/updateavailble',{'id':id})
        .then((response)=>{
            console.log('avl worked')
        })
        .catch(error => {
            console.error('Error fetching available:', error.message);
          });
    }
    
    const handleupdateoffer=(id)=>{
      const offerValue = offer[id] || '';
      dispatch(updateoffer(id,offerValue))
      .then(
        setOffer(prevState => ({
        ...prevState,
        [dataId]: ''
     })))
      .catch()
  }

    const editmenu=(id)=>{
        axiosRequest.put('hotel/adminmenu',{'id':id})
        .then((response)=>{
            console.log('edit worked')
        })
        .catch(error => {
            console.error('Error fetching available:', error.message);
          });
    }

    const deletemenu=(id)=>{
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover Food item!",
        buttons: ['Cancel','Delete'],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axiosRequest.delete('hotel/adminmenu',{ data: { id: id } })
          .then((response)=>{
          dispatch({type:DELETE_FOOD,payload:id})

        })
        .catch(error => {
            console.error('Error fetching available:', error.message);
          }); 
        } 
      });
        console.log('ids',id)
        
    }
    const handleOfferChange = (id, value) => {
      setOffer(prevState => ({
          ...prevState,
          [id]: value
      }));
      setDataid(id)
  };


  return (
    <>
       <div className="adminBody">
       {food ? (
          food.flat().map((fooditem, index) => {
          let discountedPrice = fooditem.Price; 
          if (fooditem.Offer) {
            const discountAmount = (fooditem.Offer / 100) * fooditem.Price; 
            discountedPrice -= discountAmount; 
         }
       return (
          <div className="cardItem" key={index}>
            {/* {console.log(food)} */}
            {fooditem.Offer ? <div className="offerstar">{fooditem.Offer}%</div> : null}
            <div className="cardimage">
              <img
                src={`${basePhotoUrl}${fooditem.Image}`}
                alt={`Image for ${fooditem.Name}`}
              />
            </div>
            <div className="cardTitle">
              <p>{fooditem.Name}</p>
              <p>
                ₹{discountedPrice}
                {fooditem.Offer ?
                <span style={{ marginLeft: '5px', textDecorationLine: 'line-through' }}>
                  ₹{fooditem.Price?.toFixed(2) ?? 'N/A'}
                </span>
                : null}
              </p>
              <label className="switch">
                <input type="checkbox" defaultChecked={fooditem.Is_available} onClick={() => upavailble(fooditem.id)} />
                <span className="slider round"></span>
              </label>
              <div id='offerdiv'>
                <input type='text' placeholder='OFFER' className='offerText' id={`offerText-${index}`}
                onChange={(e) => handleOfferChange(fooditem.id, e.target.value)}
                value={offer[fooditem.id] || ''} />
      
                <button type='submit' className='offerbtn' id={`offerbtn-${index}`} 
                    onClick={() => handleupdateoffer(fooditem.id)} >send</button>
              </div>
              <button className="bt1" onClick={() => editmenu(fooditem.id)}>Edit</button>
              <button className="bt2" onClick={() => deletemenu(fooditem.id)}>Delete</button>
            </div>
          </div>
       );
    })
  ) : (
     <h3>Loading</h3>
    )}
  </div>
  </>
  )
}

export default AdmnBody