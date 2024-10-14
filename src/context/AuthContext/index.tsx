import React, { createContext, useContext, useState, ReactNode } from 'react';
import { comparePasswords, decryptContent, encryptContent } from '../../utils/Globals';
import { isNullOrUndefined } from '../../utils/validations';

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
  login: (loginIntent: Login) => boolean
  isLoggedin: () => void;
  logOut: () => void;
  isAuthenticated: boolean
  updateUserInfo: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [loginInfo, setLoginInfo] = useState<Login | undefined>(undefined)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const setStaticUser = () => {
    setUser({ username: "user@example.com", password: "501fe884fdbbb0bceafff5f4fd2f3423cd32d435e96a0a85e56cdf067a632894" })
  }

  const login = (loginIntent: Login) => {
    if (user?.username !== loginIntent.username || !comparePasswords(loginIntent.password, user?.password)) {
      return false
    }
    setIsAuthenticated(true);
    const { password, confirmPassword, ...storageUser } = loginIntent
    storageUser.loggedIn = true
    sessionStorage.setItem('user', encryptContent(JSON.stringify(storageUser)));
    setLoginInfo({ ...loginIntent, loggedIn: true })
    return true
  }

  const isLoggedin = () => {
    const storageUser = sessionStorage.getItem('user');
    if (isNullOrUndefined(storageUser)) {
      setIsAuthenticated(false);
      setLoginInfo(undefined)
      return
    }
    try {
      const loginInfo = JSON.parse(decryptContent(storageUser!)) as Login;
      setIsAuthenticated(true);
      setLoginInfo({...loginInfo, loggedIn: true})
    } catch {
      setIsAuthenticated(false);
      setLoginInfo(undefined);
    }

  }

  const logOut = () => {
    setIsAuthenticated(false)
    setLoginInfo(undefined)
  }

  const updateUserInfo = (user: User) => {
    setUser(user)
  }

  return (
    <AuthContext.Provider value={{ user, loginInfo, setStaticUser, login, logOut, updateUserInfo, isAuthenticated, isLoggedin }}>
      {children}
    </AuthContext.Provider>
  );
}