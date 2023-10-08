import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../components/utilis/localStorage";

const PrivateRouting = ({ children }) => {
  const checkToken = () => {
    const token = getToken();
    return Boolean(token);
  };

  return checkToken() ? children : <Navigate to="/" />;
};

export default PrivateRouting;
