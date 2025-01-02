import Navbar from '../src/components/navbar';
import './App.css';
import React, { useState } from 'react';
import ToggleButton from './components/toggle_button';
import dark_bg from './assets/possible_bg.svg';
import light_bg from './assets/light_bg.jpg';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const backgroundImage = isDarkTheme ? dark_bg : light_bg;

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed', 
        height: '100vh',

      }}
    >
      <ToggleButton toggleTheme={toggleTheme} className="toggle_button" />
      <Navbar className="navbar" />
    </div>
  );
}

export default App;
