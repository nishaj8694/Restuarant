import React from 'react';
import { useSelector } from 'react-redux';
import './myOrder.css'

function MyOrder() {

  const order = useSelector(state => state.adminorder.adminorder);
  let count = useSelector(state => state.adminorder.count);

  const handleCount=()=>{
    console.log('clokk')
    count=count-1;
  }

  return (
    <div className='myOrder'>
       {
        order.length>0?(order.map((item,index) =>(
            <div key={index} >
                <table style={{border:'1px solid black',borderCollapse:'collapse',}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {item.notification.map((itemOrder,no)=>(
                            <tr key={no}>
                               <td>{itemOrder.id}</td>
                               <td>{itemOrder.Name}</td>
                               <td>{itemOrder.itemNo}</td>
                               <td><p onClick={(event)=>handleCount}>seen</p></td>
                            </tr>                           
                        ))}
                    </tbody>
                </table>
          </div>
          )
        )):<p>No DATA</p>
       }              
    </div>
  );
}

export default MyOrder;
