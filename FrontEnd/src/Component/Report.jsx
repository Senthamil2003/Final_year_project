import {React,useEffect,useRef, useState } from 'react'
import axios from "axios";
export default function Report({item}) {
    const reportRef = useRef(null);
    const [data,setdata]=useState("");
    console.log(item);
    const handlePrint = () => {
        if (reportRef.current) {
          window.print();
        }
      };
    // const id=localStorage.getItem("id");
    // const reportdata=item.join("")+"give the report based on the given conversation for the user"
    // useEffect(()=>{
    //     axios.post("http://localhost:5000/addreport",{
    //         id:id,
    //         input:reportdata
    //       }
    //     ).then((response) => {
    //          console.log(response.data);
            
            
    //       }).catch((msg)=>{
    //         console.log(msg)
    //       })

    // },[])
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f2f2f2' }}>
    <div ref={reportRef} style={{ textAlign: 'center', padding: '40px', border: '1px solid #ccc', borderRadius: '10px', maxWidth: '600px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
      <h1 style={{ color: '#007bff', fontSize: '36px', marginBottom: '30px' }}>Report Page</h1>
      <div style={{ padding: '20px', borderRadius: '10px', marginBottom: '30px', backgroundColor: '#f0f0f0', lineHeight: '1.5' }}>
      
          <p style={{ color: '#666', fontSize: '20px', margin: '5px 0' }}>{item}</p>
      
      </div>
      <button style={{ background: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background 0.3s', fontSize: '18px', marginRight: '10px' }} onClick={handlePrint}>
        Print Report
      </button>
      <button style={{ background: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background 0.3s', fontSize: '18px' }}>
        Go back home
      </button>
    </div>
  </div>
  )
}
