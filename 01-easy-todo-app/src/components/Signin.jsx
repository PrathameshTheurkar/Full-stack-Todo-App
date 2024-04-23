import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Card , Typography} from '@mui/material';

function Signin(){
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
        fullWidth = {true}
        id="outlined-basic" 
        label="Email" 
        variant="outlined" 
        />

        <br /><br />

        <TextField 
        fullWidth = {true}
        id="outlined-basic" 
        label="Password" 
        variant="outlined"
        type = {'password'} 
        />

        <br /><br />
        
        <div style={{display : 'flex' , justifyContent : 'center'}}>
          <Button 
          variant="contained"
          size={'large'}
          >
            SignIn
          </Button>
        </div>      
        </Card>
    </div>
  </>
}

export default Signin;