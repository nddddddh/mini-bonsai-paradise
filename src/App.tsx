
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/hooks/use-cart";
import { AuthProvider } from "@/hooks/useAuth";
import { WishlistProvider } from "@/hooks/useWishlist";
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

interface NavigationState {
  page: string;
  params?: { [key: string]: string };
}

const App = () => {
  const [currentRoute, setCurrentRoute] = useState<NavigationState>({ page: 'index' });

  const navigate = (path: string) => {
    // Parse the path to extract page and params
    const pathSegments = path.split('/').filter(segment => segment !== '');
    
    if (pathSegments.length === 0) {
      setCurrentRoute({ page: 'index' });
      return;
    }

    const firstSegment = pathSegments[0];
    
    switch (firstSegment) {
      case 'products':
        if (pathSegments.length === 1) {
          setCurrentRoute({ page: 'products' });
        } else {
          setCurrentRoute({ page: 'productDetail', params: { id: pathSegments[1] } });
        }
        break;
      case 'collections':
        if (pathSegments.length === 1) {
          setCurrentRoute({ page: 'collections' });
        } else {
          setCurrentRoute({ page: 'collectionDetail', params: { category: pathSegments[1] } });
        }
        break;
      case 'cart':
        setCurrentRoute({ page: 'cart' });
        break;
      case 'checkout':
        setCurrentRoute({ page: 'checkout' });
        break;
      case 'login':
        setCurrentRoute({ page: 'login' });
        break;
      case 'admin':
        if (pathSegments[1] === 'login') {
          setCurrentRoute({ page: 'loginAdmin' });
        } else if (pathSegments[1] === 'dashboard') {
          setCurrentRoute({ page: 'adminDashboard' });
        } else if (pathSegments[1] === 'orders') {
          setCurrentRoute({ page: 'orderManagement' });
        } else if (pathSegments[1] === 'products') {
          setCurrentRoute({ page: 'productManagement' });
        }
        break;
      case 'profile':
        setCurrentRoute({ page: 'profile' });
        break;
      case 'wishlist':
        setCurrentRoute({ page: 'wishlist' });
        break;
      case 'register':
        setCurrentRoute({ page: 'register' });
        break;
      case 'verify-email':
        setCurrentRoute({ page: 'verifyEmail' });
        break;
      case 'forgot-password':
        setCurrentRoute({ page: 'forgotPassword' });
        break;
      case 'reset-password':
        setCurrentRoute({ page: 'resetPassword' });
        break;
      case 'care-guide':
        if (pathSegments.length === 1) {
          setCurrentRoute({ page: 'careGuide' });
        } else {
          setCurrentRoute({ page: 'careGuideDetail', params: { slug: pathSegments[1] } });
        }
        break;
      case 'about':
        setCurrentRoute({ page: 'about' });
        break;
      default:
        setCurrentRoute({ page: 'notFound' });
    }
  };

  const renderCurrentPage = () => {
    switch (currentRoute.page) {
      case 'index':
        return <Index navigate={navigate} />;
      case 'products':
        return <Products navigate={navigate} />;
      case 'productDetail':
        return <ProductDetail navigate={navigate} productId={currentRoute.params?.id} />;
      case 'categoryProducts':
        return <CategoryProducts navigate={navigate} category={currentRoute.params?.category} />;
      case 'cart':
        return <CartPage navigate={navigate} />;
      case 'checkout':
        return <Checkout navigate={navigate} />;
      case 'login':
        return <Login navigate={navigate} />;
      case 'loginAdmin':
        return <LoginAdmin navigate={navigate} />;
      case 'register':
        return <Register navigate={navigate} />;
      case 'verifyEmail':
        return <VerifyEmail navigate={navigate} />;
      case 'forgotPassword':
        return <ForgotPassword navigate={navigate} />;
      case 'resetPassword':
        return <ResetPassword navigate={navigate} />;
      case 'careGuide':
        return <CareGuide navigate={navigate} />;
      case 'careGuideDetail':
        return <CareGuideDetail navigate={navigate} slug={currentRoute.params?.slug} />;
      case 'collections':
        return <Collections navigate={navigate} />;
      case 'collectionDetail':
        return <CollectionDetail navigate={navigate} category={currentRoute.params?.category} />;
      case 'about':
        return <About navigate={navigate} />;
      case 'profile':
        return <Profile navigate={navigate} />;
      case 'wishlist':
        return <Wishlist navigate={navigate} />;
      case 'adminDashboard':
        return <AdminDashboard navigate={navigate} />;
      case 'orderManagement':
        return <OrderManagement navigate={navigate} />;
      case 'productManagement':
        return <ProductManagement navigate={navigate} />;
      default:
        return <NotFound navigate={navigate} />;
    }
  };

  return (
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
  );
};

export default App;
