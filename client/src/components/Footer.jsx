import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Dr. Appoin</h3>
          <p>Book your doctor appointments online easily and securely.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/doctors">Doctors</a></li>
            <li><a href="/appointments">Appointments</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@drappoin.com</p>
          <p>Phone: +91 1234567890</p>
          <p>Address: 123 Health St, City, Country</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Dr. Appoin. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
