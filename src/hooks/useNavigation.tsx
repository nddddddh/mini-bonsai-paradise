
import { createContext, useContext, ReactNode } from 'react';

export type NavigateFunction = (page: string, params?: Record<string, string>) => void;

interface NavigationContextType {
  navigate: NavigateFunction;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ 
  children, 
  navigate 
}: { 
  children: ReactNode;
  navigate: NavigateFunction;
}) => {
  return (
    <NavigationContext.Provider value={{ navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
