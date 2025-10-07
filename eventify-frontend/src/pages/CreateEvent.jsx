import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

const CreateEvent = ({ user }) => {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [location,setLocation] = useState('');
  const [start_date,setStartDate] = useState('');
  const [end_date,setEndDate] = useState('');
  const [available_seats,setSeats] = useState(0);
  const navigate = useNavigate();

  if (user?.role !== 'organisateur') {
    return <p>Vous n'avez pas la permission de créer un événement.</p>;
  }

  const handleCreate = async e => {
    e.preventDefault();
    try {
      await api.post('/events', { title, description, location, start_date, end_date, available_seats });
      alert('Événement créé !');
      navigate('/events');
    } catch(err) {
      alert(err.response?.data?.message || 'Erreur création événement');
    }
  };

  return (
    <div>
      <h2>Créer un événement</h2>
      <form onSubmit={handleCreate}>
        <input placeholder="Titre" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <input placeholder="Lieu" value={location} onChange={e=>setLocation(e.target.value)} />
        <input type="datetime-local" value={start_date} onChange={e=>setStartDate(e.target.value)} />
        <input type="datetime-local" value={end_date} onChange={e=>setEndDate(e.target.value)} />
        <input type="number" placeholder="Places" value={available_seats} onChange={e=>setSeats(e.target.value)} />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateEvent;
