import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Start from './ui/Start';
import TimerHistory from './TimerHistory';

const Pomodoro = ({ isDarkTheme }) => {
  const [minutes, setMinutes] = useState(55);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isLongBreak, setIsLongBreak] = useState(false);
  const [breakCount, setBreakCount] = useState(0);
  const [accumulatedTime, setAccumulatedTime] = useState(0);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            handleSessionEnd();
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
  }, [isRunning, seconds, minutes, isBreak, breakCount]);

  const handleSessionEnd = () => {
    if (isBreak) {
      if (isLongBreak) {
        setMinutes(55);
        setIsBreak(false);
        setIsLongBreak(false);
        setBreakCount(0);
      } else {
        setMinutes(55);
        setIsBreak(false);
        setBreakCount((prevCount) => prevCount + 1);
      }
    } else {
      setAccumulatedTime((prevTime) => prevTime + 55 * 60);
      if (breakCount === 3) {
        setMinutes(20);
        setIsLongBreak(true);
      } else {
        setMinutes(5);
      }
      setIsBreak(true);
    }
    setSeconds(0);
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <StyledWrapper isDarkTheme={isDarkTheme}>
      <div className="card">
        <div className="time-display">
          <div className="time">
            {formatTime(minutes)}:{formatTime(seconds)}
          </div>
        </div>
        <div className="status">
          {isBreak ? (isLongBreak ? 'Long Break' : 'Short Break') : 'Work'}
        </div>
        <div className="controls">
          <Start
            isRunning={isRunning}
            handleStartStop={handleStartStop}
            style={{
              top: "40px",
            }}
          />
        </div>
      </div>
      <TimerHistory accumulatedTime={accumulatedTime} isDarkTheme={isDarkTheme} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 340px;
    height: 200px;
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
    margin-bottom: 10px;
  }

  .status {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .controls {
    display: flex;
    gap: 20px;
  }
`;

export default Pomodoro;