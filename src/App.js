import React , { useState , useReducer, useRef, useEffect } from 'react';
import './App.css';

function Todo({ todo , index , id , toggleTodo , removeTodo }){
  return (
      <>
        <div 
          id={`todo-${index}`}
          className='todo' 
          style={{ textDecoration: todo.complete ? "line-through":""}}>
          {todo.text}
          <div>
            <button onClick={() => toggleTodo(id)}>Complete</button>
            <button onClick={() => removeTodo(id)}>X</button>
          </div>
        </div>
      </>
    )
}

function TodoForm({addTodo}){
  
  const [value,setValue] = useState(null);
  const inputRef = useRef();

  const handleSubmit = ( event ) => {
    event.preventDefault();
    addTodo(inputRef.current.value);
    inputRef.current.value = '';
    setValue('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          id="add-todo"
          placeholder='Add Todo...'
          ref={inputRef}
          type="text"
          className="input"
          value={value}
          onChange={ ( event ) => setValue(event.target.value) }/>
      </form>
    </>
  );

}

function App() {

  const initialState = [
    { id: 1 , text: "Learn about React" , complete: false } ,
    { id: 2 , text: "Meet friend for lunch" , complete: false } ,
    { id: 3 , text: "Build really cool todo app" , complete: false }
  ];

  const todoReducer = ( state , action ) => {
    switch( action.type ){
      case 'ADD_TODO' : {
        return ( action.text.length ) ?
        [...state, {
          id: state.length ? Math.max(...state.map(todo => todo.id)) + 1 : 0 ,
          text: action.text ,
          complete: false , 
        }] : state ;
      }
      case 'TOGGLE_COMPLETE' : {
        return state.map( ( item ) => 
          item.id === action.id 
          ? { ...item , complete: !item.complete }
          : item
        )
      }
      case 'DELETE_TODO' : {
        return state.filter( ( item ) => item.id !== action.id );
      }
      case 'CLEAR_TODOS' : {
        return [];
      }
      default: {
        return state;
      }
    }
  };

  const [todos,dispatch] = useReducer( todoReducer , initialState );
  const completedTodos = todos.filter( todo => todo.complete );

  useEffect(()=>{
    document.title = `You have ${completedTodos.length} itens completed!` ;
  });

  const addTodo = ( text ) => {
    dispatch({ type: 'ADD_TODO' , text });
  };

  const toggleTodo = ( id ) => {
    console.log(`Toogle todo with id: ${id}`);
    dispatch({ type: 'TOGGLE_COMPLETE' , id });
  };

  const removeTodo = ( id ) => {
    dispatch({ type: 'DELETE_TODO' , id });
  }

  return (
    <div className="App">
      <div className='todo-list'>
        {todos.map((todo,index) => (
          <Todo 
            key={todo.id}
            index={index}
            id={todo.id}
            todo={todo} 
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}/>
        ))}
        <TodoForm addTodo={addTodo}/>
      </div>
    </div>
  );
}

export default App;
