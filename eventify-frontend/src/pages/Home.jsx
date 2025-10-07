import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({ user }) => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/events")
      .then(res => {
        // ⚠️ Laravel pagination → les données sont dans res.data.data
        setEvents(res.data.data || []);
      })
      .catch(err => {
        console.error("Erreur lors du chargement des événements:", err);
      });
  }, []);

  const handleRegisterClick = (eventId) => {
    if (!user) {
      alert("Vous devez être connecté pour vous inscrire !");
      navigate("/login");
      return;
    }
    navigate(`/events/${eventId}`);
  };

  return (
    <div>
      <h1>Événements</h1>
      {events.length === 0 ? (
        <p>Aucun événement pour le moment</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>Lieu: {event.location}</p>
              {event.user && <p>Organisé par : {event.user.name}</p>}
              <button onClick={() => handleRegisterClick(event.id)}>
                Voir détails
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
