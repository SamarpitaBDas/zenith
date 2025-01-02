import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Start from './ui/Start';  // Import Start component

const Pomodoro = ({ isDarkTheme }) => {
  const [minutes, setMinutes] = useState(55);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [accumulatedTime, setAccumulatedTime] = useState(0); 

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (isBreak) {
              setMinutes(55);
              setIsBreak(false);
            } else {
              setMinutes(5);
              setIsBreak(true);
              setAccumulatedTime(prevTime => prevTime + (55 * 60)); // Update accumulated time after pomodoro
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
          <Start isRunning={isRunning} handleStartStop={handleStartStop} 
            style={{
              top:"40px",
            }}
          />
        </div>
      </div>

    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 200px;
    background: ${({ isDarkTheme }) =>
      isDarkTheme
        ? 'linear-gradient(45deg, rgba(4, 5, 29, 0.3) 0%, rgba(21, 27, 35, 1) 100%)'
        : 'linear-gradient(45deg, #85C1E9, #FFFFFF)'};
    box-shadow: 0 10px 15px -3px rgba(33, 150, 243, 0.4),
      0 4px 6px -4px rgba(33, 150, 243, 0.4);
    border-radius: 10px;
    text-align: center;
    color: ${({ isDarkTheme }) => (isDarkTheme ? '#fff' : '#fff')};
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
`;

export default Pomodoro;
