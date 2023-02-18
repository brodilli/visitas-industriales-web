import { Navigate } from "react-router-dom";
import React from "react";
export const ProtectedRoute = ({ login, children }) => {
  if (!login) {
    return <Navigate to="/login" />;
  }
  return children;
};
