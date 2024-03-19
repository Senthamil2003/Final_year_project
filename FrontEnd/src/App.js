import logo from './logo.svg';
import './App.css';
import SpeechModule from './Component/SpeechModule';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Component/Authenticate/Login';
import Homepage from './Component/Homepage';
import Signup from './Component/Authenticate/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
       
            <Router>
                <Routes>
                    <Route path="/home" element={<Homepage />} />
                    <Route path="/" element={<Login/>} />
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/interview" element={<SpeechModule/>} />
                    
                </Routes>
            </Router>
        
    </div>
  );
}

export default App;
