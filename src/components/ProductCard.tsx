
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product, getCategoryName } from '@/types/database';
import { useApp } from '../context/AppContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const { toast } = useToast();
  const isFavorite = state.favorites.includes(product.product_id.toString());

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Convert Product to the format expected by the cart
    const cartProduct = {
      id: product.product_id.toString(),
      name: product.name,
      price: product.price,
      image: product.image_path || '/placeholder.svg',
      category: getCategoryName(product.category),
      stock: product.stock_quantity || 0,
      description: product.description || ''
    };
    dispatch({ type: 'ADD_TO_CART', payload: cartProduct });
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.name} đã được thêm vào giỏ hàng`,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_FAVORITE', payload: product.product_id.toString() });
    toast({
      title: isFavorite ? "Đã xóa khỏi yêu thích" : "Đã thêm vào yêu thích",
      description: `${product.name} ${isFavorite ? 'đã được xóa khỏi' : 'đã được thêm vào'} danh sách yêu thích`,
    });
  };

  const handleCardClick = () => {
    navigate(`/product/${product.product_id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <Card 
      className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image_path || '/placeholder.svg'} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 bg-white/80 hover:bg-white`}
          onClick={handleToggleFavorite}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            {formatPrice(product.price)}
          </span>
          <Badge variant={(product.stock_quantity || 0) > 0 ? "secondary" : "destructive"}>
            {(product.stock_quantity || 0) > 0 ? `Còn ${product.stock_quantity}` : 'Hết hàng'}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={handleAddToCart}
          disabled={(product.stock_quantity || 0) === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Thêm vào giỏ
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
