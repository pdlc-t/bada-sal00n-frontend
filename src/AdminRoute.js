import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Komponent AdminRoute sprawdza rolę użytkownika
const AdminRoute = ({ element, ...rest }) => {
  const role = sessionStorage.getItem("role");  // Zmiana z localStorage na sessionStorage
  const location = useLocation();

  // Jeśli rola to 'admin', pozwól na dostęp do strony, w przeciwnym razie przekieruj
  if (role !== "admin") {
    return <Navigate to="/access-denied" state={{ from: location }} />;
  }

  return element;
};

export default AdminRoute;
