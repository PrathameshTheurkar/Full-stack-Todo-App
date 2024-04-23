import { useState , useEffect} from 'react'
import Todo from './Todo'


function TodoApp(){
    const [todos, setTodos] = useState([])

    useEffect(()=>{
      fetch('http://localhost:3000/todos')
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        setTodos(response.todos);
      })
    },[todos])

    const addTodo=()=>{
      const Title = document.querySelector('.title').value
      const Description = document.querySelector('.description').value


      fetch('http://localhost:3000/todos', {
        method : 'POST',
        body: JSON.stringify({
          title : Title,
          description : Description,
      }),

      headers: {
          "Content-type": "application/json; charset=UTF-8"
      } 
      })
    }

    return <>

            <h1>Todo App</h1>
            <input type="text" className='title' style={{border : '2px solid black'}}/>
            <input type="text" className='description' style={{border : '2px solid black'}} />
            <button onClick={addTodo}>Add</button>

            {todos.map((todo)=>{
            // eslint-disable-next-line react/jsx-key
            return <Todo title={todo.title} description={todo.description} id={todo._id.toString()}/>
            })}

    </>
}

export default TodoApp;