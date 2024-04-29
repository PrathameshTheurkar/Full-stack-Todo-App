import TextField from '@mui/material/TextField';
import {Button, Card } from '@mui/material';
import { useState , useEffect} from 'react'
import Todo from './Todo'


function TodoApp(){
    const [todos, setTodos] = useState([])
    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')

    useEffect(()=>{
      fetch('http://localhost:3000/todos', {
        method : "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization" : "Bearer "+ localStorage.getItem('token')
      } 
      })
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        setTodos(response.todos);
      })
    },[todos])

    const addTodo=()=>{
  
      fetch('http://localhost:3000/todos', {
        method : 'POST',
        body: JSON.stringify({
          title : title,
          description : description,
      }),

      headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization" : "Bearer "+localStorage.getItem('token')
      } 
      })
    }

    return <>

            <div
              style={{display : 'flex' , justifyContent : 'center'}}
            >
              <Card 
              variant = {'outlined'}
              style={{width : '400px' ,padding : '20px' , }}
              >
                <TextField 
                onChange = {(e)=>{
                  setTitle(e.target.value)
                }}
                fullWidth = {true}
                label="Title" 
                variant="outlined" 
                />

                <br /><br />

                <TextField
                onChange = {(e)=>{
                  setDescription(e.target.value)
                }} 
                fullWidth = {true}
                label="Description" 
                variant="outlined"
                />

                <br /><br />
                
                <div style={{display : 'flex' , justifyContent : 'center'}}>
                  <Button 
                  variant="contained"
                  size={'large'}
                  onClick={addTodo}
                  >
                    Add
                  </Button>
                </div>      
                </Card>
            </div>

            <div
              style={{display : 'flex' , justifyContent : 'center' , marginTop : '20px'}}
            >
                <Card 
                  variant = {'outlined'}
                  style={{width : '400px' ,padding : '20px' , }}
                >
                    {todos.map((todo)=>{
                    // eslint-disable-next-line react/jsx-key
                    return <Todo title={todo.title} description={todo.description} id={todo._id.toString()}/>
                    })}
                
                </Card>            
            </div>
    </>
}

export default TodoApp;