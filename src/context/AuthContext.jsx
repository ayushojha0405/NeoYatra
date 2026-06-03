import { createContext, useContext, useState } from "react";
import { loginUser, logoutUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) {
      return null;
    }
    const parsedUser = JSON.parse(storedUser);
    return {
      ...parsedUser,
      role: parsedUser.role || 'user'
    };
  });

  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      const { user } = response;
      
      // Store user data
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUser(user);
      
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Invalid credentials" 
      };
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.error("Logout failed on server", e);
    }
    setUser(null);
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("authToken"); // Clean up old tokens
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
