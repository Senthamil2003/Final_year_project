import React, { useState } from 'react';
import axios from 'axios';
import "../../css/resumeUpload.css";
import {  useNavigate } from 'react-router-dom';
function App() {
  const [fileData, setFileData] = useState(null);
  const [skillText,setSkillText] = useState("Null");
  const [technologySkills, setTechnologySkills] = useState([]);
  const navigate=useNavigate();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileData(file);
  };

  const navigator = () => {
    localStorage.setItem("resume",skillText)
    console.log(skillText)
    navigate("/interview");
  };
 
  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('resume', fileData);

    axios.post('http://localhost:5000/resumeExtraction', formData)
      .then(response => {
        console.log('Response from backend:', response.data);
        setTechnologySkills(response.data);
        const joinedString = response.data.join(" ");
        console.log(joinedString)
        setSkillText(joinedString)
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
  };

  return (
    <div className="cont">
      <h2 className="heading">Upload your resume</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button className="upload-button" onClick={handleFileUpload}>Upload</button>
      {technologySkills.length > 0 && (
        <div className="skills-container">
          <h3 className="skills-heading">Technology Skills:</h3>
          <ul className="skills-list">
            {technologySkills.map((skill, index) => (
              <li key={index} className="skill">{skill}</li>
            ))}
          </ul>
         <button onClick={navigator} className='upload-button'>Start interview</button>
        </div>
      )}
    
    {!fileData && (<div><p style={{textAlign:"center"}} >OR</p>
      <h2 className="heading">Type your skills</h2>
      <input type="text" onChange={(e)=>{
        setSkillText(e.target.value)
      }} class="form-control" placeholder="Username" aria-label="Skills" aria-describedby="basic-addon1"></input>
       <button onClick={navigator} className='upload-button'>Start interview</button>
       </div>  )}

    </div>
  );
}

export default App;
