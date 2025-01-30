/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
