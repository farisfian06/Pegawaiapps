import { useEffect, useState } from "react";
import type { User } from "../types/user.types";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("authUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
    window.location.reload();
  };

  return {
    user,
    loading,
    logout,
  };
};
