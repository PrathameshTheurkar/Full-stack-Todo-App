import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Card , Typography} from '@mui/material';
import { useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Signin(){
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")

  const navigate = useNavigate()

  return <>
      <div style={{ 
        position : 'relative',
        marginTop : '150px'  , 
        marginBottom : '10px',
        display : 'flex',
        justifyContent : 'center'
      }}>
        <Typography variant={'h6'}>
          Welcome to Todo-App. SignIn below
        </Typography>
      </div>

    <div
      style={{display : 'flex' , justifyContent : 'center'}}
    >
      <Card 
      variant = {'outlined'}
      style={{width : '400px' ,padding : '20px' , }}
      >
        <TextField 
        onChange = {(e)=>{
          setEmail(e.target.value)
        }}
        fullWidth = {true}
        label="Email" 
        variant="outlined" 
        />

        <br /><br />

        <TextField 
        onChange = {(e)=>{
          setPassword(e.target.value)
        }}
        fullWidth = {true}
        label="Password" 
        variant="outlined"
        type = {'password'} 
        />

        <br /><br />
        
        <div style={{display : 'flex' , justifyContent : 'center'}}>
          <Button 
            variant="contained"
            size={'large'}
            onClick={()=>{
          
              fetch('http://localhost:3000/todos/signin',{
               method : 'POST',
               body : JSON.stringify({
                 username : email,
                 password : password
               }),
               headers : {
                 "Content-type": "application/json; charset=UTF-8",
               }
              })
              .then(response => response.json())
              .then(response => {
                 localStorage.setItem('token' , response.token)
                 if(response.user == true){
                  navigate('/todos')
                  window.location = '/todos'
                 }
                 
                //  window.location = "/todos"
              })
           }}
          >
            SignIn
          </Button>
        </div>      
        </Card>
    </div>
  </>
}

export default Signin;