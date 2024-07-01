import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Home = () => {
  const [bdata,setBdata]=useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/items');
        console.log(response);
        setBdata(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItems();
  }, []);
  return (
    <>
    <div>
      <h1>Home</h1>
      <Link to='/form'><button>Form</button></Link>
    </div>
    <div>
      {bdata.map((data)=>{
        return(
          <>
           <div key={data._id}>
            <p>{data.userName}</p>
            <p>{data.email}</p>
            <p>{data.password}</p>
            </div>
          </>
        )
      })}
    </div>
    </>
  )
}

export default Home