import axios from 'axios';
import { useState } from 'react';
import './chatbot.css'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
function Chatbot() {

  const [sourceId, setsourceId] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [showHeading, setShowHeading] = useState(true); // State variable to manage heading display
  const [loading,setloading] = useState('')

  async function speakText(text) {
  if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;
    synth.cancel(); // Cancel any ongoing speech

    const maxChunkLength = 160; // Adjust this length if needed
    const chunks = text.match(new RegExp(`.{1,${maxChunkLength}}(\\s|$)`, 'g'));

    for (const chunk of chunks) {
      const utterance = new SpeechSynthesisUtterance(chunk);

      await new Promise((resolve, reject) => {
        utterance.onend = resolve;
        utterance.onerror = reject;
        synth.speak(utterance);
      });
    }
  } else {
    console.log('Text-to-speech is not supported in this browser.');
  }
}



  async function handleselect(event) {
    setloading("The pdf is being uploaded...")
    setsourceId("")
    const value = event.target.value;
    setSelectedOption(value);
    // Add your event handling logic here
    if (value === 'pakistan-travel-guide') {


      const config = {
        headers: {
          "x-api-key": "sec_3EGrwL3nar83c47RXpbef8e3Z51Axmxf",
          "Content-Type": "application/json",
        },
      };

      const data = {
        url: "https://embassyofpakistanusa.org/wp-content/uploads/2021/10/Pak_Tourism_Guide-Sept_2021.pdf",
      };

      await axios
        .post("https://api.chatpdf.com/v1/sources/add-url", data, config)
        .then((response) => {
          console.log("Source ID:", response.data.sourceId);
          setsourceId(response.data.sourceId);
        })
        .catch((error) => {
          console.log("Error:", error.message);
          console.log("Response:", error.response.data);
        });
    } else if (value === 'entrepreneurs-guide') {


      const config = {
        headers: {
          "x-api-key": "sec_3EGrwL3nar83c47RXpbef8e3Z51Axmxf",
          "Content-Type": "application/json",
        },
      };

      const data = {
        url: "https://www.efmdglobal.org/wp-content/uploads/The-Entrepreneurs-Guide-to-Building-a-Successful-Business-2017.pdf",
      };
      
      await axios
      .post("https://api.chatpdf.com/v1/sources/add-url", data, config)
      .then((response) => {
        console.log("Source ID:", response.data.sourceId);
        setsourceId(response.data.sourceId);
      })
      .catch((error) => {
        console.log("Error:", error.message);
        console.log("Response:", error.response.data);
      });
    }
    else if (value === 'fine-tuning-llm') {
      
      
      const config = {
        headers: {
          "x-api-key": "sec_3EGrwL3nar83c47RXpbef8e3Z51Axmxf",
          "Content-Type": "application/json",
        },
      };
      
      const data = {
        url: "https://arxiv.org/pdf/2404.10779",
      };
      
      await axios
      .post("https://api.chatpdf.com/v1/sources/add-url", data, config)
      .then((response) => {
        console.log("Source ID:", response.data.sourceId);
        setsourceId(response.data.sourceId);
      })
      .catch((error) => {
        console.log("Error:", error.message);
        console.log("Response:", error.response.data);
        });
    }
    setloading("")
  }


  async function generateAnswer() {
    if (question === "" || sourceId === "") { return }
    setAnswer("Loading...");
    try {
      const config = {
        headers: {
          "x-api-key": "sec_3EGrwL3nar83c47RXpbef8e3Z51Axmxf",
          "Content-Type": "application/json",
        },
      };

      const data = {
        sourceId: sourceId,
        messages: [
          {
            role: "user",
            content: question,
          },
        ],
      };

      await axios
        .post("https://api.chatpdf.com/v1/chats/message", data, config)
        .then((response) => {
          console.log("Result:", response.data.content);
          setAnswer(response.data.content)
          speakText(response.data.content)
        })
        .catch((error) => {
          console.error("Error:", error.message);
          console.log("Response:", error.response.data);
        });
    } catch (error) {
      console.error("Error fetching answer:", error);
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.target.blur(); // Remove focus from the textarea
      generateAnswer();
    }
  }



  return (
    <>
      <Navbar />
      <div className="chatbot">

        <div class="section-title">
          <h2>ChatBot</h2>
          <p>Embedded Chatbot</p>
          <select id="dropdown" value={selectedOption} onChange={handleselect}>
            <option value="">--Please choose a PDF--</option>
            <option value="pakistan-travel-guide">Pakistan travel guide</option>
            <option value="entrepreneurs-guide">Entrepreneurs business guide</option>
            <option value="fine-tuning-llm">Fine Tuning LLMs</option>

          </select>
        </div>
        <div className="loading-pdf">
          {loading && <p className="loading">{loading}</p>}
        </div>
        <div className="chat">
          <div className="message patient-message">
            <p className="text">Select from any of the PDFs above and ask questions about it.</p>
          </div>
          
          {/* Display previous messages here */}
        </div>
        <div className="input">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress} // Call handleKeyPress function when Enter key is pressed
            placeholder="Type your question here..."
          ></textarea>
          <button onClick={generateAnswer}><ArrowUpwardIcon /></button>
        </div>
        <div className="answer-container">
          {answer && <p className="answer">{answer}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Chatbot;