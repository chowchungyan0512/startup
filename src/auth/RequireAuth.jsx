import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <main>Loading...</main>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
