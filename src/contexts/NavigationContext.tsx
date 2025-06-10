
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type PageType = 
  | 'home'
  | 'products' 
  | 'product-detail'
  | 'category-products'
  | 'cart'
  | 'checkout'
  | 'login'
  | 'login-admin'
  | 'register'
  | 'verify-email'
  | 'forgot-password'
  | 'reset-password'
  | 'care-guide'
  | 'care-guide-detail'
  | 'collections'
  | 'collection-detail'
  | 'about'
  | 'profile'
  | 'wishlist'
  | 'admin-dashboard'
  | 'order-management'
  | 'product-management';

interface NavigationState {
  currentPage: PageType;
  params: Record<string, string>;
}

interface NavigationContextType {
  navigationState: NavigationState;
  navigateTo: (page: PageType, params?: Record<string, string>) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentPage: 'home',
    params: {}
  });

  const [history, setHistory] = useState<NavigationState[]>([{
    currentPage: 'home',
    params: {}
  }]);

  const navigateTo = (page: PageType, params: Record<string, string> = {}) => {
    const newState = { currentPage: page, params };
    setNavigationState(newState);
    setHistory(prev => [...prev, newState]);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setNavigationState(newHistory[newHistory.length - 1]);
    }
  };

  return (
    <NavigationContext.Provider value={{ navigationState, navigateTo, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
