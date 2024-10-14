import React, { createContext, useContext, useState, ReactNode } from 'react';
import Swal from "sweetalert2";

interface User {
  username: string
  password: string
}

export interface Login {
  username: string
  password: string
  confirmPassword: string
  loggedIn: boolean
}

interface AuthContextType {
  user: User | undefined;
  loginInfo: Login | undefined;
  setStaticUser: () => void;
  login: (loginIntent: Login) => Login | undefined
  logOut: () => void;
  isAuthenticated: boolean
  updateUserInfo: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useProduct debe usarse dentro de un ProductProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [loginInfo, setLoginInfo] = useState<Login | undefined>(undefined)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

 
  const setStaticUser = () => {
    setUser({username: "user@example.com", password: "U2FsdGVkX18QWx4QTs9RClu2+pQuG0Jr+1DDrHmTZQQ="})
  }

  const login = (loginIntent: Login) => {
    if(user?.username !== loginIntent.username || user?.password !== loginIntent.password) {
      // Swal.fire({
      //   title: "¡Atención!",
      //   text: "Datos inconrrectos",
      //   icon: "error",
      // });
      return undefined
    }
   
    setIsAuthenticated(true)
    setLoginInfo({...loginIntent, loggedIn: true})
    return loginInfo!
  }

  const logOut = () => {
    setIsAuthenticated(false)
    setLoginInfo(undefined)
  }

  const updateUserInfo = (user: User) => {
    setUser(user)
  }

  return (
    <AuthContext.Provider value={{ user ,loginInfo, setStaticUser, login, logOut, updateUserInfo, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
}