import { React, useContext, useEffect, useRef, useState } from 'react';
import axios from "axios";
import { NameContext } from '../App';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

export default function Report() {
  const reportRef = useRef(null);
  const { name } = useContext(NameContext);
  
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  console.log(name);

  const handlePrint = () => {
    if (reportRef.current) {
      window.print();
    }
  };

  const id = localStorage.getItem("id");
  const reportData = name.join("") + "give the report based on the given conversation for the user";

  useEffect(() => {
    
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post("http://localhost:5000/addreport", {
          id,
          input: reportData,
        });
        setData(response.data);
      } catch (msg) { 
        console.log(msg);
      } finally {
        setIsLoading(false);
      }
    }; 
   fetchData();
    
  }, []); 

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f2f2f2' }}>
     
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
          <Spinner animation="grow" variant="light" />
          <Spinner animation="grow" variant="dark" />
        </div>
        </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f2f2f2' }}>
      <div ref={reportRef} style={{ textAlign: 'center', padding: '40px', border: '1px solid #ccc', borderRadius: '10px', maxWidth: '600px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
        <h1 style={{ color: '#007bff', fontSize: '36px', marginBottom: '30px' }}>Report Page</h1>
        <div style={{ padding: '20px', borderRadius: '10px', marginBottom: '30px', backgroundColor: '#f0f0f0', lineHeight: '1.5' }}>

          <p style={{ color: '#666', fontSize: '20px', margin: '5px 0' }}>{data}</p>

        </div>
        <button style={{ background: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background 0.3s', fontSize: '18px', marginRight: '10px' }} onClick={handlePrint}>
          Print Report
        </button>
        <Link to="/interview"><button style={{ background: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background 0.3s', fontSize: '18px' }}>
          Go back home
        </button></Link>
      </div>
    </div>
  );
}
