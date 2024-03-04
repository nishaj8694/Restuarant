import React from 'react'
import './cart.css'
import { useSelector,useDispatch} from 'react-redux';
import { CART_REMOVE,CART_DEC,CART_INC } from '../../Process/action';
import UseAxios from '../../Process/Axios'

function Cart() {
  const basePhotoUrl = 'http://127.0.0.1:8000';
//   let cart=JSON.parse(localStorage.getItem('cart'))
  const dispatch=useDispatch()
  let cart=useSelector(state=>state.cart.cart)
  const axiosRequest = UseAxios();

  const removeItem =(index)=>{
    var id=cart[index].id
    cart.splice(index,1)
    localStorage.setItem('cart',JSON.stringify(cart))
    dispatch({type:CART_REMOVE,payload:id})
  }  
  const alterItem =(index,arg)=>{
    if (index >= 0 && index < cart.length) {
        if (arg === 'dec') {
            cart[index].itemNo -= 1;
            if (cart[index].itemNo === 0) {
                cart.splice(index, 1);
            }
            dispatch({type:CART_DEC,payload:cart[index]})
        }
        if (arg === 'inc') {
            cart[index].itemNo += 1;
            dispatch({type:CART_INC,payload:cart[index]})

        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

  }  

  const Purchase=(cart)=>{
    console.log(cart)
    axiosRequest.post('hotel/order',{cart,'option':'cart'})
    .then(response=>{
        console.log(response.status)
    })
    .catch(
        console.log('failded server')
    )
  }
  return (
    <div className='cart'>
        {
           cart&&cart.length>0 ? (
            <div className='cartBox'>
              {/* {console.log(cart)}   */}
            <table style={{border:'1px solid black',borderCollapse:'collapse',}}>
              <thead>
                <tr className='tabtr'>
                  <th>Name</th>
                  <th>Image</th> 
                  <th>Price</th>
                  <th>Item No</th> 
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} className='tabtr'>
                    <td>{item.Name}</td>
                    <td><img src={`${basePhotoUrl}${item.Image}`} 
                       style={{width:'50px',height:'40px',marginBottom:'5px',marginTop:'5px',
                        borderRadius:'5px'}} alt={item.Name} /></td>
                    <td>{item.Price}</td>
                    <td>{item.itemNo}</td>
                    <td>{item.itemNo*item.Price}</td>
                    <td>
                       <button className='btnbutton' onClick={()=>alterItem(index,'dec')}>-</button> 
                       <button className='btnbutton' onClick={()=>alterItem(index,'inc')}>+</button>
                       <button className='btnbutton' onClick={()=>removeItem(index)}>Del</button>
                    </td>
                  </tr>
                ))}
                  <tr className='tabtr'>
                     <td className='amtone' colSpan={3}></td>
                     <td className='amtone' >Total Amount</td>
                     <td className='amtone' >{cart.reduce((sum, item) => sum + (item.Price*item.itemNo), 0)}</td>
                     <td className='amtone'style={{display:'flex',justifyContent:'center',border:'none' }} >
                        <p style={{backgroundColor:'grey',padding:'5px',borderRadius:'5px',width:'50%', }}
                        onClick={()=>Purchase(cart)}>
                            Purchase
                        </p>
                    </td>
                    
                  </tr>                
              </tbody>
            
            </table>
               
            </div>
          ):(<div className='cartBox'> <p>No cart Item </p> </div>)
        }
    </div>
  )
}

export default Cart