
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Heart, User, Settings, Package, BarChart3, FileText, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header = () => {
  const navigate = useNavigate();
  const { state, dispatch, login } = useApp();
  const [showProfile, setShowProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    setShowProfile(false);
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setShowProfile(false);
  };

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      const success = login(username.trim(), password.trim());
      if (success) {
        setUsername('');
        setPassword('');
        setLoginError('');
        setShowLogin(false);
      } else {
        setLoginError('Tài khoản hoặc mật khẩu không đúng!');
      }
    } else {
      setLoginError('Vui lòng nhập đầy đủ thông tin!');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-2xl font-bold text-green-700">BonsaiShop</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => navigate('/')} className="text-gray-700 hover:text-green-600">
              Trang chủ
            </button>
            <button onClick={() => navigate('/collections')} className="text-gray-700 hover:text-green-600">
              Bộ sưu tập
            </button>
            <button onClick={() => navigate('/about')} className="text-gray-700 hover:text-green-600">
              Giới thiệu
            </button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Login */}
            {!state.isAuthenticated && (
              <Sheet open={showLogin} onOpenChange={setShowLogin}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <LogIn className="mr-2 h-4 w-4" />
                    Đăng nhập
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="space-y-4 mt-8">
                    <h3 className="text-lg font-semibold">Đăng nhập</h3>
                    <div className="space-y-3">
                      <Input
                        placeholder="Tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <Input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                      />
                      {loginError && (
                        <p className="text-red-500 text-sm">{loginError}</p>
                      )}
                      <Button onClick={handleLogin} className="w-full">
                        Đăng nhập
                      </Button>
                      <div className="text-sm text-gray-500 mt-4">
                        <p>Tài khoản demo:</p>
                        <p>• admin / admin123 (Admin)</p>
                        <p>• user1 / user123 (User)</p>
                        <p>• user2 / user456 (User)</p>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}

            {state.isAuthenticated && (
              <>
                {/* Cart */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      {cartItemsCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {cartItemsCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    {/* Cart component will be rendered here */}
                  </SheetContent>
                </Sheet>

                {/* Favorites */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative"
                  onClick={() => navigate('/favorites')}
                >
                  <Heart className="h-5 w-5" />
                  {state.favorites.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {state.favorites.length}
                    </Badge>
                  )}
                </Button>

                {/* User Avatar with Dropdown */}
                <Sheet open={showProfile} onOpenChange={setShowProfile}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={state.user?.avatar} />
                        <AvatarFallback>
                          {state.user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 pb-4 border-b">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={state.user?.avatar} />
                          <AvatarFallback>
                            {state.user?.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{state.user?.name}</p>
                          <p className="text-sm text-gray-500">{state.user?.email}</p>
                          <Badge variant={state.user?.role === 'admin' ? 'destructive' : 'secondary'}>
                            {state.user?.role === 'admin' ? 'Admin' : 'Khách hàng'}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          onClick={() => handleNavigation('/profile')}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Thông tin cá nhân
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation('/favorites')}
                        >
                          <Heart className="mr-2 h-4 w-4" />
                          Sản phẩm yêu thích ({state.favorites.length})
                        </Button>
                        
                        {state.user?.role === 'admin' && (
                          <>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start"
                              onClick={() => handleNavigation('/admin/products')}
                            >
                              <Package className="mr-2 h-4 w-4" />
                              Quản lý sản phẩm
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start"
                              onClick={() => handleNavigation('/admin/dashboard')}
                            >
                              <BarChart3 className="mr-2 h-4 w-4" />
                              Dashboard doanh thu
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start"
                              onClick={() => handleNavigation('/admin/orders')}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Quản lý đơn hàng
                            </Button>
                          </>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => handleNavigation('/settings')}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Cài đặt
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start mt-4"
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
