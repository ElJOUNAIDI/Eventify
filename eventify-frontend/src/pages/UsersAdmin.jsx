// src/components/UsersAdmin.jsx
import React, { useEffect, useState } from "react";
import api from "../api/client";
import "../styles/OrganisateurDashboard.css";
import "../styles/UsersAdmin.css";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // par défaut
  });

  // 🔹 Charger les utilisateurs
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users"); // ⚠️ Assure-toi que la route backend existe
      setUsers(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
      alert("Erreur lors du chargement des utilisateurs");
    }
  };

  // 🔹 Ajouter un utilisateur/organisateur
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", formData);
      alert("Utilisateur ajouté !");
      setFormData({ name: "", email: "", password: "", role: "user" });
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      alert("Erreur lors de l'ajout de l'utilisateur");
    }
  };

  // 🔹 Supprimer un utilisateur
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    try {
      await api.delete(`/users/${id}`);
      alert("Utilisateur supprimé !");
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression");
    }
  };

  // 🔹 Gérer la saisie du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="users-admin">
      <h2>Gérer les utilisateurs et organisateurs</h2>

      {/* Formulaire ajout */}
      <form className="register-form" onSubmit={handleSubmit}>
        <label>Nom :</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email :</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Mot de passe :</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>Rôle :</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">Utilisateur</option>
          <option value="organisateur">Organisateur</option>
        </select>

        <button type="submit" className="submit-btn">Ajouter</button>
      </form>

      {/* Liste des utilisateurs */}
      <table className="users-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(u.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersAdmin;
