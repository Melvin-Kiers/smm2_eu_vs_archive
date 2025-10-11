import React from 'react';

const NavBar = () => {
  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Mario Encyclopedia</div>

        <div className="navbar-links-wrapper">
          <img
            src={process.env.PUBLIC_URL + "/images/pipe-background.svg"
            alt="Pipe background"
            className="navbar-bg-svg"
          />
          <ul className="navbar-links">
            <li><a href="#hero">Home</a></li>
            <li><a href="#games">Games</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
