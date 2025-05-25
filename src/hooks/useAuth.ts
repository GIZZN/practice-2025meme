'use client';

import { useState, useEffect } from 'react';

export interface User {
  id?: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  telegram: string;
  whatsapp: string;
  preferredContact: string;
  language: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const isBrowser = typeof window !== 'undefined';

const getStorageItem = (key: string) => {
  if (!isBrowser) return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

const setStorageItem = (key: string, value: unknown) => {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
};

const removeStorageItem = (key: string) => {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getStorageItem('currentUser');
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = getStorageItem('users') || [];
    const foundUser = users.find((u: User & { password: string }) => 
      u.email === email && u.password === password
    );

    if (foundUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: pass, ...userWithoutPassword } = foundUser;
      setStorageItem('currentUser', userWithoutPassword);
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    removeStorageItem('currentUser');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated
  };
}; 