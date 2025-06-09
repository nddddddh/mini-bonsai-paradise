
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

// Add interfaces for components that need navigation
export interface NavbarProps extends NavigationProps {}

export interface FooterProps extends NavigationProps {}

export interface ProductsProps extends NavigationProps {}

export interface CartPageProps extends NavigationProps {}

export interface RegisterProps extends NavigationProps {}

export interface VerifyEmailProps extends NavigationProps {}

export interface ResetPasswordProps extends NavigationProps {}

export interface CareGuideProps extends NavigationProps {}

export interface CareGuideDetailProps extends SlugNavigationProps {}

export interface CollectionsProps extends NavigationProps {}

export interface CollectionDetailProps extends CategoryNavigationProps {}

export interface AboutProps extends NavigationProps {}

export interface ProfileProps extends NavigationProps {}

export interface WishlistProps extends NavigationProps {}

export interface AdminDashboardProps extends NavigationProps {}

export interface OrderManagementProps extends NavigationProps {}

export interface ProductManagementProps extends NavigationProps {}

export interface ProductDetailProps extends ProductNavigationProps {}
