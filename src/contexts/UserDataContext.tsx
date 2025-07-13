import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * User data context for managing user-related data throughout the application
 */
interface UserDataContextType {
  userData: any;
  setUserData: (data: any) => void;
  updateUserData: (updates: any) => void;
}

/**
 * User data context
 */
const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

/**
 * Hook to use user data context
 */
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};

/**
 * User data provider component
 */
export const UserDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<any>(null);

  const updateUserData = (updates: any) => {
    setUserData((prev: any) => ({ ...prev, ...updates }));
  };

  return (
    <UserDataContext.Provider value={{ userData, setUserData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};