import React, { useState } from 'react';
import styled from 'styled-components';

const Tracker = ({ isDarkTheme }) => {
  const [mood, setMood] = useState('neutral');
  const [habits, setHabits] = useState({
    exercise: false,
    read: false,
    meditate: false,
  });

  const toggleHabit = (habit) => {
    setHabits(prevHabits => ({
      ...prevHabits,
      [habit]: !prevHabits[habit],
    }));
  };

  const handleMoodChange = (newMood) => {
    setMood(newMood);
  };

  return (
    <StyledWrapper isDarkTheme={isDarkTheme}>
      <div className="card">
        <div className="mood-section">
          <h3>How do you feel today?</h3>
          <div className="mood-buttons">
            {['happy', 'neutral', 'sad'].map((state) => (
              <button
                key={state}
                onClick={() => handleMoodChange(state)}
                className={mood === state ? 'active' : ''}
              >
                {state === 'happy' ? '😊' : state === 'neutral' ? '😐' : '😞'}
              </button>
            ))}
          </div>
          <p className="mood-description">
            Current mood: {mood === 'happy' ? 'Happy 😊' : mood === 'neutral' ? 'Neutral 😐' : 'Sad 😞'}
          </p>
        </div>

        <div className="habit-section">
          <h3>Track your habits</h3>
          <ul>
            {Object.keys(habits).map((habit) => (
              <li key={habit} className="habit-item">
                <input
                  type="checkbox"
                  checked={habits[habit]}
                  onChange={() => toggleHabit(habit)}
                />
                <label>{habit.charAt(0).toUpperCase() + habit.slice(1)}</label>
              </li>
            ))}
          </ul>
        </div>
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
    width: 400px;
    height: 560px;
    padding: 20px 1px;
    margin: 0 30px;
    text-align: center;
    position: relative;
    cursor: pointer;
    box-shadow: 0 10px 15px -3px rgba(33,150,243,.4), 0 4px 6px -4px rgba(33,150,243,.4);
    border-radius: 10px;
    background-color: ${({ isDarkTheme }) =>
      isDarkTheme
        ? 'linear-gradient(45deg, rgba(4, 5, 29, 0.3) 0%, rgba(21, 27, 35, 1) 100%)'
        : 'linear-gradient(45deg, #85C1E9, #FFFFFF)'};
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    color: ${({ isDarkTheme }) => (isDarkTheme ? '#fff' : '#333')};
    margin-bottom: 20px;
  }

  .mood-section {
    margin-top: 20px;
    width: 100%;
    text-align: center;

    h3 {
      font-size: 20px;
      font-weight: bold;
      color: ${({ isDarkTheme }) => (isDarkTheme ? '#fff' : '#333')};
    }

    .mood-buttons {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 10px 0;

      button {
        background: transparent;
        font-size: 30px;
        border: none;
        cursor: pointer;
        transition: transform 0.2s;
      }

      button.active {
        transform: scale(1.2);
        color: ${({ isDarkTheme }) => (isDarkTheme ? '#FFD700' : '#FF6347')};
      }

      button:hover {
        transform: scale(1.1);
      }
    }

    .mood-description {
      font-size: 16px;
      color: ${({ isDarkTheme }) => (isDarkTheme ? '#fff' : '#333')};
    }
  }

  .habit-section {
    margin-top: 20px;
    width: 100%;
    text-align: left;
    margin-left: 50px;

    h3 {
      font-size: 20px;
      font-weight: bold;
      color: ${({ isDarkTheme }) => (isDarkTheme ? '#fff' : '#333')};
    }

    ul {
      list-style: none;
      padding: 0;
      margin-top: 10px;

      .habit-item {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;

        input[type='checkbox'] {
          width: 20px;
          height: 20px;
        }

        label {
          font-size: 16px;
          color: ${({ isDarkTheme }) => (isDarkTheme ? '#fff' : '#333')};
        }
      }
    }
  }
`;

export default Tracker;
