
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/use-cart";
import { AuthProvider } from "@/hooks/useAuth";
import { WishlistProvider } from "@/hooks/useWishlist";
import { NavigationProvider, useNavigation } from "@/contexts/NavigationContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CategoryProducts from "./pages/CategoryProducts";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
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

const queryClient = new QueryClient();

const AppContent = () => {
  const { navigationState } = useNavigation();

  const renderCurrentPage = () => {
    switch (navigationState.currentPage) {
      case 'home':
        return <Index />;
      case 'products':
        return <Products />;
      case 'product-detail':
        return <ProductDetail />;
      case 'category-products':
        return <CategoryProducts />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <Checkout />;
      case 'login':
        return <Login />;
      case 'login-admin':
        return <LoginAdmin />;
      case 'register':
        return <Register />;
      case 'verify-email':
        return <VerifyEmail />;
      case 'forgot-password':
        return <ForgotPassword />;
      case 'reset-password':
        return <ResetPassword />;
      case 'care-guide':
        return <CareGuide />;
      case 'care-guide-detail':
        return <CareGuideDetail />;
      case 'collections':
        return <Collections />;
      case 'collection-detail':
        return <CollectionDetail />;
      case 'about':
        return <About />;
      case 'profile':
        return <Profile />;
      case 'wishlist':
        return <Wishlist />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'order-management':
        return <OrderManagement />;
      case 'product-management':
        return <ProductManagement />;
      default:
        return <NotFound />;
    }
  };

  return renderCurrentPage();
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <NavigationProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="*" element={<AppContent />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </NavigationProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
