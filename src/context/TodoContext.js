import {createContext,useContext} from "react"
//DEFINING THE BASIC STRUCTURE OF THE TODO APP, THERE WILL BE AN ARRAY OF TODO OBJECTS( EVERY OBJECT HAS AN ID, TODO (NAME) AND COMPLETED(IF COMPLETED THEN TRUE BUT BY DEFAULT FALSE))
//AND THERE WILL BE FUNCTIONS NAMES, THE FUNCTIONS DEFIITIONS WILL BE DEFINED IN THE APP.JSXJUST LIKE WE DID IN THE PREV PROJECT.
//HERE IN THIS PROJECT WE CAN ADD A TODO,EDIT IT, DELETE IT AND TOGGLE IT(COMPLETE-NONCOMPLETE) 
//NOW WE'LL BE ABLE TO ACCESS THESE IN ALL THE COMPONENTS.
export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "Todo msg",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
});

export const useTodo=()=>{
    return useContext(TodoContext)
}

export const TodoProvider=TodoContext.Provider