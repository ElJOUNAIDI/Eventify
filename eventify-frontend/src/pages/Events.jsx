import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import "../styles/Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data.data || []);
      } catch (err) {
        console.error("❌ Erreur récupération événements :", err);
        alert("Erreur récupération événements");
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      <h2 className="events-title">📅 Liste des événements</h2>

      

      {events.length === 0 ? (
        <p className="no-events">Aucun événement pour le moment.</p>
      ) : (
        <div className="events-list">
          {events.map((event) => {
            const imageUrl = event.image
              ? `http://127.0.0.1:8000/storage/${event.image.replace(/^\/+/, "")}`
              : "https://via.placeholder.com/300x200?text=Aucune+image";

            return (
              <div className="event-card" key={event.id}>
                <img
                  src={imageUrl}
                  alt={event.title}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300x200?text=Image+indisponible")
                  }
                />
                <div className="event-card-content">
                  <h3><> <strong style={{ color: "#333" }}>Titre</strong></> {event.title}</h3>
                  {event.category && <p><strong>🏷️ Catégorie : </strong> {event.category}</p>}
                  <p>  <strong>📝 Description : </strong> {event.description}</p>
                  <p> <strong>📍 Lieu : </strong> {event.location}</p>
                  <p>👤 {event.user?.name || "Inconnu"}</p>
                  <Link
                    to={`/events/${event.id}`}
                    className="event-details-btn"
                  >
                    🔍 Voir détails
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Events;
