
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
