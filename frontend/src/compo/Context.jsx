import React,{ createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext=createContext();


const Context = ({children}) => {
    const [user,setUser]=useState(null);
    const [flag,setFlag]=useState(0);
useEffect(()=>{
    const getUser=()=>{
       axios.get('http://localhost:8080/get',{withCredentials:true}).then((response)=>{
       //console.log(response.data);
        setUser(response.data.user);
       }).catch((error)=>{console.log(error.message)});

    };
    getUser();
},[flag])
  return (
    <AppContext.Provider value={{user,setUser,flag,setFlag}}>
      {children}
    </AppContext.Provider>
  )
}

export default Context;
