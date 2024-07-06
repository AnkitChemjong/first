import React,{useState} from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';

const Form = (props) => {
const [data,setData]=useState({
    name:'',
    email:'',
    password:'',
})
const navigate=useNavigate();
const handleChange = (e) => {
const {name,value}=e.target;
setData((prev)=>({...prev,[name]:value}));
}
const handleSubmitReg = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/user', data);
      navigate('/');
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('There was an error!', error);
      // Handle error (e.g., show an error message)
    }
  };
  const handleSubmitlog = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/log', data);
      navigate('/');
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('There was an error!', error);
      // Handle error (e.g., show an error message)
    }
  };
    
  return (
    <div>
      <form className='d-grid justify-content-center align-items-center ' onSubmit={props.type==='signin'? handleSubmitReg:handleSubmitlog}>
      {props.type==='signin'? (

        <h1>Register</h1>
      ):<h1>Login</h1>}
      <div className="mb-3">
  {props.type === 'signin' ? (
    <>
      <label htmlFor="exampleInputEmail1" className="form-label">FullName</label>
      <input type="text" name='userName' onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </>
  ) : null}
</div>

<div className="mb-3">
  <label for="exampleInputEmail1" className="form-label">Email address</label>
  <input type="email" name='email' onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>
<div class="mb-3">
  <label for="exampleInputPassword1" className="form-label">Password</label>
  <input type="password" name='password' onChange={handleChange} className="form-control" id="exampleInputPassword1"/>
</div>
<button type="submit" className="btn btn-primary">{props.type==='signin'? 'Signin':'Login'}</button>
 <Link to='/'><button className='btn mt-4 border-primary rounded-pill'>Home</button></Link>
 </form>
   
    </div>
  )
}

export default Form
