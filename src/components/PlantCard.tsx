
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { ShoppingCart } from "lucide-react";

export interface Plant {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  stock: number;
}

interface PlantCardProps {
  plant: Plant;
}

const PlantCard = ({ plant }: PlantCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(plant);
  };

  return (
    <div className="plant-card bg-white rounded-lg overflow-hidden border shadow-sm h-full flex flex-col">
      <Link to={`/products/${plant.id}`} className="overflow-hidden">
        <div className="h-64 overflow-hidden">
          <img 
            src={plant.image} 
            alt={plant.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <Link to={`/products/${plant.id}`}>
            <h3 className="font-medium text-lg hover:text-nature-600 transition-colors">{plant.name}</h3>
          </Link>
          <p className="text-sm text-gray-500 mb-2">{plant.category}</p>
          <div className="flex items-center mt-1">
            {plant.salePrice ? (
              <>
                <span className="text-lg font-semibold text-nature-600">{plant.salePrice.toLocaleString('vi-VN')}₫</span>
                <span className="ml-2 text-sm text-gray-400 line-through">{plant.price.toLocaleString('vi-VN')}₫</span>
              </>
            ) : (
              <span className="text-lg font-semibold">{plant.price.toLocaleString('vi-VN')}₫</span>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Button 
            onClick={handleAddToCart} 
            className="w-full bg-nature-500 hover:bg-nature-600 text-white flex items-center justify-center gap-2"
            disabled={plant.stock <= 0}
          >
            <ShoppingCart className="w-4 h-4" />
            {plant.stock > 0 ? 'Thêm vào giỏ' : 'Hết hàng'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
