
import React from 'react';
import { useNavigation, PageType } from '@/contexts/NavigationContext';

interface NavigationLinkProps {
  to: PageType;
  params?: Record<string, string>;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavigationLink = ({ to, params = {}, children, className = "", onClick }: NavigationLinkProps) => {
  const { navigateTo } = useNavigation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(to, params);
    onClick?.();
  };

  return (
    <a href="#" onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default NavigationLink;
