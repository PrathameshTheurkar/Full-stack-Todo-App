import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Appbar(){
    const [email , setEmail] = useState(null)
    
    // const history = useHistory();
    const navigate = useNavigate()


    useEffect(()=>{
        fetch('http://localhost:3000/todos/user' ,{
            method : 'GET',
            headers : {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : "Bearer "+ localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(response => {
            if(response.username){
                setEmail(response.username)
            }
            
            console.log(response)
        })
    } , [email])




    if(email != null){
        return <div 
        style = {{
            display : 'flex',
            justifyContent : 'space-between',
        }}
    >
        <Typography variant={"h5"} >TODO-APP</Typography>
        <div 
            style={{
                display : 'flex',
                justifyContent : 'space-between',
                width : '180px'
            }}
        >
        
        <Typography variant={"p"} >{email}</Typography>
        
        <Button 
            variant={"contained"}
            onClick={()=>{
                localStorage.setItem('token' , null)
                setEmail(null)
                navigate('/signin')
                // window.location = '/signin'
            }}
        >Logout</Button>
    
        </div>
    </div>
        
    }

    return <div 
        style = {{
            display : 'flex',
            justifyContent : 'space-between',
        }}
    >
        <Typography variant={"h5"} >TODO-APP</Typography>
        <div 
            style={{
                display : 'flex',
                justifyContent : 'space-between',
                width : '180px'
            }}
        >
        <Button 
            variant={"contained"}
            onClick={()=>{
                navigate('/signin')
                // window.location = '/signin'
                // history.push('/signin');
            }}
        >SignIn</Button>
        <Button 
            variant={"contained"}
            onClick={()=>{
                navigate('/signup')
                // window.location = '/signup'
                // history.push('/signup');
            }}
        >SignUp</Button>
        </div>
    </div>
    
}

export default Appbar;