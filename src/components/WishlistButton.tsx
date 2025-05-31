
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';

interface WishlistButtonProps {
  productId: number;
  className?: string;
}

const WishlistButton = ({ productId, className = "" }: WishlistButtonProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist, loading } = useWishlist();
  const { user } = useAuth();
  const inWishlist = isInWishlist(productId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      return;
    }

    if (inWishlist) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={loading}
      className={`${className} ${inWishlist ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
    >
      <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
    </Button>
  );
};

export default WishlistButton;
