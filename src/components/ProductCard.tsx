
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product, getCategoryName } from '@/types/database';
import { useCart } from '@/hooks/use-cart';
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  navigate: (page: string, params?: { [key: string]: string }) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, navigate }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Convert Product to the format expected by the cart
    const cartProduct = {
      id: product.product_id,
      name: product.name,
      price: product.price,
      image: product.image_path || '/placeholder.svg',
      category: getCategoryName(product.category),
      stock: product.stock_quantity || 0,
    };
    addItem(cartProduct);
    toast.success(`${product.name} đã được thêm vào giỏ hàng`);
  };

  const handleCardClick = () => {
    navigate('product-detail', { id: product.product_id.toString() });
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
