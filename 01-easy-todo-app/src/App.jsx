/* eslint-disable react/jsx-key */
import './App.css'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Appbar from './components/Appbar'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'

function App() {
 
  return (
    <>
      <div
        style={{width : '100vw' , height : '100vh' , backgroundColor : '#eeeeee' , position : 'absolute' , padding : '10px'}}
      >
        
        <Appbar/>
        
        <Router>
          <Routes>
            <Route path='/signin' element ={<Signin/>} />
            <Route path='/signup' element ={<Signup/>} />
          </Routes>
        </Router>

      </div>
    </>
  )
}

export default App
