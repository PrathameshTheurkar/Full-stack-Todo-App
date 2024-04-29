/* eslint-disable react/prop-types */
import {Button,  Typography} from '@mui/material';


function Todo({title , description, id}) {
    // Add a delete button here so user can delete a TODO.
    const deleteTodo=()=>{
      fetch('http://localhost:3000/todos/' + id, {
        method : 'DELETE',
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer "+ localStorage.getItem('token')
        }
      })
    }

    return <div>
        <Typography
          variant={'h5'}
        >{title}
        </Typography>

        <Typography
          variant={'h5'}
        >{description}
        </Typography>
  
      
        <Button 
            variant="contained"
            size={'small'}
            onClick={deleteTodo}
        >
          Delete
        </Button>
    </div>
}

export default Todo;