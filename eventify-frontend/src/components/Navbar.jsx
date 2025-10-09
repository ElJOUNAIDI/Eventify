import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Voulez-vous vous déconnecter ?")) {
      localStorage.removeItem("user");
      onLogout?.();
      navigate("/login");
    }
  };

  // 🔹 Définition dynamique des liens selon le rôle
  const getLinks = () => {
    if (!user) {
      return [
        { label: "Accueil", to: "/" },
        { label: "Événements", to: "/events" },
        { label: "Login", to: "/login" },
        { label: "Register", to: "/register" },
      ];
    }

    // Pour les utilisateurs connectés
    let links = [
      { label: "Accueil", to: "/" },
      { label: "Événements", to: "/events" },
    ];

    if (user.role === "admin") {
      links.push({ label: "Dashboard", to: "/admin-dashboard" });
    } else if (user.role === "organisateur") {
      links.push({ label: "Dashboard", to: "/organisateur-dashboard" });
    } else if (user.role === "user") {
      links.push({ label: "Dashboard", to: "/dashboard" });
    }

    return links;
  };

  const links = getLinks();

  return (
    <nav className="navbar navbar-expand-custom navbar-mainbg">
      <span className="navbar-brand navbar-logo">🎟️ Eventify</span>

      <div className="collapse navbar-collapse show" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {links.map((link) => (
            <li key={link.to} className="nav-item">
              <Link className="nav-link" to={link.to}>
                {link.label}
              </Link>
            </li>
          ))}

          {user && (
            <>
              <li className="nav-item user-info">
                <span className="nav-link">
                  👤 {user.name} ({user.role})
                </span>
              </li>
              <li className="nav-item">
                <button className="logout-btn" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
