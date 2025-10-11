import React, { useState } from "react";
import { Link } from "react-router-dom";
import Events from "./Events";
import "../styles/OrganisateurDashboard.css";

const OrganisateurDashboard = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`dashboard-container ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          ✖
        </button>
        <h2>Organisateur</h2>
        <nav>
          <Link to="/organisateur-dashboard">🏠 Dashboard</Link>
          <Link to="/create-event">➕ Créer un événement</Link>
          <Link to="/events">📅 Mes événements</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* Top bar */}
        <header className="top-nav">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <h1>Bienvenue, {user?.name || "Organisateur"} 👋</h1>
          <input type="text" placeholder="Rechercher un événement..." />
        </header>

        {/* Cards section */}
        <section className="dashboard-cards">
          <div className="card">
            <h3>👥 Utilisateurs</h3>
            <p>1,234</p>
          </div>
          <div className="card">
            <h3>📦 Commandes</h3>
            <p>567</p>
          </div>
          <div className="card create-card">
            <h3>🎉 Nouvel Événement</h3>
            <p>Créez un nouvel événement facilement</p>
            <Link to="/create-event" className="btn-create">
              ➕ Créer un événement
            </Link>
          </div>
        </section>

        {/* Liste des événements */}
        <section className="events-section">
          <Events user={user} />
        </section>
      </main>
    </div>
  );
};

export default OrganisateurDashboard;
