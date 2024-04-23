/* eslint-disable react/prop-types */

function Todo({title , description, id}) {
    // Add a delete button here so user can delete a TODO.
    const deleteTodo=()=>{
      fetch('http://localhost:3000/todos/' + id, {
        method : 'DELETE',
        headers : {
          "Content-Type" : "application/json",
        }
      })
    }

    return <div>
        {title}
        {description}
        {/* {id} */}
        <button onClick={deleteTodo}>Delete</button>
    </div>
}

export default Todo;