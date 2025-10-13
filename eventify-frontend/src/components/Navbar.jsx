import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Voulez-vous vous déconnecter ?")) {
      localStorage.removeItem("user");
      onLogout?.();
      navigate("/login");
      closeMenu(); // ✅ Fermer le menu après logout
    }
  };

  // 🔹 Récupération dynamique des liens
  const getLinks = () => {
    if (!user) {
      return [
        { label: "Accueil", to: "/" },
        { label: "Événements", to: "/events" },
        { label: "Login", to: "/login" },
        { label: "Register", to: "/register" },
      ];
    }

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

  // ✅ Fonction pour fermer le menu
  const closeMenu = () => {
    const navbar = document.querySelector(".navbar-mainbg");
    navbar.classList.remove("active");
  };

  // ✅ Gestion du bouton burger
  useEffect(() => {
    const navbar = document.querySelector(".navbar-mainbg");
    if (!navbar) return;

    const toggleMenu = () => navbar.classList.toggle("active");

    const handleClick = (e) => {
      // Si on clique sur le burger (zone à droite)
      if (e.offsetX > navbar.offsetWidth - 40) toggleMenu();
    };

    navbar.addEventListener("click", handleClick);
    return () => navbar.removeEventListener("click", handleClick);
  }, []);

  return (
    <nav className="navbar navbar-mainbg">
      <span className="navbar-brand navbar-logo">🎟️ Eventify</span>

      <div className="collapse navbar-collapse show" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {links.map((link) => (
            <li key={link.to} className="nav-item">
              <Link
                className="nav-link"
                to={link.to}
                onClick={closeMenu} // ✅ Fermer le menu au clic
              >
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
