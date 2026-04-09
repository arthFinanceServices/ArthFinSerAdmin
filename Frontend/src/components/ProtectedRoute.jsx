import React from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../Api/AxiosInstance";
import { useEffect } from "react";
import { useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(null);
  const [user, setUser] = useState("");
  //network call
  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/check-auth");
      console.log(res);
      setIsAuthenticatedAdmin(res.data.success);
      setUser(res.data.user.user);
      console.log(res.data.user.user);
      console.log(typeof res.data.user.user);
    } catch (error) {
      setIsAuthenticatedAdmin(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  if (isAuthenticatedAdmin === null) {
    return <h1>Loading...</h1>;
  }

  // authenticated
  if (isAuthenticatedAdmin) {
    if (user === "admin") {
      return <Navigate to="/admin" />;
    }
    if (user === "employee") {
      return <Navigate to="/employee-dashboard" />;
    }
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
