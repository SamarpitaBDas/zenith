import Navbar from '../components/navbar'; 
import React, { useState } from 'react';
import ToggleButton from '../components/toggle_button'; 
import dark_bg from '../assets/possible_bg.svg';
import light_bg from '../assets/light_bg.jpg';

function HomePage() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const backgroundImage = isDarkTheme ? dark_bg : light_bg;

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div
      className="background-container" 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        height: '100vh',
        position: 'relative', 
      }}
    >
        <div 
          className="toggle_button" 
          style={{
            position: 'absolute',
            top: '20px', 
            right: '20px',
            zIndex: 10, 
          }}
        >
            <ToggleButton toggleTheme={toggleTheme}/>
        </div>
        
        <div 
          className="navbar" 
          style={{
            position: 'absolute',
            left:'50%',
            bottom:20,
            transform: 'translateX(-50%)', 
            zIndex: 5, 
          }}
        >
            <Navbar /> 
        </div>
    </div>
  );
}

export default HomePage;
