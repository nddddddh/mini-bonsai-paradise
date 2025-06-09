import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlantCard from "@/components/PlantCard";
import { WishlistProps } from "@/types/navigation";

const Wishlist = ({ navigate }: WishlistProps) => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToBag = (plant: any) => {
    addItem(plant);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${plant.name} đã được thêm vào giỏ hàng của bạn.`,
    });
  };

  const handleRemoveFromWishlist = (plantId: string) => {
    removeFromWishlist(plantId);
    toast({
      title: "Đã xóa khỏi yêu thích",
      description: "Sản phẩm đã được xóa khỏi danh sách yêu thích của bạn.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navigate={navigate} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Danh sách yêu thích
          </h1>
          <p className="text-gray-600">
            Các sản phẩm bạn yêu thích sẽ được lưu ở đây
          </p>
        </div>

        {wishlist.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <Heart className="w-10 h-10 mx-auto text-gray-400 mb-4" />
              <CardTitle className="text-xl font-semibold text-gray-700 mb-2">
                Danh sách yêu thích của bạn đang trống
              </CardTitle>
              <p className="text-gray-500 mb-6">
                Hãy thêm các sản phẩm bạn yêu thích vào đây để dễ dàng xem lại
                sau này
              </p>
              <Button onClick={() => navigate("/products")}>
                Khám phá sản phẩm ngay
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((plant) => (
              <Card key={plant.id}>
                <PlantCard plant={plant} />
                <CardContent className="flex items-center justify-between">
                  <Button
                    size="sm"
                    className="bg-nature-600 hover:bg-nature-700 text-white"
                    onClick={() => handleAddToBag(plant)}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Thêm vào giỏ
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:text-red-500"
                    onClick={() => handleRemoveFromWishlist(plant.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer navigate={navigate} />
    </div>
  );
};

export default Wishlist;
