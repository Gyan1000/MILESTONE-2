import { useState } from "react";

function TodoInput(props)
{
    const [inputText,setInputText]=useState('');
    //FOR INDENTIFING EACH ELEMENT UNIQUELY ,WE ASSIGN A NUMBER THROUGH COUNT 
    const[count,setCount]=useState(1);
      
    return(<div className="input-box-todo">
           
      <input type="text" className="input-style"  onChange={e=>{ setInputText(e.target.value); }} value={inputText}/>

       <button className="add-btn" onClick={()=>
             { 
              
                props.addList(count+". "+inputText);
                setCount(count+1)
                
              //AFTER CLIKING ON ADD BUTTON MAKE INPUT FIELD EMPTY 
                setInputText("");

            }}>Add</button>
            
        </div>)
}
export default TodoInput;