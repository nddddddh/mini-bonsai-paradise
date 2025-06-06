
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/database";
import { getCategoryName } from "@/types/database";

// Legacy interface for backward compatibility
export interface Plant {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string | number;
  stock: number;
}

interface PlantCardProps {
  plant: Product | Plant;
}

const PlantCard = ({ plant }: PlantCardProps) => {
  const { addItem } = useCart();

  // Convert Product to Plant format for backward compatibility
  const convertToPlant = (product: Product | Plant): Plant => {
    if ('product_id' in product) {
      return {
        id: product.product_id,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        image: product.image || '',
        category: typeof product.category === 'number' ? getCategoryName(product.category) : product.category,
        stock: product.stock_quantity
      };
    }
    return product as Plant;
  };

  const plantData = convertToPlant(plant);

  const handleAddToCart = () => {
    addItem(plantData);
  };

  return (
    <div className="plant-card bg-white rounded-lg overflow-hidden border shadow-sm h-full flex flex-col">
      <Link to={`/products/${plantData.id}`} className="overflow-hidden">
        <div className="h-64 overflow-hidden">
          <img 
            src={plantData.image} 
            alt={plantData.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <Link to={`/products/${plantData.id}`}>
            <h3 className="font-medium text-lg hover:text-nature-600 transition-colors">{plantData.name}</h3>
          </Link>
          <p className="text-sm text-gray-500 mb-2">{plantData.category}</p>
          <div className="flex items-center mt-1">
            {plantData.salePrice ? (
              <>
                <span className="text-lg font-semibold text-nature-600">{plantData.salePrice.toLocaleString('vi-VN')}₫</span>
                <span className="ml-2 text-sm text-gray-400 line-through">{plantData.price.toLocaleString('vi-VN')}₫</span>
              </>
            ) : (
              <span className="text-lg font-semibold">{plantData.price.toLocaleString('vi-VN')}₫</span>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Button 
            onClick={handleAddToCart} 
            className="w-full bg-nature-500 hover:bg-nature-600 text-white flex items-center justify-center gap-2"
            disabled={plantData.stock <= 0}
          >
            <ShoppingCart className="w-4 h-4" />
            {plantData.stock > 0 ? 'Thêm vào giỏ' : 'Hết hàng'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
