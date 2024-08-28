import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from './SessionContext'; 

const PrivateRoute = ({ element }) => {
  const { session } = useSession();

  return session?.isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
