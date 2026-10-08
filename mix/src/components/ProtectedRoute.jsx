import React, {
  useContext,
} from "react";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";

function ProtectedRoute({
  children,
  role,
}) {
  const {
    user,
    isAuthenticated,
  } = useContext(AuthContext);

  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  if (role && user?.role !== role) {
    if (user?.role === "admin") {
      return (
        <Navigate
          to="/admin"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;