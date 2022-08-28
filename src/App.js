import React from 'react';
import './App.css';

function Todo({ todo , index , completeTodo , removeTodo }){
  return (
      <>
        <div 
          className='todo' 
          style={{ textDecoration: todo.isComplete ? "line-through":""}}>
          {todo.text}
          <div>
            <button onClick={() => completeTodo(index)}>Complete</button>
            <button onClick={() => removeTodo(index)}>X</button>
          </div>
        </div>
      </>
    )
}

function TodoForm({addTodo}){
  
  const [value,setValue] = React.useState(null);

  const handleSubmit = ( event ) => {
    event.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          className="input"
          value={value}
          onChange={ ( event ) => setValue(event.target.value) }/>
      </form>
    </>
  );

}

function App() {

  const [todos,setTodos] = React.useState([
    {text: "Learn about React" , isComplete: false } ,
    {text: "Meet friend for lunch" , isComplete: false } ,
    {text: "Build really cool todo app" , isComplete: false }
  ])

  const addTodo = ( text ) => {
    const newTodos = [ ...todos , { text } ];
    setTodos(newTodos);
  };

  const completeTodo = ( index ) => {
    const newTodos = [...todos] ;
    newTodos[index].isComplete = true ;
    setTodos(newTodos);
  };

  const removeTodo = ( index ) => {
    const newTodos = [...todos];
    newTodos.splice(index,1);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <div className='todo-list'>
        {todos.map((todo,index) => (
          <Todo 
            key={index}
            index={index}
            todo={todo} 
            completeTodo={completeTodo}
            removeTodo={removeTodo}/>
        ))}
        <TodoForm addTodo={addTodo}/>
      </div>
    </div>
  );
}

export default App;
