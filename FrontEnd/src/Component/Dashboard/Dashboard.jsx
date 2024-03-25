import React, { useEffect } from 'react'
import Navbar from "../Homepage/navbar";
import axios from "axios"
import { useState } from 'react';
import { Link } from "react-router-dom";
import {  useNavigate } from 'react-router-dom';
function Dashboard() {

    const [data,setData] = useState([]);
    const id = localStorage.getItem("id");
    const navigate=useNavigate();
    useEffect(()=>{

        axios.post("http://localhost:5000/dashboard",{id : id}).then((response)=>{
            console.log(response.data);
            setData(response.data)
        }).catch((error)=>{
            console.log("Error : "+ error)
        })
        
    },[])

    const navigator = () => {
      
      navigate("/interview");
    };

  return (

    <div>
         <Navbar/>
        <div className="container" style={{marginTop : "100px"}}>
         <table class="table  ">
  <thead >
    <tr>
      <th scope="col">Test No</th>
      <th scope="col">Skills</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Functionality</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item,key)=>{
       return <tr>
        <th scope="row">{key+1}</th>
        <td>{item.skill}</td>
        <td>{item.date.slice(0,10)}</td>
        <td>{item.time}</td>
        <td>
        <Link to={`/viewFeedback/${item.id}`} style={{textDecoration : "none"}}>
                                <button className="btn btn-primary" style={{margin:"2%"}} >View Feedback</button>
                                </Link>
            <button className="btn btn-primary" onClick={navigator} style={{margin:"2%"}}>Try again</button>
        </td>
      </tr>
    })}
    
   
  </tbody>
</table>
</div>

        
        </div>
  )
}

export default Dashboard