import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Komponent UserRoute sprawdza rolę użytkownika
const UserRoute = ({ element, ...rest }) => {
  const role = sessionStorage.getItem("role");  // Zmiana z localStorage na sessionStorage
  const location = useLocation();

  // Jeśli rola to 'user', pozwól na dostęp do strony, w przeciwnym razie przekieruj
  if (role !== "user") {
    return <Navigate to="/access-denied" state={{ from: location }} />;
  }

  return element;
};

export default UserRoute;
