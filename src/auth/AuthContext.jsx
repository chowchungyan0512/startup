import React, { createContext, useContext, useState } from 'react';
import * as store from '../mock/store';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => store.getCurrentUser());

  function login(email, password) {
    const loggedInUser = store.loginUser(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  }

  function register(email, password, name) {
    const newUser = store.registerUser({ email, password, name });
    setUser(newUser);
    return newUser;
  }

  function logout() {
    store.logoutUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading: false, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
