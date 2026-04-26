

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Invalid user data in localStorage");
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  //  LOGIN
  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  //  REGISTER (NEW )
const register = (newUser) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.find((u) => u.email === newUser.email);

  if (userExists) {
    return { success: false, message: "User already exists" };
  }

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  
  return { success: true };
};

  //  LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };


  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};