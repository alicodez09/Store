import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Layout/Spinner";
const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      if (auth?.token) {
        try {
          const result = await axios.get("/api/v1/auth/admin-auth", {
            headers: {
              Authorization: auth?.token,
            },
          });
          if (result.data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        } catch (error) {
          console.error("Error during authentication check:", error);
        }
      }
    };

    authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;
