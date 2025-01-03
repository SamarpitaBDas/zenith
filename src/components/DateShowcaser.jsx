import React from 'react';
import styled from 'styled-components';

const DateShowcaser = ({ isDarkTheme }) => {
  const currentDate = new Date();
  
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <StyledWrapper isDarkTheme={isDarkTheme}>
      <div className="date-card">
        <h3>Today</h3>
        <p className="date-display">{formattedDate}</p>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .date-card {
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

  .date-display {
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
  }
`;

export default DateShowcaser;
