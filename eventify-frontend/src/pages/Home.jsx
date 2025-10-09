import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
const Home = ({ user }) => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/events")
      .then((res) => {
        console.log("📦 Données reçues:", res.data);
        setEvents(res.data.data || []);
      })
      .catch((err) => {
        console.error("❌ Erreur lors du chargement des événements:", err);
      });
  }, []);

  const handleRegisterClick = (eventId) => {
    if (!user) {
      alert("⚠️ Vous devez être connecté pour vous inscrire !");
      navigate("/login");
      return;
    }
    navigate(`/events/${eventId}`);
  };

  return (
    <>
    {/* <Navbar /> */}
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>🎉 Événements disponibles</h1>

      {events.length === 0 ? (
        <p>Aucun événement pour le moment.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {events.map((event) => {
            // ✅ Génération du bon lien d'image
            const imageUrl = event.image
              ? `http://127.0.0.1:8000/storage/${event.image.replace(/^\/+/, "")}`
              : "https://via.placeholder.com/400x250?text=Aucune+image";

            return (
              <div
                key={event.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                {/* ✅ Image de l’événement */}
                <img
                  src={imageUrl}
                  alt={event.title}
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x250?text=Image+indisponible";
                  }}
                />

                {/* ✅ Détails */}
                <div style={{ padding: "15px" }}>
                  <h3 style={{ marginBottom: "8px" }}>{event.title}</h3>
                  <p style={{ marginBottom: "6px" }}>{event.description}</p>
                  <p style={{ marginBottom: "6px" }}>📍 {event.location}</p>
                  {event.user && (
                    <p style={{ color: "#555" }}>
                      👤 Organisé par : <strong>{event.user.name}</strong>
                    </p>
                  )}

                  <button
                    onClick={() => handleRegisterClick(event.id)}
                    style={{
                      marginTop: "10px",
                      padding: "8px 12px",
                      backgroundColor: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Voir détails
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </>
  );
};

export default Home;
