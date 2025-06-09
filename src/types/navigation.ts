
export interface NavigationProps {
  navigate: (page: string, params?: { [key: string]: string }) => void;
}

export interface PageProps extends NavigationProps {}

export interface ProductDetailProps extends NavigationProps {
  productId?: string;
}

export interface CategoryProductsProps extends NavigationProps {
  category?: string;
}

export interface CollectionDetailProps extends NavigationProps {
  category?: string;
}

export interface CareGuideDetailProps extends NavigationProps {
  slug?: string;
}

// Additional interfaces for all other pages
export interface CartPageProps extends NavigationProps {}
export interface CheckoutProps extends NavigationProps {}
export interface LoginProps extends NavigationProps {}
export interface LoginAdminProps extends NavigationProps {}
export interface RegisterProps extends NavigationProps {}
export interface VerifyEmailProps extends NavigationProps {}
export interface ForgotPasswordProps extends NavigationProps {}
export interface ResetPasswordProps extends NavigationProps {}
export interface CareGuideProps extends NavigationProps {}
export interface CollectionsProps extends NavigationProps {}
export interface ProfileProps extends NavigationProps {}
export interface WishlistProps extends NavigationProps {}
export interface AdminDashboardProps extends NavigationProps {}
export interface OrderManagementProps extends NavigationProps {}
export interface ProductManagementProps extends NavigationProps {}
