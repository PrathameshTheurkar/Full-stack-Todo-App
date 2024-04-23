import { Button, Typography } from "@mui/material";


function Appbar(){
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
                window.location = '/signin'
            }}
        >SignIn</Button>
        <Button 
            variant={"contained"}
            onClick={()=>{
                window.location = '/signup'
            }}
        >SignUp</Button>
        </div>
    </div>
}

export default Appbar;