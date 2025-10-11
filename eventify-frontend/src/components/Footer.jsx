// src/components/Footer.jsx
import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Eventify. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
