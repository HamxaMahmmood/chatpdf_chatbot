import logo from './logo.svg';
import './App.css';
import Chatbot from './chatbot/chatbot';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    
    <div className="App">
      
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Chatbot/>}></Route>
        </Routes>
  
      </BrowserRouter>
    </div>
  );
}

export default App;
