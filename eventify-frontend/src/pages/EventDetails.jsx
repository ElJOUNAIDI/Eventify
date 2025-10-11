import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/client";
import "../styles/EventDetails.css";

const EventDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    location: "",
  });

  const [editData, setEditData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    start_date: "",
    end_date: "",
    available_seats: "",
  });

  // 🔹 Charger l'événement
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
        setEditData({
          title: res.data.title,
          description: res.data.description,
          category: res.data.category,
          location: res.data.location,
          start_date: res.data.start_date,
          end_date: res.data.end_date,
          available_seats: res.data.available_seats,
        });
      } catch {
        alert("Erreur récupération événement");
      }
    };
    fetchEvent();
  }, [id]);

  // 🔹 Pré-remplir localisation
  useEffect(() => {
    if (event) {
      setFormData((prev) => ({
        ...prev,
        location: event.location || "",
      }));
    }
  }, [event]);

  // 🔹 Compte à rebours
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

  // 🔹 Formulaire inscription
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Formulaire édition
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // 🔹 Soumettre l'inscription
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/events/${id}/register`, formData);
      alert("✅ Inscription réussie !");
      setShowForm(false);
    } catch {
      alert("❌ Erreur lors de l'inscription");
    }
  };

  // 🔹 Mettre à jour l’événement
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/events/${id}`, editData);
      alert("✅ Événement mis à jour !");
      setIsEditing(false);
      setEvent({ ...event, ...editData });
    } catch {
      alert("❌ Erreur lors de la mise à jour");
    }
  };

  // 🔹 Supprimer l’événement (ADMIN)
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "⚠️ Êtes-vous sûr de vouloir supprimer cet événement ?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/events/${id}`);
      alert("🗑️ Événement supprimé avec succès !");
      navigate("/admin-dashboard"); // redirige vers le tableau de bord admin
    } catch (error) {
      console.error(error);
      alert("❌ Échec de la suppression de l’événement");
    }
  };

  if (!event) return <p className="loading-text">Chargement...</p>;

  const isOrganizerOwner =
    user?.role === "organisateur" && user?.id === event.user?.id;

  return (
    <div className="event-details-page">
      <div className="event-card">
        <h2 className="event-title">
          {isEditing ? "Modifier l’événement" : event.title}
        </h2>

        {/* Image */}
        {event.image && !isEditing && (
          <img
            src={`http://127.0.0.1:8000/storage/${event.image}`}
            alt={event.title}
            className="event-image"
          />
        )}

        {/* === Mode Édition === */}
        {isEditing ? (
          <form className="register-form" onSubmit={handleEditSubmit}>
            <label>Titre :</label>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleEditChange}
              required
            />
            <label>Description :</label>
            <textarea
              name="description"
              rows="4"
              value={editData.description}
              onChange={handleEditChange}
            />
            <label>Catégorie :</label>
            <input
              type="text"
              name="category"
              value={editData.category}
              onChange={handleEditChange}
            />
            <label>Lieu :</label>
            <input
              type="text"
              name="location"
              value={editData.location}
              onChange={handleEditChange}
            />
            <label>Date de début :</label>
            <input
              type="datetime-local"
              name="start_date"
              value={editData.start_date}
              onChange={handleEditChange}
            />
            <label>Date de fin :</label>
            <input
              type="datetime-local"
              name="end_date"
              value={editData.end_date}
              onChange={handleEditChange}
            />
            <label>Places disponibles :</label>
            <input
              type="number"
              name="available_seats"
              value={editData.available_seats}
              onChange={handleEditChange}
            />

            <button type="submit" className="submit-btn">
              💾 Enregistrer les modifications
            </button>
            <button
              type="button"
              className="delete-btn"
              onClick={() => setIsEditing(false)}
            >
              Annuler
            </button>
          </form>
        ) : (
          <>
            <p>🏷️ Catégorie : {event.category}</p>
            <p>📝 Description : {event.description}</p>
            <p>📍 Lieu : {event.location}</p>
            <p>🗓️ Début : {event.start_date}</p>
            <p>🗓️ Fin : {event.end_date}</p>
            <p>🎟️ Places : {event.available_seats}</p>
            <p>👤 Organisateur : {event.user?.name}</p>

            <p
              className={`time-left ${
                timeLeft.includes("terminé") ? "expired" : "active"
              }`}
            >
              ⏳ {timeLeft}
            </p>

            {/* === Actions selon rôle === */}
            {user?.role === "user" && !showForm && (
              <button className="register-btn" onClick={() => setShowForm(true)}>
                S’inscrire à l’événement
              </button>
            )}

            {showForm && (
              <form className="register-form" onSubmit={handleSubmit}>
                <label>Nom complet :</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
                <label>Email :</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label>Téléphone :</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
                <label>Lieu :</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  readOnly
                  className="readonly-input"
                />
                <button type="submit" className="submit-btn">
                  Valider l’inscription
                </button>
              </form>
            )}

            {isOrganizerOwner && (
              <button
                className="register-btn"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Modifier l’événement
              </button>
            )}

            {user?.role === "admin" && (
              <button className="delete-btn" onClick={handleDelete}>
                🗑️ Supprimer l’événement
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
