import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

const Events = ({ user }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        console.log("📦 Données reçues de l’API :", res.data);

        // Pagination : on prend res.data.data
        setEvents(res.data.data || []);
      } catch (err) {
        console.error("❌ Erreur récupération événements :", err);
        alert("Erreur récupération événements");
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📅 Liste des événements</h2>

      {/* 🔹 Bouton pour les organisateurs */}
      {user?.role === "organisateur" && (
        <Link
          to="/create-event"
          style={{
            display: "inline-block",
            marginBottom: "20px",
            padding: "10px 15px",
            backgroundColor: "#2563eb",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          ➕ Créer un événement
        </Link>
      )}

      {/* 🔹 Aucun événement */}
      {events.length === 0 && <p>Aucun événement pour le moment.</p>}

      {/* 🔹 Liste des événements */}
      {events.map((event) => {
        // Gestion du chemin image
        const imageUrl = event.image
          ? `http://127.0.0.1:8000/storage/${event.image.replace(/^\/+/, "")}`
          : "https://via.placeholder.com/300x200?text=Aucune+image";

        return (
          <div
            key={event.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              maxWidth: "500px",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>{event.title}</h3>

            {/* ✅ Image avec fallback */}
            <img
              src={imageUrl}
              alt={event.title}
              style={{
                width: "100%",
                maxWidth: "400px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x200?text=Image+indisponible";
              }}
            />

            {/* Autres infos */}
            {event.category && <p>🏷️ Catégorie : {event.category}</p>}
            <p>{event.description}</p>
            <p>📍 Lieu : {event.location}</p>
            <p>👤 Organisateur : {event.user?.name || "Inconnu"}</p>

            <Link
              to={`/events/${event.id}`}
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor: "#16a34a",
                color: "white",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              🔍 Voir détails
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Events;
