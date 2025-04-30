// client/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, loginUser, getProfile } from '@/app/api/api';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  register: (data: { username: string, email: string, password: string, userType: string }) => Promise<void>;
  login: (data: { email: string, password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Add function to handle token storage
  const setAuthToken = (token: string) => {
    if (token) {
      localStorage.setItem('jwt', token);
    } else {
      localStorage.removeItem('jwt');
    }
  };

   // Stable auth check function
  const checkAuth = useCallback(async () => {
    try {

      const token = localStorage.getItem('jwt');
      const headers: HeadersInit = {};

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }


      const response = await fetch(`${API_BASE_URL}/auth/profile`, { 
        credentials: 'include',
        headers
      });

      if (response.ok){
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      setUser(null);
      setAuthToken('');
    }
  }, []);  
    
  // Prevent infinite auth checks
  useEffect(() => {
    checkAuth();
  }, [checkAuth]); // Only runs when checkAuth changes

  const register = async (data: { username: string, email: string, password: string, userType: string }) => {
    await registerUser(data);
    await checkAuth(); // Fetch user profile
    router.push('/dashboard');
  };

  const login = async (data: { email: string, password: string }) => {
    const response = await loginUser(data);
    if (response.token) {
      setAuthToken(response.token);
    }
    await checkAuth(); // Fetch user profile
    router.push('/dashboard');
  };

  const logout = () => {
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setUser(null);
    setAuthToken('');
    router.push('/');
    };
    
    // Memoize context value
  const value = useMemo(() => ({ 
    user, 
    register, 
    login, 
    logout 
  }), [user, register, login, logout]);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};