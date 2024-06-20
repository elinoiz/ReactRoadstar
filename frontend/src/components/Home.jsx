import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/index.css';

import SVG from './images/SVG.png';
import logo from './images/logo.png';

const Home = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="heading">
        <div className="logo-home">
          <div className="icon">
            <img src={logo} alt="logo" className="icon-logo" />
          </div>
          <div className="text">
            <p className="text-logo">oadstar</p>
          </div>
        </div>
      </div>
      <div className="svg-container">
        <img src={SVG} alt="SVG Image" className="svg-image" />
      </div>
      <div className="sidebar">
        <p className="sidebar-text">Roadstar</p>
        <div className="additional-text">
          <div>Buy Sell things easier</div>
          <div>along with our service</div>
        </div>
        <div className="register-text">
          <div>Register and start selling your items with the comfort of putting them up for auction.</div>
          <div>We will help you with this.</div>
        </div>
        <button className="start-button" onClick={handleRegisterClick}>Start Now</button>
        <button className="more-button" onClick={handleLoginClick}>Login</button>
      </div>
    </div>
  );
};

export default Home;
