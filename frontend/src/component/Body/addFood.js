import React, { useState,useRef,useEffect } from 'react'
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import { addFood } from '../../Process/action';
import './addFood.css'

export default function AddFood() {
    const[fdname,setFname]= useState('');
    const[fdprice,setFprice]= useState('');
    const[fdoffer,setfoffer]= useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const[fdavailable,setAvailable]= useState(false);
    const[fimage,setImage]= useState(null);
    const fileInputRef = useRef(null);
    
    

    const dispatch=useDispatch();
    const {food,loading,error}=useSelector(state=>state.food)


    const handleChange = event => {
      const { name, value } = event.target;
      if (name === 'fdname'){
        if(value.length<1){
          console.log('below');
          document.getElementById('fod1').style.translate='5px 100%'
        }
        setFname(value);

      }

      else if (name === 'fdprice'){
          if(value.length<1){
           document.getElementById('fprice1').style.translate='5px 100%'
          }
          setFprice(value);

        }

      else if (name === 'fdoffer'){
          if(value.length<1){
            document.getElementById('foffer1').style.translate='5px 100%'
          }
          setfoffer(value);

        } 
      else if (name === 'fdavailable') setAvailable(value);

    };

    const handlekey = event => {
      const { name, value } = event.target;
      if (name === 'fdname'){
        if(value.length>1){
          document.getElementById('fod1').style.translate='0px 0px'
        }
      }
      if (name === 'fdprice'){
        if(value.length>1){
          document.getElementById('fprice1').style.translate='0px 0px'
        }
      }
      if (name === 'fdoffer'){
        if(value.length>1){
          document.getElementById('foffer1').style.translate='0px 0px'
        }
      }
  }
    
    const handleImage = event => {
      if (event.target.files.length > 0) {
         setImage(event.target.files[0]);
      }
    };

    const handleSubmit=(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('Name', fdname);
        formData.append('Is_available', fdavailable);
        formData.append('Price', fdprice);
        formData.append('Image', fimage);
        
        dispatch(addFood(formData));
      

        setFname('');
        setFprice('');
        setfoffer('');
        setAvailable('');
        setImage(null)
        document.getElementById('fod1').style.translate='5px 100%'
        document.getElementById('fprice1').style.translate='5px 100%'
        document.getElementById('foffer1').style.translate='5px 100%'
    }

  return (
    <div className='foodform'>
        <form className='fdinside' onSubmit={handleSubmit}>
            <h3 id='foodmenu'>Food Menu</h3>
            <label id='fod1'>Name</label>
            <input type='text'  name='fdname' 
            value={fdname} onChange={handleChange} id='fod' onBlur={handlekey} />
            <label id='fprice1'>Price</label>
            <input type='number'  name='fdprice'
            value={fdprice} onChange={handleChange} id='fprice' onBlur={handlekey} />
            <label id='foffer1'>Offer</label>
            <input type='number' name='fdoffer'
            value={fdoffer} onChange={handleChange} id='foffer' onBlur={handlekey} />
            <label id='avl' className='cominput'>Is available
              <div>
                <input type="radio" id="html" name="fdavailable" value={true} onChange={handleChange}   />
                <label >Yes</label>
                <input type="radio" id="css" name="fdavailable" value={false} onChange={handleChange}  />
                <label >No</label>
              </div>     
            </label>
            <labal className='cominput'>Catagory
               <select className='cominside' value={selectedOption} onChange={(e)=>setSelectedOption(e.target.value)}>
                  <option value=''>------------------------------</option>
                  <option value='Breakfast'>Breakfast</option>
                  <option value='Lunge'>Lunge</option>
                  <option value='Dinner'>Dinner</option>
                  <option value='sandwitch and wrapper'>sandwitch and wrapper</option>
                  <option value='Beverages'>Beverages</option>
                  <option value='Dessert<'>Dessert</option>
                </select> 
            </labal>
            <label className='cominput'>Picture 
              <input type='file'  onChange={handleImage} name='fimage' id='im' />
            </label>
            <button type='submit' id='subButton'>submit</button>
        </form>
    </div>
  )
}
