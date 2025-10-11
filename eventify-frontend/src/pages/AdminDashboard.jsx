import React, { useState } from "react";
import { Link } from "react-router-dom";
import Events from "./Events";
import "../styles/OrganisateurDashboard.css"; // réutilise le même CSS

const AdminDashboard = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`dashboard-container ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* === Sidebar === */}
      <aside className="sidebar">
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          ✖
        </button>
        <h2>Admin</h2>
        <nav>
          <Link to="/admin-dashboard">🏠 Dashboard</Link>
          <Link to="/users">👥 Gérer les utilisateurs</Link>
          <Link to="/events">📅 Tous les événements</Link>
        </nav>
      </aside>

      {/* === Main Content === */}
      <main className="main-content">
        {/* === Top Navigation === */}
        <header className="top-nav">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <h1>Bienvenue, {user?.name || "Administrateur"} 👋</h1>
          <input type="text" placeholder="Rechercher un utilisateur ou un événement..." />
        </header>

        {/* === Statistiques === */}
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
            <h3>🧑‍💼 Gérer les organisateurs</h3>
            <p>Vérifiez ou approuvez les comptes organisateurs</p>
            <Link to="/organizers" className="btn-create">
              ⚙️ Gérer
            </Link>
          </div>
        </section>

        {/* === Liste des événements === */}
        <section className="events-section">
          <Events user={user} />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
