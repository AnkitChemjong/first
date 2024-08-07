import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
import { AppContext } from './Context.jsx';

const Home = () => {
  const navigate = useNavigate();
  const {user,flag,setFlag}=useContext(AppContext);
  const [bdata,setBdata]=useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/items');
        //console.log(response);
        setBdata(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItems();
  }, [flag]);
  const deleteCookie=()=>{
    axios.delete('http://localhost:8080/hatawnu',{withCredentials:true}).then((response)=>{
      setFlag(flag+1);
      console.log(response.data.message);
      navigate('/');
      window.alert("cookie is deleted");
      //window.location.reload();

    }).catch((err)=>{console.log("Error deleting cookie")});
  }
  return (
    <>
      <h1>Home</h1>
    {user===null?
    (<div>
      <Link to='/signin'><button className='btn me-4 border-primary rounded-pill'>Create Account.</button></Link>
      <Link to='/login'><button className='btn ms-4 border-primary rounded-pill'>Login</button></Link>
    </div>):<div className='dropdown'> 
     <button className='btn border border-primary rounded-pill dropdown-toggle' data-bs-toggle='dropdown'>{user.userName}</button>
     <ul className='dropdown-menu'>
      <li><button onClick={deleteCookie} type='button' className='dropdown-item'>Logout</button></li>
     </ul>
    </div>
     }
    <table className="table table-striped table-bordered table-hover mt-5">
      <thead>
        <tr>
          <th>First Name</th>
          <th>email</th>
          <th>password</th>
          <th>salt</th>
        </tr>
      </thead>
      <tbody>
      {bdata.map((data)=>{
        return(
        <tr key={data._id}>
          <td>{data.userName}</td>
          <td>{data.email}</td>
          <td>{data.password}</td>
          <td>{data.salt}</td>
        </tr>
        )
      })}
      </tbody>
      </table>
    </>
  )
}

export default Home
