// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/OrganisateurDashboard.css";

const AdminDashboard = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`dashboard-container ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* === Sidebar === */}
      <aside className="sidebar">
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>✖</button>
        <h2>Admin</h2>
        <nav>
          <Link to="/admin-dashboard">🏠 Dashboard</Link>
          <Link to="/admin-dashboard/users">👥 Gérer les utilisateurs</Link>
          <Link to="/admin-dashboard/events">📅 Tous les événements</Link>
        </nav>
      </aside>

      {/* === Main Content === */}
      <main className="main-content">
        <header className="top-nav">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>☰</button>
          <h1>Bienvenue, {user?.name || "Administrateur"} 👋</h1>
          <input type="text" placeholder="Rechercher un utilisateur ou un événement..." />
        </header>

        <section className="dashboard-cards">
          <div className="card">
            <h3>👥 Utilisateurs inscrits</h3>
            <p>1 245</p>
          </div>

          <div className="card">
            <h3>🎉 Événements actifs</h3>
            <p>72</p>
          </div>

          <div className="card">
            <h3>🚫 Événements signalés</h3>
            <p>5</p>
          </div>

          <div className="card create-card">
            <h3>🧑‍💼 Gérer les utilisateurs</h3>
            <p>Ajouter ou supprimer des utilisateurs/organisateurs</p>
            <Link to="/admin-dashboard/users" className="btn-create">⚙️ Gérer</Link>
          </div>
        </section>

        {/* ✅ Ici on affiche la sous-page courante */}
        <section className="events-section">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
