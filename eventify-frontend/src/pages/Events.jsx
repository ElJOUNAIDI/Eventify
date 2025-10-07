import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

const Events = ({ user }) => {
  const [events,setEvents] = useState([]);

  useEffect(()=>{
    const fetchEvents = async ()=>{
      try {
        const res = await api.get('/events');
        setEvents(res.data.data);
      } catch {
        alert('Erreur récupération événements');
      }
    };
    fetchEvents();
  },[]);

  return (
    <div>
      <h2>Événements</h2>
      {user.role==='organisateur' && <Link to="/create-event">Créer un événement</Link>}
      {events.map(event=>(
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Organisateur: {event.user.name}</p>
          <Link to={`/events/${event.id}`}>Voir détails</Link>
        </div>
      ))}
    </div>
  );
};

export default Events;
