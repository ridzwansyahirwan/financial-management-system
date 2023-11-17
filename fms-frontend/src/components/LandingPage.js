import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/landing.css';
import logoImage from './logo.png';
import backgroundImage from './latar.jpg';

function Landing() {
  const navigate = useNavigate();

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const handleLoginClick = () => {
    navigate('/Login');
  };

  const handleRegisterClick = () => {
    navigate('/Register');
  };

  return (
    <div className="header" style={backgroundStyles}>
      <div className="navbar">
        <img src={logoImage} className="logo" alt="Logo" />
      </div>

      <div className="section">
        <h1>"Empower your financial journey with precision and ease, revolutionizing management at every transaction."</h1>
        <div>
          <button className='button' onClick={handleLoginClick}>Login</button>
          <button className='button' onClick={handleRegisterClick}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
