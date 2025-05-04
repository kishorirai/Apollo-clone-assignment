"use client";

import "../styles/Header.css";

export default function Header() {
  return (
    <div className="header-container">
      <div className="header-inner-container">
        <header className="header">
          <div className="header-left">
            <div className="logo">
              <img src="/apollo247.svg" alt="Apollo247" className="logo-image" />
            </div>
            <div className="location-address-container dropdown">
              <img src="/location.svg" alt="Location" className="location-icon-vertical" />
              <div className="location-address-texts">
                <span className="location-label-vertical">Select Location</span>
                <span className="address-label-vertical">Select Address ▼</span>
              </div>
              <div className="dropdown-menu">
                <div className="dropdown-item">Location 1</div>
                <div className="dropdown-item">Location 2</div>
                <div className="dropdown-item">Location 3</div>
              </div>
            </div>
          </div>
          <div className="header-middle">
            <div className="search-input-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search Doctors, Specialities, Conditions etc."
                className="search-bar"
              />
            </div>
          </div>
          <div className="header-right">
            <button className="login-btn">
              Login
              <img src="/login.jpg" alt="Login Icon" className="login-icon" />
            </button>
          </div>
        </header>
        <nav className="secondary-nav">
          <a href="#" className="nav-item">Buy Medicines</a>
          <a href="#" className="nav-item">Find Doctors</a>
          <a href="#" className="nav-item">Lab Tests</a>
          <a href="#" className="nav-item">Circle Membership</a>
          <a href="#" className="nav-item">Health Records</a>
          <a href="#" className="nav-item">Diabetes Reversal</a>
          <a href="#" className="nav-item">
            Buy Insurance <span className="new-badge">New</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
