import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import AdminDashboard from './pages/AdminDashboard';
import OrganisateurDashboard from './pages/OrganisateurDashboard';

// Composant pour protéger les routes
const PrivateRoute = ({ children, roles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/login" />;
  return children;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, []);

  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register />} />

      {/* Page d'accueil avec Home */}
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

      {/* Création d'événement (organisateur uniquement) */}
      <Route
        path="/create-event"
        element={
          <PrivateRoute roles={['organisateur']}>
            <CreateEvent user={user} />
          </PrivateRoute>
        }
      />

      {/* Dashboards */}
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute roles={['admin']}>
            <AdminDashboard user={user} />
          </PrivateRoute>
        }
      />
      <Route
        path="/organisateur-dashboard"
        element={
          <PrivateRoute roles={['organisateur']}>
            <OrganisateurDashboard user={user} />
          </PrivateRoute>
        }
      />

      {/* Redirection pour toutes les autres routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
