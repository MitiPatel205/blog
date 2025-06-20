import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../theme.css';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">My Blog</Link>
        <div className={`navbar-links ${isOpen ? "active" : ""}`}>
          <Link to="/" className="navbar-link" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className="navbar-link" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/blog" className="navbar-link" onClick={() => setIsOpen(false)}>Blog</Link>
          <Link to="/contact" className="navbar-link" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/login" className="navbar-link" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/register" className="navbar-link" onClick={() => setIsOpen(false)}>Register</Link>
        </div>
        <button
          className="navbar-toggle"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="hamburger"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
