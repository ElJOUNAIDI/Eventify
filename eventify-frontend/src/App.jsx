import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import AdminDashboard from "./pages/AdminDashboard";
import OrganisateurDashboard from "./pages/OrganisateurDashboard";
import Navbar from "./components/Navbar"; // ✅ Import de la navbar

// ✅ Composant pour protéger les routes
const PrivateRoute = ({ children, roles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  // ✅ Charger l’utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  // ✅ Fonction logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // ✅ Masquer la navbar sur login/register
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar user={user} onLogout={handleLogout} />}

      <div style={{ padding: "20px" }}>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Pages publiques */}
          <Route path="/" element={<Home user={user} />} />
          <Route path="/events" element={<Home user={user} />} />

          {/* Détails événement */}
          <Route
            path="/events/:id"
            element={
              <PrivateRoute>
                <EventDetails user={user} />
              </PrivateRoute>
            }
          />

          {/* Création d’événement (organisateur uniquement) */}
          <Route
            path="/create-event"
            element={
              <PrivateRoute roles={["organisateur"]}>
                <CreateEvent user={user} />
              </PrivateRoute>
            }
          />

          {/* Dashboards */}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminDashboard user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/organisateur-dashboard"
            element={
              <PrivateRoute roles={["organisateur"]}>
                <OrganisateurDashboard user={user} />
              </PrivateRoute>
            }
          />

          {/* Redirection pour routes inconnues */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
