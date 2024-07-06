import './App.css'
import Signin from './compo/Signin.jsx';
import Login from './compo/Login.jsx';
import Home from './compo/Home.jsx';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <Router>
   <Routes>
   <Route path='/' element={<Home/>}></Route>
   <Route path='/signin' element={<Signin/>}></Route>
   <Route path='/login' element={<Login/>}></Route>
   </Routes>
    </Router>
  )
}

export default App
