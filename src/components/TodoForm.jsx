import React, { useState } from 'react'
import {useTodo} from '../context/TodoContext'
function TodoForm() {

  //INDIVIDUAL TODO
    const [todo,setTodo]=useState("")

    //NOW WE ACCESS THE ADDTODO METHOD FROM TODOCONTEXT BY USETODO HOOK WE CREATED WHICH RETURNS THE TODOCONTEXT
const {addTodo}=useTodo()

//NOW WHATEVER TODO COMES WE PASS TO ADDTODO WHICH EXPECTS A TODO(DEFINED IN CONTEXT FILE) AND ITS BODY DEFINED IN APP.JSX WHICH TAKES TODO AND ADD IN THE PREV TODOS' LIST
const add=(e)=>{
e.preventDefault();
if(!todo) return;

//NOW WE WANNA PASS TODO TO THE ADDTODO FUNCTIO BUT WE CANT DO IT LIKE THIS:
//addTodo(todo) CUZ THE ADDTODO FUNC IN THE APP.JSX IS EXPECTING A TODO OBJECT TO BE SPREAD SO WE GON GIVE AN OBJECT

//addTodo({id:Date.now(),todo:todo,completed:false})

//OR WE COULD SIMPLIFY IT MORE CUZ THE ADDTODO FUNC IS ALREADY HAVING ID AS DATE.NOW() SO WE CAN REMOVE IT HERE, ALSO THE todo:todo CAN BE ONLY WRITTEN AS 'todo' cuz the name of field and value is same

addTodo({todo,completed:false})
setTodo("") //after adding todo we clean the input field by setting it to empty

}
  return (
      <form onSubmit={add} className="flex">
          <input
              type="text"
              placeholder="Write Todo..."
              className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo} //wiring input with the state
                onChange={(e)=>setTodo(e.target.value)}
          />
          <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
              Add
          </button>
      </form>
  );
}

export default TodoForm;
