import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    axios.get('/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const addEvent = () => {
    axios.post('/events', { title, location, time })
      .then(response => setEvents([...events, response.data]))
      .catch
      .catch(error => console.error('Error adding event:', error));
  };

  return (
    <div>
      <h2>Google Calendar</h2>
      <div>
        <input 
          type="text" 
          placeholder="Event Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Location" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
        />
        <input 
          type="datetime-local" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
        />
        <button onClick={addEvent}>Add Event</button>
      </div>
      <div>
        <h3>Events</h3>
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <strong>{event.title}</strong> at {event.location} on {new Date(event.time).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Calendar;
