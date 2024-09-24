import React, { useState } from 'react';

const EventManager = () => {
    const [events, setEvents] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    const handleAddEvent = () => {
        const newEvent = {
            id: Date.now(), // Unique ID for the event
            name: eventName,
            date: eventDate,
            description: eventDescription,
        };
        setEvents([...events, newEvent]);
        setEventName('');
        setEventDate('');
        setEventDescription('');
    };

    const handleDeleteEvent = (id) => {
        setEvents(events.filter(event => event.id !== id));
    };

    return (
        <div>
            <h1>College Event Manager</h1>
            <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
            />
            <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
            />
            <textarea
                placeholder="Event Description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
            ></textarea>
            <button onClick={handleAddEvent}>Add Event</button>

            <h2>Events List</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <strong>{event.name}</strong> - {event.date}
                        <p>{event.description}</p>
                        <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventManager;
