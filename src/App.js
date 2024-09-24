import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({ name: '', date: '', description: '', summary: '', link: '' });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/events', formData);
        setFormData({ name: '', date: '', description: '', summary: '', link: '' });
        fetchEvents();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        fetchEvents();
    };

    return (
        <div>
            <h1>College Events</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Event Name" required />
                <input name="date" value={formData.date} onChange={handleChange} placeholder="Event Date" required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
                <input name="summary" value={formData.summary} onChange={handleChange} placeholder="Summary" required />
                <input name="link" value={formData.link} onChange={handleChange} placeholder="Link" required />
                <button type="submit">Create Event</button>
            </form>
            <ul>
                {events.map((event) => (
                    <li key={event._id}>
                        <h3>{event.name}</h3>
                        <p>{event.date}</p>
                        <p>{event.description}</p>
                        <button onClick={() => handleDelete(event._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
