import { useState } from 'react'
import './App.css'
import { TodoProvider } from './context/TodoContext'
import { useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

//TODO APP WITH CONTEXT API AND LOCAL STORAGE
 
//LOCAL STORAGE: IT GETS AND SENDS DATA IN STRINGS, SO WE HAVE TO FIRST CONVERT IT INTO THE JSON FORMAT WHILE GETTING AND CONVERTING OUR JSON INTO STRING WHILE SENDING  
//WE WANT TO HAVE THE TODOS WE ADD OR UPDATE EVEN AFTER WE REFRESH IT
//TO SET ITEMS WE GIVE KEY VALUE PAIRS
//TO GET FROM LOCALSTORAGE WE JUST GIVE THE KEY AND ACCESS THE ITEMS.


//NOW WE WANNA ADD THE FUNCTION DEFNITIONS HERE OF ALL THE TODOFUNCTIONS SO FOR THAT WE FIRST NEED TO WRAP TH ENTIRE COMPONENT WITH THE TODOPROVIDER, AFTER WRAPPING WE'LL BE ABLE TOACCESSTHOSE FUNCTION NAMES AND THEN DEFINE HERE
//NOW WHAT WILL THE PROVIDER PROVIDE? ALL THOSE VALUES WE CREATED IN THE CONTEXT CAN BE ACCESED HERE, WE'LL FIRST ACCESS THOSE AND THEN DEFINE THEIR BODIES HERE

function App() {
  //THIS STATE OF TODOS WILL HAVE ALL THE TODOS, NOT JUST ONE TODO.
  const [todos, setTodos] = useState([]) //by default, empty array 

  //NOW DEFINE FUNCTIONS WITH THE SAME NAMES EXACTLY AS THE PROVIDER IS PROVIDING OTHERWISE THEIR FUNCTIONALITIES WON'TGO IN THE FUNCTIONS DEFINED IN THE PROVIDER
  //THIS ONE TODO IN THE PARAMETER WILL COME FROM THE FORM THAT USER FILLS,AND THIS TODO WILL GO INTO THE TODOS STATE(TODOS ARRAY) THAT WE CREATED ABOVE
  const addTodo=(todo)=>{
    //setTodo(todo) //if we do this then all previous todos will be deleted and this new todo will be set only in the todos list we dont want that
    //AS WE KNOW WE GET A CALLBACK WHERE WE HAVE ACCESSTO THE PREVIOUS ARRAY,SO WE MAKE A NEW ARRAY FROM PREV ARRAY,THAT'LL HAVE OLDOBJECTS WITH ALSO THE NEW ONE WE JUST ADDED
    //SO WE GOTTA PASS OUR NEWLY CREATED TODO AND THE ARRAY THAT CONTAINS THE PREVIOUS ARRAY ELEMENTS USING SPREAD.
    //WECOULD DO THIS: setTodos((prev)=>[todo, ...prev]) BUT THETODO IS NOT JUST A STRING OR NUMBER OR SIMPLE ELEMENT, IT IS AN OBJECT, AND ITS STRUCTURE IS DEFINED IN THE CONTEXT SO WE'RE GONNA HAVE TO PASS THE WHOLE TODO OBJECT HERE WITH ID,NAME AND COMPLETED FLAG
    //FOR DYNAMIC ID EVERYTIME, WE'LL USE DATE.NOW() FUNCTION WHICH WILL GENERATE NEW ID EVERYTIME
    setTodos((prev) => [
      {
        id: Date.now(),
        ...todo,
      },
      ...prev,
    ]);
  }

  //TODO OF WHICH ID AND WHAT NAME(TODO) SHOULD BE UPDATED?
//WE CALL SETTODOS, WE KNOW TODOS IS AN ARRAY SO WE WANNA SEE WHICH TODO'S ID MATCHES WITH THE ID THAT'S COME AS A PARAMETER TO UPDATE,SO WE FIRST TAKE THE PREV STATE OF THE ARRAY AND THEN DO A MAP ON IT, NOW THE MAP HAS EVERY TODO IN THE PREV ARRAY,NOWIF ANY OF THE PREVTODO'S ID MATCHES WITH THE ID THAT'S IN THE PARAMETER, WE USE THE NEW TODO IF DOESNT MATCH THEN WE KEEP THE OLD TODO 
  const updateTodo=(id,todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id ?todo :prevTodo)))

    //WE CAN ALSO WRITE THE ABOVE STATEMENT IN THIS WAY
    // prev.map((eachVal)=>{
    //   if(eachVal.id===id){
    //     todo
    //   }
    //   else
    //   {
    //   prevTodo
    //   }
    // })
  }

  //HERE WE WANNA CREATE A NEW ARRAY OF TODOS THAT HAS ALL THE TODOS EXCEPT THE ONE WHOSE ID IS GIVEN SO WE USE FILTER METHOD
  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((prevTodo)=>prevTodo.id!==id)) //the todos whose ids dont match with the id in the parameter,will come in the new array, and the todo that matches with the id wont be returned
  }

  //HERE WE FIRST WANNA MATCH A TODO WITH THE ID THAT'S GIVEN, IF IT MATCHES WE WANNA TOGGLE THE 'COMPLETED' PROPERTY OF THE TODOS ARRAY
  //FIRST WE'LL ACCESS EVERY TODO IN THE SAME WAY AS WE DID BEFORE AND THEN MATCH THE ID, IF ID MATCHES WE WANT THE PREVIOUS ARRAY AS IT IS EXCEPT FOR ITS 'COMPLETED' PROPERTY, SO WE TAKE PREVIOUS ARRAY THROUGH SPREAD OPERATOR AND THEN TOGGLE THE COMPLETED PROPERTY 
  //PEHLE SARI VALUES LELI SPREAD OPSE PHIR COMPLETED PROPERTY KO OVERRIDE KRDYA
  const toggleComplete=(id)=>{
   setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id ? {...prevTodo,completed: !prevTodo.completed} : prevTodo )) 
  }

  //NOW OUR APP CAN ALREADY HAVE SOME TODOS WHEN WE RELOAD IT OR EXECUTE AGAIN, SO WE WANT A FUNTION TO SEE IF THERE ARE LREADY TODOS IN THE LOCAL STORAGE AND THEN GET THOSE TODOS AND ADD THEM IN THE TODOS ARRAY WE HAVE IN THE STATE, SO WHAT FUNCTION EXECUTES ON THE FIRST RENDER? USEEFFECT.
  //WE CAN DIRECTLY ACCESS LOCALSTORAGE IN REACT, AS FAR AS SERVER SIDE RENDERING IS NOT HAPPENING, CUZ WHEN WE REDERING ON THE SERVER HOW CAN WE ACCESS THE LOCAL STORAGE FROM BROWSER? 

  //GETTING TODOS FROM LOCAL STORAGE
  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))  //getItem gives items in string we want in json so we parse in json format 
    if(todos&&todos.length>0){
      setTodos(todos)
    }
   },[])

   //SETTING TODOS IN LOCAL STORAGE IN KEY VALUE PAIRS
   //NOW LOCAL STORAGE ACCEPTS VALUES AS STRINGS SO WE GONNA STRINGIFY THE JSON VALUE INTO STRING
   useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))  //getItem gives items in string we want in json so we parse in json format 
   },[todos])


  return (
    <TodoProvider value={{todos,addTodo,deleteTodo,updateTodo,toggleComplete}}>
     <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                      {/* here if we use {} in the map funxtion we must return something, () means autoreturn, no brackets mean no return statement */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'>
<TodoItem todo={todo}/>

                            </div>
                        ))} 
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
