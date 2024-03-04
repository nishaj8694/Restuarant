import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch} from 'react-redux';
import { ORDER_ADD,ORDER_COMPLETE, ORDER_WAY } from '../../Process/action';
import UseAxios from '../../Process/Axios'
import './order.css'

function Order() {
    // const [data, setData] = useState(null);
    const axiosRequest = UseAxios();
    const basePhotoUrl = 'http://127.0.0.1:8000';
    const dispatch=useDispatch()
    const data=useSelector(state=>state.order.order)

    // console.log(order)

    useEffect(() => {
        axiosRequest.get('hotel/order',)
          .then((response) => {
            // setData(response.data);
            dispatch({type:ORDER_ADD,payload:response.data}) 
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error.message);
          });
      }, []);
 return (
        <div className='order'>
                {data?(
                    <div className='orderBox'>
                        <div className='orderButton'>
                           <span onClick={()=>dispatch({type:ORDER_COMPLETE})}>order complete</span>
                           <span onClick={()=>dispatch({type:ORDER_WAY})}>order onthe way</span>
                        </div>
                        <div className='orderTable'>  
                        {data.map((item, index) => (
                            <table style={{border:'1px solid black',borderCollapse:'collapse',}}>
                                <thead>
                                        <tr className='tabtr'>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th>Item No</th> 
                                            <th>Price</th>
                                            <th>Offer</th>
                                            <th>Amount</th>
                                        </tr>
                                </thead>
                                <tbody>
                                {Object.values(item.order).map((ord, ids) => (
                                    <tr key={index + ids} className='tabtr'>
                                        <td>{ord.foodItem.Name}</td>
                                        <td>
                                            <img src={`${basePhotoUrl}${ord.foodItem.Image}`} style={{
                                                width:'50px',height:'40px'
                                            }} />
                                        </td>
                                        <td>{ord.quantity}</td>
                                        <td>{ord.price}</td>
                                        <td>{ord.offer}</td>
                                        <td>{(ord.price-(ord.offer/100*ord.price))*ord.quantity}</td>
                                    </tr>
                                 
                                   ))}
                                   <tr className='tabtr'>
                                        <td style={{fontWeight:'bold',textAlign:"end"}}>Status</td>
                                        <td colSpan={2} style={{color:'white',textAlign:"center"}}>{item.status}</td>
                                        <td style={{fontWeight:'bold',textAlign:"end"}}>Total</td>
                                        <td colSpan={2} style={{color:'white',textAlign:"center"}}>{item.Total_Price}</td>
                                   </tr>
                              
                                </tbody>
                            </table>

                        ))}
                      </div>  
                    </div> 
               ):<p>not data</p>
            }
        </div>
    )
}

export default Order



  {/* {data.map((item, index) => (
                             <tr>
                                <td style={{fontWeight:'bold',textAlign:"center"}}>
                                    Status
                                </td>
                                <td style={{color:'white',textAlign:"center"}}>{item.status}</td>
                                <td style={{fontWeight:'bold',textAlign:"center"}}>Total</td>
                                <td colSpan={2} style={{color:'white',textAlign:"center"}}>{item.Total_Price}</td>
                            </tr>
                            ))} */}
  {/* <tbody>
                    {data.map((item,index)=>(
                        <tr key={index}>         
                           {item.order.map((ord,ids)=>(
                              <div key={ids}>
                                <td>{ord.foodItem.Name}</td>
                                <td>{ord.quantity}</td>
                                <td>{ord.price}</td>
                                <td>{ord.price*ord.quantity}</td>
                              </div>
                             ))
                            }
                        </tr> 
                      ))
                    }
                    </tbody> */}                           