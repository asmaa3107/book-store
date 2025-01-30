import { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User } from './user.type';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('User logged in:', JSON.stringify(storedUser));

    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    console.log('User logged in:', JSON.stringify(userData));
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user , login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
