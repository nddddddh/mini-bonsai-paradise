
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/hooks/use-cart";
import { AuthProvider } from "@/hooks/useAuth";
import { WishlistProvider } from "@/hooks/useWishlist";

// Import all page components
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CategoryProducts from "./pages/CategoryProducts";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import LoginAdmin from "./pages/LoginAdmin";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CareGuide from "./pages/CareGuide";
import CareGuideDetail from "./pages/CareGuideDetail";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import AdminDashboard from "./pages/AdminDashboard";
import OrderManagement from "./pages/OrderManagement";
import ProductManagement from "./pages/ProductManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export type NavigationState = {
  page: string;
  params?: { [key: string]: string };
};

const App = () => {
  const [currentPage, setCurrentPage] = useState<NavigationState>({ page: 'home' });

  const navigate = (page: string, params?: { [key: string]: string }) => {
    setCurrentPage({ page, params });
  };

  const renderCurrentPage = () => {
    switch (currentPage.page) {
      case 'home':
        return <Index navigate={navigate} />;
      case 'products':
        return <Products navigate={navigate} />;
      case 'product-detail':
        return <ProductDetail navigate={navigate} productId={currentPage.params?.id} />;
      case 'collections':
        return <Collections navigate={navigate} />;
      case 'collection-detail':
        return <CollectionDetail navigate={navigate} category={currentPage.params?.category} />;
      case 'category-products':
        return <CategoryProducts navigate={navigate} category={currentPage.params?.category} />;
      case 'cart':
        return <CartPage navigate={navigate} />;
      case 'checkout':
        return <Checkout navigate={navigate} />;
      case 'login':
        return <Login navigate={navigate} />;
      case 'admin-login':
        return <LoginAdmin navigate={navigate} />;
      case 'register':
        return <Register navigate={navigate} />;
      case 'verify-email':
        return <VerifyEmail navigate={navigate} />;
      case 'forgot-password':
        return <ForgotPassword navigate={navigate} />;
      case 'reset-password':
        return <ResetPassword navigate={navigate} />;
      case 'care-guide':
        return <CareGuide navigate={navigate} />;
      case 'care-guide-detail':
        return <CareGuideDetail navigate={navigate} slug={currentPage.params?.slug} />;
      case 'about':
        return <About navigate={navigate} />;
      case 'profile':
        return <Profile navigate={navigate} />;
      case 'wishlist':
        return <Wishlist navigate={navigate} />;
      case 'admin-dashboard':
        return <AdminDashboard navigate={navigate} />;
      case 'admin-orders':
        return <OrderManagement navigate={navigate} />;
      case 'admin-products':
        return <ProductManagement navigate={navigate} />;
      default:
        return <NotFound navigate={navigate} />;
    }
  };

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                {renderCurrentPage()}
              </TooltipProvider>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
