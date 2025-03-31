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
  register: (data: { username: string, email: string, password: string }) => Promise<void>;
  login: (data: { email: string, password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();


   // Stable auth check function
  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, { credentials: 'include' });
      if (response.ok) setUser(await response.json());
    } catch (error) {
      setUser(null);
    }
  }, []);  
    
  // Prevent infinite auth checks
  useEffect(() => {
    checkAuth();
  }, [checkAuth]); // Only runs when checkAuth changes

  const register = async (data: { username: string, email: string, password: string }) => {
    await registerUser(data);
    await checkAuth(); // Fetch user profile
    router.push('/dashboard');
  };

  const login = async (data: { email: string, password: string }) => {
    await loginUser(data);
    await checkAuth(); // Fetch user profile
    router.push('/dashboard');
  };

  const logout = () => {
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setUser(null);
    router.push('/login');
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