import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Scheduler = ({ isDarkTheme }) => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({ time: '', title: '', color: '#007bff', duration: 1 }); // Current event being added
  
  // Add new event to a time slot
  const handleAddEvent = (time) => {
    setCurrentEvent({ ...currentEvent, time });
  };

  // Save the event when a user inputs a title
  const handleSaveEvent = () => {
    if (currentEvent.title) {
      setEvents([...events, currentEvent]);
      setCurrentEvent({ time: '', title: '', color: '#007bff', duration: 1 }); // Reset after saving
    }
  };

  // Handle event drag and update its duration
  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    // If event is dropped in the same position, no change
    if (destination.index === source.index) return;

    const reorderedEvents = [...events];
    const movedEvent = reorderedEvents[source.index];

    // Update the duration based on the drop position (for simplicity, adjusting based on index)
    movedEvent.duration = Math.abs(destination.index - source.index) + 1;
    
    reorderedEvents.splice(source.index, 1);
    reorderedEvents.splice(destination.index, 0, movedEvent);
    setEvents(reorderedEvents);
  };

  return (
    <StyledWrapper isDarkTheme={isDarkTheme}>
      <div className="card">
        <div className="content">
          <h2>Daily Scheduler</h2>
          <TimeSlots>
            {[...Array(24)].map((_, index) => {
              const time = `${index < 10 ? '0' : ''}${index}:00`;

              return (
                <TimeSlot key={time} isDarkTheme={isDarkTheme}>
                  <span onClick={() => handleAddEvent(time)}>{time}</span>
                  <Droppable droppableId={time}>
                    {(provided) => (
                      <EventList ref={provided.innerRef} {...provided.droppableProps}>
                        {events
                          .filter(event => event.time === time)
                          .map((event, idx) => (
                            <Draggable key={idx} draggableId={`${time}-${idx}`} index={idx}>
                              {(provided) => (
                                <EventItem
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  isDarkTheme={isDarkTheme}
                                  color={event.color}
                                  duration={event.duration}
                                >
                                  {event.title}
                                </EventItem>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </EventList>
                    )}
                  </Droppable>
                  {currentEvent.time === time && !currentEvent.title && (
                    <EventInput
                      type="text"
                      placeholder="Event Title"
                      value={currentEvent.title}
                      onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                      onBlur={handleSaveEvent}
                    />
                  )}
                  {currentEvent.time === time && currentEvent.title && (
                    <ColorPicker>
                      <label>Select Color:</label>
                      <ColorOptions>
                        {['#007bff', '#ff6347', '#32cd32', '#ff1493'].map(color => (
                          <ColorOption
                            key={color}
                            color={color}
                            onClick={() => setCurrentEvent({ ...currentEvent, color })}
                          />
                        ))}
                      </ColorOptions>
                    </ColorPicker>
                  )}
                </TimeSlot>
              );
            })}
          </TimeSlots>
        </div>
      </div>
    </StyledWrapper>
  );
};

// Styled components

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ isDarkTheme }) => isDarkTheme ? '#121212' : '#f9f9f9'};
  color: ${({ isDarkTheme }) => isDarkTheme ? '#fff' : '#333'};

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 500px;
    height: 700px;
    padding: 20px;
    margin: 20px;
    text-align: center;
    position: relative;
    cursor: pointer;
    box-shadow: 0 10px 15px -3px rgba(33,150,243,.4), 0 4px 6px -4px rgba(33,150,243,.4);
    border-radius: 10px;
    background-color: ${({ isDarkTheme }) => isDarkTheme ? 'rgba(107, 110, 204, 0.7)' : 'linear-gradient(225deg, #FFFFFF, #85C1E9)'};
  }
  
  .content h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const TimeSlots = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TimeSlot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid ${({ isDarkTheme }) => isDarkTheme ? '#444' : '#ddd'};
  border-radius: 5px;
  background-color: ${({ isDarkTheme }) => isDarkTheme ? '#333' : '#f0f0f0'};

  span {
    font-weight: bold;
    color: ${({ isDarkTheme }) => isDarkTheme ? '#fff' : '#333'};
    cursor: pointer;
  }
`;

const EventList = styled.div`
  flex-grow: 1;
  margin-left: 10px;
`;

const EventItem = styled.div`
  padding: 5px 10px;
  margin-top: 5px;
  background-color: ${({ color }) => color};
  color: white;
  border-radius: 5px;
  font-size: 0.9rem;
  width: ${({ duration }) => `${duration * 50}px`}; /* Simulate drag size change */
  cursor: move;
`;

const EventInput = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${({ isDarkTheme }) => isDarkTheme ? '#444' : '#ccc'};
  background-color: ${({ isDarkTheme }) => isDarkTheme ? '#222' : '#fff'};
  color: ${({ isDarkTheme }) => isDarkTheme ? '#fff' : '#333'};
`;

const ColorPicker = styled.div`
  margin-top: 10px;
`;

const ColorOptions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const ColorOption = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default Scheduler;
