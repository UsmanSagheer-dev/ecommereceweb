import React, { useState } from 'react';
import './header.css'; 
import InputSearch from '../inputsearch/InputSearch';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <nav>
        <div className="logo">
          <Link to="/">BuyNex.<span>K</span></Link>
        </div>
        <label htmlFor="menu-toggle" className="menu-icon" onClick={handleToggle}>
          &#9776;
        </label>
        <ul className={`menu ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li> 
          <li><Link to="/about">About</Link></li> 
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li> 
          <li className='innerinput'><InputSearch/></li>
        </ul>
        <li className='outerinput'><InputSearch/></li>
      </nav>
    </header>
  );
};

export default Header;
