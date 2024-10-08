import React, { useState } from 'react';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
  

  const [isMobile, setIsMobile] = useState(false);
  
  return (
    <nav className="navbar">
      <div className="logo">Yaci-Gamerz</div>
      <ul className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setIsMobile(false)}>
        <Link to="/"><li>Home</li></Link>
        <Link to="/news"><li>Gaming-Updates</li></Link> 
        <Link to="/top-release"><li>Top-release</li></Link> 
        <Link to="/free"><li>Free-To-Play</li></Link> 
      </ul>
      <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
      </button>
    </nav>
  );
};

export default Navbar;
