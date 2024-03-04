import axios from 'axios';
import UseAxios from './Axios'
// import { useState } from "react";

export const ADDFOOD_LOAD = 'ADDFOOD_LOAD';
export const ADDFOOD_SUCCESS = 'ADDFOOD_SUCCESS';
export const ADDFOOD_FAIL = 'ADDFOOD_FAIL'
export const UPDATE_OFFER = 'UPDATE_OFFER';
export const UPDATE_MEALS = 'UPDATE_MEALS';
export const SORTED_MEALS = 'SORTED_MEALS';

export const DELETE_FOOD = 'DELETE_FOOD';


export const CREATEUSER_LOAD = 'CREATEUSER_LOAD';
export const CREATEUSER_SUCCESS = 'CREATEUSER_SUCCESS';
export const CREATEUSER_FAIL = 'CREATEUSER_FAIL'

export const LOGIN_LOAD = 'LOGIN_LOAD';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const LOGOUT_LOAD = 'LOGOUT_LOAD';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL'

export const UPDATE_ROLE = 'UPDATE_ROLE';

export const CART_ADD = 'CART_ADD';
export const CART_REMOVE = 'CART_REMOVE';
export const CART_DEC = 'CART_DEC'
export const CART_INC = 'CART_INC'

export const ORDER_ADD = 'ORDER_ADD';
export const ORDER_COMPLETE = 'ORDER_COMPLETE';
export const ORDER_WAY = 'ORDER_WAY';

export const ADMINORDER_ADD = 'ADMINORDER_ADD';
// export const ORDER_COMPLETE = 'ORDER_COMPLETE';
// export const ORDER_WAY = 'ORDER_WAY';



// export const addfood_l =()=>({
//     type: ADDFOOD_LOAD,
// });
// export const addfood_s =(data)=>({
//     type: ADDFOOD_SUCCESS,
//     payload: data,
// });
// export const addfood_f =(data)=>({
//     type: ADDFOOD_FAIL,
//     payload: data,
// });

export const updateoffer =(id,offerValue)=>{
  return async (dispatch)=>{
        // const axiosRequest = UseAxios();
        // dispatch({type:ADDFOOD_LOAD})
        try{
            // const response=await axiosRequest.post('hotel/showmenu',formData)
            console.log('worked as update')
            const response=await axios.post('http://127.0.0.1:8000/hotel/updateoffer',{'id':id,'offer':offerValue})
            console.log('log worked', response.data)
            dispatch({type:UPDATE_OFFER,payload:response.data})
            return response.data 
          }catch(error) {
            dispatch({type:ADDFOOD_FAIL,payload:error.message})
            throw error; 
          };
        }
    }

export const addFood =(formData)=>{
  return async (dispatch)=>{
        const axiosRequest = UseAxios();
        dispatch({type:ADDFOOD_LOAD})
        try{
            console.log('added food worked')
            const response=await axiosRequest.post('hotel/showmenu',formData)
            dispatch({type:ADDFOOD_SUCCESS,payload:response.data})
            return response.data 
          }catch(error) {
            dispatch({type:ADDFOOD_FAIL,payload:error.message})
            throw error; 
          };
        }
    }

    export const getFood =(formData)=>{
      return async (dispatch)=>{
            const axiosRequest = UseAxios();
            dispatch({type:ADDFOOD_LOAD})
            try{
                console.log('added food worked')
                const response=await axiosRequest.get('hotel/adminmenu',formData)
                dispatch({type:ADDFOOD_SUCCESS,payload:response.data})
                return response.data 
              }catch(error) {
                dispatch({type:ADDFOOD_FAIL,payload:error.message})
                throw error; 
              };
            }
        }    

  export const createUser =(formData)=>{
    return async (dispatch)=>{
        dispatch({type:CREATEUSER_LOAD})
        try{
            const response=await axios.post('http://127.0.0.1:8000/logApp/register',formData)
            dispatch({type:CREATEUSER_SUCCESS,payload:response.status}) 
          }catch(error) {
            dispatch({type:CREATEUSER_FAIL,payload:error.message})
          };
        }
    }



    export const loginUser = (formData) => { // <-- Corrected function name
      return async (dispatch) => {
        // const axiosRequest = useAxios(); // <-- Cannot use useAxios here
        dispatch({ type: LOGIN_LOAD });
        try {
          const response = await axios.post('http://127.0.0.1:8000/logApp/api/token/', formData);
          if (response.status === 200) {
            // console.log('tok: ',response.data)
            localStorage.setItem('LoginTokens', JSON.stringify(response.data));
            dispatch({ type: LOGIN_SUCCESS, payload: response.data });
            dispatch({ type: UPDATE_ROLE, payload: response.data });

          } else {
            console.log('failed');
          }
        } catch (error) {
          dispatch({ type: LOGIN_FAIL, payload: error.message });
        }
      };
    };


    export const LogoutUser = ()=>{
      return async (dispatch)=>{
          try{
              localStorage.removeItem("LoginTokens");
              dispatch({type:LOGOUT_SUCCESS,})

            }catch(error) {
              dispatch({type:LOGOUT_FAIL,payload:error.message})
            };
          }
      }  

