import React, { useState, useCallback } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import PropTypes from 'prop-types'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Dialog from "./ui/Dialog"
import Button from "./ui/Button"
import Input from "./ui/Input"
import Label from "./ui/Label"
import styled from 'styled-components';

const localizer = momentLocalizer(moment)

const eventColors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
]

const Scheduler = ({ isDarkTheme }) => {
  const [events, setEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newEvent, setNewEvent] = useState({})

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      setNewEvent({
        title: '',
        start,
        end,
        color: eventColors[Math.floor(Math.random() * eventColors.length)],
      })
      setShowModal(true)
    },
    []
  )

  const handleSelectEvent = useCallback(
    (event) => {
      setNewEvent(event)
      setShowModal(true)
    },
    []
  )

  const handleEventResize = useCallback(
    ({ event, start, end }) => {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === event.id
            ? { ...ev, start, end }
            : ev
        )
      )
    },
    []
  )

  const handleEventDrag = useCallback(
    ({ event, start, end }) => {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === event.id
            ? { ...ev, start, end }
            : ev
        )
      )
    },
    []
  )

  const handleSaveEvent = () => {
    if (newEvent.id) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === newEvent.id
            ? { ...ev, ...newEvent }
            : ev
        )
      )
    } else {
      setEvents((prev) => [
        ...prev,
        {
          ...newEvent,
          id: Date.now(),
        },
      ])
    }
    setShowModal(false)
    setNewEvent({})
  }

  const handleDeleteEvent = () => {
    setEvents((prev) => prev.filter((ev) => ev.id !== newEvent.id))
    setShowModal(false)
    setNewEvent({})
  }

  // Custom toolbar to remove default navigation buttons
  const CustomToolbar = () => {
    return (
      <div className="custom-toolbar">
      </div>
    )
  }

  return (
    <StyledWrapper isDarkTheme={isDarkTheme}>
      <div className="card">
        <div className="content">
          <div className="title">Scheduler</div>

          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            onEventResize={handleEventResize}
            onEventDrop={handleEventDrag}
            selectable={true}
            resizable
            defaultView={Views.DAY}
            views={[Views.DAY]}
            className={`h-full ${isDarkTheme ? 'rbc-dark-theme' : ''} calendar-resized`}
            eventPropGetter={(event) => ({
              className: event.color,
            })}
            step={15}
            timeslots={4}
            components={{
              toolbar: CustomToolbar,  // Use the custom toolbar
            }}
          />

          {showModal && (
            <DialogWrapper>
              <Dialog open={showModal} onOpenChange={(open) => setShowModal(open)}>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>{newEvent.id ? 'Edit Event' : 'Add Event'}</Dialog.Title>
                  </Dialog.Header>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={newEvent.title || ''}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="start" className="text-right">
                        Start
                      </Label>
                      <Input
                        id="start"
                        type="time"
                        value={newEvent.start ? moment(newEvent.start).format('HH:mm') : ''}
                        onChange={(e) => setNewEvent({ ...newEvent, start: moment(newEvent.start).set({ hour: e.target.value.split(':')[0], minute: e.target.value.split(':')[1] }).toDate() })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="end" className="text-right">
                        End
                      </Label>
                      <Input
                        id="end"
                        type="time"
                        value={newEvent.end ? moment(newEvent.end).format('HH:mm') : ''}
                        onChange={(e) => setNewEvent({ ...newEvent, end: moment(newEvent.end).set({ hour: e.target.value.split(':')[0], minute: e.target.value.split(':')[1] }).toDate() })}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <Dialog.Footer>
                    {newEvent.id && (
                      <Button variant="destructive" onClick={handleDeleteEvent}>
                        Delete
                      </Button>
                    )}
                    <Button onClick={handleSaveEvent}>Save</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog>
            </DialogWrapper>
          )}
        </div>
      </div>
    </StyledWrapper>
  )
}

Scheduler.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
}

export default Scheduler;

const StyledWrapper = styled.div`
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 550px;
    height: 700px;
    padding: 20px;
    margin: 0 30px;
    text-align: center;
    position: relative;
    cursor: pointer;
    box-shadow: 0 10px 15px -3px rgba(33, 150, 243, .4), 0 4px 6px -4px rgba(33, 150, 243, .4);
    border-radius: 10px;
    background-color: ${({ isDarkTheme }) => isDarkTheme ? 'rgba(107, 110, 204, 0.7)' : 'linear-gradient(225deg, #FFFFFF, #85C1E9)'};
    background: ${({ isDarkTheme }) => isDarkTheme ? 'linear-gradient(45deg, rgba(4, 5, 29, 0.3) 0%, rgba(21, 27, 35, 1) 100%)' : 'linear-gradient(45deg, #85C1E9, #FFFFFF)'};
  }

  .content {
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .content .title {
    font-weight: 800;
    text-transform: uppercase;
    color: rgba(45, 110, 218, 255);
    margin-bottom: 10px;
    font-size: 25px;
    letter-spacing: 1px;
  }

  .calendar-resized {
    transform: scale(0.9); 
    margin-top: 0;  
  }

  .custom-toolbar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .custom-toolbar h2 {
    font-size: 20px;
    font-weight: bold;
  }

  .rbc-calendar {
    background-color: ${({ isDarkTheme }) => isDarkTheme ? '#2d2d2d' : 'transparent'};  /* Background for calendar */
  }

  .rbc-day-bg {
    background-color: ${({ isDarkTheme }) => isDarkTheme ? '#505050' : '#f3f4f6'};  /* Dark gray for day boxes in dark theme */
  }

  .rbc-day-header {
    background-color: ${({ isDarkTheme }) => isDarkTheme ? '#4b4b4b' : '#e5e7eb'};  /* Lighter gray for headers in dark theme */
  }

  .rbc-header {
    color: ${({ isDarkTheme }) => isDarkTheme ? '#d1d5db' : '#4b5563'};  /* Text color for header */
  }

  .rbc-event {
    background-color: ${({ isDarkTheme }) => isDarkTheme ? '#6b7280' : '#ffffff'};
    color: ${({ isDarkTheme }) => isDarkTheme ? '#e5e7eb' : '#000000'};
    border: ${({ isDarkTheme }) => isDarkTheme ? '1px solid #4b5563' : '1px solid #4b5563'};
  }

  .rbc-time-column {
    background-color: ${({ isDarkTheme }) => isDarkTheme ? '#3b3b3b' : 'aliceblue'}; /* Modify this to change the background of the time column */
    color: ${({ isDarkTheme }) => isDarkTheme ? '#ffffff' : '#000000'}; /* Change text color in the time column */
  }
`;



const DialogWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 20vw;
  height: 20vh;
  background: ${({ isDarkTheme }) => (isDarkTheme ? "#4b5563" : 'aliceblue')};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
`;
