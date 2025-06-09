
export interface NavigationProps {
  navigate: (path: string) => void;
}

export interface CategoryNavigationProps extends NavigationProps {
  category?: string;
}

export interface ProductNavigationProps extends NavigationProps {
  productId?: string;
}

export interface SlugNavigationProps extends NavigationProps {
  slug?: string;
}
