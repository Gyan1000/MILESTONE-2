import React, { useState } from "react";


function TodoList(props)
{
  const[x,setX]=useState(1)
  return(
    <ul className="second-section">
          {/* write code here(list-item) for adding todo number and list item */}
          <li className="list-item"> {props.item}</li>
        
          <li className="status-icon">Status: {(x%2===0)?'Completed':'Pending'}</li>
          
          <li className="update-icons" onClick={()=>{setX(x+1);}}> Update Status</li>  
         
          <li className="remove-icons" onClick={()=>{props.deleteItem(props.index) }}> Remove</li>
              
         </ul>        
    )
}
export default TodoList;
