// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import AdminDashboard from "./pages/AdminDashboard";
import OrganisateurDashboard from "./pages/OrganisateurDashboard";
import UsersAdmin from "./pages/UsersAdmin";
import Events from "./pages/Events";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

const PrivateRoute = ({ children, roles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const hideNavbar =
    location.pathname === "/login." || location.pathname === "/register.";

  return (
    <div className="app-container">
      {!hideNavbar && <Navbar user={user} onLogout={handleLogout} />}

      <main className="main-content">
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Public */}
          <Route path="/" element={<Home user={user} />} />
          <Route path="/events" element={<Home user={user} />} />

          {/* Event details */}
          <Route
            path="/events/:id"
            element={
              <PrivateRoute>
                <EventDetails user={user} />
              </PrivateRoute>
            }
          />

          {/* Create event */}
          <Route
            path="/create-event"
            element={
              <PrivateRoute roles={["organisateur"]}>
                <CreateEvent user={user} />
              </PrivateRoute>
            }
          />

          {/* ✅ Dashboard Admin avec sous-routes */}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminDashboard user={user} />
              </PrivateRoute>
            }
          >
            <Route index element={<Events user={user} />} />
            <Route path="users" element={<UsersAdmin />} />
            <Route path="events" element={<Events user={user} />} />
          </Route>

          {/* Dashboard Organisateur */}
          <Route
            path="/organisateur-dashboard"
            element={
              <PrivateRoute roles={["organisateur"]}>
                <OrganisateurDashboard user={user} />
              </PrivateRoute>
            }
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!hideNavbar && <Footer />}
    </div>
  );
}

export default App;
