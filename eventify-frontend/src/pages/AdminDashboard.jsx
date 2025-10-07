import React from 'react';
import Events from './Events';

const AdminDashboard = ({ user }) => (
  <div>
    <h2>Dashboard Admin</h2>
    <Events user={user} />
  </div>
);

export default AdminDashboard;
