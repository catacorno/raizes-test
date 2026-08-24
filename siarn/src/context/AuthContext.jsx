import { createContext, useContext, useState } from "react";

import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
  updateUser as updateUserService,
} from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    getCurrentUser()
  );

  function login(email, password) {
    const result = loginUser(email, password);

    if (result.success) {
      setUser(result.user);
    }

    return result;
  }

  function register(userData) {
    const result = registerUser(userData);

    if (result.success) {
      setUser(result.user);
    }

    return result;
  }

  function updateUser(userData) {
    if (!user?.id) {
      return {
        success: false,
        message: "Usuário não autenticado.",
      };
    }

    const result = updateUserService(
      user.id,
      userData
    );

    if (result.success) {
      setUser(result.user);
    }

    return result;
  }

  function logout() {
    logoutUser();
    setUser(null);
  }

  function isAdmin() {
  return user?.role === "admin";
}

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        updateUser,
        logout,
        isAuthenticated: Boolean(user),
        isAdmin: isAdmin(),
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}