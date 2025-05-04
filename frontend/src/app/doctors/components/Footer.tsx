"use client";

import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section about">
        <h4>About Apollo247</h4>
        <p>Your health, our priority. Trusted healthcare services at your fingertips.</p>
      </div>
      <div className="footer-section help">
        <h4>Help</h4>
        <ul>
          <li>FAQs</li>
          <li>Contact Support</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
      <div className="footer-section policies">
        <h4>Policies</h4>
        <ul>
          <li>Privacy Policy</li>
          <li>Refund Policy</li>
          <li>Cookie Policy</li>
        </ul>
      </div>
      <div className="footer-section social">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <span>🐦</span>
          <span>📘</span>
          <span>📸</span>
        </div>
      </div>
    </footer>
  );
}
