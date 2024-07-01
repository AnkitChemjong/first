import './App.css'
import Form from './compo/Form.jsx';
import Home from './compo/Home.jsx';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <Router>
   <Routes>
   <Route path='/' element={<Home/>}></Route>
   <Route path='/form' element={<Form type='signin'/>}></Route>
   </Routes>
    </Router>
  )
}

export default App
