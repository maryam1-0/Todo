import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext';

function TodoItem({ todo }) {
  
  //NOW EVERY TODO ITEM IN OUR APP HAS A TOGGLE FUNCTIONALITY, IF WE TICK ON IT THAT MEANS IT'SCOMPLETED AND IT'S NOT EDITABLE ANYMORE, IF NOT COMPLETED THEN WE CAN EDIT IT, SO THEREMUST BE SOME STATE TO HANDLE THIS
  //IF WE EDIT, THE TODO MUST BE UPDATED
  //IF WE DELETE THE TODO MUST BE DELETED  FROM THE TODOS LIST

  const[isTodoEditable,setIsTodoEditable]=useState(false)
  
  //when updating a todo
  //actually we're gonna map through the todos that we got their in the App.jsxfromthe context,so we're gon maplike 'todos.map' where we'll get one item/todo in every iteration which is a todo object defined in the TodoContext. so here we destructure that one Todo and we access its property(todo:name) from it
  const[todoMsg,setTodoMsg]=useState(todo.todo)

  //FIRST WE ACCESS ALL REQUIRED THINGS/METHODS FROM THE TODOCONTEXT WHICH IS IN USETODO HOOK 
  const {updateTodo,deleteTodo,toggleComplete}=useTodo()

  //updating a todo,we need to pass todo's id which we need to update and then new todo object which will be overwritten there, in object we first spread the todo object (keep a copy of existing) and then just change one property (todo) of it
const editTodo=()=>{
  updateTodo(todo.id,{...todo,todo:todoMsg})
  setIsTodoEditable(false)
}

const toggle=()=>{
  toggleComplete(todo.id)
}
  return (
      <div
          className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
              todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
          }`}
      >
          <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.completed}
              onChange={toggle}
          />
          <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg ${
                  isTodoEditable ? "border-black/10 px-2" : "border-transparent"
              } ${todo.completed ? "line-through" : ""}`}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              readOnly={!isTodoEditable}
          />
          {/* Edit, Save Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                  if (todo.completed) return;

                  if (isTodoEditable) {
                      editTodo();
                  } else setIsTodoEditable((prev) => !prev);
              }}
              disabled={todo.completed}
          >
              {isTodoEditable ? "📁" : "✏️"}
          </button>
          {/* Delete Todo Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => deleteTodo(todo.id)}
          >
              ❌
          </button>
      </div>
  );
}

export default TodoItem;