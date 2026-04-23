import React from 'react';
import './Navbar.css';
import { FiSearch } from 'react-icons/fi';

const Navbar = ({ isDark, onToggleTheme }) => {
  return (
    <nav className={`navbar ${isDark ? 'navbar-dark' : 'navbar-light'}`}>
      <div className="navbar-left">
        <a href="/" className="logo">DevOpsWiKi</a>
      </div>

      <div className="navbar-right">
        <a href="/" className="nav-link">FAQ</a>
        <a href="/" className="nav-link subscribe-btn">Subscribe</a>
        <button className="theme-toggle" onClick={onToggleTheme}>
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;