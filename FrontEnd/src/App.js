import logo from './logo.svg';
import './App.css';
import SpeechModule from './Component/SpeechModule';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Component/Authenticate/Login';
import Homepage from './Component/Homepage';
import Signup from './Component/Authenticate/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from 'react';
import Report from './Component/Report';

export const NameContext = createContext();
const NameContextProvider = ({ children }) => {
  const [name, setName] = useState(["-"]);

  return (
      <NameContext.Provider value={{ name, setName }}>
          {children}
      </NameContext.Provider>
  );
};

function App() {
  return (
    <div className="App">
           <NameContextProvider>
            <Router>
                <Routes>
                    <Route path="/home" element={<Homepage />} />
                    <Route path="/" element={<Login/>} />
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/interview" element={<SpeechModule/>} />
                    <Route path="/report" element={<Report/>} />
                    
                </Routes>
            </Router>
            </NameContextProvider>
        
    </div>
  );
}

export default App;
