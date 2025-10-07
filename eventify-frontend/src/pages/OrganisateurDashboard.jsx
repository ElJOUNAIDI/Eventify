import React from 'react';
import Events from './Events';

const OrganisateurDashboard = ({ user }) => (
  <div>
    <h2>Dashboard Organisateur</h2>
    <Events user={user} />
  </div>
);

export default OrganisateurDashboard;
