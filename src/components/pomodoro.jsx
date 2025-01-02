import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Pomodoro = ({ isDarkTheme }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const intervalRef = useRef(null);

  // Handle countdown logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Switch between work and break
            if (isBreak) {
              setMinutes(25);
              setIsBreak(false);
            } else {
              setMinutes(5);
              setIsBreak(true);
            }
            setSeconds(0);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, seconds, minutes, isBreak]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <StyledWrapper isDarkTheme={isDarkTheme} isFullScreen={isFullScreen}>
      <div className="card">
        <div className="time-display">
          <div className="time">
            {formatTime(minutes)}:{formatTime(seconds)}
          </div>
        </div>

        <div className="controls">
          <button onClick={handleStartStop} className="start-stop">
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={toggleFullScreen} className="fullscreen">
            {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ isDarkTheme }) => (isDarkTheme ? '#2d2d2d' : '#f3f4f6')};
  
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 400px;
    background: ${({ isDarkTheme }) =>
      isDarkTheme
        ? 'linear-gradient(45deg, rgba(4, 5, 29, 0.3) 0%, rgba(21, 27, 35, 1) 100%)'
        : 'linear-gradient(45deg, #85C1E9, #FFFFFF)'};
    box-shadow: 0 10px 15px -3px rgba(33, 150, 243, 0.4),
      0 4px 6px -4px rgba(33, 150, 243, 0.4);
    border-radius: 10px;
    text-align: center;
    color: ${({ isDarkTheme }) => (isDarkTheme ? '#fff' : '#000')};
    font-family: 'Digital-7', sans-serif;
    position: relative;
  }

  .time-display {
    font-size: 80px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .controls {
    display: flex;
    gap: 20px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
  }

  .start-stop {
    background-color: ${({ isDarkTheme }) =>
      isDarkTheme ? '#4CAF50' : '#28a745'};
    color: #fff;
  }

  .fullscreen {
    background-color: ${({ isDarkTheme }) =>
      isDarkTheme ? '#FF6347' : '#ff6347'};
    color: #fff;
  }
`;

export default Pomodoro;
