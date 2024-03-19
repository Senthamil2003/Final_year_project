import React, {  useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom"
import "./login.css"
function Signup() {
  const navigate = useNavigate();
  const [mail,smail]=useState("");
  const [name,sname]=useState("");
  const [password,spassword]=useState("");
  function handlesubmit(e){
    e.preventDefault();
  }
 function submitdata(){
    
  axios.post("http://localhost:5000/signup",{
    name:name,
    mail:mail,
    password:password
  }
).then((response) => {
    navigate("/")
    console.log(response.data)

    
}).catch((msg)=>{
    console.log(msg);
});
 }
  return (
    <div className="Auth-form-container">
    <form className="Auth-form" onSubmit={handlesubmit}>
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Signup</h3>
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
            type="text"
            className="form-control mt-1"
            placeholder="Enter Name"
            onChange={(e)=>sname(e.target.value)}
            value={name}
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
          <button type="submit" onClick={submitdata} className="btn btn-primary">
            Signup
          </button>
        </div>
       
 
  <div className="d-grid gap-2 mt-3">
          <button type="submit" onClick={()=>{navigate("/")}} style={{marginBottom:"10%"}}className="btn btn-primary">
            Login
          </button> 
        
        </div>
      </div>
    </form>
  </div>

  );
}

export default Signup;
