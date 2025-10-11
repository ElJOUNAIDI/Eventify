import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import "../styles/CreateEvent.css";

const CreateEvent = ({ user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [available_seats, setSeats] = useState(0);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  if (user?.role !== "organisateur") {
    return <p className="permission-denied">🚫 Vous n'avez pas la permission de créer un événement.</p>;
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("location", location);
      formData.append("start_date", start_date);
      formData.append("end_date", end_date);
      formData.append("available_seats", available_seats);
      if (image) formData.append("image", image);

      await api.post("/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("🎉 Événement créé avec succès !");
      navigate("/events");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Erreur lors de la création de l'événement");
    }
  };

  return (
    <div className="create-event-container">
      <div className="create-event-card">
        <h2>Créer un Événement</h2>
        <form className="create-event-form" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Catégorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Lieu"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label>Date de début :</label>
          <input
            type="datetime-local"
            value={start_date}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <label>Date de fin :</label>
          <input
            type="datetime-local"
            value={end_date}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <label>Places disponibles :</label>
          <input
            type="number"
            placeholder="Places disponibles"
            value={available_seats}
            onChange={(e) => setSeats(e.target.value)}
            required
          />
          <label>Image :</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit">Créer</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
