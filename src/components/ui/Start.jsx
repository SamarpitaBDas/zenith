// Start.jsx
import React from 'react';
import styled from 'styled-components';

const Start = ({ isRunning, handleStartStop }) => {
  return (
    <StyledWrapper>
      <label className="container">
        <input
          type="checkbox"
          checked={isRunning} // Link checkbox state to isRunning
          onChange={handleStartStop} // Call handler to toggle state
        />
        <svg viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="play">
          <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
        </svg>
        <svg viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="pause">
          <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
        </svg>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    --color: #ffffff;
    --size: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    font-size: var(--size);
    user-select: none;
    fill: var(--color);
  }

  .container .play {
    position: absolute;
    animation: keyframes-fill 0.3s;
  }

  .container .pause {
    position: absolute;
    display: none;
    animation: keyframes-fill 0.3s;
  }

  .container input:checked ~ .play {
    display: none;
  }

  .container input:checked ~ .pause {
    display: block;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  @keyframes keyframes-fill {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

export default Start;
