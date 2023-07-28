import React, { useEffect, useState } from 'react'
import axios from 'axios';


function Testing() {
  const [uname,setUname] = useState('');
  const [pass,setPass] = useState('');
  const [data,setData] = useState([]);
  const handleSendClick = async (event) => {
    event.preventDefault();
    const data = {
        username : uname,
        password : pass
    }
    const response = await axios.post('http://localhost:8080/login',data,{"withCredentials":true});
    console.log(response.data);
  }
  
  const handleGetClick = async () => {
    const response = await axios.get('http://localhost:8080/get-details',{
        "withCredentials":true
    });
    const res = response.data;
    setData([res]);
  }
  useEffect(() => {
    handleGetClick();
  },[])
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        Testing Page
        <label htmlFor="Username"> User Name </label>
        <input type="text" name='Username' onInput={(e) => {setUname(e.target.value)}} style={{backgroundColor:"black",color:"white"}} />
        <label htmlFor="Password"> Password </label>
        <input type="text" name='Password' onInput={(e) => {setPass(e.target.value)}}  style={{backgroundColor:"black",color:"white"}} />
        <button onClick={(e) => {handleSendClick(e);}}> Send Details </button>
        <button onClick={(e) => {handleGetClick();}}> Get Details </button>
        {data.length !== 0 ? (
        data.map((item, index) => (
            <div key={index}>
                <p>Username: {item.username}</p>
                <p>Password: {item.password}</p>
            </div>
            ))
        ) : (
            <p>Loading...</p>
        )}
    </div>
  )
}

export default Testing