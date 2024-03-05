import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from "axios";
import { useSpeechSynthesis } from 'react-speech-kit';

export default function SpeechModule() {    
    const prompt = "hi i am going to give you the entire conversation i am user and you are the assistant and give the answer for the last user's question and give response if you need you can also use the previous conversation as reference.Hey you should act as an interviewer and ask questions on the topics data structures, web development. You should ask only one question at a time and ask the next question only after the user answers the first question. I will also provide the entire conversation, you can use them as reference to avoid asking same questions, count the number of questions you have asked and the remaining number of questions or to ask questions from the previous answer. You should ask a total of 5 questions. Finally you should analyse the response and provide a score out of 10 for the interviewee. Your first response should be your first interview question and once user responds then i will be giving the conversation again for your reference and using it you can ask further questions.";
    const [data, setData] = useState([]);
    const [value,setvalue]=useState("");
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const { speak } = useSpeechSynthesis();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const submit = async () => {
     
            try {
               
              const newdata = data.join("") + " user:" + transcript + ".";
              const response = await axios.post("http://localhost:5000/genai", {
                input: prompt + "\n" + newdata,
              });

              setData(prev => [...prev, "user:" + transcript + "."]); 
              resetTranscript();
              
              speak({ text: response.data.content })
              setData(prev => [...prev,  response.data.content]);
            } catch (error) {

              console.log("error", error);
            }
      
          
    };

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            {/* <input type='text' onChange={(e)=>setvalue(e.target.value)}></input> */}
            <button onClick={submit}>Submit</button>
           

            <p className='right'>{transcript}</p>
            {data.map((item, i) => (
                <div key={i}>
                    <div className='container'>
                    <p className={i % 2 !== 0 ? "left" : "right1"}>{item}</p>
                    </div>
                    <br/>
                </div>
              
            ))}

            
        </div>
    );
}