import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const AdminRouteProtection = ({ element }) => {
  const adminToken = localStorage.getItem('adminToken');

  if (!adminToken) {
    // Redirect to the admin login page if the token is not present
    return <Navigate to="/admin/login" />;
  }

  // Render the original component if the token is present
  return element;
};

export default AdminRouteProtection;
