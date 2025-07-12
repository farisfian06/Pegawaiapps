import { useEffect, useState } from "react";
import type { User } from "../types/user.types";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("authUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await axiosInstance.post("/logout");

      localStorage.removeItem("authUser");
      localStorage.removeItem("token");
      setUser(null);

      // Redirect atau reload
      navigate("/login");
    } catch (error) {
      toast.error(`Logout error ${error}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    user,
    loading,
    logout,
    isLoggingOut,
  };
};
