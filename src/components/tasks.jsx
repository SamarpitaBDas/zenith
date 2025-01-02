import React, { useState } from 'react';
import styled from 'styled-components';

const TodoCard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, idx) => 
      idx === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">
          <div className="title">To-Do List</div>
          <div className="tasks">
            {tasks.map((task, index) => (
              <div key={index} className={`task ${task.completed ? 'completed' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => handleToggleTask(index)} 
                />
                <span>{task.text}</span>
              </div>
            ))}
          </div>
          <div className="input-container">
            <input 
              type="text" 
              value={taskInput} 
              onChange={(e) => setTaskInput(e.target.value)} 
              placeholder="Add a new task" 
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>
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
    height:700px;
    padding: 20px 1px;
    margin: 0 30px;
    text-align: center;
    position: relative;
    cursor: pointer;
    box-shadow: 0 10px 15px -3px rgba(33,150,243,.4),0 4px 6px -4px rgba(33,150,243,.4);
    border-radius: 10px;
    background-color: #6B6ECC;
    background: linear-gradient(45deg, #04051dea 0%, #2b566e 100%);
  }

  .content {
    padding: 20px;
    width: 100%;
  }

  .content .title {
    font-weight: 800;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.64);
    margin-bottom: 20px;
    font-size: 25px;
    letter-spacing: 1px;
  }

  .tasks {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 20px;
  }

  .task {
    display: flex;
    align-items: center;
    margin: 5px 0;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
  }

  .task.completed span {
    text-decoration: line-through;
    color: rgba(255, 255, 255, 0.4);
  }

  input[type="checkbox"] {
    margin-right: 10px;
    cursor: pointer;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  input[type="text"] {
    width: 80%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
  }

  button {
    border: none;
    outline: none;
    color: rgb(255 255 255);
    text-transform: uppercase;
    font-weight: 700;
    font-size: .75rem;
    padding: 0.75rem 1.5rem;
    background-color: rgb(33 150 243);
    border-radius: 0.5rem;
    cursor: pointer;
    width: 90%;
    text-shadow: 0px 4px 18px #2c3442;
  }

  button:hover {
    background-color: rgb(33 150 243);
    opacity: 0.9;
  }
`;

export default TodoCard;
