import { sendMessage } from "../interface";
import "./Chatbot.css";

function Chatbot() {
  return (
    <div>
      <div className="container">
          <h1>💻  CodeGPT</h1>
          <div id="chatbox">
              <div id="messages"></div>
          </div>
          <textarea id="user-input" placeholder="Type your message here..."></textarea>
          <button id="send-button" onClick={ sendMessage }>Enter</button>
      </div>
    </div>
  );
}

export default Chatbot;