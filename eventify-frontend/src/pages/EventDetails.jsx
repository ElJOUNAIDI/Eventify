import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";

const EventDetails = ({ user }) => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(""); // ⏳ Temps restant
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    location: "",
  });

  // 🔹 Charger les détails de l'événement
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch {
        alert("Erreur récupération événement");
      }
    };
    fetchEvent();
  }, [id]);

  // 🔹 Pré-remplir automatiquement la localisation
  useEffect(() => {
    if (event) {
      setFormData((prev) => ({
        ...prev,
        location: event.location || "",
      }));
    }
  }, [event]);

  // 🔹 Compteur de temps restant jusqu’à la fin de l’événement
  useEffect(() => {
    if (!event) return;

    const endTime = new Date(event.end_date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        setTimeLeft("L'événement est terminé !");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}j ${hours}h ${minutes}m ${seconds}s restants`);
    }, 1000);

    return () => clearInterval(interval);
  }, [event]);

  // 🔹 Gérer la saisie du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Envoyer l'inscription
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/events/${id}/register`, formData);
      alert("✅ Inscription réussie !");
      setShowForm(false);
      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        location: event.location || "",
      });
    } catch {
      alert("❌ Erreur lors de l'inscription");
    }
  };

  if (!event) return <p>Chargement...</p>;

  return (
    <div className="p-6">
      <h2>{event.title}</h2>

      {/* Image de l'événement */}
      {event.image && (
        <img
          src={`http://127.0.0.1:8000/storage/${event.image}`}
          alt={event.title}
          style={{ width: "100%", maxWidth: "400px", borderRadius: "10px", marginTop: "10px" }}
        />
      )}

      {/* Catégorie */}
      {event.category && <p>🏷️ Catégorie : {event.category}</p>}

      <p>{event.description}</p>
      <p>📍 Lieu : {event.location}</p>
      <p>🗓️ Début : {event.start_date}</p>
      <p>🗓️ Fin : {event.end_date}</p>
      <p>🎟️ Places disponibles : {event.available_seats}</p>
      <p>👤 Organisateur : {event.user?.name}</p>

      {/* Compte à rebours */}
      <p
        style={{
          marginTop: "10px",
          fontWeight: "bold",
          color: timeLeft.includes("terminé") ? "#dc2626" : "#2563eb",
        }}
      >
        ⏳ {timeLeft}
      </p>

      {/* Bouton d'inscription utilisateur */}
      {user?.role === "user" && !showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            marginTop: "10px",
            padding: "10px 15px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          S'inscrire
        </button>
      )}

      {/* Formulaire d'inscription */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "400px",
          }}
        >
          <label>Nom complet :</label>
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />

          <label>Email :</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Numéro de téléphone :</label>
          <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required />

          <label>Localisation de l'événement :</label>
          <input type="text" name="location" value={formData.location} readOnly style={{ backgroundColor: "#f3f4f6", cursor: "not-allowed" }} />

          <button type="submit">Valider</button>
        </form>
      )}

      {/* Bouton admin (supprimer event) */}
      {user?.role === "admin" && (
        <button
          style={{
            marginTop: "10px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "6px",
          }}
        >
          Supprimer l'événement
        </button>
      )}
    </div>
  );
};

export default EventDetails;
