import { React, useContext, useEffect, useRef, useState } from 'react';
import axios from "axios";

import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import {useParams} from 'react-router-dom'
function ViewFeedback() {
  const reportRef = useRef(null);
  
  const [data, setData] = useState({date : "00-00-00",
time : "00:00,",
report : "-"});
  const [isLoading, setIsLoading] = useState(false);
  

  const handlePrint = () => {
    if (reportRef.current) {
      window.print();
    }
  };

  const userid = localStorage.getItem("id");
  const {id} = useParams();
  const testid = id;
  console.log(id)
  useEffect(() => {
    
   
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        axios.post('http://localhost:5000/getfeedback',{userid, testid}).then((response)=>{
            console.log(response.data)
            setData(response.data[0])
        })
      } catch (msg) {
        console.log(msg);
      } finally {
        setIsLoading(false);
      }
    }; 
   fetchData();
    
  }, []); 

  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', textJustify:"inter-word", alignItems: 'center', alignItems: 'center', paddingTop:"2%", backgroundColor: '#f2f2f2' }}>
      <div ref={reportRef} style={{ textAlign: 'center', padding: '40px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', width:'1200px' }}>
        <h1 style={{ color: '#007bff', fontSize: '36px', marginBottom: '30px' }}>Report </h1>
        <div>
          <h6 style={{textAlign:"left", marginLeft:"25px"}}>Date : {data.date.slice(0, 10)} </h6>
          <h6 style={{textAlign:"left", marginLeft:"25px"}} >Time : {data.time} </h6>
          <h3>Feedback</h3>
        </div>
        <div style={{ padding: '20px', borderRadius: '10px', marginBottom: '30px', backgroundColor: '#f0f0f0', lineHeight: '1.5' }}>

          <p style={{ color: '#666', fontSize: '20px', margin: '5px 0' }}>{data.report}</p>

        </div>
        <button style={{ background: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background 0.3s', fontSize: '18px', marginRight: '10px' }} onClick={handlePrint}>
          Print Report
        </button>
        <Link to="/home"><button style={{ background: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background 0.3s', fontSize: '18px' }}>
          Go back home
        </button></Link>
      </div>
    </div>
  );
}
export default ViewFeedback