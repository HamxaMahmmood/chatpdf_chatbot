import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userRole = localStorage.getItem('role');
  const navigate = useNavigate();

  

  

  

  return (
    <nav>
      <Link to="/" className="title">
        Embedded Chatbot using RAG
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
   
      {userRole && (
        <Link to="/Settings" className="title">
          <img
            src="https://th.bing.com/th/id/R.ae68a6da3633369482b25a3ad0836885?rik=Briz%2fuyfS5axCQ&pid=ImgRaw&r=0"
            alt="Profile"
            style={{ height: '30px', width: '30px', borderRadius: '50%' }}
          />
        </Link>
      )}
    </nav>
  );
};

export default Navbar;