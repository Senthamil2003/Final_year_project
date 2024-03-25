import React, { useEffect, useState, useRef, useContext } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import { useSpeechSynthesis } from "react-speech-kit";
import Report from "./Report";
import { useNavigate } from "react-router-dom";
import { NameContext } from "../App";
import Spinner from "react-bootstrap/Spinner";
export default function SpeechModule() {
  const prompt =
    "hi i am going to give you the entire conversation i am user and you are the assistant, if you need you can also use the previous conversation as reference.Hey you should act as an interviewer and ask questions on the topics data structures easy level. You should ask only one question at a time and ask the next question only after the user answers the first question dont give answer for the question in the middle of the interview.more importantly dont give the answer as (user:some answer) in middle of interview, it is strictly prohibited.and act more like interviewer by giving some casual terms and opinion(not answer).I will also provide the entire conversation, you can use them as reference to avoid asking same questions, count the number of questions you have asked and the remaining number of questions or to ask questions from the previous answer. You should ask a total of 7 questions,exact seven questions must be asked no extra questions are allowed. and add the question number in the begining. Your first response should be your first interview question and once user responds then i will be giving the conversation again for your reference and using it you can ask further questions.";
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const [write, setwrite] = useState("");
  const [isloading, setisloading] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis();

  const { setName } = useContext(NameContext);

  const navigate = useNavigate();

  const handleEnterPress = (event) => {
    if (event.key === "Enter" && !isloading) {
      submit();
    }
  };

  useEffect(() => {
    setwrite(transcript);
  }, [transcript]);

  const submit = async () => {
    try {
      setisloading(true);
      const newdata = data.join("") + " user:" + write + ".";
      console.log(newdata);
      const response = await axios.post("http://localhost:5000/genai", {
        input: prompt + "\n" + newdata,
      });

      setData((prev) => [...prev, "user:" + write + "."]);
      resetTranscript();
      if (count < 10) {
        speak({ text: response.data.content });
      }

      setData((prev) => [...prev, response.data.content]);
      setCount((prev) => prev + 2);
      setwrite("");
    } catch (error) {
      console.log("error", error);
    } finally {
      setisloading(false);
    }
  };
  if (count > 10) {
    setName(data);

    setTimeout(() => {
      navigate("/report");
    }, 3000);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f2f2f2",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">gathering data...</span>
          </Spinner>
          <p>gathering data...........</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "flex-end",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f2f2f2",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
        GENAI Interview
      </h1>
      <div style={{ flex: 1 }}>
        <div
          style={{
            overflowY: "scroll",
            maxHeight: "540px",
            marginBottom: "20px",
            height: "530px",
          }}
        >
          {data.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: i % 2 !== 0 ? "flex-start" : "flex-end",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  backgroundColor: i % 2 !== 0 ? "#d9e1e8" : "#007bff",
                  color: i % 2 !== 0 ? "#333" : "#fff",
                  padding: "10px",
                  borderRadius: "10px",
                  maxWidth: "70%",
                }}
              >
                <p style={{ margin: 0 }}>{item}</p>
              </div>
            </div>
          ))}
        </div>
        {/* <p style={{ textAlign: 'right', margin: 0 ,padding: '10px', borderRadius: '10px' }}>{transcript}</p> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <button
            style={{
              margin: "0 5px",
              padding: "10px 20px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={SpeechRecognition.startListening}
          >
            Start
          </button>
          <button
            style={{
              margin: "0 5px",
              padding: "10px 20px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={SpeechRecognition.stopListening}
          >
            Stop
          </button>
          <input
            value={write}
            type="text"
            style={{
              margin: "0 5px",
              padding: "10px 20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              flex: 1,
            }}
            onKeyPress={handleEnterPress}
            onChange={(e) => setwrite(e.target.value)}
          ></input>
          {!isloading ? (
            <button
              style={{
                margin: "0 5px",
                padding: "10px 20px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={submit}
            >
              Submit
            </button>
          ) : (
            <button
              style={{
                margin: "0 5px",
                padding: "10px 20px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {" "}
              <i class="fa fa-circle-o-notch fa-spin"></i> Loading
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
