
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, User, Settings, BarChart3, Package, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavbarProps } from '@/types/navigation';

const Navbar = ({ navigate }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items } = useCart();
  const { user, logout, isAdmin } = useAuth();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`border-b backdrop-blur-md sticky top-0 z-40 transition-all duration-200 ${
      isScrolled ? 'bg-white/90 shadow-sm' : 'bg-white/80'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button onClick={() => navigate('/')} className="flex items-center gap-2">
          <div className="bg-nature-500 text-white p-1 rounded">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L12.7698 3.90983C14.3983 8.59483 17.405 12.5948 21.435 15.0902L23 16L21.435 16.9098C17.405 19.4052 14.3983 23.4052 12.7698 28.0902L12 30L11.2302 28.0902C9.60175 23.4052 6.59497 19.4052 2.56497 16.9098L1 16L2.56497 15.0902C6.59497 12.5948 9.60175 8.59483 11.2302 3.90983L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6.5L12.5396 7.83213C13.6676 10.9536 15.6464 13.5864 18.1679 15.4604L19 16L18.1679 16.5396C15.6464 18.4136 13.6676 21.0464 12.5396 24.1679L12 25.5L11.4604 24.1679C10.3324 21.0464 8.35357 18.4136 5.83213 16.5396L5 16L5.83213 15.4604C8.35357 13.5864 10.3324 10.9536 11.4604 7.83213L12 6.5Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold text-xl">BonsaiHub</span>
        </button>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => navigate('/')} className="hover:text-nature-600">Trang chủ</button>
          <button onClick={() => navigate('/products')} className="hover:text-nature-600">Sản phẩm</button>
          <button onClick={() => navigate('/collections')} className="hover:text-nature-600">Bộ sưu tập</button>
          <button onClick={() => navigate('/care-guide')} className="hover:text-nature-600">Chăm sóc</button>
          <button onClick={() => navigate('/about')} className="hover:text-nature-600">Về chúng tôi</button>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-gray-700 hover:text-nature-600">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative text-gray-700 hover:text-nature-600" onClick={() => navigate('/cart')}>
            <ShoppingCart className="w-5 h-5" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-nature-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-nature-500 text-nature-700 hover:bg-nature-50">
                  <User className="w-4 h-4 mr-2" />
                  {user.full_name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <button onClick={() => navigate('/profile')} className="w-full flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Thông tin tài khoản
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={() => navigate('/wishlist')} className="w-full flex items-center">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Sản phẩm yêu thích
                  </button>
                </DropdownMenuItem>
                
                {isAdmin() && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <button onClick={() => navigate('/admin/dashboard')} className="w-full flex items-center">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Dashboard
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button onClick={() => navigate('/admin/products')} className="w-full flex items-center">
                        <Package className="w-4 h-4 mr-2" />
                        Quản lý sản phẩm
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button onClick={() => navigate('/admin/orders')} className="w-full flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Quản lý đơn hàng
                      </button>
                    </DropdownMenuItem>
                  </>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" className="border-nature-500 text-nature-700 hover:bg-nature-50" onClick={() => navigate('/login')}>
              Đăng nhập
            </Button>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative text-gray-700" onClick={() => navigate('/cart')}>
            <ShoppingCart className="w-5 h-5" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-nature-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4 border-t">
          <div className="flex flex-col space-y-3 pt-3">
            <button onClick={() => { navigate('/'); toggleMenu(); }} className="px-3 py-2 hover:bg-nature-50 rounded-md text-left">Trang chủ</button>
            <button onClick={() => { navigate('/products'); toggleMenu(); }} className="px-3 py-2 hover:bg-nature-50 rounded-md text-left">Sản phẩm</button>
            <button onClick={() => { navigate('/collections'); toggleMenu(); }} className="px-3 py-2 hover:bg-nature-50 rounded-md text-left">Bộ sưu tập</button>
            <button onClick={() => { navigate('/care-guide'); toggleMenu(); }} className="px-3 py-2 hover:bg-nature-50 rounded-md text-left">Chăm sóc</button>
            <button onClick={() => { navigate('/about'); toggleMenu(); }} className="px-3 py-2 hover:bg-nature-50 rounded-md text-left">Về chúng tôi</button>
            
            {user ? (
              <>
                <div className="h-px bg-gray-200 my-1"></div>
                <button onClick={() => { navigate('/profile'); toggleMenu(); }} className="px-3 py-2 hover:bg-nature-50 rounded-md text-left">Thông tin tài khoản</button>
                <button onClick={() => { navigate('/wishlist'); toggleMenu(); }} className="px-3 py-2 hover:bg-nature-50 rounded-md text-left">Sản phẩm yêu thích</button>
                
                {isAdmin() && (
                  <>
                    <button onClick={() => { navigate('/admin/dashboard'); toggleMenu(); }} className="px-3 py-2 hover:bg-nature-50 rounded-md text-left">Dashboard</button>
                    <button onClick={() => { navigate('/admin/products'); toggleMenu(); }} className="px-3 py-2 hover:bg-nature-50 rounded-md text-left">Quản lý sản phẩm</button>
                    <button onClick={() => { navigate('/admin/orders'); toggleMenu(); }} className="px-3 py-2 hover:bg-nature-50 rounded-md text-left">Quản lý đơn hàng</button>
                  </>
                )}
                
                <button 
                  className="px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-md" 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <button onClick={() => { navigate('/login'); toggleMenu(); }} className="px-3 py-2 bg-nature-50 text-nature-700 rounded-md text-center font-medium">Đăng nhập</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
