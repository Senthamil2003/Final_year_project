import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./login.css"
import {  useNavigate } from 'react-router-dom';
function Login() {
  const [mail,smail]=useState("");
  const [password,spassword]=useState("");
  const navigate=useNavigate();

  const login = () => {
    
    axios.post("http://localhost:5000/login",{
      mail: mail,
      password: password
    }
  ).then((response) => {
        console.log(response.data[0][0].role)
         
      
        localStorage.setItem("id",response.data[0][0].id)
        navigate("/home");
      
    }).catch((msg)=>{
      console.log(msg)
     
    })
  }

  function handlesubmit(e){
    e.preventDefault();
  }
  
  return (
    <div className="Auth-form-container">
    <form className="Auth-form" onSubmit={handlesubmit}>
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Login</h3>
        <div className="form-group mt-3">
         
          <input
            type="email"
            className="form-control mt-1"
            placeholder="Enter email"
            onChange={(e)=>smail(e.target.value)}
            value={mail}
          />
        </div>
        <div className="form-group mt-3">
         
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Enter password"
            onChange={(e)=>spassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary" onClick={login}>
            Login
          </button>
        </div>
       
 
        <div className="d-grid gap-2 mt-3">
        <button type="submit" onClick={()=>{navigate("/signup")}} style={{marginBottom:"10%"}}className="btn btn-primary">
            Signup
        </button> 
        </div>
      </div>
    </form>
  </div>

  );
}

export default Login;
