import React from 'react';
import styled from 'styled-components';

const TimerHistory = ({ accumulatedTime, isDarkTheme }) => {
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <HistoryWrapper isDarkTheme={isDarkTheme}>
      <div className="history-card">
        <h3>Total Work Time</h3>
        <p className="time-display">{formatTime(accumulatedTime)}</p>
      </div>
    </HistoryWrapper>
  );
};

const HistoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .history-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 15px rgba(33, 150, 243, 0.4);
    background: ${({ isDarkTheme }) =>
      isDarkTheme
        ? 'linear-gradient(45deg, rgba(4, 5, 29, 0.3) 0%, rgba(21, 27, 35, 1) 100%)'
        : 'linear-gradient(45deg, #85C1E9, #FFFFFF)'};
    text-align: center;
    color: ${({ isDarkTheme }) => (isDarkTheme ? '#fff' : '#000')};
  }

  .time-display {
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
  }
`;

export default TimerHistory;

