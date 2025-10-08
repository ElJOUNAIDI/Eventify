import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

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
    return <p>Vous n'avez pas la permission de créer un événement.</p>;
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
    <div style={{ padding: "20px" }}>
      <h2>Créer un événement</h2>
      <form
        onSubmit={handleCreate}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <input
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
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
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

        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Créer
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
