import React,{useState} from "react"
import './App.css';
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";


function App() {
  const [listTodo,setListTodo]=useState([]);
 
  //  CODE FOR ADDING LIST ITEM IN listTodo ARRAY 
   let addList=(inputText)=>{

    if(inputText!=="")
       setListTodo([...listTodo,inputText])
   }
  //  CODE FOR DELETING LIST ITEM
   const deleteListItem=(key)=>{

    let newListItem=[...listTodo];

    newListItem.splice(key,1);

    setListTodo([...newListItem]);
    
   }
   
  return (
    <main className="main-container">

    <section className="center-container">

      <TodoInput addList={addList} />
    <div class="list-container">
       {
           listTodo.map((listItem,i)=>{
            return(
                 <TodoList key={i} index={i} item={listItem} deleteItem={deleteListItem}/>
               )
        })
      }
     </div>

  </section>
  
  </main>
  );
}

export default App;
