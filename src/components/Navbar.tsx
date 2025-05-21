import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { items } = useCart();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };
  
  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);
  
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
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-nature-500 text-white p-1 rounded">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L12.7698 3.90983C14.3983 8.59483 17.405 12.5948 21.435 15.0902L23 16L21.435 16.9098C17.405 19.4052 14.3983 23.4052 12.7698 28.0902L12 30L11.2302 28.0902C9.60175 23.4052 6.59497 19.4052 2.56497 16.9098L1 16L2.56497 15.0902C6.59497 12.5948 9.60175 8.59483 11.2302 3.90983L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6.5L12.5396 7.83213C13.6676 10.9536 15.6464 13.5864 18.1679 15.4604L19 16L18.1679 16.5396C15.6464 18.4136 13.6676 21.0464 12.5396 24.1679L12 25.5L11.4604 24.1679C10.3324 21.0464 8.35357 18.4136 5.83213 16.5396L5 16L5.83213 15.4604C8.35357 13.5864 10.3324 10.9536 11.4604 7.83213L12 6.5Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold text-xl">BonsaiHub</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-nature-600">Trang chủ</Link>
          <Link to="/products" className="hover:text-nature-600">Sản phẩm</Link>
          <Link to="/collections" className="hover:text-nature-600">Bộ sưu tập</Link>
          <Link to="/care-guide" className="hover:text-nature-600">Chăm sóc</Link>
          <Link to="/about" className="hover:text-nature-600">Về chúng tôi</Link>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-gray-700 hover:text-nature-600">
            <Search className="w-5 h-5" />
          </Button>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative text-gray-700 hover:text-nature-600">
              <ShoppingCart className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-nature-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Button>
          </Link>
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-nature-500 text-nature-700 hover:bg-nature-50">
                  <User className="w-4 h-4 mr-2" />
                  Tài khoản
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">Thông tin tài khoản</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/orders" className="w-full">Đơn hàng của tôi</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/wishlist" className="w-full">Sản phẩm yêu thích</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="border-nature-500 text-nature-700 hover:bg-nature-50">
                Đăng nhập
              </Button>
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative text-gray-700">
              <ShoppingCart className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-nature-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4 border-t">
          <div className="flex flex-col space-y-3 pt-3">
            <Link to="/" className="px-3 py-2 hover:bg-nature-50 rounded-md" onClick={toggleMenu}>Trang chủ</Link>
            <Link to="/products" className="px-3 py-2 hover:bg-nature-50 rounded-md" onClick={toggleMenu}>Sản phẩm</Link>
            <Link to="/collections" className="px-3 py-2 hover:bg-nature-50 rounded-md" onClick={toggleMenu}>Bộ sưu tập</Link>
            <Link to="/care-guide" className="px-3 py-2 hover:bg-nature-50 rounded-md" onClick={toggleMenu}>Chăm sóc</Link>
            <Link to="/about" className="px-3 py-2 hover:bg-nature-50 rounded-md" onClick={toggleMenu}>Về chúng tôi</Link>
            
            {isLoggedIn ? (
              <>
                <div className="h-px bg-gray-200 my-1"></div>
                <Link to="/profile" className="px-3 py-2 hover:bg-nature-50 rounded-md" onClick={toggleMenu}>Thông tin tài khoản</Link>
                <Link to="/orders" className="px-3 py-2 hover:bg-nature-50 rounded-md" onClick={toggleMenu}>Đơn hàng của tôi</Link>
                <Link to="/wishlist" className="px-3 py-2 hover:bg-nature-50 rounded-md" onClick={toggleMenu}>Sản phẩm yêu thích</Link>
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
              <Link to="/login" className="px-3 py-2 bg-nature-50 text-nature-700 rounded-md text-center font-medium" onClick={toggleMenu}>Đăng nhập</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
