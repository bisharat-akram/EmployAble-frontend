import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../components/utilis/localStorage";
import { getApiWithAuth } from "../components/utilis/api";

const PrivateRouting = ({ children }) => {
  const [userType, setUserType] = useState();
  const checkToken = () => {
    const token = getToken();
    return Boolean(token);
  };

  const userData = async () => {
    const response = await getApiWithAuth("me");
    if (!response.success) {
      return;
    }
    setUserType(response?.data?.user_type);
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      userData();
    }
  }, []);

  return userType == 1 ? (
    <Navigate to="/user" />
  ) : userType == 2 ? (
    <Navigate to="/employee" />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRouting;
