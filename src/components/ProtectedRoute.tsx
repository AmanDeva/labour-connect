import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute