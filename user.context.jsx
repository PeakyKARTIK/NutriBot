// File: Nutrihelp-web/src/context/user.context.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

// Configuration
const DEVELOPMENT_MODE = false; // toggle true for dev convenience
const SESSION_DURATION = 1000 * 60 * 60 * 2; // default 2 hours

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  useEffect(() => {
    // If in development mode, inject a mock user for quick dev/testing
    if (DEVELOPMENT_MODE) {
      const mockUser = { id: 1, name: "Dev User", email: "dev@example.com", mfa_enabled: false };
      persistUser(mockUser, SESSION_DURATION);
      return;
    }

    // On mount: try restore session from localStorage
    const storedUser = localStorage.getItem("user");
    const storedExpiry = localStorage.getItem("userExpiry");

    if (storedUser && storedExpiry) {
      const expiry = parseInt(storedExpiry, 10);
      if (Date.now() < expiry) {
        setUserState(JSON.parse(storedUser));
      } else {
        // Session expired: clean up
        clearSession();
      }
    }
  }, []);

  // Persist user to state + localStorage and set an expiry timestamp
  const persistUser = (newUser, durationMs = SESSION_DURATION) => {
    if (!newUser) {
      clearSession();
      return;
    }
    const expiry = Date.now() + durationMs;
    setUserState(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("userExpiry", expiry.toString());
  };

  // Clear user session completely
  const clearSession = () => {
    setUserState(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userExpiry");
  };

  const logOut = () => {
    clearSession();
  };

  return (
    <UserContext.Provider value={{ user, setUser: persistUser, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for convenient consumption
export const useUser = () => useContext(UserContext);

export default UserContext;
