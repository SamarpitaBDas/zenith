import React, { useState } from 'react';
import styled from 'styled-components';

const Gratitude = ({ isDarkTheme }) => {
  const [gratitudeText, setGratitudeText] = useState('');

  const handleInputChange = (event) => {
    setGratitudeText(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Gratitude submitted:', gratitudeText);
    setGratitudeText(''); 
  };

  return (
    <StyledWrapper isDarkTheme={isDarkTheme}>
      <div className="card">
        <textarea
          value={gratitudeText}
          onChange={handleInputChange}
          placeholder="Type your gratitude here..."
          rows="4"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 340px;
    height: 140px;
    padding: 20px 1px;
    margin: 0 30px;
    text-align: center;
    position: relative;
    cursor: pointer;
    box-shadow: 0 10px 15px -3px rgba(33,150,243,.4), 0 4px 6px -4px rgba(33,150,243,.4);
    border-radius: 10px;
    background-color: ${({ isDarkTheme }) => isDarkTheme ? 'rgba(107, 110, 204, 0.7)' : 'linear-gradient(225deg, #FFFFFF, #85C1E9)'};
    background: ${({ isDarkTheme }) => isDarkTheme ? 'linear-gradient(45deg, rgba(4, 5, 29, 0.3) 0%, rgba(21, 27, 35, 1) 100%)' : 'linear-gradient(45deg, #85C1E9, #FFFFFF)'};

    textarea {
      width: 90%;
      height:30%;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid ${({ isDarkTheme }) => isDarkTheme ? 'white' : '#85C1E9'};
      background-color: ${({ isDarkTheme }) => isDarkTheme ? '#2C3E50' : '#f1f1f1'};
      color: ${({ isDarkTheme }) => isDarkTheme ? 'white' : 'black'};
      resize: none;
      font-size: 14px;
      margin-bottom: 10px;
    }

    button {
      padding: 10px 15px;
      border: none;

      border-radius: 5px;
      background-color: ${({ isDarkTheme }) => isDarkTheme ? '#3498db' : '#5dade2'};
      color: white;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${({ isDarkTheme }) => isDarkTheme ? '#2980b9' : '#2980b9'};
      }
    }
  }
`;

export default Gratitude;
