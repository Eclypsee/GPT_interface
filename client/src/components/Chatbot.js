import { sendMessage, downloadCodebase } from "../interface";
import "./Chatbot.css";

function Chatbot() {
  return (
    <div>
      <div className="container">
          <h1>💻  CodeGPT</h1>
          <div className="flex">
            <input type="text" id="codebase-url" placeholder="Enter codebase URL"></input>
            <button id="download-button" onClick={ downloadCodebase }>Download</button>
          </div>
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
