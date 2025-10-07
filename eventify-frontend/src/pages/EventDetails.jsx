import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';

const EventDetails = ({ user }) => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  // 🔹 Déplacer fetchEvent à l'intérieur du useEffect
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch {
        alert('Erreur récupération événement');
      }
    };

    fetchEvent();
  }, [id]);

  const registerEvent = async () => {
    try {
      await api.post(`/events/${id}/register`);
      alert('Inscription réussie !');
    } catch {
      alert('Erreur inscription');
    }
  };

  if (!event) return <p>Chargement...</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Lieu : {event.location}</p>
      <p>Début : {event.start_date}</p>
      <p>Fin : {event.end_date}</p>
      <p>Places disponibles : {event.available_seats}</p>
      <p>Organisateur : {event.user.name}</p>

      {user?.role === 'user' && <button onClick={registerEvent}>S'inscrire</button>}
      {user?.role === 'admin' && <button>Supprimer</button>}
    </div>
  );
};

export default EventDetails;
